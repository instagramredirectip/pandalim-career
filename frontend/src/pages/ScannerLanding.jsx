import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Building2, 
  ShieldCheck, 
  DollarSign, 
  Target, 
  Cpu, 
  FileText, 
  ChevronDown, 
  Zap, 
  Check, 
  AlertTriangle,
  BookOpen,
  HelpCircle,
  Briefcase
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MobileDrawer from '../components/MobileDrawer';
import SocialShare from '../components/SocialShare';
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
      <div className="min-h-screen bg-[#08090C] text-[#F0F4FC] flex flex-col items-center justify-center p-6 text-center font-sans">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">Page Not Found</h1>
        <p className="text-gray-400 text-sm mb-6">The requested career scanner page could not be found.</p>
        <Link 
          to="/" 
          className="px-5 py-2.5 bg-[#D2FF00] hover:bg-[#b8e000] text-[#08090C] rounded-[2px] font-bold text-xs uppercase tracking-wider transition-all"
        >
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

  const roleFaqs = pageData.faqs || [
    {
      q: `What keywords does the ATS look for in a ${pageData.roleName} resume?`,
      a: `For ${pageData.roleName} roles, applicant tracking systems scan for technical proficiencies like ${pageData.topKeywords.slice(0, 5).join(', ')}, alongside demonstrated project architecture and quantified STAR-method accomplishments.`
    },
    {
      q: `How does ${pageData.companyName} use ATS to filter ${pageData.roleName} applications?`,
      a: `${pageData.companyName} receives thousands of applications per opening and utilizes ${pageData.atsType} to parse resumes. The system automatically scores resumes against the job requisitions, ranking candidates who match required keywords and clear formatting standards.`
    },
    {
      q: `Can I scan my ${pageData.roleName} resume for free on PandaLime?`,
      a: `Yes! PandaLime allows you to perform free AI-powered ATS resume scans. Simply upload your PDF resume and the target job description to receive an instant match score, keyword gap analysis, and bullet rewrites.`
    },
    {
      q: `What ATS score do I need to get an interview at ${pageData.companyName}?`,
      a: `To pass automated screening at top employers like ${pageData.companyName}, aim for an ATS match score of 75% or higher with zero critical missing technical skills.`
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
        "name": faq.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.a
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
        title={pageData.title}
        description={pageData.description}
        canonical={`/scanner/${slug}`}
        jsonLd={jsonLd}
      />

      {/* Navigation Header */}
      <Navbar onOpenMobileMenu={() => setMobileMenuOpen(true)} />
      <MobileDrawer isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* Breadcrumb Bar */}
      <div className="bg-[#0E1116] border-b border-[#1F242D] py-2.5 font-sans text-xs text-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto">
          <Link to="/" className="hover:text-[#D2FF00] transition-colors">Home</Link>
          <span>/</span>
          <Link to="/sitemap" className="hover:text-[#D2FF00] transition-colors">ATS Scanners</Link>
          <span>/</span>
          <span className="text-white font-medium truncate">{pageData.roleName} {pageData.companyShortName ? `(${pageData.companyShortName})` : ''}</span>
        </div>
      </div>

      {/* Hero Section */}
      <header className="relative bg-[#08090C] pt-12 sm:pt-16 pb-16 sm:pb-20 border-b border-[#1F242D] overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10 space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-[2px] bg-[#0E1116] border border-[#1F242D] text-[#D2FF00] text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Targeted Resume Optimization</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight max-w-4xl mx-auto leading-tight">
            {pageData.h1}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {pageData.description}
          </p>

          {/* Key Quick Facts Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto text-left">
            <div className="bg-[#0E1116] p-3.5 rounded-[2px] border border-[#1F242D]">
              <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-1">
                <Building2 className="w-3.5 h-3.5 text-[#D2FF00]" /> Employer Target
              </div>
              <p className="text-sm font-bold text-white truncate">{pageData.companyShortName || pageData.companyName}</p>
            </div>
            <div className="bg-[#0E1116] p-3.5 rounded-[2px] border border-[#1F242D]">
              <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-1">
                <Cpu className="w-3.5 h-3.5 text-[#D2FF00]" /> ATS Platform
              </div>
              <p className="text-sm font-bold text-white truncate">{pageData.atsType.split('/')[0].trim()}</p>
            </div>
            <div className="bg-[#0E1116] p-3.5 rounded-[2px] border border-[#1F242D]">
              <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-1">
                <Target className="w-3.5 h-3.5 text-[#D2FF00]" /> Recommended Score
              </div>
              <p className="text-sm font-bold text-[#D2FF00]">75% - 90%+</p>
            </div>
            <div className="bg-[#0E1116] p-3.5 rounded-[2px] border border-[#1F242D]">
              <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-1">
                <DollarSign className="w-3.5 h-3.5 text-[#D2FF00]" /> Typical Salary Band
              </div>
              <p className="text-sm font-bold text-white truncate">
                {pageData.salaryIndia ? pageData.salaryIndia : (pageData.avgSalary || 'Competitive')}
              </p>
            </div>
          </div>

          {/* Primary Call to Action Button */}
          <div className="pt-2">
            <Link 
              to="/dashboard" 
              onClick={() => {
                haptics.heavy();
                asmrAudio.playClick();
              }}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#D2FF00] hover:bg-[#b8e000] text-[#08090C] font-bold text-sm rounded-[2px] shadow-[0_0_20px_rgba(210,255,0,0.3)] transition-all active:scale-95 cursor-pointer uppercase tracking-wider"
            >
              <span>Scan My {pageData.roleName} Resume Free</span> <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-xs text-gray-400 mt-2">
              Free • PDF Upload • Instant Keyword Match Score & Bullet Suggestions
            </p>
          </div>

        </div>
      </header>

      {/* SECTION 1: Role Overview & Categorized Keywords */}
      <section className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
        <div className="grid md:grid-cols-12 gap-8 items-start">
          
          <div className="md:col-span-7 space-y-6">
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                How ATS Systems Screen {pageData.roleName} Resumes
              </h2>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                {pageData.overview}
              </p>
            </div>

            <div className="bg-[#0E1116] p-5 rounded-[2px] border border-[#1F242D] space-y-2">
              <h3 className="font-semibold text-white text-sm flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#D2FF00]" /> {pageData.companyShortName || pageData.companyName} Screening Criteria
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                {pageData.hiringFocus}
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-300">
                Key Resume Optimization Tips for this Role:
              </h3>
              <ul className="space-y-2.5">
                {pageData.atsTips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300">
                    <Check className="w-4 h-4 text-[#D2FF00] shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Categorized Skills Matrix */}
          <div className="md:col-span-5 bg-[#0E1116] p-6 rounded-[2px] border border-[#1F242D] space-y-5">
            <div className="flex items-center justify-between border-b border-[#1F242D] pb-3">
              <h3 className="font-bold text-sm text-white flex items-center gap-2 uppercase tracking-wider">
                <Zap className="w-4 h-4 text-[#D2FF00]" /> Essential Keywords ({pageData.topKeywords.length})
              </h3>
              <span className="text-[11px] text-[#D2FF00] font-semibold">High Priority</span>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed">
              These technical skills and keywords appear frequently in {pageData.roleName} job postings. Make sure your resume explicitly includes the tools and libraries you have hands-on experience with.
            </p>

            {pageData.skillsByCategory && Object.keys(pageData.skillsByCategory).length > 0 ? (
              <div className="space-y-3">
                {Object.entries(pageData.skillsByCategory).map(([category, skills]) => (
                  <div key={category} className="space-y-1.5">
                    <h4 className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">{category}</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {skills.map((skill, idx) => (
                        <span 
                          key={idx} 
                          className="px-2.5 py-1 bg-[#151921] border border-[#1F242D] text-xs text-gray-200 rounded-[2px]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {pageData.topKeywords.map((kw, i) => (
                  <span 
                    key={i} 
                    className="px-3 py-1 bg-[#151921] border border-[#1F242D] text-xs text-gray-200 rounded-[2px]"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            )}

            <div className="pt-3 border-t border-[#1F242D]">
              <Link 
                to="/dashboard"
                onClick={() => {
                  haptics.medium();
                  asmrAudio.playClick();
                }}
                className="w-full py-2.5 bg-[#D2FF00] hover:bg-[#b8e000] text-[#08090C] font-bold text-xs rounded-[2px] flex items-center justify-center gap-1.5 uppercase tracking-wider transition-all"
              >
                <span>Check My Resume for These Keywords</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2: Real-World Resume Bullet Point Examples (Google X-Y-Z Formula) */}
      {pageData.bulletExamples && pageData.bulletExamples.length > 0 && (
        <section className="border-t border-[#1F242D] bg-[#0E1116] py-12 sm:py-16">
          <div className="max-w-6xl mx-auto px-4 space-y-8">
            <div className="text-center space-y-2 max-w-3xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                High-Scoring {pageData.roleName} Resume Bullet Point Examples
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                Recruiters and ATS algorithms favor accomplishment statements written with Google's X-Y-Z formula: <em>Accomplished [X] as measured by [Y], by doing [Z]</em>. Here is how to transform passive duties into quantified impact.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {pageData.bulletExamples.map((bullet, idx) => (
                <div key={idx} className="bg-[#08090C] border border-[#1F242D] rounded-[2px] p-5 space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-semibold text-red-400">
                      <span className="w-2 h-2 rounded-full bg-red-400" />
                      <span>Before (Weak / Passive Duty)</span>
                    </div>
                    <p className="text-xs text-gray-400 italic bg-[#151921] p-3 rounded-[2px] border border-red-900/30">
                      "{bullet.before}"
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#D2FF00]">
                      <span className="w-2 h-2 rounded-full bg-[#D2FF00]" />
                      <span>After (ATS-Optimized with Quantified Metrics)</span>
                    </div>
                    <p className="text-xs sm:text-sm text-white font-medium bg-[#151921] p-3 rounded-[2px] border border-[#D2FF00]/40">
                      "{bullet.after}"
                    </p>
                  </div>

                  <p className="text-xs text-gray-400 pt-1 border-t border-[#1F242D]">
                    <strong className="text-gray-300">Why this works:</strong> {bullet.explanation}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center pt-2">
              <Link
                to="/tools/star-bullet-generator"
                className="inline-flex items-center gap-2 text-xs text-[#D2FF00] hover:underline font-semibold"
              >
                <BookOpen className="w-4 h-4" />
                <span>Use our free AI STAR Resume Bullet Point Generator →</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 3: Common ATS Resume Mistakes for this Role */}
      {pageData.commonMistakes && pageData.commonMistakes.length > 0 && (
        <section className="border-t border-[#1F242D] py-12 sm:py-16 bg-[#08090C]">
          <div className="max-w-5xl mx-auto px-4 space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Common {pageData.roleName} Resume Mistakes to Avoid
              </h2>
              <p className="text-xs sm:text-sm text-gray-300">
                Fix these common errors before submitting your application to pass automated screening.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
              {pageData.commonMistakes.map((item, idx) => (
                <div key={idx} className="bg-[#0E1116] border border-[#1F242D] p-5 rounded-[2px] space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#FF5722]">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>Pitfall #{idx + 1}</span>
                  </div>
                  <h3 className="font-bold text-sm text-white">{item.mistake}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    <strong className="text-gray-300">How to fix:</strong> {item.fix}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 4: FAQs */}
      <section className="border-t border-[#1F242D] bg-[#0E1116] py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-gray-300">
              ATS screening questions for {pageData.roleName} roles at {pageData.companyName}
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
                  className="w-full p-4 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-semibold text-white hover:text-[#D2FF00] transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${openFaq === idx ? 'rotate-180 text-[#D2FF00]' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="px-4 pb-4 text-xs sm:text-sm text-gray-300 leading-relaxed border-t border-[#1F242D] pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: Social Media Sharing */}
      <section className="border-t border-[#1F242D] py-10 px-4 bg-[#08090C]">
        <div className="max-w-4xl mx-auto">
          <SocialShare 
            variant="card"
            title={`${pageData.h1} | PandaLime`}
            description={pageData.description}
            url={`/scanner/${slug}`}
            hashtags={[pageData.roleName.replace(/[^a-zA-Z0-9]/g, ''), 'ResumeTips', 'ATSScanner', 'TechJobs']}
            customCallout={`Share This ${pageData.roleName} ATS Guide with Your Network`}
          />
        </div>
      </section>

      {/* SECTION 5: Internal Linking Matrix & Helpful Guides */}
      <section className="border-t border-[#1F242D] py-12 px-4 bg-[#08090C]">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Helpful Career Guides */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[#D2FF00]" /> Helpful ATS Resume Guides
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link 
                to="/blog/how-to-beat-applicant-tracking-systems-2026-guide"
                className="p-3 bg-[#0E1116] hover:bg-[#151921] border border-[#1F242D] hover:border-[#D2FF00]/40 rounded-[2px] text-xs text-gray-300 hover:text-white transition-all block"
              >
                <p className="font-semibold text-white mb-1">How to Beat ATS Systems in 2026</p>
                <p className="text-[11px] text-gray-400">Complete guide to passing automated keyword and layout filters.</p>
              </Link>
              <Link 
                to="/blog/google-xyz-formula-resume-bullet-points-examples"
                className="p-3 bg-[#0E1116] hover:bg-[#151921] border border-[#1F242D] hover:border-[#D2FF00]/40 rounded-[2px] text-xs text-gray-300 hover:text-white transition-all block"
              >
                <p className="font-semibold text-white mb-1">Google X-Y-Z Resume Bullet Formula</p>
                <p className="text-[11px] text-gray-400">Turn passive duty bullets into quantified accomplishment statements.</p>
              </Link>
              <Link 
                to="/blog/indian-tech-fresher-ats-resume-guide-tcs-infosys-wipro"
                className="p-3 bg-[#0E1116] hover:bg-[#151921] border border-[#1F242D] hover:border-[#D2FF00]/40 rounded-[2px] text-xs text-gray-300 hover:text-white transition-all block"
              >
                <p className="font-semibold text-white mb-1">Indian Tech Freshers Resume Guide</p>
                <p className="text-[11px] text-gray-400">How to crack campus & off-campus ATS screening at TCS, Infosys & Wipro.</p>
              </Link>
            </div>
          </div>

          {/* Related Role Scanners */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-[#D2FF00]" /> Explore More ATS Role Scanners
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-xs">
              {relatedRoles.map(r => (
                <Link 
                  key={r.id}
                  to={`/scanner/${r.id}${pageData.companyId ? `-at-${pageData.companyId}` : ''}`}
                  className="p-2.5 bg-[#0E1116] hover:bg-[#151921] border border-[#1F242D] hover:border-[#D2FF00]/40 rounded-[2px] text-gray-300 hover:text-white transition-all truncate"
                >
                  {r.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Top Employer Scanners */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-[#D2FF00]" /> ATS Scanners for Top Tech Companies
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-xs">
              {relatedCompanies.map(c => (
                <Link 
                  key={c.id}
                  to={`/scanner/${pageData.roleId || 'software-engineer'}-at-${c.id}`}
                  className="p-2.5 bg-[#0E1116] hover:bg-[#151921] border border-[#1F242D] hover:border-[#D2FF00]/40 rounded-[2px] text-gray-300 hover:text-white transition-all truncate"
                >
                  {c.shortName || c.name}
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