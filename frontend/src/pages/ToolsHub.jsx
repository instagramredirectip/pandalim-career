import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Search, 
  Layers, 
  Zap, 
  FileText, 
  ArrowRight, 
  CheckCircle2, 
  Cpu, 
  ShieldCheck, 
  HelpCircle, 
  ChevronRight,
  TrendingUp,
  ScanLine,
  Menu,
  Globe
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import LanguageSelector from '../components/LanguageSelector';
import MobileDrawer from '../components/MobileDrawer';

export default function ToolsHub() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const tools = [
    {
      id: "job-description-keyword-extractor",
      title: "Job Description Keyword Extractor",
      badge: "Instant ATS Parser",
      badgeColor: "bg-lime-100 text-lime-800",
      icon: <Search className="w-6 h-6 text-lime-600" />,
      description: "Paste any job posting from LinkedIn, Indeed, or Naukri to instantly extract top hard skills, programming languages, cloud tools, and required certifications.",
      features: [
        "Automatic categorization (Languages, Frameworks, Cloud, Soft Skills)",
        "ATS Keyword Density & Must-Have skill scoring",
        "1-Click Resume Scanner Integration with pre-filled JD"
      ],
      path: "/tools/job-description-keyword-extractor",
      cta: "Extract Keywords Free"
    },
    {
      id: "star-bullet-generator",
      title: "AI STAR Method Bullet Point Generator",
      badge: "Google X-Y-Z Formula",
      badgeColor: "bg-blue-100 text-blue-800",
      icon: <Sparkles className="w-6 h-6 text-blue-600" />,
      description: "Transform weak, passive job duties into high-impact, quantified STAR resume bullet points tailored to bypass recruiter filters and score high on ATS algorithms.",
      features: [
        "Follows Google's 'Accomplished [X] by doing [Z]' standard",
        "Role-specific formulas for Software, Data, Freshers & Leaders",
        "1-Click copy with highlighted action verbs and metrics"
      ],
      path: "/tools/star-bullet-generator",
      cta: "Generate STAR Bullets Free"
    },
    {
      id: "ats-action-verbs",
      title: "250+ ATS Action Verbs & Power Words",
      badge: "Recruiter Approved",
      badgeColor: "bg-purple-100 text-purple-800",
      icon: <TrendingUp className="w-6 h-6 text-purple-600" />,
      description: "Search and filter 250+ powerful action verbs categorized by Engineering, Leadership, Performance, Optimization, and Problem Solving with real bullet examples.",
      features: [
        "Categorized by technical competency & job domain",
        "Real-world quantifiable accomplishment examples",
        "Replaces passive words (helped, worked on, responsible for)"
      ],
      path: "/tools/ats-action-verbs",
      cta: "Explore Action Verbs"
    },
    {
      id: "portfolio-builder",
      title: "AI Developer & Cyber Portfolio Studio",
      badge: "Free Hosted Portfolio",
      badgeColor: "bg-emerald-100 text-emerald-800",
      icon: <Cpu className="w-6 h-6 text-emerald-600" />,
      description: "Build, customize, and host your own modern portfolio on pandalime.com/p/:username. Featuring Hacker Terminal, Minimalist, AI Matrix, and Executive themes with QR Code & Resume links.",
      features: [
        "5 Industry Themes (Cyber Hacker, Minimal, AI Matrix, Executive)",
        "Instant creative prompts & 1-click role presets",
        "Free hosting at pandalime.com/p/:username with Person SEO Schema"
      ],
      path: "/tools/portfolio-builder",
      cta: "Build Your Portfolio Free"
    }
  ];

  const faqs = [
    {
      q: "Are all tools in the PandaLime Career Tools Suite free to use?",
      a: "Yes! All tools in the PandaLime Suite—including the Job Description Keyword Extractor, AI STAR Bullet Generator, and Action Verbs Dictionary—are 100% free with no login or credit card required."
    },
    {
      q: "How does the Job Description Keyword Extractor help my resume rank higher?",
      a: "Applicant Tracking Systems (ATS) like Workday and Taleo score your resume based on semantic keyword frequency. By extracting the exact technical terms and frameworks from the job description, you can ensure your resume contains the exact vocabulary required to pass automated screening thresholds."
    },
    {
      q: "What is the STAR method and why do recruiters demand it?",
      a: "The STAR method (Situation, Task, Action, Result) ensures your experience bullet points focus on measurable outcomes rather than vague job responsibilities. Google's X-Y-Z formula ('Accomplished [X] as measured by [Y], by doing [Z]') is the gold standard for landing top-tier tech and engineering interviews."
    },
    {
      q: "Can I directly scan my resume after using these tools?",
      a: "Absolutely! After extracting keywords or generating your STAR bullets, click 'Scan Resume Free' to run your complete PDF resume through PandaLime's neural ATS parser."
    }
  ];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.pandalime.com/" },
        { "@type": "ListItem", "position": 2, "name": "Free Career Tools", "item": "https://www.pandalime.com/tools" }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Free AI ATS & Career Optimization Tools Suite",
      "url": "https://www.pandalime.com/tools",
      "description": "Suite of free AI-powered ATS resume tools, job description keyword extractors, STAR bullet point generators, and recruiter action verbs."
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": { "@type": "Answer", "text": f.a }
      }))
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <SEOHead 
        title="Free AI ATS & Career Tools Suite | PandaLime"
        description="Free AI career tools to optimize your job application: Job Description Keyword Extractor, STAR Method Bullet Generator, and 250+ ATS Power Action Verbs."
        canonical="/tools"
        jsonLd={jsonLd}
      />

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
            <Link to="/sitemap" className="text-sm font-semibold text-gray-600 hover:text-lime-600 transition-colors hidden md:block">
              Directory
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

      {/* --- BREADCRUMBS --- */}
      <div className="bg-gray-100 border-b border-gray-200 py-2.5">
        <div className="max-w-6xl mx-auto px-4 text-xs text-gray-500 flex items-center gap-2">
          <Link to="/" className="hover:text-lime-600 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-gray-800 font-semibold">Free Career Tools Suite</span>
        </div>
      </div>

      {/* --- HERO SECTION --- */}
      <header className="bg-white py-16 sm:py-20 border-b border-gray-200 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-lime-100 text-lime-800 font-bold text-xs uppercase tracking-wider mb-6">
            <Zap className="w-3.5 h-3.5" />
            <span>100% Free AI Career Optimization Suite</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6 leading-tight">
            Free ATS Resume & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-600 to-green-600">
              Career Optimization Tools
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Everything you need to beat corporate applicant tracking filters (Workday, Taleo, Greenhouse, TCS iON), craft high-impact STAR bullet points, and land interviews at top tech employers.
          </p>
        </div>
      </header>

      {/* --- TOOLS GRID --- */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid sm:grid-cols-2 gap-8">
          {tools.map((tool) => (
            <div 
              key={tool.id} 
              className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:border-lime-400"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gray-50 group-hover:bg-lime-50 flex items-center justify-center transition-colors border border-gray-100">
                    {tool.icon}
                  </div>
                  <span className={`text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider ${tool.badgeColor}`}>
                    {tool.badge}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-lime-700 transition-colors">
                  {tool.title}
                </h2>

                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  {tool.description}
                </p>

                <div className="space-y-2.5 mb-8 pb-6 border-b border-gray-100">
                  {tool.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-lime-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link 
                to={tool.path}
                className="w-full py-3.5 bg-gray-900 group-hover:bg-lime-500 text-white group-hover:text-white rounded-2xl font-bold text-sm text-center flex items-center justify-center gap-2 transition-all shadow-md group-hover:shadow-lime-500/25"
              >
                <span>{tool.cta}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* --- BANNER: CORE SCANNER PROMO --- */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-lime-500/20 text-lime-400 rounded-full text-xs font-bold border border-lime-500/30">
              <Sparkles className="w-3.5 h-3.5" /> Core AI Technology
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready to Test Your Complete Resume?
            </h3>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              Upload your PDF resume alongside any job description to get an instant 0-100% ATS match score, full missing keyword breakdown, and recruiter critique.
            </p>
          </div>
          <Link 
            to="/dashboard"
            className="px-8 py-4 bg-lime-500 hover:bg-lime-400 text-gray-950 rounded-2xl font-black text-base shadow-lg shadow-lime-500/30 transition-all hover:-translate-y-1 shrink-0 flex items-center gap-2"
          >
            <span>Scan Resume Free Now</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="bg-white py-16 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-3">
              Frequently Asked Questions
            </h3>
            <p className="text-gray-600 text-base">
              Learn how to utilize our free career tools to maximize your interview conversion rates.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <h4 className="font-bold text-gray-900 text-base mb-2 flex items-start gap-2">
                  <HelpCircle className="w-5 h-5 text-lime-600 shrink-0 mt-0.5" />
                  <span>{faq.q}</span>
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed pl-7">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-gray-900 text-gray-400 py-12 border-t border-gray-800 text-xs text-center">
        <div className="max-w-6xl mx-auto px-4 space-y-4">
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-300">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <Link to="/tools" className="hover:text-white transition-colors text-lime-400 font-bold">Free Tools</Link>
            <Link to="/tools/portfolio-builder" className="hover:text-white transition-colors text-emerald-400 font-bold">Portfolio Studio</Link>
            <Link to="/tools/job-description-keyword-extractor" className="hover:text-white transition-colors">JD Keyword Extractor</Link>
            <Link to="/tools/star-bullet-generator" className="hover:text-white transition-colors">STAR Bullet Generator</Link>
            <Link to="/tools/ats-action-verbs" className="hover:text-white transition-colors">250+ Action Verbs</Link>
            <Link to="/dashboard" className="hover:text-white transition-colors">Resume Scanner</Link>
            <Link to="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
          <p>&copy; {new Date().getFullYear()} PandaLime Career (www.pandalime.com). All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}

