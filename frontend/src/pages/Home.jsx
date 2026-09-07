import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  UploadCloud, 
  ScanLine, 
  Briefcase, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  ShieldCheck, 
  Mail, 
  Map, 
  Sparkles,
  Award,
  ChevronDown,
  Check,
  X,
  Cpu,
  Target,
  BarChart3,
  Layers,
  Search,
  Building2,
  TrendingUp,
  Zap,
  Globe,
  Menu,
  Terminal,
  ExternalLink,
  Eye
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import LanguageSelector from '../components/LanguageSelector';
import MobileDrawer from '../components/MobileDrawer';
import { ROLES, COMPANIES, SPECIAL_NICHES } from '../data/pseoData';

export default function Home() {
  const [openFaq, setOpenFaq] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const steps = [
    {
      icon: <UploadCloud className="w-8 h-8 text-lime-600" />,
      title: "1. Upload Your Resume (PDF)",
      description: "Upload your current resume in standard PDF format. No login or credit card required to get your instant baseline ATS match score."
    },
    {
      icon: <ScanLine className="w-8 h-8 text-lime-600" />,
      title: "2. Paste Job Description & AI Scan",
      description: "Our neural parser compares your resume against the target job posting, identifying critical missing skills, hard keywords, and formatting blockers."
    },
    {
      icon: <Briefcase className="w-8 h-8 text-lime-600" />,
      title: "3. Optimize & Land Interviews",
      description: "Follow the AI critique to inject missing keywords, optimize bullet points with the STAR method, and bypass corporate recruiter screening filters."
    }
  ];

  const atsPillars = [
    {
      icon: <Target className="w-6 h-6 text-lime-600" />,
      title: "Semantic Keyword Match",
      desc: "ATS software calculates semantic relevance between job requirements and your resume. We highlight exact technical tools, soft skills, and certifications you are missing."
    },
    {
      icon: <Layers className="w-6 h-6 text-lime-600" />,
      title: "Format & Parser Compliance",
      desc: "Tables, two-column layouts, and unsupported text boxes cause parsing failures. PandaLime checks that your document structure extracts cleanly into standard ATS fields."
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-lime-600" />,
      title: "STAR Impact Scoring",
      desc: "Recruiters and AI models prioritize quantified results. We evaluate your bullet points for action verbs, measurable metrics, and demonstrated business outcomes."
    },
    {
      icon: <Cpu className="w-6 h-6 text-lime-600" />,
      title: "Recruiter Filter Simulation",
      desc: "Simulate how enterprise applicant systems like Workday, Taleo, Greenhouse, and Lever rank candidate pools before human recruiters ever open a file."
    }
  ];

  const features = [
    {
      title: "Deep ATS Keyword Gap Analysis",
      description: "Discover the exact hard skills, technologies, and industry terms the Applicant Tracking System is searching for in your application.",
      premium: false
    },
    {
      title: "Actionable AI Resume Critique",
      description: "Get a punchy, candid paragraph explaining exactly why a corporate recruiter or filter algorithm would reject your resume and how to fix it.",
      premium: false
    },
    {
      title: "AI-Rewritten STAR Bullet Points",
      description: "Let our advanced AI rewrite your weak experience bullets into high-impact, keyword-rich statements following Google's X-Y-Z formula.",
      premium: true
    },
    {
      title: "Tailored AI Cover Letter",
      description: "Instantly generate a tailored 150-word cover letter specifically matched to the job description and your unique achievements.",
      premium: true
    }
  ];

  const faqs = [
    {
      question: "What is an ATS (Applicant Tracking System) resume scanner?",
      answer: "An ATS resume scanner is software that parses, indexes, and scores resumes against job descriptions before a human recruiter reads them. Over 98% of Fortune 500 companies use ATS tools like Workday, Taleo, Greenhouse, and Lever to filter out unqualified applicants based on keyword match percentage and document format."
    },
    {
      question: "How do I scan my resume for free on PandaLime?",
      answer: "Simply navigate to the PandaLime scanner, upload your resume in PDF format, paste the target job description, and click 'Scan My Resume Now'. The AI will calculate your ATS match score, identify missing keywords, and provide an actionable critique in seconds without requiring an account."
    },
    {
      question: "What is considered a good ATS match score?",
      answer: "An ATS match score of 75% or higher is generally considered competitive and likely to pass corporate automated screening thresholds. Scores below 60% are typically filtered out before human review due to insufficient keyword density or poor role alignment."
    },
    {
      question: "Which Applicant Tracking Systems does PandaLime support?",
      answer: "PandaLime is calibrated against all major enterprise ATS platforms including Workday, Taleo (Oracle), Greenhouse, Lever, iCIMS, SAP SuccessFactors, BambooHR, and Ashby."
    },
    {
      question: "How does PandaLime detect missing keywords?",
      answer: "PandaLime uses natural language processing (NLP) and large language models to perform bidirectional semantic matching. It extracts core competencies, tools, programming languages, and industry frameworks from the job description and highlights exactly which keywords are absent or weak in your resume."
    },
    {
      question: "Is my resume data kept private and secure?",
      answer: "Yes. Your resume data is processed strictly in memory to generate your analysis. We never sell, share, or monetize your resume text or personal information with third-party recruiters, advertisers, or data brokers."
    }
  ];

  // Schema: SoftwareApplication + WebSite + FAQPage
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "PandaLime AI Resume Scanner & Portfolio Studio",
      "operatingSystem": "All Web Browsers",
      "applicationCategory": "BusinessApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "Free AI-powered ATS resume scanner and portfolio website builder. Scan resumes against job descriptions, uncover missing keywords, and launch recruiter-ready developer portfolios."
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 w-full max-w-full overflow-x-hidden">
      <SEOHead 
        title="Free AI Resume Scanner & AI Portfolio Studio | PandaLime"
        description="Scan your resume for free with PandaLime AI. Beat ATS filters (Workday, Taleo), uncover missing keywords, and build your recruiter-ready portfolio."
        canonical="/"
        jsonLd={jsonLd}
      />

      {/* Inline styles for custom marquee animation */}
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            display: flex;
            width: 200%;
            animation: marquee 25s linear infinite;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}
      </style>

      {/* --- TOP NAVBAR --- */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex justify-between items-center gap-2">
          <Link to="/" className="flex items-center gap-2 text-gray-900 font-black text-xl sm:text-2xl tracking-tight shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-lime-500 rounded-xl flex items-center justify-center text-white shadow-md shadow-lime-500/20 shrink-0">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span>PandaLime</span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <LanguageSelector variant="nav" />
            <Link 
              to="/portfolio-builder" 
              className="text-xs sm:text-sm font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-xl transition-all hidden md:flex items-center gap-1.5"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-600" />
              <span>AI Portfolio</span>
              <span className="text-[9px] bg-emerald-600 text-white font-extrabold px-1.5 py-0.2 rounded-full uppercase">New</span>
            </Link>
            <Link to="/tools" className="text-sm font-semibold text-gray-600 hover:text-lime-600 transition-colors hidden sm:block">
              Free Tools
            </Link>
            <Link to="/roast-wall" className="text-sm font-semibold text-gray-600 hover:text-lime-600 transition-colors hidden lg:block">
              Community Wall
            </Link>
            <Link 
              to="/dashboard" 
              className="px-3.5 py-2 sm:px-5 sm:py-2.5 bg-lime-500 hover:bg-lime-600 active:scale-95 text-white rounded-xl font-bold text-xs sm:text-sm shadow-md shadow-lime-500/20 transition-all hover:-translate-y-0.5 shrink-0 flex items-center gap-1.5 whitespace-nowrap"
            >
              <ScanLine className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Scan Resume Free</span>
              <span className="sm:hidden">Scan Free</span>
            </Link>

            {/* Mobile Hamburger Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-gray-700 hover:text-gray-900 rounded-xl hover:bg-gray-100 transition-colors md:hidden flex items-center justify-center shrink-0 border border-gray-200"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5 text-gray-800" />
            </button>
          </div>
        </div>
      </nav>

      {/* Slide-out Mobile Sidebar Drawer */}
      <MobileDrawer isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* --- HERO SECTION --- */}
      <header className="relative overflow-hidden bg-white pt-16 sm:pt-20 pb-20 sm:pb-28 border-b border-gray-200">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>
        <div className="max-w-6xl mx-auto px-4 relative z-10 text-center">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-lime-100 via-emerald-100 to-teal-100 text-gray-900 font-bold text-xs sm:text-sm mb-6 border border-emerald-200/60 shadow-sm">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>AI Career Suite • ATS Resume Scanner & Portfolio Website Builder</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 mb-6 leading-tight max-w-5xl mx-auto">
            Beat the ATS Bots. <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-500 via-emerald-500 to-teal-600">
              Launch Your AI Portfolio.
            </span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8 sm:mb-10 leading-relaxed px-2">
            Over 98% of Fortune 500 companies & Indian IT leaders (TCS, Infosys, Wipro, Google) filter resumes using ATS software. PandaLime uncovers missing keywords to get your resume past the filters, and gives you a hosted personal developer or cybersecurity portfolio website to impress hiring managers.
          </p>

          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3.5 w-full sm:w-auto px-2">
              <Link 
                to="/dashboard" 
                className="w-full sm:w-auto px-7 py-4 bg-lime-500 hover:bg-lime-600 text-white rounded-2xl font-black text-base sm:text-lg shadow-xl shadow-lime-500/25 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
              >
                <ScanLine className="w-5 h-5" />
                <span>Scan Resume for Free</span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                to="/portfolio-builder" 
                className="w-full sm:w-auto px-7 py-4 bg-gray-900 hover:bg-black text-white rounded-2xl font-black text-base sm:text-lg shadow-xl shadow-gray-900/20 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 border border-gray-800 cursor-pointer group"
              >
                <Globe className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span>Build AI Portfolio</span>
                <span className="text-[10px] bg-emerald-500 text-gray-950 px-2 py-0.5 rounded-md font-extrabold uppercase ml-1">Free</span>
              </Link>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs sm:text-sm text-gray-500 font-medium mt-3 px-4 text-center">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-lime-500" /> Free instant ATS scan</span>
              <span className="hidden sm:inline text-gray-300">•</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Hosted at pandalime.com/p/:slug</span>
              <span className="hidden sm:inline text-gray-300">•</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-lime-500" /> 5 Cyber & Dev themes</span>
            </div>
          </div>

          {/* Dual Core Pillar Spotlight Cards */}
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mt-12 sm:mt-16 text-left max-w-4xl mx-auto px-2">
            {/* Pillar 1: Resume Scanner */}
            <div className="bg-gradient-to-br from-lime-500/10 via-white to-lime-500/5 rounded-3xl p-6 sm:p-7 border border-lime-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-lime-500 text-white flex items-center justify-center shadow-md shadow-lime-500/20">
                    <ScanLine className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-black uppercase tracking-wider text-lime-800 bg-lime-100 px-3 py-1 rounded-full">
                    Step 1: Beat ATS
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-gray-900 mb-2">
                  AI ATS Resume Scanner & Optimizer
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                  Scan against Workday, Greenhouse & Taleo algorithms. Uncover exact missing keywords, density gaps, and get AI-rewritten Google STAR bullet points.
                </p>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {['Missing Keywords', 'STAR Bullets', 'Match Score %', 'Cover Letter AI'].map((tag, idx) => (
                    <span key={idx} className="text-[11px] font-semibold text-lime-800 bg-lime-100/80 px-2.5 py-1 rounded-lg">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-between w-full p-3.5 bg-lime-500 hover:bg-lime-600 text-white rounded-xl font-bold text-xs sm:text-sm transition-colors shadow-md shadow-lime-500/20"
              >
                <span>Launch Resume Scanner</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Pillar 2: Portfolio Studio */}
            <div className="bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 text-white rounded-3xl p-6 sm:p-7 border border-gray-800 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-gray-950 flex items-center justify-center shadow-md shadow-emerald-500/20">
                    <Globe className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-3 py-1 rounded-full">
                    Step 2: Impress Recruiters
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-white mb-2">
                  AI Portfolio Studio & Hosted Website
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-4">
                  Create your personal developer or cybersecurity portfolio in seconds. Pick from 5 themes with live projects, skill bars, and instant QR code sharing.
                </p>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {['Free URL at /p/:slug', 'Cyber & Tokyo Themes', 'SEO Structured Data', 'QR Code Share'].map((tag, idx) => (
                    <span key={idx} className="text-[11px] font-semibold text-emerald-300 bg-emerald-950/60 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <Link
                to="/portfolio-builder"
                className="inline-flex items-center justify-between w-full p-3.5 bg-emerald-500 hover:bg-emerald-400 text-gray-950 rounded-xl font-black text-xs sm:text-sm transition-colors shadow-lg shadow-emerald-500/20"
              >
                <span>Build & Host Portfolio</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </header>

      {/* --- SUPPORTED ATS PLATFORMS & TOP EMPLOYERS MARQUEE --- */}
      <section className="py-8 bg-gray-900 text-white overflow-hidden flex flex-col items-center border-b border-gray-800">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 text-center px-4">
          Trusted by candidates targeting top Indian IT leaders & global tech giants
        </p>
        <div className="w-full overflow-hidden relative">
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-gray-900 to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-gray-900 to-transparent z-10"></div>
          
          <div className="animate-marquee flex items-center gap-12 md:gap-24 px-8">
            {['TCS', 'Infosys', 'Wipro', 'HCLTech', 'Cognizant', 'Accenture', 'Flipkart', 'Swiggy', 'Zomato', 'Razorpay', 'Google', 'Microsoft', 'Amazon', 'Meta', 'TCS', 'Infosys', 'Wipro', 'HCLTech', 'Cognizant'].map((ats, i) => (
              <span key={i} className="text-lg md:text-xl font-bold text-gray-400 tracking-tight hover:text-white transition-colors cursor-default whitespace-nowrap">
                {ats}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS --- */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-100 text-lime-800 font-bold text-xs uppercase tracking-wider mb-3">
            Simple 3-Step Process
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How PandaLime Scans & Optimizes Your Resume
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Three straightforward steps to bypass automated resume filters and get your profile seen by hiring managers.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200 hover:shadow-xl transition-all hover:-translate-y-2 relative group">
              <div className="w-16 h-16 bg-lime-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-lime-100 transition-colors">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- DEEP ATS ANALYSIS PILLARS --- */}
      <section className="bg-white py-20 border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Does an ATS Resume Checker Actually Test?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Enterprise recruiting software uses 4 critical evaluation metrics to rank candidates.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {atsPillars.map((pillar, idx) => (
              <div key={idx} className="bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:border-lime-400 transition-colors">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center mb-4">
                  {pillar.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{pillar.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FREE CAREER TOOLS SHOWCASE --- */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-lime-100 text-lime-800 text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" /> 100% Free AI Career Utilities
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Supercharge Your Resume Before You Apply
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg">
              No signup required. Use our dedicated NLP keyword extractor, STAR bullet rewriter, and power action verbs dictionary to optimize every application.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Tool 1 */}
            <div className="bg-white rounded-3xl p-6 border border-gray-200 hover:border-lime-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 bg-lime-50 rounded-2xl flex items-center justify-center text-lime-600 mb-5 group-hover:scale-110 transition-transform">
                  <Search className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-lime-700 bg-lime-100 px-2 py-0.5 rounded-full">NLP Parser</span>
                  <span className="text-[10px] font-semibold text-gray-400">Instant</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-lime-600 transition-colors">
                  Job Keyword Extractor
                </h3>
                <p className="text-gray-600 text-xs leading-relaxed mb-6">
                  Extract hard skills, tech stacks, cloud tools, frameworks, and credentials from any JD with 0 latency.
                </p>
              </div>
              <Link 
                to="/tools/job-description-keyword-extractor" 
                className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 bg-gray-50 group-hover:bg-lime-500 text-gray-900 group-hover:text-white rounded-xl font-bold text-xs transition-all shadow-sm"
              >
                Extract Keywords <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Tool 2 */}
            <div className="bg-white rounded-3xl p-6 border border-gray-200 hover:border-lime-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 bg-lime-50 rounded-2xl flex items-center justify-center text-lime-600 mb-5 group-hover:scale-110 transition-transform">
                  <Cpu className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-lime-700 bg-lime-100 px-2 py-0.5 rounded-full">Google X-Y-Z</span>
                  <span className="text-[10px] font-semibold text-gray-400">AI Powered</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-lime-600 transition-colors">
                  STAR Bullet Generator
                </h3>
                <p className="text-gray-600 text-xs leading-relaxed mb-6">
                  Turn weak responsibilities into quantified accomplishments using Google's formula: "Accomplished [X] measured by [Y]".
                </p>
              </div>
              <Link 
                to="/tools/star-bullet-generator" 
                className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 bg-gray-50 group-hover:bg-lime-500 text-gray-900 group-hover:text-white rounded-xl font-bold text-xs transition-all shadow-sm"
              >
                Generate Bullets <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Tool 3 */}
            <div className="bg-white rounded-3xl p-6 border border-gray-200 hover:border-lime-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 bg-lime-50 rounded-2xl flex items-center justify-center text-lime-600 mb-5 group-hover:scale-110 transition-transform">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-lime-700 bg-lime-100 px-2 py-0.5 rounded-full">250+ Verbs</span>
                  <span className="text-[10px] font-semibold text-gray-400">Recruiter Approved</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-lime-600 transition-colors">
                  250+ ATS Action Verbs
                </h3>
                <p className="text-gray-600 text-xs leading-relaxed mb-6">
                  Replace cliché phrases like "worked on" with high-impact power verbs across Leadership, Optimization, and SecOps.
                </p>
              </div>
              <Link 
                to="/tools/ats-action-verbs" 
                className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 bg-gray-50 group-hover:bg-lime-500 text-gray-900 group-hover:text-white rounded-xl font-bold text-xs transition-all shadow-sm"
              >
                Explore Verbs <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Tool 4: Portfolio Builder */}
            <div className="bg-white rounded-3xl p-6 border border-gray-200 hover:border-lime-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-5 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">Hosted URL</span>
                  <span className="text-[10px] font-semibold text-gray-400">Free</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-lime-600 transition-colors">
                  AI Portfolio Studio
                </h3>
                <p className="text-gray-600 text-xs leading-relaxed mb-6">
                  Build and host your modern developer or cyber portfolio on pandalime.com/p/:username with 5 themes.
                </p>
              </div>
              <Link 
                to="/portfolio-builder" 
                className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 bg-gray-50 group-hover:bg-lime-500 text-gray-900 group-hover:text-white rounded-xl font-bold text-xs transition-all shadow-sm"
              >
                Build Portfolio <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link 
              to="/tools" 
              className="inline-flex items-center gap-2 text-lime-600 font-bold hover:text-lime-700 hover:underline text-base"
            >
              Browse Full Free Career Tools Directory Hub <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* --- PORTFOLIO STUDIO SPOTLIGHT SHOWCASE --- */}
      <section className="py-20 bg-gray-950 text-white relative overflow-hidden border-b border-gray-800">
        <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-10"></div>
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold uppercase tracking-wider mb-4">
              <Zap className="w-3.5 h-3.5" /> Instant Personal Website Builder
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
              Your Recruiter-Ready AI Portfolio <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-lime-400">
                Hosted Free at pandalime.com/p/:yourname
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
              Don't just attach a PDF. Give recruiters and engineering managers an interactive live website with your skills matrix, GitHub repositories, certifications, and 1-click QR code.
            </p>
          </div>

          {/* 3 Value Pillars */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gray-900/90 rounded-2xl p-6 border border-gray-800 hover:border-emerald-500/40 transition-all">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400 mb-4 border border-emerald-500/20">
                <Terminal className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">5 Developer & Cyber Themes</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Choose from Tokyo Cyber Neon, Hacker Terminal CLI, Minimalist Clean, Modern Slate, or Obsidian Gold. Engineered for tech enthusiasts.
              </p>
            </div>

            <div className="bg-gray-900/90 rounded-2xl p-6 border border-gray-800 hover:border-emerald-500/40 transition-all">
              <div className="w-12 h-12 bg-teal-500/10 rounded-xl flex items-center justify-center text-teal-400 mb-4 border border-teal-500/20">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Instant Public URL & QR Code</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Claim your custom link (e.g. <code className="text-emerald-400 bg-gray-950 px-1.5 py-0.5 rounded text-xs">/p/alex-dev</code>). Share with 1 click on LinkedIn or print the instant QR code on your resume.
              </p>
            </div>

            <div className="bg-gray-900/90 rounded-2xl p-6 border border-gray-800 hover:border-emerald-500/40 transition-all">
              <div className="w-12 h-12 bg-lime-500/10 rounded-xl flex items-center justify-center text-lime-400 mb-4 border border-lime-500/20">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">SEO & Recruiter Optimized</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Pre-rendered HTML, structured Person Schema JSON-LD, and high Lighthouse speed scores ensure Google and recruiters rank your profile at the top.
              </p>
            </div>
          </div>

          {/* Interactive Live Theme Showcase Card */}
          <div className="bg-gray-900 rounded-3xl p-6 sm:p-10 border border-gray-800 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="flex-1 space-y-4 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                  <Eye className="w-3.5 h-3.5" /> Live Interactive Preview
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Designed for Indian Developers & Global Tech Nomads
                </h3>
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                  Whether you are a Fresher from Bangalore applying to TCS or a Senior DevOps Engineer targeting remote US roles, our AI Portfolio Studio crafts high-converting copy and projects in seconds.
                </p>
                <div className="pt-2 flex flex-wrap gap-3">
                  <Link
                    to="/portfolio-builder"
                    className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-gray-950 rounded-xl font-black text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all"
                  >
                    <Globe className="w-4 h-4" />
                    <span>Create Your Portfolio Free</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/p/sample-developer"
                    className="px-5 py-3.5 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-xl font-bold text-sm flex items-center gap-2 transition-all border border-gray-700"
                  >
                    <span>View Live Sample</span>
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </Link>
                </div>
              </div>

              {/* Visual Card Mockup */}
              <div className="w-full lg:w-96 bg-gray-950 rounded-2xl p-5 border border-gray-800 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-gray-800 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                    pandalime.com/p/rahul-cloud
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-500 to-lime-400 flex items-center justify-center font-black text-gray-950 text-lg shadow-md">
                      RC
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm">Rahul Cloud</h4>
                      <p className="text-emerald-400 text-xs font-mono">DevOps & Cloud Architect</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 line-clamp-2">
                    "Specializing in Kubernetes, AWS multi-region infrastructure, and zero-downtime CI/CD deployment pipelines."
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {['Kubernetes', 'Terraform', 'AWS', 'Docker', 'Go'].map((skill, i) => (
                      <span key={i} className="text-[10px] bg-gray-900 text-gray-300 px-2 py-0.5 rounded border border-gray-800 font-mono">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="pt-2 border-t border-gray-900 flex justify-between items-center text-[11px] text-gray-500 font-mono">
                    <span>⚡ 5 Projects Featured</span>
                    <span className="text-emerald-400 font-bold">✓ Active Status</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* --- FEATURES & DASHBOARD SHOWCASE --- */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 space-y-8">
              <div>
                <span className="text-lime-600 font-bold text-sm uppercase tracking-wider">Complete Career Toolkit</span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
                  Everything You Need to Beat the Resume Screening Bots
                </h2>
              </div>
              
              <div className="space-y-6">
                {features.map((feature, i) => (
                  <div key={i} className="flex gap-4 bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                    <div className="flex-shrink-0 mt-1">
                      {feature.premium ? (
                        <Award className="w-6 h-6 text-amber-500" />
                      ) : (
                        <CheckCircle2 className="w-6 h-6 text-lime-500" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        {feature.title} 
                        {feature.premium && <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">Premium</span>}
                      </h3>
                      <p className="text-gray-600 mt-1 text-sm">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <Link 
                  to="/dashboard"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 hover:bg-black text-white rounded-xl font-bold text-base shadow-lg transition-all"
                >
                  Start Your Free Resume Scan <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
            
            <div className="flex-1 w-full bg-gray-900 rounded-3xl p-8 border border-gray-800 shadow-2xl relative overflow-hidden text-white">
              <div className="absolute top-0 right-0 bg-lime-500 text-gray-900 font-bold text-xs px-4 py-1.5 rounded-bl-xl shadow-md">
                Live Scanner Output
              </div>
              
              <div className="space-y-6 mt-4">
                <div className="flex justify-between items-center pb-4 border-b border-gray-800">
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Target Match Score</p>
                    <div className="text-5xl font-black text-lime-400 mt-1">88%</div>
                  </div>
                  <span className="px-3 py-1 bg-lime-500/20 text-lime-400 rounded-full text-xs font-bold border border-lime-500/30">
                    High ATS Pass Rate
                  </span>
                </div>

                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-3">Detected Missing Keywords</p>
                  <div className="flex flex-wrap gap-2">
                    {['Distributed Systems', 'Redis Caching', 'Kubernetes', 'CI/CD Pipelines', 'GraphQL'].map((kw, idx) => (
                      <span key={idx} className="px-3 py-1 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg text-xs font-medium">
                        + {kw}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-800/60 p-4 rounded-xl border border-gray-700 text-xs text-gray-300">
                  <p className="font-bold text-lime-400 mb-1">AI Recruiter Critique:</p>
                  <p className="italic">"Your bullet points show strong leadership, but you lack specific cloud deployment keywords and measurable scale numbers in your primary experience section."</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- COMPARISON TABLE --- */}
      <section className="bg-white py-20 border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Why PandaLime Outperforms Traditional Resume Checkers
            </h2>
            <p className="text-gray-600 text-lg">
              Compare AI-powered contextual scanning against generic keyword counters.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="py-4 px-6 text-sm font-bold text-gray-500 uppercase tracking-wider">Features</th>
                  <th className="py-4 px-6 text-sm font-extrabold text-lime-600 uppercase tracking-wider bg-lime-50/50 rounded-t-xl">PandaLime AI Scanner</th>
                  <th className="py-4 px-6 text-sm font-bold text-gray-500 uppercase tracking-wider">Traditional Checkers</th>
                  <th className="py-4 px-6 text-sm font-bold text-gray-500 uppercase tracking-wider">Manual Review</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-sm">
                <tr>
                  <td className="py-4 px-6 font-semibold text-gray-900">Instant ATS Match Score (%)</td>
                  <td className="py-4 px-6 bg-lime-50/50 text-lime-700 font-bold flex items-center gap-2"><Check className="w-5 h-5 text-lime-600" /> Yes (Instant)</td>
                  <td className="py-4 px-6 text-gray-600">Basic Word Count</td>
                  <td className="py-4 px-6 text-gray-600">Subjective</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-gray-900">Semantic Missing Keywords</td>
                  <td className="py-4 px-6 bg-lime-50/50 text-lime-700 font-bold flex items-center gap-2"><Check className="w-5 h-5 text-lime-600" /> Contextual AI</td>
                  <td className="py-4 px-6 text-gray-400 flex items-center gap-2"><X className="w-5 h-5 text-red-400" /> Exact match only</td>
                  <td className="py-4 px-6 text-gray-600">Partial</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-gray-900">AI-Rewritten STAR Bullets</td>
                  <td className="py-4 px-6 bg-lime-50/50 text-lime-700 font-bold flex items-center gap-2"><Check className="w-5 h-5 text-lime-600" /> Included</td>
                  <td className="py-4 px-6 text-gray-400 flex items-center gap-2"><X className="w-5 h-5 text-red-400" /> None</td>
                  <td className="py-4 px-6 text-gray-600">Slow / Expensive</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-gray-900">Tailored Cover Letter Generator</td>
                  <td className="py-4 px-6 bg-lime-50/50 text-lime-700 font-bold flex items-center gap-2"><Check className="w-5 h-5 text-lime-600" /> 1-Click Draft</td>
                  <td className="py-4 px-6 text-gray-400 flex items-center gap-2"><X className="w-5 h-5 text-red-400" /> None</td>
                  <td className="py-4 px-6 text-gray-600">$100+ per draft</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-gray-900">Turnaround Speed</td>
                  <td className="py-4 px-6 bg-lime-50/50 text-lime-700 font-bold">15 Seconds</td>
                  <td className="py-4 px-6 text-gray-600">1 - 2 Minutes</td>
                  <td className="py-4 px-6 text-gray-600">3 - 7 Days</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-gray-900">Free Baseline Scan</td>
                  <td className="py-4 px-6 bg-lime-50/50 text-lime-700 font-bold flex items-center gap-2"><Check className="w-5 h-5 text-lime-600" /> 100% Free</td>
                  <td className="py-4 px-6 text-gray-600">Credit card paywall</td>
                  <td className="py-4 px-6 text-gray-400 flex items-center gap-2"><X className="w-5 h-5 text-red-400" /> Expensive</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* --- FAQ ACCORDION SECTION WITH JSON-LD SCHEMA --- */}
      <section className="py-20 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Frequently Asked Questions About ATS Resume Scanning
            </h2>
            <p className="text-gray-600 text-lg">
              Everything you need to know about Applicant Tracking Systems, keyword scoring, and recruiter screening.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-6 text-left font-bold text-lg text-gray-900 flex justify-between items-center gap-4 hover:text-lime-600 transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 shrink-0 ${openFaq === index ? 'rotate-180 text-lime-600' : ''}`} />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-100 pt-4 text-base">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- INTERNAL LINK DIRECTORY (TOP ROLES & COMPANIES) --- */}
      <section className="bg-white py-16 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 space-y-12">
          
          {/* Roles Grid */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Briefcase className="w-6 h-6 text-lime-600" />
              <h3 className="text-2xl font-bold text-gray-900">
                Explore ATS Keyword Scanners by Career Role
              </h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {ROLES.map((role) => (
                <Link
                  key={role.id}
                  to={`/scanner/${role.id}`}
                  className="p-3 bg-gray-50 hover:bg-lime-50 hover:border-lime-300 text-gray-700 hover:text-lime-800 text-sm font-medium rounded-xl border border-gray-200 transition-all text-center block"
                >
                  {role.title} ATS Scan
                </Link>
              ))}
            </div>
          </div>

          {/* Companies Grid */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Building2 className="w-6 h-6 text-lime-600" />
              <h3 className="text-2xl font-bold text-gray-900">
                Targeted Resume Scanners for Top Tech Employers
              </h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {COMPANIES.map((company) => (
                <Link
                  key={company.id}
                  to={`/scanner/software-engineer-at-${company.id}`}
                  className="p-3 bg-gray-50 hover:bg-lime-50 hover:border-lime-300 text-gray-700 hover:text-lime-800 text-sm font-medium rounded-xl border border-gray-200 transition-all text-center block"
                >
                  {company.name} Resume Scan
                </Link>
              ))}
            </div>
          </div>

          {/* Special Niches */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Search className="w-5 h-5 text-lime-600" />
              <h4 className="text-lg font-bold text-gray-900">Popular Special Hiring Tracks</h4>
            </div>
            <div className="flex flex-wrap gap-3">
              {SPECIAL_NICHES.map((niche) => (
                <Link
                  key={niche.slug}
                  to={`/scanner/${niche.slug}`}
                  className="px-4 py-2 bg-gray-50 hover:bg-lime-50 hover:border-lime-300 text-gray-700 hover:text-lime-800 text-xs font-semibold rounded-full border border-gray-200 transition-all"
                >
                  {niche.title}
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* --- FOOTER & SEO LINKS --- */}
      <footer className="bg-gray-900 text-gray-300 py-16 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 text-white text-2xl font-black tracking-tight mb-4">
              <div className="w-8 h-8 bg-lime-400 rounded-lg flex items-center justify-center text-gray-900">
                <Sparkles className="w-5 h-5" />
              </div>
              PandaLime Career
            </Link>
            <p className="text-gray-400 mb-6 max-w-sm text-sm leading-relaxed">
              Helping job seekers across India and worldwide scan resumes for free, uncover critical ATS keyword gaps, and land high-paying careers through artificial intelligence.
            </p>
            <div className="flex items-center gap-2 text-lime-400 text-sm mb-4">
              <Mail className="w-4 h-4" />
              <a href="mailto:microapkdeveolper@gmail.com" className="hover:text-white transition-colors">
                microapkdeveolper@gmail.com
              </a>
            </div>

            <a 
              href="https://www.trustpilot.com/review/pandalime.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-800/80 border border-gray-700/80 hover:border-[#00b67a]/50 text-xs text-gray-300 hover:text-white transition-all mb-6 group"
            >
              <span className="text-[#00b67a] font-bold">★ Trustpilot</span>
              <span className="text-gray-500">|</span>
              <span>Rate us on Trustpilot</span>
              <span className="text-[#00b67a] group-hover:translate-x-0.5 transition-transform">→</span>
            </a>

            {/* Language Selector in Footer */}
            <div className="pt-4 border-t border-gray-800 max-w-sm">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Language & Region</p>
              <LanguageSelector variant="footer" />
            </div>
          </div>

          {/* Legal & Policies */}
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Legal & Policies</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/privacy-policy" className="hover:text-lime-400 transition-colors flex items-center gap-2"><ShieldCheck className="w-4 h-4"/> Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-lime-400 transition-colors flex items-center gap-2"><FileText className="w-4 h-4"/> Terms & Conditions</Link></li>
              <li><Link to="/contact" className="hover:text-lime-400 transition-colors flex items-center gap-2"><Mail className="w-4 h-4"/> Contact Support</Link></li>
            </ul>

            <h4 className="text-white font-bold mt-6 mb-3 uppercase tracking-wider text-sm">Regional Indian Portals</h4>
            <div className="flex flex-wrap gap-2 text-xs">
              <Link to="/hi" className="text-gray-400 hover:text-lime-400 transition-colors">हिन्दी</Link>
              <span className="text-gray-600">•</span>
              <Link to="/ta" className="text-gray-400 hover:text-lime-400 transition-colors">தமிழ்</Link>
              <span className="text-gray-600">•</span>
              <Link to="/te" className="text-gray-400 hover:text-lime-400 transition-colors">తెలుగు</Link>
              <span className="text-gray-600">•</span>
              <Link to="/kn" className="text-gray-400 hover:text-lime-400 transition-colors">ಕನ್ನಡ</Link>
              <span className="text-gray-600">•</span>
              <Link to="/mr" className="text-gray-400 hover:text-lime-400 transition-colors">मराठी</Link>
              <span className="text-gray-600">•</span>
              <Link to="/bn" className="text-gray-400 hover:text-lime-400 transition-colors">বাংলা</Link>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Directory & Tools</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/" className="hover:text-lime-400 transition-colors flex items-center gap-2"><Map className="w-4 h-4"/> Home</Link></li>
              <li><Link to="/dashboard" className="hover:text-lime-400 transition-colors flex items-center gap-2"><ScanLine className="w-4 h-4"/> Free Resume Scanner</Link></li>
              <li><Link to="/tools" className="hover:text-lime-400 font-semibold text-lime-400 transition-colors flex items-center gap-2"><Sparkles className="w-4 h-4"/> Free Career Tools Suite</Link></li>
              <li><Link to="/portfolio-builder" className="hover:text-lime-400 transition-colors text-xs text-emerald-400 pl-6">• AI Portfolio Studio</Link></li>
              <li><Link to="/tools/job-description-keyword-extractor" className="hover:text-lime-400 transition-colors text-xs text-gray-400 pl-6">• JD Keyword Extractor</Link></li>
              <li><Link to="/tools/star-bullet-generator" className="hover:text-lime-400 transition-colors text-xs text-gray-400 pl-6">• STAR Bullet Generator</Link></li>
              <li><Link to="/tools/ats-action-verbs" className="hover:text-lime-400 transition-colors text-xs text-gray-400 pl-6">• 250+ ATS Action Verbs</Link></li>
              <li><Link to="/roast-wall" className="hover:text-lime-400 transition-colors flex items-center gap-2"><Sparkles className="w-4 h-4"/> Community Roast Wall</Link></li>
              <li><Link to="/sitemap" className="hover:text-lime-400 transition-colors flex items-center gap-2"><Map className="w-4 h-4"/> Full Sitemap Directory</Link></li>
            </ul>
          </div>
          
        </div>
        
        <div className="max-w-6xl mx-auto px-4 mt-16 pt-8 border-t border-gray-800 text-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} PandaLime Career (www.pandalime.com). All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}