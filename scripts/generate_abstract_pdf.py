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

# =========================================================================
# BLACK & WHITE CLASSIC CANVAS (2-Page)
# =========================================================================
class BlackWhiteNumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super(BlackWhiteNumberedCanvas, self).__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_decorations(num_pages)
            canvas.Canvas.showPage(self)
        canvas.Canvas.save(self)

    def draw_decorations(self, page_count):
        self.saveState()
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.black)
        
        # Header on page 2
        if self._pageNumber > 1:
            self.drawString(40, 755, "PandaLime — Project Abstract & Technical System Overview")
            self.drawRightString(572, 755, "pandalime.com")
            self.setStrokeColor(colors.black)
            self.setLineWidth(0.75)
            self.line(40, 748, 572, 748)
        
        # Footer on all pages
        footer_text = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(572, 22, footer_text)
        self.drawString(40, 22, "PandaLime Project Abstract • Hosted on Render • Neon PostgreSQL DB • Google Gemini AI")
        self.setStrokeColor(colors.black)
        self.setLineWidth(0.75)
        self.line(40, 32, 572, 32)
        self.restoreState()


# =========================================================================
# BLACK & WHITE CLASSIC CANVAS (1-Page)
# =========================================================================
class BlackWhiteSinglePageCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super(BlackWhiteSinglePageCanvas, self).__init__(*args, **kwargs)

    def draw_decorations(self):
        self.saveState()
        self.setFont("Helvetica", 7.5)
        self.setFillColor(colors.black)
        self.drawString(36, 16, "PandaLime Project Abstract • Hosted on Render • Neon DB • Google Gemini AI • https://www.pandalime.com")
        self.drawRightString(576, 16, "Page 1 of 1")
        self.setStrokeColor(colors.black)
        self.setLineWidth(0.75)
        self.line(36, 24, 576, 24)
        self.restoreState()

    def showPage(self):
        self.draw_decorations()
        super(BlackWhiteSinglePageCanvas, self).showPage()


