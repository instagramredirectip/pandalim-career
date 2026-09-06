import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  X, 
  Sparkles, 
  ScanLine, 
  Globe, 
  FileText, 
  Zap, 
  Layers, 
  Flame, 
  Search, 
  ChevronRight, 
  ArrowRight,
  MapPin,
  Languages
} from 'lucide-react';
import LanguageSelector from './LanguageSelector';

export default function MobileDrawer({ isOpen, onClose }) {
  const location = useLocation();

  // Close drawer on route change
  useEffect(() => {
    onClose();
  }, [location.pathname]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const coreTools = [
    {
      title: "AI ATS Resume Scanner",
      desc: "Scan & optimize resume against job descriptions",
      path: "/dashboard",
      icon: <ScanLine className="w-5 h-5 text-lime-500" />,
      badge: "Flagship Free"
    },
    {
      title: "AI Portfolio Studio",
      desc: "Build & host your personal website on pandalime.com/p/:slug",
      path: "/portfolio-builder",
      icon: <Globe className="w-5 h-5 text-emerald-400" />,
      badge: "New • 5 Themes"
    },
    {
      title: "JD Keyword Extractor",
      desc: "Instant NLP parser for missing skills and tools",
      path: "/tools/job-description-keyword-extractor",
      icon: <Search className="w-5 h-5 text-cyan-400" />
    },
    {
      title: "STAR Bullet Generator",
      desc: "Google X-Y-Z formula quantified accomplishments",
      path: "/tools/star-bullet-generator",
      icon: <Sparkles className="w-5 h-5 text-amber-400" />
    },
    {
      title: "250+ ATS Action Verbs",
      desc: "Recruiter-approved power verb dictionary",
      path: "/tools/ats-action-verbs",
      icon: <FileText className="w-5 h-5 text-purple-400" />
    }
  ];

  const communityLinks = [
    {
      title: "Community Roast Wall",
      desc: "Live public resume reviews and critiques",
      path: "/roast-wall",
      icon: <Flame className="w-4 h-4 text-rose-400" />
    },
    {
      title: "Free Tools Directory Hub",
      desc: "Browse all free career utility apps",
      path: "/tools",
      icon: <Layers className="w-4 h-4 text-lime-400" />
    },
    {
      title: "HTML Sitemap & Careers",
      desc: "Full programmatic SEO index of 200+ roles",
      path: "/sitemap",
      icon: <MapPin className="w-4 h-4 text-gray-400" />
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop overlay */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-out Sidebar Panel */}
      <aside className="relative w-full max-w-xs sm:max-w-sm bg-gray-900 border-l border-gray-800 text-gray-100 flex flex-col justify-between h-full shadow-2xl z-10 overflow-y-auto">
        
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-gray-800 flex items-center justify-between sticky top-0 bg-gray-900/95 backdrop-blur-md z-10">
          <Link to="/" onClick={onClose} className="flex items-center gap-2 text-white font-black text-lg tracking-tight">
            <div className="w-8 h-8 bg-lime-500 rounded-xl flex items-center justify-center text-gray-950 shadow-md shadow-lime-500/20">
              <Sparkles className="w-4 h-4" />
            </div>
            <span>PandaLime</span>
          </Link>

          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white rounded-xl hover:bg-gray-800 transition-colors"
            aria-label="Close navigation menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Navigation Body */}
        <div className="p-4 sm:p-5 space-y-6 flex-1">
          
          {/* Core Tools Section */}
          <div className="space-y-2">
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400 px-1">
              Core AI Career Features
            </p>
            <div className="space-y-1.5">
              {coreTools.map((tool) => (
                <Link
                  key={tool.path}
                  to={tool.path}
                  onClick={onClose}
                  className="flex items-start gap-3 p-3 rounded-2xl bg-gray-950/60 hover:bg-gray-800 border border-gray-800/80 hover:border-lime-500/40 transition-all group"
                >
                  <div className="p-2 rounded-xl bg-gray-900 border border-gray-800 shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                    {tool.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-xs font-bold text-gray-100 group-hover:text-lime-400 transition-colors">
                        {tool.title}
                      </span>
                      {tool.badge && (
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-md bg-lime-950 text-lime-400 border border-lime-500/30 shrink-0">
                          {tool.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-gray-400 leading-snug mt-0.5 line-clamp-2">
                      {tool.desc}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-lime-400 group-hover:translate-x-0.5 transition-all shrink-0 mt-2" />
                </Link>
              ))}
            </div>
          </div>

          {/* Community & Directory Section */}
          <div className="space-y-2">
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400 px-1">
              Explore & Resources
            </p>
            <div className="space-y-1">
              {communityLinks.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-gray-800 text-gray-300 hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    {item.icon}
                    <span className="text-xs font-semibold">{item.title}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
                </Link>
              ))}
            </div>
          </div>

          {/* Indian Regional Languages */}
          <div className="pt-2 border-t border-gray-800 space-y-2">
            <div className="flex items-center justify-between px-1">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400 flex items-center gap-1">
                <Languages className="w-3 h-3 text-lime-400" /> Regional Languages
              </span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { code: 'hi', label: 'हिन्दी' },
                { code: 'ta', label: 'தமிழ்' },
                { code: 'te', label: 'తెలుగు' },
                { code: 'kn', label: 'ಕನ್ನಡ' },
                { code: 'mr', label: 'मराठी' },
                { code: 'bn', label: 'বাংলা' }
              ].map(lang => (
                <Link
                  key={lang.code}
                  to={`/${lang.code}`}
                  onClick={onClose}
                  className="px-3 py-2 bg-gray-950/70 hover:bg-gray-800 border border-gray-800 hover:border-gray-700 rounded-xl text-xs font-medium text-gray-300 hover:text-white transition-colors text-center"
                >
                  {lang.label}
                </Link>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Drawer Actions */}
        <div className="p-4 sm:p-5 border-t border-gray-800 bg-gray-950/90 space-y-2 sticky bottom-0">
          <Link
            to="/dashboard"
            onClick={onClose}
            className="w-full py-3 bg-lime-500 hover:bg-lime-400 text-gray-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-lime-500/20 transition-all"
          >
            <ScanLine className="w-4 h-4" />
            <span>Scan Resume Free</span>
          </Link>
          
          <Link
            to="/portfolio-builder"
            onClick={onClose}
            className="w-full py-2.5 bg-gray-900 hover:bg-gray-800 text-lime-400 border border-lime-500/30 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all"
          >
            <Globe className="w-4 h-4" />
            <span>Create AI Portfolio</span>
          </Link>
        </div>

      </aside>
    </div>
  );
}
