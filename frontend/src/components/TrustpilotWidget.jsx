import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Star, X, ChevronDown, ChevronUp, ExternalLink, MessageSquareHeart } from 'lucide-react';

const TRUSTPILOT_REVIEW_URL = 'https://www.trustpilot.com/review/pandalime.com';
const DISMISS_KEY = 'pandalime_tp_dismissed_at';
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

// Authentic Trustpilot 5-point star logo
function TrustpilotStar({ size = 18, className = "" }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
    >
      <path 
        d="M12 2L14.7 8.2L21.5 8.9L16.4 13.5L17.9 20.2L12 16.8L6.1 20.2L7.6 13.5L2.5 8.9L9.3 8.2L12 2Z" 
        fill="#00B67A" 
      />
      <path 
        d="M17.9 20.2L12 16.8V2L14.7 8.2L21.5 8.9L16.4 13.5L17.9 20.2Z" 
        fill="#005128" 
        opacity="0.3"
      />
      <path 
        d="M14.7 8.2L12 2L9.3 8.2H14.7Z" 
        fill="#005128" 
        opacity="0.2"
      />
    </svg>
  );
}

// 5 Mini Review Stars
function RatingStars({ hoveredStar, setHoveredStar, onSelect }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((starIndex) => {
        const isFilled = hoveredStar ? starIndex <= hoveredStar : true;
        return (
          <button
            key={starIndex}
            type="button"
            onMouseEnter={() => setHoveredStar(starIndex)}
            onMouseLeave={() => setHoveredStar(0)}
            onClick={() => onSelect(starIndex)}
            aria-label={`Rate ${starIndex} stars on Trustpilot`}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-[#00b67a] flex items-center justify-center text-white transition-all transform hover:scale-110 active:scale-95 shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#00b67a]/40"
          >
            <Star 
              className={`w-4 h-4 fill-white text-white transition-transform ${
                isFilled ? 'scale-100 opacity-100' : 'scale-90 opacity-60'
              }`} 
            />
          </button>
        );
      })}
    </div>
  );
}

export default function TrustpilotWidget() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [hoveredStar, setHoveredStar] = useState(0);
  const location = useLocation();

  useEffect(() => {
    // Do not show on personal portfolio showcase pages to keep user portfolios clean
    if (location.pathname.startsWith('/p/') || location.pathname.startsWith('/portfolio/')) {
      setIsVisible(false);
      return;
    }

    // Check 7-day dismissal status
    try {
      const dismissedAt = localStorage.getItem(DISMISS_KEY);
      if (dismissedAt && (Date.now() - parseInt(dismissedAt, 10)) < SEVEN_DAYS_MS) {
        return;
      }
    } catch (e) {}

    // Smooth reveal after 2.8s delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2800);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  const handleDismiss = () => {
    setIsVisible(false);
    try {
      localStorage.setItem(DISMISS_KEY, Date.now().toString());
    } catch (e) {}
  };

  const handleOpenReview = (starCount = 5) => {
    window.open(TRUSTPILOT_REVIEW_URL, '_blank', 'noopener,noreferrer');
  };

  if (!isVisible) return null;

  return (
    <aside
      role="complementary"
      aria-label="Trustpilot review widget"
      className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 max-w-[calc(100vw-2rem)] sm:max-w-xs font-sans select-none transition-all duration-500 ease-out animate-in fade-in slide-in-from-bottom-6"
    >
      {isExpanded ? (
        /* EXPANDED SMART CARD */
        <div className="bg-gray-950/95 backdrop-blur-xl text-white rounded-2xl sm:rounded-3xl border border-gray-800/90 shadow-2xl shadow-black/60 p-4 sm:p-5 relative overflow-hidden transition-all duration-300">
          
          {/* Subtle Trustpilot Green Glow Background Accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#00b67a]/15 rounded-full blur-2xl pointer-events-none -translate-y-1/2 translate-x-1/2" />

          {/* Card Header */}
          <div className="flex items-center justify-between gap-2 mb-3 relative z-10">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#00b67a]/10 border border-[#00b67a]/30 flex items-center justify-center">
                <TrustpilotStar size={16} />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs sm:text-sm font-black tracking-tight text-white">Trustpilot</span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-[#00b67a]/20 text-[#00b67a] border border-[#00b67a]/30">
                  Verified
                </span>
              </div>
            </div>

            {/* Controls (Minimize & Close) */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsExpanded(false)}
                className="p-1 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800/80 transition-colors"
                title="Minimize widget"
                aria-label="Minimize Trustpilot widget"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
              <button
                onClick={handleDismiss}
                className="p-1 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800/80 transition-colors"
                title="Dismiss for 7 days"
                aria-label="Dismiss Trustpilot widget"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="relative z-10 mb-3.5">
            <h4 className="text-sm font-extrabold text-gray-100 flex items-center gap-1.5 mb-1">
              <span>Rate us on Trustpilot</span>
              <MessageSquareHeart className="w-3.5 h-3.5 text-[#00b67a]" />
            </h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              How was your experience scanning your resume or building your portfolio?
            </p>
          </div>

          {/* Interactive 5-Star Rating Buttons */}
          <div className="relative z-10 mb-4 bg-gray-900/80 rounded-xl p-2.5 border border-gray-800/80 flex flex-col items-center gap-1.5">
            <RatingStars 
              hoveredStar={hoveredStar} 
              setHoveredStar={setHoveredStar} 
              onSelect={handleOpenReview} 
            />
            <span className="text-[11px] font-medium text-gray-400">
              {hoveredStar > 0 
                ? `${hoveredStar} / 5 Stars — Click to review` 
                : 'Click a star to review PandaLime'
              }
            </span>
          </div>

          {/* Direct Review CTA Button */}
          <a
            href={TRUSTPILOT_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-3 bg-[#00b67a] hover:bg-[#009e6a] active:scale-[0.98] text-white font-extrabold text-xs rounded-xl shadow-lg shadow-[#00b67a]/25 flex items-center justify-center gap-1.5 transition-all text-center cursor-pointer group"
          >
            <span>Write a Review on Trustpilot</span>
            <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      ) : (
        /* MINIMIZED SLEEK FLOATING PILL */
        <div className="flex items-center gap-1 bg-gray-950/95 backdrop-blur-md text-white rounded-full border border-gray-800/90 shadow-xl shadow-black/50 p-1.5 pr-3 transition-all duration-300 hover:border-[#00b67a]/50 hover:shadow-[#00b67a]/20 group">
          <button
            onClick={() => setIsExpanded(true)}
            className="flex items-center gap-2 text-left cursor-pointer focus:outline-none"
            aria-label="Expand Trustpilot review widget"
          >
            <div className="w-7 h-7 rounded-full bg-[#00b67a] flex items-center justify-center text-white shadow-xs">
              <TrustpilotStar size={14} />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-gray-200 group-hover:text-white flex items-center gap-1">
                Rate us on Trustpilot
                <span className="w-1.5 h-1.5 rounded-full bg-[#00b67a] animate-pulse" />
              </span>
              <span className="text-[9px] text-[#00b67a] font-semibold">★ ★ ★ ★ ★ 4.9</span>
            </div>
          </button>

          <button
            onClick={() => setIsExpanded(true)}
            className="ml-1 p-1 text-gray-400 hover:text-white rounded-full hover:bg-gray-800 transition-colors"
            title="Expand widget"
            aria-label="Expand widget"
          >
            <ChevronUp className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleDismiss}
            className="p-1 text-gray-400 hover:text-white rounded-full hover:bg-gray-800 transition-colors"
            title="Close widget"
            aria-label="Close widget"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </aside>
  );
}
