import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DoorClosed, 
  DoorOpen, 
  Sparkles, 
  ExternalLink, 
  Github, 
  Linkedin, 
  Mail, 
  MapPin, 
  Download, 
  Calendar, 
  Award, 
  Layers, 
  Check, 
  ArrowRight,
  Eye,
  KeyRound
} from 'lucide-react';
import { sanitizeUrl } from '../../utils/sanitize';
import { asmrAudio } from '../../utils/asmrAudio';
import { haptics } from '../../utils/haptics';

export default function DoorsTheme({ portfolio }) {
  const p = portfolio || {};
  const [activeDoor, setActiveDoor] = useState(null);
  const [selectedYear, setSelectedYear] = useState('All');
  const [flipIndex, setFlipIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Flip-book hero titles
  const flipTitles = [
    p.title || 'Creative Technologist',
    p.tagline || 'Building human-centric software',
    'Open Source & System Architecture',
    p.availabilityStatus || 'Ready for Immediate Impact'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setFlipIndex(prev => (prev + 1) % flipTitles.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [flipTitles.length]);

  const handleCopyEmail = () => {
    asmrAudio.playPop();
    haptics.light();
    if (p.contactEmail) {
      navigator.clipboard.writeText(p.contactEmail);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 3000);
    }
  };

  const handleDoorClick = (idx) => {
    asmrAudio.playClick();
    haptics.medium();
    setActiveDoor(activeDoor === idx ? null : idx);
  };

  // Extract years from experience
  const years = ['All', '2026', '2025', '2024', '2023'];
  const filteredExperience = (p.experience || []).filter(exp => {
    if (selectedYear === 'All') return true;
    return (exp.period || '').includes(selectedYear);
  });

  const projects = p.projects || [];
  const skillCategories = Object.entries(p.skills || {});

  return (
    <div className="min-h-screen bg-[#111612] text-[#F5F3EF] font-sans selection:bg-[#D4FF3F] selection:text-black pb-24 overflow-x-hidden">
      {/* Top Gallery Bar */}
      <nav className="sticky top-0 z-40 bg-[#111612]/90 backdrop-blur-md border-b border-[#223024] px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded bg-[#202E23] border border-[#3A523F] flex items-center justify-center text-[#D4FF3F]">
            <KeyRound className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="font-bold text-sm tracking-tight text-white block">
              {p.fullName || 'Exhibition'}
            </span>
            <span className="text-[10px] text-stone-400 block font-mono">
              BEHIND THE DOORS // ARCHIVE
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {p.socialLinks?.resumeUrl && (
            <a
              href={sanitizeUrl(p.socialLinks.resumeUrl)}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded bg-[#1C271E] hover:bg-[#253528] border border-[#3A523F] text-xs font-semibold text-[#D4FF3F] flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Resume PDF</span>
            </a>
          )}
          {p.contactEmail && (
            <button
              onClick={handleCopyEmail}
              className="px-3.5 py-1.5 rounded bg-[#F5F3EF] hover:bg-white text-stone-900 text-xs font-bold transition-all cursor-pointer shadow-md"
            >
              {copiedEmail ? 'Copied!' : 'Get In Touch'}
            </button>
          )}
        </div>
      </nav>

      {/* Hero Section with Spiral 3D Flip-Book Card */}
      <section className="px-4 sm:px-8 pt-10 sm:pt-16 pb-12 max-w-5xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Avatar with Botanical Frame */}
          <div className="relative shrink-0">
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 border-[#3A523F] shadow-2xl bg-[#1C271E]">
              <img
                src={p.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80'}
                alt={p.fullName}
                className="w-full h-full object-cover"
              />
            </div>
            {p.location && (
              <div className="absolute -bottom-2 -right-2 bg-[#1C271E] border border-[#3A523F] px-2 py-0.5 rounded-full text-[10px] text-stone-300 flex items-center gap-1 shadow-md">
                <MapPin className="w-3 h-3 text-[#D4FF3F]" />
                <span>{p.location}</span>
              </div>
            )}
          </div>

          {/* Flip-Book Note Card */}
          <div className="flex-1 w-full">
            <div className="relative bg-[#F5F3EF] text-stone-900 rounded-2xl p-6 sm:p-8 shadow-2xl border border-stone-300">
              {/* Spiral Rings Visual */}
              <div className="absolute -top-3 left-6 right-6 flex justify-between pointer-events-none">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="w-2.5 h-6 bg-stone-700 rounded-full border border-stone-400 shadow-inner -translate-y-1" />
                ))}
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-stone-500 font-bold">
                    PORTFOLIO EDITION // VOL. 1
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                </div>

                <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-stone-900 font-serif">
                  {p.fullName || 'Creative Developer'}
                </h1>

                {/* Animated Flip Subheading */}
                <div className="h-8 overflow-hidden relative">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={flipIndex}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="text-base sm:text-lg font-semibold text-emerald-800"
                    >
                      {flipTitles[flipIndex]}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <p className="text-stone-700 text-sm sm:text-base leading-relaxed pt-1">
                  {p.bio || 'Exploring the intersection of high-fidelity engineering, creative interaction, and robust architecture.'}
                </p>

                {/* Metrics ribbon */}
                {p.metrics && p.metrics.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4 border-t border-stone-200">
                    {p.metrics.map((m, idx) => (
                      <div key={idx} className="bg-stone-100 rounded-lg p-2 text-center border border-stone-200">
                        <div className="text-lg font-black text-stone-900">{m.value}</div>
                        <div className="text-[10px] text-stone-600 font-medium">{m.label}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Interactive 3D Doors Section */}
      <section className="px-4 sm:px-8 py-10 max-w-5xl mx-auto space-y-6">
        <div className="text-center space-y-1">
          <div className="text-xs font-mono tracking-widest uppercase text-[#D4FF3F]">
            EXHIBIT ROOMS
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-black text-white">
            Behind The Doors
          </h2>
          <p className="text-xs sm:text-sm text-stone-400">
            Hover to peek inside. Click any door to step through and inspect the work.
          </p>
        </div>

        {/* 3D Doors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4" style={{ perspective: '1200px' }}>
          {projects.slice(0, 4).map((proj, idx) => {
            const isOpen = activeDoor === idx;
            return (
              <div
                key={idx}
                className="relative h-80 rounded-2xl bg-[#18221A] border-2 border-[#2C3E2F] overflow-hidden group cursor-pointer shadow-2xl"
                onClick={() => handleDoorClick(idx)}
              >
                {/* Revealed Interior Room (Behind the door) */}
                <div className="absolute inset-0 p-5 bg-gradient-to-br from-[#1C271E] to-[#121A14] flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-[#D4FF3F] uppercase tracking-wider block">
                      ROOM #{idx + 1} // REVEALED
                    </span>
                    <h3 className="text-base font-bold text-white mt-1 line-clamp-1">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-stone-300 mt-2 line-clamp-4 leading-relaxed">
                      {proj.description}
                    </p>
                  </div>

                  <div className="space-y-3">
                    {proj.metric && (
                      <div className="text-[10px] font-mono text-[#D4FF3F] bg-[#223024] px-2 py-1 rounded inline-block">
                        {proj.metric}
                      </div>
                    )}
                    <div className="flex items-center gap-2 pt-2 border-t border-[#2C3E2F]">
                      {proj.demoUrl && (
                        <a
                          href={sanitizeUrl(proj.demoUrl)}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 py-1 px-2 rounded bg-[#D4FF3F] text-black text-center text-xs font-bold flex items-center justify-center gap-1"
                        >
                          <ExternalLink className="w-3 h-3" /> Live
                        </a>
                      )}
                      {proj.githubUrl && (
                        <a
                          href={sanitizeUrl(proj.githubUrl)}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="py-1 px-2 rounded bg-[#2C3E2F] text-stone-200 text-xs font-semibold flex items-center justify-center gap-1"
                        >
                          <Github className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* 3D Hinged Door Panel */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-[#263529] via-[#1E2B21] to-[#162018] border-r-4 border-[#3A523F] p-5 flex flex-col justify-between origin-left transition-transform duration-500 ease-out z-10 shadow-2xl"
                  style={{
                    transform: isOpen ? 'rotateY(-85deg)' : undefined,
                  }}
                  whileHover={!isOpen ? { rotateY: -28 } : {}}
                >
                  <div className="flex items-center justify-between">
                    <span className="w-6 h-6 rounded-full bg-[#344738] flex items-center justify-center text-[10px] font-mono text-[#D4FF3F]">
                      0{idx + 1}
                    </span>
                    <DoorClosed className="w-4 h-4 text-stone-400 group-hover:hidden" />
                    <DoorOpen className="w-4 h-4 text-[#D4FF3F] hidden group-hover:block" />
                  </div>

                  {/* Architectural Door Details */}
                  <div className="text-center space-y-2 py-4">
                    <div className="w-12 h-16 mx-auto border border-[#3A523F] rounded-md bg-[#18221A]/60 flex items-center justify-center shadow-inner">
                      <div className="w-3 h-3 rounded-full bg-amber-400/80 shadow" />
                    </div>
                    <h4 className="text-sm font-bold text-stone-200 tracking-wide line-clamp-1">
                      {proj.title}
                    </h4>
                    <span className="text-[10px] font-mono text-stone-400 block">
                      Click to unlock
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-stone-400 font-mono">
                    <span>STATUS</span>
                    <span className="text-[#D4FF3F]">ENTER →</span>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Year Scrubber Timeline */}
      <section className="px-4 sm:px-8 py-10 max-w-5xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#223024] pb-4">
          <div>
            <div className="text-xs font-mono uppercase text-[#D4FF3F]">CHRONOLOGY</div>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-white">
              Year Scrubber Timeline
            </h2>
          </div>

          {/* Interactive Year Scrubber Pills */}
          <div className="flex items-center gap-1.5 p-1 bg-[#18221A] border border-[#2C3E2F] rounded-xl">
            {years.map(yr => (
              <button
                key={yr}
                onClick={() => {
                  asmrAudio.playSwitch();
                  haptics.selection();
                  setSelectedYear(yr);
                }}
                className={`px-3 py-1 text-xs font-mono rounded-lg transition-all cursor-pointer ${
                  selectedYear === yr
                    ? 'bg-[#D4FF3F] text-black font-bold shadow'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                {yr}
              </button>
            ))}
          </div>
        </div>

        {/* Filtered Experience Milestones */}
        <div className="space-y-4">
          {filteredExperience.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="p-5 sm:p-6 rounded-2xl bg-[#162018] border border-[#243326] space-y-3 hover:border-[#3A523F] transition-colors"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {exp.role} <span className="text-[#D4FF3F]">@ {exp.company}</span>
                  </h3>
                  <p className="text-xs text-stone-400 font-mono">
                    {exp.period} • {exp.location}
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded bg-[#202E23] text-stone-300 text-xs font-mono border border-[#2C3E2F]">
                  Archive Entry
                </span>
              </div>

              {exp.bullets && exp.bullets.length > 0 && (
                <ul className="space-y-2 pt-2 border-t border-[#223024]">
                  {exp.bullets.map((b, bIdx) => (
                    <li key={bIdx} className="text-xs sm:text-sm text-stone-300 flex items-start gap-2 leading-relaxed">
                      <span className="text-[#D4FF3F] mt-0.5">✦</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Skills Gallery Grid */}
      {skillCategories.length > 0 && (
        <section className="px-4 sm:px-8 py-8 max-w-5xl mx-auto space-y-6">
          <div className="border-b border-[#223024] pb-3">
            <div className="text-xs font-mono uppercase text-[#D4FF3F]">COMPETENCIES</div>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-white">
              Skills Archive
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {skillCategories.map(([cat, skills], idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#162018] border border-[#243326] space-y-2.5">
                <div className="text-xs font-bold text-[#D4FF3F] uppercase tracking-wider font-mono">
                  {cat}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {(skills || []).map((sk, sIdx) => (
                    <span key={sIdx} className="px-2.5 py-1 rounded bg-[#202E23] text-stone-300 text-xs border border-[#2C3E2F]">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Contact Letterpress Footer */}
      <footer className="mt-12 border-t border-[#223024] px-4 sm:px-8 py-12 max-w-5xl mx-auto text-center space-y-4">
        <div className="text-xs uppercase font-mono tracking-widest text-stone-500">
          END OF EXHIBITION
        </div>
        <h3 className="text-3xl font-serif font-black text-white">
          {p.fullName}
        </h3>
        <p className="text-sm text-stone-400 max-w-md mx-auto">
          Inquiries for full-time roles, contracts, or engineering collaborations are welcome.
        </p>
        <div className="pt-2 flex justify-center gap-3">
          {p.contactEmail && (
            <button
              onClick={handleCopyEmail}
              className="px-5 py-2.5 bg-[#D4FF3F] text-black font-bold rounded-lg text-xs flex items-center gap-2 cursor-pointer transition-transform hover:scale-105"
            >
              <Mail className="w-4 h-4" />
              <span>{copiedEmail ? 'Email Copied!' : p.contactEmail}</span>
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}

