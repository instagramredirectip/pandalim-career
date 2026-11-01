import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Eye, 
  ArrowRight, 
  Sparkles, 
  Play, 
  Disc, 
  Flame, 
  Terminal, 
  Gamepad2, 
  Compass, 
  Sliders 
} from 'lucide-react';
import { asmrAudio } from '../../utils/asmrAudio';
import { haptics } from '../../utils/haptics';

export default function ThemePreviewCard({ 
  theme, 
  isSelected = false, 
  onSelect = null, 
  showActions = true,
  compact = false 
}) {
  const [isHovered, setIsHovered] = useState(false);

  const renderAnimatedPreview = () => {
    switch (theme.id) {
      case 'soundwaves':
        return (
          <div className="relative w-full h-full bg-[#0E0E12] overflow-hidden flex items-center justify-between p-4 rounded-xl border border-[#262626]">
            {/* Equalizer Bars */}
            <div className="flex items-end gap-1.5 h-16 w-1/2">
              {[45, 80, 60, 95, 30, 75, 50, 90].map((h, i) => (
                <motion.div
                  key={i}
                  className="flex-1 rounded-t-sm bg-gradient-to-t from-[#FF2DAB] to-[#D4FF3F]"
                  animate={{
                    height: isHovered 
                      ? [`${h * 0.4}%`, `${h}%`, `${h * 0.6}%`, `${h * 0.9}%`]
                      : [`${h * 0.3}%`, `${h * 0.8}%`, `${h * 0.4}%`]
                  }}
                  transition={{
                    duration: 0.8 + (i * 0.1),
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut'
                  }}
                />
              ))}
            </div>

            {/* Spinning Vinyl */}
            <motion.div
              className="relative w-20 h-20 rounded-full bg-[#18181b] border-2 border-[#27272a] shadow-xl flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: isHovered ? 3 : 8, repeat: Infinity, ease: 'linear' }}
            >
              <div className="w-14 h-14 rounded-full border border-zinc-700 flex items-center justify-center">
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#FF2DAB] to-[#D4FF3F] flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#0B0B0B]" />
                </div>
              </div>
            </motion.div>

            {/* Audio Track Badge */}
            <div className="absolute bottom-2 left-4 text-[10px] font-mono text-[#D4FF3F] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF3F] animate-ping" />
              <span>LIVE AUDIO EQUALIZER</span>
            </div>
          </div>
        );

      case 'binge':
        return (
          <div className="relative w-full h-full bg-[#110505] overflow-hidden flex flex-col justify-between p-4 rounded-xl border border-red-950/60">
            {/* Top Billboard Badge */}
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded bg-red-600 text-white font-black text-[10px] tracking-wider uppercase">
                TOP 10
              </span>
              <span className="text-[10px] font-mono text-zinc-400">EPISODE 01</span>
            </div>

            {/* Profile Gate Miniatures */}
            <div className="flex items-center justify-center gap-3 py-2">
              {['Tech Recruiter', 'Hiring Manager', 'VP Eng'].map((role, i) => (
                <motion.div
                  key={role}
                  whileHover={{ scale: 1.15 }}
                  className="flex flex-col items-center gap-1 cursor-pointer"
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold text-white shadow-md ${
                    i === 0 ? 'bg-red-600 ring-2 ring-red-400' : i === 1 ? 'bg-blue-600' : 'bg-amber-600'
                  }`}>
                    {role[0]}
                  </div>
                  <span className="text-[8px] text-zinc-400 truncate max-w-[48px]">{role}</span>
                </motion.div>
              ))}
            </div>

            {/* Red Netflix Scrub Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-[9px] text-zinc-400 font-mono">
                <span>Who's Watching?</span>
                <span className="text-red-400">98% Match</span>
              </div>
              <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-red-600 rounded-full"
                  animate={{ width: isHovered ? ['20%', '85%', '60%'] : ['15%', '40%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
            </div>
          </div>
        );

      case 'doors':
        return (
          <div className="relative w-full h-full bg-[#121614] overflow-hidden flex items-center justify-center p-3 rounded-xl border border-emerald-950/60 perspective-[600px]">
            {/* 3D Interactive Doors Frame */}
            <div className="flex gap-2 w-full h-full items-center justify-center">
              {[1, 2, 3].map((door) => (
                <div
                  key={door}
                  className="relative flex-1 h-24 rounded-lg bg-[#1c221e] border border-emerald-500/30 overflow-hidden shadow-lg group-hover:border-emerald-400 transition-colors"
                >
                  {/* Inside Room Revelation */}
                  <div className="absolute inset-0 bg-gradient-to-b from-emerald-950 to-[#0e1410] p-1.5 flex flex-col justify-between">
                    <span className="text-[9px] font-mono text-emerald-400 font-bold">ROOM 0{door}</span>
                    <Sparkles className="w-3.5 h-3.5 text-amber-300 self-center" />
                    <span className="text-[8px] text-zinc-400 font-mono text-center">Project</span>
                  </div>

                  {/* 3D Door Leaf */}
                  <motion.div
                    className="absolute inset-0 bg-[#252e28] border-r border-emerald-500/40 p-1.5 flex flex-col justify-between origin-left"
                    animate={{
                      rotateY: isHovered ? (door === 2 ? -75 : -40) : (door === 2 ? -30 : 0)
                    }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-sm" />
                    <div className="text-[8px] font-mono text-zinc-300 font-bold text-center">
                      DOOR {door}
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Bottom Label */}
            <div className="absolute bottom-2 text-[9px] font-mono text-emerald-400 tracking-wider">
              ✦ 3D ARCHITECTURAL DOORS
            </div>
          </div>
        );

      case 'bento':
        return (
          <div className="relative w-full h-full bg-[#0d1117] overflow-hidden flex flex-col justify-between p-3.5 rounded-xl border border-blue-950/60">
            {/* MacOS Window Traffic Lights */}
            <div className="flex items-center justify-between pb-1.5 border-b border-zinc-800">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
              </div>
              <span className="text-[9px] font-mono text-zinc-500">~/workspace/portfolio</span>
            </div>

            {/* Commit Heatmap Grid */}
            <div className="space-y-1 py-1">
              <div className="text-[8px] font-mono text-zinc-400">1,240 contributions this year</div>
              <div className="grid grid-cols-10 gap-1">
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className={`h-2.5 rounded-sm ${
                      i % 3 === 0 
                        ? 'bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]' 
                        : i % 2 === 0 
                          ? 'bg-emerald-600/70' 
                          : 'bg-zinc-800'
                    }`}
                    animate={isHovered ? { opacity: [0.6, 1, 0.7] } : { opacity: 0.9 }}
                    transition={{ duration: 1.2, delay: i * 0.03, repeat: Infinity }}
                  />
                ))}
              </div>
            </div>

            {/* Blinking Shell Line */}
            <div className="flex items-center gap-1 text-[9px] font-mono text-cyan-400">
              <Terminal className="w-3 h-3" />
              <span>$ git push origin main</span>
              <span className="w-1.5 h-3 bg-cyan-400 animate-pulse ml-0.5" />
            </div>
          </div>
        );

      case 'arcade99':
        return (
          <div className="relative w-full h-full bg-[#180922] overflow-hidden flex flex-col justify-between p-3.5 rounded-xl border border-purple-900/60 font-mono">
            {/* Top Retro HUD */}
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-yellow-400 font-black tracking-wider flex items-center gap-1">
                <Gamepad2 className="w-3 h-3" />
                LVL 99 LEGEND
              </span>
              <span className="text-[9px] text-[#FF2DAB] font-black">HP 100/100</span>
            </div>

            {/* HP / MP Gauges */}
            <div className="space-y-1.5 py-1">
              <div className="flex items-center gap-2">
                <span className="text-[8px] text-red-400 w-5">HP</span>
                <div className="flex-1 h-2 bg-zinc-900 rounded-sm overflow-hidden border border-red-900">
                  <motion.div
                    className="h-full bg-gradient-to-r from-red-600 to-orange-500"
                    animate={{ width: isHovered ? ['80%', '100%', '85%'] : '90%' }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[8px] text-cyan-400 w-5">MP</span>
                <div className="flex-1 h-2 bg-zinc-900 rounded-sm overflow-hidden border border-cyan-900">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                    animate={{ width: isHovered ? ['60%', '95%', '70%'] : '80%' }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                  />
                </div>
              </div>
            </div>

            {/* XP Bar */}
            <div className="flex items-center justify-between text-[8px] text-zinc-400">
              <span className="text-[#D4FF3F]">XP 49,200 / 50,000</span>
              <span className="text-yellow-300">INSERT COIN</span>
            </div>
          </div>
        );

      default:
        return (
          <div className="w-full h-full bg-[#141414] rounded-xl flex items-center justify-center">
            <span className="text-xs font-mono text-zinc-500">{theme.name}</span>
          </div>
        );
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      onMouseEnter={() => {
        setIsHovered(true);
        asmrAudio.playPop();
      }}
      onMouseLeave={() => setIsHovered(false)}
      className={`rounded-2xl transition-all flex flex-col justify-between ${
        compact 
          ? 'p-3 bg-[#141414] border' 
          : 'p-5 bg-[#141414] border'
      } ${
        isSelected 
          ? 'border-[#D4FF3F] shadow-[0_0_20px_rgba(212,255,63,0.25)] ring-1 ring-[#D4FF3F]' 
          : 'border-[#262626] hover:border-[#D4FF3F]'
      }`}
    >
      <div className="space-y-3">
        {/* Top Badges */}
        <div className="flex items-center justify-between">
          <span className="px-2.5 py-0.5 rounded-full bg-[#1f1f1f] border border-[#2c2c2c] text-[11px] font-mono text-[#D4FF3F]">
            {theme.badge || theme.vibe}
          </span>
          {isSelected && (
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#D4FF3F] text-black font-bold">
              ACTIVE
            </span>
          )}
        </div>

        {/* Live Animated Canvas Preview Box */}
        <div className={`w-full rounded-xl overflow-hidden shadow-inner ${compact ? 'h-32' : 'h-40'}`}>
          {renderAnimatedPreview()}
        </div>

        {/* Info */}
        <div className="space-y-1">
          <h3 className="text-base sm:text-lg font-black text-white group-hover:text-[#D4FF3F] transition-colors">
            {theme.name}
          </h3>
          <p className="text-xs text-[#FF2DAB] font-mono font-semibold">
            {theme.vibe}
          </p>
          {!compact && (
            <p className="text-xs text-zinc-400 leading-relaxed pt-1 line-clamp-2">
              {theme.desc}
            </p>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      {showActions && (
        <div className="flex items-center gap-2 pt-3 border-t border-[#262626] mt-3">
          <Link
            to={`/p/${theme.demoSlug}`}
            onClick={() => {
              haptics.light();
              asmrAudio.playClick();
            }}
            className="flex-1 py-2 rounded-xl bg-[#1f1f1f] hover:bg-white hover:text-black text-xs font-bold text-center transition-colors flex items-center justify-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Test Drive</span>
          </Link>

          {onSelect ? (
            <button
              onClick={() => {
                haptics.medium();
                asmrAudio.playSwitch();
                onSelect(theme.id);
              }}
              className={`py-2 px-3.5 rounded-xl text-xs font-black transition-all ${
                isSelected
                  ? 'bg-zinc-800 text-zinc-400 cursor-default'
                  : 'bg-[#D4FF3F] hover:bg-[#c2ee2d] text-black hover:scale-105 active:scale-95 shadow-md'
              }`}
            >
              {isSelected ? 'Selected' : 'Use Vibe →'}
            </button>
          ) : (
            <Link
              to="/portfolio-builder"
              onClick={() => {
                haptics.medium();
                asmrAudio.playPop();
              }}
              className="py-2 px-3.5 rounded-xl bg-[#D4FF3F] hover:bg-[#c2ee2d] text-black text-xs font-extrabold transition-transform hover:scale-105 shadow-md"
            >
              Use Vibe →
            </Link>
          )}
        </div>
      )}
    </motion.div>
  );
}

