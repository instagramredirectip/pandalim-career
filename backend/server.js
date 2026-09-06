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
// 1. STANDARD API & HEALTH CHECK ROUTES (For UptimeRobot / Ping Keep-Alive)
// =======================================================================
app.get(['/api/health', '/health', '/ping'], (req, res) => {
    res.status(200).json({ 
        status: 'success', 
        message: 'PandaLime backend is active!', 
        timestamp: new Date().toISOString() 
    });
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

// --- FREE AI TOOLS ROUTES ---
app.post('/api/tools/generate-star-bullets', async (req, res) => {
    try {
        const { role, task, tools, metric } = req.body;
        if (!task) {
            return res.status(400).json({ error: 'Task description is required' });
        }

        const prompt = `You are an executive resume writer and ATS algorithm optimization expert.
Transform this candidate's raw job duty into 3 high-impact, quantified STAR-method resume bullet points following Google's X-Y-Z formula ("Accomplished [X] as measured by [Y], by doing [Z]").

Candidate Information:
- Target Role: ${role || 'Software Engineer'}
- Raw Task/Duty: ${task}
- Tech Stack / Tools: ${tools || 'Relevant industry tools'}
- Metric / Outcome: ${metric || 'Quantified business and performance metrics'}

Return ONLY a raw JSON object with this exact structure:
{
  "bullets": [
    "String 1: Strong action verb + technical context + quantified metric",
    "String 2: Alternative action verb + architecture/workflow + quantified metric",
    "String 3: High-impact leadership/optimization angle + quantified metric"
  ]
}`;

        const aiResponseText = await generateAIResponseWithFallback(prompt);
        const parsed = JSON.parse(aiResponseText);
        res.json({ success: true, bullets: parsed.bullets || [] });
    } catch (error) {
        console.error('STAR Bullets Generation Error:', error);
        res.status(500).json({ error: 'Failed to generate AI bullets' });
    }
});

// --- PORTFOLIO STORAGE & BACKEND ROUTES ---
const memoryPortfolios = new Map();

const RESERVED_SLUGS = new Set([
    'admin', 'api', 'app', 'dashboard', 'login', 'signup', 'register',
    'roast-wall', 'scanner', 'tools', 'portfolio-builder', 'p', 'portfolio',
    'sitemap', 'contact', 'terms', 'privacy-policy', 'hi', 'ta', 'te', 'kn', 'mr', 'bn',
    'alex-secops', 'priya-sharma', 'rohan-ai', 'arjun-sre', 'kavya-fresher', 'sam-design'
]);

async function initPortfoliosTable() {
    try {
        await sql`
            CREATE TABLE IF NOT EXISTS portfolios (
                id SERIAL PRIMARY KEY,
                slug VARCHAR(100) UNIQUE NOT NULL,
                full_name VARCHAR(255) NOT NULL,
                title VARCHAR(255) NOT NULL,
                tagline VARCHAR(255),
                bio TEXT,
                avatar_url TEXT,
                location VARCHAR(255),
                availability_status VARCHAR(255),
                theme VARCHAR(50) DEFAULT 'cyber',
                accent_color VARCHAR(50) DEFAULT 'lime',
                contact_email VARCHAR(255),
                social_links JSONB DEFAULT '{}',
                metrics JSONB DEFAULT '[]',
                skills JSONB DEFAULT '{}',
                projects JSONB DEFAULT '[]',
                experience JSONB DEFAULT '[]',
                certifications JSONB DEFAULT '[]',
                edit_key VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;
        // Ensure edit_key column exists if table was created previously
        await sql`ALTER TABLE portfolios ADD COLUMN IF NOT EXISTS edit_key VARCHAR(255);`;
        console.log('✓ Portfolios table initialized in database');
    } catch (e) {
        console.warn('Portfolios DB table initialization skipped (using memory/cache mode):', e.message);
    }
}
initPortfoliosTable();

// 1. Real-time Vanity URL Availability & Ownership Check
app.get('/api/portfolios/check-availability/:slug', async (req, res) => {
    try {
        const { slug } = req.params;
        const editKey = req.query.editKey || '';
        const cleanSlug = (slug || '').toLowerCase().trim().replace(/[^a-z0-9_-]/g, '-');

        if (!cleanSlug || cleanSlug.length < 2) {
            return res.json({ available: false, message: 'Vanity URL must be at least 2 characters long.' });
        }

        if (RESERVED_SLUGS.has(cleanSlug)) {
            return res.json({ 
                available: false, 
                isReserved: true, 
                message: `The name "${cleanSlug}" is reserved. Please pick a custom username.` 
            });
        }

        // Check in database
        try {
            const [existing] = await sql`SELECT slug, edit_key FROM portfolios WHERE slug = ${cleanSlug} LIMIT 1`;
            if (existing) {
                if (editKey && existing.edit_key && editKey === existing.edit_key) {
                    return res.json({ available: true, isOwner: true, message: 'You own this vanity URL.' });
                }
                return res.json({ 
                    available: false, 
                    isOwner: false, 
                    message: `The vanity URL @${cleanSlug} is already taken. Please choose another username.` 
                });
            }
        } catch (dbErr) {
            console.warn('DB check error, checking memory:', dbErr.message);
        }

        // Check memory cache
        if (memoryPortfolios.has(cleanSlug)) {
            const memItem = memoryPortfolios.get(cleanSlug);
            if (editKey && memItem.editKey && editKey === memItem.editKey) {
                return res.json({ available: true, isOwner: true, message: 'You own this vanity URL.' });
            }
            return res.json({ 
                available: false, 
                isOwner: false, 
                message: `The vanity URL @${cleanSlug} is already taken. Please choose another username.` 
            });
        }

        return res.json({ available: true, isOwner: true, message: 'Vanity URL is available!' });
    } catch (error) {
        console.error('Check Availability Error:', error);
        res.status(500).json({ error: 'Failed to check availability' });
    }
});

// 2. Publish / Save Portfolio (with Conflict and Ownership Protection)
app.post('/api/portfolios', async (req, res) => {
    try {
        const data = req.body;
        if (!data || !data.slug) {
            return res.status(400).json({ error: 'Missing portfolio data or slug' });
        }

        const cleanSlug = data.slug.toLowerCase().trim().replace(/[^a-z0-9_-]/g, '-');
        if (cleanSlug.length < 2) {
            return res.status(400).json({ error: 'Vanity URL slug must be at least 2 characters.' });
        }

        if (RESERVED_SLUGS.has(cleanSlug)) {
            return res.status(409).json({ 
                error: `The vanity URL "${cleanSlug}" is reserved. Please choose a custom username.` 
            });
        }

        // Check existing record for conflict / ownership
        let existingEditKey = null;
        try {
            const [row] = await sql`SELECT edit_key FROM portfolios WHERE slug = ${cleanSlug} LIMIT 1`;
            if (row) {
                existingEditKey = row.edit_key;
            }
        } catch (dbErr) {
            console.warn('DB check on publish fallback to memory:', dbErr.message);
        }

        if (!existingEditKey && memoryPortfolios.has(cleanSlug)) {
            existingEditKey = memoryPortfolios.get(cleanSlug).editKey;
        }

        // If record exists and client does NOT provide the matching editKey -> REJECT
        if (existingEditKey && (!data.editKey || data.editKey !== existingEditKey)) {
            return res.status(409).json({ 
                error: `The vanity URL "@${cleanSlug}" is already taken by another user. Please choose a different username (e.g. ${cleanSlug}-dev).` 
            });
        }

        const finalEditKey = data.editKey || existingEditKey || crypto.randomUUID();

        memoryPortfolios.set(cleanSlug, { ...data, slug: cleanSlug, editKey: finalEditKey });

        try {
            await sql`
                INSERT INTO portfolios (
                    slug, full_name, title, tagline, bio, avatar_url, location, 
                    availability_status, theme, accent_color, contact_email, 
                    social_links, metrics, skills, projects, experience, certifications, edit_key, updated_at
                ) VALUES (
                    ${cleanSlug}, 
                    ${data.fullName || 'Tech Professional'}, 
                    ${data.title || 'Software Engineer'}, 
                    ${data.tagline || ''}, 
                    ${data.bio || ''}, 
                    ${data.avatarUrl || ''}, 
                    ${data.location || ''}, 
                    ${data.availabilityStatus || ''}, 
                    ${data.theme || 'cyber'}, 
                    ${data.accentColor || 'lime'}, 
                    ${data.contactEmail || ''}, 
                    ${JSON.stringify(data.socialLinks || {})}, 
                    ${JSON.stringify(data.metrics || [])}, 
                    ${JSON.stringify(data.skills || {})}, 
                    ${JSON.stringify(data.projects || [])}, 
                    ${JSON.stringify(data.experience || [])}, 
                    ${JSON.stringify(data.certifications || [])}, 
                    ${finalEditKey},
                    NOW()
                )
                ON CONFLICT (slug) DO UPDATE SET
                    full_name = EXCLUDED.full_name,
                    title = EXCLUDED.title,
                    tagline = EXCLUDED.tagline,
                    bio = EXCLUDED.bio,
                    avatar_url = EXCLUDED.avatar_url,
                    location = EXCLUDED.location,
                    availability_status = EXCLUDED.availability_status,
                    theme = EXCLUDED.theme,
                    accent_color = EXCLUDED.accent_color,
                    contact_email = EXCLUDED.contact_email,
                    social_links = EXCLUDED.social_links,
                    metrics = EXCLUDED.metrics,
                    skills = EXCLUDED.skills,
                    projects = EXCLUDED.projects,
                    experience = EXCLUDED.experience,
                    certifications = EXCLUDED.certifications,
                    edit_key = EXCLUDED.edit_key,
                    updated_at = NOW();
            `;
        } catch (dbErr) {
            console.warn('DB Save fallback, saved in memory cache:', dbErr.message);
        }

        res.json({ 
            success: true, 
            slug: cleanSlug, 
            editKey: finalEditKey, 
            url: `https://www.pandalime.com/p/${cleanSlug}` 
        });
    } catch (error) {
        console.error('Save Portfolio Error:', error);
        res.status(500).json({ error: 'Failed to save portfolio' });
    }
});

