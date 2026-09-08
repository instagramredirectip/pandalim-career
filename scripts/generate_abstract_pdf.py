import os
import sys
import shutil
import pymupdf
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable, PageBreak
)
from reportlab.pdfgen import canvas

# Canvas for 2-page document with headers and footers
class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super(NumberedCanvas, self).__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            canvas.Canvas.showPage(self)
        canvas.Canvas.save(self)

    def draw_page_decorations(self, page_count):
        self.saveState()
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#64748b"))
        
        # Header on page 2+
        if self._pageNumber > 1:
            self.drawString(40, 762, "PandaLime — Project Abstract, Resume Scanner & Portfolio System")
            self.drawRightString(572, 762, "https://www.pandalime.com")
            self.setStrokeColor(colors.HexColor("#cbd5e1"))
            self.setLineWidth(0.5)
            self.line(40, 754, 572, 754)
        
        # Footer on all pages
        footer_text = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(572, 22, footer_text)
        self.drawString(40, 22, "PandaLime • Hosted on Render • Neon PostgreSQL • Google Gemini AI • Free & Open Access")
        self.setStrokeColor(colors.HexColor("#cbd5e1"))
        self.setLineWidth(0.5)
        self.line(40, 32, 572, 32)
        self.restoreState()

# Canvas for 1-page document
class SinglePageCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super(SinglePageCanvas, self).__init__(*args, **kwargs)

    def draw_decorations(self):
        self.saveState()
        self.setFont("Helvetica", 7.5)
        self.setFillColor(colors.HexColor("#64748b"))
        self.drawString(36, 16, "PandaLime Career Suite • Hosted on Render • Neon PostgreSQL • Google Gemini AI")
        self.drawRightString(576, 16, "1-Page Executive Abstract")
        self.setStrokeColor(colors.HexColor("#cbd5e1"))
        self.setLineWidth(0.5)
        self.line(36, 24, 576, 24)
        self.restoreState()

    def showPage(self):
        self.draw_decorations()
        super(SinglePageCanvas, self).showPage()


