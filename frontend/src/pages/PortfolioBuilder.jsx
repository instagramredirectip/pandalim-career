import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Upload, 
  Check, 
  Copy, 
  Code2, 
  Briefcase, 
  Layers, 
  Palette, 
  User, 
  ExternalLink, 
  Plus, 
  Trash2, 
  RefreshCw, 
  Smartphone, 
  Tablet, 
  Monitor, 
  Github, 
  Linkedin, 
  MapPin, 
  Volume2, 
  VolumeX, 
  QrCode, 
  X 
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { THEMES, ROLE_PRESETS, PRESET_AVATARS } from '../data/portfolioTemplates';
import { apiRequest } from '../config/api';
import { haptics } from '../utils/haptics';
import { asmrAudio } from '../utils/asmrAudio';
import ThemePreviewCard from '../components/portfolio/ThemePreviewCard';
import BingeTheme from '../components/portfolio/BingeTheme';
import DoorsTheme from '../components/portfolio/DoorsTheme';
import SoundWavesTheme from '../components/portfolio/SoundWavesTheme';
import BentoTheme from '../components/portfolio/BentoTheme';
import ArcadeTheme from '../components/portfolio/ArcadeTheme';

export default function PortfolioBuilder() {
  const defaultPreset = ROLE_PRESETS[0];

  // Portfolio Data State
  const [portfolioData, setPortfolioData] = useState(() => {
    try {
      const saved = localStorage.getItem('pandalime_portfolio_draft');
      if (saved) return JSON.parse(saved);
    } catch {
      // LocalStorage access fallback
    }
    return defaultPreset;
  });

  // UI States
  const [activeDockTab, setActiveDockTab] = useState(null); // 'vibe' | 'about' | 'skills' | 'projects' | 'timeline' | null
  const [viewportMode, setViewportMode] = useState('desktop'); // 'desktop' | 'tablet' | 'mobile'
  const [refreshKey, setRefreshKey] = useState(0);

  // Async States
  const [isParsingPdf, setIsParsingPdf] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isPolishingBio, setIsPolishingBio] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [slugStatus, setSlugStatus] = useState({ state: 'idle', message: '', isOwner: false });
  const [slugErrorAlert, setSlugErrorAlert] = useState('');
  
  // Modals
  const [publishModalOpen, setPublishModalOpen] = useState(false);
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(() => asmrAudio.isEnabled());

  const pdfInputRef = useRef(null);

  // Persist draft to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('pandalime_portfolio_draft', JSON.stringify(portfolioData));
    } catch {
      // LocalStorage access fallback
    }
  }, [portfolioData]);

  // Check URL slug availability
  useEffect(() => {
    const rawSlug = (portfolioData.slug || '').toLowerCase().trim().replace(/[^a-z0-9_-]/g, '-');
    if (!rawSlug || rawSlug.length < 2) {
      setSlugStatus({ state: 'short', message: 'At least 2 characters', isOwner: false });
      return;
    }

    const isPreset = ROLE_PRESETS.some(p => p.slug === rawSlug || p.id === rawSlug);
    if (isPreset) {
      setSlugStatus({ 
        state: 'reserved', 
        message: `"${rawSlug}" is reserved. Pick a unique name.`, 
        isOwner: false 
      });
      return;
    }

    const editKey = localStorage.getItem(`pandalime_portfolio_key_${rawSlug}`) || '';
    setSlugStatus({ state: 'checking', message: 'Checking...', isOwner: false });

    const timeoutId = setTimeout(async () => {
      try {
        const res = await apiRequest(`/api/portfolios/check-availability/${rawSlug}?editKey=${encodeURIComponent(editKey)}`);
        if (res && res.ok) {
          const data = await res.json();
          if (data.available) {
            setSlugStatus({
              state: 'available',
              message: data.isOwner ? '✓ You own this link' : '✓ Available!',
              isOwner: !!data.isOwner
            });
            setSlugErrorAlert('');
          } else {
            setSlugStatus({
              state: data.isReserved ? 'reserved' : 'taken',
              message: data.message || `⚠️ Taken. Try another name.`,
              isOwner: false
            });
          }
        } else {
          setSlugStatus({ state: 'available', message: '✓ Available', isOwner: true });
        }
      } catch {
        setSlugStatus({ state: 'available', message: '✓ Available', isOwner: true });
      }
    }, 350);

    return () => clearTimeout(timeoutId);
  }, [portfolioData.slug]);

  // Sound Toggle
  const toggleSound = () => {
    haptics.selection();
    const nextState = asmrAudio.toggleSound();
    setSoundEnabled(nextState);
    setStatusMessage(nextState ? '🔊 Sound On' : '🔇 Muted');
    setTimeout(() => setStatusMessage(''), 2500);
  };

  // Change generic field
  const handleInputChange = (field, value) => {
    setPortfolioData(prev => {
      const updated = { ...prev, [field]: value };
      if (field === 'fullName' && value.trim()) {
        const isPresetSlug = !prev.slug || ROLE_PRESETS.some(p => p.slug === prev.slug || p.id === prev.slug);
        if (isPresetSlug) {
          const generatedSlug = value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
          if (generatedSlug) updated.slug = generatedSlug;
        }
      }
      return updated;
    });
  };

  // Change social links
  const handleSocialChange = (network, value) => {
    setPortfolioData(prev => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [network]: value }
    }));
  };

  // Preset switch
  const loadPreset = (presetId) => {
    haptics.selection();
    asmrAudio.playSwitch();
    const found = ROLE_PRESETS.find(p => p.id === presetId);
    if (found) {
      setPortfolioData(JSON.parse(JSON.stringify(found)));
      setStatusMessage(`Loaded "${found.title}" profile!`);
      setTimeout(() => setStatusMessage(''), 3000);
    }
  };

  // PDF Resume Upload & Parsing
  const handleResumePdfUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      haptics.warning();
      asmrAudio.playDelete();
      setStatusMessage('⚠️ Please select a valid PDF file.');
      setTimeout(() => setStatusMessage(''), 4000);
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      haptics.warning();
      asmrAudio.playDelete();
      setStatusMessage('⚠️ PDF is too large (max 10MB).');
      setTimeout(() => setStatusMessage(''), 4000);
      return;
    }

    haptics.heavy();
    asmrAudio.playClick();
    setIsParsingPdf(true);
    setStatusMessage('📄 Reading resume PDF...');

    try {
      const formData = new FormData();
      formData.append('resume', file);

      const response = await apiRequest('/api/tools/portfolio-from-resume', {
        method: 'POST',
        body: formData
      });

      if (response && response.ok) {
        const result = await response.json();
        if (result.portfolio) {
          haptics.success();
          asmrAudio.playSparkle();
          setPortfolioData(prev => {
            const incoming = result.portfolio;
            const isPresetSlug = !prev.slug || ROLE_PRESETS.some(p => p.slug === prev.slug || p.id === prev.slug);
            const derivedSlug = isPresetSlug && incoming.fullName
              ? incoming.fullName.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
              : (prev.slug || incoming.slug);

            return {
              ...prev,
              ...incoming,
              slug: derivedSlug || prev.slug || 'my-portfolio',
              socialLinks: {
                ...prev.socialLinks,
                ...(incoming.socialLinks || {})
              },
              skills: incoming.skills && Object.keys(incoming.skills).length > 0 ? incoming.skills : prev.skills,
              projects: incoming.projects && incoming.projects.length > 0 ? incoming.projects : prev.projects,
              experience: incoming.experience && incoming.experience.length > 0 ? incoming.experience : prev.experience
            };
          });
          setStatusMessage('✨ Resume details imported!');
          setActiveDockTab('about');
        } else {
          haptics.warning();
          setStatusMessage(result.error || 'Could not parse resume details.');
        }
      } else {
        const errData = await response.json().catch(() => ({}));
        haptics.warning();
        setStatusMessage(errData.error || 'Failed to read resume PDF.');
      }
    } catch (err) {
      console.error('PDF parsing error:', err);
      haptics.warning();
      setStatusMessage('Failed to upload resume PDF.');
    } finally {
      setIsParsingPdf(false);
      if (e.target) e.target.value = '';
      setTimeout(() => setStatusMessage(''), 5000);
    }
  };

  // Polish bio with AI (human text)
  const handlePolishBio = async () => {
    if (!portfolioData.bio) return;
    haptics.medium();
    asmrAudio.playSparkle();
    setIsPolishingBio(true);
    setStatusMessage('Polishing bio...');
    try {
      const response = await apiRequest('/api/tools/portfolio-ai-assist', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'polish_bio', bio: portfolioData.bio, title: portfolioData.title })
      });
      if (response && response.ok) {
        const result = await response.json();
        if (result.polishedBio) {
          haptics.success();
          asmrAudio.playSparkle();
          handleInputChange('bio', result.polishedBio);
          setStatusMessage('✨ Bio polished!');
        }
      }
    } catch {
      // AI polishing service fallback
    } finally {
      setIsPolishingBio(false);
      setTimeout(() => setStatusMessage(''), 3000);
    }
  };

  // Publish
  const handlePublish = async () => {
    haptics.heavy();
    asmrAudio.playClick();
    const slug = (portfolioData.slug || 'my-portfolio').toLowerCase().trim().replace(/[^a-z0-9_-]/g, '-');
    if (!slug || slug.length < 2) {
      haptics.warning();
      asmrAudio.playDelete();
      setSlugErrorAlert('Enter a valid link name (at least 2 characters).');
      setActiveDockTab('about');
      return;
    }
    if (ROLE_PRESETS.some(p => p.slug === slug || p.id === slug)) {
      haptics.warning();
      asmrAudio.playDelete();
      setSlugErrorAlert(`"${slug}" is reserved. Please pick your own name.`);
      setActiveDockTab('about');
      return;
    }

    setIsPublishing(true);
    setSlugErrorAlert('');
    setStatusMessage('Publishing your site...');

    try {
      const storedKey = localStorage.getItem(`pandalime_portfolio_key_${slug}`) || '';
      const payload = { ...portfolioData, slug, editKey: storedKey };
      const res = await apiRequest('/api/portfolios', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res && res.status === 409) {
        haptics.warning();
        asmrAudio.playDelete();
        const errData = await res.json();
        setSlugErrorAlert(errData.error || `⚠️ That URL is already taken.`);
        setActiveDockTab('about');
        setIsPublishing(false);
        return;
      }
      if (res && res.ok) {
        const resData = await res.json();
        if (resData.editKey) localStorage.setItem(`pandalime_portfolio_key_${slug}`, resData.editKey);
      }
      localStorage.setItem(`pandalime_portfolio_${slug}`, JSON.stringify(payload));
      localStorage.setItem('pandalime_portfolio_draft', JSON.stringify(payload));
      haptics.success();
      asmrAudio.playChime();
      setPublishModalOpen(true);
    } catch {
      localStorage.setItem(`pandalime_portfolio_${slug}`, JSON.stringify({ ...portfolioData, slug }));
      haptics.success();
      asmrAudio.playChime();
      setPublishModalOpen(true);
    } finally {
      setIsPublishing(false);
      setStatusMessage('');
    }
  };

  const publicUrl = `https://www.pandalime.com/p/${portfolioData.slug || 'my-portfolio'}`;
  
  const copyShareLink = () => {
    haptics.success();
    asmrAudio.playPop();
    navigator.clipboard.writeText(publicUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  // Render the active theme engine on center stage
  const renderLiveTheme = () => {
    const activeThemeId = portfolioData.theme || 'soundwaves';
    switch (activeThemeId) {
      case 'binge':
        return <BingeTheme portfolio={portfolioData} />;
      case 'doors':
        return <DoorsTheme portfolio={portfolioData} />;
      case 'bento':
        return <BentoTheme portfolio={portfolioData} />;
      case 'arcade99':
        return <ArcadeTheme portfolio={portfolioData} />;
      case 'soundwaves':
      default:
        return <SoundWavesTheme portfolio={portfolioData} />;
    }
  };

  const dockTabs = [
    { id: 'vibe', label: 'Pick a Vibe', icon: Palette, color: 'text-[#D4FF3F]' },
    { id: 'about', label: 'About You', icon: User, color: 'text-white' },
    { id: 'skills', label: 'Skills', icon: Code2, color: 'text-[#FF2DAB]' },
    { id: 'projects', label: 'Projects', icon: Layers, color: 'text-cyan-400' },
    { id: 'timeline', label: 'Timeline', icon: Briefcase, color: 'text-amber-300' }
  ];

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white font-sans antialiased flex flex-col relative selection:bg-[#D4FF3F] selection:text-black">
      <SEOHead
        title="Portfolio Studio Editor | PandaLime"
        description="Craft, preview, and publish your viral student portfolio in a full-screen distraction-free workspace."
        canonical="/portfolio-builder"
      />

      {/* Hidden PDF file input */}
      <input
        type="file"
        ref={pdfInputRef}
        accept=".pdf"
        onChange={handleResumePdfUpload}
        className="hidden"
      />

      {/* TOP FLOATING GLASS PILL BAR */}
      <header className="sticky top-3 z-40 px-3 sm:px-6 w-full max-w-7xl mx-auto">
        <div className="bg-[#141414]/90 backdrop-blur-xl border border-[#262626] rounded-full px-4 sm:px-6 py-2.5 sm:py-3 shadow-2xl flex items-center justify-between gap-3">
          
          {/* Left: Brand + Status */}
          <div className="flex items-center gap-3">
            <Link 
              to="/portfolios" 
              className="text-base sm:text-lg font-black tracking-tight text-white hover:text-[#D4FF3F] transition-colors flex items-center gap-2"
            >
              <span>PandaLime</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#D4FF3F] inline-block animate-pulse" />
            </Link>

            <button
              onClick={toggleSound}
              className="p-1.5 rounded-full hover:bg-[#262626] text-zinc-400 hover:text-white transition-colors text-xs flex items-center gap-1 cursor-pointer"
              title="Toggle Audio"
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-[#D4FF3F]" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Center: Live Vanity URL pill */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0B0B0B] border border-[#262626] text-xs font-mono">
            <span className="text-zinc-500">pandalime.com/p/</span>
            <span className="text-[#D4FF3F] font-bold">{portfolioData.slug || 'my-portfolio'}</span>
            <button
              onClick={copyShareLink}
              className="ml-1 p-1 hover:text-white text-zinc-400 transition-colors cursor-pointer"
              title="Copy URL"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-[#D4FF3F]" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={() => setQrModalOpen(true)}
              className="p-1 hover:text-white text-zinc-400 transition-colors cursor-pointer"
              title="QR Code"
            >
              <QrCode className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => pdfInputRef.current?.click()}
              disabled={isParsingPdf}
              className="px-3.5 sm:px-4 py-2 rounded-full bg-[#0B0B0B] hover:bg-[#1f1f1f] border border-[#262626] hover:border-[#D4FF3F] text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <Upload className="w-3.5 h-3.5 text-[#D4FF3F]" />
              <span className="hidden sm:inline">
                {isParsingPdf ? 'Reading PDF...' : 'Import Resume PDF'}
              </span>
              <span className="sm:hidden">Import</span>
            </button>

            <button
              onClick={handlePublish}
              disabled={isPublishing}
              className="px-5 py-2 sm:py-2.5 rounded-full bg-[#D4FF3F] hover:bg-[#c2ee2d] text-[#0B0B0B] text-xs sm:text-sm font-black transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(212,255,63,0.3)] flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isPublishing ? 'Publishing...' : 'Publish My Site'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* STATUS TOAST NOTIFICATION */}
      <AnimatePresence>
        {statusMessage && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-[#141414] border border-[#D4FF3F] text-xs font-mono text-white shadow-2xl flex items-center gap-2 pointer-events-none"
          >
            <span>{statusMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CENTER STAGE: FULL-BLEED LIVE CANVAS */}
      <main className="flex-1 flex flex-col items-center justify-start w-full px-2 sm:px-6 pt-4 pb-32 overflow-x-hidden">
        
        {/* Device Switcher & Preview HUD Controls */}
        <div className="w-full max-w-6xl mb-3 flex items-center justify-between px-4 py-2 rounded-2xl bg-[#141414]/60 border border-[#262626] text-xs font-mono">
          <div className="flex items-center gap-2 text-zinc-400">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
            <span className="hidden sm:inline ml-2 text-zinc-500">Live Preview</span>
          </div>

          {/* Viewport switch: Desktop / Tablet / Mobile */}
          <div className="flex items-center gap-1 bg-[#0B0B0B] border border-[#262626] rounded-full p-0.5">
            <button
              onClick={() => {
                asmrAudio.playSwitch();
                setViewportMode('desktop');
              }}
              className={`p-1.5 px-3 rounded-full flex items-center gap-1.5 transition-colors cursor-pointer ${
                viewportMode === 'desktop' ? 'bg-[#262626] text-white font-bold' : 'text-zinc-500 hover:text-zinc-300'
              }`}
              title="Desktop View"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[11px]">Desktop</span>
            </button>

            <button
              onClick={() => {
                asmrAudio.playSwitch();
                setViewportMode('tablet');
              }}
              className={`p-1.5 px-3 rounded-full flex items-center gap-1.5 transition-colors cursor-pointer ${
                viewportMode === 'tablet' ? 'bg-[#262626] text-white font-bold' : 'text-zinc-500 hover:text-zinc-300'
              }`}
              title="Tablet View"
            >
              <Tablet className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[11px]">Tablet</span>
            </button>

            <button
              onClick={() => {
                asmrAudio.playSwitch();
                setViewportMode('mobile');
              }}
              className={`p-1.5 px-3 rounded-full flex items-center gap-1.5 transition-colors cursor-pointer ${
                viewportMode === 'mobile' ? 'bg-[#262626] text-white font-bold' : 'text-zinc-500 hover:text-zinc-300'
              }`}
              title="Mobile View"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[11px]">Mobile</span>
            </button>
          </div>

          {/* Refresh button */}
          <button
            onClick={() => {
              asmrAudio.playPop();
              setRefreshKey(k => k + 1);
            }}
            className="p-1.5 rounded-full hover:bg-[#262626] text-zinc-400 hover:text-white transition-colors cursor-pointer"
            title="Refresh Preview"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Viewport Frame */}
        <motion.div
          key={refreshKey}
          layout
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className={`w-full rounded-3xl border border-[#262626] overflow-hidden shadow-2xl bg-[#0B0B0B] transition-all duration-300 ${
            viewportMode === 'desktop'
              ? 'max-w-6xl'
              : viewportMode === 'tablet'
                ? 'max-w-[768px]'
                : 'max-w-[390px]'
          }`}
        >
          {renderLiveTheme()}
        </motion.div>
      </main>

      {/* MACOS-STYLE FLOATING GLASS DOCK AT THE BOTTOM */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
        <div className="bg-[#141414]/90 backdrop-blur-2xl border border-[#262626] rounded-2xl px-3 sm:px-4 py-2 sm:py-2.5 flex items-center gap-2 sm:gap-3 shadow-2xl">
          {dockTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeDockTab === tab.id;

            return (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.18, y: -4 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => {
                  asmrAudio.playPop();
                  haptics.selection();
                  setActiveDockTab(isActive ? null : tab.id);
                }}
                className={`group relative flex flex-col items-center p-2.5 sm:p-3 rounded-xl transition-all cursor-pointer ${
                  isActive 
                    ? 'bg-[#262626] shadow-lg ring-1 ring-[#D4FF3F]' 
                    : 'hover:bg-[#202020]'
                }`}
              >
                <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${tab.color}`} />

                {/* Floating Tooltip */}
                <span className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-[#0B0B0B] border border-[#262626] text-[11px] font-mono text-white px-2.5 py-1 rounded-md whitespace-nowrap shadow-xl pointer-events-none">
                  {tab.label}
                </span>

                {/* Active Indicator Dot */}
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF3F] mt-1" />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* FLOATING GLASS EDITOR MODAL DRAWER */}
      <AnimatePresence>
        {activeDockTab && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-3xl bg-[#141414]/95 backdrop-blur-2xl border border-[#262626] rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[85vh] overflow-y-auto space-y-6 text-white"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-[#262626] pb-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white capitalize">
                    {dockTabs.find(t => t.id === activeDockTab)?.label}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Live changes are automatically previewed on your canvas behind this panel.
                  </p>
                </div>

                <button
                  onClick={() => {
                    asmrAudio.playPop();
                    setActiveDockTab(null);
                  }}
                  className="p-2 rounded-full hover:bg-[#262626] text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* MODAL TAB 1: PICK A VIBE */}
              {activeDockTab === 'vibe' && (
                <div className="space-y-6">
                  {/* Preset quick-picks */}
                  <div>
                    <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                      Quick Sample Profiles
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {ROLE_PRESETS.map((preset) => (
                        <button
                          key={preset.id}
                          onClick={() => loadPreset(preset.id)}
                          className="px-3 py-1.5 rounded-xl bg-[#0B0B0B] hover:bg-[#1f1f1f] border border-[#262626] hover:border-[#D4FF3F] text-xs font-mono transition-colors text-zinc-300"
                        >
                          {preset.title.split('—')[0].trim()}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 5 Themes Grid with Live Animated Cards */}
                  <div>
                    <label className="text-xs font-mono text-[#D4FF3F] uppercase tracking-wider block mb-3 font-bold">
                      Flagship Themes (Select One)
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {THEMES.map((th) => {
                        const isSelected = (portfolioData.theme || 'soundwaves') === th.id;
                        return (
                          <ThemePreviewCard
                            key={th.id}
                            theme={th}
                            isSelected={isSelected}
                            onSelect={(themeId) => handleInputChange('theme', themeId)}
                            showActions={true}
                            compact={true}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* MODAL TAB 2: ABOUT YOU */}
              {activeDockTab === 'about' && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono text-zinc-400 block mb-1">Full Name</label>
                      <input
                        type="text"
                        value={portfolioData.fullName || ''}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        placeholder="e.g. Alex Rivera"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#0B0B0B] border border-[#262626] focus:border-[#D4FF3F] text-sm text-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono text-zinc-400 block mb-1">Professional Title</label>
                      <input
                        type="text"
                        value={portfolioData.title || ''}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        placeholder="e.g. Full-Stack Engineer & Student"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#0B0B0B] border border-[#262626] focus:border-[#D4FF3F] text-sm text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Vanity URL */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-mono text-zinc-400">Custom Link URL</label>
                      <span className={`text-[11px] font-mono ${
                        slugStatus.state === 'available' ? 'text-[#D4FF3F]' : 'text-red-400'
                      }`}>
                        {slugStatus.message}
                      </span>
                    </div>
                    <div className="flex items-center bg-[#0B0B0B] border border-[#262626] rounded-xl px-4 py-2 text-sm font-mono">
                      <span className="text-zinc-500">pandalime.com/p/</span>
                      <input
                        type="text"
                        value={portfolioData.slug || ''}
                        onChange={(e) => handleInputChange('slug', e.target.value)}
                        placeholder="yourname"
                        className="flex-1 bg-transparent text-[#D4FF3F] font-bold focus:outline-none ml-1"
                      />
                    </div>
                    {slugErrorAlert && (
                      <p className="text-xs text-red-400 mt-1 font-mono">{slugErrorAlert}</p>
                    )}
                  </div>

                  {/* Human Bio */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-mono text-zinc-400">
                        Tell us what you do in one line
                      </label>
                      <button
                        onClick={handlePolishBio}
                        disabled={isPolishingBio || !portfolioData.bio}
                        className="text-xs font-mono text-[#D4FF3F] hover:underline flex items-center gap-1 cursor-pointer disabled:opacity-50"
                      >
                        <Sparkles className="w-3 h-3" />
                        <span>{isPolishingBio ? 'Polishing...' : 'Polish with AI'}</span>
                      </button>
                    </div>
                    <textarea
                      rows={3}
                      value={portfolioData.bio || ''}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      placeholder="e.g. Final year CS student who loves building high-performance apps, distributed systems, and clean UI."
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0B0B0B] border border-[#262626] focus:border-[#D4FF3F] text-sm text-white focus:outline-none resize-none"
                    />
                  </div>

                  {/* Avatar Picker */}
                  <div>
                    <label className="text-xs font-mono text-zinc-400 block mb-2">Avatar</label>
                    <div className="flex items-center gap-3 overflow-x-auto pb-2">
                      {PRESET_AVATARS.map((av, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleInputChange('avatarUrl', av)}
                          className={`w-12 h-12 rounded-full overflow-hidden border-2 transition-transform cursor-pointer shrink-0 ${
                            portfolioData.avatarUrl === av ? 'border-[#D4FF3F] scale-110' : 'border-[#262626] hover:border-zinc-500'
                          }`}
                        >
                          <img src={av} alt="Avatar" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Recruiter Socials */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <div>
                      <label className="text-xs font-mono text-zinc-400 flex items-center gap-1 mb-1">
                        <Github className="w-3.5 h-3.5 text-zinc-300" />
                        <span>GitHub</span>
                      </label>
                      <input
                        type="text"
                        value={portfolioData.socialLinks?.github || ''}
                        onChange={(e) => handleSocialChange('github', e.target.value)}
                        placeholder="https://github.com/..."
                        className="w-full px-3 py-2 rounded-xl bg-[#0B0B0B] border border-[#262626] text-xs text-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono text-zinc-400 flex items-center gap-1 mb-1">
                        <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                        <span>LinkedIn</span>
                      </label>
                      <input
                        type="text"
                        value={portfolioData.socialLinks?.linkedin || ''}
                        onChange={(e) => handleSocialChange('linkedin', e.target.value)}
                        placeholder="https://linkedin.com/in/..."
                        className="w-full px-3 py-2 rounded-xl bg-[#0B0B0B] border border-[#262626] text-xs text-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono text-zinc-400 flex items-center gap-1 mb-1">
                        <MapPin className="w-3.5 h-3.5 text-red-400" />
                        <span>Location</span>
                      </label>
                      <input
                        type="text"
                        value={portfolioData.location || ''}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        placeholder="e.g. San Francisco / Remote"
                        className="w-full px-3 py-2 rounded-xl bg-[#0B0B0B] border border-[#262626] text-xs text-white focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* MODAL TAB 3: SKILLS */}
              {activeDockTab === 'skills' && (
                <div className="space-y-4">
                  {Object.entries(portfolioData.skills || {}).map(([category, skillList]) => (
                    <div key={category} className="p-4 rounded-2xl bg-[#0B0B0B] border border-[#262626] space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-white capitalize">{category}</h4>
                        <span className="text-[10px] font-mono text-zinc-500">Comma-separated</span>
                      </div>
                      <input
                        type="text"
                        value={Array.isArray(skillList) ? skillList.join(', ') : skillList}
                        onChange={(e) => {
                          const updated = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                          setPortfolioData(prev => ({
                            ...prev,
                            skills: { ...prev.skills, [category]: updated }
                          }));
                        }}
                        placeholder="e.g. React, TypeScript, Go, Docker"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#141414] border border-[#262626] focus:border-[#FF2DAB] text-xs sm:text-sm text-white focus:outline-none font-mono"
                      />
                    </div>
                  ))}

                  <button
                    onClick={() => {
                      const catName = prompt('Enter new skill category (e.g. Cloud & Infra, Machine Learning):');
                      if (catName && catName.trim()) {
                        setPortfolioData(prev => ({
                          ...prev,
                          skills: { ...prev.skills, [catName.trim()]: ['Skill 1', 'Skill 2'] }
                        }));
                      }
                    }}
                    className="w-full py-3 rounded-2xl border border-dashed border-[#262626] hover:border-[#D4FF3F] text-xs font-mono text-zinc-400 hover:text-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4 text-[#D4FF3F]" />
                    <span>Add New Skill Category</span>
                  </button>
                </div>
              )}

              {/* MODAL TAB 4: PROJECTS */}
              {activeDockTab === 'projects' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-zinc-400">
                      {portfolioData.projects?.length || 0} Featured Projects
                    </span>
                    <button
                      onClick={() => {
                        const newProj = {
                          title: 'New Featured Project',
                          description: 'Describe what you built, the scale, and the problems you solved.',
                          metric: '🚀 +4x Speedup • 99.9% Uptime',
                          tags: ['React', 'Node.js', 'PostgreSQL'],
                          demoUrl: '',
                          githubUrl: ''
                        };
                        setPortfolioData(prev => ({
                          ...prev,
                          projects: [newProj, ...(prev.projects || [])]
                        }));
                      }}
                      className="px-3.5 py-1.5 rounded-full bg-[#D4FF3F] text-black text-xs font-bold flex items-center gap-1 cursor-pointer hover:scale-105 transition-transform"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Project</span>
                    </button>
                  </div>

                  {(portfolioData.projects || []).map((proj, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-[#0B0B0B] border border-[#262626] space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <input
                          type="text"
                          value={proj.title || ''}
                          onChange={(e) => {
                            const updated = [...portfolioData.projects];
                            updated[idx] = { ...updated[idx], title: e.target.value };
                            setPortfolioData(prev => ({ ...prev, projects: updated }));
                          }}
                          placeholder="Project Title"
                          className="font-bold text-sm bg-transparent border-b border-transparent focus:border-[#D4FF3F] text-white focus:outline-none flex-1"
                        />
                        <button
                          onClick={() => {
                            setPortfolioData(prev => ({
                              ...prev,
                              projects: prev.projects.filter((_, i) => i !== idx)
                            }));
                          }}
                          className="text-zinc-500 hover:text-red-400 p-1 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <textarea
                        rows={2}
                        value={proj.description || ''}
                        onChange={(e) => {
                          const updated = [...portfolioData.projects];
                          updated[idx] = { ...updated[idx], description: e.target.value };
                          setPortfolioData(prev => ({ ...prev, projects: updated }));
                        }}
                        placeholder="Description of the project..."
                        className="w-full px-3 py-2 rounded-xl bg-[#141414] border border-[#262626] text-xs text-zinc-300 focus:outline-none resize-none"
                      />

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] font-mono text-zinc-500 block">High-Impact Metric</label>
                          <input
                            type="text"
                            value={proj.metric || ''}
                            onChange={(e) => {
                              const updated = [...portfolioData.projects];
                              updated[idx] = { ...updated[idx], metric: e.target.value };
                              setPortfolioData(prev => ({ ...prev, projects: updated }));
                            }}
                            placeholder="e.g. ⚡ Reduced latency by 45%"
                            className="w-full px-3 py-1.5 rounded-lg bg-[#141414] border border-[#262626] text-xs text-[#D4FF3F] focus:outline-none font-mono"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] font-mono text-zinc-500 block">Tags (Comma-separated)</label>
                          <input
                            type="text"
                            value={Array.isArray(proj.tags) ? proj.tags.join(', ') : proj.tags || ''}
                            onChange={(e) => {
                              const updated = [...portfolioData.projects];
                              updated[idx] = { ...updated[idx], tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) };
                              setPortfolioData(prev => ({ ...prev, projects: updated }));
                            }}
                            placeholder="React, Redis, Docker"
                            className="w-full px-3 py-1.5 rounded-lg bg-[#141414] border border-[#262626] text-xs text-white focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={proj.githubUrl || ''}
                          onChange={(e) => {
                            const updated = [...portfolioData.projects];
                            updated[idx] = { ...updated[idx], githubUrl: e.target.value };
                            setPortfolioData(prev => ({ ...prev, projects: updated }));
                          }}
                          placeholder="GitHub URL (optional)"
                          className="w-full px-3 py-1.5 rounded-lg bg-[#141414] border border-[#262626] text-xs text-zinc-400 focus:outline-none"
                        />
                        <input
                          type="text"
                          value={proj.demoUrl || ''}
                          onChange={(e) => {
                            const updated = [...portfolioData.projects];
                            updated[idx] = { ...updated[idx], demoUrl: e.target.value };
                            setPortfolioData(prev => ({ ...prev, projects: updated }));
                          }}
                          placeholder="Live Demo URL (optional)"
                          className="w-full px-3 py-1.5 rounded-lg bg-[#141414] border border-[#262626] text-xs text-zinc-400 focus:outline-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* MODAL TAB 5: TIMELINE */}
              {activeDockTab === 'timeline' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-zinc-400">
                      Work Experience & Education Milestones
                    </span>
                    <button
                      onClick={() => {
                        const newExp = {
                          role: 'Software Engineer Intern',
                          company: 'Company or College',
                          period: '2024 - Present',
                          location: 'Remote',
                          bullets: ['Built scalable full-stack features with high test coverage.']
                        };
                        setPortfolioData(prev => ({
                          ...prev,
                          experience: [newExp, ...(prev.experience || [])]
                        }));
                      }}
                      className="px-3.5 py-1.5 rounded-full bg-[#D4FF3F] text-black text-xs font-bold flex items-center gap-1 cursor-pointer hover:scale-105 transition-transform"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Milestone</span>
                    </button>
                  </div>

                  {(portfolioData.experience || []).map((exp, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-[#0B0B0B] border border-[#262626] space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <input
                          type="text"
                          value={exp.role || ''}
                          onChange={(e) => {
                            const updated = [...portfolioData.experience];
                            updated[idx] = { ...updated[idx], role: e.target.value };
                            setPortfolioData(prev => ({ ...prev, experience: updated }));
                          }}
                          placeholder="Role (e.g. SWE Intern)"
                          className="font-bold text-sm bg-transparent border-b border-transparent focus:border-[#D4FF3F] text-white focus:outline-none flex-1"
                        />
                        <button
                          onClick={() => {
                            setPortfolioData(prev => ({
                              ...prev,
                              experience: prev.experience.filter((_, i) => i !== idx)
                            }));
                          }}
                          className="text-zinc-500 hover:text-red-400 p-1 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={exp.company || ''}
                          onChange={(e) => {
                            const updated = [...portfolioData.experience];
                            updated[idx] = { ...updated[idx], company: e.target.value };
                            setPortfolioData(prev => ({ ...prev, experience: updated }));
                          }}
                          placeholder="Company or University"
                          className="px-3 py-1.5 rounded-lg bg-[#141414] border border-[#262626] text-xs text-white focus:outline-none"
                        />
                        <input
                          type="text"
                          value={exp.period || ''}
                          onChange={(e) => {
                            const updated = [...portfolioData.experience];
                            updated[idx] = { ...updated[idx], period: e.target.value };
                            setPortfolioData(prev => ({ ...prev, experience: updated }));
                          }}
                          placeholder="e.g. 2023 - 2024"
                          className="px-3 py-1.5 rounded-lg bg-[#141414] border border-[#262626] text-xs text-zinc-400 focus:outline-none"
                        />
                      </div>

                      {/* Bullets */}
                      <div className="space-y-1.5 pt-1">
                        {(exp.bullets || []).map((bullet, bIdx) => (
                          <div key={bIdx} className="flex items-center gap-2">
                            <span className="text-xs text-[#D4FF3F]">•</span>
                            <input
                              type="text"
                              value={bullet}
                              onChange={(e) => {
                                const updated = [...portfolioData.experience];
                                const updatedBullets = [...updated[idx].bullets];
                                updatedBullets[bIdx] = e.target.value;
                                updated[idx].bullets = updatedBullets;
                                setPortfolioData(prev => ({ ...prev, experience: updated }));
                              }}
                              className="flex-1 px-3 py-1 rounded bg-[#141414] border border-[#262626] text-xs text-zinc-300 focus:outline-none"
                            />
                            <button
                              onClick={() => {
                                const updated = [...portfolioData.experience];
                                updated[idx].bullets = updated[idx].bullets.filter((_, i) => i !== bIdx);
                                setPortfolioData(prev => ({ ...prev, experience: updated }));
                              }}
                              className="text-zinc-500 hover:text-red-400"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => {
                            const updated = [...portfolioData.experience];
                            if (!updated[idx].bullets) updated[idx].bullets = [];
                            updated[idx].bullets.push('Accomplished impact on project.');
                            setPortfolioData(prev => ({ ...prev, experience: updated }));
                          }}
                          className="text-[11px] font-mono text-[#D4FF3F] hover:underline pt-1 block cursor-pointer"
                        >
                          + Add bullet point
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Modal Footer */}
              <div className="border-t border-[#262626] pt-4 flex items-center justify-between">
                <span className="text-xs text-zinc-500 font-mono">
                  Saved automatically
                </span>
                <button
                  onClick={() => {
                    asmrAudio.playPop();
                    setActiveDockTab(null);
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#D4FF3F] hover:bg-[#c2ee2d] text-black font-black text-xs transition-transform hover:scale-105 active:scale-95 cursor-pointer shadow-md"
                >
                  Done & See Live →
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* PUBLISH SUCCESS MODAL */}
      <AnimatePresence>
        {publishModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-lg bg-[#141414] border border-[#262626] rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-6"
            >
              <div className="w-16 h-16 rounded-full bg-[#D4FF3F]/20 text-[#D4FF3F] flex items-center justify-center mx-auto text-2xl">
                🎉
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  Your Portfolio Is Live!
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400">
                  Ready to share on LinkedIn, campus applications, and recruiter emails.
                </p>
              </div>

              {/* URL Box */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-[#0B0B0B] border border-[#262626]">
                <span className="text-xs sm:text-sm font-mono text-[#D4FF3F] truncate mr-2">
                  {publicUrl}
                </span>
                <button
                  onClick={copyShareLink}
                  className="px-3 py-1.5 rounded-xl bg-[#1f1f1f] hover:bg-white hover:text-black text-xs font-bold transition-colors cursor-pointer shrink-0"
                >
                  {copiedLink ? 'Copied!' : 'Copy'}
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={`/p/${portfolioData.slug || 'my-portfolio'}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-3 rounded-full bg-[#D4FF3F] hover:bg-[#c2ee2d] text-black font-black text-sm transition-transform hover:scale-105 flex items-center justify-center gap-1.5"
                >
                  <span>Visit My Live Site</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <button
                  onClick={() => setPublishModalOpen(false)}
                  className="px-6 py-3 rounded-full bg-[#1f1f1f] hover:bg-[#282828] text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Keep Editing
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* QR CODE MODAL */}
      <AnimatePresence>
        {qrModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-sm bg-[#141414] border border-[#262626] rounded-3xl p-6 shadow-2xl text-center space-y-4"
            >
              <div className="flex items-center justify-between border-b border-[#262626] pb-3">
                <span className="text-sm font-bold text-white">Scan with Phone</span>
                <button
                  onClick={() => setQrModalOpen(false)}
                  className="text-zinc-500 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* QR Image via public API */}
              <div className="p-4 bg-white rounded-2xl w-48 h-48 mx-auto flex items-center justify-center">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(publicUrl)}`}
                  alt="Portfolio QR Code"
                  className="w-full h-full object-contain"
                />
              </div>

              <p className="text-xs text-zinc-400 font-mono">
                {publicUrl}
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