app.get('/api/portfolios/:slug', async (req, res) => {
    try {
        const { slug } = req.params;
        const cleanSlug = slug.toLowerCase();

        try {
            const safeParse = (val, fallback) => {
                if (!val) return fallback;
                if (typeof val === 'object') return val;
                try {
                    return JSON.parse(val);
                } catch {
                    return fallback;
                }
            };

            const [row] = await sql`SELECT * FROM portfolios WHERE slug = ${cleanSlug} LIMIT 1`;
            if (row) {
                return res.json({
                    success: true,
                    portfolio: {
                        slug: row.slug,
                        fullName: row.full_name,
                        title: row.title,
                        tagline: row.tagline || '',
                        bio: row.bio || '',
                        avatarUrl: row.avatar_url || '',
                        location: row.location || '',
                        availabilityStatus: row.availability_status || '',
                        theme: row.theme || 'cyber',
                        accentColor: row.accent_color || 'lime',
                        contactEmail: row.contact_email || '',
                        socialLinks: safeParse(row.social_links, {}),
                        metrics: safeParse(row.metrics, []),
                        skills: safeParse(row.skills, {}),
                        projects: safeParse(row.projects, []),
                        experience: safeParse(row.experience, []),
                        certifications: safeParse(row.certifications, [])
                    }
                });
            }
        } catch (dbErr) {
            console.warn('DB Get error, checking memory:', dbErr.message);
        }

        if (memoryPortfolios.has(cleanSlug)) {
            return res.json({ success: true, portfolio: memoryPortfolios.get(cleanSlug) });
        }

        res.status(404).json({ error: 'Portfolio not found' });
    } catch (error) {
        console.error('Get Portfolio Error:', error);
        res.status(500).json({ error: 'Failed to fetch portfolio' });
    }
});

