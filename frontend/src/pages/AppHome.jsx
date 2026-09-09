import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ScanSearch, 
  Layers, 
  ArrowRight, 
  CheckCircle2,
  Sparkles,
  Zap
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import AppLayout from '../components/AppNavigation';
import { haptics } from '../utils/haptics';

export default function AppHome() {
  return (
    <AppLayout title="Career Tools" showBack={false}>
      <SEOHead 
        title="Career Tools — ATS Resume Scanner & Portfolio Builder"
        description="Scan your resume with AI and build your personal portfolio website in seconds."
        canonical="/app"
      />

      {/* Ultra-lightweight ambient lighting (0% CPU, static GPU layer) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-md h-48 bg-gradient-to-b from-lime-500/10 via-transparent to-transparent opacity-60" />
      </div>

      <div className="space-y-4 relative z-10 will-change-transform">
        
        {/* Welcome Header */}
        <div className="relative bg-gray-900 border border-gray-800 rounded-3xl p-5 sm:p-6 shadow-xl overflow-hidden transform-gpu">
          <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
            <Sparkles className="w-16 h-16 text-white" />
          </div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-lime-400 bg-lime-950/80 border border-lime-500/30 px-2 py-0.5 rounded-md">
              <Zap className="w-3 h-3 text-lime-400" />
              <span>Career Suite</span>
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Elevate Your Career
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1 leading-relaxed">
            Select a tool below to optimize your resume against hiring algorithms or publish an interactive portfolio website.
          </p>
        </div>

        {/* Feature 1: ATS Resume Scanner */}
        <div className="relative bg-gray-900 border border-gray-800 hover:border-lime-500/40 rounded-3xl p-5 sm:p-6 shadow-xl transition-colors duration-150 group overflow-hidden transform-gpu">
          {/* Top Row: Icon + Title */}
          <div className="flex items-center gap-3.5 mb-3.5 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-lime-500/15 border border-lime-500/30 flex items-center justify-center text-lime-400 shrink-0 shadow-md shadow-lime-500/10">
              <ScanSearch className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                ATS Resume Scanner
              </h2>
              <p className="text-[11px] font-semibold text-lime-400/90 mt-0.5 uppercase tracking-wider">
                Instant AI Match
              </p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-4 relative z-10">
            Upload your resume PDF and match it against any job description to discover missing keywords and improve your hiring score.
          </p>

          <div className="space-y-2 mb-5 relative z-10">
            {[
              "Instant 0–100 ATS match score",
              "Missing hard & soft skills analysis",
              "Google X-Y-Z formula bullet rewrites"
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2.5 bg-gray-950/70 rounded-xl p-2.5 border border-gray-800/80">
                <div className="bg-lime-500/20 rounded-full p-0.5 shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-gray-300">{feature}</span>
              </div>
            ))}
          </div>

          {/* Butter-Smooth Tactile Action Button */}
          <Link
            to="/app/scanner"
            onClick={() => haptics.heavy()}
            className="w-full py-3.5 px-4 bg-lime-500 hover:bg-lime-400 active:scale-[0.98] text-gray-950 font-black text-sm rounded-2xl shadow-lg shadow-lime-500/20 flex items-center justify-center gap-2 transition-all duration-100 ease-out cursor-pointer select-none touch-manipulation transform-gpu"
          >
            <span>Open Resume Scanner</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Feature 2: Portfolio Builder */}
        <div className="relative bg-gray-900 border border-gray-800 hover:border-cyan-500/40 rounded-3xl p-5 sm:p-6 shadow-xl transition-colors duration-150 group overflow-hidden transform-gpu">
          {/* Top Row: Icon + Title */}
          <div className="flex items-center gap-3.5 mb-3.5 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 shadow-md shadow-cyan-500/10">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                Portfolio Builder
              </h2>
              <p className="text-[11px] font-semibold text-cyan-400/90 mt-0.5 uppercase tracking-wider">
                1-Click Live Website
              </p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-4 relative z-10">
            Turn your skills, projects, and work experience into a published personal developer website in seconds.
          </p>

          <div className="space-y-2 mb-5 relative z-10">
            {[
              "Custom live public URL",
              "Interactive project showcase with demo links",
              "Multiple themes & 1-click resume download"
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2.5 bg-gray-950/70 rounded-xl p-2.5 border border-gray-800/80">
                <div className="bg-cyan-500/20 rounded-full p-0.5 shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-gray-300">{feature}</span>
              </div>
            ))}
          </div>

          {/* Butter-Smooth Tactile Action Button */}
          <Link
            to="/app/portfolio"
            onClick={() => haptics.heavy()}
            className="w-full py-3.5 px-4 bg-cyan-500 hover:bg-cyan-400 active:scale-[0.98] text-gray-950 font-black text-sm rounded-2xl shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all duration-100 ease-out cursor-pointer select-none touch-manipulation transform-gpu"
          >
            <span>Open Portfolio Builder</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </AppLayout>
  );
}
