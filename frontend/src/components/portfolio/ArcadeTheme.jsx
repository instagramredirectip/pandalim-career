import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Gamepad2, 
  Swords, 
  Shield, 
  Sparkles, 
  Trophy, 
  ExternalLink, 
  Github, 
  Linkedin, 
  Mail, 
  Download, 
  Flame, 
  Zap, 
  Heart, 
  Coins, 
  Check
} from 'lucide-react';
import { sanitizeUrl } from '../../utils/sanitize';
import { asmrAudio } from '../../utils/asmrAudio';
import { haptics } from '../../utils/haptics';

export default function ArcadeTheme({ portfolio }) {
  const p = portfolio || {};
  const [copiedEmail, setCopiedEmail] = useState(false);

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
    <div className="min-h-screen bg-[#0D071A] text-purple-100 font-sans selection:bg-yellow-400 selection:text-black pb-24 overflow-x-hidden">
      {/* Top Arcade HUD Header */}
      <nav className="sticky top-0 z-40 bg-[#0D071A]/90 backdrop-blur-md border-b-2 border-purple-500/30 px-4 sm:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-yellow-400 text-black flex items-center justify-center font-black shadow-[0_0_12px_rgba(250,204,21,0.4)]">
            <Gamepad2 className="w-5 h-5" />
          </div>
          <div>
            <span className="font-black text-sm tracking-widest text-yellow-400 block font-mono">
              ARCADE 99 // READY
            </span>
            <span className="text-[10px] text-purple-300 font-mono">
              1P: {p.fullName ? p.fullName.toUpperCase() : 'HERO'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {p.socialLinks?.resumeUrl && (
            <a
              href={sanitizeUrl(p.socialLinks.resumeUrl)}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-lg bg-purple-900/60 hover:bg-purple-800 border border-purple-500/40 text-xs font-mono font-bold text-yellow-300 flex items-center gap-1 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Loot Sheet (PDF)</span>
            </a>
          )}
          {p.contactEmail && (
            <button
              onClick={handleCopyEmail}
              className="px-4 py-1.5 rounded-lg bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs font-mono tracking-wider transition-all hover:scale-105 cursor-pointer shadow-[0_0_15px_rgba(250,204,21,0.3)] flex items-center gap-1"
            >
              <Coins className="w-3.5 h-3.5" />
              <span>{copiedEmail ? 'COPIED!' : 'INSERT COIN / HIRE'}</span>
            </button>
          )}
        </div>
      </nav>

      {/* Hero Character Select Screen */}
      <section className="px-4 sm:px-8 pt-10 sm:pt-16 pb-12 max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-1">
          <div className="inline-block px-3 py-1 rounded bg-purple-900/60 border border-purple-500/40 text-[11px] font-mono font-bold text-yellow-400 tracking-widest uppercase">
            ★ CHARACTER SELECT STAGE ★
          </div>
          <h1 className="text-3xl sm:text-6xl font-black text-white tracking-tight uppercase">
            {p.fullName || 'Hero Player'}
          </h1>
          <p className="text-sm sm:text-base text-purple-300 font-mono">
            CLASS: {p.title ? p.title.toUpperCase() : 'MASTER ARCHITECT'}
          </p>
        </div>

        {/* Character Card & HUD Bar Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Avatar with RPG Frame */}
          <div className="relative mx-auto md:mx-0 w-48 h-48 sm:w-56 sm:h-56 rounded-2xl p-2 bg-gradient-to-b from-yellow-400 via-purple-600 to-pink-600 shadow-[0_0_30px_rgba(168,85,247,0.3)]">
            <div className="w-full h-full rounded-xl overflow-hidden bg-black relative">
              <img
                src={p.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80'}
                alt={p.fullName}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 bg-black/80 border border-yellow-400 px-2 py-0.5 rounded text-[10px] font-mono font-bold text-yellow-400">
                LVL 99
              </div>
            </div>
          </div>

          {/* RPG HUD Bars & Stats */}
          <div className="md:col-span-2 space-y-4 bg-[#170E2C]/80 border-2 border-purple-500/40 rounded-2xl p-6 shadow-2xl">
            {/* Health Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono font-bold">
                <span className="flex items-center gap-1 text-red-400">
                  <Heart className="w-3.5 h-3.5 fill-red-400" /> HP (COFFEE ENERGY)
                </span>
                <span className="text-red-300">100 / 100</span>
              </div>
              <div className="h-3 w-full bg-black/60 rounded-full overflow-hidden border border-red-500/30">
                <div className="h-full bg-gradient-to-r from-red-600 to-red-400 w-full" />
              </div>
            </div>

            {/* Mana Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono font-bold">
                <span className="flex items-center gap-1 text-cyan-400">
                  <Zap className="w-3.5 h-3.5 fill-cyan-400" /> MP (CLEAN CODE SYNTAX)
                </span>
                <span className="text-cyan-300">250 / 250</span>
              </div>
              <div className="h-3 w-full bg-black/60 rounded-full overflow-hidden border border-cyan-500/30">
                <div className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 w-full" />
              </div>
            </div>

            {/* Bio summary */}
            <p className="text-xs sm:text-sm text-purple-200 leading-relaxed pt-1">
              {p.bio || p.tagline || 'Veteran technical adventurer skilled in crafting scalable platforms, overcoming bug dragons, and delivering legendary user experiences.'}
            </p>

            {/* Stat Radar Bars */}
            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-purple-500/30">
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-mono text-purple-300">
                  <span>PROBLEM SOLVING</span>
                  <span className="text-yellow-400 font-bold">98%</span>
                </div>
                <div className="h-1.5 bg-black/60 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-400 w-[98%]" />
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-mono text-purple-300">
                  <span>SYSTEM ARCHITECTURE</span>
                  <span className="text-yellow-400 font-bold">92%</span>
                </div>
                <div className="h-1.5 bg-black/60 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-400 w-[92%]" />
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-mono text-purple-300">
                  <span>FRONTEND POLISH</span>
                  <span className="text-yellow-400 font-bold">95%</span>
                </div>
                <div className="h-1.5 bg-black/60 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-400 w-[95%]" />
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-mono text-purple-300">
                  <span>CLOUD & DEPLOY</span>
                  <span className="text-yellow-400 font-bold">89%</span>
                </div>
                <div className="h-1.5 bg-black/60 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-400 w-[89%]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quests Completed (Projects) */}
      <section className="px-4 sm:px-8 py-10 max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between border-b-2 border-purple-500/30 pb-3">
          <div>
            <div className="text-xs font-mono uppercase text-yellow-400 font-bold">QUEST LOG</div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Quests Completed & Bosses Defeated
            </h2>
          </div>
          <span className="text-xs font-mono text-purple-400">
            {projects.length} CLEARED
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((proj, idx) => (
            <div
              key={idx}
              className="bg-[#170E2C]/80 border-2 border-purple-500/40 hover:border-yellow-400 rounded-2xl p-6 transition-all space-y-4 shadow-xl"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-yellow-400/20 border border-yellow-400 text-yellow-400 flex items-center justify-center font-black">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white line-clamp-1">
                      {proj.title}
                    </h3>
                    <span className="text-[10px] font-mono text-purple-300">
                      BOUNTY: +2,500 XP
                    </span>
                  </div>
                </div>

                {proj.metric && (
                  <span className="px-2 py-0.5 rounded bg-yellow-400/20 border border-yellow-400 text-yellow-300 text-[10px] font-mono">
                    {proj.metric}
                  </span>
                )}
              </div>

              <p className="text-xs text-purple-200 leading-relaxed line-clamp-3">
                {proj.description}
              </p>

              {proj.tags && proj.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {proj.tags.map((t, tIdx) => (
                    <span key={tIdx} className="px-2 py-0.5 rounded bg-purple-950/80 text-[10px] font-mono text-purple-300 border border-purple-800">
                      {t}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-2 pt-2 border-t border-purple-500/20">
                {proj.demoUrl && (
                  <a
                    href={sanitizeUrl(proj.demoUrl)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-1.5 bg-yellow-400 hover:bg-yellow-300 text-black font-bold font-mono text-xs rounded-lg flex items-center justify-center gap-1 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> PLAY DEMO
                  </a>
                )}
                {proj.githubUrl && (
                  <a
                    href={sanitizeUrl(proj.githubUrl)}
                    target="_blank"
                    rel="noreferrer"
                    className="py-1.5 px-3 bg-purple-900/60 hover:bg-purple-800 text-purple-200 text-xs font-mono font-semibold rounded-lg flex items-center justify-center gap-1 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" /> REPO
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Inventory Grid for Skills */}
      {skillCategories.length > 0 && (
        <section className="px-4 sm:px-8 py-8 max-w-5xl mx-auto space-y-6">
          <div className="border-b-2 border-purple-500/30 pb-3">
            <div className="text-xs font-mono uppercase text-yellow-400 font-bold">ITEM BAG</div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Skill Inventory & Rarity
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {skillCategories.map(([cat, skills], idx) => (
              <div key={idx} className="bg-[#170E2C]/80 border-2 border-purple-500/40 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-yellow-400">
                  <span>{cat.toUpperCase()}</span>
                  <span className="text-[10px] text-purple-400">LEGENDARY</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {(skills || []).map((sk, sIdx) => (
                    <span key={sIdx} className="px-2.5 py-1 rounded bg-purple-950/90 border border-purple-700 text-xs font-mono text-purple-200">
                      ✦ {sk}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Boss Raid Timeline (Experience) */}
      {p.experience && p.experience.length > 0 && (
        <section className="px-4 sm:px-8 py-8 max-w-5xl mx-auto space-y-6">
          <div className="border-b-2 border-purple-500/30 pb-3">
            <div className="text-xs font-mono uppercase text-yellow-400 font-bold">DUNGEON RAID HISTORY</div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Career Campaigns
            </h2>
          </div>

          <div className="space-y-4">
            {p.experience.map((exp, idx) => (
              <div key={idx} className="bg-[#170E2C]/80 border-2 border-purple-500/40 rounded-xl p-5 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-base font-bold text-white font-mono">
                    {exp.role.toUpperCase()} <span className="text-yellow-400">@ {exp.company.toUpperCase()}</span>
                  </h3>
                  <span className="text-xs font-mono text-purple-300">
                    {exp.period}
                  </span>
                </div>

                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="space-y-1.5 pt-2 border-t border-purple-500/20 text-xs sm:text-sm text-purple-200">
                    {exp.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2">
                        <span className="text-yellow-400 font-bold">⚔</span>
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

      {/* Game Over / Insert Coin Footer */}
      <footer className="mt-16 text-center space-y-3 px-4">
        <div className="text-xs font-mono text-yellow-400 tracking-widest animate-pulse">
          ★ PRESS START TO CO-OP ★
        </div>
        <p className="text-xs text-purple-400 font-mono">
          © 1999-2026 PANDALIME ARCADE EDITION
        </p>
      </footer>
    </div>
  );
}

