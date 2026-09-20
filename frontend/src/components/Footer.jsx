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
    { title: "Model Context Protocol (MCP) AI Guide", slug: "model-context-protocol-mcp-ai-workflows-guide" },
    { title: "How to Beat ATS Bots in 2026", slug: "how-to-beat-applicant-tracking-systems-2026-guide" },
    { title: "Google X-Y-Z Resume Bullet Formula", slug: "google-xyz-formula-resume-bullet-points-examples" },
    { title: "Top ATS-Friendly Resume Formats", slug: "top-ats-friendly-resume-formats-templates" },
    { title: "Developer Portfolio Website Guide", slug: "developer-portfolio-guide-land-tech-interviews" },
    { title: "Indian Tech Fresher Resume Guide", slug: "indian-tech-fresher-ats-resume-guide-tcs-infosys-wipro" }
  ];

  return (
    <footer className="bg-[#08090C] text-[#9BA3AF] border-t border-[#1F242D] pt-14 pb-10 font-sans" aria-label="Site Footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-[#1F242D]">
          
          {/* Col 1: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Link 
              to="/" 
              className="flex items-center gap-2.5 text-[#F5F7FA] font-black text-2xl tracking-tight"
            >
              <div className="w-8 h-8 bg-[#D2FF00] rounded-[2px] flex items-center justify-center text-[#08090C] shadow-[0_0_10px_rgba(210,255,0,0.3)]">
                <Sparkles className="w-4 h-4 text-[#08090C]" />
              </div>
              <span>PandaLime</span>
            </Link>
            
            <p className="text-xs sm:text-sm text-[#9BA3AF] leading-relaxed max-w-sm">
              Empowering engineers, job seekers, and career changers worldwide with AI-powered ATS resume optimization, automated keyword gap analysis, and developer portfolio websites.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2 text-xs font-mono text-[#9BA3AF]">
              <span className="flex items-center gap-1.5 bg-[#0E1116] border border-[#1F242D] px-2.5 py-1 rounded-[2px]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D2FF00]" />
                <span>Zero-Data Resale Guarantee</span>
              </span>
              <span className="flex items-center gap-1.5 bg-[#0E1116] border border-[#1F242D] px-2.5 py-1 rounded-[2px]">
                <Lock className="w-3.5 h-3.5 text-[#FF5722]" />
                <span>256-Bit SSL Encrypted</span>
              </span>
            </div>
          </div>

          {/* Col 2: Core AI Tools */}
          <div className="space-y-3">
            <h3 className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#F5F7FA] flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5 text-[#D2FF00]" /> AI Tools Suite
            </h3>
            <ul className="space-y-2 font-mono text-xs">
              <li>
                <Link 
                  to="/dashboard" 
                  onMouseEnter={() => prefetchRoute('/dashboard')}
                  className="text-[#9BA3AF] hover:text-[#D2FF00] transition-colors flex items-center gap-1.5"
                >
                  <ScanLine className="w-3.5 h-3.5 text-[#D2FF00]" />
                  <span>ATS Resume Scanner</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/portfolio-builder" 
                  onMouseEnter={() => prefetchRoute('/portfolio-builder')}
                  className="text-[#9BA3AF] hover:text-[#FF5722] transition-colors flex items-center gap-1.5"
                >
                  <Globe className="w-3.5 h-3.5 text-[#FF5722]" />
                  <span>AI Portfolio Studio</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/tools/star-bullet-generator" 
                  onMouseEnter={() => prefetchRoute('/tools/star-bullet-generator')}
                  className="text-[#9BA3AF] hover:text-[#F5F7FA] transition-colors"
                >
                  STAR Bullet Generator
                </Link>
              </li>
              <li>
                <Link 
                  to="/tools/job-description-keyword-extractor" 
                  onMouseEnter={() => prefetchRoute('/tools/job-description-keyword-extractor')}
                  className="text-[#9BA3AF] hover:text-[#F5F7FA] transition-colors"
                >
                  JD Keyword Extractor
                </Link>
              </li>
              <li>
                <Link 
                  to="/tools/ats-action-verbs" 
                  onMouseEnter={() => prefetchRoute('/tools/ats-action-verbs')}
                  className="text-[#9BA3AF] hover:text-[#F5F7FA] transition-colors"
                >
                  250+ ATS Action Verbs
                </Link>
              </li>
              <li>
                <Link 
                  to="/roast-wall" 
                  onMouseEnter={() => prefetchRoute('/roast-wall')}
                  className="text-[#9BA3AF] hover:text-[#FF5722] transition-colors flex items-center gap-1.5"
                >
                  <Flame className="w-3.5 h-3.5 text-[#FF5722]" />
                  <span>Community Roast Wall</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Editorial Guides & Blog */}
          <div className="space-y-3">
            <h3 className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#F5F7FA] flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[#D2FF00]" /> Career Guides
            </h3>
            <ul className="space-y-2 font-mono text-xs">
              {topGuides.map(guide => (
                <li key={guide.slug}>
                  <Link 
                    to={`/blog/${guide.slug}`} 
                    onMouseEnter={() => prefetchRoute(`/blog/${guide.slug}`)}
                    className="text-[#9BA3AF] hover:text-[#F5F7FA] transition-colors line-clamp-1"
                  >
                    {guide.title}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link 
                  to="/blog" 
                  onMouseEnter={() => prefetchRoute('/blog')}
                  className="text-[#D2FF00] hover:underline font-bold text-xs flex items-center gap-1"
                >
                  <span>Explore All Guides</span>
                  <span>→</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Company & Legal */}
          <div className="space-y-3">
            <h3 className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#F5F7FA]">
              Company &amp; Legal
            </h3>
            <ul className="space-y-2 font-mono text-xs">
              <li>
                <Link 
                  to="/contact" 
                  onMouseEnter={() => prefetchRoute('/contact')}
                  className="text-[#9BA3AF] hover:text-[#F5F7FA] transition-colors flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-[#505763]" />
                  <span>Contact &amp; Support</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/privacy-policy" 
                  onMouseEnter={() => prefetchRoute('/privacy-policy')}
                  className="text-[#9BA3AF] hover:text-[#F5F7FA] transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  to="/terms" 
                  onMouseEnter={() => prefetchRoute('/terms')}
                  className="text-[#9BA3AF] hover:text-[#F5F7FA] transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link 
                  to="/sitemap" 
                  onMouseEnter={() => prefetchRoute('/sitemap')}
                  className="text-[#9BA3AF] hover:text-[#F5F7FA] transition-colors flex items-center gap-1.5"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#505763]" />
                  <span>HTML Sitemap &amp; Directory</span>
                </Link>
              </li>
              <li>
                <a 
                  href="https://www.trustpilot.com/review/pandalime.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#D2FF00] hover:underline font-medium transition-colors flex items-center gap-1"
                >
                  <span>Trustpilot Reviews</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Regional Languages Bar */}
        <div className="py-5 border-b border-[#1F242D] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#9BA3AF]">
            <Languages className="w-4 h-4 text-[#D2FF00]" />
            <span>PandaLime Regional Portals:</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {regionalLanguages.map(lang => (
              <Link
                key={lang.code}
                to={`/${lang.code}`}
                onMouseEnter={() => prefetchRoute(`/${lang.code}`)}
                className="px-2.5 py-1 bg-[#0E1116] hover:bg-[#151921] text-[#9BA3AF] hover:text-[#F5F7FA] rounded-[2px] font-mono text-xs border border-[#1F242D] hover:border-[#D2FF00] transition-colors"
              >
                {lang.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#505763] text-center sm:text-left">
          <p>© {currentYear} PandaLime Career Services. All rights reserved.</p>
          <p className="flex items-center justify-center gap-4">
            <span>ATS Core Engine v4.8</span>
            <span>•</span>
            <Link to="/contact" className="hover:text-[#9BA3AF]">Support: microapkdeveolper@gmail.com</Link>
          </p>
        </div>

      </div>
    </footer>
  );
}
