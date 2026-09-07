import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ScanLine, 
  Globe, 
  BookOpen, 
  Wrench, 
  Flame, 
  ShieldCheck, 
  Mail, 
  MapPin, 
  Lock,
  ExternalLink,
  Languages
} from 'lucide-react';
import { prefetchRoute } from '../utils/prefetch';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const regionalLanguages = [
    { code: 'hi', label: 'हिन्दी' },
    { code: 'ta', label: 'தமிழ்' },
    { code: 'te', label: 'తెలుగు' },
    { code: 'kn', label: 'ಕನ್ನಡ' },
    { code: 'mr', label: 'मराठी' },
    { code: 'bn', label: 'বাংলা' }
  ];

  const topGuides = [
    { title: "How to Beat ATS Bots in 2026", slug: "how-to-beat-applicant-tracking-systems-2026-guide" },
    { title: "Google X-Y-Z Resume Bullet Formula", slug: "google-xyz-formula-resume-bullet-points-examples" },
    { title: "Top ATS-Friendly Resume Formats", slug: "top-ats-friendly-resume-formats-templates" },
    { title: "Developer Portfolio Website Guide", slug: "developer-portfolio-guide-land-tech-interviews" },
    { title: "Indian Tech Fresher Resume Guide", slug: "indian-tech-fresher-ats-resume-guide-tcs-infosys-wipro" }
  ];

  return (
    <footer className="bg-gray-950 text-gray-300 border-t border-gray-800 pt-16 pb-12 font-sans" aria-label="Site Footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-gray-800">
          
          {/* Col 1: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Link 
              to="/" 
              className="flex items-center gap-2.5 text-white font-black text-2xl tracking-tight"
            >
              <div className="w-9 h-9 bg-lime-500 rounded-xl flex items-center justify-center text-gray-950 shadow-md shadow-lime-500/20">
                <Sparkles className="w-5 h-5" />
              </div>
              <span>PandaLime</span>
            </Link>
            
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              Empowering engineers, job seekers, and career changers worldwide with AI-powered ATS resume optimization, automated keyword gap analysis, and developer portfolio websites.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-gray-400">
              <span className="flex items-center gap-1.5 bg-gray-900 border border-gray-800 px-3 py-1.5 rounded-lg">
                <ShieldCheck className="w-4 h-4 text-lime-400" />
                <span>Zero-Data Resale Guarantee</span>
              </span>
              <span className="flex items-center gap-1.5 bg-gray-900 border border-gray-800 px-3 py-1.5 rounded-lg">
                <Lock className="w-4 h-4 text-emerald-400" />
                <span>256-Bit SSL Encrypted</span>
              </span>
            </div>
          </div>

          {/* Col 2: Core AI Tools */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-white flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5 text-lime-400" /> AI Career Tools
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  to="/dashboard" 
                  onMouseEnter={() => prefetchRoute('/dashboard')}
                  className="text-gray-400 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <ScanLine className="w-3.5 h-3.5 text-lime-500" />
                  <span>ATS Resume Scanner</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/portfolio-builder" 
                  onMouseEnter={() => prefetchRoute('/portfolio-builder')}
                  className="text-gray-400 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Globe className="w-3.5 h-3.5 text-emerald-400" />
                  <span>AI Portfolio Studio</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/tools/star-bullet-generator" 
                  onMouseEnter={() => prefetchRoute('/tools/star-bullet-generator')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  STAR Bullet Generator
                </Link>
              </li>
              <li>
                <Link 
                  to="/tools/job-description-keyword-extractor" 
                  onMouseEnter={() => prefetchRoute('/tools/job-description-keyword-extractor')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  JD Keyword Extractor
                </Link>
              </li>
              <li>
                <Link 
                  to="/tools/ats-action-verbs" 
                  onMouseEnter={() => prefetchRoute('/tools/ats-action-verbs')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  250+ ATS Action Verbs
                </Link>
              </li>
              <li>
                <Link 
                  to="/roast-wall" 
                  onMouseEnter={() => prefetchRoute('/roast-wall')}
                  className="text-gray-400 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Flame className="w-3.5 h-3.5 text-rose-400" />
                  <span>Community Roast Wall</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Editorial Guides & Blog */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-white flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" /> Career Guides & Blog
            </h3>
            <ul className="space-y-2 text-sm">
              {topGuides.map(guide => (
                <li key={guide.slug}>
                  <Link 
                    to={`/blog/${guide.slug}`} 
                    onMouseEnter={() => prefetchRoute(`/blog/${guide.slug}`)}
                    className="text-gray-400 hover:text-white transition-colors line-clamp-1"
                  >
                    {guide.title}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link 
                  to="/blog" 
                  onMouseEnter={() => prefetchRoute('/blog')}
                  className="text-lime-400 hover:text-lime-300 font-bold text-xs flex items-center gap-1"
                >
                  <span>Explore All 12 Guides</span>
                  <span>→</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Company & Legal */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-white">
              Company & Legal
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  to="/contact" 
                  onMouseEnter={() => prefetchRoute('/contact')}
                  className="text-gray-400 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-gray-500" />
                  <span>Contact & Support</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/privacy-policy" 
                  onMouseEnter={() => prefetchRoute('/privacy-policy')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  to="/terms" 
                  onMouseEnter={() => prefetchRoute('/terms')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link 
                  to="/sitemap" 
                  onMouseEnter={() => prefetchRoute('/sitemap')}
                  className="text-gray-400 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <MapPin className="w-3.5 h-3.5 text-gray-500" />
                  <span>HTML Sitemap & Directory</span>
                </Link>
              </li>
              <li>
                <a 
                  href="https://www.trustpilot.com/review/pandalime.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors flex items-center gap-1"
                >
                  <span>Trustpilot Reviews</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Regional Languages Bar */}
        <div className="py-6 border-b border-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
            <Languages className="w-4 h-4 text-lime-400" />
            <span>PandaLime in Regional Languages:</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {regionalLanguages.map(lang => (
              <Link
                key={lang.code}
                to={`/${lang.code}`}
                onMouseEnter={() => prefetchRoute(`/${lang.code}`)}
                className="px-2.5 py-1 bg-gray-900 hover:bg-gray-800 text-gray-300 hover:text-white rounded-lg text-xs border border-gray-800 hover:border-gray-700 transition-colors"
              >
                {lang.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400 text-center sm:text-left">
          <p>© {currentYear} PandaLime Career Services. All rights reserved.</p>
          <p className="flex items-center justify-center gap-4">
            <span>ATS Calibration & Verification Engine v3.2</span>
            <span>•</span>
            <Link to="/contact" className="hover:text-gray-300">Support: microapkdeveolper@gmail.com</Link>
          </p>
        </div>

      </div>
    </footer>
  );
}
