import React from 'react';
import { Map, ArrowRight, ArrowLeft, Briefcase, Building2, ShieldCheck, Sparkles, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { ROLES, COMPANIES, SPECIAL_NICHES } from '../data/pseoData';

export default function Sitemap() {
  const mainPages = [
    { name: "Home - Free AI Resume Scanner", path: "/" },
    { name: "Resume Scanner Tool (App)", path: "/dashboard" },
    { name: "Community Resume Roast Wall", path: "/roast-wall" },
    { name: "Login / Account", path: "/login" }
  ];

  const freeTools = [
    { name: "Free Career Tools Suite Hub", path: "/tools", desc: "Central directory of all free career utilities & generators" },
    { name: "AI Developer & Cyber Portfolio Studio", path: "/tools/portfolio-builder", desc: "Build & host your portfolio website at pandalime.com/p/:username with 5 themes" },
    { name: "Job Description Keyword Extractor", path: "/tools/job-description-keyword-extractor", desc: "Extract technical skills, tools & soft skills from any JD" },
    { name: "AI STAR Method Resume Bullet Generator", path: "/tools/star-bullet-generator", desc: "Craft Google X-Y-Z formula bullet points with metrics" },
    { name: "250+ ATS Action Verbs Directory", path: "/tools/ats-action-verbs", desc: "Recruiter-approved power verbs categorized by skill" }
  ];

  const legalPages = [
    { name: "Contact Support", path: "/contact" },
    { name: "Privacy Policy", path: "/privacy-policy" },
    { name: "Terms & Conditions", path: "/terms" }
  ];

  const jsonLd = {
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
        "name": "Sitemap Directory",
        "item": "https://www.pandalime.com/sitemap"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans text-gray-900">
      <SEOHead 
        title="HTML Sitemap & ATS Resume Scanners Directory | PandaLime"
        description="Comprehensive directory of all free AI ATS resume scanners, employer keyword guides, and career optimization tools on PandaLime."
        canonical="/sitemap"
        jsonLd={jsonLd}
      />

      <div className="max-w-6xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-lime-600 transition-colors mb-8 font-medium text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12 mb-12">
          
          <div className="flex items-center gap-4 mb-10 pb-8 border-b border-gray-100">
            <div className="w-12 h-12 bg-lime-100 text-lime-600 rounded-xl flex items-center justify-center">
              <Map className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">PandaLime Directory & Sitemap</h1>
              <p className="text-gray-500 mt-1 text-sm sm:text-base">Comprehensive index of all public pages, tools, and targeted ATS resume scanners.</p>
            </div>
          </div>

          {/* Section 1: Core Pages & Legal */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-lime-600" /> Core Pages & App
              </h2>
              <ul className="space-y-3">
                {mainPages.map((link, j) => (
                  <li key={j}>
                    <Link to={link.path} className="flex items-center gap-2 text-gray-700 hover:text-lime-600 font-medium transition-colors group text-sm">
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-lime-500 transition-colors" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-lime-600" /> Legal, Policy & Support
              </h2>
              <ul className="space-y-3">
                {legalPages.map((link, j) => (
                  <li key={j}>
                    <Link to={link.path} className="flex items-center gap-2 text-gray-700 hover:text-lime-600 font-medium transition-colors group text-sm">
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-lime-500 transition-colors" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section 2: Free AI Career Tools Suite */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-lime-600" /> Free AI Career Tools Suite (100% Free Utilities)
              </h2>
              <Link to="/tools" className="text-xs sm:text-sm font-bold text-lime-600 hover:underline">
                View Tools Hub →
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {freeTools.map((tool, idx) => (
                <Link
                  key={idx}
                  to={tool.path}
                  className="p-5 bg-lime-50/50 hover:bg-lime-50 rounded-xl border border-lime-200 hover:border-lime-400 transition-all block group shadow-sm"
                >
                  <p className="font-bold text-gray-900 text-sm group-hover:text-lime-700 flex items-center justify-between">
                    <span>{tool.name}</span>
                    <ArrowRight className="w-4 h-4 text-lime-500 group-hover:translate-x-1 transition-transform" />
                  </p>
                  <p className="text-xs text-gray-600 mt-1">{tool.desc}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Section 3: Regional Indian Language Portals */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Globe className="w-6 h-6 text-lime-600" /> Regional Indian Language Portals (क्षेत्रीय भाषा पोर्टल)
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link to="/hi" className="p-4 bg-gray-50 hover:bg-lime-50 rounded-xl border border-gray-200 hover:border-lime-300 transition-all block group">
                <p className="font-bold text-gray-900 text-sm group-hover:text-lime-700">हिन्दी (Hindi) - AI रेज़्युमे स्कैनर</p>
                <p className="text-xs text-gray-500 mt-1">TCS, Infosys, Wipro और भारतीय टेक जॉब्स के लिए</p>
              </Link>
              <Link to="/ta" className="p-4 bg-gray-50 hover:bg-lime-50 rounded-xl border border-gray-200 hover:border-lime-300 transition-all block group">
                <p className="font-bold text-gray-900 text-sm group-hover:text-lime-700">தமிழ் (Tamil) - ரெஸ்யூம் ஸ்கேனர்</p>
                <p className="text-xs text-gray-500 mt-1">சென்னை மற்றும் பெங்களூரு ஐடி வேலைகளுக்கு</p>
              </Link>
              <Link to="/te" className="p-4 bg-gray-50 hover:bg-lime-50 rounded-xl border border-gray-200 hover:border-lime-300 transition-all block group">
                <p className="font-bold text-gray-900 text-sm group-hover:text-lime-700">తెలుగు (Telugu) - రెజ్యూమ్ స్కానర్</p>
                <p className="text-xs text-gray-500 mt-1">హైదరాబాద్ మరియు బెంగళూరు టెక్ ఉద్యోగాల కోసం</p>
              </Link>
              <Link to="/kn" className="p-4 bg-gray-50 hover:bg-lime-50 rounded-xl border border-gray-200 hover:border-lime-300 transition-all block group">
                <p className="font-bold text-gray-900 text-sm group-hover:text-lime-700">ಕನ್ನಡ (Kannada) - ರೆಸ್ಯೂಮ್ ಸ್ಕ್ಯಾನರ್</p>
                <p className="text-xs text-gray-500 mt-1">ಬೆಂಗಳೂರು ಸಿಲಿಕಾನ್ ವ್ಯಾಲಿ ಮತ್ತು ಐಟಿ ಉದ್ಯೋಗಗಳು</p>
              </Link>
              <Link to="/mr" className="p-4 bg-gray-50 hover:bg-lime-50 rounded-xl border border-gray-200 hover:border-lime-300 transition-all block group">
                <p className="font-bold text-gray-900 text-sm group-hover:text-lime-700">मराठी (Marathi) - रेझ्युमे स्कॅनर</p>
                <p className="text-xs text-gray-500 mt-1">पुणे आणि मुंबई टेक हब नोकऱ्यांसाठी</p>
              </Link>
              <Link to="/bn" className="p-4 bg-gray-50 hover:bg-lime-50 rounded-xl border border-gray-200 hover:border-lime-300 transition-all block group">
                <p className="font-bold text-gray-900 text-sm group-hover:text-lime-700">বাংলা (Bengali) - রেজুমে স্ক্যানার</p>
                <p className="text-xs text-gray-500 mt-1">কলকাতা এবং ভারত জুড়ে প্রযুক্তি চাকরির জন্য</p>
              </Link>
            </div>
          </div>

          {/* Section 3: Scanners by Career Role */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-lime-600" /> ATS Scanners by Job Category
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {ROLES.map(role => (
                <Link
                  key={role.id}
                  to={`/scanner/${role.id}`}
                  className="p-4 bg-gray-50 hover:bg-lime-50 rounded-xl border border-gray-200 hover:border-lime-300 transition-all block group"
                >
                  <p className="font-bold text-gray-900 text-sm group-hover:text-lime-700">{role.title} ATS Scanner</p>
                  <p className="text-xs text-gray-500 mt-1">{role.category} • Top Keywords & ATS Review</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Section 3: Specialized Hiring & Freshers Tracks */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Building2 className="w-6 h-6 text-lime-600" /> Specialized Hiring Tracks & Graduate Portals
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {SPECIAL_NICHES.map(niche => (
                <Link
                  key={niche.slug}
                  to={`/scanner/${niche.slug}`}
                  className="p-4 bg-gray-50 hover:bg-lime-50 rounded-xl border border-gray-200 hover:border-lime-300 transition-all block group"
                >
                  <p className="font-bold text-gray-900 text-sm group-hover:text-lime-700">{niche.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{niche.description}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Section 4: Full Matrix of Role & Company Scanners */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              All 49+ Company-Specific ATS Resume Scanners
            </h2>
            <div className="space-y-8">
              {COMPANIES.map(company => (
                <div key={company.id} className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <h3 className="font-bold text-gray-900 text-base mb-3 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-lime-600" /> {company.name} ATS Resume Scanners
                  </h3>
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                    {ROLES.map(role => (
                      <Link
                        key={`${role.id}-${company.id}`}
                        to={`/scanner/${role.id}-at-${company.id}`}
                        className="text-xs text-gray-600 hover:text-lime-700 hover:underline p-1.5 rounded"
                      >
                        • {role.title} at {company.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}