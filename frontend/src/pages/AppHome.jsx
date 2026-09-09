import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { 
  ScanSearch, 
  Layers, 
  ArrowRight, 
  CheckCircle2,
  Sparkles,
  ChevronsRight
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import AppLayout from '../components/AppNavigation';
import { haptics } from '../utils/haptics';

// Animation variants for staggered entrance
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } }
};

const floatAnimation = {
  y: [-2, 2, -2],
  transition: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' }
};

// Premium Swipe-to-Proceed Component
const SwipeButton = ({ to, text, colorTheme }) => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [unlocked, setUnlocked] = useState(false);
  
  // Framer Motion values for synchronized animations
  const x = useMotionValue(0);
  const textOpacity = useTransform(x, [0, 150], [1, 0]);
  const textTranslate = useTransform(x, [0, 150], [0, 20]);

  const themes = {
    lime: {
      track: 'bg-lime-950/30 border-lime-500/20',
      thumb: 'bg-lime-500 shadow-[0_0_20px_rgba(132,204,22,0.4)]',
      text: 'text-lime-400',
      icon: 'text-lime-950'
    },
    cyan: {
      track: 'bg-cyan-950/30 border-cyan-500/20',
      thumb: 'bg-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.4)]',
      text: 'text-cyan-400',
      icon: 'text-cyan-950'
    }
  };
  
  const theme = themes[colorTheme];

  const handleDragEnd = (event, info) => {
    const containerWidth = containerRef.current?.offsetWidth || 0;
    const thumbWidth = 56;
    const threshold = containerWidth - thumbWidth - 20;

    if (info.offset.x >= threshold * 0.75) {
      haptics.success();
      setUnlocked(true);
      // Programmatic navigation after a brief success delay
      setTimeout(() => navigate(to), 300);
    } else {
      haptics.light();
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-16 rounded-2xl flex items-center p-1.5 overflow-hidden border ${theme.track} backdrop-blur-md select-none`}
    >
      {/* Animated helper text */}
      <motion.div 
        style={{ opacity: textOpacity, x: textTranslate }} 
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <motion.div 
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className={`flex items-center gap-2 font-bold text-sm uppercase tracking-widest ${theme.text}`}
        >
          <span>{text}</span>
          <ChevronsRight className="w-4 h-4" />
        </motion.div>
      </motion.div>

      {/* Draggable Thumb */}
      <motion.div
        drag={unlocked ? false : 'x'}
        dragConstraints={containerRef}
        dragElastic={0.05}
        dragSnapToOrigin={!unlocked}
        onDragEnd={handleDragEnd}
        style={{ x }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`h-full aspect-square rounded-xl flex items-center justify-center cursor-grab active:cursor-grabbing z-10 ${theme.thumb}`}
      >
        <ArrowRight className={`w-6 h-6 ${theme.icon} ${unlocked ? 'opacity-0' : 'opacity-100'} transition-opacity`} />
        {unlocked && (
           <CheckCircle2 className={`w-6 h-6 absolute ${theme.icon}`} />
        )}
      </motion.div>
    </div>
  );
};

export default function AppHome() {
  return (
    <AppLayout title="Career Tools" showBack={false}>
      <SEOHead 
        title="Career Tools — ATS Resume Scanner & Portfolio Builder"
        description="Scan your resume with AI and build your personal portfolio website in seconds."
        canonical="/app"
      />

      {/* Decorative background glows (optimized for mobile WebView) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-80 h-80 bg-lime-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <motion.div 
        className="space-y-4 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        
        {/* Welcome Header */}
        <motion.div 
          variants={itemVariants}
          className="relative bg-gray-900/70 backdrop-blur-xl border border-gray-800/80 rounded-3xl p-5 sm:p-6 shadow-2xl overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-15 pointer-events-none">
            <Sparkles className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
            Elevate Your Career
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1.5 leading-relaxed max-w-[90%]">
            Select a tool below to scan your resume against industry requirements or launch your interactive portfolio website.
          </p>
        </motion.div>

        {/* Feature 1: ATS Resume Scanner */}
        <motion.div 
          variants={itemVariants}
          className="relative bg-gray-900/70 backdrop-blur-xl border border-gray-800/80 hover:border-lime-500/40 rounded-3xl p-5 sm:p-6 shadow-2xl transition-colors duration-200 group overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-lime-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          <div className="flex items-center gap-3.5 mb-3.5 relative z-10">
            <motion.div 
              animate={floatAnimation}
              className="w-12 h-12 rounded-2xl bg-gradient-to-br from-lime-500/20 to-lime-500/5 border border-lime-500/30 flex items-center justify-center text-lime-400 shrink-0 shadow-md shadow-lime-500/10"
            >
              <ScanSearch className="w-6 h-6" />
            </motion.div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                ATS Resume Scanner
              </h2>
              <p className="text-[11px] font-semibold text-lime-400 mt-0.5 uppercase tracking-wider">AI-Powered Match</p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-4 relative z-10">
            Upload your resume PDF and match it against any job description to discover missing keywords and improve your hiring score instantly.
          </p>

          <div className="space-y-2 mb-6 relative z-10">
            {[
              "Instant 0–100 ATS match score",
              "Missing hard & soft skills analysis",
              "Google X-Y-Z formula bullet rewrites"
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2.5 bg-gray-950/60 rounded-xl p-2.5 border border-gray-800/60">
                <div className="bg-lime-500/20 rounded-full p-0.5 shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-lime-400 shrink-0" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-gray-300">{feature}</span>
              </div>
            ))}
          </div>

          <div className="relative z-10 mt-2">
            <SwipeButton to="/app/scanner" text="Slide to Scan" colorTheme="lime" />
          </div>
        </motion.div>

        {/* Feature 2: Portfolio Builder */}
        <motion.div 
          variants={itemVariants}
          className="relative bg-gray-900/70 backdrop-blur-xl border border-gray-800/80 hover:border-cyan-500/40 rounded-3xl p-5 sm:p-6 shadow-2xl transition-colors duration-200 group overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          <div className="flex items-center gap-3.5 mb-3.5 relative z-10">
            <motion.div 
              animate={floatAnimation}
              className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 shadow-md shadow-cyan-500/10"
            >
              <Layers className="w-6 h-6" />
            </motion.div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                Portfolio Builder
              </h2>
              <p className="text-[11px] font-semibold text-cyan-400 mt-0.5 uppercase tracking-wider">1-Click Publish</p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-4 relative z-10">
            Turn your skills, projects, and work experience into a beautifully published personal website in seconds.
          </p>

          <div className="space-y-2 mb-6 relative z-10">
            {[
              "Custom live public link",
              "Interactive project showcase with demo links",
              "Multiple themes & 1-click resume download"
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2.5 bg-gray-950/60 rounded-xl p-2.5 border border-gray-800/60">
                <div className="bg-cyan-500/20 rounded-full p-0.5 shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-gray-300">{feature}</span>
              </div>
            ))}
          </div>

          <div className="relative z-10 mt-2">
            <SwipeButton to="/app/portfolio" text="Slide to Build" colorTheme="cyan" />
          </div>
        </motion.div>

      </motion.div>
    </AppLayout>
  );
}
