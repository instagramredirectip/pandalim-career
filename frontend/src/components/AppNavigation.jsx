import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  ScanSearch, 
  ChevronLeft, 
  Layers
} from 'lucide-react';
import { haptics } from '../utils/haptics';

/**
 * Top App Header Bar for Android WebView
 */
export function AppHeader({ title = "Career Tools", showBack = false, rightAction = null }) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-gray-950 border-b border-gray-800/90 px-4 py-3 select-none transform-gpu">
      <div className="max-w-md mx-auto flex items-center justify-between gap-3">
        
        {/* Left: Back button or Title */}
        <div className="flex items-center gap-2.5">
          {showBack ? (
            <button
              onClick={() => {
                haptics.light();
                navigate('/app');
              }}
              className="w-8 h-8 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-300 hover:text-white active:scale-90 transition-transform duration-75 cursor-pointer touch-manipulation"
              aria-label="Back to Home"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          ) : (
            <Link 
              to="/app" 
              onClick={() => haptics.selection()}
              className="flex items-center gap-2 text-white font-bold text-base tracking-tight active:scale-95 transition-transform duration-75 touch-manipulation"
            >
              <div className="w-7 h-7 bg-lime-500/20 border border-lime-500/30 rounded-lg flex items-center justify-center text-lime-400">
                <Layers className="w-4 h-4" />
              </div>
              <span className="text-sm font-bold text-gray-100">Career Tools</span>
            </Link>
          )}

          {showBack && (
            <span className="text-sm font-bold text-gray-100 leading-tight truncate max-w-[200px]">{title}</span>
          )}
        </div>

        {/* Right Action */}
        <div className="flex items-center gap-2">
          {rightAction}
        </div>

      </div>
    </header>
  );
}

/**
 * Bottom Navigation Bar for Android WebView
 */
export function AppBottomNav() {
  const location = useLocation();
  const path = location.pathname;

  const isHome = path === '/app' || path === '/app/home';
  const isScanner = path.startsWith('/app/scanner') || path.startsWith('/dashboard');
  const isPortfolio = path.startsWith('/app/portfolio') || path.startsWith('/portfolio-builder');

  return (
    <nav 
      aria-label="App Navigation"
      className="fixed bottom-0 left-0 right-0 z-50 bg-gray-950 border-t border-gray-800/90 px-2 py-2 select-none safe-bottom transform-gpu"
    >
      <div className="max-w-md mx-auto grid grid-cols-3 gap-1">
        
        {/* Tab 1: Home */}
        <Link
          to="/app"
          onClick={() => haptics.selection()}
          className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-transform duration-75 active:scale-95 touch-manipulation ${
            isHome 
              ? 'bg-lime-500/15 text-lime-400 font-extrabold' 
              : 'text-gray-400 hover:text-gray-200 font-medium'
          }`}
        >
          <Home className={`w-5 h-5 mb-0.5 ${isHome ? 'text-lime-400 stroke-[2.5]' : 'text-gray-400'}`} />
          <span className="text-[11px] tracking-tight">Home</span>
        </Link>

        {/* Tab 2: ATS Scanner */}
        <Link
          to="/app/scanner"
          onClick={() => haptics.selection()}
          className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-transform duration-75 active:scale-95 touch-manipulation ${
            isScanner 
              ? 'bg-lime-500/15 text-lime-400 font-extrabold' 
              : 'text-gray-400 hover:text-gray-200 font-medium'
          }`}
        >
          <ScanSearch className={`w-5 h-5 mb-0.5 ${isScanner ? 'text-lime-400 stroke-[2.5]' : 'text-gray-400'}`} />
          <span className="text-[11px] tracking-tight">ATS Scanner</span>
        </Link>

        {/* Tab 3: Portfolio */}
        <Link
          to="/app/portfolio"
          onClick={() => haptics.selection()}
          className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-transform duration-75 active:scale-95 touch-manipulation ${
            isPortfolio 
              ? 'bg-cyan-500/15 text-cyan-400 font-extrabold' 
              : 'text-gray-400 hover:text-gray-200 font-medium'
          }`}
        >
          <Layers className={`w-5 h-5 mb-0.5 ${isPortfolio ? 'text-cyan-400 stroke-[2.5]' : 'text-gray-400'}`} />
          <span className="text-[11px] tracking-tight">Portfolio</span>
        </Link>

      </div>
    </nav>
  );
}

export default function AppLayout({ children, title, showBack = false, rightAction = null }) {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans flex flex-col pb-20 selection:bg-lime-500 selection:text-gray-950">
      <AppHeader title={title} showBack={showBack} rightAction={rightAction} />
      <main className="flex-1 max-w-md mx-auto w-full px-4 py-4">
        {children}
      </main>
      <AppBottomNav />
    </div>
  );
}