def build_2page_pdf(filename):
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        leftMargin=40,
        rightMargin=40,
        topMargin=42,
        bottomMargin=38
    )

    styles = getSampleStyleSheet()
    
    PRIMARY_DARK = colors.HexColor("#3f6212")   # Lime-800
    PRIMARY = colors.HexColor("#4d7c0f")        # Lime-700
    DARK = colors.HexColor("#0f172a")           # Slate-900
    BODY = colors.HexColor("#334155")           # Slate-700
    MUTED = colors.HexColor("#64748b")          # Slate-500
    BG_LIGHT = colors.HexColor("#f8fafc")       # Slate-50
    BORDER = colors.HexColor("#e2e8f0")         # Slate-200
    WHITE = colors.HexColor("#ffffff")
    LIME_BG = colors.HexColor("#f7fee7")        # Lime-50
    LIME_BORDER = colors.HexColor("#bef264")    # Lime-300
    BLUE_BG = colors.HexColor("#eff6ff")        # Blue-50
    BLUE_BORDER = colors.HexColor("#bfdbfe")    # Blue-200

    title_style = ParagraphStyle('DocTitle', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=17, leading=21, textColor=DARK)
    h1_style = ParagraphStyle('SectionH1', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=10.5, leading=14, textColor=PRIMARY_DARK, spaceBefore=7, spaceAfter=3)
    h2_style = ParagraphStyle('SectionH2', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=9, leading=12, textColor=DARK, spaceBefore=3, spaceAfter=2)
    body_style = ParagraphStyle('BodyCustom', parent=styles['Normal'], fontName='Helvetica', fontSize=8.2, leading=11.8, textColor=BODY, spaceAfter=3)
    body_bold = ParagraphStyle('BodyBold', parent=body_style, fontName='Helvetica-Bold')
    card_header = ParagraphStyle('CardHeader', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=8.5, leading=11.5, textColor=DARK, spaceAfter=2)
    card_body = ParagraphStyle('CardBody', parent=styles['Normal'], fontName='Helvetica', fontSize=7.8, leading=10.8, textColor=BODY)
    table_header = ParagraphStyle('TableHeader', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=8.2, leading=10.5, textColor=WHITE)

    story = []

    # ================= PAGE 1 =================
    hdr_left = Paragraph("<b>PandaLime</b> <font color='#65a30d'>Career & Portfolio Platform</font><br/><font size='8' color='#64748b'>Project Abstract, Resume Scanner, Portfolio Builder & System Architecture</font>", title_style)
    hdr_right = Paragraph("<b>PROJECT ABSTRACT</b><br/><font color='#64748b' size='7.5'>Platform URL: <b>pandalime.com</b><br/>Host: Render • DB: Neon PostgreSQL<br/>Updated: September 2026</font>", ParagraphStyle('HdrR', parent=styles['Normal'], fontName='Helvetica', fontSize=7.5, leading=10.5, alignment=2))
    
    t_hdr = Table([[hdr_left, hdr_right]], colWidths=[340, 192])
    t_hdr.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('PADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(t_hdr)
    story.append(HRFlowable(width="100%", thickness=1.5, color=PRIMARY, spaceAfter=6, spaceBefore=4))

    # Section 1: Executive Summary
    story.append(Paragraph("1. Executive Summary (What is PandaLime?)", h1_style))
    story.append(Paragraph(
        "<b>PandaLime</b> (<b>pandalime.com</b>) is a free, modern career platform designed to help job seekers bypass automated hiring barriers "
        "(known as <b>Applicant Tracking Systems</b> or <b>ATS</b>) and showcase their talent directly to employers. Over 90% of mid-to-large companies "
        "use software (like Workday, Taleo, and Greenhouse) to filter resumes before human recruiters read them. Resumes missing critical keywords or formatted "
        "incorrectly are discarded automatically.",
        body_style
    ))
    story.append(Paragraph(
        "PandaLime solves this with a dual-engine platform: (1) an <b>AI Resume Scanner</b> that analyzes and fixes resumes against specific job descriptions in 3 seconds, "
        "and (2) an <b>AI Portfolio Builder</b> that instantly turns resume details into a sleek, published personal developer website.",
        body_style
    ))

    # 3 Feature Value Cards
    cards_data = [
        [
            Paragraph("<b>100% Free & No Sign-Up</b>", card_header),
            Paragraph("<b>Instant 3-Sec AI Scanner</b>", card_header),
            Paragraph("<b>1-Click AI Portfolio Site</b>", card_header)
        ],
        [
            Paragraph("No paywalls or credit cards. Anyone can run full resume scans and generate portfolio previews without mandatory signup.", card_body),
            Paragraph("Powered by Google Gemini AI to analyze full resumes and job descriptions in 3 to 5 seconds with precise keyword scoring.", card_body),
            Paragraph("Converts resume data into a live personal portfolio website at <code>pandalime.com/p/yourname</code>, ready to share with recruiters.", card_body)
        ]
    ]
    t_cards = Table(cards_data, colWidths=[172, 172, 172])
    t_cards.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), LIME_BG),
        ('BOX', (0,0), (-1,-1), 0.75, LIME_BORDER),
        ('INNERGRID', (0,0), (-1,-1), 0.5, LIME_BORDER),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 7),
        ('RIGHTPADDING', (0,0), (-1,-1), 7),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(t_cards)
    story.append(Spacer(1, 6))

    # Section 2: How Resume Scanning Works
    story.append(Paragraph("2. How the Resume Scanner Works (Step-by-Step)", h1_style))
    steps_data = [
        [
            Paragraph("<b>Step 1: Upload & Text Extraction</b>", h2_style),
            Paragraph("The user uploads their resume as a PDF and pastes a target job description. The server parses the file and extracts clean text while removing unreadable layout quirks.", body_style)
        ],
        [
            Paragraph("<b>Step 2: Binary Safety Verification</b>", h2_style),
            Paragraph("The backend inspects the binary header (<code>%PDF-</code> magic bytes) to ensure the uploaded file is genuinely a safe PDF, protecting against malicious payloads.", body_style)
        ],
        [
            Paragraph("<b>Step 3: Google Gemini AI Analysis</b>", h2_style),
            Paragraph("Gemini AI compares the resume text against the job requirements, checking for vital hard skills, frameworks, tools, methodologies, and quantified results.", body_style)
        ],
        [
            Paragraph("<b>Step 4: Interactive Score & Action Plan</b>", h2_style),
            Paragraph("In seconds, the user gets: an <b>ATS Match Score (0–100)</b>, exact <b>missing keywords</b> to add, <b>rewritten Google X-Y-Z bullet points</b> (<i>'Accomplished [X] by doing [Z], resulting in [Y]'</i>), and formatting alerts.", body_style)
        ]
    ]
    t_steps = Table(steps_data, colWidths=[150, 382])
    t_steps.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), BG_LIGHT),
        ('BOX', (0,0), (-1,-1), 0.5, BORDER),
        ('LINEBELOW', (0,0), (-1,-2), 0.5, BORDER),
        ('TOPPADDING', (0,0), (-1,-1), 3.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3.5),
        ('LEFTPADDING', (0,0), (-1,-1), 7),
        ('RIGHTPADDING', (0,0), (-1,-1), 7),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(t_steps)
    story.append(Spacer(1, 6))

    # Section 3: AI Portfolio Builder Feature
    story.append(Paragraph("3. AI Portfolio Builder (Personal Website in 1-Click)", h1_style))
    story.append(Paragraph(
        "PandaLime includes a built-in <b>AI Portfolio Builder</b> that automatically transforms a candidate's resume or profile into a professional, "
        "fully interactive personal website hosted live on the platform:",
        body_style
    ))
    port_features = [
        [
            Paragraph("<b>Live Custom URL</b><br/><font color='#64748b'>Each published portfolio gets a clean custom link (e.g., <code>pandalime.com/p/alex-secops</code>) to share on LinkedIn, GitHub, and email signatures.</font>", card_body),
            Paragraph("<b>Recruiter-Ready Sections</b><br/><font color='#64748b'>Includes interactive project showcases with live demo links, technical skill badges, work experience timelines, and 1-click resume download.</font>", card_body)
        ],
        [
            Paragraph("<b>Modern Themes & Layouts</b><br/><font color='#64748b'>Instant switching between themes (Terminal Dev, Modern Minimal, Sleek Dark, Engineering) with responsive mobile & desktop support.</font>", card_body),
            Paragraph("<b>Database Backed (Neon DB)</b><br/><font color='#64748b'>User profiles and published portfolios are securely stored in serverless PostgreSQL (Neon DB) for instant global loading and editing.</font>", card_body)
        ]
    ]
    t_port = Table(port_features, colWidths=[261, 261])
    t_port.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), BLUE_BG),
        ('BOX', (0,0), (-1,-1), 0.5, BLUE_BORDER),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BLUE_BORDER),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 7),
        ('RIGHTPADDING', (0,0), (-1,-1), 7),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(t_port)

    # PAGE BREAK TO PAGE 2
    story.append(PageBreak())

    # ================= PAGE 2 =================
    story.append(Paragraph("4. Technology Stack & Infrastructure Architecture", h1_style))
    story.append(Paragraph(
        "PandaLime is built using modern cloud technologies designed for high performance, serverless scaling, and bulletproof security:",
        body_style
    ))

    tech_data = [
        [
            Paragraph("Component / Layer", table_header),
            Paragraph("Technologies Used", table_header),
            Paragraph("Practical Role & Purpose (Simple Words)", table_header)
        ],
        [
            Paragraph("<b>Frontend (UI)</b>", body_bold),
            Paragraph("<b>React 18 + Vite</b><br/><font color='#64748b' size='7.5'>Tailwind CSS, Lucide Icons</font>", body_style),
            Paragraph("Renders an ultra-fast, snappy interface that loads in milliseconds on mobile phones, tablets, and desktop computers.", body_style)
        ],
        [
            Paragraph("<b>Backend Server</b>", body_bold),
            Paragraph("<b>Node.js & Express</b><br/><font color='#64748b' size='7.5'>Multer, PDF-Parse, JWT</font>", body_style),
            Paragraph("Handles resume file uploads, checks PDF magic bytes, coordinates AI analysis, and exposes secure REST APIs.", body_style)
        ],
        [
            Paragraph("<b>Database</b>", body_bold),
            Paragraph("<b>Neon DB (PostgreSQL)</b><br/><font color='#64748b' size='7.5'>Serverless PostgreSQL</font>", body_style),
            Paragraph("Stores user profiles, saved resume scan reports, published portfolios (<code>/p/:slug</code>), and community roast comments with instant serverless scaling.", body_style)
        ],
        [
            Paragraph("<b>Artificial Intelligence</b>", body_bold),
            Paragraph("<b>Google Gemini AI</b><br/><font color='#64748b' size='7.5'>@google/genai (1.5 Flash)</font>", body_style),
            Paragraph("Acts as the intelligent recruiter engine: evaluates resume content against job postings, identifies keyword gaps, and rewrites bullet points.", body_style)
        ],
        [
            Paragraph("<b>Cloud Hosting</b>", body_bold),
            Paragraph("<b>Render Cloud Platform</b><br/><font color='#64748b' size='7.5'>Web Services & API Hosting</font>", body_style),
            Paragraph("Hosts both the Frontend client and Node.js Backend API on Render with automatic deployments, continuous health checks, and global SSL.", body_style)
        ],
        [
            Paragraph("<b>Speed & SEO (SSG)</b>", body_bold),
            Paragraph("<b>Static Pre-Rendering</b><br/><font color='#64748b' size='7.5'>Node scripts + Sitemap</font>", body_style),
            Paragraph("Pre-renders 235+ static HTML pages (including 12 career blog guides and 6 regional language hubs) for instant load times and top SEO ranking.", body_style)
        ],
        [
            Paragraph("<b>Security & Anti-Abuse</b>", body_bold),
            Paragraph("<b>HMAC CAPTCHA & Limits</b><br/><font color='#64748b' size='7.5'>Rate Limiters, Input Sanitizer</font>", body_style),
            Paragraph("Stops spam bots with mathematical proof-of-human challenges, multi-tier sliding-window IP limits, and strict XSS URL sanitizers.", body_style)
        ]
    ]

    t_tech = Table(tech_data, colWidths=[90, 135, 307])
    t_tech.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), PRIMARY_DARK),
        ('BACKGROUND', (0,1), (-1,-1), BG_LIGHT),
        ('BOX', (0,0), (-1,-1), 0.5, BORDER),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER),
        ('TOPPADDING', (0,0), (-1,-1), 3.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3.5),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(t_tech)
    story.append(Spacer(1, 6))

    # Section 5: Additional Built-in Career Tools
    story.append(Paragraph("5. Additional Free Career Tools & Features", h1_style))
    feat_box_data = [
        [
            Paragraph("<b>STAR Bullet Point Generator</b><br/><font color='#64748b'>Walks users through Situation, Task, Action, and Result to turn routine duties into impressive, quantified achievement bullets.</font>", card_body),
            Paragraph("<b>250+ ATS Action Verbs Library</b><br/><font color='#64748b'>Comprehensive power word library categorized by Engineering, Leadership, Analysis, Scale, and Cost Efficiency.</font>", card_body)
        ],
        [
            Paragraph("<b>Job Keyword Extractor</b><br/><font color='#64748b'>Instant NLP keyword extractor that isolates required hard skills and certifications from any pasted job posting.</font>", card_body),
            Paragraph("<b>6 Indian Regional Language Portals</b><br/><font color='#64748b'>Dedicated localized interfaces in Hindi, Tamil, Telugu, Kannada, Marathi, and Bengali to democratize career tools.</font>", card_body)
        ]
    ]
    t_feat = Table(feat_box_data, colWidths=[261, 261])
    t_feat.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), BG_LIGHT),
        ('BOX', (0,0), (-1,-1), 0.5, BORDER),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 7),
        ('RIGHTPADDING', (0,0), (-1,-1), 7),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(t_feat)
    story.append(Spacer(1, 6))

    # Section 6: Summary & Mission
    story.append(Paragraph("6. Project Mission & Summary", h1_style))
    story.append(Paragraph(
        "PandaLime brings together Google Gemini AI intelligence, high-speed React web architecture, and serverless Neon PostgreSQL storage "
        "on Render to provide job seekers with an all-in-one, zero-cost career companion. It removes the guesswork from resume screening and gives "
        "every candidate the competitive edge they need to land their dream job.",
        body_style
    ))

    # Document signature box
    story.append(Spacer(1, 3))
    doc_info = [
        [
            Paragraph("<b>Platform:</b> PandaLime Career Suite", card_body),
            Paragraph("<b>Hosting:</b> Render Cloud", card_body),
            Paragraph("<b>Database:</b> Neon PostgreSQL", card_body),
            Paragraph("<b>Website:</b> https://www.pandalime.com", card_body)
        ]
    ]
    t_info = Table(doc_info, colWidths=[130, 110, 145, 147])
    t_info.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), LIME_BG),
        ('BOX', (0,0), (-1,-1), 0.5, LIME_BORDER),
        ('TOPPADDING', (0,0), (-1,-1), 3.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3.5),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(t_info)

    doc.build(story, canvasmaker=NumberedCanvas)
    print("Successfully built 2-page PDF at:", filename)