# =========================================================================
# 2-PAGE BLACK & WHITE DOCUMENT BUILDER
# =========================================================================
def build_2page_pdf(filename):
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        leftMargin=40,
        rightMargin=40,
        topMargin=38,
        bottomMargin=38
    )

    styles = getSampleStyleSheet()

    # Pure Black & White Typography
    title_style = ParagraphStyle(
        'BwTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=16,
        leading=20,
        textColor=colors.black,
        alignment=0
    )

    meta_style = ParagraphStyle(
        'BwMeta',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=11,
        textColor=colors.black,
        alignment=2
    )

    h1_style = ParagraphStyle(
        'BwH1',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10.5,
        leading=14,
        textColor=colors.black,
        spaceBefore=7,
        spaceAfter=3
    )

    h2_style = ParagraphStyle(
        'BwH2',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=12,
        textColor=colors.black,
        spaceBefore=3,
        spaceAfter=2
    )

    body_style = ParagraphStyle(
        'BwBody',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.3,
        leading=12,
        textColor=colors.black,
        spaceAfter=3
    )

    body_bold = ParagraphStyle('BwBold', parent=body_style, fontName='Helvetica-Bold')

    table_header = ParagraphStyle(
        'BwTableHdr',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.3,
        leading=11,
        textColor=colors.black
    )

    story = []

    # Document Header
    hdr_left = Paragraph("<b>PANDALIME — PROJECT ABSTRACT</b><br/><font size='8'><b>AI Resume Scanner, Portfolio Builder & Career Suite</b></font>", title_style)
    hdr_right = Paragraph("<b>Project Report</b><br/>URL: <b>pandalime.com</b><br/>Host: Render | DB: Neon PostgreSQL", meta_style)
    
    t_hdr = Table([[hdr_left, hdr_right]], colWidths=[360, 172])
    t_hdr.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('PADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(t_hdr)
    story.append(Spacer(1, 3))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.black, spaceAfter=6, spaceBefore=2))

    # Section 1: Introduction
    story.append(Paragraph("1. Project Overview & Problem Statement", h1_style))
    story.append(Paragraph(
        "When people apply for jobs today, their resumes are almost never read by a human first. Instead, over 90% of mid-to-large companies "
        "use automated software called <b>Applicant Tracking Systems (ATS)</b> (like Workday, Taleo, Greenhouse, and Lever). These systems scan "
        "resumes for specific keywords, skills, and formatting. If a candidate misses important terms or uses complex layouts, the computer rejects "
        "their application automatically.",
        body_style
    ))
    story.append(Paragraph(
        "<b>PandaLime</b> (<b>pandalime.com</b>) is a free web platform built to solve this problem simply and directly. It acts as an instant "
        "career assistant with two main tools: (1) an <b>AI Resume Scanner</b> that checks resumes against real job descriptions and shows how to fix them, "
        "and (2) an <b>AI Portfolio Builder</b> that turns resume information into a clean, published personal website with one click.",
        body_style
    ))

    # Core Principles (Simple B&W Table)
    principles_data = [
        [
            Paragraph("<b>100% Free & No Sign-Up</b>", h2_style),
            Paragraph("<b>Instant 3-Second AI Review</b>", h2_style),
            Paragraph("<b>1-Click Live Portfolio</b>", h2_style)
        ],
        [
            Paragraph("No paywalls or subscriptions. Anyone can run full scans and test tools immediately without forced registration.", body_style),
            Paragraph("Uses Google Gemini AI to analyze full resumes and job postings in 3 to 5 seconds with clear scores.", body_style),
            Paragraph("Generates a live developer website at <code>pandalime.com/p/yourname</code>, ready to share with recruiters.", body_style)
        ]
    ]
    t_princ = Table(principles_data, colWidths=[177, 177, 178])
    t_princ.setStyle(TableStyle([
        ('BOX', (0,0), (-1,-1), 0.75, colors.black),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.black),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(t_princ)
    story.append(Spacer(1, 5))

    # Section 2: How Resume Scanning Works
    story.append(Paragraph("2. How the Resume Scanner Works (Step-by-Step)", h1_style))
    story.append(Paragraph("The scanning process is straightforward and fast:", body_style))

    steps_data = [
        [
            Paragraph("<b>Step 1: Upload & Text Extraction</b>", h2_style),
            Paragraph("The user uploads their resume as a PDF and pastes a target job description. The server reads the PDF file and extracts the plain text cleanly.", body_style)
        ],
        [
            Paragraph("<b>Step 2: File Safety Verification</b>", h2_style),
            Paragraph("The backend checks the binary header (<code>%PDF-</code> magic bytes) to make sure the file is genuinely a safe PDF, blocking dangerous scripts and keeping user data safe.", body_style)
        ],
        [
            Paragraph("<b>Step 3: Google Gemini AI Comparison</b>", h2_style),
            Paragraph("Google's Gemini AI reads both the resume and the job description. It looks for missing technical tools, programming languages, soft skills, and required experience.", body_style)
        ],
        [
            Paragraph("<b>Step 4: Score & Practical Fixes</b>", h2_style),
            Paragraph("The user receives an instant report with:<br/>"
                      "• <b>ATS Match Score (0 to 100):</b> How well the resume fits the role.<br/>"
                      "• <b>Missing Keywords:</b> Essential skills found in the job posting that should be added.<br/>"
                      "• <b>Rewritten Bullets (Google X-Y-Z formula):</b> Weak sentences turned into <i>'Accomplished [X] by doing [Z], resulting in [Y]'</i>.<br/>"
                      "• <b>Formatting Warnings:</b> Alerts if tables or multi-column layouts might confuse older ATS parsers.", body_style)
        ]
    ]
    t_steps = Table(steps_data, colWidths=[150, 382])
    t_steps.setStyle(TableStyle([
        ('BOX', (0,0), (-1,-1), 0.75, colors.black),
        ('LINEBELOW', (0,0), (-1,-2), 0.5, colors.black),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.black),
        ('TOPPADDING', (0,0), (-1,-1), 3.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3.5),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(t_steps)
    story.append(Spacer(1, 5))

    # Section 3: AI Portfolio Builder
    story.append(Paragraph("3. AI Portfolio Builder (Personal Website in 1 Click)", h1_style))
    story.append(Paragraph(
        "PandaLime includes an <b>AI Portfolio Builder</b> that turns a user's resume or work history into a published personal website:",
        body_style
    ))

    port_data = [
        [
            Paragraph("<b>Custom Shareable Link:</b> Every user gets a personal web address (such as <code>pandalime.com/p/yourname</code>) to put on LinkedIn, GitHub, or emails.", body_style),
            Paragraph("<b>Recruiter-Ready Sections:</b> Includes project cards with live links, skill badges, job timeline, and a button to download the PDF resume.", body_style)
        ],
        [
            Paragraph("<b>Simple Themes:</b> Clean styles (Terminal, Minimal Light, Modern Dark) that look great on phones and computers.", body_style),
            Paragraph("<b>Stored in Neon DB:</b> Profiles and published portfolios are safely stored in a serverless PostgreSQL database (Neon DB) for instant loading.", body_style)
        ]
    ]
    t_port = Table(port_data, colWidths=[266, 266])
    t_port.setStyle(TableStyle([
        ('BOX', (0,0), (-1,-1), 0.75, colors.black),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.black),
        ('TOPPADDING', (0,0), (-1,-1), 3.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3.5),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(t_port)

    # PAGE BREAK TO PAGE 2
    story.append(PageBreak())

    # ================= PAGE 2 =================
    story.append(Paragraph("4. Technologies Used (Simple Explanation)", h1_style))
    story.append(Paragraph(
        "The platform uses modern, reliable web technologies chosen for fast loading, simplicity, and safety:",
        body_style
    ))

    tech_data = [
        [
            Paragraph("<b>Part of the Site</b>", table_header),
            Paragraph("<b>Technology Used</b>", table_header),
            Paragraph("<b>What It Does (In Simple Words)</b>", table_header)
        ],
        [
            Paragraph("<b>Frontend (UI)</b>", body_bold),
            Paragraph("React 18 + Vite + Tailwind CSS", body_style),
            Paragraph("Builds the user interface so pages load instantly, look clean, and work smoothly on mobile phones and computers.", body_style)
        ],
        [
            Paragraph("<b>Backend Server</b>", body_bold),
            Paragraph("Node.js + Express", body_style),
            Paragraph("Receives uploaded files, validates PDFs safely, coordinates AI requests, and runs REST APIs.", body_style)
        ],
        [
            Paragraph("<b>Database</b>", body_bold),
            Paragraph("Neon DB (PostgreSQL)", body_style),
            Paragraph("Serverless PostgreSQL database that stores user accounts, saved scan reports, and published portfolios.", body_style)
        ],
        [
            Paragraph("<b>Artificial Intelligence</b>", body_bold),
            Paragraph("Google Gemini AI", body_style),
            Paragraph("Acts like an experienced recruiter: compares resume text with job requirements, finds skill gaps, and rewrites bullet points.", body_style)
        ],
        [
            Paragraph("<b>Cloud Hosting</b>", body_bold),
            Paragraph("Render Cloud Platform", body_style),
            Paragraph("Hosts both the Frontend web app and Backend API services on Render with automatic deployments, health checks, and global SSL.", body_style)
        ],
        [
            Paragraph("<b>Speed & SEO</b>", body_bold),
            Paragraph("Static Site Generation (SSG)", body_style),
            Paragraph("Pre-renders 235+ static pages (including 12 career blog guides and 6 regional language hubs) so pages load in milliseconds.", body_style)
        ],
        [
            Paragraph("<b>Security & Anti-Abuse</b>", body_bold),
            Paragraph("HMAC CAPTCHA & Rate Limits", body_style),
            Paragraph("Stops spam bots using simple mathematical human challenges, strict IP rate limiters, and URL sanitization.", body_style)
        ]
    ]

    t_tech = Table(tech_data, colWidths=[95, 140, 297])
    t_tech.setStyle(TableStyle([
        ('BOX', (0,0), (-1,-1), 0.75, colors.black),
        ('LINEBELOW', (0,0), (-1,0), 1, colors.black),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.black),
        ('TOPPADDING', (0,0), (-1,-1), 3.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3.5),
        ('LEFTPADDING', (0,0), (-1,-1), 5),
        ('RIGHTPADDING', (0,0), (-1,-1), 5),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(t_tech)
    story.append(Spacer(1, 5))

    # Section 5: Additional Free Tools
    story.append(Paragraph("5. Extra Free Built-in Career Tools", h1_style))
    extra_data = [
        [
            Paragraph("• <b>STAR Bullet Generator:</b> Helps users write achievement bullet points using Situation, Task, Action, and Result.<br/>"
                      "• <b>250+ ATS Action Verbs:</b> Organized library of strong power verbs for engineering, leadership, and management.", body_style),
            Paragraph("• <b>Job Keyword Extractor:</b> Instant tool that pulls out required hard skills and tools from any job posting.<br/>"
                      "• <b>6 Regional Language Hubs:</b> Translated portals in Hindi, Tamil, Telugu, Kannada, Marathi, and Bengali.", body_style)
        ]
    ]
    t_ex = Table(extra_data, colWidths=[266, 266])
    t_ex.setStyle(TableStyle([
        ('BOX', (0,0), (-1,-1), 0.75, colors.black),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.black),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(t_ex)
    story.append(Spacer(1, 5))

    # Section 6: Summary & Conclusion
    story.append(Paragraph("6. Project Summary", h1_style))
    story.append(Paragraph(
        "PandaLime brings together Google Gemini AI intelligence, fast React web design, and serverless Neon PostgreSQL storage on Render. "
        "Its goal is simple: take the mystery out of automated resume screening and give job seekers an easy, free way to optimize their resumes "
        "and showcase their work with confidence.",
        body_style
    ))

    # Verification / Document Table
    story.append(Spacer(1, 3))
    doc_info = [
        [
            Paragraph("<b>Platform:</b> PandaLime Career Suite", body_style),
            Paragraph("<b>Hosting:</b> Render Cloud", body_style),
            Paragraph("<b>Database:</b> Neon PostgreSQL", body_style),
            Paragraph("<b>Website:</b> https://www.pandalime.com", body_style)
        ]
    ]
    t_info = Table(doc_info, colWidths=[130, 110, 145, 147])
    t_info.setStyle(TableStyle([
        ('BOX', (0,0), (-1,-1), 0.75, colors.black),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.black),
        ('TOPPADDING', (0,0), (-1,-1), 3.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3.5),
        ('LEFTPADDING', (0,0), (-1,-1), 5),
        ('RIGHTPADDING', (0,0), (-1,-1), 5),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(t_info)

    doc.build(story, canvasmaker=BlackWhiteNumberedCanvas)
    print("Successfully built 2-page B&W PDF at:", filename)


# =========================================================================
# 1-PAGE BLACK & WHITE DOCUMENT BUILDER
# =========================================================================
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

    title_style = ParagraphStyle('T', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=14, leading=17, textColor=colors.black)
    h1_style = ParagraphStyle('H1', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=8.5, leading=11, textColor=colors.black, spaceBefore=3, spaceAfter=1.5)
    body_style = ParagraphStyle('B', parent=styles['Normal'], fontName='Helvetica', fontSize=7.2, leading=9.8, textColor=colors.black, spaceAfter=1.5)
    body_bold = ParagraphStyle('BB', parent=body_style, fontName='Helvetica-Bold')
    card_body = ParagraphStyle('CB', parent=styles['Normal'], fontName='Helvetica', fontSize=7, leading=9.2, textColor=colors.black)
    table_hdr = ParagraphStyle('TH', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=7.2, leading=9.2, textColor=colors.black)

    story = []

    # Header
    hdr_left = Paragraph("<b>PANDALIME — PROJECT ABSTRACT</b><br/><font size='7'><b>AI Resume Scanner, Portfolio Builder & Career Suite • pandalime.com</b></font>", title_style)
    hdr_right = Paragraph("<b>Executive Summary</b><br/><font size='6.8'>Host: Render • DB: Neon PostgreSQL</font>", ParagraphStyle('HR', parent=styles['Normal'], fontName='Helvetica', fontSize=7, leading=9, alignment=2))
    t_hdr = Table([[hdr_left, hdr_right]], colWidths=[360, 180])
    t_hdr.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'MIDDLE'), ('PADDING', (0,0), (-1,-1), 0)]))
    story.append(t_hdr)
    story.append(HRFlowable(width="100%", thickness=1, color=colors.black, spaceAfter=3, spaceBefore=2))

    # 1. What is PandaLime
    story.append(Paragraph("1. What is PandaLime? (In Simple Words)", h1_style))
    story.append(Paragraph(
        "<b>PandaLime</b> (<b>pandalime.com</b>) is a free website built to solve a major issue in job hunting: "
        "<b>Applicant Tracking Systems (ATS)</b>. Over 90% of companies use software to filter resumes before human recruiters ever see them. "
        "If a resume misses key skills or uses bad formatting, it gets rejected automatically. PandaLime gives job seekers a 100% free solution: "
        "(1) an <b>AI Resume Scanner</b> that reviews and fixes resumes against job postings in 3 seconds, and (2) an <b>AI Portfolio Builder</b> "
        "that turns resume details into a live personal website in 1 click.",
        body_style
    ))

    # Value Cards (Clean B&W)
    v_cards = [
        [
            Paragraph("<b>100% Free & Open Access</b><br/>No paywalls, subscriptions, or forced signup.", card_body),
            Paragraph("<b>3-Second AI Resume Scan</b><br/>Instant score, missing skills & bullet rewrites.", card_body),
            Paragraph("<b>1-Click AI Portfolio Builder</b><br/>Live developer site at <code>/p/yourname</code>.", card_body)
        ]
    ]
    t_vc = Table(v_cards, colWidths=[180, 180, 180])
    t_vc.setStyle(TableStyle([
        ('BOX', (0,0), (-1,-1), 0.75, colors.black),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.black),
        ('PADDING', (0,0), (-1,-1), 2.5),
        ('VALIGN', (0,0), (-1,-1), 'TOP')
    ]))
    story.append(t_vc)
    story.append(Spacer(1, 1.5))

    # 2. How Resume Scanning Works
    story.append(Paragraph("2. How Resume Scanning Works (Step-by-Step)", h1_style))
    steps = [
        [
            Paragraph("<b>1. Upload & Extract:</b> User uploads resume PDF and pastes a job description. Clean text is extracted safely.", body_style),
            Paragraph("<b>2. File Safety Check:</b> Server verifies binary magic bytes (<code>%PDF-</code>) to ensure the file is safe.", body_style)
        ],
        [
            Paragraph("<b>3. AI Comparison:</b> Google Gemini AI checks skills, tools, and experience against the job requirements.", body_style),
            Paragraph("<b>4. Instant Score:</b> Returns an <b>ATS Score (0–100)</b>, missing keywords, and Google X-Y-Z rewritten bullets.", body_style)
        ]
    ]
    t_st = Table(steps, colWidths=[270, 270])
    t_st.setStyle(TableStyle([
        ('BOX', (0,0), (-1,-1), 0.75, colors.black),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.black),
        ('PADDING', (0,0), (-1,-1), 2.5),
        ('VALIGN', (0,0), (-1,-1), 'TOP')
    ]))
    story.append(t_st)
    story.append(Spacer(1, 1.5))

    # 3. AI Portfolio Builder Feature
    story.append(Paragraph("3. AI Portfolio Builder Feature (Live Personal Website)", h1_style))
    story.append(Paragraph(
        "The built-in <b>AI Portfolio Builder</b> turns resume details into a clean, modern personal website in 1 click. "
        "Each user gets a live shareable URL (such as <code>pandalime.com/p/username</code>) with interactive project showcases, live demo links, "
        "tech skill badges, work timeline, social links, downloadable resume, and instant theme switching (Terminal, Minimal, Dark). "
        "All portfolios and profile data are securely stored in serverless <b>Neon PostgreSQL DB</b> for instant global loading.",
        body_style
    ))
    story.append(Spacer(1, 1.5))

    # 4. Technologies Used
    story.append(Paragraph("4. Technologies Used Across the Platform", h1_style))
    tech = [
        [Paragraph("<b>Layer</b>", table_hdr), Paragraph("<b>Technology</b>", table_hdr), Paragraph("<b>What It Does (In Simple Words)</b>", table_hdr)],
        [Paragraph("<b>Frontend (UI)</b>", body_bold), Paragraph("React 18 + Vite + Tailwind", body_style), Paragraph("Ultra-fast, responsive user interface hosted on Render for smooth mobile/desktop use.", body_style)],
        [Paragraph("<b>Backend Server</b>", body_bold), Paragraph("Node.js + Express (Render)", body_style), Paragraph("Handles file uploads, validates PDF magic bytes, coordinates AI, and serves REST APIs.", body_style)],
        [Paragraph("<b>Database</b>", body_bold), Paragraph("Neon DB (PostgreSQL)", body_style), Paragraph("Serverless PostgreSQL storing user accounts, saved scan reports, and live portfolios.", body_style)],
        [Paragraph("<b>AI Engine</b>", body_bold), Paragraph("Google Gemini AI", body_style), Paragraph("Reads resumes like a senior recruiter, finding skill gaps and rewriting bullet points.", body_style)],
        [Paragraph("<b>Hosting & Cloud</b>", body_bold), Paragraph("Render Cloud Platform", body_style), Paragraph("Hosts frontend web apps and backend services with global SSL and automatic deploys.", body_style)],
        [Paragraph("<b>Speed & Security</b>", body_bold), Paragraph("SSG + HMAC CAPTCHA", body_style), Paragraph("235+ pre-rendered static pages + rate limiters to block bots and load in milliseconds.", body_style)]
    ]
    t_tc = Table(tech, colWidths=[85, 140, 315])
    t_tc.setStyle(TableStyle([
        ('BOX', (0,0), (-1,-1), 0.75, colors.black),
        ('LINEBELOW', (0,0), (-1,0), 0.75, colors.black),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.black),
        ('PADDING', (0,0), (-1,-1), 1.8),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE')
    ]))
    story.append(t_tc)
    story.append(Spacer(1, 1.5))

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
        ('BOX', (0,0), (-1,-1), 0.75, colors.black),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.black),
        ('PADDING', (0,0), (-1,-1), 2),
        ('VALIGN', (0,0), (-1,-1), 'TOP')
    ]))
    story.append(t_ex)

    doc.build(story, canvasmaker=BlackWhiteSinglePageCanvas)
    print("Successfully built 1-Page B&W PDF at:", filename)


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
        pix.save(os.path.join(artifact_dir, f"abstract_bw_2p_page_{i+1}.png"))

    doc_1p = pymupdf.open(out_1p)
    pix1 = doc_1p[0].get_pixmap(dpi=150)
    pix1.save(os.path.join(artifact_dir, "abstract_bw_1p_preview.png"))

    print("Black & White PDF generation complete!")
