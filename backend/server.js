import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { neon } from '@neondatabase/serverless';
import { Resend } from 'resend';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import { GoogleGenAI } from '@google/genai';
import { CanvasFactory } from 'pdf-parse/worker';
import { PDFParse } from 'pdf-parse';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import axios from 'axios'; 
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

// --- CRITICAL FIX: ES Module __dirname shim ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json());

// --- SECURITY HEADERS MIDDLEWARE ---
app.use((req, res, next) => {
    // Referrer Policy: Controls how much referrer information is shared
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    
    // HSTS: Forces use of HTTPS, prevents downgrade attacks
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
    
    // Content-Security-Policy: Prevents XSS and data injection attacks
    res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://api.groq.com https://*.google.com https://www.google-analytics.com; frame-ancestors 'none'");
    
    // X-Frame-Options: Prevents clickjacking by denying framing in iframes
    res.setHeader('X-Frame-Options', 'DENY');
    
    next();
});


// --- INITIALIZE SERVICES EARLY ---
const sql = neon(process.env.DATABASE_URL);
const resend = new Resend(process.env.RESEND_API_KEY);
const JWT_SECRET = process.env.JWT_SECRET;

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

// =======================================================================
// 1. STANDARD API ROUTES
// =======================================================================
app.get('/api/health', async (req, res) => {
    res.status(200).json({ status: 'success', message: 'Backend is running!' });
});

// --- AUTHENTICATION ROUTES ---
app.post('/api/auth/send-otp', async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); 

    try {
        await sql`INSERT INTO otps (email, otp_code, expires_at) VALUES (${email}, ${otpCode}, ${expiresAt})`;
        await resend.emails.send({
            from: 'PandaLime <onboarding@resend.dev>',
            to: email,
            subject: 'Your PandaLime Login Code',
            html: `<div style="font-family: sans-serif; text-align: center; padding: 20px;">
                    <h2>Welcome to PandaLime Career!</h2>
                    <p>Your secure login code is:</p>
                    <h1 style="color: #10B981; font-size: 40px; letter-spacing: 5px;">${otpCode}</h1>
                   </div>`
        });
        res.json({ success: true, message: 'OTP sent successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send OTP' });
    }
});

app.post('/api/auth/verify-otp', async (req, res) => {
    const { email, otp } = req.body;
    try {
        const [validOtp] = await sql`SELECT * FROM otps WHERE email = ${email} AND otp_code = ${otp} AND expires_at > NOW() ORDER BY id DESC LIMIT 1`;
        if (!validOtp) return res.status(400).json({ error: 'Invalid or expired OTP' });

        await sql`DELETE FROM otps WHERE email = ${email}`;

        let [user] = await sql`SELECT * FROM users WHERE email = ${email}`;
        
        if (!user) {
            const [newUser] = await sql`INSERT INTO users (email, credits) VALUES (${email}, 1) RETURNING *`;
            user = newUser; 
        }

        const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
        res.json({ success: true, token, user });
    } catch (error) {
        res.status(500).json({ error: 'Verification failed' });
    }
});

// --- THE API WATERFALL ---
const GEMINI_KEYS = [
    process.env.GEMINI_API_KEY_1,
    process.env.GEMINI_API_KEY_2,
    process.env.GEMINI_API_KEY_3
].filter(Boolean); 

const GROQ_API_KEY = process.env.GROQ_API_KEY;

