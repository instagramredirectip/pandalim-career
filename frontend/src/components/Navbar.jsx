import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Sparkles, 
  ScanLine, 
  Globe, 
  Menu, 
  BookOpen, 
  Wrench, 
  Flame
} from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import { prefetchRoute } from '../utils/prefetch';

export default function Navbar({ onOpenMobileMenu, showLanguage = true }) {
  const location = useLocation();
  const path = location.pathname;

  const isActive = (target) => {
    if (target === '/') return path === '/';
    return path.startsWith(target);
  };

  return (
    <header className="bg-[#090B0E]/95 backdrop-blur-md border-b border-[#1F242D] sticky top-0 z-50">
      <nav 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex justify-between items-center gap-2"
        aria-label="Main Navigation"
      >
        {/* Brand Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-2.5 text-[#F5F7FA] font-black text-xl sm:text-2xl tracking-tight shrink-0 rounded-[2px]"
          aria-label="PandaLime Home"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-[#D2FF00] rounded-[2px] flex items-center justify-center text-[#08090C] shadow-[0_0_12px_rgba(210,255,0,0.3)] shrink-0 font-bold">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#08090C]" />
          </div>
          <span className="font-sans font-black tracking-tight text-[#F5F7FA]">PandaLime</span>
        </Link>

        {/* Desktop Primary Navigation Links */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-1.5">
          <Link
            to="/dashboard"
            onMouseEnter={() => prefetchRoute('/dashboard')}
            onTouchStart={() => prefetchRoute('/dashboard')}
            className={`px-3 py-1.5 rounded-[2px] text-xs xl:text-xs font-mono font-bold transition-all flex items-center gap-1.5 border ${
              isActive('/dashboard') 
                ? 'bg-[#151921] text-[#D2FF00] border-[#D2FF00]/40' 
                : 'text-[#9BA3AF] hover:text-[#F5F7FA] hover:bg-[#0E1116] border-transparent hover:border-[#1F242D]'
            }`}
          >
            <ScanLine className="w-3.5 h-3.5 text-[#D2FF00]" />
            <span>RESUME SCANNER</span>
          </Link>

          <Link
            to="/portfolio-builder"
            onMouseEnter={() => prefetchRoute('/portfolio-builder')}
            onTouchStart={() => prefetchRoute('/portfolio-builder')}
            className={`px-3 py-1.5 rounded-[2px] text-xs xl:text-xs font-mono font-bold transition-all flex items-center gap-1.5 border ${
              isActive('/portfolio-builder') || isActive('/p/')
                ? 'bg-[#151921] text-[#FF5722] border-[#FF5722]/40' 
                : 'text-[#9BA3AF] hover:text-[#FF5722] hover:bg-[#0E1116] border-transparent hover:border-[#1F242D]'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-[#FF5722]" />
            <span>AI PORTFOLIO</span>
            <span className="text-[8px] bg-[#FF5722]/20 text-[#FF5722] font-mono font-bold px-1 py-0.2 rounded-[2px] border border-[#FF5722]/40 uppercase tracking-wider">NEW</span>
          </Link>

          <Link
            to="/tools"
            onMouseEnter={() => prefetchRoute('/tools')}
            onTouchStart={() => prefetchRoute('/tools')}
            className={`px-3 py-1.5 rounded-[2px] text-xs xl:text-xs font-mono font-bold transition-all flex items-center gap-1.5 border ${
              isActive('/tools') 
                ? 'bg-[#151921] text-[#D2FF00] border-[#D2FF00]/40' 
                : 'text-[#9BA3AF] hover:text-[#F5F7FA] hover:bg-[#0E1116] border-transparent hover:border-[#1F242D]'
            }`}
          >
            <Wrench className="w-3.5 h-3.5 text-[#9BA3AF]" />
            <span>TOOL SUITE</span>
          </Link>

          <Link
            to="/blog"
            onMouseEnter={() => prefetchRoute('/blog')}
            onTouchStart={() => prefetchRoute('/blog')}
            className={`px-3 py-1.5 rounded-[2px] text-xs xl:text-xs font-mono font-bold transition-all flex items-center gap-1.5 border ${
              isActive('/blog') 
                ? 'bg-[#151921] text-[#D2FF00] border-[#D2FF00]/40' 
                : 'text-[#9BA3AF] hover:text-[#F5F7FA] hover:bg-[#0E1116] border-transparent hover:border-[#1F242D]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-[#9BA3AF]" />
            <span>GUIDES</span>
          </Link>

          <Link
            to="/roast-wall"
            onMouseEnter={() => prefetchRoute('/roast-wall')}
            onTouchStart={() => prefetchRoute('/roast-wall')}
            className={`px-3 py-1.5 rounded-[2px] text-xs xl:text-xs font-mono font-bold transition-all flex items-center gap-1.5 border ${
              isActive('/roast-wall') 
                ? 'bg-[#151921] text-[#FF5722] border-[#FF5722]/40' 
                : 'text-[#9BA3AF] hover:text-[#FF5722] hover:bg-[#0E1116] border-transparent hover:border-[#1F242D]'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-[#FF5722]" />
            <span>ROAST WALL</span>
          </Link>
        </div>

        {/* Right Action Cluster */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {showLanguage && <LanguageSelector variant="nav" />}

          <Link
            to="/dashboard"
            onMouseEnter={() => prefetchRoute('/dashboard')}
            onTouchStart={() => prefetchRoute('/dashboard')}
            className="px-3.5 py-1.5 sm:px-4 sm:py-2 bg-[#D2FF00] hover:bg-[#E5FF66] active:scale-95 text-[#08090C] rounded-[2px] font-mono font-bold text-xs sm:text-xs shadow-[0_0_12px_rgba(210,255,0,0.3)] transition-all shrink-0 flex items-center gap-1.5 cursor-pointer whitespace-nowrap uppercase tracking-wider"
          >
            <ScanLine className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#08090C]" />
            <span className="hidden sm:inline">DEPLOY SCAN</span>
            <span className="sm:hidden">SCAN</span>
          </Link>

          {/* Mobile Menu Trigger */}
          {onOpenMobileMenu && (
            <button
              onClick={onOpenMobileMenu}
              className="p-1.5 text-[#9BA3AF] hover:text-[#F5F7FA] rounded-[2px] bg-[#0E1116] hover:bg-[#151921] transition-colors lg:hidden flex items-center justify-center shrink-0 border border-[#1F242D] cursor-pointer"
              aria-label="Open mobile navigation menu"
            >
              <Menu className="w-5 h-5 text-[#F5F7FA]" />
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
