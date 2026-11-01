import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  Pause, 
  Disc, 
  Volume2, 
  ExternalLink, 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  Download, 
  Sparkles, 
  Radio, 
  Zap, 
  Award, 
  MapPin, 
  Share2,
  Check
} from 'lucide-react';
import { sanitizeUrl } from '../../utils/sanitize';
import { asmrAudio } from '../../utils/asmrAudio';
import { haptics } from '../../utils/haptics';

export default function SoundWavesTheme({ portfolio }) {
  const p = portfolio || {};
  const [isPlaying, setIsPlaying] = useState(true);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const togglePlayback = () => {
    asmrAudio.playSwitch();
    haptics.selection();
    setIsPlaying(!isPlaying);
  };

  const handleCopyEmail = () => {
    asmrAudio.playPop();
    haptics.light();
    if (p.contactEmail) {
      navigator.clipboard.writeText(p.contactEmail);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 3000);
    }
  };

  const skillCategories = Object.entries(p.skills || {});
  const projects = p.projects || [];

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white font-sans selection:bg-[#FF2DAB] selection:text-white pb-28 relative overflow-x-hidden">
      {/* Background Animated SVG Liquid Wave Ribbons */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
        <svg className="w-full h-full" viewBox="0 0 1440 900" fill="none" preserveAspectRatio="none">
          <motion.path
            d="M-100,300 C300,100 600,500 1000,200 C1300,-50 1500,400 1600,300"
            stroke="#FF2DAB"
            strokeWidth="80"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0.2 }}
            animate={{ 
              pathLength: [0.8, 1, 0.8],
              d: [
                "M-100,300 C300,100 600,500 1000,200 C1300,-50 1500,400 1600,300",
                "M-100,280 C320,180 580,420 1020,260 C1280,20 1480,360 1600,280",
                "M-100,300 C300,100 600,500 1000,200 C1300,-50 1500,400 1600,300"
              ]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path
            d="M-100,600 C200,800 700,400 1100,700 C1350,900 1550,550 1600,650"
            stroke="#D4FF3F"
            strokeWidth="60"
            strokeLinecap="round"
            fill="none"
            initial={{ opacity: 0.15 }}
            animate={{ 
              d: [
                "M-100,600 C200,800 700,400 1100,700 C1350,900 1550,550 1600,650",
                "M-100,630 C240,750 670,460 1130,660 C1380,850 1520,600 1600,630",
                "M-100,600 C200,800 700,400 1100,700 C1350,900 1550,550 1600,650"
              ]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>

      {/* Top Header Bar */}
      <nav className="sticky top-0 z-40 bg-[#0B0B0B]/80 backdrop-blur-xl border-b border-[#262626] px-4 sm:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#141414] border border-[#262626] flex items-center justify-center text-[#D4FF3F]">
            <Radio className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <span className="font-black text-sm tracking-tight text-white block">
              {p.fullName || 'Sound Waves'}
            </span>
            <span className="text-[10px] text-zinc-400 font-mono tracking-wider">
              HIGH-FIDELITY LIVE SET
            </span>
          </div>
        </div>

        {/* Audio Equalizer Mini Bars */}
        <div className="hidden sm:flex items-center gap-1 h-5 px-3 py-1 rounded-full bg-[#141414] border border-[#262626]">
          {[40, 80, 55, 95, 30, 70, 85, 45, 65, 90, 50, 75].map((h, i) => (
            <motion.div
              key={i}
              className={`w-0.5 rounded-full ${i % 2 === 0 ? 'bg-[#FF2DAB]' : 'bg-[#D4FF3F]'}`}
              animate={isPlaying ? { height: [`${h * 0.3}%`, `${h}%`, `${h * 0.4}%`] } : { height: '20%' }}
              transition={{ duration: 0.6 + (i * 0.08), repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
          <span className="text-[10px] font-mono text-zinc-400 ml-2">128 BPM</span>
        </div>

        <div className="flex items-center gap-2">
          {p.socialLinks?.resumeUrl && (
            <a
              href={sanitizeUrl(p.socialLinks.resumeUrl)}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-full bg-[#141414] hover:bg-[#1f1f1f] border border-[#262626] text-xs font-bold text-[#D4FF3F] flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Track Resume</span>
            </a>
          )}
          {p.contactEmail && (
            <button
              onClick={handleCopyEmail}
              className="px-4 py-1.5 rounded-full bg-[#D4FF3F] hover:bg-[#c2ee2d] text-black font-extrabold text-xs transition-transform hover:scale-105 cursor-pointer shadow-md"
            >
              {copiedEmail ? 'Copied!' : 'Book Artist'}
            </button>
          )}
        </div>
      </nav>

      {/* Hero Soundstage */}
      <section className="relative z-10 px-4 sm:px-8 pt-12 sm:pt-20 pb-16 max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row items-center gap-8 sm:gap-12">
          {/* Animated Vinyl Album Cover */}
          <div className="relative shrink-0 group cursor-pointer" onClick={togglePlayback}>
            {/* Spinning Vinyl Disc behind jacket */}
            <motion.div
              className="absolute -right-6 top-2 w-36 h-36 sm:w-48 sm:h-48 rounded-full bg-gradient-to-tr from-zinc-900 via-zinc-800 to-zinc-950 border-4 border-zinc-800 shadow-2xl flex items-center justify-center -z-10"
              animate={isPlaying ? { rotate: 360 } : {}}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            >
              <div className="w-12 h-12 rounded-full bg-[#FF2DAB] border-2 border-white flex items-center justify-center">
                <Disc className="w-6 h-6 text-white" />
              </div>
            </motion.div>

            {/* Album Jacket */}
            <div className="w-40 h-40 sm:w-52 sm:h-52 rounded-2xl overflow-hidden border-2 border-[#262626] bg-[#141414] shadow-2xl relative z-10">
              <img
                src={p.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80'}
                alt={p.fullName}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                <span className="text-[10px] font-mono text-[#D4FF3F] font-bold">
                  STEREO // 24-BIT
                </span>
              </div>
            </div>
          </div>

          {/* Hero Typography & Bio */}
          <div className="space-y-4 text-center md:text-left flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141414] border border-[#262626] text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-[#D4FF3F] animate-ping" />
              <span className="text-[#FF2DAB] font-bold">NOW HEADLINING</span>
              <span className="text-zinc-500">•</span>
              <span className="text-zinc-300">{p.availabilityStatus || 'Campus & Global Ready'}</span>
            </div>

            <h1 className="text-4xl sm:text-7xl font-black text-white tracking-tight uppercase leading-none">
              {p.fullName || 'Sound Artist'}
            </h1>

            <p className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF2DAB] to-[#D4FF3F]">
              {p.title || 'Full-Stack Sound Engineer'}
            </p>

            <p className="text-zinc-400 text-sm sm:text-base max-w-2xl leading-relaxed">
              {p.bio || p.tagline || 'Pumping out ultra-fast full-stack applications, distributed microservices, and human-crafted user interfaces.'}
            </p>

            {/* Metrics Equalizer */}
            {p.metrics && p.metrics.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
                {p.metrics.map((m, idx) => (
                  <div key={idx} className="bg-[#141414] border border-[#262626] rounded-xl p-3">
                    <div className="text-xl sm:text-2xl font-black text-white">{m.value}</div>
                    <div className="text-[11px] text-[#D4FF3F] font-mono mt-0.5">{m.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Tracks (Projects) */}
      <section className="relative z-10 px-4 sm:px-8 py-10 max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between border-b border-[#262626] pb-3">
          <div>
            <div className="text-xs font-mono uppercase text-[#FF2DAB] font-bold">DISCOGRAPHY</div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Flagship Tracks & Projects
            </h2>
          </div>
          <span className="text-xs text-zinc-500 font-mono">
            {projects.length} TRACKS RELEASED
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((proj, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -4 }}
              className="bg-[#141414] border border-[#262626] hover:border-[#D4FF3F] rounded-2xl p-6 transition-all space-y-4 group shadow-xl"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF2DAB] to-pink-700 flex items-center justify-center text-white font-black text-sm shadow">
                    0{idx + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-[#D4FF3F] transition-colors line-clamp-1">
                      {proj.title}
                    </h3>
                    {proj.metric && (
                      <span className="text-xs text-[#D4FF3F] font-mono">
                        {proj.metric}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  {proj.demoUrl && (
                    <a
                      href={sanitizeUrl(proj.demoUrl)}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg bg-[#1f1f1f] hover:bg-[#D4FF3F] hover:text-black text-white transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  {proj.githubUrl && (
                    <a
                      href={sanitizeUrl(proj.githubUrl)}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg bg-[#1f1f1f] hover:bg-white hover:text-black text-white transition-colors"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed line-clamp-3">
                {proj.description}
              </p>

              {proj.tags && proj.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#262626]">
                  {proj.tags.map((t, tIdx) => (
                    <span key={tIdx} className="px-2.5 py-0.5 rounded-full bg-[#1a1a1a] text-zinc-300 text-[11px] font-mono border border-[#2c2c2c]">
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tracklist Format for Skills (Side A / Side B) */}
      {skillCategories.length > 0 && (
        <section className="relative z-10 px-4 sm:px-8 py-10 max-w-6xl mx-auto space-y-6">
          <div className="border-b border-[#262626] pb-3">
            <div className="text-xs font-mono uppercase text-[#D4FF3F] font-bold">AUDIO FREQUENCIES</div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Skill Tracklist & Synthesizers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {skillCategories.map(([cat, skills], idx) => (
              <div key={idx} className="bg-[#141414] border border-[#262626] rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#FF2DAB] font-bold uppercase tracking-wider">
                    {idx === 0 ? 'SIDE A' : idx === 1 ? 'SIDE B' : 'BONUS DISC'} // {cat}
                  </span>
                  <Disc className="w-4 h-4 text-zinc-500" />
                </div>

                <div className="space-y-2">
                  {(skills || []).map((sk, sIdx) => (
                    <div 
                      key={sIdx}
                      className="flex items-center justify-between p-2 rounded-lg bg-[#191919] hover:bg-[#202020] transition-colors text-xs text-zinc-200"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-zinc-600 font-mono text-[10px]">0{sIdx + 1}</span>
                        <span className="font-semibold">{sk}</span>
                      </div>
                      <span className="text-[#D4FF3F] font-mono text-[10px]">VERIFIED</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tour Dates (Experience Milestones) */}
      {p.experience && p.experience.length > 0 && (
        <section className="relative z-10 px-4 sm:px-8 py-10 max-w-6xl mx-auto space-y-6">
          <div className="border-b border-[#262626] pb-3">
            <div className="text-xs font-mono uppercase text-[#FF2DAB] font-bold">WORLD TOUR</div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Tour Dates & Career Stages
            </h2>
          </div>

          <div className="space-y-4">
            {p.experience.map((exp, idx) => (
              <div 
                key={idx}
                className="bg-[#141414] border border-[#262626] rounded-2xl p-6 hover:border-[#FF2DAB] transition-colors space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-black text-white">
                      {exp.role} <span className="text-[#D4FF3F]">@ {exp.company}</span>
                    </h3>
                    <p className="text-xs text-zinc-400 font-mono mt-0.5">
                      {exp.period} • {exp.location}
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#1a1a1a] text-xs font-mono text-[#FF2DAB] border border-[#262626]">
                    Headline Set
                  </span>
                </div>

                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="space-y-2 pt-2 border-t border-[#262626]">
                    {exp.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="text-xs sm:text-sm text-zinc-300 flex items-start gap-2">
                        <span className="text-[#D4FF3F] font-bold">⚡</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Sticky Bottom Audio Player Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0B0B0B]/95 backdrop-blur-xl border-t border-[#262626] px-4 sm:px-8 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlayback}
              className="w-10 h-10 rounded-full bg-[#D4FF3F] text-black flex items-center justify-center hover:scale-105 transition-transform cursor-pointer shadow-lg shadow-[#D4FF3F]/20"
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-black" /> : <Play className="w-4 h-4 fill-black ml-0.5" />}
            </button>
            <div className="hidden sm:block">
              <span className="text-xs font-bold text-white block">
                {p.fullName} — Continuous Innovation
              </span>
              <span className="text-[10px] text-zinc-400 font-mono">
                PandaLime Audio Master // 320 kbps
              </span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-2">
            {p.contactEmail && (
              <button
                onClick={handleCopyEmail}
                className="px-4 py-2 rounded-full bg-white hover:bg-zinc-200 text-black font-extrabold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{copiedEmail ? 'Copied!' : 'Hire / Connect'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
