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
  Check
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { getPseoData, ROLES, COMPANIES } from '../data/pseoData';

export default function ScannerLanding() {
  const { slug } = useParams();
  const pageData = getPseoData(slug);
  const [openFaq, setOpenFaq] = useState(null);

  if (!pageData) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Scanner Page Not Found</h1>
        <p className="text-gray-600 mb-6">The requested career scanner could not be located.</p>
        <Link to="/" className="px-6 py-3 bg-lime-500 text-white rounded-xl font-bold">
          Return to Home
        </Link>
      </div>
    );
  }

  const toggleFaq = (index) => {
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
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <SEOHead 
        title={`${pageData.title} | PandaLime`}
        description={pageData.description}
        canonical={`/scanner/${slug}`}
        jsonLd={jsonLd}
      />

      {/* Navigation Header */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 text-gray-900 font-black text-2xl tracking-tight">
            <div className="w-8 h-8 bg-lime-500 rounded-lg flex items-center justify-center text-white">
              <Sparkles className="w-5 h-5" />
            </div>
            <span>PandaLime</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/sitemap" className="text-sm font-semibold text-gray-600 hover:text-lime-600 transition-colors hidden sm:block">
              All Scanners
            </Link>
            <Link 
              to="/dashboard" 
              className="px-5 py-2.5 bg-lime-500 hover:bg-lime-600 text-white rounded-xl font-bold text-sm shadow-md shadow-lime-500/20 transition-all hover:-translate-y-0.5"
            >
              Scan Resume Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Breadcrumb Bar */}
      <div className="bg-gray-100 border-b border-gray-200 py-2.5">
        <div className="max-w-6xl mx-auto px-4 text-xs text-gray-500 flex items-center gap-2 overflow-x-auto">
          <Link to="/" className="hover:text-lime-600 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/sitemap" className="hover:text-lime-600 transition-colors">ATS Scanners</Link>
          <span>/</span>
          <span className="text-gray-800 font-semibold truncate">{pageData.roleName} ({pageData.companyName})</span>
        </div>
      </div>

      {/* Hero Section */}
      <header className="relative bg-white pt-16 pb-20 border-b border-gray-200 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-lime-100 text-lime-800 font-bold text-xs uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Targeted ATS Keyword Optimization</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
            Free AI ATS Resume Scanner for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-600 to-green-600">
              {pageData.roleName}s at {pageData.companyName}
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            {pageData.description}
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-10 text-left">
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
              <div className="flex items-center gap-2 text-gray-500 text-xs font-semibold mb-1">
                <Building2 className="w-4 h-4 text-lime-600" /> Employer
              </div>
              <p className="text-base font-bold text-gray-900">{pageData.companyName}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
              <div className="flex items-center gap-2 text-gray-500 text-xs font-semibold mb-1">
                <Cpu className="w-4 h-4 text-lime-600" /> Filter Engine
              </div>
              <p className="text-base font-bold text-gray-900 truncate">{pageData.atsType.split('/')[0]}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
              <div className="flex items-center gap-2 text-gray-500 text-xs font-semibold mb-1">
                <Target className="w-4 h-4 text-lime-600" /> Target Match
              </div>
              <p className="text-base font-bold text-lime-600">75% - 90%+</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
              <div className="flex items-center gap-2 text-gray-500 text-xs font-semibold mb-1">
                <DollarSign className="w-4 h-4 text-lime-600" /> Compensation
              </div>
              <p className="text-base font-bold text-gray-900 truncate">{pageData.avgSalary || 'Competitive'}</p>
            </div>
          </div>

          {/* Main Call to Action Button */}
          <div>
            <Link 
              to="/dashboard" 
              className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-lime-500 hover:bg-lime-600 text-white font-extrabold text-lg rounded-2xl shadow-xl shadow-lime-500/30 transition-all hover:-translate-y-1 cursor-pointer"
            >
              Scan Resume For {pageData.roleName} Now <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-xs text-gray-500 font-medium mt-3">
              100% Free • PDF Upload • Instant AI Keyword Gap Analysis
            </p>
          </div>

        </div>
      </header>

      {/* Role Overview & ATS Insights */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">
              How ATS Filters Score {pageData.roleName} Resumes
            </h2>
            <p className="text-gray-600 leading-relaxed text-base">
              {pageData.overview}
            </p>

            <div className="bg-lime-50/70 p-6 rounded-2xl border border-lime-200 space-y-3">
              <h3 className="font-bold text-lime-900 text-lg flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-lime-600" /> {pageData.companyName} Screening Priorities
              </h3>
              <p className="text-sm text-lime-800 leading-relaxed">
                {pageData.hiringFocus}
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-gray-900">Key ATS Optimization Tips for this Role:</h4>
              <ul className="space-y-2.5">
                {pageData.atsTips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                    <Check className="w-5 h-5 text-lime-600 shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Essential Keywords Box */}
          <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-500" /> Must-Have Keywords for {pageData.roleName}
              </h3>
              <span className="text-xs bg-lime-100 text-lime-800 font-bold px-2.5 py-1 rounded-full">
                High Weight
              </span>
            </div>

            <p className="text-xs text-gray-500">
              Applicant Tracking Systems search for these core technical tools, languages, and competencies. Make sure they appear naturally in your experience bullet points:
            </p>

            <div className="flex flex-wrap gap-2.5">
              {pageData.topKeywords.map((kw, i) => (
                <span 
                  key={i} 
                  className="px-3.5 py-2 bg-gray-50 hover:bg-lime-50 hover:text-lime-800 text-gray-700 text-xs font-semibold rounded-xl border border-gray-200 transition-colors"
                >
                  ✓ {kw}
                </span>
              ))}
            </div>

            <div className="pt-6 border-t border-gray-100">
              <Link 
                to="/dashboard" 
                className="w-full py-3.5 bg-gray-900 hover:bg-black text-white text-center font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-all shadow-md"
              >
                Check My Resume Against These Keywords <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 3 Step Workflow */}
      <section className="bg-white py-16 border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              3 Steps to Optimize Your {pageData.roleName} Resume
            </h2>
            <p className="text-gray-600">Ensure your application beats the automated recruiter cutoffs.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200">
              <div className="w-10 h-10 bg-lime-500 text-white rounded-xl font-black flex items-center justify-center mb-4">1</div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Upload & Compare</h3>
              <p className="text-sm text-gray-600">Upload your PDF resume and the target {pageData.companyName} {pageData.roleName} job description.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200">
              <div className="w-10 h-10 bg-lime-500 text-white rounded-xl font-black flex items-center justify-center mb-4">2</div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Identify Keyword Gaps</h3>
              <p className="text-sm text-gray-600">Our neural parser flags missing skills like {pageData.topKeywords.slice(0, 2).join(' and ')}.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200">
              <div className="w-10 h-10 bg-lime-500 text-white rounded-xl font-black flex items-center justify-center mb-4">3</div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">STAR Bullet Optimization</h3>
              <p className="text-sm text-gray-600">Generate recruiter-ready bullet points with quantified business metrics to pass human review.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Role & Company Specific FAQs */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            {pageData.roleName} ATS Screening FAQs
          </h2>
          <p className="text-gray-600">Common questions about ATS optimization for {pageData.companyName} applications.</p>
        </div>

        <div className="space-y-4">
          {roleFaqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
              <button
                onClick={() => toggleFaq(index)}
                className="w-full p-6 text-left font-bold text-base text-gray-900 flex justify-between items-center gap-4 hover:text-lime-600 transition-colors"
              >
                <span>{faq.question}</span>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 shrink-0 ${openFaq === index ? 'rotate-180 text-lime-600' : ''}`} />
              </button>
              {openFaq === index && (
                <div className="px-6 pb-6 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Internal Linking Mesh: Related Roles & Companies */}
      <section className="bg-white py-16 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 space-y-10">
          
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-lime-600" /> Other Top Employer Scanners for {pageData.roleName}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {relatedCompanies.map(c => {
                const targetSlug = pageData.roleId ? `${pageData.roleId}-at-${c.id}` : `software-engineer-at-${c.id}`;
                return (
                  <Link
                    key={c.id}
                    to={`/scanner/${targetSlug}`}
                    className="p-3 bg-gray-50 hover:bg-lime-50 text-gray-700 hover:text-lime-800 text-xs font-semibold rounded-xl border border-gray-200 text-center transition-all block"
                  >
                    {pageData.roleName} at {c.name}
                  </Link>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-lime-600" /> Explore Other Career ATS Scanners
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {relatedRoles.map(r => (
                <Link
                  key={r.id}
                  to={`/scanner/${r.id}`}
                  className="p-3 bg-gray-50 hover:bg-lime-50 text-gray-700 hover:text-lime-800 text-xs font-semibold rounded-xl border border-gray-200 text-center transition-all block"
                >
                  {r.title} ATS Scan
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-lime-400 rounded-lg flex items-center justify-center text-gray-900">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-white font-bold">PandaLime Career</span>
          </div>
          <div className="flex flex-wrap gap-6 text-xs text-gray-400">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <Link to="/dashboard" className="hover:text-white transition-colors">Resume Scanner</Link>
            <Link to="/sitemap" className="hover:text-white transition-colors">All 50+ ATS Scanners</Link>
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
          <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} PandaLime. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}