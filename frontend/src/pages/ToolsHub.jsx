import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Search, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  Cpu, 
  HelpCircle, 
  TrendingUp, 
  ArrowUpRight 
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import MobileDrawer from '../components/MobileDrawer';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ToolsHub() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const tools = [
    {
      id: "job-description-keyword-extractor",
      title: "Job Description Keyword Extractor",
      badge: "Instant ATS Parser",
      badgeColor: "bg-[#D2FF00]/10 text-[#D2FF00] border border-[#D2FF00]/30",
      icon: <Search className="w-5 h-5 text-[#D2FF00]" />,
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
      badgeColor: "bg-[#FF5722]/10 text-[#FF5722] border border-[#FF5722]/30",
      icon: <Sparkles className="w-5 h-5 text-[#FF5722]" />,
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
      badgeColor: "bg-purple-500/10 text-purple-400 border border-purple-500/30",
      icon: <TrendingUp className="w-5 h-5 text-purple-400" />,
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
      badgeColor: "bg-[#D2FF00]/10 text-[#D2FF00] border border-[#D2FF00]/30",
      icon: <Cpu className="w-5 h-5 text-[#D2FF00]" />,
      description: "Build, customize, and host your own modern portfolio on pandalime.com/p/:username. Featuring Hacker Terminal, Minimalist, AI Matrix, and Executive themes with QR Code & Resume links.",
      features: [
        "5 Industry Themes (Cyber Hacker, Minimal, AI Matrix, Executive)",
        "Instant creative prompts & 1-click role presets",
        "Free hosting at pandalime.com/p/:username with Person SEO Schema"
      ],
      path: "/portfolio-builder",
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
    <div className="min-h-screen bg-[#08090C] font-sans text-[#E1E2E9] selection:bg-[#D2FF00] selection:text-[#08090C]">
      <SEOHead 
        title="Free AI ATS & Career Tools Suite | PandaLime"
        description="Free AI career tools: Job Description Keyword Extractor, STAR Bullet Generator, and 250+ ATS Power Action Verbs. 100% free with instant access."
        canonical="/tools"
        jsonLd={jsonLd}
      />

      {/* --- TOP NAVBAR --- */}
      <Navbar onOpenMobileMenu={() => setMobileMenuOpen(true)} />
      <MobileDrawer isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* --- BREADCRUMBS --- */}
      <div className="bg-[#0E1116] border-b border-[#1F242D] py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-mono text-xs text-[#505763] flex items-center gap-2">
          <Link to="/" className="hover:text-[#D2FF00] transition-colors">HOME</Link>
          <span>/</span>
          <span className="text-[#9BA3AF]">FREE_CAREER_TOOLS_SUITE</span>
        </div>
      </div>

      {/* --- HERO SECTION --- */}
      <header className="bg-[#08090C] py-16 sm:py-20 border-b border-[#1F242D] text-center">
        <div className="max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[2px] bg-[#0E1116] border border-[#1F242D] text-[#D2FF00] font-mono text-xs uppercase tracking-wider mb-6">
            <Zap className="w-3.5 h-3.5" />
            <span>// 100% FREE AI CAREER SUITE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#F5F7FA] tracking-tight mb-6 leading-tight">
            Sovereign ATS Resume &amp; <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D2FF00] via-[#FF5722] to-[#D2FF00]">
              Career Optimization Suite
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-[#9BA3AF] leading-relaxed max-w-3xl mx-auto">
            Everything you need to beat enterprise applicant tracking systems (Workday, Taleo, Greenhouse, Ashby), craft high-impact STAR bullet points, and land interviews at top tech employers.
          </p>
        </div>
      </header>

      {/* --- TOOLS GRID --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 gap-6">
          {tools.map((tool) => (
            <div 
              key={tool.id} 
              className="bg-[#0E1116] rounded-[2px] border border-[#1F242D] p-6 sm:p-8 hover:border-[#D2FF00] transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-[2px] bg-[#151921] border border-[#1F242D] flex items-center justify-center">
                    {tool.icon}
                  </div>
                  <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-[2px] uppercase tracking-wider ${tool.badgeColor}`}>
                    {tool.badge}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-[#F5F7FA] mb-3 group-hover:text-[#D2FF00] transition-colors">
                  {tool.title}
                </h2>

                <p className="text-xs sm:text-sm text-[#9BA3AF] leading-relaxed mb-6">
                  {tool.description}
                </p>

                <div className="space-y-2 mb-8 pb-6 border-b border-[#1F242D]">
                  {tool.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[#9BA3AF]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D2FF00] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link 
                to={tool.path}
                className="w-full py-3 bg-[#151921] group-hover:bg-[#D2FF00] text-[#F5F7FA] group-hover:text-[#08090C] font-mono font-bold text-xs uppercase tracking-wider rounded-[2px] flex items-center justify-center gap-2 transition-all border border-[#1F242D] group-hover:border-[#D2FF00]"
              >
                <span>{tool.cta}</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* --- BANNER: CORE SCANNER PROMO --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-[#0E1116] border border-[#1F242D] rounded-[2px] p-8 sm:p-10 text-[#F5F7FA] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#151921] text-[#D2FF00] rounded-[2px] font-mono text-[10px] font-bold border border-[#1F242D]">
              <Sparkles className="w-3.5 h-3.5" /> FLAGSHIP PARSER
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready to Test Your Complete Resume?
            </h3>
            <p className="text-xs sm:text-sm text-[#9BA3AF] leading-relaxed">
              Upload your PDF resume alongside any job description to get an instant 0-100% ATS match score, full missing keyword breakdown, and recruiter critique.
            </p>
          </div>
          <Link 
            to="/dashboard"
            className="px-6 py-3.5 bg-[#D2FF00] hover:bg-[#E5FF66] text-[#08090C] font-mono font-bold text-xs uppercase tracking-wider rounded-[2px] shadow-[0_0_15px_rgba(210,255,0,0.3)] transition-all shrink-0 flex items-center gap-2"
          >
            <span>Scan Resume Free Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="bg-[#08090C] py-16 border-t border-[#1F242D]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#F5F7FA] mb-2">
              Frequently Asked Questions
            </h3>
            <p className="text-xs sm:text-sm text-[#9BA3AF]">
              Learn how to utilize our free career tools to maximize your interview conversion rates.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-[#0E1116] rounded-[2px] p-5 border border-[#1F242D]">
                <h4 className="font-bold text-[#F5F7FA] text-sm mb-2 flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-[#D2FF00] shrink-0 mt-0.5" />
                  <span>{faq.q}</span>
                </h4>
                <p className="text-xs text-[#9BA3AF] leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <Footer />

    </div>
  );
}