def build_1page_pdf(filename):
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        leftMargin=36,
        rightMargin=36,
        topMargin=26,
        bottomMargin=26
    )

    styles = getSampleStyleSheet()
    
    PRIMARY_DARK = colors.HexColor("#3f6212")
    PRIMARY = colors.HexColor("#4d7c0f")
    DARK = colors.HexColor("#0f172a")
    BODY = colors.HexColor("#334155")
    BG_LIGHT = colors.HexColor("#f8fafc")
    BORDER = colors.HexColor("#e2e8f0")
    WHITE = colors.HexColor("#ffffff")
    LIME_BG = colors.HexColor("#f7fee7")
    LIME_BORDER = colors.HexColor("#bef264")

    title_style = ParagraphStyle('T', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=15, leading=18, textColor=DARK)
    h1_style = ParagraphStyle('H1', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=9, leading=12, textColor=PRIMARY_DARK, spaceBefore=3.5, spaceAfter=1.5)
    body_style = ParagraphStyle('B', parent=styles['Normal'], fontName='Helvetica', fontSize=7.4, leading=10.2, textColor=BODY, spaceAfter=2)
    body_bold = ParagraphStyle('BB', parent=body_style, fontName='Helvetica-Bold')
    card_body = ParagraphStyle('CB', parent=styles['Normal'], fontName='Helvetica', fontSize=7.2, leading=9.6, textColor=BODY)
    table_hdr = ParagraphStyle('TH', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=7.5, leading=9.5, textColor=WHITE)

    story = []

    # Header
    hdr_left = Paragraph("<b>PandaLime</b> <font color='#65a30d'>Career & Portfolio Platform</font><br/><font size='7' color='#64748b'>Project Abstract • pandalime.com • Hosted on Render • Neon DB</font>", title_style)
    hdr_right = Paragraph("<b>EXECUTIVE ABSTRACT</b><br/><font color='#64748b' size='6.8'>Version 2026 • Free AI Career Platform</font>", ParagraphStyle('HR', parent=styles['Normal'], fontName='Helvetica', fontSize=7, leading=9.5, alignment=2))
    t_hdr = Table([[hdr_left, hdr_right]], colWidths=[360, 180])
    t_hdr.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'MIDDLE'), ('PADDING', (0,0), (-1,-1), 0)]))
    story.append(t_hdr)
    story.append(HRFlowable(width="100%", thickness=1.2, color=PRIMARY, spaceAfter=3, spaceBefore=2))

    # 1. What is PandaLime
    story.append(Paragraph("1. What is PandaLime? (In Simple Words)", h1_style))
    story.append(Paragraph(
        "<b>PandaLime</b> (<b>pandalime.com</b>) is a free web platform built to solve a major challenge in modern job applications: "
        "<b>Applicant Tracking Systems (ATS)</b>. Over 90% of mid-to-large companies use automated software to filter resumes before human recruiters read them. "
        "PandaLime acts as an intelligent career companion that (1) scores and fixes resumes against real job postings in 3 seconds, and (2) instantly creates a live, shareable personal portfolio website for the candidate.",
        body_style
    ))

    # Value Cards
    v_cards = [
        [
            Paragraph("<b>100% Free & Open Access</b><br/><font color='#64748b'>No paywalls, subscriptions, or forced signup.</font>", card_body),
            Paragraph("<b>3-Second AI Resume Scan</b><br/><font color='#64748b'>Instant score, missing skills & bullet rewrites.</font>", card_body),
            Paragraph("<b>1-Click AI Portfolio Builder</b><br/><font color='#64748b'>Live personal developer site at <code>/p/yourname</code>.</font>", card_body)
        ]
    ]
    t_vc = Table(v_cards, colWidths=[180, 180, 180])
    t_vc.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), LIME_BG),
        ('BOX', (0,0), (-1,-1), 0.5, LIME_BORDER),
        ('INNERGRID', (0,0), (-1,-1), 0.5, LIME_BORDER),
        ('PADDING', (0,0), (-1,-1), 3),
        ('VALIGN', (0,0), (-1,-1), 'TOP')
    ]))
    story.append(t_vc)
    story.append(Spacer(1, 2))

    # 2. How Resume Scanning Works
    story.append(Paragraph("2. How Resume Scanning Works (Step-by-Step)", h1_style))
    steps = [
        [
            Paragraph("<b>1. Upload & Extract:</b> User uploads resume PDF and pastes a job description. Plain text is safely extracted.", body_style),
            Paragraph("<b>2. Binary File Check:</b> Server verifies <code>%PDF-</code> magic bytes to block malicious payloads and ensure safety.", body_style)
        ],
        [
            Paragraph("<b>3. AI Comparison:</b> Google Gemini AI checks skills, tools, and experience against the job requirements.", body_style),
            Paragraph("<b>4. Instant Report:</b> Returns an <b>ATS Score (0–100)</b>, missing keywords, and Google X-Y-Z rewritten bullets.", body_style)
        ]
    ]
    t_st = Table(steps, colWidths=[270, 270])
    t_st.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), BG_LIGHT),
        ('BOX', (0,0), (-1,-1), 0.5, BORDER),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER),
        ('PADDING', (0,0), (-1,-1), 2.5),
        ('VALIGN', (0,0), (-1,-1), 'TOP')
    ]))
    story.append(t_st)
    story.append(Spacer(1, 2))

    # 3. AI Portfolio Builder Feature
    story.append(Paragraph("3. AI Portfolio Builder Feature (Live Personal Website)", h1_style))
    story.append(Paragraph(
        "The built-in <b>AI Portfolio Builder</b> turns resume details into a clean, modern personal website in 1 click. "
        "Each user gets a live shareable URL (e.g., <code>pandalime.com/p/username</code>) with interactive project showcases, live demo links, "
        "tech skill badges, work timeline, social links, downloadable resume, and instant theme switching (Terminal, Modern, Dark). "
        "All portfolios and profile data are stored in serverless <b>Neon PostgreSQL DB</b> for instant global loading.",
        body_style
    ))
    story.append(Spacer(1, 2))

    # 4. Technologies Used
    story.append(Paragraph("4. Technologies Used Across the Platform", h1_style))
    tech = [
        [Paragraph("Layer", table_hdr), Paragraph("Technology", table_hdr), Paragraph("What It Does (In Simple Words)", table_hdr)],
        [Paragraph("<b>Frontend (UI)</b>", body_bold), Paragraph("<b>React 18 + Vite + Tailwind</b>", body_style), Paragraph("Ultra-fast, responsive user interface hosted on Render for smooth mobile/desktop use.", body_style)],
        [Paragraph("<b>Backend Server</b>", body_bold), Paragraph("<b>Node.js + Express (Render)</b>", body_style), Paragraph("Handles file uploads, validates PDF magic bytes, coordinates AI, and serves REST APIs.", body_style)],
        [Paragraph("<b>Database</b>", body_bold), Paragraph("<b>Neon DB (PostgreSQL)</b>", body_style), Paragraph("Serverless PostgreSQL storing user accounts, saved scan reports, and live portfolios.", body_style)],
        [Paragraph("<b>AI Engine</b>", body_bold), Paragraph("<b>Google Gemini AI</b>", body_style), Paragraph("Reads resumes like a senior recruiter, finding skill gaps and rewriting bullet points.", body_style)],
        [Paragraph("<b>Hosting & Cloud</b>", body_bold), Paragraph("<b>Render Cloud Platform</b>", body_style), Paragraph("Hosts frontend web apps and backend services with global SSL and automatic deploys.", body_style)],
        [Paragraph("<b>Speed & Security</b>", body_bold), Paragraph("<b>SSG + HMAC CAPTCHA</b>", body_style), Paragraph("235+ pre-rendered static pages + rate limiters to block bots and load in milliseconds.", body_style)]
    ]
    t_tc = Table(tech, colWidths=[85, 140, 315])
    t_tc.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), PRIMARY_DARK),
        ('BACKGROUND', (0,1), (-1,-1), BG_LIGHT),
        ('BOX', (0,0), (-1,-1), 0.5, BORDER),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER),
        ('PADDING', (0,0), (-1,-1), 2),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE')
    ]))
    story.append(t_tc)
    story.append(Spacer(1, 2))

    # 5. Extra Tools & Summary
    story.append(Paragraph("5. Additional Free Tools & Summary", h1_style))
    extra_data = [
        [
            Paragraph("• <b>STAR Bullet Generator:</b> Converts tasks into quantified achievements.<br/>"
                      "• <b>250+ ATS Action Verbs:</b> Categorized power words for tech & leadership.", body_style),
            Paragraph("• <b>Job Keyword Extractor:</b> Isolates required hard skills from job postings.<br/>"
                      "• <b>6 Regional Portals:</b> Localized in Hindi, Tamil, Telugu, Kannada, Marathi, Bengali.", body_style)
        ]
    ]
    t_ex = Table(extra_data, colWidths=[270, 270])
    t_ex.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), BG_LIGHT),
        ('BOX', (0,0), (-1,-1), 0.5, BORDER),
        ('PADDING', (0,0), (-1,-1), 2.5),
        ('VALIGN', (0,0), (-1,-1), 'TOP')
    ]))
    story.append(t_ex)

    doc.build(story, canvasmaker=SinglePageCanvas)
    print("Successfully built 1-Page PDF at:", filename)


if __name__ == "__main__":
    out_2p = "/workspaces/pandalim-career/PandaLime_Project_Abstract.pdf"
    build_2page_pdf(out_2p)

    out_1p = "/workspaces/pandalim-career/PandaLime_Mini_Abstract_1Page.pdf"
    build_1page_pdf(out_1p)

    artifact_dir = "/home/codespace/.gemini/antigravity/brain/13ce5235-8229-413b-b54c-3398258ea273"
    shutil.copyfile(out_2p, os.path.join(artifact_dir, "PandaLime_Project_Abstract.pdf"))
    shutil.copyfile(out_1p, os.path.join(artifact_dir, "PandaLime_Mini_Abstract_1Page.pdf"))

    # Render previews
    doc_2p = pymupdf.open(out_2p)
    for i in range(len(doc_2p)):
        pix = doc_2p[i].get_pixmap(dpi=150)
        pix.save(os.path.join(artifact_dir, f"abstract_2p_page_{i+1}.png"))

    doc_1p = pymupdf.open(out_1p)
    pix1 = doc_1p[0].get_pixmap(dpi=150)
    pix1.save(os.path.join(artifact_dir, "abstract_1p_preview.png"))

    print("Generation complete!")
