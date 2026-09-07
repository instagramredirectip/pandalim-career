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
    <header className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <nav 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5 flex justify-between items-center gap-2"
        aria-label="Main Navigation"
      >
        {/* Brand Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-2.5 text-gray-950 font-black text-xl sm:text-2xl tracking-tight shrink-0 rounded-lg"
          aria-label="PandaLime Home"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-lime-500 rounded-xl flex items-center justify-center text-gray-950 shadow-md shadow-lime-500/20 shrink-0">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <span>PandaLime</span>
        </Link>

        {/* Desktop Primary Navigation Links */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2">
          <Link
            to="/dashboard"
            onMouseEnter={() => prefetchRoute('/dashboard')}
            onTouchStart={() => prefetchRoute('/dashboard')}
            className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-bold transition-colors flex items-center gap-1.5 ${
              isActive('/dashboard') 
                ? 'bg-gray-100 text-gray-950' 
                : 'text-gray-600 hover:text-gray-950 hover:bg-gray-50'
            }`}
          >
            <ScanLine className="w-4 h-4 text-lime-600" />
            <span>Resume Scanner</span>
          </Link>

          <Link
            to="/portfolio-builder"
            onMouseEnter={() => prefetchRoute('/portfolio-builder')}
            onTouchStart={() => prefetchRoute('/portfolio-builder')}
            className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-bold transition-colors flex items-center gap-1.5 ${
              isActive('/portfolio-builder') || isActive('/p/')
                ? 'bg-emerald-100 text-emerald-900 font-extrabold' 
                : 'text-emerald-700 hover:text-emerald-800 bg-emerald-50/70 hover:bg-emerald-100/80 border border-emerald-200/80'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-emerald-600" />
            <span>AI Portfolio</span>
            <span className="text-[9px] bg-emerald-600 text-white font-extrabold px-1.5 py-0.2 rounded uppercase tracking-wider">New</span>
          </Link>

          <Link
            to="/tools"
            onMouseEnter={() => prefetchRoute('/tools')}
            onTouchStart={() => prefetchRoute('/tools')}
            className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-bold transition-colors flex items-center gap-1.5 ${
              isActive('/tools') 
                ? 'bg-gray-100 text-gray-950' 
                : 'text-gray-600 hover:text-gray-950 hover:bg-gray-50'
            }`}
          >
            <Wrench className="w-3.5 h-3.5 text-gray-500" />
            <span>Free Tools</span>
          </Link>

          <Link
            to="/blog"
            onMouseEnter={() => prefetchRoute('/blog')}
            onTouchStart={() => prefetchRoute('/blog')}
            className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-bold transition-colors flex items-center gap-1.5 ${
              isActive('/blog') 
                ? 'bg-gray-100 text-gray-950' 
                : 'text-gray-600 hover:text-gray-950 hover:bg-gray-50'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-gray-500" />
            <span>Guides & Blog</span>
          </Link>

          <Link
            to="/roast-wall"
            onMouseEnter={() => prefetchRoute('/roast-wall')}
            onTouchStart={() => prefetchRoute('/roast-wall')}
            className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-bold transition-colors flex items-center gap-1.5 ${
              isActive('/roast-wall') 
                ? 'bg-gray-100 text-gray-950' 
                : 'text-gray-600 hover:text-gray-950 hover:bg-gray-50'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-rose-500" />
            <span>Community Wall</span>
          </Link>
        </div>

        {/* Right Action Cluster */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {showLanguage && <LanguageSelector variant="nav" />}

          <Link
            to="/dashboard"
            onMouseEnter={() => prefetchRoute('/dashboard')}
            onTouchStart={() => prefetchRoute('/dashboard')}
            className="px-3.5 py-2 sm:px-4 sm:py-2 bg-lime-500 hover:bg-lime-600 active:scale-95 text-gray-950 rounded-xl font-black text-xs sm:text-sm shadow-md shadow-lime-500/20 transition-all hover:-translate-y-0.5 shrink-0 flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <ScanLine className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Scan Resume Free</span>
            <span className="sm:hidden">Scan Free</span>
          </Link>

          {/* Mobile Menu Trigger */}
          {onOpenMobileMenu && (
            <button
              onClick={onOpenMobileMenu}
              className="p-2 text-gray-700 hover:text-gray-900 rounded-xl hover:bg-gray-100 transition-colors lg:hidden flex items-center justify-center shrink-0 border border-gray-200 cursor-pointer"
              aria-label="Open mobile navigation menu"
            >
              <Menu className="w-5 h-5 text-gray-800" />
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}

