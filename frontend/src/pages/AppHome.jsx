import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ScanSearch, 
  Layers, 
  ArrowRight, 
  CheckCircle2
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import AppLayout from '../components/AppNavigation';

export default function AppHome() {
  return (
    <AppLayout title="Career Tools" showBack={false}>
      <SEOHead 
        title="Career Tools — ATS Resume Scanner & Portfolio Builder"
        description="Scan your resume with AI and build your personal portfolio website in seconds."
        canonical="/app"
      />

      <div className="space-y-3.5">
        
        {/* Welcome Header */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 shadow-sm">
          <h1 className="text-lg font-bold text-white tracking-tight">
            Career Tools
          </h1>
          <p className="text-xs text-gray-400 mt-1 leading-relaxed">
            Select a tool below to scan your resume against job requirements or create a portfolio website.
          </p>
        </div>

        {/* Feature 1: ATS Resume Scanner */}
        <div className="bg-gray-900 border border-gray-800 hover:border-lime-500/40 rounded-2xl p-4 sm:p-5 shadow-sm transition-all duration-200 group">
          <div className="flex items-center gap-3 mb-2.5">
            <div className="w-10 h-10 rounded-xl bg-lime-500/15 border border-lime-500/30 flex items-center justify-center text-lime-400 shrink-0">
              <ScanSearch className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                ATS Resume Scanner
              </h2>
            </div>
          </div>

          <p className="text-xs text-gray-400 leading-relaxed mb-3">
            Upload your resume PDF and match it against any job description to discover missing keywords and improve your hiring score.
          </p>

          <div className="space-y-1.5 mb-3.5 bg-gray-950/70 rounded-xl p-2.5 border border-gray-800/80">
            <div className="flex items-center gap-2 text-xs text-gray-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-lime-400 shrink-0" />
              <span>Instant 0–100 ATS match score</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-lime-400 shrink-0" />
              <span>Missing hard & soft skills analysis</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-lime-400 shrink-0" />
              <span>Google X-Y-Z formula bullet rewrites</span>
            </div>
          </div>

          <Link
            to="/app/scanner"
            className="w-full py-2.5 px-4 bg-lime-500 hover:bg-lime-400 active:scale-95 text-gray-950 font-bold text-xs sm:text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>Open Resume Scanner</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Feature 2: Portfolio Builder */}
        <div className="bg-gray-900 border border-gray-800 hover:border-cyan-500/40 rounded-2xl p-4 sm:p-5 shadow-sm transition-all duration-200 group">
          <div className="flex items-center gap-3 mb-2.5">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                Portfolio Builder
              </h2>
            </div>
          </div>

          <p className="text-xs text-gray-400 leading-relaxed mb-3">
            Turn your skills, projects, and work experience into a published personal website in seconds.
          </p>

          <div className="space-y-1.5 mb-3.5 bg-gray-950/70 rounded-xl p-2.5 border border-gray-800/80">
            <div className="flex items-center gap-2 text-xs text-gray-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>Custom live public link</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>Interactive project showcase with demo links</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>Multiple themes & 1-click resume download</span>
            </div>
          </div>

          <Link
            to="/app/portfolio"
            className="w-full py-2.5 px-4 bg-cyan-500 hover:bg-cyan-400 active:scale-95 text-gray-950 font-bold text-xs sm:text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>Open Portfolio Builder</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </AppLayout>
  );
}
