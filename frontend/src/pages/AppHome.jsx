import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ScanSearch, 
  Layers, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  ShieldCheck, 
  Globe,
  FileText
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import AppLayout from '../components/AppNavigation';

export default function AppHome() {
  return (
    <AppLayout title="App Home" showBack={false}>
      <SEOHead 
        title="PandaLime Mobile App — ATS Scanner & AI Portfolio"
        description="Mobile edition of PandaLime Career Suite for Android. Scan your resume with AI and build your personal portfolio website in seconds."
        canonical="/app"
      />

      <div className="space-y-4">
        
        {/* Welcome App Banner */}
        <div className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 border border-gray-800 rounded-2xl p-4 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-28 h-28 bg-lime-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-lime-400">
              PandaLime Android Edition
            </span>
          </div>
          <h1 className="text-xl font-black text-white tracking-tight leading-snug">
            Your AI Career Companion
          </h1>
          <p className="text-xs text-gray-300 mt-1 leading-relaxed">
            Select a tool below to analyze your resume against hiring algorithms or publish a live portfolio website.
          </p>
        </div>

        {/* Feature 1: ATS Resume Scanner */}
        <div className="bg-gray-900 border border-lime-500/30 rounded-2xl p-4 sm:p-5 shadow-lg relative overflow-hidden transition-all duration-200 active:scale-[0.99] group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-lime-500/10 rounded-full blur-2xl pointer-events-none -translate-y-1/3 translate-x-1/3" />
          
          <div className="flex items-start justify-between gap-3 mb-3 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-lime-500/15 border border-lime-500/40 flex items-center justify-center text-lime-400 shadow-md shadow-lime-500/10 shrink-0">
                <ScanSearch className="w-6 h-6" />
              </div>
              <div>
                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-lime-500/20 text-lime-300 border border-lime-500/30 mb-1">
                  Instant AI Review
                </span>
                <h2 className="text-base font-extrabold text-white tracking-tight">
                  ATS Resume Scanner
                </h2>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-300 leading-relaxed mb-3.5 relative z-10">
            Upload your resume PDF and match it against any job description to discover missing keywords and improve your hiring score.
          </p>

          <div className="space-y-1.5 mb-4 relative z-10 bg-gray-950/60 rounded-xl p-2.5 border border-gray-800/80">
            <div className="flex items-center gap-2 text-xs text-gray-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-lime-400 shrink-0" />
              <span>Instant 0–100 ATS match score</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-lime-400 shrink-0" />
              <span>Missing hard & soft skills list</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-lime-400 shrink-0" />
              <span>Google X-Y-Z formula bullet rewrites</span>
            </div>
          </div>

          <Link
            to="/app/scanner"
            className="w-full py-3 px-4 bg-lime-500 hover:bg-lime-400 active:scale-95 text-gray-950 font-black text-xs sm:text-sm rounded-xl shadow-lg shadow-lime-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer relative z-10"
          >
            <span>Open Resume Scanner</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Feature 2: AI Portfolio Builder */}
        <div className="bg-gray-900 border border-cyan-500/30 rounded-2xl p-4 sm:p-5 shadow-lg relative overflow-hidden transition-all duration-200 active:scale-[0.99] group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none -translate-y-1/3 translate-x-1/3" />
          
          <div className="flex items-start justify-between gap-3 mb-3 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-cyan-500/15 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-md shadow-cyan-500/10 shrink-0">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 mb-1">
                  1-Click Live Website
                </span>
                <h2 className="text-base font-extrabold text-white tracking-tight">
                  AI Portfolio Builder
                </h2>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-300 leading-relaxed mb-3.5 relative z-10">
            Turn your skills, projects, and work experience into a sleek, published personal developer website in seconds.
          </p>

          <div className="space-y-1.5 mb-4 relative z-10 bg-gray-950/60 rounded-xl p-2.5 border border-gray-800/80">
            <div className="flex items-center gap-2 text-xs text-gray-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>Live custom URL (<code>pandalime.com/p/name</code>)</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>Interactive project showcase with demo links</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>5 modern themes & 1-click resume download</span>
            </div>
          </div>

          <Link
            to="/app/portfolio"
            className="w-full py-3 px-4 bg-cyan-500 hover:bg-cyan-400 active:scale-95 text-gray-950 font-black text-xs sm:text-sm rounded-xl shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer relative z-10"
          >
            <span>Launch Portfolio Builder</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Security & System Info Pill */}
        <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-3 flex items-center justify-between text-[11px] text-gray-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-lime-400 shrink-0" />
            <span>100% Free • No Sign-Up Needed</span>
          </div>
          <div className="flex items-center gap-1 text-gray-400 font-mono text-[10px]">
            <Zap className="w-3 h-3 text-amber-400" />
            <span>Gemini AI</span>
          </div>
        </div>

      </div>
    </AppLayout>
  );
}
