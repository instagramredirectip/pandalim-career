import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  Check, 
  Briefcase, 
  Code2, 
  ExternalLink, 
  Download, 
  Github, 
  Layers, 
  Eye, 
  Trophy,
  ChevronDown
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WebGLLiquidCanvas from '../components/portfolio/WebGLLiquidCanvas';
import ThemePreviewCard from '../components/portfolio/ThemePreviewCard';
import { asmrAudio } from '../utils/asmrAudio';
import { haptics } from '../utils/haptics';

export default function PortfolioHome() {
  const [activePersona, setActivePersona] = useState('recruiter'); // 'recruiter' | 'developer'
  const [openFaq, setOpenFaq] = useState(null);

  const themes = [
    {
      id: 'soundwaves',
      name: 'Sound Waves',
      vibe: 'Acid Pop & Liquid Motion',
      color: 'from-[#FF2DAB] via-[#FF5722] to-[#D4FF3F]',
      badge: '⚡ Flagship Acid Vibe',
      desc: 'Equalizer visualizer, spinning vinyl project sleeves, and liquid SVG ribbons in Hot Pink and Neon Lime.',
      demoSlug: 'alex-secops'
    },
    {
      id: 'binge',
      name: 'The Binge Series',
      vibe: 'Netflix-Style Streaming',
      color: 'from-red-600 via-rose-500 to-amber-500',
      badge: '🔥 Viral Student Pick',
      desc: 'Interactive "Who\'s watching?" profile gate, billboard hero, episode cards with progress bars, and screenplay layout.',
      demoSlug: 'sarah-dev'
    },
    {
      id: 'doors',
      name: 'Behind The Doors',
      vibe: 'Architectural 3D Exhibition',
      color: 'from-emerald-500 via-teal-400 to-amber-200',
      badge: '✨ 3D Doors & Timeline',
      desc: 'Spiral 3D flip-book card on warm paper, 4 interactive 3D doors that swing open on hover, and an animated year scrubber.',
      demoSlug: 'maya-ai'
    },
    {
      id: 'bento',
      name: 'MacOS Bento Workspace',
      vibe: 'Apple & Linear Speed-Run',
      color: 'from-blue-600 via-cyan-400 to-indigo-500',
      badge: '💎 Recruiter Favorite',
      desc: 'Dark glass bento grid with macOS window controls, GitHub commit heatmap, interactive dock, and live terminal.',
      demoSlug: 'devon-cloud'
    },
    {
      id: 'arcade99',
      name: 'Arcade 99',
      vibe: 'Retro RPG & Quests',
      color: 'from-purple-600 via-pink-500 to-yellow-400',
      badge: '🎮 Gaming & Quests',
      desc: 'Character select screen with HP/Mana bars, stats radar, projects as quest bounties with loot drops, and inventory skills.',
      demoSlug: 'rohan-fresher'
    }
  ];

  const placementWall = [
    { name: 'Arjun Mehta', role: 'SWE Intern', company: 'Google', college: 'IIT Bombay', slug: 'sarah-dev', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80', package: '₹48 LPA' },
    { name: 'Priya Sharma', role: 'Security Analyst', company: 'Microsoft', college: 'BITS Pilani', slug: 'alex-secops', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80', package: '₹44 LPA' },
    { name: 'Rohan Gupta', role: 'Frontend Engineer', company: 'Razorpay', college: 'IIIT Hyderabad', slug: 'rohan-fresher', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80', package: '₹32 LPA' },
    { name: 'Sneha Patel', role: 'AI / ML Engineer', company: 'Swiggy', college: 'DTU Delhi', slug: 'maya-ai', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80', package: '₹28 LPA' },
    { name: 'Karthik Rao', role: 'DevOps Specialist', company: 'Atlassian', college: 'NIT Surathkal', slug: 'devon-cloud', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80', package: '₹38 LPA' }
  ];

  const faqs = [
    {
      q: 'How long does it take to create a portfolio?',
      a: 'Under 60 seconds! Just upload your resume PDF and we automatically organize your projects, skills, education, and links into an interactive site.'
    },
    {
      q: 'Are the portfolios ATS-friendly and recruiter-tested?',
      a: 'Yes. Every portfolio includes a dedicated Recruiter View with an instant one-click PDF download, verified skill tags, and key achievement metrics.'
    },
    {
      q: 'Can I change my theme or vibe later?',
      a: 'Anytime in one click. All your information, projects, and work history stay intact regardless of which visual theme you choose.'
    },
    {
      q: 'Is hosting really 100% free forever?',
      a: 'Yes. Your custom site lives forever at pandalime.com/p/yourname with SSL, blazing fast speed, and zero hosting fees.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white font-sans selection:bg-[#D4FF3F] selection:text-black antialiased relative overflow-x-hidden">
      <SEOHead
        title="Student Portfolios That Recruiters Remember | PandaLime"
        description="Turn your resume into an interactive, viral portfolio in 60 seconds. Featuring Netflix-style binge themes, 3D doors, and macOS bento layouts built for campus placements."
        canonical="/portfolios"
      />

      {/* Main Global Navbar */}
      <Navbar />

      {/* Real 60fps WebGL Liquid Ribbon Canvas Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
        <WebGLLiquidCanvas />
      </div>

      {/* HERO SECTION */}
      <section className="relative z-10 pt-16 sm:pt-28 pb-16 sm:pb-24 px-4 sm:px-8 max-w-6xl mx-auto text-center space-y-8">
        
        {/* Viral Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#141414]/90 backdrop-blur-md border border-[#262626] text-xs font-mono shadow-xl"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#D4FF3F] animate-ping inline-block" />
          <span className="text-[#FF2DAB] font-bold">#1 FOR CAMPUS PLACEMENTS</span>
          <span className="text-zinc-600">•</span>
          <span className="text-zinc-300">Free & Hosted at pandalime.com/p/yourname</span>
        </motion.div>

        {/* Kinetic Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-7xl lg:text-8xl font-black text-white tracking-tight uppercase leading-[0.95] max-w-5xl mx-auto"
        >
          Turn Your Resume <br className="hidden sm:inline" />
          Into A <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2DAB] via-pink-400 to-[#D4FF3F]">Showstopper.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-zinc-400 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed"
        >
          No coding. No boring templates. Upload your resume and get an interactive, 
          animated site recruiters actually remember.
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-2"
        >
          <Link
            to="/portfolio-builder"
            onClick={() => {
              haptics.heavy();
              asmrAudio.playClick();
            }}
            className="px-8 py-4 rounded-full bg-[#D4FF3F] hover:bg-[#c2ee2d] text-[#0B0B0B] font-black text-base transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(212,255,63,0.35)] flex items-center gap-2 group cursor-pointer"
          >
            <span>Build Mine in 60 Seconds</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <a
            href="#themes"
            onClick={() => {
              haptics.light();
              asmrAudio.playPop();
            }}
            className="px-6 py-4 rounded-full bg-[#141414]/90 hover:bg-[#1a1a1a] text-white font-bold text-base border border-[#262626] hover:border-[#FF2DAB] transition-colors flex items-center gap-2 cursor-pointer shadow-xl backdrop-blur-md"
          >
            <Eye className="w-4 h-4 text-[#FF2DAB]" />
            <span>Explore Live Themes</span>
          </a>
        </motion.div>

        {/* Feature Pills */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-400 font-mono">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-[#D4FF3F]" />
            <span>1-Click PDF Resume Import</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-[#D4FF3F]" />
            <span>Free pandalime.com/p/yourname URL</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-[#D4FF3F]" />
            <span>Recruiter vs Developer View Mode</span>
          </div>
        </div>
      </section>

      {/* RECRUITER VS DEVELOPER MODE COMPARISON STRIP */}
      <section className="relative z-10 px-4 sm:px-8 py-12 max-w-5xl mx-auto">
        <div className="bg-[#141414]/95 backdrop-blur-xl border border-[#262626] rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#262626] pb-6">
            <div>
              <div className="text-xs font-mono uppercase text-[#D4FF3F] font-bold">
                DUAL PERSONALITY ENGINE
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
                One Link. Two Tailored Views.
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                A single portfolio that seamlessly adapts for busy recruiters vs technical interviewers.
              </p>
            </div>

            {/* Persona Switcher Toggle */}
            <div className="inline-flex p-1 rounded-full bg-[#0B0B0B] border border-[#262626] self-start sm:self-auto shadow-inner">
              <button
                onClick={() => {
                  asmrAudio.playSwitch();
                  haptics.selection();
                  setActivePersona('recruiter');
                }}
                className={`px-4 py-2 rounded-full text-xs font-bold font-mono transition-all flex items-center gap-2 cursor-pointer ${
                  activePersona === 'recruiter'
                    ? 'bg-[#D4FF3F] text-black shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>Recruiter View</span>
              </button>

              <button
                onClick={() => {
                  asmrAudio.playSwitch();
                  haptics.selection();
                  setActivePersona('developer');
                }}
                className={`px-4 py-2 rounded-full text-xs font-bold font-mono transition-all flex items-center gap-2 cursor-pointer ${
                  activePersona === 'developer'
                    ? 'bg-[#FF2DAB] text-white shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Developer View</span>
              </button>
            </div>
          </div>

          {/* Interactive Persona Comparison Card */}
          <AnimatePresence mode="wait">
            {activePersona === 'recruiter' ? (
              <motion.div
                key="recruiter"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                <div className="p-5 rounded-2xl bg-[#1a1a1a] border border-[#2c2c2c] space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                    <Download className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-white">Instant 1-Click Resume</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Zero friction for hiring managers. Your exact ATS-friendly resume PDF downloads with one tap.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#1a1a1a] border border-[#2c2c2c] space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                    <Trophy className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-white">High-Impact Metrics</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Highlights your CGPA, hackathon awards, latency reductions, and verified accomplishments upfront.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#1a1a1a] border border-[#2c2c2c] space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                    <Check className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-white">Verified Tech Stack</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Clear categorization of your frameworks and languages so talent recruiters can verify skills in 5 seconds.
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="developer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                <div className="p-5 rounded-2xl bg-[#1a1a1a] border border-[#2c2c2c] space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-[#FF2DAB]/20 text-[#FF2DAB] flex items-center justify-center font-bold">
                    <Github className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-white">Live GitHub Repos</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Direct access to your real code repositories, commit activity graphs, and pull requests.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#1a1a1a] border border-[#2c2c2c] space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-[#FF2DAB]/20 text-[#FF2DAB] flex items-center justify-center font-bold">
                    <Layers className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-white">System Architecture</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Showcases database choices, API design, Docker setups, and caching solutions with clarity.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#1a1a1a] border border-[#2c2c2c] space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-[#FF2DAB]/20 text-[#FF2DAB] flex items-center justify-center font-bold">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-white">Interactive Live Demos</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Engineers can test your actual web applications and sandboxes straight from the browser.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* 5-CARD VISUAL BENTO GRID SHOWCASING THEMES */}
      <section id="themes" className="relative z-10 px-4 sm:px-8 py-16 max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <div className="text-xs font-mono uppercase text-[#FF2DAB] font-bold">
            UNRIVALED AESTHETICS
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Five Flagship Themes. <br className="hidden sm:inline" /> Zero Boring Templates.
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto">
            Switch between vibes in one click without losing your projects, skills, or timeline.
          </p>
        </div>

        {/* Bento Grid with Live Animated Theme Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {themes.map((th) => (
            <ThemePreviewCard
              key={th.id}
              theme={th}
              showActions={true}
            />
          ))}
        </div>
      </section>

      {/* CAMPUS PLACEMENT WALL OF FAME (MARQUEE) */}
      <section className="relative z-10 py-16 bg-[#0E0E12] border-y border-[#262626] overflow-hidden space-y-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono uppercase text-[#D4FF3F] font-bold">
              WALL OF FAME
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Placed Students Sharing Their PandaLime Links
            </h2>
          </div>
          <span className="text-xs text-zinc-400 font-mono">
            Over 14,000+ Students Hosted This Season
          </span>
        </div>

        {/* Marquee Track */}
        <div className="overflow-hidden relative w-full py-4">
          <div className="flex gap-4 animate-marquee hover:[animation-play-state:paused]">
            {[...placementWall, ...placementWall].map((student, idx) => (
              <div
                key={idx}
                className="w-80 shrink-0 bg-[#141414] border border-[#262626] rounded-2xl p-4 flex items-center gap-3 shadow-xl"
              >
                <img
                  src={student.avatar}
                  alt={student.name}
                  className="w-12 h-12 rounded-full object-cover border border-[#262626] shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white truncate">{student.name}</h4>
                    <span className="text-[10px] font-mono text-[#D4FF3F] font-bold">{student.package}</span>
                  </div>
                  <p className="text-xs text-zinc-400 truncate">
                    Placed at <strong className="text-[#FF2DAB]">{student.company}</strong>
                  </p>
                  <p className="text-[10px] text-zinc-500 font-mono truncate">
                    {student.college}
                  </p>
                </div>
                <Link
                  to={`/p/${student.slug}`}
                  className="p-2 rounded-lg bg-[#1f1f1f] text-zinc-400 hover:text-white shrink-0"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ ACCORDION SECTION */}
      <section className="relative z-10 px-4 sm:px-8 py-20 max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <div className="text-xs font-mono uppercase text-[#D4FF3F] font-bold">
            COMMON QUESTIONS
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
            Everything You Need To Know
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div 
              key={idx}
              className="bg-[#141414] border border-[#262626] rounded-2xl overflow-hidden transition-colors hover:border-zinc-600"
            >
              <button
                onClick={() => {
                  asmrAudio.playPop();
                  setOpenFaq(openFaq === idx ? null : idx);
                }}
                className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
              >
                <span className="text-sm sm:text-base font-bold text-white">{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-[#D4FF3F] transition-transform duration-200 shrink-0 ${openFaq === idx ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openFaq === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 pt-0 text-xs sm:text-sm text-zinc-400 leading-relaxed border-t border-[#1f1f1f]">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* BOTTOM VIRAL CTA */}
      <section className="relative z-10 px-4 sm:px-8 py-20 max-w-4xl mx-auto text-center space-y-6">
        <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight uppercase leading-none">
          Ready to be the candidate <br />
          <span className="text-[#D4FF3F]">nobody forgets?</span>
        </h2>
        <p className="text-zinc-400 text-base sm:text-lg max-w-xl mx-auto">
          Takes under 60 seconds. 100% free forever on PandaLime.
        </p>
        <div className="pt-2">
          <Link
            to="/portfolio-builder"
            onClick={() => {
              haptics.heavy();
              asmrAudio.playClick();
            }}
            className="inline-flex px-10 py-5 rounded-full bg-[#D4FF3F] hover:bg-[#c2ee2d] text-black font-black text-lg transition-transform hover:scale-105 shadow-[0_0_30px_rgba(212,255,63,0.4)] items-center gap-2"
          >
            <span>Create My Portfolio Now</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
