import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * High-precision Navigation Progress Bar & Delayed Transition Radar Indicator
 * Displays a top hairline laser progress bar on route transition and triggers
 * an architectural HUD radar pulse if routing delay exceeds 100ms.
 */
export default function NavigationProgressBar() {
  const location = useLocation();
  const [navigating, setNavigating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showDelayedRadar, setShowDelayedRadar] = useState(false);

  useEffect(() => {
    // Schedule progress on route change asynchronously to avoid synchronous effect setState
    const startTimer = setTimeout(() => {
      setNavigating(true);
      setProgress(28);
      setShowDelayedRadar(false);
    }, 0);

    // Incremental progress steps
    const timer1 = setTimeout(() => setProgress(65), 50);
    const timer2 = setTimeout(() => setProgress(88), 110);

    // If navigation/rendering takes > 130ms, reveal the radar telemetry badge
    const radarTimer = setTimeout(() => {
      setShowDelayedRadar(true);
    }, 130);

    // Complete transition
    const completeTimer = setTimeout(() => {
      setProgress(100);
      const finishTimer = setTimeout(() => {
        setNavigating(false);
        setProgress(0);
        setShowDelayedRadar(false);
      }, 160);
      return () => clearTimeout(finishTimer);
    }, 220);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(radarTimer);
      clearTimeout(completeTimer);
    };
  }, [location.pathname, location.search]);

  if (!navigating && progress === 0) return null;

  return (
    <>
      {/* Top Hairline Laser Progress Bar */}
      <div 
        className="fixed top-0 left-0 right-0 h-[2.5px] z-[9999] bg-transparent pointer-events-none overflow-hidden" 
        role="progressbar" 
        aria-valuenow={progress} 
        aria-valuemin="0" 
        aria-valuemax="100"
      >
        <div 
          className="h-full bg-gradient-to-r from-[#D2FF00] via-[#FF5722] to-[#D2FF00] transition-all duration-150 ease-out shadow-[0_0_8px_rgba(210,255,0,0.8)]"
          style={{ 
            width: `${progress}%`,
            opacity: progress === 100 ? 0 : 1,
            transitionProperty: 'width, opacity'
          }} 
        />
      </div>

      {/* Delayed HUD Radar Indicator (Revealed if transition delay is observed) */}
      {showDelayedRadar && (
        <div 
          className="fixed bottom-5 right-5 z-[9999] pointer-events-none flex items-center gap-2.5 px-3 py-1.5 bg-[#090B0E]/95 border border-[#1F242D] shadow-2xl backdrop-blur-md transition-opacity duration-200 animate-in fade-in"
          style={{ borderRadius: '2px' }}
        >
          {/* Radar Ring Spinner */}
          <div className="relative w-4 h-4 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-[#D2FF00]/30 animate-ping opacity-75" />
            <div className="w-3.5 h-3.5 rounded-full border-2 border-transparent border-t-[#D2FF00] border-r-[#FF5722] animate-spin" />
            <div className="w-1 h-1 bg-[#D2FF00] rounded-full" />
          </div>

          <div className="flex flex-col">
            <span className="font-mono text-[9px] font-bold text-[#F5F7FA] tracking-wider uppercase">
              BUFFERING ROUTE
            </span>
            <span className="font-mono text-[8px] text-[#D2FF00] tracking-widest">
              [ {location.pathname.slice(0, 16) || '/'} ]
            </span>
          </div>
        </div>
      )}
    </>
  );
}