async function generateAIResponseWithFallback(systemPrompt) {
    for (let i = 0; i < GEMINI_KEYS.length; i++) {
        try {
            console.log(`Attempting Gemini Key ${i + 1}...`);
            const aiInstance = new GoogleGenAI({ apiKey: GEMINI_KEYS[i] });
            
            const response = await aiInstance.models.generateContent({
                model: 'gemini-2.5-flash', 
                contents: systemPrompt,
                config: {
                    responseMimeType: "application/json",
                }
            });
            
            return response.text; 
        } catch (error) {
            console.warn(`Gemini Key ${i + 1} Failed:`, error.message);
        }
    }

    if (GROQ_API_KEY) {
        try {
            console.log("All Gemini keys exhausted. Falling back to Groq (Llama 3.3 70B)...");
            
            const groqResponse = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
                model: 'llama-3.3-70b-versatile',
                messages: [
                    { role: 'system', content: 'You are an expert ATS scanner. Always output strictly in JSON format.' },
                    { role: 'user', content: systemPrompt }
                ],
                response_format: { type: "json_object" },
                temperature: 0.2
            }, {
                headers: {
                    'Authorization': `Bearer ${GROQ_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            });

            return groqResponse.data.choices[0].message.content; 
        } catch (error) {
            console.error("Groq Fallback Failed:", error.response ? error.response.data : error.message);
        }
    }

    throw new Error("API Outage: All Gemini keys and Groq fallback failed.");
}

// --- FRICTIONLESS AI RESUME ANALYSIS ROUTE ---
app.post('/api/analyze', upload.single('resume'), async (req, res) => {
    try {
        const jobDescription = req.body.jobDescription;
        if (!req.file || !jobDescription) {
            return res.status(400).json({ error: 'Missing resume PDF or job description' });
        }

        const parser = new PDFParse({ data: req.file.buffer, CanvasFactory });
        const pdfData = await parser.getText();
        const resumeText = pdfData.text;

        const prompt = `You are an expert ATS (Applicant Tracking System) and Executive Career Coach. 
        Analyze the following resume against the provided job description.
        Return ONLY a raw JSON object with exactly these 6 keys:
        {
          "match_score": a realistic integer between 0 and 100,
          "missing_keywords": ["array", "of", "5", "to", "7", "important", "skills"],
          "resume_critique": "a short, brutally honest, punchy paragraph explaining why they might be rejected.",
          "rewritten_bullets": ["string 1", "string 2", "string 3 optimized STAR-method bullets"],
          "cover_letter": "a punchy, 150-word tailored cover letter draft for this specific job.",
          "job_title": "A short 2-5 word title of the job description provided."
        }

        Job Description: ${jobDescription}
        
        Resume: ${resumeText}`;

        const aiResponseText = await generateAIResponseWithFallback(prompt);
        const analysis = JSON.parse(aiResponseText);

        const savedReport = await sql`
            INSERT INTO reports (match_score, missing_keywords, resume_critique, is_unlocked, job_title, is_public)
            VALUES (${analysis.match_score}, ${JSON.stringify(analysis.missing_keywords)}, ${analysis.resume_critique}, FALSE, ${analysis.job_title}, FALSE)
            RETURNING id
        `;

        res.json({ success: true, reportId: savedReport[0].id, analysis });

    } catch (error) {
        console.error('Analysis Error:', error);
        res.status(500).json({ error: 'System overloaded with requests. Please try again in 15 seconds.' });
    }
});


// --- COMMUNITY ROAST WALL ROUTES ---
app.get('/api/roasts', async (req, res) => {
    try {
        const roasts = await sql`
            SELECT id, match_score, resume_critique, job_title 
            FROM reports 
            WHERE is_public = TRUE 
            ORDER BY id DESC 
            LIMIT 50
        `;
        res.json({ success: true, roasts });
    } catch (error) {
        console.error('Fetch Roasts Error:', error);
        res.status(500).json({ error: 'Failed to fetch roasts' });
    }
});

app.post('/api/reports/:id/make-public', async (req, res) => {
    try {
        const { id } = req.params;
        await sql`UPDATE reports SET is_public = TRUE WHERE id = ${id}`;
        res.json({ success: true, message: 'Roast is now public!' });
    } catch (error) {
        console.error('Make Public Error:', error);
        res.status(500).json({ error: 'Failed to make public' });
    }
});

app.get('/api/reports/:id/comments', async (req, res) => {
    try {
        const { id } = req.params;
        const comments = await sql`
            SELECT id, text_content, created_at 
            FROM comments 
            WHERE report_id = ${id} 
            ORDER BY created_at ASC
        `;
        res.json({ success: true, comments });
    } catch (error) {
        console.error('Fetch Comments Error:', error);
        res.status(500).json({ error: 'Failed to fetch comments' });
    }
});

app.post('/api/reports/:id/comments', async (req, res) => {
    try {
        const { id } = req.params;
        const { text_content } = req.body;
        
        if (!text_content || text_content.trim() === '') {
            return res.status(400).json({ error: 'Comment cannot be empty' });
        }

        const newComment = await sql`
            INSERT INTO comments (report_id, text_content)
            VALUES (${id}, ${text_content.substring(0, 300)})
            RETURNING id, text_content, created_at
        `;
        res.json({ success: true, comment: newComment[0] });
    } catch (error) {
        console.error('Post Comment Error:', error);
        res.status(500).json({ error: 'Failed to post comment' });
    }
});

// --- RAZORPAY PAYMENT ROUTES ---
app.post('/api/payment/create-order', async (req, res) => {
    try {
        const { reportId, isDiscounted } = req.body;
        const amountToCharge = isDiscounted ? 4900 : 9900; 

        const options = {
            amount: amountToCharge, 
            currency: 'INR',
            receipt: 'receipt_' + Math.random().toString(36).substring(7),
        };
        const order = await razorpay.orders.create(options);
        res.json({ success: true, order });
    } catch (error) {
        console.error('Order Error:', error);
        res.status(500).json({ error: 'Failed to create payment order' });
    }
});

app.post('/api/payment/verify', async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, reportId } = req.body;

    try {
        const sign = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSign = crypto
         .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
         .update(sign.toString())
         .digest('hex');

        if (razorpay_signature === expectedSign) {
            await sql`UPDATE reports SET is_unlocked = TRUE WHERE id = ${reportId}`;
            res.json({ success: true, message: 'Payment verified and report unlocked!' });
        } else {
            res.status(400).json({ error: 'Invalid signature' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Verification failed' });
    }
});

// =======================================================================
// 2. DYNAMIC SITEMAP ROUTE
// =======================================================================
app.get('/sitemap.xml', async (req, res) => {
    try {
      // Changed to use the initialized `sql` instance
      const pseoPages = await sql`SELECT slug FROM pseo_pages`;
      const baseUrl = 'https://pandalime.com';
      
      let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
      xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  
      const staticRoutes = [
        '/', '/login', '/dashboard', '/roast-wall', 
        '/contact', '/terms', '/privacy-policy'
      ];
  
      staticRoutes.forEach(route => {
        xml += `  <url>\n    <loc>${baseUrl}${route}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${route === '/' ? '1.0' : '0.8'}</priority>\n  </url>\n`;
      });
  
      pseoPages.forEach(page => {
        xml += `  <url>\n    <loc>${baseUrl}/scanner/${page.slug}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>\n`;
      });
  
      xml += `</urlset>`;
  
      res.header('Content-Type', 'application/xml');
      res.send(xml);
      
    } catch (error) {
      console.error("Sitemap Generation Error:", error);
      res.status(500).send("Error generating sitemap");
    }
});

// =======================================================================
// 3. PROGRAMMATIC SEO INTERCEPTOR
// =======================================================================
const seoCache = new Map();

// Helper function to inject canonical, title, and description into HTML
function injectMetaTags(html, canonicalUrl, title, description) {
    // Remove existing canonical and inject new one
    html = html.replace(/<link rel="canonical" href="[^"]*" \/>/, '');
    html = html.replace(/<\/head>/, `    <link rel="canonical" href="${canonicalUrl}" />\n  </head>`);
    
    // Update title
    html = html.replace(/<title>.*<\/title>/, `<title>${title}</title>`);
    
    // Update or add meta description
    if (html.includes('<meta name="description"')) {
        html = html.replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${description}">`);
    } else {
        html = html.replace(/<meta name="viewport"/, `<meta name="description" content="${description}" />\n    <meta name="viewport"`);
    }
    
    return html;
}

app.get('/scanner/:slug', async (req, res) => {
    const { slug } = req.params;
    const protocol = req.protocol;
    const host = req.get('host');
    const canonicalUrl = `${protocol}://${host}/scanner/${slug}`;
    
    const cacheKey = `${slug}::${canonicalUrl}`;
    
    if (seoCache.has(cacheKey)) {
        return res.send(seoCache.get(cacheKey));
    }
  
    try {
      const seoData = await sql`SELECT * FROM pseo_pages WHERE slug = ${slug}`;
      const page = seoData[0] || { 
          title: "Free AI ATS Resume Scanner", 
          description: "Beat the ATS algorithms and land your dream job." 
      };
  
      const indexPath = path.resolve(__dirname, '../frontend/dist/index.html');
      let html = fs.readFileSync(indexPath, 'utf8');
  
      const pageTitle = `${page.title} - PandaLime`;
      html = injectMetaTags(html, canonicalUrl, pageTitle, page.description);
  
      const hiddenText = `<div style="display:none;" id="seo-content">
    <h1>${page.title}</h1>
    <h2>Optimize your resume for ${slug.replace(/-/g, ' ')} roles</h2>
    <p>${page.description}</p>
    <p>Beat the ATS algorithms and land your dream job.</p>
</div>`;
      
      html = html.replace('<body>', `<body>${hiddenText}`);
  
      seoCache.set(cacheKey, html);
      res.send(html);
    } catch (error) {
      console.error("pSEO Error:", error);
      res.sendFile(path.resolve(__dirname, '../frontend/dist/index.html'));
    }
});

// =======================================================================
// 4. REACT FRONTEND SERVING & CATCH-ALL ROUTES (MUST BE ABSOLUTE LAST)
// =======================================================================
// Serve static files
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Handle root and main page routes with proper canonical
app.get('/dashboard', (req, res) => {
    const protocol = req.protocol;
    const host = req.get('host');
    const canonicalUrl = `${protocol}://${host}/dashboard`;
    const indexPath = path.join(__dirname, '../frontend/dist/index.html');
    let html = fs.readFileSync(indexPath, 'utf8');
    html = injectMetaTags(html, canonicalUrl, 'Dashboard | PandaLime Career Scanner', 'Your analyzed resume reports and career insights');
    res.send(html);
});

app.get('/roast-wall', (req, res) => {
    const protocol = req.protocol;
    const host = req.get('host');
    const canonicalUrl = `${protocol}://${host}/roast-wall`;
    const indexPath = path.join(__dirname, '../frontend/dist/index.html');
    let html = fs.readFileSync(indexPath, 'utf8');
    html = injectMetaTags(html, canonicalUrl, 'Roast Wall | PandaLime Career Scanner', 'Community resume reviews and career advice');
    res.send(html);
});

app.get('/contact', (req, res) => {
    const protocol = req.protocol;
    const host = req.get('host');
    const canonicalUrl = `${protocol}://${host}/contact`;
    const indexPath = path.join(__dirname, '../frontend/dist/index.html');
    let html = fs.readFileSync(indexPath, 'utf8');
    html = injectMetaTags(html, canonicalUrl, 'Contact Us | PandaLime Career Scanner', 'Get in touch with our team');
    res.send(html);
});

app.get('/terms', (req, res) => {
    const protocol = req.protocol;
    const host = req.get('host');
    const canonicalUrl = `${protocol}://${host}/terms`;
    const indexPath = path.join(__dirname, '../frontend/dist/index.html');
    let html = fs.readFileSync(indexPath, 'utf8');
    html = injectMetaTags(html, canonicalUrl, 'Terms of Service | PandaLime Career Scanner', 'Terms of service and legal information');
    res.send(html);
});

app.get('/privacy-policy', (req, res) => {
    const protocol = req.protocol;
    const host = req.get('host');
    const canonicalUrl = `${protocol}://${host}/privacy-policy`;
    const indexPath = path.join(__dirname, '../frontend/dist/index.html');
    let html = fs.readFileSync(indexPath, 'utf8');
    html = injectMetaTags(html, canonicalUrl, 'Privacy Policy | PandaLime Career Scanner', 'Our privacy policy and data protection practices');
    res.send(html);
});

// Catch-all for SPA routing (MUST BE ABSOLUTE LAST)
app.get('*', (req, res) => {
    const protocol = req.protocol;
    const host = req.get('host');
    const canonicalUrl = `${protocol}://${host}/`;
    const indexPath = path.join(__dirname, '../frontend/dist/index.html');
    let html = fs.readFileSync(indexPath, 'utf8');
    html = injectMetaTags(html, canonicalUrl, 'Scan Resume for Free | PandaLime Career Scanner', 'Beat the ATS algorithms with our free AI-powered resume scanner');
    res.send(html);
});

// --- START SERVER ---
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});