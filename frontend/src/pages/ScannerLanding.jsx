import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Briefcase, 
  Building2, 
  ShieldCheck, 
  DollarSign, 
  Target, 
  Cpu, 
  FileText, 
  ChevronDown, 
  Layers, 
  MapPin, 
  ArrowLeft,
  Mail,
  Zap,
  Check,
  ScanLine,
  Terminal,
  ExternalLink
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MobileDrawer from '../components/MobileDrawer';
import { getPseoData, ROLES, COMPANIES } from '../data/pseoData';
import { haptics } from '../utils/haptics';
import { asmrAudio } from '../utils/asmrAudio';

export default function ScannerLanding() {
  const { slug } = useParams();
  const pageData = getPseoData(slug);
  const [openFaq, setOpenFaq] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!pageData) {
    return (
      <div className="min-h-screen bg-[#08090C] text-[#F0F4FC] flex flex-col items-center justify-center p-6 text-center font-mono">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 uppercase">Scanner Blueprint Not Found</h1>
        <p className="text-gray-400 text-xs sm:text-sm mb-6">The requested career scanner could not be located in our AST index.</p>
        <Link to="/" className="px-5 py-2.5 bg-[#D2FF00] text-[#08090C] rounded-[2px] font-black text-xs uppercase shadow-[0_0_12px_rgba(210,255,0,0.3)]">
          Return to Home
        </Link>
      </div>
    );
  }

  const toggleFaq = (index) => {
    haptics.selection();
    asmrAudio.playSwitch();
    setOpenFaq(openFaq === index ? null : index);
  };

  const roleFaqs = [
    {
      question: `What keywords does the ATS look for in a ${pageData.roleName} resume?`,
      answer: `For ${pageData.roleName} roles, applicant tracking systems scan for technical proficiencies like ${pageData.topKeywords.slice(0, 5).join(', ')}, alongside demonstrated project architecture and quantified STAR-method accomplishments.`
    },
    {
      question: `How does ${pageData.companyName} use ATS to filter ${pageData.roleName} applications?`,
      answer: `${pageData.companyName} receives thousands of applications per opening and utilizes ${pageData.atsType} to parse resumes. The system automatically scores resumes against the job requisitions, ranking candidates who match both required keywords and structural formatting standards.`
    },
    {
      question: `Can I scan my ${pageData.roleName} resume for free on PandaLime?`,
      answer: `Yes! PandaLime allows you to perform free AI-powered ATS resume scans. Simply upload your PDF resume and the target job description to receive an instant match score and missing keyword analysis.`
    },
    {
      question: `What ATS score do I need to get an interview at ${pageData.companyName}?`,
      answer: `To pass automated screening at top employers like ${pageData.companyName}, aim for an ATS match score of 75% or higher with zero critical missing technical skills.`
    }
  ];

  // Breadcrumbs Schema + FAQPage Schema + SoftwareApplication Schema
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.pandalime.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "ATS Scanners Directory",
          "item": "https://www.pandalime.com/sitemap"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": pageData.title,
          "item": `https://www.pandalime.com/scanner/${slug}`
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": roleFaqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": `PandaLime ATS Scanner for ${pageData.roleName}`,
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "All Web Browsers",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": pageData.description
    }
  ];

  // Related roles and companies for internal linking mesh
  const relatedRoles = ROLES.filter(r => r.id !== pageData.roleId).slice(0, 6);
  const relatedCompanies = COMPANIES.filter(c => c.id !== pageData.companyId).slice(0, 6);

  return (
    <div className="min-h-screen bg-[#08090C] font-sans text-[#F0F4FC] selection:bg-[#D2FF00]/30 selection:text-black antialiased">
      <SEOHead 
        title={`${pageData.title} | PandaLime`}
        description={pageData.description}
        canonical={`/scanner/${slug}`}
        jsonLd={jsonLd}
      />

      {/* Navigation Header */}
      <Navbar onOpenMobileMenu={() => setMobileMenuOpen(true)} />
      <MobileDrawer isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* Breadcrumb Bar */}
      <div className="bg-[#0E1116] border-b border-[#1F242D] py-2.5 font-mono text-xs text-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto">
          <Link to="/" className="hover:text-[#D2FF00] transition-colors">Home</Link>
          <span>/</span>
          <Link to="/sitemap" className="hover:text-[#D2FF00] transition-colors">ATS Scanners</Link>
          <span>/</span>
          <span className="text-white font-bold truncate">{pageData.roleName} ({pageData.companyName})</span>
        </div>
      </div>

      {/* Hero Section */}
      <header className="relative bg-[#08090C] pt-12 sm:pt-16 pb-16 sm:pb-20 border-b border-[#1F242D] overflow-hidden">
        {/* Hairline Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1F242D_1px,transparent_1px),linear-gradient(to_bottom,#1F242D_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 text-center relative z-10 space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-[2px] bg-[#0E1116] border border-[#1F242D] text-[#D2FF00] font-mono font-bold text-xs uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Targeted ATS Keyword Optimization</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight max-w-4xl mx-auto leading-tight font-sans">
            Free AI ATS Resume Scanner for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D2FF00] via-[#FF5722] to-[#D2FF00]">
              {pageData.roleName}s at {pageData.companyName}
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed font-sans">
            {pageData.description}
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto text-left font-mono">
            <div className="bg-[#0E1116] p-3.5 rounded-[2px] border border-[#1F242D]">
              <div className="flex items-center gap-1.5 text-gray-400 text-[11px] mb-1">
                <Building2 className="w-3.5 h-3.5 text-[#D2FF00]" /> Employer
              </div>
              <p className="text-sm font-bold text-white truncate">{pageData.companyName}</p>
            </div>
            <div className="bg-[#0E1116] p-3.5 rounded-[2px] border border-[#1F242D]">
              <div className="flex items-center gap-1.5 text-gray-400 text-[11px] mb-1">
                <Cpu className="w-3.5 h-3.5 text-[#D2FF00]" /> Filter Engine
              </div>
              <p className="text-sm font-bold text-white truncate">{pageData.atsType.split('/')[0]}</p>
            </div>
            <div className="bg-[#0E1116] p-3.5 rounded-[2px] border border-[#1F242D]">
              <div className="flex items-center gap-1.5 text-gray-400 text-[11px] mb-1">
                <Target className="w-3.5 h-3.5 text-[#D2FF00]" /> Target Match
              </div>
              <p className="text-sm font-bold text-[#D2FF00]">75% - 90%+</p>
            </div>
            <div className="bg-[#0E1116] p-3.5 rounded-[2px] border border-[#1F242D]">
              <div className="flex items-center gap-1.5 text-gray-400 text-[11px] mb-1">
                <DollarSign className="w-3.5 h-3.5 text-[#D2FF00]" /> Compensation
              </div>
              <p className="text-sm font-bold text-white truncate" title={pageData.salaryIndia ? `${pageData.salaryIndia} (India) / ${pageData.avgSalary} (Global)` : pageData.avgSalary}>
                {pageData.salaryIndia ? `${pageData.salaryIndia} | ${pageData.avgSalary}` : (pageData.avgSalary || 'Competitive')}
              </p>
            </div>
          </div>

          {/* Main Call to Action Button */}
          <div className="pt-2">
            <Link 
              to="/dashboard" 
              onClick={() => {
                haptics.heavy();
                asmrAudio.playClick();
              }}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#D2FF00] hover:bg-[#b8e000] text-[#08090C] font-mono font-black text-xs sm:text-sm rounded-[2px] shadow-[0_0_20px_rgba(210,255,0,0.3)] transition-all active:scale-95 cursor-pointer uppercase tracking-wider"
            >
              <span>Scan Resume For {pageData.roleName} Now</span> <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-[11px] text-gray-500 font-mono mt-2">
              100% Free • PDF Upload • Instant AI Keyword Gap Analysis
            </p>
          </div>

        </div>
      </header>

      {/* Role Overview & ATS Insights */}
      <section className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-start">
          
          <div className="space-y-5">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase font-sans">
              How ATS Filters Score {pageData.roleName} Resumes
            </h2>
            <p className="text-gray-300 leading-relaxed text-xs sm:text-sm">
              {pageData.overview}
            </p>

            <div className="bg-[#0E1116] p-5 rounded-[2px] border border-[#1F242D] space-y-2">
              <h3 className="font-mono font-bold text-white text-sm flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#D2FF00]" /> {pageData.companyName} Screening Priorities
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                {pageData.hiringFocus}
              </p>
            </div>

            <div className="space-y-2.5">
              <h4 className="font-mono font-bold text-xs uppercase tracking-wider text-gray-300">Key ATS Optimization Tips for this Role:</h4>
              <ul className="space-y-2">
                {pageData.atsTips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-gray-300">
                    <Check className="w-4 h-4 text-[#D2FF00] shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Essential Keywords Matrix */}
          <div className="bg-[#0E1116] p-6 rounded-[2px] border border-[#1F242D] space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#1F242D] pb-3">
              <h3 className="font-mono font-bold text-sm text-white flex items-center gap-2 uppercase tracking-wider">
                <Zap className="w-4 h-4 text-[#FF5722]" /> Essential Keywords ({pageData.topKeywords.length})
              </h3>
              <span className="text-[10px] font-mono text-gray-500 uppercase">ATS WEIGHT: HIGH</span>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed">
              Resumes for {pageData.roleName} at {pageData.companyName} must explicitly contain these verified technical proficiencies to avoid automated threshold disqualification.
            </p>

            <div className="flex flex-wrap gap-2">
              {pageData.topKeywords.map((kw, i) => (
                <span 
                  key={i} 
                  className="px-3 py-1 bg-[#151921] border border-[#1F242D] text-xs font-mono text-gray-200 rounded-[2px]"
                >
                  {kw}
                </span>
              ))}
            </div>

            <div className="pt-3 border-t border-[#1F242D]">
              <Link 
                to="/dashboard"
                onClick={() => {
                  haptics.medium();
                  asmrAudio.playClick();
                }}
                className="w-full py-3 bg-[#D2FF00] hover:bg-[#b8e000] text-[#08090C] font-mono font-black text-xs rounded-[2px] flex items-center justify-center gap-1.5 shadow-md uppercase tracking-wider transition-all"
              >
                <span>Audit My Resume Against These Keywords</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-t border-[#1F242D] bg-[#0E1116] py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-xl sm:text-2xl font-black text-white uppercase font-sans">
              Frequently Asked Questions
            </h2>
            <p className="text-xs font-mono text-gray-400">
              ATS screening rules and resume scoring for {pageData.roleName}s at {pageData.companyName}
            </p>
          </div>

          <div className="space-y-3">
            {roleFaqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="bg-[#08090C] border border-[#1F242D] rounded-[2px] overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-mono font-bold text-white hover:text-[#D2FF00] transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${openFaq === idx ? 'rotate-180 text-[#D2FF00]' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="px-4 pb-4 text-xs text-gray-300 leading-relaxed font-sans border-t border-[#1F242D] pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Internal Linking Matrix */}
      <section className="border-t border-[#1F242D] py-12 px-4 bg-[#08090C]">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400">
              Explore More ATS Role Scanners
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-xs font-mono">
              {relatedRoles.map(r => (
                <Link 
                  key={r.id}
                  to={`/scanner/${r.id}-at-${pageData.companyId}`}
                  className="p-2.5 bg-[#0E1116] hover:bg-[#151921] border border-[#1F242D] hover:border-[#D2FF00]/40 rounded-[2px] text-gray-300 hover:text-white transition-all truncate"
                >
                  {r.title}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400">
              ATS Scanners for Top Tech Companies
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-xs font-mono">
              {relatedCompanies.map(c => (
                <Link 
                  key={c.id}
                  to={`/scanner/${pageData.roleId}-at-${c.id}`}
                  className="p-2.5 bg-[#0E1116] hover:bg-[#151921] border border-[#1F242D] hover:border-[#D2FF00]/40 rounded-[2px] text-gray-300 hover:text-white transition-all truncate"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}