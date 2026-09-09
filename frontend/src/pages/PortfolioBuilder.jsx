import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Eye, 
  Download, 
  Upload, 
  Check, 
  Copy, 
  Code2, 
  Briefcase, 
  Layers, 
  Palette, 
  User, 
  Globe, 
  ExternalLink, 
  Plus, 
  Trash2, 
  RefreshCw, 
  Zap, 
  Smartphone, 
  Monitor,
  Terminal,
  Github,
  Linkedin,
  Twitter,
  MapPin,
  CheckCircle2,
  AlertCircle,
  FileText
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { THEMES, ACCENT_COLORS, PRESET_AVATARS, ROLE_PRESETS } from '../data/portfolioTemplates';
import { apiRequest } from '../config/api';
import { AppHeader, AppBottomNav } from '../components/AppNavigation';
import { haptics } from '../utils/haptics';

// Framer Motion Variants for smooth UI transitions
const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
  exit: { opacity: 0, scale: 0.96, transition: { duration: 0.15 } }
};

const listContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 }
  }
};

export default function PortfolioBuilder({ isAppMode: propAppMode = false }) {
  const location = useLocation();
  const isAppMode = propAppMode || location.pathname.startsWith('/app') || location.search.includes('app=true');
  const defaultPreset = ROLE_PRESETS[0];

  // Portfolio State
  const [portfolioData, setPortfolioData] = useState(() => {
    try {
      const saved = localStorage.getItem('pandalime_portfolio_draft');
      if (saved) return JSON.parse(saved);
    } catch {
      // LocalStorage access fallback
    }
    return defaultPreset;
  });

  // UI State
  const [activeTab, setActiveTab] = useState('theme'); 
  const [previewMode, setPreviewMode] = useState('desktop'); 
  const [mobileView, setMobileView] = useState('editor'); 
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [isParsingPdf, setIsParsingPdf] = useState(false);
  const [isPolishingBio, setIsPolishingBio] = useState(false);
  const [publishModalOpen, setPublishModalOpen] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [slugStatus, setSlugStatus] = useState({ state: 'idle', message: '', isOwner: false });
  const [slugErrorAlert, setSlugErrorAlert] = useState('');

  const pdfInputRef = useRef(null);

  useEffect(() => {
    try {
      localStorage.setItem('pandalime_portfolio_draft', JSON.stringify(portfolioData));
    } catch {
      // LocalStorage access fallback
    }
  }, [portfolioData]);

  useEffect(() => {
    const rawSlug = (portfolioData.slug || '').toLowerCase().trim().replace(/[^a-z0-9_-]/g, '-');
    if (!rawSlug || rawSlug.length < 2) {
      setSlugStatus({ state: 'short', message: 'Must be at least 2 characters', isOwner: false });
      return;
    }

    const isPreset = ROLE_PRESETS.some(p => p.slug === rawSlug || p.id === rawSlug);
    if (isPreset) {
      setSlugStatus({ 
        state: 'reserved', 
        message: `"${rawSlug}" is reserved. Pick a unique URL.`, 
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
              message: data.isOwner ? '✓ You own this URL' : '✓ Available!',
              isOwner: !!data.isOwner
            });
            setSlugErrorAlert('');
          } else {
            setSlugStatus({
              state: data.isReserved ? 'reserved' : 'taken',
              message: data.message || `⚠️ Taken. Choose another.`,
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

  const loadPreset = (presetId) => {
    haptics.selection();
    const found = ROLE_PRESETS.find(p => p.id === presetId);
    if (found) {
      setPortfolioData(JSON.parse(JSON.stringify(found)));
      setStatusMessage(`Loaded "${found.title}" preset!`);
      setTimeout(() => setStatusMessage(''), 3000);
    }
  };

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

  const handleSocialChange = (network, value) => {
    setPortfolioData(prev => ({
      ...prev, socialLinks: { ...prev.socialLinks, [network]: value }
    }));
  };

  const handleProjectChange = (index, field, value) => {
    const updated = [...(portfolioData.projects || [])];
    updated[index] = { ...updated[index], [field]: value };
    setPortfolioData(prev => ({ ...prev, projects: updated }));
  };

  const addProject = () => {
    haptics.medium();
    const newProj = {
      title: 'New Project',
      description: 'Describe your technical contribution and architecture here.',
      metric: '🚀 Add impact metric',
      tags: ['React', 'Node.js'],
      demoUrl: '', githubUrl: ''
    };
    setPortfolioData(prev => ({ ...prev, projects: [newProj, ...(prev.projects || [])] }));
  };

  const removeProject = (index) => {
    haptics.warning();
    setPortfolioData(prev => ({ ...prev, projects: prev.projects.filter((_, i) => i !== index) }));
  };

  const handleExperienceChange = (index, field, value) => {
    const updated = [...(portfolioData.experience || [])];
    updated[index] = { ...updated[index], [field]: value };
    setPortfolioData(prev => ({ ...prev, experience: updated }));
  };

  const handleExperienceBulletChange = (expIndex, bulletIndex, value) => {
    const updated = [...(portfolioData.experience || [])];
    const bullets = [...updated[expIndex].bullets];
    bullets[bulletIndex] = value;
    updated[expIndex].bullets = bullets;
    setPortfolioData(prev => ({ ...prev, experience: updated }));
  };

  const addExperienceBullet = (expIndex) => {
    haptics.light();
    const updated = [...(portfolioData.experience || [])];
    if (!updated[expIndex].bullets) updated[expIndex].bullets = [];
    updated[expIndex].bullets.push('Accomplished [X] quantified by [Y] using [Z].');
    setPortfolioData(prev => ({ ...prev, experience: updated }));
  };

  const removeExperienceBullet = (expIndex, bulletIndex) => {
    haptics.warning();
    const updated = [...(portfolioData.experience || [])];
    updated[expIndex].bullets = updated[expIndex].bullets.filter((_, i) => i !== bulletIndex);
    setPortfolioData(prev => ({ ...prev, experience: updated }));
  };

  const addExperience = () => {
    haptics.medium();
    const newExp = {
      role: 'Software Engineer', company: 'Company Name', period: '2023 - Present', location: 'Remote',
      bullets: ['Spearheaded core feature architecture and optimized performance by 40%.']
    };
    setPortfolioData(prev => ({ ...prev, experience: [newExp, ...(prev.experience || [])] }));
  };

  const removeExperience = (index) => {
    haptics.warning();
    setPortfolioData(prev => ({ ...prev, experience: prev.experience.filter((_, i) => i !== index) }));
  };

  const handleSkillsChange = (category, skillsCsv) => {
    const skillList = skillsCsv.split(',').map(s => s.trim()).filter(Boolean);
    setPortfolioData(prev => ({ ...prev, skills: { ...prev.skills, [category]: skillList } }));
  };

  const addSkillCategory = () => {
    haptics.medium();
    const categoryName = prompt('Enter new skill category name (e.g. Cloud & DevOps, Languages, Tools):');
    if (categoryName && categoryName.trim()) {
      setPortfolioData(prev => ({
        ...prev, skills: { ...prev.skills, [categoryName.trim()]: ['Skill 1', 'Skill 2'] }
      }));
    }
  };

  const removeSkillCategory = (category) => {
    haptics.warning();
    const updated = { ...portfolioData.skills };
    delete updated[category];
    setPortfolioData(prev => ({ ...prev, skills: updated }));
  };

  const handleResumePdfUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      haptics.warning();
      setStatusMessage('⚠️ Please select a valid PDF resume.');
      setTimeout(() => setStatusMessage(''), 4000);
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      haptics.warning();
      setStatusMessage('⚠️ PDF is too large (max 10MB).');
      setTimeout(() => setStatusMessage(''), 4000);
      return;
    }

    haptics.heavy();
    setIsParsingPdf(true);
    setStatusMessage('📄 Extracting career & skills from resume PDF...');

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
          setStatusMessage('✨ Auto-filled 100% of portfolio from resume PDF!');
          setActiveTab('profile');
        } else {
          haptics.warning();
          setStatusMessage(result.error || 'Could not parse resume details.');
        }
      } else {
        const errData = await response.json().catch(() => ({}));
        haptics.warning();
        setStatusMessage(errData.error || 'Failed to parse resume PDF.');
      }
    } catch (err) {
      console.error('PDF parsing error:', err);
      haptics.warning();
      setStatusMessage('Failed to upload/parse resume PDF.');
    } finally {
      setIsParsingPdf(false);
      if (e.target) e.target.value = '';
      setTimeout(() => setStatusMessage(''), 5000);
    }
  };

  const handleGenerateFromAi = async () => {
    if (!aiPrompt.trim()) return;
    haptics.heavy();
    setIsGeneratingAi(true);
    setStatusMessage('Crafting customized portfolio with AI...');
    try {
      const response = await apiRequest('/api/tools/portfolio-ai-assist', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'generate_from_prompt', prompt: aiPrompt, currentData: portfolioData })
      });
      if (response && response.ok) {
        const result = await response.json();
        if (result.portfolio) {
          haptics.success();
          setPortfolioData(prev => ({ ...prev, ...result.portfolio, slug: prev.slug || result.portfolio.slug }));
          setStatusMessage('✨ Generated successfully!');
        }
      } else {
        heuristicGenerate(aiPrompt);
      }
    } catch {
      heuristicGenerate(aiPrompt);
    } finally {
      setIsGeneratingAi(false);
      setTimeout(() => setStatusMessage(''), 4000);
    }
  };

  const heuristicGenerate = (promptText) => {
    const lower = promptText.toLowerCase();
    let matchedPreset = ROLE_PRESETS[0];
    if (lower.includes('cyber') || lower.includes('security')) matchedPreset = ROLE_PRESETS.find(p => p.id === 'cybersecurity');
    else if (lower.includes('ai') || lower.includes('ml') || lower.includes('data')) matchedPreset = ROLE_PRESETS.find(p => p.id === 'ai_ml');
    else if (lower.includes('devops') || lower.includes('cloud')) matchedPreset = ROLE_PRESETS.find(p => p.id === 'devops');
    else if (lower.includes('fresher') || lower.includes('student')) matchedPreset = ROLE_PRESETS.find(p => p.id === 'fresher');
    else if (lower.includes('design') || lower.includes('ui')) matchedPreset = ROLE_PRESETS.find(p => p.id === 'designer');
    else matchedPreset = ROLE_PRESETS.find(p => p.id === 'fullstack');

    haptics.success();
    setPortfolioData(prev => ({ 
      ...JSON.parse(JSON.stringify(matchedPreset)), 
      tagline: `⚡ ${promptText.slice(0, 70)}...`, 
      slug: prev.slug || matchedPreset.slug 
    }));
    setStatusMessage('✨ Generated custom profile!');
  };

  const handlePolishBio = async () => {
    if (!portfolioData.bio) return;
    haptics.medium();
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

  const handlePublish = async () => {
    haptics.heavy();
    const slug = (portfolioData.slug || 'my-portfolio').toLowerCase().trim().replace(/[^a-z0-9_-]/g, '-');
    if (!slug || slug.length < 2) {
      haptics.warning();
      setSlugErrorAlert('Enter a valid vanity URL (at least 2 characters).');
      setActiveTab('theme');
      return;
    }
    if (ROLE_PRESETS.some(p => p.slug === slug || p.id === slug)) {
      haptics.warning();
      setSlugErrorAlert(`"${slug}" is reserved. Use your own name.`);
      setActiveTab('theme');
      return;
    }

    setIsPublishing(true);
    setSlugErrorAlert('');
    setStatusMessage('Publishing portfolio...');

    try {
      const storedKey = localStorage.getItem(`pandalime_portfolio_key_${slug}`) || '';
      const payload = { ...portfolioData, slug, editKey: storedKey };
      const res = await apiRequest('/api/portfolios', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res && res.status === 409) {
        haptics.warning();
        const errData = await res.json();
        setSlugErrorAlert(errData.error || `⚠️ URL taken.`);
        setActiveTab('theme');
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
      setPublishModalOpen(true);
    } catch {
      localStorage.setItem(`pandalime_portfolio_${slug}`, JSON.stringify({ ...portfolioData, slug }));
      haptics.success();
      setPublishModalOpen(true);
    } finally {
      setIsPublishing(false);
      setStatusMessage('');
    }
  };

  const handleExportJson = () => {
    haptics.light();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(portfolioData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${portfolioData.slug || 'portfolio'}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJson = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    haptics.light();
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (parsed.fullName) {
          haptics.success();
          setPortfolioData(parsed);
          setStatusMessage('✓ Imported successfully!');
          setTimeout(() => setStatusMessage(''), 3000);
        }
      } catch { 
        haptics.warning();
        alert('Invalid JSON format.'); 
      }
    };
    reader.readAsText(file);
  };

  const publicUrl = `https://www.pandalime.com/p/${portfolioData.slug || 'my-portfolio'}`;
  const copyShareLink = () => {
    haptics.success();
    navigator.clipboard.writeText(publicUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const selectedTheme = THEMES.find(t => t.id === portfolioData.theme) || THEMES[0];
  const selectedAccent = ACCENT_COLORS.find(c => c.id === portfolioData.accentColor) || ACCENT_COLORS[0];

  const TABS = [
    { id: 'theme', icon: Palette, label: 'Theme' },
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'social', icon: Globe, label: 'Links' },
    { id: 'skills', icon: Code2, label: 'Skills' },
    { id: 'projects', icon: Layers, label: 'Projects' },
    { id: 'experience', icon: Briefcase, label: 'Career' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 flex flex-col font-sans w-full max-w-full overflow-x-hidden selection:bg-lime-500/30">
      <SEOHead 
        title="AI Developer & Cyber Portfolio Builder | Free Hosted Portfolio Page | PandaLime"
        description="Build and host your developer or cyber portfolio on pandalime.com/p/:username. Choose from 5 modern themes with instant AI prompts and QR code sharing."
        canonical="/portfolio-builder"
      />

      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-lime-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px]" />
      </div>

      {isAppMode ? (
        <div className="relative z-40">
          <AppHeader 
            title="Portfolio Builder" 
            showBack={true} 
            rightAction={
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    haptics.selection();
                    setMobileView(mobileView === 'editor' ? 'preview' : 'editor');
                  }}
                  className="text-[11px] font-bold text-gray-300 bg-gray-900 border border-gray-700 px-2.5 py-1.5 rounded-lg flex items-center gap-1 active:scale-95 transition-all cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{mobileView === 'editor' ? 'Preview' : 'Editor'}</span>
                </button>

                <button
                  onClick={handlePublish}
                  disabled={isPublishing}
                  className="px-3 py-1.5 bg-gradient-to-r from-lime-500 to-lime-400 text-gray-950 font-black text-[11px] rounded-lg shadow-md shadow-lime-500/20 flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shrink-0"
                >
                  {isPublishing ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Globe className="w-3 h-3" />}
                  <span>Publish</span>
                </button>
              </div>
            }
          />
        </div>
      ) : (
        <header className="bg-[#0a0a0a]/70 border-b border-white/5 sticky top-0 z-40 backdrop-blur-2xl px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Link 
                to="/" 
                onClick={() => haptics.light()}
                className="flex items-center gap-2 font-black text-white text-lg tracking-tight hover:opacity-80 transition-opacity"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-lime-400 to-lime-600 rounded-lg flex items-center justify-center text-gray-900 shadow-[0_0_15px_rgba(163,230,53,0.3)]">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="hidden sm:inline">PandaLime</span>
              </Link>
              <div className="flex items-center gap-2 ml-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-lime-400 bg-lime-500/10 border border-lime-500/20 px-2 py-0.5 rounded-full">
                  Studio
                </span>
                <AnimatePresence>
                  {statusMessage && (
                    <motion.span 
                      initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                      className="text-xs font-semibold text-lime-400 hidden md:inline"
                    >
                      {statusMessage}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <div className="lg:hidden flex bg-gray-900/80 rounded-xl p-1 border border-white/5 text-xs font-bold shadow-inner">
                {['editor', 'preview'].map(view => (
                  <button
                    key={view} 
                    onClick={() => {
                      haptics.selection();
                      setMobileView(view);
                    }}
                    className={`px-3 py-1.5 rounded-lg transition-all capitalize ${mobileView === view ? 'bg-white/10 text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
                  >
                    {view}
                  </button>
                ))}
              </div>

              <div className="hidden lg:flex items-center bg-gray-900/80 rounded-xl p-1 border border-white/5 shadow-inner">
                {[{id:'desktop', icon: Monitor}, {id:'mobile', icon: Smartphone}].map(mode => (
                  <button
                    key={mode.id} 
                    onClick={() => {
                      haptics.selection();
                      setPreviewMode(mode.id);
                    }}
                    className={`p-2 rounded-lg transition-all ${previewMode === mode.id ? 'bg-white/10 text-lime-400 shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
                  >
                    <mode.icon className="w-4 h-4" />
                  </button>
                ))}
              </div>

              <div className="hidden sm:flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    haptics.selection();
                    pdfInputRef.current?.click();
                  }}
                  disabled={isParsingPdf}
                  className="flex items-center justify-center px-2.5 py-1.5 rounded-xl border border-lime-500/30 bg-lime-500/10 hover:bg-lime-500/20 text-lime-400 text-xs font-bold transition-all gap-1.5 cursor-pointer"
                  title="Auto-Fill from Resume PDF"
                >
                  {isParsingPdf ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <FileText className="w-3.5 h-3.5" />}
                  <span className="hidden md:inline">{isParsingPdf ? 'Extracting...' : 'Resume PDF'}</span>
                </button>

                <label className="cursor-pointer flex items-center justify-center w-9 h-9 rounded-xl border border-white/5 bg-gray-900/50 hover:bg-gray-800 text-gray-400 hover:text-white transition-colors" title="Import JSON">
                  <Upload className="w-4 h-4" />
                  <input type="file" accept=".json" onChange={handleImportJson} className="hidden" />
                </label>
                <button onClick={handleExportJson} className="flex items-center justify-center w-9 h-9 rounded-xl border border-white/5 bg-gray-900/50 hover:bg-gray-800 text-gray-400 hover:text-white transition-colors" title="Export JSON">
                  <Download className="w-4 h-4" />
                </button>
              </div>

              {/* Prominent Header Publish Button */}
              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.96 }}
                onClick={handlePublish} disabled={isPublishing}
                className="px-4 py-2 bg-gradient-to-r from-lime-500 to-lime-400 text-gray-950 font-black text-xs sm:text-sm rounded-xl shadow-[0_0_20px_rgba(163,230,53,0.2)] flex items-center gap-2 transition-all cursor-pointer shrink-0"
              >
                {isPublishing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Globe className="w-4 h-4" />}
                <span>Publish</span>
              </motion.button>
            </div>
          </div>
        </header>
      )}

      {/* Hidden PDF file input for programmatic uploads */}
      <input 
        type="file" 
        ref={pdfInputRef} 
        accept=".pdf,application/pdf" 
        onChange={handleResumePdfUpload} 
        className="hidden" 
      />

      {/* Floating Indicator when PDF Parsing is active */}
      <AnimatePresence>
        {isParsingPdf && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-gray-900/95 border border-lime-500/50 backdrop-blur-xl px-5 py-3 rounded-2xl shadow-2xl shadow-lime-500/20 flex items-center gap-3"
          >
            <RefreshCw className="w-4 h-4 text-lime-400 animate-spin shrink-0" />
            <div className="text-xs">
              <p className="font-bold text-white">Extracting Resume with AI...</p>
              <p className="text-[11px] text-gray-400">Parsing bio, tech stack, quantified metrics & projects</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- AI PROMPT BANNER --- */}
      <section className="relative z-10 bg-gray-900/40 border-b border-white/5 py-4 px-4 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 w-full relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Sparkles className="w-4 h-4 text-lime-500/70" />
            </div>
            <input
              type="text"
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="Describe your role to auto-generate content (e.g. 'Senior Cyber Threat Hunter')..."
              className="w-full bg-gray-950/80 border border-white/10 focus:border-lime-500/50 focus:ring-2 focus:ring-lime-500/20 rounded-2xl pl-10 pr-24 py-3 text-sm text-gray-100 placeholder-gray-500 focus:outline-none transition-all shadow-inner"
              onKeyDown={(e) => e.key === 'Enter' && handleGenerateFromAi()}
            />
            <div className="absolute inset-y-1 right-1">
              <button
                onClick={handleGenerateFromAi}
                disabled={isGeneratingAi || !aiPrompt.trim()}
                className="h-full px-4 bg-white/10 hover:bg-white/20 disabled:opacity-50 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
              >
                {isGeneratingAi ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Zap className="w-3.5 h-3.5 text-lime-400" />}
                <span className="hidden sm:inline">Auto-Fill</span>
              </button>
            </div>
          </div>

          <div className="w-full md:w-auto flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 md:pb-0">
            {/* Direct Resume PDF 1-Click Upload Button */}
            <button
              type="button"
              onClick={() => {
                haptics.selection();
                pdfInputRef.current?.click();
              }}
              disabled={isParsingPdf}
              className="px-3.5 py-1.5 bg-gradient-to-r from-lime-500/20 to-emerald-500/10 hover:from-lime-500/30 hover:to-emerald-500/20 border border-lime-500/40 text-lime-400 hover:text-lime-300 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all shadow-sm active:scale-95 cursor-pointer whitespace-nowrap shrink-0"
              title="Upload your resume PDF to instantly auto-fill all profile fields"
            >
              {isParsingPdf ? <RefreshCw className="w-3.5 h-3.5 animate-spin text-lime-400" /> : <FileText className="w-3.5 h-3.5" />}
              <span>{isParsingPdf ? 'Extracting Resume...' : '📄 Auto-Fill from PDF'}</span>
            </button>

            {ROLE_PRESETS.map(preset => (
              <button
                key={preset.id} onClick={() => loadPreset(preset.id)}
                className="px-3 py-1.5 bg-gray-900/80 hover:bg-lime-500/10 border border-white/5 hover:border-lime-500/30 rounded-xl text-xs font-medium text-gray-400 hover:text-lime-400 transition-all whitespace-nowrap shrink-0 cursor-pointer"
              >
                {preset.id === 'cybersecurity' && '🛡️ Cyber'}
                {preset.id === 'fullstack' && '🚀 Full-Stack'}
                {preset.id === 'ai_ml' && '🔮 AI/ML'}
                {preset.id === 'devops' && '⚡ DevOps'}
                {preset.id === 'fresher' && '💡 Fresher'}
                {preset.id === 'designer' && '✨ Design'}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* --- STUDIO MAIN CONTENT --- */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10 pb-20">
        
        {/* === LEFT EDITOR === */}
        <div className={`lg:col-span-5 flex flex-col h-[calc(100vh-190px)] ${mobileView === 'preview' ? 'hidden lg:flex' : 'flex'}`}>
          
          {/* Modern Sliding Tabs */}
          <div className="flex overflow-x-auto no-scrollbar bg-gray-900/60 backdrop-blur-xl p-1.5 rounded-2xl border border-white/5 mb-4 gap-1 shrink-0">
            {TABS.map(tab => (
              <button
                key={tab.id} 
                onClick={() => {
                  haptics.selection();
                  setActiveTab(tab.id);
                }}
                className={`relative px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors shrink-0 cursor-pointer ${activeTab === tab.id ? 'text-gray-950' : 'text-gray-400 hover:text-white'}`}
              >
                {activeTab === tab.id && (
                  <motion.div layoutId="activeTab" className="absolute inset-0 bg-lime-500 rounded-xl shadow-md" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
                )}
                <tab.icon className="w-4 h-4 relative z-10" />
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Form Scroll Area */}
          <div className="flex-1 bg-gray-900/60 backdrop-blur-xl rounded-3xl p-5 sm:p-6 border border-white/5 overflow-y-auto shadow-2xl custom-scrollbar relative flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.2 }}
                className="space-y-6 pb-4"
              >
                
                {/* 1. THEME */}
                {activeTab === 'theme' && (
                  <>
                    <div>
                      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">1. Select Visual Theme</h3>
                      <div className="space-y-3">
                        {THEMES.map(theme => (
                          <div
                            key={theme.id} 
                            onClick={() => {
                              haptics.light();
                              handleInputChange('theme', theme.id);
                            }}
                            className={`p-4 rounded-2xl border cursor-pointer transition-all ${portfolioData.theme === theme.id ? 'border-lime-500 bg-lime-500/5 shadow-[0_0_15px_rgba(163,230,53,0.1)]' : 'border-white/5 bg-gray-950/50 hover:border-white/20'}`}
                          >
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="font-bold text-sm text-white">{theme.name}</span>
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white/5 text-gray-300">{theme.badge}</span>
                            </div>
                            <p className="text-xs text-gray-400">{theme.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">2. Accent Glow</h3>
                      <div className="flex flex-wrap gap-3">
                        {ACCENT_COLORS.map(color => (
                          <button
                            key={color.id} 
                            onClick={() => {
                              haptics.light();
                              handleInputChange('accentColor', color.id);
                            }}
                            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all cursor-pointer ${portfolioData.accentColor === color.id ? 'bg-white/10 ring-2 ring-white scale-110' : 'bg-gray-950 border border-white/5 hover:border-white/20'}`}
                          >
                            <span className="w-6 h-6 rounded-full shadow-inner" style={{ backgroundColor: color.hex }} />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="pt-4 border-t border-white/5 space-y-3">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Public Vanity URL</label>
                      <div className={`flex items-center bg-gray-950/80 border rounded-xl px-3 py-2.5 transition-colors shadow-inner ${slugStatus.state === 'taken' || slugErrorAlert ? 'border-red-500/50' : slugStatus.state === 'available' ? 'border-lime-500/50' : 'border-white/10 focus-within:border-lime-400'}`}>
                        <span className="text-xs text-gray-500 font-mono">pandalime.com/p/</span>
                        <input
                          type="text" value={portfolioData.slug || ''}
                          onChange={(e) => { setSlugErrorAlert(''); handleInputChange('slug', e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, '-')); }}
                          placeholder="your-name"
                          className="bg-transparent border-none text-lime-400 font-bold text-sm focus:outline-none flex-1 font-mono ml-1"
                        />
                      </div>
                      {slugErrorAlert && (
                        <p className="text-xs text-red-400 font-semibold flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{slugErrorAlert}</span>
                        </p>
                      )}
                      {slugStatus.message && !slugErrorAlert && (
                        <p className={`text-xs ${slugStatus.state === 'available' ? 'text-lime-400' : 'text-amber-400'}`}>{slugStatus.message}</p>
                      )}
                    </div>
                  </>
                )}

                {/* 2. PROFILE */}
                {activeTab === 'profile' && (
                  <div className="space-y-5">
                    {/* Resume PDF Quick Fill Card */}
                    <div className="bg-gradient-to-br from-lime-500/10 via-gray-950/80 to-gray-900/60 border border-lime-500/30 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-lime-500/20 border border-lime-500/30 flex items-center justify-center text-lime-400 shrink-0">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs font-bold text-white">Auto-Fill from Resume PDF</h4>
                            <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-lime-400 text-gray-950">AI Magic</span>
                          </div>
                          <p className="text-[11px] text-gray-400">Upload your PDF resume to auto-populate bio, skills, projects & career history.</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          haptics.selection();
                          pdfInputRef.current?.click();
                        }}
                        disabled={isParsingPdf}
                        className="w-full sm:w-auto px-4 py-2 bg-lime-500 hover:bg-lime-400 disabled:opacity-50 text-gray-950 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md shadow-lime-500/20 active:scale-95 cursor-pointer shrink-0"
                      >
                        {isParsingPdf ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                        <span>{isParsingPdf ? 'Extracting...' : 'Upload PDF'}</span>
                      </button>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Full Name</label>
                      <input type="text" value={portfolioData.fullName || ''} onChange={(e) => handleInputChange('fullName', e.target.value)} className="w-full bg-gray-950/80 border border-white/5 focus:border-lime-500/50 focus:ring-1 focus:ring-lime-500/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none shadow-inner transition-all" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Professional Title</label>
                      <input type="text" value={portfolioData.title || ''} onChange={(e) => handleInputChange('title', e.target.value)} className="w-full bg-gray-950/80 border border-white/5 focus:border-lime-500/50 focus:ring-1 focus:ring-lime-500/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none shadow-inner transition-all" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Hero Tagline</label>
                      <input type="text" value={portfolioData.tagline || ''} onChange={(e) => handleInputChange('tagline', e.target.value)} className="w-full bg-gray-950/80 border border-white/5 focus:border-lime-500/50 focus:ring-1 focus:ring-lime-500/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none shadow-inner transition-all" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Location</label>
                      <input type="text" value={portfolioData.location || ''} onChange={(e) => handleInputChange('location', e.target.value)} placeholder="City, Country / Remote" className="w-full bg-gray-950/80 border border-white/5 focus:border-lime-500/50 focus:ring-1 focus:ring-lime-500/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none shadow-inner transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Avatar</label>
                      <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                        {PRESET_AVATARS.map(avatar => (
                          <img 
                            key={avatar.id} src={avatar.url} alt={avatar.label} 
                            onClick={() => {
                              haptics.light();
                              handleInputChange('avatarUrl', avatar.url);
                            }} 
                            className={`w-12 h-12 rounded-2xl object-cover cursor-pointer transition-all shrink-0 ${portfolioData.avatarUrl === avatar.url ? 'ring-2 ring-lime-400 scale-105' : 'opacity-50 hover:opacity-100'}`} 
                          />
                        ))}
                      </div>
                      <input type="text" value={portfolioData.avatarUrl || ''} onChange={(e) => handleInputChange('avatarUrl', e.target.value)} placeholder="Custom Image URL..." className="w-full bg-gray-950/80 border border-white/5 focus:border-lime-500/50 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none font-mono shadow-inner" />
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between">
                         <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Executive Bio</label>
                         <button onClick={handlePolishBio} disabled={isPolishingBio} className="text-[10px] text-lime-400 hover:text-lime-300 font-bold flex items-center gap-1 cursor-pointer">
                           <Sparkles className="w-3 h-3"/> {isPolishingBio ? 'Polishing...' : 'AI Polish'}
                         </button>
                      </div>
                      <textarea rows={4} value={portfolioData.bio || ''} onChange={(e) => handleInputChange('bio', e.target.value)} className="w-full bg-gray-950/80 border border-white/5 focus:border-lime-500/50 rounded-xl p-4 text-sm text-white focus:outline-none shadow-inner transition-all leading-relaxed" />
                    </div>
                  </div>
                )}

                {/* 3. SOCIAL */}
                {activeTab === 'social' && (
                  <div className="space-y-5">
                     {[
                       { id: 'linkedin', icon: Linkedin, label: 'LinkedIn URL', color: 'text-blue-400' },
                       { id: 'github', icon: Github, label: 'GitHub URL', color: 'text-gray-200' },
                       { id: 'twitter', icon: Twitter, label: 'X (Twitter) URL', color: 'text-sky-400' },
                       { id: 'tryhackme', icon: Terminal, label: 'TryHackMe/LeetCode', color: 'text-emerald-400' },
                       { id: 'website', icon: Globe, label: 'Personal Website / Blog', color: 'text-purple-400' },
                     ].map(social => (
                       <div key={social.id} className="space-y-1.5">
                         <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                           <social.icon className={`w-3.5 h-3.5 ${social.color}`}/> {social.label}
                         </label>
                         <input type="text" value={portfolioData.socialLinks?.[social.id] || ''} onChange={(e) => handleSocialChange(social.id, e.target.value)} className="w-full bg-gray-950/80 border border-white/5 focus:border-lime-500/50 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none shadow-inner" />
                       </div>
                     ))}
                  </div>
                )}

                {/* 4. SKILLS */}
                {activeTab === 'skills' && (
                  <div className="space-y-4">
                    <button onClick={addSkillCategory} className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 border-dashed rounded-xl text-xs font-bold text-gray-300 flex items-center justify-center gap-2 transition-all cursor-pointer">
                      <Plus className="w-4 h-4"/> Add Category
                    </button>
                    <AnimatePresence>
                      {Object.entries(portfolioData.skills || {}).map(([category, skillsList]) => (
                        <motion.div key={category} variants={fadeUp} initial="hidden" animate="visible" exit="exit" className="bg-gray-950/50 p-5 rounded-2xl border border-white/5 space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-white uppercase tracking-wider">{category}</span>
                            <button onClick={() => removeSkillCategory(category)} className="text-gray-500 hover:text-red-400 cursor-pointer">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <input type="text" value={skillsList.join(', ')} onChange={(e) => handleSkillsChange(category, e.target.value)} placeholder="React, Node.js..." className="w-full bg-gray-900 border border-white/5 focus:border-lime-500/50 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none shadow-inner" />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}

                {/* 5. PROJECTS */}
                {activeTab === 'projects' && (
                  <div className="space-y-4">
                    <button onClick={addProject} className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 border-dashed rounded-xl text-xs font-bold text-gray-300 flex items-center justify-center gap-2 transition-all cursor-pointer">
                      <Plus className="w-4 h-4"/> Add Project
                    </button>
                    <motion.div variants={listContainer} initial="hidden" animate="visible" className="space-y-4">
                      <AnimatePresence>
                        {(portfolioData.projects || []).map((project, idx) => (
                          <motion.div key={idx} variants={fadeUp} initial="hidden" animate="visible" exit="exit" className="bg-gray-950/50 p-5 rounded-2xl border border-white/5 space-y-4 relative group">
                             <button onClick={() => removeProject(idx)} className="absolute top-4 right-4 text-gray-500 hover:text-red-400 cursor-pointer">
                               <Trash2 className="w-4 h-4" />
                             </button>
                             <div className="space-y-1.5 pt-2">
                               <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Project Title</label>
                               <input type="text" value={project.title || ''} onChange={(e) => handleProjectChange(idx, 'title', e.target.value)} className="w-full bg-gray-900 border border-white/5 focus:border-lime-500/50 rounded-xl px-4 py-2.5 text-sm font-bold text-white focus:outline-none shadow-inner" />
                             </div>
                             <div className="space-y-1.5">
                               <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Impact Metric / Badge</label>
                               <input type="text" value={project.metric || ''} onChange={(e) => handleProjectChange(idx, 'metric', e.target.value)} placeholder="e.g. ⚡ 40% Latency Reduction" className="w-full bg-gray-900 border border-white/5 focus:border-lime-500/50 rounded-xl px-4 py-2 text-xs text-white focus:outline-none shadow-inner" />
                             </div>
                             <div className="space-y-1.5">
                               <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Description</label>
                               <textarea rows={2} value={project.description || ''} onChange={(e) => handleProjectChange(idx, 'description', e.target.value)} className="w-full bg-gray-900 border border-white/5 focus:border-lime-500/50 rounded-xl px-4 py-2.5 text-sm text-gray-300 focus:outline-none shadow-inner" />
                             </div>
                             <div className="grid grid-cols-2 gap-3">
                                <input type="text" value={project.demoUrl || ''} onChange={(e) => handleProjectChange(idx, 'demoUrl', e.target.value)} placeholder="Live Demo URL" className="w-full bg-gray-900 border border-white/5 focus:border-lime-500/50 rounded-xl px-3 py-2 text-xs text-white focus:outline-none shadow-inner" />
                                <input type="text" value={project.githubUrl || ''} onChange={(e) => handleProjectChange(idx, 'githubUrl', e.target.value)} placeholder="GitHub URL" className="w-full bg-gray-900 border border-white/5 focus:border-lime-500/50 rounded-xl px-3 py-2 text-xs text-white focus:outline-none shadow-inner" />
                             </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </motion.div>
                  </div>
                )}

                {/* 6. EXPERIENCE */}
                {activeTab === 'experience' && (
                  <div className="space-y-4">
                    <button onClick={addExperience} className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 border-dashed rounded-xl text-xs font-bold text-gray-300 flex items-center justify-center gap-2 transition-all cursor-pointer">
                      <Plus className="w-4 h-4"/> Add Career Role
                    </button>
                    <motion.div variants={listContainer} initial="hidden" animate="visible" className="space-y-4">
                      <AnimatePresence>
                        {(portfolioData.experience || []).map((exp, idx) => (
                          <motion.div key={idx} variants={fadeUp} initial="hidden" animate="visible" exit="exit" className="bg-gray-950/50 p-5 rounded-2xl border border-white/5 space-y-4 relative">
                            <button onClick={() => removeExperience(idx)} className="absolute top-4 right-4 text-gray-500 hover:text-red-400 cursor-pointer">
                              <Trash2 className="w-4 h-4" />
                            </button>
                            <div className="grid grid-cols-2 gap-3 pt-2">
                               <div className="space-y-1.5"><label className="text-[10px] font-bold uppercase text-gray-400">Title</label><input type="text" value={exp.role || ''} onChange={(e) => handleExperienceChange(idx, 'role', e.target.value)} className="w-full bg-gray-900 border border-white/5 rounded-xl px-3 py-2 text-sm text-white focus:outline-none" /></div>
                               <div className="space-y-1.5"><label className="text-[10px] font-bold uppercase text-gray-400">Company</label><input type="text" value={exp.company || ''} onChange={(e) => handleExperienceChange(idx, 'company', e.target.value)} className="w-full bg-gray-900 border border-white/5 rounded-xl px-3 py-2 text-sm text-white focus:outline-none" /></div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                               <div className="space-y-1.5"><label className="text-[10px] font-bold uppercase text-gray-400">Period</label><input type="text" value={exp.period || ''} onChange={(e) => handleExperienceChange(idx, 'period', e.target.value)} placeholder="2022 - Present" className="w-full bg-gray-900 border border-white/5 rounded-xl px-3 py-2 text-xs text-white focus:outline-none" /></div>
                               <div className="space-y-1.5"><label className="text-[10px] font-bold uppercase text-gray-400">Location</label><input type="text" value={exp.location || ''} onChange={(e) => handleExperienceChange(idx, 'location', e.target.value)} placeholder="Bengaluru / Remote" className="w-full bg-gray-900 border border-white/5 rounded-xl px-3 py-2 text-xs text-white focus:outline-none" /></div>
                            </div>
                            <div className="space-y-2 pt-2 border-t border-white/5">
                              <div className="flex justify-between items-center"><label className="text-[10px] font-bold uppercase text-gray-400">Accomplishment Bullets</label><button onClick={() => addExperienceBullet(idx)} className="text-[10px] text-lime-400 hover:text-lime-300 font-bold cursor-pointer">+ Add Bullet</button></div>
                              {(exp.bullets || []).map((bullet, bIdx) => (
                                <div key={bIdx} className="flex gap-2">
                                  <input type="text" value={bullet} onChange={(e) => handleExperienceBulletChange(idx, bIdx, e.target.value)} className="flex-1 bg-gray-900 border border-white/5 rounded-lg px-3 py-1.5 text-xs text-gray-200 focus:outline-none" />
                                  <button onClick={() => removeExperienceBullet(idx, bIdx)} className="text-gray-500 hover:text-red-400 p-1 cursor-pointer"><Trash2 className="w-3.5 h-3.5"/></button>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </motion.div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Mobile & Desktop Dedicated Action Bar inside Editor */}
            <div className="pt-4 mt-4 border-t border-white/10 flex flex-col sm:flex-row gap-2.5 shrink-0">
              <button
                onClick={() => {
                  haptics.selection();
                  setMobileView('preview');
                }}
                className="lg:hidden w-full py-3 bg-gray-800 hover:bg-gray-700 text-gray-200 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all border border-gray-700 cursor-pointer active:scale-95"
              >
                <Eye className="w-4 h-4 text-cyan-400" />
                <span>Switch to Live Preview</span>
              </button>

              <button
                onClick={handlePublish}
                disabled={isPublishing}
                className="w-full py-3 bg-gradient-to-r from-lime-500 to-lime-400 hover:from-lime-400 hover:to-lime-300 active:scale-95 text-gray-950 font-black text-xs sm:text-sm rounded-xl shadow-lg shadow-lime-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                {isPublishing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Globe className="w-4 h-4" />}
                <span>Publish Portfolio Website</span>
              </button>
            </div>
          </div>
        </div>

        {/* === RIGHT LIVE PREVIEW === */}
        <div className={`lg:col-span-7 flex flex-col items-center h-[calc(100vh-190px)] ${mobileView === 'editor' ? 'hidden lg:flex' : 'flex'}`}>
          <div className="w-full flex items-center justify-between mb-3 px-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-lime-400" /> Live Interactive Preview
              </span>
            </div>
            
            {/* Mobile Top Preview Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  haptics.selection();
                  setMobileView('editor');
                }}
                className="lg:hidden text-[11px] font-bold text-gray-300 bg-gray-900 border border-gray-700 px-2.5 py-1 rounded-lg flex items-center gap-1 active:scale-95 transition-all cursor-pointer"
              >
                <span>Edit Content</span>
              </button>
              
              <button
                onClick={handlePublish}
                disabled={isPublishing}
                className="text-[11px] font-black text-gray-950 bg-lime-500 hover:bg-lime-400 px-3 py-1 rounded-lg flex items-center gap-1 shadow-md shadow-lime-500/20 active:scale-95 transition-all cursor-pointer"
              >
                {isPublishing ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Globe className="w-3 h-3" />}
                <span>Publish</span>
              </button>
            </div>
          </div>

          {/* MacOS Window Mockup Wrapper */}
          <div className={`w-full h-full bg-gray-900/60 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${previewMode === 'mobile' ? 'max-w-sm mx-auto' : 'max-w-full'}`}>
            {/* Window Header */}
            <div className="h-10 border-b border-white/5 bg-gray-950/50 flex items-center px-4 gap-2 shrink-0">
               <div className="w-3 h-3 rounded-full bg-red-500/80" />
               <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
               <div className="w-3 h-3 rounded-full bg-green-500/80" />
               <div className="mx-auto flex items-center justify-center bg-gray-900 rounded-md px-4 py-1 border border-white/5 max-w-[240px] truncate">
                 <span className="text-[10px] text-gray-400 font-mono truncate">pandalime.com/p/{portfolioData.slug || 'preview'}</span>
               </div>
            </div>

            {/* Inner preview area */}
            <div className={`flex-1 overflow-y-auto custom-scrollbar ${selectedTheme.bgClass} p-6 sm:p-8 space-y-8`}>
              
              {/* Profile Top */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 pb-6 border-b border-white/10">
                <img src={portfolioData.avatarUrl || PRESET_AVATARS[0].url} alt={portfolioData.fullName || 'User Avatar'} className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover shadow-2xl shrink-0" style={{ border: `2px solid ${selectedAccent.hex}` }} />
                <div className="text-center sm:text-left space-y-1.5 flex-1">
                  <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight">{portfolioData.fullName || 'Alex Vance'}</h2>
                  <p className="text-xs sm:text-sm font-bold tracking-wide uppercase" style={{ color: selectedAccent.hex }}>{portfolioData.title || 'Senior Engineer'}</p>
                  {portfolioData.location && (
                    <p className="text-xs text-gray-400 flex items-center justify-center sm:justify-start gap-1">
                      <MapPin className="w-3 h-3 shrink-0" />
                      <span>{portfolioData.location}</span>
                    </p>
                  )}
                  {portfolioData.bio && (
                    <p className="text-xs text-gray-400 leading-relaxed pt-1">{portfolioData.bio}</p>
                  )}
                </div>
              </div>

              {/* Skills */}
              {portfolioData.skills && Object.keys(portfolioData.skills).length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-2">
                    <Code2 className="w-4 h-4" style={{ color: selectedAccent.hex }} /> Technical Skills
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {Object.entries(portfolioData.skills).map(([cat, skList]) => (
                      <div key={cat} className="space-y-1.5 bg-white/5 p-3 rounded-xl border border-white/5">
                        <p className="text-[11px] font-bold text-gray-300">{cat}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {skList.map((skill, sIdx) => (
                            <span key={sIdx} className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-white/10 text-gray-200 border border-white/10">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects */}
              {portfolioData.projects && portfolioData.projects.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-2">
                    <Layers className="w-4 h-4" style={{ color: selectedAccent.hex }} /> Featured Projects
                  </h4>
                  <div className="space-y-3">
                    {portfolioData.projects.map((proj, pIdx) => (
                      <div key={pIdx} className={`p-4 rounded-2xl border ${selectedTheme.cardClass} hover:border-white/20 transition-colors space-y-2`}>
                        <div className="flex justify-between items-start gap-2">
                          <h5 className="font-bold text-sm text-white">{proj.title}</h5>
                          {proj.metric && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white/10 border border-white/10 shrink-0" style={{ color: selectedAccent.hex }}>
                              {proj.metric}
                            </span>
                          )}
                        </div>
                        {proj.description && (
                          <p className="text-xs text-gray-400 leading-relaxed">{proj.description}</p>
                        )}
                        {(proj.demoUrl || proj.githubUrl) && (
                          <div className="flex items-center gap-2 pt-1">
                            {proj.demoUrl && (
                              <a href={proj.demoUrl} target="_blank" rel="noreferrer" className="text-[11px] font-bold text-lime-400 hover:underline flex items-center gap-1">
                                <span>Live Demo</span> <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                            {proj.githubUrl && (
                              <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="text-[11px] font-bold text-gray-300 hover:text-white flex items-center gap-1">
                                <Github className="w-3 h-3" /> <span>Source</span>
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Experience */}
              {portfolioData.experience && portfolioData.experience.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-2">
                    <Briefcase className="w-4 h-4" style={{ color: selectedAccent.hex }} /> Career Timeline
                  </h4>
                  <div className="space-y-3">
                    {portfolioData.experience.map((exp, eIdx) => (
                      <div key={eIdx} className={`p-4 rounded-2xl border ${selectedTheme.cardClass} space-y-2`}>
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="font-bold text-sm text-white">{exp.role}</h5>
                            <p className="text-xs font-semibold" style={{ color: selectedAccent.hex }}>{exp.company}</p>
                          </div>
                          <span className="text-[10px] text-gray-400 font-mono">{exp.period}</span>
                        </div>
                        {exp.bullets && exp.bullets.length > 0 && (
                          <ul className="space-y-1 pt-1">
                            {exp.bullets.map((bullet, bIdx) => (
                              <li key={bIdx} className="text-xs text-gray-400 flex items-start gap-1.5">
                                <span className="text-lime-400 mt-0.5">•</span>
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>

      {/* --- PUBLISH MODAL --- */}
      <AnimatePresence>
        {publishModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-gray-900 border border-white/10 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-5 text-white shadow-2xl">
              <div className="text-center space-y-2">
                <div className="w-14 h-14 bg-lime-500/10 text-lime-400 rounded-full flex items-center justify-center mx-auto border border-lime-500/20 shadow-[0_0_30px_rgba(163,230,53,0.2)]">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight">Portfolio is Live!</h3>
                <p className="text-xs sm:text-sm text-gray-400">Your site is published and ready to be shared with recruiters.</p>
              </div>

              <div className="bg-gray-950 p-4 rounded-2xl border border-white/5 space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Public Link</label>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs sm:text-sm font-mono text-lime-400 font-bold truncate">{publicUrl}</span>
                  <button onClick={copyShareLink} className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all shrink-0 cursor-pointer">
                    {copiedLink ? <Check className="w-4 h-4 text-lime-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2.5 pt-1">
                <a href={publicUrl} target="_blank" rel="noreferrer" className="w-full py-3 bg-lime-500 hover:bg-lime-400 text-gray-950 font-bold rounded-xl text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-lime-500/20">
                  <span>Open Live Portfolio</span> <ExternalLink className="w-4 h-4" />
                </a>
                <button 
                  onClick={() => {
                    haptics.light();
                    setPublishModalOpen(false);
                  }} 
                  className="w-full py-2.5 bg-transparent hover:bg-white/5 text-gray-400 font-bold rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Back to Editor
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {isAppMode && <AppBottomNav />}
    </div>
  );
}
