import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  X, 
  Sparkles, 
  ScanLine, 
  Globe, 
  FileText, 
  Layers, 
  Flame, 
  Search, 
  ChevronRight, 
  MapPin, 
  Languages, 
  BookOpen 
} from 'lucide-react';
import { prefetchRoute } from '../utils/prefetch';

export default function MobileDrawer({ isOpen, onClose }) {
  const location = useLocation();

  // Close drawer on route change
  useEffect(() => {
    onClose();
  }, [location.pathname, onClose]);

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
      title: "ATS Resume Scanner",
      desc: "Decompile & score resume against enterprise JDs",
      path: "/dashboard",
      icon: <ScanLine className="w-4 h-4 text-[#D2FF00]" />,
      badge: "FLAGSHIP"
    },
    {
      title: "AI Portfolio Studio",
      desc: "Build & host developer website at /p/:username",
      path: "/portfolio-builder",
      icon: <Globe className="w-4 h-4 text-[#FF5722]" />,
      badge: "5 THEMES"
    },
    {
      title: "JD Keyword Extractor",
      desc: "Instant NLP parser for missing tech stack tokens",
      path: "/tools/job-description-keyword-extractor",
      icon: <Search className="w-4 h-4 text-[#D2FF00]" />
    },
    {
      title: "STAR Bullet Generator",
      desc: "Google X-Y-Z formula quantified accomplishments",
      path: "/tools/star-bullet-generator",
      icon: <Sparkles className="w-4 h-4 text-amber-400" />
    },
    {
      title: "250+ ATS Action Verbs",
      desc: "High-contrast action verb taxonomy",
      path: "/tools/ats-action-verbs",
      icon: <FileText className="w-4 h-4 text-[#FF5722]" />
    }
  ];

  const communityLinks = [
    {
      title: "Career Guides & Blog",
      path: "/blog",
      icon: <BookOpen className="w-3.5 h-3.5 text-[#D2FF00]" />
    },
    {
      title: "Community Roast Wall",
      path: "/roast-wall",
      icon: <Flame className="w-3.5 h-3.5 text-[#FF5722]" />
    },
    {
      title: "Free Tools Hub",
      path: "/tools",
      icon: <Layers className="w-3.5 h-3.5 text-[#9BA3AF]" />
    },
    {
      title: "HTML Sitemap",
      path: "/sitemap",
      icon: <MapPin className="w-3.5 h-3.5 text-[#505763]" />
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop overlay */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-out Sidebar Panel */}
      <aside className="relative w-full max-w-xs sm:max-w-sm bg-[#0E1116] border-l border-[#1F242D] text-[#E1E2E9] flex flex-col justify-between h-full shadow-2xl z-10 overflow-y-auto">
        
        {/* Top Header */}
        <div className="p-4 border-b border-[#1F242D] flex items-center justify-between sticky top-0 bg-[#0E1116]/95 backdrop-blur-md z-10">
          <Link to="/" onClick={onClose} className="flex items-center gap-2 text-[#F5F7FA] font-black text-lg tracking-tight">
            <div className="w-7 h-7 bg-[#D2FF00] rounded-[2px] flex items-center justify-center text-[#08090C] font-bold">
              <Sparkles className="w-4 h-4 text-[#08090C]" />
            </div>
            <span>PandaLime</span>
          </Link>

          <button
            onClick={onClose}
            className="p-1.5 text-[#9BA3AF] hover:text-[#F5F7FA] rounded-[2px] bg-[#151921] border border-[#1F242D] transition-colors"
            aria-label="Close navigation menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Navigation Body */}
        <div className="p-4 space-y-6 flex-1 font-mono">
          
          {/* Core Tools Section */}
          <div className="space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#505763] px-1">
              // CORE DIAGNOSTIC TOOLS
            </p>
            <div className="space-y-1.5">
              {coreTools.map((tool) => (
                <Link
                  key={tool.path}
                  to={tool.path}
                  onMouseEnter={() => prefetchRoute(tool.path)}
                  onTouchStart={() => prefetchRoute(tool.path)}
                  onClick={onClose}
                  className="flex items-start gap-2.5 p-2.5 rounded-[2px] bg-[#08090C] hover:bg-[#151921] border border-[#1F242D] hover:border-[#D2FF00] transition-all group"
                >
                  <div className="p-1.5 rounded-[2px] bg-[#151921] border border-[#1F242D] shrink-0 mt-0.5">
                    {tool.icon}
                  </div>
                  <div className="flex-1 min-w-0 font-sans">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-xs font-bold text-[#F5F7FA] group-hover:text-[#D2FF00] transition-colors">
                        {tool.title}
                      </span>
                      {tool.badge && (
                        <span className="text-[8px] font-mono font-bold px-1.5 py-0.2 rounded-[2px] bg-[#D2FF00]/10 text-[#D2FF00] border border-[#D2FF00]/30 shrink-0">
                          {tool.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#9BA3AF] leading-snug mt-0.5 line-clamp-2">
                      {tool.desc}
                    </p>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-[#505763] group-hover:text-[#D2FF00] transition-all shrink-0 mt-1.5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Community & Directory Section */}
          <div className="space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#505763] px-1">
              // RESOURCES &amp; DIRECTORY
            </p>
            <div className="space-y-1">
              {communityLinks.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onMouseEnter={() => prefetchRoute(item.path)}
                  onTouchStart={() => prefetchRoute(item.path)}
                  onClick={onClose}
                  className="flex items-center justify-between p-2 rounded-[2px] bg-[#08090C] hover:bg-[#151921] border border-[#1F242D] text-[#9BA3AF] hover:text-[#F5F7FA] transition-colors font-sans text-xs"
                >
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <span className="font-semibold">{item.title}</span>
                  </div>
                  <ChevronRight className="w-3 h-3 text-[#505763]" />
                </Link>
              ))}
            </div>
          </div>

          {/* Indian Regional Languages */}
          <div className="pt-2 border-t border-[#1F242D] space-y-2">
            <div className="flex items-center justify-between px-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#505763] flex items-center gap-1 font-mono">
                <Languages className="w-3 h-3 text-[#D2FF00]" /> REGIONAL EDITIONS
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1">
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
                  onMouseEnter={() => prefetchRoute(`/${lang.code}`)}
                  onTouchStart={() => prefetchRoute(`/${lang.code}`)}
                  onClick={onClose}
                  className="px-2 py-1 bg-[#08090C] hover:bg-[#151921] border border-[#1F242D] hover:border-[#D2FF00] rounded-[2px] text-[11px] font-medium text-[#9BA3AF] hover:text-[#F5F7FA] transition-colors text-center"
                >
                  {lang.label}
                </Link>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Drawer Actions */}
        <div className="p-4 border-t border-[#1F242D] bg-[#08090C] space-y-2 sticky bottom-0">
          <Link
            to="/dashboard"
            onMouseEnter={() => prefetchRoute('/dashboard')}
            onTouchStart={() => prefetchRoute('/dashboard')}
            onClick={onClose}
            className="w-full py-2.5 bg-[#D2FF00] hover:bg-[#E5FF66] text-[#08090C] font-mono font-bold text-xs uppercase tracking-wider rounded-[2px] flex items-center justify-center gap-2 shadow-[0_0_12px_rgba(210,255,0,0.3)] transition-all"
          >
            <ScanLine className="w-4 h-4" />
            <span>DEPLOY RESUME SCAN</span>
          </Link>
          
          <Link
            to="/portfolio-builder"
            onMouseEnter={() => prefetchRoute('/portfolio-builder')}
            onTouchStart={() => prefetchRoute('/portfolio-builder')}
            onClick={onClose}
            className="w-full py-2 bg-[#0E1116] hover:bg-[#151921] text-[#FF5722] border border-[#FF5722]/40 rounded-[2px] font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
          >
            <Globe className="w-4 h-4" />
            <span>BUILD PORTFOLIO</span>
          </Link>
        </div>

      </aside>
    </div>
  );
}