// AI Assistant for Portfolio Studio
app.post('/api/tools/portfolio-ai-assist', async (req, res) => {
    try {
        const { action, prompt, bio, title } = req.body;

        if (action === 'polish_bio') {
            const systemPrompt = `You are an elite executive career and portfolio copywriter.
Polish the following candidate bio for their personal website portfolio into a punchy, high-converting, professional paragraph (80-120 words).
Candidate Title: ${title || 'Software Professional'}
Current Bio: ${bio}

Return strictly a raw JSON object:
{
  "polishedBio": "The polished bio text here..."
}`;
            const aiResp = await generateAIResponseWithFallback(systemPrompt);
            const parsed = JSON.parse(aiResp);
            return res.json({ success: true, polishedBio: parsed.polishedBio });
        }

        if (action === 'generate_from_prompt') {
            const systemPrompt = `You are an expert developer portfolio creator.
Based on the following natural language user description, generate a complete structured developer portfolio profile.
User Description: "${prompt}"

Return ONLY a raw JSON object with this exact schema:
{
  "fullName": "Professional Name",
  "title": "Specific Job Title",
  "tagline": "Punchy subtitle with 3 key pillars",
  "bio": "Detailed 80-word executive summary",
  "theme": "cyber",
  "accentColor": "lime",
  "location": "City, Country / Remote",
  "availabilityStatus": "🟢 Available for Hire",
  "metrics": [
    { "label": "Years Experience", "value": "4+" },
    { "label": "Projects Completed", "value": "15+" },
    { "label": "Key Metric", "value": "99.9%" },
    { "label": "Highlight", "value": "Top 1%" }
  ],
  "skills": {
    "Core Technologies": ["Skill A", "Skill B", "Skill C"],
    "Tools & Platforms": ["Skill D", "Skill E"]
  },
  "projects": [
    {
      "title": "Project Name",
      "description": "Technical problem solved and architecture.",
      "metric": "Key quantified accomplishment",
      "tags": ["Tag1", "Tag2", "Tag3"],
      "demoUrl": "https://demo.dev",
      "githubUrl": "https://github.com/demo"
    }
  ],
  "experience": [
    {
      "role": "Role Title",
      "company": "Company Name",
      "period": "2023 - Present",
      "location": "Location",
      "bullets": [
        "Quantified STAR achievement bullet point 1",
        "Quantified STAR achievement bullet point 2"
      ]
    }
  ],
  "certifications": [
    { "name": "Certification Name", "issuer": "Issuer", "year": "2024" }
  ]
}`;
            const aiResp = await generateAIResponseWithFallback(systemPrompt);
            const parsed = JSON.parse(aiResp);
            return res.json({ success: true, portfolio: parsed });
        }

        res.status(400).json({ error: 'Invalid action specified' });
    } catch (error) {
        console.error('Portfolio AI Assist Error:', error);
        res.status(500).json({ error: 'Failed to process AI assist' });
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