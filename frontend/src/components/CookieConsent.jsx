import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cookie, ShieldCheck, X } from 'lucide-react';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already set their preference
    const consent = localStorage.getItem('pandalime_cookie_consent');
    if (!consent) {
      // Small delay to prevent layout flash on initial load
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, []);

  const updateGoogleConsent = (granted) => {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        analytics_storage: granted ? 'granted' : 'denied',
        ad_storage: granted ? 'granted' : 'denied',
        ad_user_data: granted ? 'granted' : 'denied',
        ad_personalization: granted ? 'granted' : 'denied'
      });
    }
  };

  const handleAcceptAll = () => {
    localStorage.setItem('pandalime_cookie_consent', 'all');
    updateGoogleConsent(true);
    setIsVisible(false);
  };

  const handleEssentialOnly = () => {
    localStorage.setItem('pandalime_cookie_consent', 'essential');
    updateGoogleConsent(false);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside 
      role="region"
      aria-label="Cookie consent banner"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 bg-gray-900/95 backdrop-blur-md text-white p-5 rounded-2xl border border-gray-800 shadow-2xl shadow-black/50 transition-all duration-300"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-lime-500/10 border border-lime-500/30 flex items-center justify-center text-lime-400 shrink-0">
            <Cookie className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-100 flex items-center gap-1.5">
              <span>Privacy & Cookie Choices</span>
              <ShieldCheck className="w-3.5 h-3.5 text-lime-400" />
            </h4>
          </div>
        </div>

        <button 
          onClick={handleEssentialOnly}
          className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-gray-800 transition-colors"
          aria-label="Dismiss cookie notice with essential only"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <p className="text-xs text-gray-300 leading-relaxed mb-4">
        We use essential local storage to save your resume reports and portfolio drafts. We also use analytics cookies to measure site speed and improve AI match accuracy.{' '}
        <Link 
          to="/privacy-policy" 
          className="text-lime-400 hover:underline font-semibold"
        >
          Privacy Policy
        </Link>
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-2">
        <button
          onClick={handleAcceptAll}
          className="w-full sm:flex-1 py-2.5 px-4 bg-lime-500 hover:bg-lime-400 active:scale-95 text-gray-950 font-extrabold text-xs rounded-xl shadow-md shadow-lime-500/20 transition-all text-center cursor-pointer"
        >
          Accept All
        </button>

        <button
          onClick={handleEssentialOnly}
          className="w-full sm:flex-1 py-2.5 px-4 bg-gray-800 hover:bg-gray-700 active:scale-95 text-gray-200 font-bold text-xs rounded-xl border border-gray-700 transition-all text-center cursor-pointer"
        >
          Essential Only
        </button>
      </div>
    </aside>
  );
}
