import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  UploadCloud, 
  ScanLine, 
  Briefcase, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Mail, 
  Map, 
  Sparkles,
  ChevronDown,
  Building2,
  Search
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import LanguageSelector from '../components/LanguageSelector';
import { TRANSLATIONS, SUPPORTED_LANGUAGES } from '../data/translations';
import { ROLES, COMPANIES, SPECIAL_NICHES } from '../data/pseoData';

export default function RegionalHome() {
  const { lang = 'hi' } = useParams();
  const [openFaq, setOpenFaq] = useState(null);

  const t = TRANSLATIONS[lang] || TRANSLATIONS['hi'];
  const langConfig = SUPPORTED_LANGUAGES.find(l => l.code === lang) || SUPPORTED_LANGUAGES[1];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": `PandaLime AI Resume Scanner (${langConfig.nativeName})`,
      "operatingSystem": "All Web Browsers",
      "applicationCategory": "BusinessApplication",
      "inLanguage": lang,
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "INR"
      },
      "description": t.seoDesc
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "inLanguage": lang,
      "mainEntity": t.faqs.map(faq => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.a
        }
      }))
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <SEOHead 
        title={t.seoTitle}
        description={t.seoDesc}
        canonical={`/${lang}`}
        lang={lang}
        jsonLd={jsonLd}
      />

      {/* Inline styles for custom marquee */}
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link to={`/${lang}`} className="flex items-center gap-2 text-gray-900 font-black text-2xl tracking-tight">
            <div className="w-9 h-9 bg-lime-500 rounded-xl flex items-center justify-center text-white shadow-md shadow-lime-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <span>PandaLime</span>
          </Link>
          <div className="flex items-center gap-3">
            <LanguageSelector variant="nav" />
            <Link to="/roast-wall" className="text-sm font-semibold text-gray-600 hover:text-lime-600 transition-colors hidden sm:block">
              {t.viewCommunity}
            </Link>
            <Link 
              to="/dashboard" 
              className="px-5 py-2.5 bg-lime-500 hover:bg-lime-600 text-white rounded-xl font-bold text-sm shadow-md shadow-lime-500/20 transition-all hover:-translate-y-0.5"
            >
              {t.scanButton}
            </Link>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <header className="relative overflow-hidden bg-white pt-20 pb-28 border-b border-gray-200">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>
        <div className="max-w-6xl mx-auto px-4 relative z-10 text-center">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lime-100 text-lime-800 font-semibold text-sm mb-6 animate-bounce">
            <Sparkles className="w-4 h-4" />
            <span>{t.badge}</span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-6 leading-tight max-w-5xl mx-auto">
            {t.h1Main} <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-500 to-green-600">{t.h1Highlight}</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            {t.heroSubtitle}
          </p>

          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full sm:w-auto">
              <Link 
                to="/dashboard" 
                className="w-full sm:w-auto px-8 py-4 bg-lime-500 hover:bg-lime-600 text-white rounded-xl font-bold text-lg shadow-lg shadow-lime-500/30 transition-all hover:-translate-y-1 flex items-center justify-center gap-2 cursor-pointer"
              >
                {t.scanButton} <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                to="/roast-wall" 
                className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-xl font-bold text-lg shadow-sm transition-all hover:-translate-y-1 flex items-center justify-center gap-2 cursor-pointer"
              >
                {t.viewCommunity}
              </Link>
            </div>
            
            <p className="text-sm text-gray-500 font-medium mt-2 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-lime-500" /> {t.freeBadge}
            </p>
          </div>

        </div>
      </header>

      {/* --- MARQUEE / INDIAN & GLOBAL TECH EMPLOYERS --- */}
      <section className="py-8 bg-gray-900 text-white overflow-hidden flex flex-col items-center border-b border-gray-800">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 text-center px-4">
          {t.marqueeTitle}
        </p>
        <div className="w-full overflow-hidden relative">
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-gray-900 to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-gray-900 to-transparent z-10"></div>
          
          <div className="animate-marquee flex items-center gap-12 md:gap-24 px-8">
            {['TCS', 'Infosys', 'Wipro', 'HCLTech', 'Cognizant', 'Accenture', 'Flipkart', 'Swiggy', 'Zomato', 'Razorpay', 'Google', 'Microsoft', 'Amazon', 'TCS', 'Infosys', 'Wipro', 'HCLTech', 'Cognizant'].map((company, i) => (
              <span key={i} className="text-lg md:text-xl font-bold text-gray-400 tracking-tight hover:text-white transition-colors cursor-default whitespace-nowrap">
                {company}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS --- */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t.howItWorksTitle}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            {t.howItWorksSubtitle}
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {t.steps.map((step, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200 hover:shadow-xl transition-all hover:-translate-y-2 relative group">
              <div className="w-16 h-16 bg-lime-50 rounded-2xl flex items-center justify-center mb-6 text-lime-600 font-black text-2xl">
                {i + 1}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- ATS PILLARS --- */}
      <section className="bg-white py-20 border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t.pillarsTitle}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              {t.pillarsSubtitle}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.pillars.map((pillar, idx) => (
              <div key={idx} className="bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:border-lime-400 transition-colors">
                <div className="w-10 h-10 bg-lime-100 rounded-xl text-lime-700 font-bold flex items-center justify-center mb-4 text-sm">
                  0{idx + 1}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{pillar.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FEATURES & DIRECT SCAN CTA --- */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                {t.featuresTitle}
              </h2>
              
              <div className="space-y-4">
                {t.features.map((feature, i) => (
                  <div key={i} className="flex gap-4 bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                    <CheckCircle2 className="w-6 h-6 text-lime-500 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-base font-bold text-gray-900">{feature.title}</h3>
                      <p className="text-gray-600 text-sm mt-0.5">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <Link 
                  to="/dashboard"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-lime-500 hover:bg-lime-600 text-white rounded-xl font-bold text-base shadow-lg transition-all"
                >
                  {t.scanButton} <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>

            <div className="flex-1 w-full bg-gray-900 rounded-3xl p-8 border border-gray-800 shadow-2xl text-white">
              <span className="px-3 py-1 bg-lime-500/20 text-lime-400 rounded-full text-xs font-bold border border-lime-500/30 inline-block mb-6">
                Live ATS Evaluation
              </span>
              <div className="space-y-4">
                <div className="flex justify-between items-baseline border-b border-gray-800 pb-4">
                  <span className="text-sm text-gray-400">ATS Match Score</span>
                  <span className="text-5xl font-black text-lime-400">92%</span>
                </div>
                <p className="text-xs text-gray-400">Indian Tech Salary Range (Target Role):</p>
                <p className="text-lg font-bold text-white">₹12 LPA - ₹35 LPA</p>
                <div className="bg-gray-800/80 p-4 rounded-xl border border-gray-700 text-xs text-gray-300">
                  <p className="font-bold text-lime-400 mb-1">AI Recommendation:</p>
                  <p className="italic">"Strong Java & Spring Boot competencies detected. Adding AWS and Redis caching keywords will guarantee passing TCS Prime and Google recruiter screens."</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- LOCALIZED FAQ ACCORDION --- */}
      <section className="py-20 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {t.faqsTitle}
            </h2>
          </div>

          <div className="space-y-4">
            {t.faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-6 text-left font-bold text-lg text-gray-900 flex justify-between items-center gap-4 hover:text-lime-600 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 shrink-0 ${openFaq === index ? 'rotate-180 text-lime-600' : ''}`} />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-100 pt-4 text-sm sm:text-base">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- INDIAN IT COMPANIES & TECH HUBS DIRECTORY --- */}
      <section className="bg-white py-16 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 space-y-10">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Building2 className="w-6 h-6 text-lime-600" /> Top Indian IT Employers & GCC Scanners
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {COMPANIES.map(company => (
                <Link
                  key={company.id}
                  to={`/scanner/software-engineer-at-${company.id}`}
                  className="p-3 bg-gray-50 hover:bg-lime-50 hover:border-lime-300 text-gray-700 hover:text-lime-800 text-xs font-semibold rounded-xl border border-gray-200 transition-all text-center block"
                >
                  {company.name} Scan
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Search className="w-5 h-5 text-lime-600" /> Campus Hiring & Regional Tech Hubs
            </h4>
            <div className="flex flex-wrap gap-3">
              {SPECIAL_NICHES.map(niche => (
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

      {/* --- FOOTER --- */}
      <footer className="bg-gray-900 text-gray-300 py-16 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
          
          <div className="md:col-span-2 space-y-4">
            <Link to={`/${lang}`} className="flex items-center gap-2 text-white text-2xl font-black tracking-tight">
              <div className="w-8 h-8 bg-lime-400 rounded-lg flex items-center justify-center text-gray-900">
                <Sparkles className="w-5 h-5" />
              </div>
              PandaLime Career
            </Link>
            <p className="text-gray-400 max-w-sm text-sm leading-relaxed">
              {t.footerAbout}
            </p>
            <div className="pt-2">
              <LanguageSelector variant="footer" />
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Legal & Policies</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/privacy-policy" className="hover:text-lime-400 transition-colors flex items-center gap-2"><ShieldCheck className="w-4 h-4"/> Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-lime-400 transition-colors flex items-center gap-2"><Briefcase className="w-4 h-4"/> Terms of Service</Link></li>
              <li><Link to="/contact" className="hover:text-lime-400 transition-colors flex items-center gap-2"><Mail className="w-4 h-4"/> Contact Support</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Languages & Directory</h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li><Link to="/" className="hover:text-white">English (Global & India)</Link></li>
              <li><Link to="/hi" className="hover:text-white">हिन्दी (Hindi)</Link></li>
              <li><Link to="/ta" className="hover:text-white">தமிழ் (Tamil)</Link></li>
              <li><Link to="/te" className="hover:text-white">తెలుగు (Telugu)</Link></li>
              <li><Link to="/kn" className="hover:text-white">ಕನ್ನಡ (Kannada)</Link></li>
              <li><Link to="/mr" className="hover:text-white">मराठी (Marathi)</Link></li>
              <li><Link to="/bn" className="hover:text-white">বাংলা (Bengali)</Link></li>
              <li><Link to="/sitemap" className="hover:text-white font-bold text-lime-400">Full Directory (All 100+ Scanners)</Link></li>
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

