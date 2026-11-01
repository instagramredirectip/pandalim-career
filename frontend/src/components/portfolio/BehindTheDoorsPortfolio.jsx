import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  ExternalLink, 
  Github, 
  Linkedin, 
  Mail, 
  Download, 
  Check, 
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Monitor,
  Eye,
  KeyRound,
  Layers,
  ArrowRight
} from 'lucide-react';
import { sanitizeUrl } from '../../utils/sanitize';
import { asmrAudio } from '../../utils/asmrAudio';
import { haptics } from '../../utils/haptics';

// 1. 3D Spiral Notebook Role Flip Card Component
function SpiralFlipCard({ roles = [] }) {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    if (roles.length <= 1) return;
    const interval = setInterval(() => {
      asmrAudio.playPop();
      setCurrentIdx((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <div className="relative w-full max-w-md pt-6">
      {/* 14 Metallic SVG Spiral Rings along the top edge */}
      <div className="absolute -top-3 left-0 right-0 z-20 flex justify-between px-3 pointer-events-none">
        {Array.from({ length: 14 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            {/* Dark ring puncture hole in paper */}
            <div className="w-1.5 h-1.5 rounded-full bg-[#3d372e] mb-0.5 shadow-inner" />
            {/* Metallic Brass Spiral Ring Coil */}
            <div className="w-2.5 h-7 rounded-full bg-gradient-to-r from-[#d4af37] via-[#fff3b0] to-[#aa8010] shadow-[0_2px_4px_rgba(0,0,0,0.35)] -mt-1 border border-[#8a6809]" />
          </div>
        ))}
      </div>

      {/* 3D Flipping Paper Card Container with 1200px perspective */}
      <div 
        className="relative w-full min-h-[140px] bg-[#FAF8F5] border border-[#DDD6C8] rounded-2xl p-6 shadow-[0_12px_30px_rgba(0,0,0,0.08)] overflow-hidden"
        style={{ perspective: '1200px' }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIdx}
            initial={{ rotateX: 90, opacity: 0, transformOrigin: 'top center' }}
            animate={{ rotateX: 0, opacity: 1, transformOrigin: 'top center' }}
            exit={{ rotateX: -90, opacity: 0, transformOrigin: 'bottom center' }}
            transition={{ duration: 0.55, ease: [0.34, 1.56, 0.64, 1] }}
            style={{ transformStyle: 'preserve-3d' }}
            className="flex flex-col justify-center h-full space-y-1"
          >
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#8C8270] font-bold">
              CURRENT FOCUS • ROLE #{currentIdx + 1}
            </span>
            <div className="text-2xl sm:text-3xl font-serif font-black text-[#181818] tracking-tight">
              {roles[currentIdx] || 'Full-Stack Developer'}
            </div>
            <p className="text-xs text-[#635B4C] font-mono pt-1">
              ✦ Hand-crafted with high-impact systems architecture & clean UI
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Paper texture watermark lines */}
        <div className="absolute right-3 bottom-2 text-[9px] font-mono text-[#C4B9A3] select-none">
          PAGE {currentIdx + 1} / {roles.length}
        </div>
      </div>
    </div>
  );
}

// 2. Main Standalone Behind The Doors Component
export default function BehindTheDoorsPortfolio({ data, portfolio = data }) {
  const p = portfolio || data || {};
  const [hoveredDoor, setHoveredDoor] = useState(null);
  const [isZooming, setIsZooming] = useState(false);
  const [selectedInteriorProject, setSelectedInteriorProject] = useState(null);
  const [selectedYearIndex, setSelectedYearIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Dynamic roles for SpiralFlipCard
  const roles = [
    p.title || 'Lead Creative Technologist',
    'Full-Stack Systems Architect',
    'AI & Multimodal Engineer',
    'Interactive 3D & UI Designer'
  ];

  // 4 Doors Color Configurations & Associated Projects
  const doorConfigs = [
    {
      id: 0,
      label: 'DOOR 01',
      title: 'Systems & Core Engines',
      color: 'bg-[#1b3a2b]',
      borderColor: 'border-[#295640]',
      brassColor: '#e0c068',
      lightGlow: 'rgba(52, 211, 153, 0.35)',
      checklist: [
        'High-throughput distributed architecture',
        'Sub-50ms query optimization with Redis',
        'Fault-tolerant Docker & Kubernetes pods',
        'Zero-downtime database migrations'
      ]
    },
    {
      id: 1,
      label: 'DOOR 02',
      title: 'Interactive 3D & Shaders',
      color: 'bg-[#331d45]',
      borderColor: 'border-[#4e2d69]',
      brassColor: '#f3d58a',
      lightGlow: 'rgba(192, 132, 252, 0.35)',
      checklist: [
        'WebGL GLSL shaders & physics engines',
        'Three.js spatial camera navigation',
        '60 FPS buttery smooth responsive canvas',
        'Framer Motion kinetic micro-interactions'
      ]
    },
    {
      id: 2,
      label: 'DOOR 03',
      title: 'Intelligent AI Agents',
      color: 'bg-[#303d27]',
      borderColor: 'border-[#455737]',
      brassColor: '#dfb85b',
      lightGlow: 'rgba(163, 230, 53, 0.35)',
      checklist: [
        'Gemini multimodal context pipelines',
        'Autonomous agent orchestration & tools',
        'Semantic search & vector embedding graphs',
        'Production rate-limit handling & retries'
      ]
    },
    {
      id: 3,
      label: 'DOOR 04',
      title: 'Cloud & Full-Stack Apps',
      color: 'bg-[#4a2419]',
      borderColor: 'border-[#693424]',
      brassColor: '#eec76d',
      lightGlow: 'rgba(251, 146, 60, 0.35)',
      checklist: [
        'Full-stack Next.js 15 & React 19 apps',
        'REST & GraphQL authenticated APIs',
        'Automated CI/CD GitHub action suites',
        'Serverless edge workers with global cache'
      ]
    }
  ];

  // Map projects to doors
  const rawProjects = p.projects || [];
  const assignedProjects = doorConfigs.map((door, idx) => {
    const proj = rawProjects[idx] || {
      title: door.title,
      description: `Production case study focused on ${door.title.toLowerCase()}. Built with modern industry-standard patterns, high scalability, and clean code documentation.`,
      metric: '⚡ 4.5x Latency Improvement • 99.99% Uptime',
      tags: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
      githubUrl: p.socialLinks?.github || 'https://github.com',
      demoUrl: ''
    };
    return { ...proj, doorMeta: door };
  });

  // Extract distinct years from timeline
  const experiences = p.experience || [
    {
      role: 'Principal Interactive Architect',
      company: 'Studio Obscura',
      period: '2025 - Present',
      bullets: [
        'Directing digital products, interactive 3D WebGL canvases, and scalable microservices.',
        'Mentored 30+ junior engineers and led system architecture reviews.'
      ]
    },
    {
      role: 'Senior Full-Stack Engineer',
      company: 'Bureau Creative',
      period: '2024 - 2025',
      bullets: [
        'Reduced client-side bundle size by 45% using code splitting and modern tree-shaking.',
        'Engineered real-time collaboration canvas with zero dropped frames.'
      ]
    },
    {
      role: 'Systems Software Engineer',
      company: 'Foundry Cloud Tech',
      period: '2022 - 2023',
      bullets: [
        'Authored high-throughput ingestion pipelines processing 4M+ daily events.',
        'Migrated SQL databases to distributed clusters with automated failover.'
      ]
    }
  ];

  const yearList = ['2026', '2025', '2024', '2022'];
  const activeYear = yearList[selectedYearIndex] || '2026';

  const handleDoorEnter = (idx) => {
    asmrAudio.playSparkle();
    haptics.heavy();
    setIsZooming(true);

    setTimeout(() => {
      setSelectedInteriorProject(assignedProjects[idx]);
      setIsZooming(false);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 450);
  };

  const handleBackToDoors = () => {
    asmrAudio.playPop();
    haptics.selection();
    setSelectedInteriorProject(null);
    setTimeout(() => {
      const chamberEl = document.getElementById('doors-chamber');
      if (chamberEl) chamberEl.scrollIntoView({ behavior: 'smooth' });
    }, 50);
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

  // -------------------------------------------------------------
  // VIEW A: INTERIOR PROJECT SHOWCASE VIEW (WHEN A DOOR IS OPENED)
  // -------------------------------------------------------------
  if (selectedInteriorProject) {
    const proj = selectedInteriorProject;
    return (
      <div className="min-h-screen bg-[#0E1310] text-[#EDE8DF] font-sans antialiased selection:bg-[#E5C158] selection:text-black relative pb-28">
        
        {/* Floating Top Navigation Pill */}
        <div className="sticky top-4 z-50 px-4 sm:px-8 max-w-6xl mx-auto flex items-center justify-between">
          <button
            onClick={handleBackToDoors}
            className="px-5 py-2.5 rounded-full bg-[#18221B]/90 hover:bg-[#233328] border border-[#344D3B] text-xs font-mono text-[#E5C158] hover:text-white transition-all flex items-center gap-2 shadow-2xl backdrop-blur-md cursor-pointer hover:scale-105 active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>← Back to the Doors</span>
          </button>

          <span className="text-xs font-mono px-3 py-1.5 rounded-full bg-[#18221B] border border-[#344D3B] text-stone-300">
            {proj.doorMeta?.label} INTERIOR ROOM
          </span>
        </div>

        {/* Interior Hero Content */}
        <div className="max-w-5xl mx-auto px-4 sm:px-8 pt-12 space-y-12">
          
          <div className="space-y-4">
            <span className="text-xs font-mono text-[#E5C158] font-bold uppercase tracking-widest">
              CHAMBER ARCHIVE • {proj.doorMeta?.title}
            </span>
            <h1 className="text-3xl sm:text-6xl font-serif font-black text-white tracking-tight">
              {proj.title}
            </h1>
            <p className="text-sm sm:text-lg text-stone-300 font-mono leading-relaxed max-w-3xl">
              {proj.description}
            </p>
          </div>

          {/* 3D Desktop Monitor Mockup Frame */}
          <div className="relative w-full rounded-2xl bg-[#151D17] border-2 border-[#2F4435] p-3 sm:p-6 shadow-2xl space-y-3">
            {/* Monitor Header Controls */}
            <div className="flex items-center justify-between pb-3 border-b border-[#243328] text-xs font-mono text-stone-400">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
                <span className="ml-2 text-stone-400 font-mono hidden sm:inline">
                  https://pandalime.bio/showcase/{proj.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
                </span>
              </div>
              <Monitor className="w-4 h-4 text-[#E5C158]" />
            </div>

            {/* Monitor Canvas Display */}
            <div className="w-full h-64 sm:h-96 rounded-xl bg-[#090C0A] border border-[#233126] overflow-hidden relative flex flex-col items-center justify-center p-6 text-center">
              <div className="space-y-3 max-w-md z-10">
                <div className="w-12 h-12 rounded-2xl bg-[#E5C158]/20 text-[#E5C158] flex items-center justify-center mx-auto text-xl font-bold">
                  ✦
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                  {proj.title}
                </h3>
                <div className="px-4 py-2 rounded-full bg-[#18221B] border border-[#344D3B] text-xs font-mono text-[#E5C158]">
                  {proj.metric || '⚡ High Performance Engineering'}
                </div>
              </div>

              {/* Decorative grid behind monitor content */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#152018_1px,transparent_1px),linear-gradient(to_bottom,#152018_1px,transparent_1px)] bg-[size:24px_24px] opacity-35 pointer-events-none" />
            </div>
          </div>

          {/* Project Story & Tech Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="md:col-span-2 space-y-4 bg-[#141C16] border border-[#27392C] rounded-2xl p-6">
              <h3 className="text-lg font-serif font-bold text-white">
                Architectural Breakdown & Strategy
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 font-mono leading-relaxed">
                Engineered with performance-first principles. Employs modern caching boundaries, minimal re-renders, and full static export optimizations so users experience zero friction across slow connections.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {(proj.tags || []).map((tag, tIdx) => (
                  <span key={tIdx} className="px-3 py-1 rounded-full bg-[#1C271E] border border-[#344D3B] text-xs font-mono text-[#E5C158]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-4 bg-[#141C16] border border-[#27392C] rounded-2xl p-6 flex flex-col justify-between">
              <div className="space-y-2">
                <h4 className="text-xs font-mono text-stone-400 uppercase tracking-widest">
                  ACTION CHANNELS
                </h4>
                <div className="text-base font-serif font-bold text-white">
                  Test Drive Case Study
                </div>
              </div>

              <div className="space-y-2 pt-2">
                {proj.demoUrl && (
                  <a
                    href={sanitizeUrl(proj.demoUrl)}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 rounded-xl bg-[#E5C158] hover:bg-[#d4af37] text-black font-bold text-xs text-center transition-colors flex items-center justify-center gap-1.5"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open Live Demo</span>
                  </a>
                )}

                {proj.githubUrl && (
                  <a
                    href={sanitizeUrl(proj.githubUrl)}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 rounded-xl bg-[#1C271E] hover:bg-[#253528] border border-[#344D3B] text-white font-bold text-xs text-center transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>View GitHub Code</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW B: MAIN BEHIND THE DOORS MULTI-SECTION EXHIBITION
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#181818] font-sans antialiased selection:bg-[#181818] selection:text-[#F4F1EA] relative overflow-x-hidden">
      
      {/* SECTION 1: WARM CREAM PAPER HERO */}
      <section 
        id="hero"
        className="relative min-h-[85vh] flex flex-col justify-center px-4 sm:px-8 lg:px-16 pt-16 pb-20 border-b border-[#DDD6C8] bg-[#F4F1EA] overflow-hidden"
      >
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Greeting, Name & Spiral-Bound Role Card */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAE4D5] border border-[#D5CDBD] text-xs font-mono text-[#5C5343]">
              <span className="w-2 h-2 rounded-full bg-[#181818] inline-block" />
              <span>BEHIND THE DOORS • EXHIBITION EDITION</span>
            </div>

            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-serif text-[#4A4234] font-normal">
                Hi, I'm <strong className="font-bold text-[#181818]">{p.fullName || 'Clara Vance'}</strong>.
              </h2>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-black text-[#181818] tracking-tight leading-none">
                I am a
              </h1>
            </div>

            {/* 3D Spiral Notebook Role Flip Card */}
            <SpiralFlipCard roles={roles} />

            {/* Sub-Bio */}
            <p className="text-sm sm:text-base text-[#574E3E] font-mono leading-relaxed max-w-lg pt-2">
              {p.bio || p.tagline || 'Editorial digital product architect crafting purposeful interfaces, expressive design systems, and fast reliable code.'}
            </p>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#doors-chamber"
                onClick={() => {
                  asmrAudio.playClick();
                  haptics.medium();
                }}
                className="px-7 py-3.5 rounded-full bg-[#181818] hover:bg-[#2b2b2b] text-[#F4F1EA] font-serif font-bold text-sm transition-all hover:scale-105 active:scale-95 shadow-xl flex items-center gap-2 cursor-pointer"
              >
                <span>Enter The Doors Chamber</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              {p.resumeUrl && (
                <a
                  href={sanitizeUrl(p.resumeUrl)}
                  target="_blank"
                  rel="noreferrer"
                  download
                  className="px-6 py-3.5 rounded-full bg-[#EAE4D5] hover:bg-[#ded6c3] border border-[#CFC5B1] text-[#181818] font-mono text-xs font-bold transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Resume PDF</span>
                </a>
              )}
            </div>
          </div>

          {/* Right Column: Tilted Framed Portrait Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              initial={{ rotate: 3, y: 10 }}
              animate={{ rotate: [-2, 3, -1], y: [0, -6, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              className="relative p-4 bg-[#FAF8F5] border-2 border-[#D5CDBD] rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] max-w-sm w-full"
            >
              {/* Paper Tape Corner Deco */}
              <div className="absolute -top-3 left-10 w-20 h-6 bg-[#E8E2D1]/80 border border-[#D0C7B2] rotate-[-8deg] shadow-sm pointer-events-none" />

              <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden bg-[#E2DBD0] border border-[#C5BBA7] relative">
                <img
                  src={p.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80'}
                  alt={p.fullName || 'Portrait'}
                  className="w-full h-full object-cover grayscale contrast-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>

              <div className="pt-3 text-center space-y-0.5">
                <span className="font-serif font-bold text-sm text-[#181818]">
                  {p.fullName || 'Clara Vance'}
                </span>
                <span className="text-[11px] font-mono text-[#7A7160] block">
                  {p.location || 'London / Remote'} • Verified Artist
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2: DARK FOREST-CHARCOAL ROOM ("MAGIC HAPPENS BEHIND THE DOORS") */}
      <section 
        id="doors-chamber"
        className="relative min-h-screen bg-[#111612] text-[#EDE8DF] py-24 px-4 sm:px-8 lg:px-16 border-b border-[#223024] overflow-hidden"
      >
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-xs font-mono uppercase text-[#E5C158] font-bold tracking-widest flex items-center justify-center gap-1.5">
              <KeyRound className="w-4 h-4 text-[#E5C158]" />
              <span>THE FOUR PORTALS</span>
            </span>
            <h2 className="text-3xl sm:text-6xl font-serif font-black text-white tracking-tight">
              Magic happens behind the doors.
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 font-mono max-w-xl mx-auto">
              Hover over any door to reveal its capability checklist. Click a door to zoom directly through the threshold into the interior case study.
            </p>
          </div>

          {/* 4 Interactive 3D Wooden Doors Container with 1600px perspective */}
          <div 
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 transition-all duration-500 ${
              isZooming ? 'scale-[3.5] opacity-0 blur-sm' : ''
            }`}
            style={{ perspective: '1600px' }}
          >
            {doorConfigs.map((door, idx) => {
              const isHovered = hoveredDoor === idx;
              const isDimmed = hoveredDoor !== null && !isHovered;

              return (
                <div
                  key={door.id}
                  onMouseEnter={() => {
                    asmrAudio.playPop();
                    haptics.selection();
                    setHoveredDoor(idx);
                  }}
                  onMouseLeave={() => setHoveredDoor(null)}
                  onClick={() => handleDoorEnter(idx)}
                  className={`group relative rounded-2xl cursor-pointer transition-all duration-300 ${
                    isDimmed ? 'opacity-30 scale-95' : 'opacity-100'
                  }`}
                >
                  {/* Outer Door Frame / Wall Inset */}
                  <div className="relative w-full h-[380px] rounded-2xl bg-[#0B0E0C] border-2 border-[#243328] p-2 flex flex-col justify-between shadow-2xl overflow-hidden">
                    
                    {/* Golden Light Beam Spill when Open */}
                    <div 
                      className={`absolute inset-0 bg-gradient-to-r from-amber-400/30 via-yellow-300/10 to-transparent transition-opacity duration-300 pointer-events-none ${
                        isHovered ? 'opacity-100' : 'opacity-0'
                      }`}
                      style={{ boxShadow: isHovered ? `0 0 60px ${door.lightGlow}` : 'none' }}
                    />

                    {/* Hidden Interior Room Silhouette Preview Behind Door */}
                    <div className="absolute inset-2 rounded-xl bg-[#090C0A] p-4 flex flex-col justify-between pointer-events-none">
                      <span className="text-[10px] font-mono text-[#E5C158] font-bold">
                        ROOM #{idx + 1} INTERIOR
                      </span>
                      <div className="text-center space-y-1">
                        <Sparkles className="w-6 h-6 text-[#E5C158] mx-auto animate-pulse" />
                        <span className="text-xs font-serif font-bold text-white block">
                          Enter Chamber
                        </span>
                      </div>
                      <span className="text-[9px] font-mono text-stone-500 text-center">
                        Click to Step Inside ➔
                      </span>
                    </div>

                    {/* 3D Moving Door Leaf on Left Hinge */}
                    <motion.div
                      animate={{
                        rotateY: isHovered ? -42 : 0,
                        transformOrigin: 'left center'
                      }}
                      transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                      style={{ transformStyle: 'preserve-3d' }}
                      className={`relative z-10 w-full h-full rounded-xl ${door.color} border-2 ${door.borderColor} p-4 flex flex-col justify-between shadow-2xl origin-left`}
                    >
                      {/* Brass Nameplate */}
                      <div className="mx-auto px-3 py-1 rounded bg-gradient-to-r from-[#d4af37] via-[#fff3b0] to-[#aa8010] border border-[#8a6809] text-black font-mono text-[10px] font-black tracking-widest shadow-md">
                        {door.label}
                      </div>

                      {/* Recessed Wood Molding Panel Center */}
                      <div className="w-full flex-1 my-3 rounded-lg border border-black/30 bg-black/10 p-3 flex flex-col justify-between">
                        <div className="w-full h-1 bg-black/20 rounded" />
                        <span className="text-sm font-serif font-bold text-white text-center leading-tight">
                          {door.title}
                        </span>
                        <div className="w-full h-1 bg-black/20 rounded" />
                      </div>

                      {/* Brass Handle & Keyhole (Right-Aligned) */}
                      <div className="self-end flex flex-col items-center gap-1 mr-2">
                        <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-[#aa8010] to-[#fff3b0] shadow-md border border-[#8a6809]" />
                        <div className="w-1.5 h-3 rounded-sm bg-black/60" />
                      </div>
                    </motion.div>
                  </div>

                  {/* Door Title Underneath */}
                  <div className="pt-3 text-center">
                    <span className="text-xs font-mono text-stone-400 group-hover:text-[#E5C158] transition-colors font-bold">
                      {door.title}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Slide-In Capability Checklist Beside Open Door */}
          <AnimatePresence>
            {hoveredDoor !== null && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.2 }}
                className="max-w-2xl mx-auto p-6 rounded-2xl bg-[#151D17] border border-[#2F4435] space-y-3 shadow-2xl"
              >
                <div className="flex items-center justify-between border-b border-[#243328] pb-2">
                  <span className="text-xs font-mono text-[#E5C158] font-bold">
                    CAPABILITY CHECKLIST • {doorConfigs[hoveredDoor].title}
                  </span>
                  <span className="text-[10px] font-mono text-stone-400">
                    CLICK DOOR TO ENTER
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {doorConfigs[hoveredDoor].checklist.map((item, cIdx) => (
                    <div key={cIdx} className="flex items-center gap-2 text-xs font-mono text-stone-300">
                      <span className="w-4 h-4 rounded-full bg-[#E5C158]/20 text-[#E5C158] flex items-center justify-center text-[10px] font-bold">
                        ✓
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* SECTION 3: PROJECT SHOWCASE QUICK PREVIEW GRID */}
      <section 
        id="showcase"
        className="py-24 px-4 sm:px-8 lg:px-16 border-b border-[#DDD6C8] bg-[#FAF8F5] max-w-6xl mx-auto space-y-12"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase text-[#7A7160] font-bold tracking-widest">
              CURATED WORKS
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-black text-[#181818] tracking-tight">
              Aura Botanica & Digital Artifacts
            </h2>
          </div>
          <span className="text-xs font-mono text-[#7A7160]">
            4 Featured Chambers Available
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {assignedProjects.slice(0, 2).map((proj, idx) => (
            <div
              key={idx}
              onClick={() => handleDoorEnter(idx)}
              className="group rounded-2xl bg-[#F4F1EA] border border-[#DDD6C8] hover:border-[#181818] p-6 space-y-4 cursor-pointer transition-all shadow-md hover:shadow-xl"
            >
              <div className="flex items-center justify-between text-xs font-mono text-[#7A7160]">
                <span>CHAMBER 0{idx + 1}</span>
                <span className="font-bold text-[#181818]">View Interior ➔</span>
              </div>

              <h3 className="text-2xl font-serif font-black text-[#181818] group-hover:underline">
                {proj.title}
              </h3>

              <p className="text-xs text-[#5C5343] font-mono leading-relaxed line-clamp-3">
                {proj.description}
              </p>

              <div className="pt-2 flex flex-wrap gap-2">
                {(proj.tags || []).slice(0, 3).map((tag, tIdx) => (
                  <span key={tIdx} className="px-2.5 py-1 rounded-md bg-[#EAE4D5] text-[10px] font-mono text-[#4A4234]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: "LET'S GO BACK IN TIME" STICKY SPLIT TIMELINE WITH 9REM YEAR SCRUBBER */}
      <section 
        id="chronology"
        className="py-24 px-4 sm:px-8 lg:px-16 bg-[#F4F1EA] border-b border-[#DDD6C8]"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Sticky Column: Giant 9rem Year Counter & Scrubber Controls */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase text-[#7A7160] font-bold tracking-widest">
                TIMELINE SCRUBBER
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-black text-[#181818] tracking-tight">
                Let's go back in time.
              </h2>
            </div>

            {/* Giant 9rem Year Display with Animated Sliding Digit Reels */}
            <div className="relative py-4 select-none">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeYear}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -30, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-7xl sm:text-9xl font-serif font-black text-[#181818] tracking-tighter leading-none"
                >
                  {activeYear}
                </motion.div>
              </AnimatePresence>
              <div className="text-xs font-mono text-[#7A7160] mt-2">
                ACTIVE CHRONOLOGICAL MILESTONE
              </div>
            </div>

            {/* Year Scrubber Arrow Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => {
                  asmrAudio.playSwitch();
                  haptics.selection();
                  setSelectedYearIndex((prev) => (prev > 0 ? prev - 1 : yearList.length - 1));
                }}
                className="p-3 rounded-full bg-[#FAF8F5] border border-[#DDD6C8] hover:border-[#181818] text-[#181818] transition-colors cursor-pointer shadow-sm"
                title="Later Year"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={() => {
                  asmrAudio.playSwitch();
                  haptics.selection();
                  setSelectedYearIndex((prev) => (prev + 1) % yearList.length);
                }}
                className="p-3 rounded-full bg-[#FAF8F5] border border-[#DDD6C8] hover:border-[#181818] text-[#181818] transition-colors cursor-pointer shadow-sm"
                title="Earlier Year"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <div className="flex gap-1.5 ml-2">
                {yearList.map((y, idx) => (
                  <button
                    key={y}
                    onClick={() => {
                      asmrAudio.playSwitch();
                      setSelectedYearIndex(idx);
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-mono cursor-pointer transition-colors ${
                      selectedYearIndex === idx
                        ? 'bg-[#181818] text-[#F4F1EA] font-bold'
                        : 'bg-[#EAE4D5] text-[#5C5343] hover:text-[#181818]'
                    }`}
                  >
                    {y}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Experience Milestone Cards */}
          <div className="lg:col-span-7 space-y-6">
            {experiences.map((exp, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                className="p-6 sm:p-8 rounded-2xl bg-[#FAF8F5] border border-[#DDD6C8] hover:border-[#181818] transition-all space-y-3 shadow-md"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E8E2D1] pb-3">
                  <div>
                    <h3 className="text-xl font-serif font-black text-[#181818]">
                      {exp.role}
                    </h3>
                    <span className="text-xs font-mono text-[#7A7160]">
                      {exp.company}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#EAE4D5] text-[#181818]">
                    {exp.period}
                  </span>
                </div>

                <div className="space-y-2 pt-1">
                  {(exp.bullets || []).map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm font-mono text-[#4A4234] leading-relaxed">
                      <span className="text-[#181818] font-bold mt-1">✦</span>
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER: COMMISSION & INQUIRIES */}
      <footer className="py-20 px-4 sm:px-8 text-center bg-[#FAF8F5] border-t border-[#DDD6C8] space-y-6">
        <div className="max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-mono uppercase text-[#7A7160] font-bold tracking-widest">
            COMMISSIONS & ENQUIRIES
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-black text-[#181818] tracking-tight">
            Now Reviewing Commissions
          </h2>
          <p className="text-xs sm:text-sm font-mono text-[#5C5343]">
            Available for select engineering leadership, interactive design direction, and campus placements.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          {p.contactEmail && (
            <a
              href={`mailto:${p.contactEmail}`}
              className="px-8 py-3.5 rounded-full bg-[#181818] hover:bg-[#2e2e2e] text-[#F4F1EA] font-serif font-bold text-sm transition-transform hover:scale-105 active:scale-95 shadow-xl flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              <span>Send Message</span>
            </a>
          )}

          {p.contactEmail && (
            <button
              onClick={handleCopyEmail}
              className="px-6 py-3.5 rounded-full bg-[#EAE4D5] hover:bg-[#ded6c3] border border-[#CFC5B1] text-[#181818] font-mono text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Check className={`w-3.5 h-3.5 ${copiedEmail ? 'text-emerald-600' : 'text-[#7A7160]'}`} />
              <span>{copiedEmail ? 'Copied Email Address!' : 'Copy Email Address'}</span>
            </button>
          )}

          {p.resumeUrl && (
            <a
              href={sanitizeUrl(p.resumeUrl)}
              target="_blank"
              rel="noreferrer"
              download
              className="px-6 py-3.5 rounded-full bg-[#EAE4D5] hover:bg-[#ded6c3] border border-[#CFC5B1] text-[#181818] font-mono text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Resume PDF</span>
            </a>
          )}
        </div>

        <div className="flex items-center justify-center gap-4 pt-6 text-[#7A7160]">
          {p.socialLinks?.github && (
            <a href={sanitizeUrl(p.socialLinks.github)} target="_blank" rel="noreferrer" className="p-3 rounded-full bg-[#EAE4D5] hover:text-[#181818] transition-colors">
              <Github className="w-4 h-4" />
            </a>
          )}
          {p.socialLinks?.linkedin && (
            <a href={sanitizeUrl(p.socialLinks.linkedin)} target="_blank" rel="noreferrer" className="p-3 rounded-full bg-[#EAE4D5] hover:text-[#181818] transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
          )}
        </div>

        <div className="pt-8 border-t border-[#DDD6C8] text-[#8C8270] text-[11px] font-mono">
          © 2026 {p.fullName || 'Clara Vance'} • BEHIND THE DOORS THEME • HOSTED ON PANDALIME
        </div>
      </footer>
    </div>
  );
}
