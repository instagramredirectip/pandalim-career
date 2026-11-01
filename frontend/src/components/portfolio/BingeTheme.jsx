import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Plus, 
  Check, 
  ExternalLink, 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  Download, 
  Sparkles, 
  Briefcase, 
  Code2, 
  Flame, 
  Award, 
  Clock, 
  Eye, 
  Share2, 
  ChevronRight,
  GraduationCap
} from 'lucide-react';
import { sanitizeUrl } from '../../utils/sanitize';
import { asmrAudio } from '../../utils/asmrAudio';
import { haptics } from '../../utils/haptics';

export default function BingeTheme({ portfolio, isPreview = false }) {
  const p = portfolio || {};
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const profiles = [
    { id: 'recruiter', name: 'Recruiter', role: 'Fast-track resume & verified skills', icon: Briefcase, color: 'bg-emerald-500' },
    { id: 'developer', name: 'Developer', role: 'Architecture, code & GitHub repos', icon: Code2, color: 'bg-indigo-500' },
    { id: 'stalker', name: 'Curious Fan', role: 'Binge the whole career journey', icon: Sparkles, color: 'bg-rose-500' },
    { id: 'creator', name: p.fullName ? p.fullName.split(' ')[0] : 'Creator', role: 'Director’s Cut', icon: Eye, color: 'bg-amber-500' }
  ];

  const handleSelectProfile = (profId) => {
    asmrAudio.playPop();
    haptics.medium();
    setSelectedProfile(profId);
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

  // Profile Selection Gate (if not yet picked and not in small preview)
  if (!selectedProfile && !isPreview) {
    return (
      <div className="min-h-screen bg-[#111115] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden select-none">
        {/* Ambient background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-xl z-10 space-y-3 mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/20 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-widest">
            <Flame className="w-3.5 h-3.5" /> PandaLime Original
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white font-serif">
            Who's watching?
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base">
            Choose your viewer mode to personalize your streaming experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-3xl w-full z-10">
          {profiles.map((prof, idx) => {
            const Icon = prof.icon;
            return (
              <motion.button
                key={prof.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => handleSelectProfile(prof.id)}
                className="group flex flex-col items-center text-center p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-red-500/60 hover:bg-zinc-800/80 transition-all cursor-pointer shadow-lg hover:shadow-red-500/20"
              >
                <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl ${prof.color} flex items-center justify-center text-white mb-3 shadow-md group-hover:ring-4 group-hover:ring-red-500/50 transition-all relative overflow-hidden`}>
                  <Icon className="w-9 h-9 sm:w-11 sm:h-11 drop-shadow" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-red-400 transition-colors">
                  {prof.name}
                </h3>
                <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                  {prof.role}
                </p>
              </motion.button>
            );
          })}
        </div>

        <button
          onClick={() => setSelectedProfile('recruiter')}
          className="mt-12 text-xs text-zinc-500 hover:text-zinc-300 underline tracking-wide cursor-pointer transition-colors"
        >
          Skip into default view →
        </button>
      </div>
    );
  }

  const isRecruiterMode = selectedProfile === 'recruiter';

  return (
    <div className="min-h-screen bg-[#0e0e12] text-zinc-100 font-sans selection:bg-red-600 selection:text-white pb-20 overflow-x-hidden">
      {/* Top Streaming Navigation Header */}
      <div className="sticky top-0 z-30 bg-[#0e0e12]/90 backdrop-blur-md border-b border-zinc-800/60 px-4 sm:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="px-2.5 py-1 bg-red-600 text-white font-black text-xs tracking-widest rounded uppercase">
            SERIES
          </div>
          <span className="font-bold text-sm sm:text-base text-white tracking-tight truncate max-w-[160px] sm:max-w-none">
            {p.fullName || 'The Journey'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {selectedProfile && (
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-xs text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span>Mode: <strong className="text-white capitalize">{selectedProfile}</strong></span>
              <button 
                onClick={() => setSelectedProfile(null)}
                className="ml-1 text-zinc-400 hover:text-white underline cursor-pointer text-[10px]"
              >
                Change
              </button>
            </div>
          )}

          {p.contactEmail && (
            <button
              onClick={handleCopyEmail}
              className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-red-600/20"
            >
              {copiedEmail ? <Check className="w-3.5 h-3.5" /> : <Mail className="w-3.5 h-3.5" />}
              <span>{copiedEmail ? 'Copied!' : 'Hire / Contact'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Recruiter Priority Strip (Instant Action) */}
      {isRecruiterMode && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="bg-gradient-to-r from-emerald-950/80 via-zinc-900 to-emerald-950/80 border-b border-emerald-500/30 px-4 sm:px-8 py-3"
        >
          <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
              <Briefcase className="w-4 h-4 shrink-0" />
              <span>Recruiter Fast-Track Enabled: Key candidate signals prioritized below.</span>
            </div>
            <div className="flex items-center gap-2">
              {p.socialLinks?.resumeUrl && (
                <a
                  href={sanitizeUrl(p.socialLinks.resumeUrl)}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1 bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold rounded flex items-center gap-1 transition-colors"
                >
                  <Download className="w-3 h-3" /> Download Resume PDF
                </a>
              )}
              {p.availabilityStatus && (
                <span className="px-2.5 py-1 rounded bg-zinc-800 text-emerald-300 text-xs font-mono border border-emerald-500/30">
                  {p.availabilityStatus}
                </span>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Hero Billboard Banner */}
      <section className="relative px-4 sm:px-8 pt-8 sm:pt-16 pb-12 sm:pb-20 max-w-6xl mx-auto overflow-hidden">
        {/* Cinematic Vignette Backdrop */}
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-red-600/10 via-rose-500/5 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-2 py-0.5 rounded bg-red-600 text-white font-extrabold text-[11px] tracking-wider uppercase">
              TOP 10 TODAY
            </span>
            <span className="text-emerald-400 text-xs font-bold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> 99% Match for Tech Roles
            </span>
            <span className="px-1.5 py-0.5 border border-zinc-700 text-zinc-400 text-[10px] rounded uppercase font-mono">
              CAMPUS READY
            </span>
            <span className="text-zinc-400 text-xs font-mono">
              {p.experience?.length ? `${p.experience.length} Seasons` : 'Debut Season'}
            </span>
          </div>

          <h1 className="text-4xl sm:text-7xl font-black text-white tracking-tight leading-none uppercase">
            {p.fullName || 'Software Engineer'}
          </h1>

          <p className="text-xl sm:text-2xl text-red-400 font-semibold tracking-tight">
            {p.title || 'Full-Stack Developer & Innovator'}
          </p>

          <p className="text-zinc-300 text-base sm:text-lg leading-relaxed line-clamp-3">
            {p.bio || p.tagline || 'Building high-impact products, scalable microservices, and slick user interfaces with clean architecture.'}
          </p>

          {/* Quick Metrics Billboard */}
          {p.metrics && p.metrics.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 pb-2">
              {p.metrics.map((m, idx) => (
                <div key={idx} className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-2.5">
                  <div className="text-xl sm:text-2xl font-black text-white">{m.value}</div>
                  <div className="text-[11px] text-zinc-400 font-medium">{m.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#episodes"
              onClick={() => {
                asmrAudio.playClick();
                haptics.light();
              }}
              className="px-6 py-3 bg-white hover:bg-zinc-200 text-black font-extrabold rounded-md flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-white/10"
            >
              <Play className="w-4 h-4 fill-black" />
              <span>Play Top Episode</span>
            </a>

            {p.socialLinks?.github && (
              <a
                href={sanitizeUrl(p.socialLinks.github)}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-md flex items-center gap-2 border border-zinc-700 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
            )}

            {p.socialLinks?.linkedin && (
              <a
                href={sanitizeUrl(p.socialLinks.linkedin)}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-md flex items-center gap-2 border border-zinc-700 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Featured Projects Episode Strip */}
      <section id="episodes" className="px-4 sm:px-8 py-8 max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div className="space-y-1">
            <div className="text-xs uppercase font-bold tracking-widest text-red-500">
              Season 1 // Releases
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Featured Episodes & Projects
            </h2>
          </div>
          <span className="text-xs text-zinc-400 font-mono">
            {p.projects?.length || 0} Episodes
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {(p.projects || []).map((proj, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="group bg-zinc-900/90 border border-zinc-800 rounded-xl overflow-hidden hover:border-red-500/60 transition-all flex flex-col shadow-xl hover:shadow-red-500/10"
            >
              {/* Episode Header Card */}
              <div className="relative aspect-video bg-gradient-to-br from-zinc-800 to-zinc-950 flex items-center justify-center p-6 border-b border-zinc-800/80 overflow-hidden">
                <div className="absolute top-3 left-3 bg-red-600 text-white font-black text-[10px] px-2 py-0.5 rounded uppercase tracking-wider">
                  EP. {String(idx + 1).padStart(2, '0')}
                </div>
                {proj.metric && (
                  <div className="absolute top-3 right-3 bg-zinc-950/80 border border-zinc-700 text-emerald-400 font-mono text-[10px] px-2 py-0.5 rounded">
                    {proj.metric}
                  </div>
                )}
                
                {/* Visual Play Watermark */}
                <div className="w-12 h-12 rounded-full bg-red-600/90 group-hover:bg-red-500 flex items-center justify-center text-white transition-all shadow-lg group-hover:scale-110">
                  <Play className="w-5 h-5 fill-white ml-0.5" />
                </div>

                {/* Progress bar at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-zinc-800">
                  <div className="h-full bg-red-600 w-full" />
                </div>
              </div>

              {/* Episode Metadata */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors line-clamp-1">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
                    {proj.description}
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  {/* Tags */}
                  {proj.tags && proj.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {proj.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="px-2 py-0.5 rounded bg-zinc-800 text-[11px] text-zinc-300 font-mono">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Links */}
                  <div className="flex items-center gap-2 pt-2 border-t border-zinc-800/60">
                    {proj.demoUrl && (
                      <a
                        href={sanitizeUrl(proj.demoUrl)}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 py-1.5 px-3 bg-red-600/20 hover:bg-red-600/30 text-red-400 hover:text-white border border-red-500/30 text-xs font-bold rounded flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live Preview</span>
                      </a>
                    )}
                    {proj.githubUrl && (
                      <a
                        href={sanitizeUrl(proj.githubUrl)}
                        target="_blank"
                        rel="noreferrer"
                        className="py-1.5 px-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold rounded flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Code</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Skills Universe Section */}
      {skillCategories.length > 0 && (
        <section className="px-4 sm:px-8 py-8 max-w-6xl mx-auto space-y-6">
          <div className="border-b border-zinc-800 pb-3 flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-xs uppercase font-bold tracking-widest text-red-500">
                Cast & Credits
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Skill Universe & Tech Stack
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skillCategories.map(([category, skills], idx) => (
              <div key={idx} className="bg-zinc-900/60 border border-zinc-800 p-5 rounded-xl space-y-3">
                <div className="flex items-center gap-2 text-sm font-bold text-red-400">
                  <Award className="w-4 h-4" />
                  <span>{category}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(skills || []).map((skill, sIdx) => (
                    <span 
                      key={sIdx}
                      className="px-3 py-1 rounded-md bg-zinc-800/80 hover:bg-zinc-700 text-zinc-200 text-xs font-medium border border-zinc-700 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Career Seasons Timeline */}
      {p.experience && p.experience.length > 0 && (
        <section className="px-4 sm:px-8 py-8 max-w-6xl mx-auto space-y-6">
          <div className="border-b border-zinc-800 pb-3 flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-xs uppercase font-bold tracking-widest text-red-500">
                Story Arc
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Seasons & Career Milestones
              </h2>
            </div>
          </div>

          <div className="space-y-4">
            {p.experience.map((exp, idx) => (
              <div 
                key={idx}
                className="bg-zinc-900/60 border border-zinc-800 p-5 sm:p-6 rounded-xl hover:border-zinc-700 transition-colors space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {exp.role} <span className="text-red-400">@ {exp.company}</span>
                    </h3>
                    <p className="text-xs text-zinc-400 font-mono mt-0.5">
                      {exp.period} • {exp.location}
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-zinc-800 border border-zinc-700 text-zinc-300 font-mono text-xs">
                    Season {p.experience.length - idx}
                  </span>
                </div>

                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="space-y-2 pt-2 border-t border-zinc-800/60">
                    {exp.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="text-xs sm:text-sm text-zinc-300 flex items-start gap-2">
                        <span className="text-red-500 font-bold mt-1">▸</span>
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

      {/* Credits Crawl Footer */}
      <footer className="mt-16 border-t border-zinc-800/80 px-4 sm:px-8 py-12 max-w-6xl mx-auto text-center space-y-4">
        <div className="text-xs uppercase tracking-widest text-zinc-500 font-mono">
          DIRECTED & PRODUCED BY
        </div>
        <div className="text-3xl font-black text-white font-serif">
          {p.fullName || 'The Creator'}
        </div>
        <p className="text-sm text-zinc-400 max-w-md mx-auto">
          Ready to bring high impact, clean engineering, and fast shipping to your team.
        </p>
        <div className="pt-2 flex justify-center gap-3">
          {p.contactEmail && (
            <button
              onClick={handleCopyEmail}
              className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded font-bold text-xs flex items-center gap-2 cursor-pointer transition-colors shadow-lg shadow-red-600/20"
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
