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
const PAYWALL_ENABLED = process.env.ENABLE_PAYWALL === 'true';
const BASE_CANONICAL_DOMAIN = 'https://www.pandalime.com';

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
    res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://checkout.razorpay.com; style-src 'self' 'unsafe-inline' https:; img-src 'self' data: https:; font-src 'self' data: https:; connect-src 'self' https://api.groq.com https://*.google.com https://www.google-analytics.com https://api.razorpay.com https://pandalime-backend.onrender.com; frame-src https://api.razorpay.com; frame-ancestors 'none'");
    
    // X-Frame-Options: Prevents clickjacking
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    
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
            VALUES (${analysis.match_score}, ${JSON.stringify(analysis.missing_keywords)}, ${analysis.resume_critique}, ${!PAYWALL_ENABLED}, ${analysis.job_title}, FALSE)
            RETURNING id
        `;

        res.json({ success: true, reportId: savedReport[0].id, analysis, isUnlocked: !PAYWALL_ENABLED });

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
// 2. DYNAMIC SITEMAP & ROBOTS ROUTE
// =======================================================================
app.get('/robots.txt', (req, res) => {
    const robotsPath = path.resolve(__dirname, '../frontend/dist/robots.txt');
    const publicRobotsPath = path.resolve(__dirname, '../frontend/public/robots.txt');
    if (fs.existsSync(robotsPath)) {
        res.type('text/plain');
        return res.sendFile(robotsPath);
    } else if (fs.existsSync(publicRobotsPath)) {
        res.type('text/plain');
        return res.sendFile(publicRobotsPath);
    }
    res.type('text/plain').send(`User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: ${BASE_CANONICAL_DOMAIN}/sitemap.xml`);
});

app.get('/sitemap.xml', async (req, res) => {
    try {
        const sitemapPath = path.resolve(__dirname, '../frontend/dist/sitemap.xml');
        const publicSitemapPath = path.resolve(__dirname, '../frontend/public/sitemap.xml');
        if (fs.existsSync(sitemapPath)) {
            res.header('Content-Type', 'application/xml');
            return res.sendFile(sitemapPath);
        } else if (fs.existsSync(publicSitemapPath)) {
            res.header('Content-Type', 'application/xml');
            return res.sendFile(publicSitemapPath);
        }

        const staticRoutes = [
            { path: '/', priority: '1.0', changefreq: 'daily' },
            { path: '/roast-wall', priority: '0.8', changefreq: 'daily' },
            { path: '/sitemap', priority: '0.7', changefreq: 'weekly' },
            { path: '/contact', priority: '0.5', changefreq: 'monthly' },
            { path: '/privacy-policy', priority: '0.4', changefreq: 'monthly' },
            { path: '/terms', priority: '0.4', changefreq: 'monthly' },
            { path: '/login', priority: '0.5', changefreq: 'monthly' },
            { path: '/dashboard', priority: '0.6', changefreq: 'weekly' }
        ];

        let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
        xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

        staticRoutes.forEach(r => {
            xml += `  <url>\n    <loc>${BASE_CANONICAL_DOMAIN}${r.path}</loc>\n    <lastmod>2026-09-06</lastmod>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>\n`;
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
app.get('/scanner/:slug', (req, res) => {
    const { slug } = req.params;
    const prerenderedPath = path.resolve(__dirname, `../frontend/dist/scanner/${slug}/index.html`);
    
    if (fs.existsSync(prerenderedPath)) {
        return res.sendFile(prerenderedPath);
    }

    const defaultIndexPath = path.resolve(__dirname, '../frontend/dist/index.html');
    if (fs.existsSync(defaultIndexPath)) {
        return res.sendFile(defaultIndexPath);
    }

    res.status(404).send('Not Found');
});

// === STATIC FILE SERVING ===
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// === CATCH-ALL FOR SPA ROUTING (MUST BE ABSOLUTE LAST) ===
app.get('*', (req, res) => {
    const cleanPath = req.path.replace(/^\/+/, '').replace(/\/+$/, '');
    const prerenderedPath = path.resolve(__dirname, `../frontend/dist/${cleanPath}/index.html`);

    if (cleanPath && fs.existsSync(prerenderedPath)) {
        return res.sendFile(prerenderedPath);
    }

    const defaultIndexPath = path.resolve(__dirname, '../frontend/dist/index.html');
    if (fs.existsSync(defaultIndexPath)) {
        return res.sendFile(defaultIndexPath);
    }

    res.status(404).send('Page Not Found');
});

// --- START SERVER ---
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});