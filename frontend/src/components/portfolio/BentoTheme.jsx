import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Terminal, 
  Clock, 
  MapPin, 
  ExternalLink, 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  Download, 
  Sparkles, 
  Code2, 
  Cpu, 
  Layers, 
  FolderGit2, 
  Check, 
  Command, 
  Maximize2
} from 'lucide-react';
import { sanitizeUrl } from '../../utils/sanitize';
import { asmrAudio } from '../../utils/asmrAudio';
import { haptics } from '../../utils/haptics';

export default function BentoTheme({ portfolio }) {
  const p = portfolio || {};
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    asmrAudio.playPop();
    haptics.light();
    if (p.contactEmail) {
      navigator.clipboard.writeText(p.contactEmail);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 3000);
    }
  };

  const projects = p.projects || [];
  const skillCategories = Object.entries(p.skills || {});

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-slate-100 font-sans selection:bg-cyan-500 selection:text-black pb-24 overflow-x-hidden">
      {/* Top macOS Menu Bar */}
      <nav className="sticky top-0 z-40 bg-[#0A0A0F]/80 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-8 py-2.5 flex items-center justify-between text-xs">
        <div className="flex items-center gap-4">
          {/* Traffic Light Dots */}
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
            <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
          </div>

          <div className="flex items-center gap-2 font-bold text-slate-200">
            <Command className="w-3.5 h-3.5 text-cyan-400" />
            <span>Workspace</span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-400 font-mono">{p.fullName || 'portfolio.app'}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 text-slate-400 font-mono text-[11px]">
            <Clock className="w-3 h-3 text-cyan-400" />
            <span>{currentTime || '12:00:00 PM'}</span>
          </div>

          {p.contactEmail && (
            <button
              onClick={handleCopyEmail}
              className="px-3 py-1 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded text-xs transition-colors cursor-pointer shadow-sm shadow-cyan-500/20"
            >
              {copiedEmail ? 'Copied!' : 'Contact'}
            </button>
          )}
        </div>
      </nav>

      {/* Bento Grid Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-8 pt-8 sm:pt-12 space-y-6">
        
        {/* Row 1: Profile Bento (3 cols) & Stats Bento */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Tile 1: Profile & Bio (2 spans) */}
          <div className="lg:col-span-2 bg-[#12131C]/90 border border-slate-800/80 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl flex flex-col sm:flex-row items-center sm:items-start gap-6 relative overflow-hidden group">
            {/* Ambient Cyan Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/15 transition-all" />

            <div className="relative shrink-0">
              <img
                src={p.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80'}
                alt={p.fullName}
                className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl object-cover border-2 border-slate-700 shadow-xl"
              />
              {p.availabilityStatus && (
                <div className="absolute -bottom-2 -right-1 bg-emerald-950/90 border border-emerald-500/40 text-emerald-400 text-[10px] font-mono px-2 py-0.5 rounded-full flex items-center gap-1 shadow">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Online</span>
                </div>
              )}
            </div>

            <div className="space-y-3 text-center sm:text-left flex-1">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-800/80 text-cyan-400 font-mono text-[11px] border border-slate-700">
                <Sparkles className="w-3 h-3" />
                <span>{p.title || 'Senior Software Engineer'}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                {p.fullName || 'Alex Vance'}
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {p.bio || p.tagline || 'Specializing in robust backend systems, distributed architectures, and intuitive modern interfaces.'}
              </p>

              {p.location && (
                <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-slate-400 font-mono pt-1">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{p.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Tile 2: Metrics & Quick Action (1 span) */}
          <div className="bg-[#12131C]/90 border border-slate-800/80 rounded-3xl p-6 backdrop-blur-xl shadow-2xl flex flex-col justify-between space-y-4">
            <div>
              <div className="text-xs font-mono uppercase text-slate-400 font-bold mb-3">
                SYSTEM TELEMETRY
              </div>
              <div className="grid grid-cols-2 gap-3">
                {(p.metrics || [
                  { label: 'Repos Shipped', value: '38+' },
                  { label: 'Code Reviews', value: '250+' },
                  { label: 'Uptime Score', value: '99.9%' },
                  { label: 'Years Exp', value: '4+' }
                ]).map((m, idx) => (
                  <div key={idx} className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 text-center">
                    <div className="text-xl font-black text-white">{m.value}</div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-800">
              {p.socialLinks?.resumeUrl && (
                <a
                  href={sanitizeUrl(p.socialLinks.resumeUrl)}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-md shadow-cyan-500/10"
                >
                  <Download className="w-3.5 h-3.5" /> Download Full Resume
                </a>
              )}
              {p.contactEmail && (
                <button
                  onClick={handleCopyEmail}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{copiedEmail ? 'Email Copied!' : 'Copy Contact Email'}</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Row 2: Simulated Contribution Heatmap & Terminal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Tile 3: GitHub Activity Heatmap Tile (2 spans) */}
          <div className="lg:col-span-2 bg-[#12131C]/90 border border-slate-800/80 rounded-3xl p-6 backdrop-blur-xl shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FolderGit2 className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-bold text-white">Consistent Shipping Activity</span>
              </div>
              <span className="text-xs text-slate-400 font-mono">1,420 Commits This Year</span>
            </div>

            {/* Simulated Heatmap Blocks */}
            <div className="overflow-x-auto pb-1">
              <div className="grid grid-flow-col grid-rows-7 gap-1 min-w-[500px]">
                {[...Array(154)].map((_, i) => {
                  const intensity = (i * 7 + 13) % 5;
                  const colors = [
                    'bg-slate-800/60',
                    'bg-cyan-950',
                    'bg-cyan-800',
                    'bg-cyan-600',
                    'bg-cyan-400'
                  ];
                  return (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-[2px] ${colors[intensity]} hover:ring-1 hover:ring-white transition-all`}
                    />
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span>Less</span>
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 bg-slate-800 rounded-[2px]" />
                <span className="w-2.5 h-2.5 bg-cyan-950 rounded-[2px]" />
                <span className="w-2.5 h-2.5 bg-cyan-800 rounded-[2px]" />
                <span className="w-2.5 h-2.5 bg-cyan-600 rounded-[2px]" />
                <span className="w-2.5 h-2.5 bg-cyan-400 rounded-[2px]" />
              </div>
              <span>More</span>
            </div>
          </div>

          {/* Tile 4: Interactive Terminal (1 span) */}
          <div className="bg-[#0D0E15] border border-slate-800/80 rounded-3xl p-5 font-mono text-xs text-slate-300 space-y-3 shadow-2xl flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
              <span className="text-[10px] text-slate-500">zsh // macos</span>
            </div>

            <div className="space-y-2 flex-1">
              <div className="text-cyan-400">
                $ whoami
              </div>
              <div className="text-slate-300 pl-2">
                "{p.fullName || 'Engineer'}"
              </div>
              <div className="text-cyan-400">
                $ cat mission.txt
              </div>
              <div className="text-slate-400 pl-2 line-clamp-3">
                {p.tagline || 'Building software that recruiters remember and users love.'}
              </div>
            </div>

            <div className="flex items-center gap-1 text-[11px] text-slate-500 pt-2 border-t border-slate-800">
              <span className="text-emerald-400">●</span>
              <span>Available for Hire</span>
            </div>
          </div>
        </div>

        {/* Row 3: Featured Projects Showcase */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <Code2 className="w-5 h-5 text-cyan-400" />
              <span>Featured Engineering Projects</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((proj, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                className="bg-[#12131C]/90 border border-slate-800/80 hover:border-cyan-400/60 rounded-3xl p-6 backdrop-blur-xl shadow-xl flex flex-col justify-between space-y-4 transition-all"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-cyan-400 border border-slate-700">
                      PROJECT // 0{idx + 1}
                    </span>
                    {proj.metric && (
                      <span className="text-[10px] font-mono text-emerald-400">
                        {proj.metric}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-white line-clamp-1">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {proj.description}
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  {proj.tags && proj.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {proj.tags.map((t, tIdx) => (
                        <span key={tIdx} className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 text-[10px] font-mono border border-slate-800">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
                    {proj.demoUrl && (
                      <a
                        href={sanitizeUrl(proj.demoUrl)}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 py-1.5 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 text-xs font-bold rounded-xl flex items-center justify-center gap-1 transition-colors border border-cyan-500/20"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                      </a>
                    )}
                    {proj.githubUrl && (
                      <a
                        href={sanitizeUrl(proj.githubUrl)}
                        target="_blank"
                        rel="noreferrer"
                        className="py-1.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl flex items-center justify-center gap-1 transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Row 4: macOS Dock for Skills */}
        {skillCategories.length > 0 && (
          <div className="bg-[#12131C]/90 border border-slate-800/80 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-mono uppercase text-cyan-400 font-bold">
                APPLICATION DOCK // SKILLS
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {Object.values(p.skills || {}).reduce((acc, l) => acc + (l?.length || 0), 0)} Technologies Installed
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {skillCategories.map(([cat, skills], idx) => (
                <div key={idx} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 space-y-2">
                  <span className="text-xs font-bold text-slate-200 block">{cat}</span>
                  <div className="flex flex-wrap gap-1.5">
                    {(skills || []).map((sk, sIdx) => (
                      <span key={sIdx} className="px-2.5 py-1 rounded-lg bg-slate-800/80 text-xs text-slate-300 font-mono hover:text-cyan-400 transition-colors">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Row 5: Experience Timeline */}
        {p.experience && p.experience.length > 0 && (
          <div className="bg-[#12131C]/90 border border-slate-800/80 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-5">
            <div className="text-xs font-mono uppercase text-cyan-400 font-bold border-b border-slate-800 pb-3">
              CAREER COMMITS // EXPERIENCE
            </div>

            <div className="space-y-4">
              {p.experience.map((exp, idx) => (
                <div key={idx} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-base font-bold text-white">
                      {exp.role} <span className="text-cyan-400">@ {exp.company}</span>
                    </h3>
                    <span className="text-xs text-slate-400 font-mono">
                      {exp.period} • {exp.location}
                    </span>
                  </div>

                  {exp.bullets && exp.bullets.length > 0 && (
                    <ul className="space-y-1.5 pt-2 border-t border-slate-800 text-xs sm:text-sm text-slate-300">
                      {exp.bullets.map((b, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2">
                          <span className="text-cyan-400 font-bold mt-0.5">›</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Dock Bar Footer */}
      <footer className="mt-16 text-center space-y-3 px-4">
        <p className="text-xs text-slate-500 font-mono">
          DESIGNED FOR MACOS WORKSPACE // CRAFTED WITH PANDALIME
        </p>
        <div className="flex justify-center gap-2 text-slate-400">
          {p.socialLinks?.github && (
            <a href={sanitizeUrl(p.socialLinks.github)} target="_blank" rel="noreferrer" className="p-2 hover:text-white">
              <Github className="w-4 h-4" />
            </a>
          )}
          {p.socialLinks?.linkedin && (
            <a href={sanitizeUrl(p.socialLinks.linkedin)} target="_blank" rel="noreferrer" className="p-2 hover:text-white">
              <Linkedin className="w-4 h-4" />
            </a>
          )}
          {p.socialLinks?.twitter && (
            <a href={sanitizeUrl(p.socialLinks.twitter)} target="_blank" rel="noreferrer" className="p-2 hover:text-white">
              <Twitter className="w-4 h-4" />
            </a>
          )}
        </div>
      </footer>
    </div>
  );
}
