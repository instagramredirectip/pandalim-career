import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Plus, 
  Check, 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  Download, 
  Sparkles, 
  Briefcase, 
  Flame, 
  Award, 
  Eye, 
  ThumbsUp, 
  ChevronRight, 
  Film, 
  Terminal
} from 'lucide-react';
import { sanitizeUrl } from '../../utils/sanitize';
import { asmrAudio } from '../../utils/asmrAudio';
import { haptics } from '../../utils/haptics';

export default function BingeSeriesPortfolio({ data, portfolio = data, isPreview = false }) {
  const p = portfolio || data || {};
  const firstName = p.fullName ? p.fullName.trim().split(' ')[0] : 'Creator';

  // Splash & Profile Gate States
  const [showSplash, setShowSplash] = useState(!isPreview);
  const [selectedProfile, setSelectedProfile] = useState(isPreview ? 'recruiter' : null);
  const [activeSkillCategory, setActiveSkillCategory] = useState(0);
  const [activeSeason, setActiveSeason] = useState('s1');
  const [addedToList, setAddedToList] = useState(false);
  const [liked, setLiked] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const episodeRailRef = useRef(null);

  // 1.8s Intro Splash Timer
  useEffect(() => {
    if (isPreview) return;
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, [isPreview]);

  // Profiles Definition
  const viewerProfiles = [
    {
      id: 'creator',
      name: firstName,
      subtitle: "Director's Cut",
      role: 'Full Access',
      avatar: p.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
      badge: 'CREATOR',
      ringColor: 'ring-[#E50914]'
    },
    {
      id: 'recruiter',
      name: 'Recruiter',
      subtitle: '99% Match',
      role: 'ATS & Metrics',
      icon: Briefcase,
      badge: 'FAST-TRACK',
      color: 'bg-emerald-600',
      ringColor: 'ring-emerald-500'
    },
    {
      id: 'developer',
      name: 'Tech Lead',
      subtitle: 'Debug & Code',
      role: 'GitHub & Systems',
      icon: Terminal,
      badge: 'ARCHITECT',
      color: 'bg-blue-600',
      ringColor: 'ring-blue-500'
    },
    {
      id: 'stalker',
      name: 'Stealth Fan',
      subtitle: 'Viewing Anonymously',
      role: 'Incognito Mode',
      icon: Eye,
      badge: 'STEALTH',
      color: 'bg-purple-600',
      ringColor: 'ring-purple-500'
    }
  ];

  // Continue Exploring Episode Rail Data
  const episodeRail = [
    { id: 'story', ep: 'E01', title: 'The Zero-to-One Launch', progress: 95, tag: 'Architecture', desc: 'Screenplay career breakdown' },
    { id: 'moments', ep: 'E02', title: 'Critical Accolades', progress: 100, tag: 'Awards', desc: 'Laurel wreaths & metrics' },
    { id: 'skills', ep: 'E03', title: 'The Skill Universe', progress: 85, tag: 'Tech Stack', desc: 'Fluency matrix & engines' },
    { id: 'journey', ep: 'E04', title: 'Production Seasons', progress: 70, tag: 'Milestones', desc: 'Chronological timeline' },
    { id: 'projects', ep: 'E05', title: 'High-Impact Ships', progress: 90, tag: 'Live Repos', desc: 'Case studies & demos' },
    { id: 'credits', ep: 'E06', title: 'Series Finale', progress: 100, tag: 'Contact', desc: 'Pitch schedule & resume' }
  ];

  // Skill Categories
  const rawSkills = p.skills || {};
  const skillCategories = Object.keys(rawSkills).length > 0 
    ? Object.entries(rawSkills).map(([cat, list]) => ({
        name: cat,
        skills: Array.isArray(list) ? list : [list]
      }))
    : [
        { name: 'Core Engines & Languages', skills: ['TypeScript', 'JavaScript (ESNext)', 'Python', 'Go', 'Rust / C++'] },
        { name: 'Frontend & Creative Tech', skills: ['React 19', 'Next.js 15', 'Three.js / WebGL', 'Tailwind CSS', 'Framer Motion'] },
        { name: 'Cloud & Architecture', skills: ['Docker', 'Kubernetes', 'AWS Lambda', 'Cloudflare Workers', 'Terraform'] },
        { name: 'Databases & Storage', skills: ['PostgreSQL', 'Redis', 'MongoDB', 'Supabase', 'Prisma ORM'] },
        { name: 'AI & Intelligent Agents', skills: ['Gemini 2.5 API', 'LangChain', 'OpenAI SDK', 'Vector DBs / RAG', 'HuggingFace'] }
      ];

  // Seasons / Timeline Data
  const experiences = p.experience || [];
  const seasonsData = {
    s1: {
      label: 'Season 01',
      title: 'The Genesis',
      years: 'Foundations & Early Ships',
      items: experiences.slice(0, 2).length > 0 ? experiences.slice(0, 2) : [
        {
          role: 'Junior Full-Stack Engineer',
          company: 'Early-Stage Venture',
          period: '2022 - 2023',
          bullets: [
            'Built real-time collaboration canvas reducing render cycles by 60%.',
            'Implemented automated CI/CD pipeline shipping 15+ features weekly.'
          ]
        }
      ]
    },
    s2: {
      label: 'Season 02',
      title: 'Scale & Breakthrough',
      years: 'Distributed Systems & Microservices',
      items: experiences.slice(2, 4).length > 0 ? experiences.slice(2, 4) : [
        {
          role: 'Software Engineer',
          company: 'High-Growth Tech Startup',
          period: '2023 - 2024',
          bullets: [
            'Architected distributed event queue handling 5M+ daily webhook invocations.',
            'Refactored legacy monolith into fault-tolerant Kubernetes services with 99.99% SLA.'
          ]
        }
      ]
    },
    s3: {
      label: 'Season 03',
      title: 'The Executive Cut',
      years: 'Production & Campus Placements',
      items: experiences.slice(4).length > 0 ? experiences.slice(4) : [
        {
          role: 'Lead Creative Technologist',
          company: 'Scale Systems & Freelance',
          period: '2024 - Present',
          bullets: [
            'Engineered full-stack multimodal web apps using Gemini APIs and WebGL.',
            'Mentored 40+ campus students on interview preparation and portfolio craft.'
          ]
        }
      ]
    }
  };

  const handleSelectProfile = (id) => {
    asmrAudio.playPop();
    haptics.heavy();
    setSelectedProfile(id);
  };

  const scrollToSection = (id) => {
    asmrAudio.playClick();
    haptics.light();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCopyEmail = () => {
    asmrAudio.playPop();
    haptics.selection();
    if (p.contactEmail) {
      navigator.clipboard.writeText(p.contactEmail);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 3000);
    }
  };

  // 1. ANIMATED INTRO SPLASH
  if (showSplash && !isPreview) {
    return (
      <div 
        onClick={() => setShowSplash(false)}
        className="fixed inset-0 z-50 bg-[#0B0B0B] flex flex-col items-center justify-center cursor-pointer select-none overflow-hidden"
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: [0.85, 1.05, 1], opacity: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="text-center space-y-4 px-4"
        >
          {/* Netflix Red Brand Mark */}
          <motion.div 
            initial={{ height: 0 }}
            animate={{ height: 48 }}
            transition={{ duration: 0.6 }}
            className="w-4 bg-[#E50914] mx-auto rounded-sm shadow-[0_0_35px_#E50914]"
          />

          <motion.h1 
            initial={{ letterSpacing: '0.1em' }}
            animate={{ letterSpacing: '0.22em' }}
            transition={{ duration: 1.6 }}
            className="text-4xl sm:text-7xl font-black text-white uppercase tracking-widest font-serif drop-shadow-[0_0_40px_rgba(229,9,20,0.6)]"
          >
            {firstName} <span className="text-[#E50914]">:</span> THE SERIES
          </motion.h1>

          <p className="text-zinc-500 text-xs font-mono tracking-widest uppercase">
            A PandaLime Original Production • Tap to Start
          </p>
        </motion.div>
      </div>
    );
  }

  // 2. PROFILE GATE: "WHO'S WATCHING?"
  if (!selectedProfile && !isPreview) {
    return (
      <div className="min-h-screen bg-[#0B0B0B] text-white flex flex-col items-center justify-center p-6 relative select-none overflow-hidden">
        {/* Subtle Ambient Red Flare */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#E50914]/10 rounded-full blur-[160px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-3 mb-10 z-10"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E50914]/15 border border-[#E50914]/30 text-[#E50914] text-xs font-mono uppercase tracking-widest">
            <Flame className="w-3.5 h-3.5" /> PANDALIME ORIGINAL
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white font-serif">
            Who's watching?
          </h1>
          <p className="text-zinc-400 text-sm max-w-md mx-auto">
            Select your viewer profile to customize the streaming experience.
          </p>
        </motion.div>

        {/* 4 Square Profile Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-3xl w-full z-10">
          {viewerProfiles.map((prof, idx) => {
            const Icon = prof.icon;
            return (
              <motion.button
                key={prof.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ scale: 1.06, y: -4 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSelectProfile(prof.id)}
                className="group flex flex-col items-center text-center p-4 rounded-2xl bg-[#141414] border border-[#262626] hover:border-[#E50914] transition-all cursor-pointer shadow-2xl hover:shadow-[0_0_25px_rgba(229,9,20,0.3)]"
              >
                <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl ${prof.color || 'bg-zinc-800'} flex items-center justify-center text-white mb-3 transition-all relative overflow-hidden group-hover:ring-4 ${prof.ringColor}`}>
                  {prof.avatar ? (
                    <img src={prof.avatar} alt={prof.name} className="w-full h-full object-cover" />
                  ) : (
                    <Icon className="w-9 h-9 sm:w-11 sm:h-11 drop-shadow" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#E50914] transition-colors">
                  {prof.name}
                </h3>
                <span className="text-[11px] font-mono text-[#E50914] font-semibold mt-0.5">
                  {prof.subtitle}
                </span>
                <span className="text-[10px] text-zinc-500 font-mono mt-1">
                  {prof.role}
                </span>
              </motion.button>
            );
          })}
        </div>

        <button
          onClick={() => handleSelectProfile('recruiter')}
          className="mt-12 px-6 py-2 rounded-full border border-[#262626] hover:border-zinc-500 text-xs font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer z-10"
        >
          Quick Skip To Main Stage →
        </button>
      </div>
    );
  }

  // 3. MAIN CINEMATIC THEME EXPERIENCE
  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white font-sans antialiased selection:bg-[#E50914] selection:text-white relative overflow-x-hidden">
      
      {/* TOP STREAMING NAVBAR */}
      <nav className="sticky top-0 z-40 bg-[#0B0B0B]/85 backdrop-blur-xl border-b border-[#262626] px-4 sm:px-8 py-3.5 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Left: Brand + Links */}
          <div className="flex items-center gap-6 sm:gap-8">
            <div 
              onClick={() => scrollToSection('hero')}
              className="text-xl sm:text-2xl font-black text-[#E50914] tracking-wider cursor-pointer font-serif flex items-center gap-1.5"
            >
              <span>NETFOLIO</span>
              <span className="w-2 h-2 rounded-full bg-[#E50914] inline-block animate-ping" />
            </div>

            <div className="hidden md:flex items-center gap-6 text-xs font-mono text-zinc-400">
              <button onClick={() => scrollToSection('story')} className="hover:text-white transition-colors cursor-pointer">The Story</button>
              <button onClick={() => scrollToSection('moments')} className="hover:text-white transition-colors cursor-pointer">Top Moments</button>
              <button onClick={() => scrollToSection('skills')} className="hover:text-white transition-colors cursor-pointer">Skill Universe</button>
              <button onClick={() => scrollToSection('journey')} className="hover:text-white transition-colors cursor-pointer">Seasons</button>
              <button onClick={() => scrollToSection('projects')} className="hover:text-white transition-colors cursor-pointer">Episodes</button>
            </div>
          </div>

          {/* Right: Profile Switcher & Actions */}
          <div className="flex items-center gap-3">
            {/* Active Profile Pill */}
            <button
              onClick={() => setSelectedProfile(null)}
              className="px-3 py-1.5 rounded-full bg-[#141414] border border-[#262626] hover:border-[#E50914] text-xs font-mono text-zinc-300 hover:text-white transition-all flex items-center gap-2 cursor-pointer shadow-md"
              title="Switch Viewer Profile"
            >
              <span className="w-2 h-2 rounded-full bg-[#E50914]" />
              <span className="hidden sm:inline">Profile:</span>
              <strong className="text-white capitalize">{selectedProfile || 'Guest'}</strong>
            </button>

            {/* Resume Button */}
            {p.resumeUrl && (
              <a
                href={sanitizeUrl(p.resumeUrl)}
                target="_blank"
                rel="noreferrer"
                download
                className="px-4 py-1.5 rounded-full bg-[#E50914] hover:bg-red-700 text-white font-bold text-xs transition-transform hover:scale-105 flex items-center gap-1.5 shadow-[0_0_15px_rgba(229,9,20,0.4)]"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Resume PDF</span>
              </a>
            )}
          </div>
        </div>
      </nav>

      {/* SECTION 1: FULL-BLEED SERIES BILLBOARD HERO */}
      <section id="hero" className="relative min-h-[90vh] flex flex-col justify-end px-4 sm:px-8 lg:px-16 pt-20 pb-16 overflow-hidden">
        
        {/* Cutout Portrait with CSS Gradient Masks */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex justify-end">
          <div 
            className="w-full lg:w-3/5 h-full bg-cover bg-top lg:bg-center opacity-70 lg:opacity-90"
            style={{
              backgroundImage: `url(${p.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200&auto=format&fit=crop&q=80'})`,
              maskImage: 'linear-gradient(to left, black 50%, transparent 100%), linear-gradient(to bottom, black 65%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to left, black 50%, transparent 100%), linear-gradient(to bottom, black 65%, transparent 100%)',
              WebkitMaskComposite: 'destination-in',
              maskComposite: 'intersect'
            }}
          />
        </div>

        {/* Cinematic Vignette Shadows */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/60 to-transparent pointer-events-none z-1" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0B] via-[#0B0B0B]/80 to-transparent pointer-events-none z-1" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-3xl space-y-5">
          
          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono">
            <span className="px-2.5 py-0.5 rounded bg-[#E50914] text-white font-black tracking-wider uppercase text-[11px]">
              TOP 10 TODAY
            </span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> 99% Match Score
            </span>
            <span className="text-zinc-400">2024</span>
            <span className="px-1.5 py-0.5 border border-zinc-600 text-zinc-300 rounded text-[10px]">
              TV-MA
            </span>
            <span className="text-zinc-400">3 Seasons</span>
            <span className="px-1.5 py-0.5 border border-zinc-600 text-zinc-300 rounded text-[10px]">
              ULTRA HD 4K
            </span>
          </div>

          {/* Giant Monumental Title */}
          <h1 className="text-4xl sm:text-7xl lg:text-8xl font-black text-white uppercase tracking-tight font-serif leading-[0.95] drop-shadow-2xl">
            {p.fullName || 'Alex Rivera'} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-[#E50914]">
              THE SERIES
            </span>
          </h1>

          {/* Subtitle / Bio Synopsis */}
          <p className="text-zinc-300 text-base sm:text-xl font-normal leading-relaxed max-w-2xl line-clamp-3">
            {p.bio || p.tagline || 'A high-impact engineer crafting scalable distributed systems, responsive user interfaces, and intelligent AI agent workflows for top tech ecosystems.'}
          </p>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => scrollToSection('story')}
              className="px-8 py-3.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-black text-sm transition-all hover:scale-105 active:scale-95 flex items-center gap-2 shadow-2xl cursor-pointer"
            >
              <Play className="w-4 h-4 fill-black" />
              <span>Watch Story (Play Reel)</span>
            </button>

            {p.resumeUrl ? (
              <a
                href={sanitizeUrl(p.resumeUrl)}
                target="_blank"
                rel="noreferrer"
                download
                className="px-6 py-3.5 rounded-xl bg-[#141414]/90 hover:bg-[#1f1f1f] border border-[#262626] hover:border-white text-white font-bold text-sm transition-all flex items-center gap-2 cursor-pointer backdrop-blur-md"
              >
                <Download className="w-4 h-4" />
                <span>The Script (Resume PDF)</span>
              </a>
            ) : (
              <button
                onClick={() => scrollToSection('journey')}
                className="px-6 py-3.5 rounded-xl bg-[#141414]/90 hover:bg-[#1f1f1f] border border-[#262626] hover:border-white text-white font-bold text-sm transition-all flex items-center gap-2 cursor-pointer backdrop-blur-md"
              >
                <Film className="w-4 h-4" />
                <span>Explore Timeline</span>
              </button>
            )}

            {/* List and Like Buttons */}
            <button
              onClick={() => {
                asmrAudio.playPop();
                setAddedToList(!addedToList);
              }}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                addedToList 
                  ? 'bg-[#E50914] border-[#E50914] text-white' 
                  : 'bg-[#141414]/80 border-[#262626] text-zinc-300 hover:text-white'
              }`}
              title="Add to My List"
            >
              {addedToList ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </button>

            <button
              onClick={() => {
                asmrAudio.playSparkle();
                setLiked(!liked);
              }}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                liked 
                  ? 'bg-emerald-600 border-emerald-500 text-white' 
                  : 'bg-[#141414]/80 border-[#262626] text-zinc-300 hover:text-white'
              }`}
              title="Rate Thumbs Up"
            >
              <ThumbsUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* BOTTOM HORIZONTAL EPISODE RAIL ("CONTINUE EXPLORING") */}
        <div className="relative z-10 pt-16 w-full space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-mono text-zinc-400 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E50914] inline-block animate-pulse" />
              <span>Continue Exploring / Key Episodes</span>
            </h3>
            <span className="text-xs font-mono text-zinc-500 hidden sm:inline">
              Scroll or Click to Jump
            </span>
          </div>

          <div 
            ref={episodeRailRef}
            className="flex gap-4 overflow-x-auto pb-4 no-scrollbar scroll-smooth"
          >
            {episodeRail.map((ep) => (
              <motion.div
                key={ep.id}
                whileHover={{ scale: 1.05, y: -4 }}
                onClick={() => scrollToSection(ep.id)}
                className="w-64 sm:w-72 shrink-0 bg-[#141414] border border-[#262626] hover:border-[#E50914] rounded-2xl p-4 cursor-pointer transition-all shadow-xl group space-y-2.5"
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#E50914] font-bold">{ep.ep}</span>
                  <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 text-[10px]">
                    {ep.tag}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white group-hover:text-[#E50914] transition-colors truncate">
                  {ep.title}
                </h4>

                <p className="text-xs text-zinc-400 truncate">
                  {ep.desc}
                </p>

                {/* Red Progress Bar */}
                <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden mt-2">
                  <div 
                    className="h-full bg-[#E50914] rounded-full transition-all duration-500"
                    style={{ width: `${ep.progress}%` }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: THE FULL STORY — MULTI-COLUMN DARK SCREENPLAY RESUME GRID */}
      <section id="story" className="py-20 px-4 sm:px-8 lg:px-16 border-t border-[#262626] max-w-7xl mx-auto space-y-12">
        <div className="space-y-2">
          <div className="text-xs font-mono uppercase text-[#E50914] font-bold tracking-widest">
            PRODUCTION BIBLE
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white font-serif uppercase tracking-tight">
            The Full Story : Screenplay Resume
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-2xl font-mono">
            Formatted as a production screenplay: Scene setup, architectural conflicts, and pivotal breakthrough deployments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* ACT I */}
          <div className="p-6 rounded-2xl bg-[#141414] border border-[#262626] hover:border-zinc-500 transition-colors space-y-4 font-mono">
            <div className="flex items-center justify-between border-b border-[#262626] pb-3">
              <span className="text-xs text-[#E50914] font-bold">ACT I</span>
              <span className="text-[10px] text-zinc-500">PROLOGUE</span>
            </div>
            <div className="text-xs text-zinc-400 uppercase tracking-widest font-bold">
              SCENE: THE CAMPUS LABS
            </div>
            <h3 className="text-lg font-bold text-white font-sans">
              Foundations & Early Ships
            </h3>
            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              "INT. COMPUTER LAB - NIGHT. A curious builder discovers systems programming, writes hundreds of algorithmic prototypes, and ships the first production repository."
            </p>
            <div className="pt-2 border-t border-[#262626] text-xs text-zinc-400 space-y-1">
              <div className="text-[#E50914] font-bold">KEY DELIVERABLES:</div>
              <div>• Data Structures & Core CS Mastery</div>
              <div>• First 10,000 users acquired</div>
              <div>• Open-source contributions</div>
            </div>
          </div>

          {/* ACT II */}
          <div className="p-6 rounded-2xl bg-[#141414] border border-[#262626] hover:border-[#E50914] transition-colors space-y-4 font-mono">
            <div className="flex items-center justify-between border-b border-[#262626] pb-3">
              <span className="text-xs text-[#E50914] font-bold">ACT II</span>
              <span className="text-[10px] text-zinc-500">THE CONFLICT</span>
            </div>
            <div className="text-xs text-zinc-400 uppercase tracking-widest font-bold">
              SCENE: PRODUCTION SPIKES
            </div>
            <h3 className="text-lg font-bold text-white font-sans">
              Scale, Chaos & Optimization
            </h3>
            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              "EXT. DISTRIBUTED CLOUD - DAY. Traffic explodes 10x overnight. Databases lock up. The engineer re-architects the microservices, cutting latency in half."
            </p>
            <div className="pt-2 border-t border-[#262626] text-xs text-zinc-400 space-y-1">
              <div className="text-[#E50914] font-bold">KEY DELIVERABLES:</div>
              <div>• 45% Latency Reduction via Redis caching</div>
              <div>• Zero-downtime PostgreSQL migrations</div>
              <div>• 99.99% Availability SLA achieved</div>
            </div>
          </div>

          {/* ACT III */}
          <div className="p-6 rounded-2xl bg-[#141414] border border-[#262626] hover:border-emerald-500 transition-colors space-y-4 font-mono">
            <div className="flex items-center justify-between border-b border-[#262626] pb-3">
              <span className="text-xs text-emerald-400 font-bold">ACT III</span>
              <span className="text-[10px] text-zinc-500">BREAKTHROUGH</span>
            </div>
            <div className="text-xs text-zinc-400 uppercase tracking-widest font-bold">
              SCENE: THE CAMPUS PLACEMENT
            </div>
            <h3 className="text-lg font-bold text-white font-sans">
              Autonomous Systems & Lead Craft
            </h3>
            <p className="text-xs text-zinc-300 leading-relaxed font-sans">
              "INT. TECH SHOWCASE - PRESENT. Delivering viral multimodal products, interactive WebGL interfaces, and mentoring the next generation of engineers."
            </p>
            <div className="pt-2 border-t border-[#262626] text-xs text-zinc-400 space-y-1">
              <div className="text-emerald-400 font-bold">KEY DELIVERABLES:</div>
              <div>• Viral portfolio builder with 14k+ users</div>
              <div>• Intelligent AI logic integration</div>
              <div>• Campus Placement Hall of Fame</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: TOP MOMENTS — ACHIEVEMENT CARDS WITH GOLD AWARD LAURELS */}
      <section id="moments" className="py-20 px-4 sm:px-8 lg:px-16 border-t border-[#262626] max-w-7xl mx-auto space-y-12">
        <div className="space-y-2">
          <div className="text-xs font-mono uppercase text-[#E5A93C] font-bold tracking-widest flex items-center gap-1.5">
            <Award className="w-4 h-4 text-[#E5A93C]" />
            <span>CRITICALLY ACCLAIMED</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white font-serif uppercase tracking-tight">
            Top Moments & Laurels
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-2xl font-mono">
            Film festival style honors and proven accomplishments verified across real engineering teams.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Laurel 1 */}
          <div className="p-6 rounded-2xl bg-[#141414] border border-[#262626] hover:border-[#E5A93C] transition-all space-y-4 text-center group shadow-xl">
            <div className="text-[#E5A93C] text-xs font-mono font-bold tracking-widest">
              🌿 OFFICIAL WINNER 🌿
            </div>
            <div className="text-2xl font-black text-white font-serif">
              BEST ARCHITECTURE
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Awarded 1st Place at National Hackathon for distributed real-time sync engine.
            </p>
            <div className="text-[11px] font-mono text-[#E5A93C]">
              ★★★★★ 100% Score
            </div>
          </div>

          {/* Laurel 2 */}
          <div className="p-6 rounded-2xl bg-[#141414] border border-[#262626] hover:border-[#E5A93C] transition-all space-y-4 text-center group shadow-xl">
            <div className="text-[#E5A93C] text-xs font-mono font-bold tracking-widest">
              🌿 CRITICS' CHOICE 🌿
            </div>
            <div className="text-2xl font-black text-white font-serif">
              LATENCY REDUCTION
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Cut API response times from 420ms to 68ms through memory caching and worker threads.
            </p>
            <div className="text-[11px] font-mono text-[#E5A93C]">
              ★★★★★ 4.8x Speedup
            </div>
          </div>

          {/* Laurel 3 */}
          <div className="p-6 rounded-2xl bg-[#141414] border border-[#262626] hover:border-[#E5A93C] transition-all space-y-4 text-center group shadow-xl">
            <div className="text-[#E5A93C] text-xs font-mono font-bold tracking-widest">
              🌿 AUDIENCE FAVORITE 🌿
            </div>
            <div className="text-2xl font-black text-white font-serif">
              VIRAL PRODUCT
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Launched developer utility featured on Product Hunt #2 of the Day with 8k+ GitHub stars.
            </p>
            <div className="text-[11px] font-mono text-[#E5A93C]">
              ★★★★★ 98% Fresh
            </div>
          </div>

          {/* Laurel 4 */}
          <div className="p-6 rounded-2xl bg-[#141414] border border-[#262626] hover:border-[#E5A93C] transition-all space-y-4 text-center group shadow-xl">
            <div className="text-[#E5A93C] text-xs font-mono font-bold tracking-widest">
              🌿 ACADEMIC HONORS 🌿
            </div>
            <div className="text-2xl font-black text-white font-serif">
              DEAN'S LIST & CGPA
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Top 2% of Computer Science graduating class with peer mentoring excellence.
            </p>
            <div className="text-[11px] font-mono text-[#E5A93C]">
              ★★★★★ Certified
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: MY SKILL UNIVERSE — SPLIT LAYOUT WITH VERTICAL CATEGORY TABS */}
      <section id="skills" className="py-20 px-4 sm:px-8 lg:px-16 border-t border-[#262626] max-w-7xl mx-auto space-y-12">
        <div className="space-y-2">
          <div className="text-xs font-mono uppercase text-[#E50914] font-bold tracking-widest">
            THE PRODUCTION GEAR
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white font-serif uppercase tracking-tight">
            My Skill Universe
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-2xl font-mono">
            Interactive fluency matrix categorized by engineering domains. Select a domain on the left to reveal tech stack cards.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Vertical Category Tabs */}
          <div className="lg:col-span-4 space-y-2">
            {skillCategories.map((cat, idx) => (
              <button
                key={cat.name}
                onClick={() => {
                  asmrAudio.playSwitch();
                  haptics.selection();
                  setActiveSkillCategory(idx);
                }}
                className={`w-full text-left p-4 rounded-2xl font-mono text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer ${
                  activeSkillCategory === idx
                    ? 'bg-[#E50914] text-white font-bold shadow-[0_0_20px_rgba(229,9,20,0.35)]'
                    : 'bg-[#141414] text-zinc-400 hover:text-white hover:bg-[#1a1a1a] border border-[#262626]'
                }`}
              >
                <span>{cat.name}</span>
                <ChevronRight className={`w-4 h-4 transition-transform ${activeSkillCategory === idx ? 'rotate-90' : ''}`} />
              </button>
            ))}
          </div>

          {/* Right: Animated Glowing Skill Cards with Framer Motion */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSkillCategory}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {skillCategories[activeSkillCategory]?.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-5 rounded-2xl bg-[#141414] border border-[#262626] hover:border-[#E50914] transition-all space-y-3 group shadow-xl"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-base font-bold text-white group-hover:text-[#E50914] transition-colors">
                        {skill}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-[#E50914]">
                        PROD READY
                      </span>
                    </div>

                    {/* Fluency Progress Meter */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                        <span>Production Fluency</span>
                        <span className="text-white font-bold">95%</span>
                      </div>
                      <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-[#E50914] to-red-400 rounded-full"
                          style={{ width: `${88 + ((sIdx * 3) % 12)}%` }}
                        />
                      </div>
                    </div>

                    <div className="text-[11px] font-mono text-zinc-500">
                      Used across 4+ live production episodes
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* SECTION 5: MY JOURNEY — SEASONS & EPISODE CARDS */}
      <section id="journey" className="py-20 px-4 sm:px-8 lg:px-16 border-t border-[#262626] max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase text-[#E50914] font-bold tracking-widest">
              CHRONOLOGY
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white font-serif uppercase tracking-tight">
              Seasons & Career Journey
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-xl font-mono">
              The episodic evolution of experience, roles, and company milestones.
            </p>
          </div>

          {/* Season Switcher Tabs */}
          <div className="inline-flex p-1 rounded-full bg-[#141414] border border-[#262626] self-start sm:self-auto">
            {['s1', 's2', 's3'].map((sKey) => {
              const s = seasonsData[sKey];
              const isActive = activeSeason === sKey;
              return (
                <button
                  key={sKey}
                  onClick={() => {
                    asmrAudio.playSwitch();
                    haptics.selection();
                    setActiveSeason(sKey);
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-bold font-mono transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#E50914] text-white shadow-md'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {s.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Episodes List with Framer Motion AnimatePresence */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSeason}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="space-y-4"
          >
            <div className="text-xs font-mono text-zinc-500 border-b border-[#262626] pb-2">
              Showing {seasonsData[activeSeason].title} • {seasonsData[activeSeason].years}
            </div>

            {seasonsData[activeSeason].items.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#141414] border border-[#262626] hover:border-[#E50914] transition-all space-y-3 shadow-xl"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#262626] pb-3">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-[#E50914]/20 text-[#E50914] font-bold font-mono text-xs flex items-center justify-center">
                      E0{idx + 1}
                    </span>
                    <div>
                      <h4 className="text-lg font-bold text-white font-sans">{item.role}</h4>
                      <span className="text-xs text-zinc-400 font-mono">{item.company}</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-[#E50914] font-bold">
                    {item.period}
                  </span>
                </div>

                <div className="space-y-1.5 pt-1">
                  {(item.bullets || []).map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-300 font-mono">
                      <span className="text-[#E50914] mt-1">▸</span>
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* SECTION 6: HIGH-IMPACT PROJECTS & EPISODES */}
      <section id="projects" className="py-20 px-4 sm:px-8 lg:px-16 border-t border-[#262626] max-w-7xl mx-auto space-y-12">
        <div className="space-y-2">
          <div className="text-xs font-mono uppercase text-[#E50914] font-bold tracking-widest">
            FEATURED EPISODES
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white font-serif uppercase tracking-tight">
            Original Project Productions
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-2xl font-mono">
            Every project has a live playable URL and verified public code repository.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(p.projects || []).map((proj, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6 }}
              className="p-6 rounded-2xl bg-[#141414] border border-[#262626] hover:border-[#E50914] transition-all flex flex-col justify-between space-y-4 group shadow-xl"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#E50914] font-bold">EPISODE 0{idx + 1}</span>
                  <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 text-[10px]">
                    4K ULTRA HD
                  </span>
                </div>

                <h3 className="text-xl font-black text-white group-hover:text-[#E50914] transition-colors">
                  {proj.title}
                </h3>

                <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
                  {proj.description}
                </p>

                {proj.metric && (
                  <div className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-emerald-400 font-bold">
                    {proj.metric}
                  </div>
                )}

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {(proj.tags || []).map((t, tIdx) => (
                    <span key={tIdx} className="px-2 py-0.5 rounded bg-zinc-800 text-[10px] font-mono text-zinc-400">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-[#262626]">
                {proj.demoUrl && (
                  <a
                    href={sanitizeUrl(proj.demoUrl)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2 rounded-xl bg-[#E50914] hover:bg-red-700 text-white font-bold text-xs text-center transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Live Demo</span>
                  </a>
                )}

                {proj.githubUrl && (
                  <a
                    href={sanitizeUrl(proj.githubUrl)}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-zinc-800 hover:bg-white hover:text-black text-white text-xs transition-colors"
                    title="GitHub Repository"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 7: TO BE CONTINUED... FINALE FOOTER */}
      <footer id="credits" className="py-24 px-4 sm:px-8 border-t border-[#262626] bg-[#0A0A0E] text-center relative overflow-hidden">
        
        {/* Ambient Red Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#E50914]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="space-y-3"
          >
            <span className="text-xs font-mono uppercase text-[#E50914] tracking-widest font-bold">
              SEASON FINALE
            </span>
            <h2 className="text-4xl sm:text-7xl font-black text-white font-serif uppercase tracking-wider drop-shadow-[0_0_30px_rgba(229,9,20,0.5)]">
              TO BE CONTINUED...
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base font-mono">
              Executive Produced & Engineered by <strong className="text-white">{p.fullName || 'Alex Rivera'}</strong>
            </p>
          </motion.div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            {p.contactEmail && (
              <a
                href={`mailto:${p.contactEmail}`}
                className="px-8 py-4 rounded-full bg-[#E50914] hover:bg-red-700 text-white font-black text-sm transition-transform hover:scale-105 active:scale-95 shadow-[0_0_25px_rgba(229,9,20,0.4)] flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span>Schedule The Pitch (Contact)</span>
              </a>
            )}

            {p.contactEmail && (
              <button
                onClick={handleCopyEmail}
                className="px-6 py-4 rounded-full bg-[#141414] hover:bg-[#1a1a1a] border border-[#262626] hover:border-white text-white font-bold text-sm transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Check className={`w-4 h-4 ${copiedEmail ? 'text-emerald-400' : 'text-zinc-500'}`} />
                <span>{copiedEmail ? 'Copied Email Address!' : 'Copy Email Address'}</span>
              </button>
            )}

            {p.resumeUrl && (
              <a
                href={sanitizeUrl(p.resumeUrl)}
                target="_blank"
                rel="noreferrer"
                download
                className="px-6 py-4 rounded-full bg-[#141414] hover:bg-[#1a1a1a] border border-[#262626] hover:border-white text-white font-bold text-sm transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download The Script</span>
              </a>
            )}
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-4 pt-4 text-zinc-400">
            {p.socialLinks?.github && (
              <a href={sanitizeUrl(p.socialLinks.github)} target="_blank" rel="noreferrer" className="p-3 rounded-full bg-[#141414] hover:text-white border border-[#262626] hover:border-[#E50914] transition-colors">
                <Github className="w-4 h-4" />
              </a>
            )}
            {p.socialLinks?.linkedin && (
              <a href={sanitizeUrl(p.socialLinks.linkedin)} target="_blank" rel="noreferrer" className="p-3 rounded-full bg-[#141414] hover:text-white border border-[#262626] hover:border-[#E50914] transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            {p.socialLinks?.twitter && (
              <a href={sanitizeUrl(p.socialLinks.twitter)} target="_blank" rel="noreferrer" className="p-3 rounded-full bg-[#141414] hover:text-white border border-[#262626] hover:border-[#E50914] transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            )}
          </div>

          {/* Disclaimer */}
          <div className="pt-8 border-t border-[#262626] text-zinc-600 text-[11px] font-mono space-y-1">
            <p>© 2026 NETFOLIO PRODUCTIONS • HOSTED ON PANDALIME</p>
            <p>RATED 99% EXCELLENT BY CAMPUS RECRUITERS & HIRING MANAGERS WORLDWIDE</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
