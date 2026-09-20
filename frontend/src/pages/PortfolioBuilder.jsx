import React, { useState, useEffect, useRef, useMemo } from 'react';
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
  Tablet,
  Monitor,
  Terminal,
  Github,
  Linkedin,
  Twitter,
  MapPin,
  CheckCircle2,
  AlertCircle,
  FileText,
  Volume2,
  VolumeX,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  Share2
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { THEMES, ACCENT_COLORS, PRESET_AVATARS, ROLE_PRESETS } from '../data/portfolioTemplates';
import { apiRequest } from '../config/api';
import { AppHeader, AppBottomNav } from '../components/AppNavigation';
import { haptics } from '../utils/haptics';
import { asmrAudio } from '../utils/asmrAudio';

// Framer Motion spring presets
const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.22, ease: "easeOut" } },
  exit: { opacity: 0, scale: 0.98, transition: { duration: 0.12 } }
};

const listContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
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
  
  // Audio state
  const [soundEnabled, setSoundEnabled] = useState(() => asmrAudio.isEnabled());
  
  // Onboarding Tutorial State
  const [tutorialOpen, setTutorialOpen] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);
  const [completenessOpen, setCompletenessOpen] = useState(false);

  const pdfInputRef = useRef(null);

  useEffect(() => {
    try {
      localStorage.setItem('pandalime_portfolio_draft', JSON.stringify(portfolioData));
    } catch {
      // LocalStorage access fallback
    }
  }, [portfolioData]);

  // Check if first-time user to show tutorial prompt
  useEffect(() => {
    try {
      const seenTour = localStorage.getItem('pandalime_seen_portfolio_tour');
      if (!seenTour) {
        setTutorialOpen(true);
      }
    } catch {
      // ignore
    }
  }, []);

  // Calculate Completeness Score
  const completeness = useMemo(() => {
    let score = 0;
    const items = [];

    // 1. Full Name & Title (20%)
    if (portfolioData.fullName?.trim() && portfolioData.title?.trim()) {
      score += 20;
      items.push({ label: 'Identity & Professional Title', done: true, points: 20 });
    } else {
      items.push({ label: 'Add Full Name & Professional Title', done: false, points: 20, tab: 'profile' });
    }

    // 2. Location & Bio (15%)
    if (portfolioData.bio?.trim() && portfolioData.bio.length > 20) {
      score += 15;
      items.push({ label: 'Executive Bio Summary', done: true, points: 15 });
    } else {
      items.push({ label: 'Add Comprehensive Bio (20+ chars)', done: false, points: 15, tab: 'profile' });
    }

    // 3. Technical Skills (15%)
    const skillCount = Object.values(portfolioData.skills || {}).reduce((acc, list) => acc + (list?.length || 0), 0);
    if (skillCount >= 3) {
      score += 15;
      items.push({ label: `Technical Skills (${skillCount} configured)`, done: true, points: 15 });
    } else {
      items.push({ label: 'Add at least 3 Technical Skills', done: false, points: 15, tab: 'skills' });
    }

    // 4. Featured Projects (25%)
    const projCount = portfolioData.projects?.length || 0;
    if (projCount >= 1) {
      score += 25;
      items.push({ label: `Featured Projects (${projCount} added)`, done: true, points: 25 });
    } else {
      items.push({ label: 'Add at least 1 Featured Project with metrics', done: false, points: 25, tab: 'projects' });
    }

    // 5. Career History (15%)
    const expCount = portfolioData.experience?.length || 0;
    if (expCount >= 1) {
      score += 15;
      items.push({ label: `Work Experience (${expCount} roles)`, done: true, points: 15 });
    } else {
      items.push({ label: 'Add at least 1 Work Experience role', done: false, points: 15, tab: 'experience' });
    }

    // 6. Social Links (10%)
    const hasSocial = portfolioData.socialLinks && Object.values(portfolioData.socialLinks).some(v => v?.trim());
    if (hasSocial) {
      score += 10;
      items.push({ label: 'Social / GitHub / Contact Links', done: true, points: 10 });
    } else {
      items.push({ label: 'Connect GitHub, LinkedIn, or Email', done: false, points: 10, tab: 'social' });
    }

    return { score: Math.min(100, score), items };
  }, [portfolioData]);

  // Vanity URL Availability Checker
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

  const toggleSound = () => {
    haptics.selection();
    const nextState = asmrAudio.toggleSound();
    setSoundEnabled(nextState);
    setStatusMessage(nextState ? '🔊 ASMR Audio On' : '🔇 Audio Muted');
    setTimeout(() => setStatusMessage(''), 2500);
  };

  const loadPreset = (presetId) => {
    haptics.selection();
    asmrAudio.playSwitch();
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
    asmrAudio.playPop();
    const newProj = {
      title: 'New Distributed Project',
      description: 'Describe your high-throughput technical architecture and core contributions.',
      metric: '🚀 +4.2x Throughput • 99.99% Uptime',
      tags: ['React', 'TypeScript', 'Node.js'],
      demoUrl: '', githubUrl: ''
    };
    setPortfolioData(prev => ({ ...prev, projects: [newProj, ...(prev.projects || [])] }));
  };

  const removeProject = (index) => {
    haptics.warning();
    asmrAudio.playDelete();
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
    asmrAudio.playPop();
    const updated = [...(portfolioData.experience || [])];
    if (!updated[expIndex].bullets) updated[expIndex].bullets = [];
    updated[expIndex].bullets.push('Accomplished [X] quantified by [Y] using [Z].');
    setPortfolioData(prev => ({ ...prev, experience: updated }));
  };

  const removeExperienceBullet = (expIndex, bulletIndex) => {
    haptics.warning();
    asmrAudio.playDelete();
    const updated = [...(portfolioData.experience || [])];
    updated[expIndex].bullets = updated[expIndex].bullets.filter((_, i) => i !== bulletIndex);
    setPortfolioData(prev => ({ ...prev, experience: updated }));
  };

  const addExperience = () => {
    haptics.medium();
    asmrAudio.playPop();
    const newExp = {
      role: 'Staff Software Engineer', company: 'CloudScale Technologies', period: '2023 - Present', location: 'Bengaluru / Remote',
      bullets: ['Spearheaded zero-downtime database migration cutting latency by 45%.']
    };
    setPortfolioData(prev => ({ ...prev, experience: [newExp, ...(prev.experience || [])] }));
  };

  const removeExperience = (index) => {
    haptics.warning();
    asmrAudio.playDelete();
    setPortfolioData(prev => ({ ...prev, experience: prev.experience.filter((_, i) => i !== index) }));
  };

  const handleSkillsChange = (category, skillsCsv) => {
    const skillList = skillsCsv.split(',').map(s => s.trim()).filter(Boolean);
    setPortfolioData(prev => ({ ...prev, skills: { ...prev.skills, [category]: skillList } }));
  };

  const addSkillCategory = () => {
    haptics.medium();
    asmrAudio.playPop();
    const categoryName = prompt('Enter new skill category (e.g. Cloud & DevOps, Distributed Systems, Languages):');
    if (categoryName && categoryName.trim()) {
      setPortfolioData(prev => ({
        ...prev, skills: { ...prev.skills, [categoryName.trim()]: ['Skill 1', 'Skill 2'] }
      }));
    }
  };

  const removeSkillCategory = (category) => {
    haptics.warning();
    asmrAudio.playDelete();
    const updated = { ...portfolioData.skills };
    delete updated[category];
    setPortfolioData(prev => ({ ...prev, skills: updated }));
  };

  const handleResumePdfUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      haptics.warning();
      asmrAudio.playDelete();
      setStatusMessage('⚠️ Please select a valid PDF resume.');
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
    setStatusMessage('📄 Parsing resume PDF AST tokens...');

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
          setStatusMessage('✨ 100% Auto-filled from Resume PDF!');
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
    asmrAudio.playClick();
    setIsGeneratingAi(true);
    setStatusMessage('Synthesizing profile with AI...');
    try {
      const response = await apiRequest('/api/tools/portfolio-ai-assist', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'generate_from_prompt', prompt: aiPrompt, currentData: portfolioData })
      });
      if (response && response.ok) {
        const result = await response.json();
        if (result.portfolio) {
          haptics.success();
          asmrAudio.playSparkle();
          setPortfolioData(prev => ({ ...prev, ...result.portfolio, slug: prev.slug || result.portfolio.slug }));
          setStatusMessage('✨ AI Generated successfully!');
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
    asmrAudio.playSparkle();
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
    asmrAudio.playSparkle();
    setIsPolishingBio(true);
    setStatusMessage('Polishing bio with AI...');
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

  const handlePublish = async () => {
    haptics.heavy();
    asmrAudio.playClick();
    const slug = (portfolioData.slug || 'my-portfolio').toLowerCase().trim().replace(/[^a-z0-9_-]/g, '-');
    if (!slug || slug.length < 2) {
      haptics.warning();
      asmrAudio.playDelete();
      setSlugErrorAlert('Enter a valid vanity URL (at least 2 characters).');
      setActiveTab('theme');
      return;
    }
    if (ROLE_PRESETS.some(p => p.slug === slug || p.id === slug)) {
      haptics.warning();
      asmrAudio.playDelete();
      setSlugErrorAlert(`"${slug}" is reserved. Use your own name.`);
      setActiveTab('theme');
      return;
    }

    setIsPublishing(true);
    setSlugErrorAlert('');
    setStatusMessage('Compiling & deploying portfolio to cloud edge...');

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

  const handleExportJson = () => {
    haptics.light();
    asmrAudio.playClick();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(portfolioData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${portfolioData.slug || 'portfolio'}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    setStatusMessage('✓ Exported configuration JSON');
    setTimeout(() => setStatusMessage(''), 2500);
  };

  const handleImportJson = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    haptics.light();
    asmrAudio.playClick();
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (parsed.fullName || parsed.title) {
          haptics.success();
          asmrAudio.playSparkle();
          setPortfolioData(parsed);
          setStatusMessage('✓ Imported successfully!');
          setTimeout(() => setStatusMessage(''), 3000);
        }
      } catch { 
        haptics.warning();
        asmrAudio.playDelete();
        alert('Invalid JSON format.'); 
      }
    };
    reader.readAsText(file);
  };

  const publicUrl = `https://www.pandalime.com/p/${portfolioData.slug || 'my-portfolio'}`;
  const copyShareLink = () => {
    haptics.success();
    asmrAudio.playPop();
    navigator.clipboard.writeText(publicUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const closeTutorial = () => {
    haptics.selection();
    asmrAudio.playSwitch();
    setTutorialOpen(false);
    try {
      localStorage.setItem('pandalime_seen_portfolio_tour', 'true');
    } catch {
      // ignore
    }
  };

  const loadSamplePractice = () => {
    haptics.success();
    asmrAudio.playSparkle();
    setPortfolioData({
      ...ROLE_PRESETS[1], // Fullstack preset
      fullName: 'Samantha Roy',
      title: 'Senior Distributed Systems Architect',
      theme: 'brutalist',
      accentColor: 'neo_yellow',
      slug: 'samantha-architect'
    });
    setTutorialOpen(false);
    setStatusMessage('✨ Loaded Interactive Practice Portfolio!');
    setTimeout(() => setStatusMessage(''), 3500);
  };

  const selectedTheme = THEMES.find(t => t.id === portfolioData.theme) || THEMES[0];
  const selectedAccent = ACCENT_COLORS.find(c => c.id === portfolioData.accentColor) || ACCENT_COLORS[0];

  const TABS = [
    { id: 'theme', icon: Palette, label: 'Theme & Style' },
    { id: 'profile', icon: User, label: 'Identity & Bio' },
    { id: 'social', icon: Globe, label: 'Links' },
    { id: 'skills', icon: Code2, label: 'Skills Stack' },
    { id: 'projects', icon: Layers, label: 'Projects' },
    { id: 'experience', icon: Briefcase, label: 'Career Log' },
  ];

  const TUTORIAL_STEPS = [
    {
      title: "⚡ 1-Click Resume Auto-Fill & Presets",
      desc: "Drag and drop your PDF resume to parse all bio details, quantified metrics, projects, and skills into your portfolio in <800ms. Or click any 1-click role preset.",
      actionLabel: "Next: Choose Aesthetics →",
      badge: "STEP 1 // SPEED"
    },
    {
      title: "🎨 10 Visual Themes (Minecraft, Sakura, Light)",
      desc: "Switch between 10 hand-crafted themes: Dark Terminal, Minimalist Ivory Paper, Neo-Brutalist Pop, Minecraft 8-Bit Pixel, Sakura Blossom, and Rose Gold Velvet.",
      actionLabel: "Next: Quantify Impact →",
      badge: "STEP 2 // THEMES"
    },
    {
      title: "🛠️ Quantified Impact & Tech Stack",
      desc: "Craft Google XYZ bullet points with measurable impact metrics (e.g. '+4.2x Throughput, $180k AWS Savings') to trigger top ATS & recruiter shortlist algorithms.",
      actionLabel: "Next: Deploy & Share →",
      badge: "STEP 3 // ATS WEIGHT"
    },
    {
      title: "🌐 Instant Free URL (pandalime.com/p/you)",
      desc: "Claim your vanity link with 1-click publishing, QR code generation, and direct recruitment contact buttons. Everything is 100% free with zero hosting fees.",
      actionLabel: "Start Building Now 🎉",
      badge: "STEP 4 // PUBLISH"
    }
  ];

  return (
    <div className="min-h-screen bg-[#08090C] text-[#F0F4FC] flex flex-col font-sans w-full max-w-full overflow-x-hidden selection:bg-[#D2FF00]/30 selection:text-black antialiased">
      <SEOHead 
        title="AI Developer & Cyber Portfolio Studio | Free Hosted Portfolio Page | PandaLime"
        description="Build and host your sharp developer or cyber portfolio on pandalime.com/p/:username. Choose from 10 modern themes (Minecraft, Sakura, Light Ivory, Neo-Brutalist) with ASMR micro-interactions."
        canonical="/portfolio-builder"
      />

      {/* Subtle Hairline Grid Background */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1F242D_1px,transparent_1px),linear-gradient(to_bottom,#1F242D_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {isAppMode ? (
        <div className="relative z-40">
          <AppHeader 
            title="DevFolio Studio" 
            showBack={true} 
            rightAction={
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    haptics.selection();
                    asmrAudio.playSwitch();
                    setMobileView(mobileView === 'editor' ? 'preview' : 'editor');
                  }}
                  className="text-[11px] font-mono font-bold text-gray-300 bg-[#0E1116] border border-[#1F242D] px-2.5 py-1.5 rounded-[2px] flex items-center gap-1 active:scale-95 transition-all cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-[#D2FF00]" />
                  <span>{mobileView === 'editor' ? 'Preview' : 'Editor'}</span>
                </button>

                <button
                  onClick={handlePublish}
                  disabled={isPublishing}
                  className="px-3 py-1.5 bg-[#D2FF00] hover:bg-[#b8e000] text-[#08090C] font-mono font-bold text-[11px] rounded-[2px] shadow-[0_0_12px_rgba(210,255,0,0.3)] flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shrink-0"
                >
                  {isPublishing ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Globe className="w-3 h-3" />}
                  <span>Deploy</span>
                </button>
              </div>
            }
          />
        </div>
      ) : (
        <header className="bg-[#08090C]/90 border-b border-[#1F242D] sticky top-0 z-40 backdrop-blur-xl px-4 py-2.5">
          <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-3">
            
            {/* Left: Brand & Telemetry Status */}
            <div className="flex items-center gap-3">
              <Link 
                to="/" 
                onClick={() => {
                  haptics.light();
                  asmrAudio.playClick();
                }}
                className="flex items-center gap-2 font-mono font-bold text-white text-sm sm:text-base tracking-tight hover:opacity-90 transition-opacity"
              >
                <div className="w-7 h-7 bg-[#D2FF00] text-[#08090C] rounded-[2px] flex items-center justify-center shadow-[0_0_12px_rgba(210,255,0,0.3)] shrink-0">
                  <Terminal className="w-4 h-4 stroke-[2.5]" />
                </div>
                <span className="hidden sm:inline tracking-tight font-black">PANDALIME</span>
                <span className="text-[10px] font-mono text-[#D2FF00] bg-[#D2FF00]/10 border border-[#D2FF00]/30 px-1.5 py-0.5 rounded-[2px] uppercase">
                  Studio // v2.4
                </span>
              </Link>

              {/* Status HUD Beacon */}
              <div className="hidden lg:flex items-center gap-2 pl-3 border-l border-[#1F242D] text-[11px] font-mono text-gray-400">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D2FF00] animate-ping" />
                <span>SYSTEM ONLINE</span>
              </div>
            </div>

            {/* Center: Live Vanity URL Bar */}
            <div className="hidden md:flex items-center bg-[#0E1116] border border-[#1F242D] px-3 py-1 rounded-[2px] gap-2 text-xs font-mono max-w-xs truncate">
              <span className="text-gray-500">pandalime.com/p/</span>
              <span className="text-[#D2FF00] font-bold truncate">{portfolioData.slug || 'preview'}</span>
              <button 
                onClick={copyShareLink} 
                className="text-gray-400 hover:text-white transition-colors cursor-pointer ml-1 p-0.5"
                title="Copy Live URL"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-[#D2FF00]" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Right: Actions, Audio ASMR, Tour, Completeness & Deploy */}
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* Completeness Score Gauge Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    haptics.selection();
                    asmrAudio.playSwitch();
                    setCompletenessOpen(!completenessOpen);
                  }}
                  className="flex items-center gap-2 bg-[#0E1116] hover:bg-[#151921] border border-[#1F242D] hover:border-[#D2FF00]/40 px-2.5 py-1.5 rounded-[2px] text-xs font-mono transition-all cursor-pointer"
                  title="Profile Completeness Score"
                >
                  <div className="w-3 h-3 rounded-full border border-gray-600 flex items-center justify-center">
                    <div 
                      className="w-1.5 h-1.5 rounded-full" 
                      style={{ backgroundColor: completeness.score >= 80 ? '#D2FF00' : completeness.score >= 50 ? '#FF5722' : '#8C96A8' }} 
                    />
                  </div>
                  <span className="font-bold text-white">{completeness.score}%</span>
                  <span className="hidden xl:inline text-gray-400 text-[11px]">OPTIMIZED</span>
                </button>

                {/* Completeness Checklist Modal */}
                <AnimatePresence>
                  {completenessOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                      className="absolute right-0 top-full mt-2 w-72 bg-[#0E1116] border border-[#1F242D] shadow-2xl p-4 rounded-[2px] z-50 space-y-3 font-mono"
                    >
                      <div className="flex justify-between items-center border-b border-[#1F242D] pb-2">
                        <span className="text-[11px] font-bold text-white uppercase tracking-wider">ATS Score Telemetry</span>
                        <span className="text-xs font-bold text-[#D2FF00]">{completeness.score}/100</span>
                      </div>
                      <div className="w-full bg-[#08090C] h-1.5 rounded-[2px] overflow-hidden border border-[#1F242D]">
                        <div className="bg-[#D2FF00] h-full transition-all duration-500" style={{ width: `${completeness.score}%` }} />
                      </div>
                      <div className="space-y-1.5 text-[11px]">
                        {completeness.items.map((item, idx) => (
                          <div 
                            key={idx} 
                            onClick={() => {
                              if (item.tab) {
                                asmrAudio.playSwitch();
                                setActiveTab(item.tab);
                                setCompletenessOpen(false);
                              }
                            }}
                            className={`flex items-center justify-between p-1.5 rounded-[2px] ${item.done ? 'text-gray-400 bg-black/20' : 'text-[#D2FF00] bg-[#D2FF00]/5 hover:bg-[#D2FF00]/10 cursor-pointer border border-[#D2FF00]/20'}`}
                          >
                            <span className="flex items-center gap-1.5 truncate">
                              {item.done ? <Check className="w-3.5 h-3.5 text-[#D2FF00] shrink-0" /> : <Plus className="w-3.5 h-3.5 shrink-0" />}
                              <span className="truncate">{item.label}</span>
                            </span>
                            <span className="text-[10px] text-gray-500 shrink-0">+{item.points}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ASMR Sound Toggle Button */}
              <button
                onClick={toggleSound}
                className={`p-2 rounded-[2px] border transition-all cursor-pointer ${soundEnabled ? 'bg-[#D2FF00]/10 border-[#D2FF00]/40 text-[#D2FF00]' : 'bg-[#0E1116] border-[#1F242D] text-gray-500 hover:text-gray-300'}`}
                title={soundEnabled ? 'ASMR Haptic Sound: Active' : 'Sound: Muted'}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              {/* Quick Tour / Tutorial Button */}
              <button
                onClick={() => {
                  haptics.selection();
                  asmrAudio.playSwitch();
                  setTutorialStep(0);
                  setTutorialOpen(true);
                }}
                className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 bg-[#0E1116] hover:bg-[#151921] border border-[#1F242D] text-xs font-mono text-gray-300 hover:text-white rounded-[2px] transition-all cursor-pointer"
                title="Beginner Walkthrough Tour"
              >
                <HelpCircle className="w-3.5 h-3.5 text-[#D2FF00]" />
                <span className="hidden md:inline">Tour</span>
              </button>

              {/* Mobile View Toggle (Editor vs Preview) */}
              <div className="lg:hidden flex bg-[#0E1116] rounded-[2px] p-0.5 border border-[#1F242D] text-xs font-mono font-bold">
                {['editor', 'preview'].map(view => (
                  <button
                    key={view} 
                    onClick={() => {
                      haptics.selection();
                      asmrAudio.playSwitch();
                      setMobileView(view);
                    }}
                    className={`px-2.5 py-1 rounded-[2px] transition-all capitalize ${mobileView === view ? 'bg-[#D2FF00] text-[#08090C] font-bold shadow-sm' : 'text-gray-400 hover:text-white'}`}
                  >
                    {view}
                  </button>
                ))}
              </div>

              {/* Desktop Viewport Switchers */}
              <div className="hidden lg:flex items-center bg-[#0E1116] rounded-[2px] p-0.5 border border-[#1F242D]">
                {[
                  { id: 'desktop', icon: Monitor, label: '1440px' },
                  { id: 'tablet', icon: Tablet, label: '768px' },
                  { id: 'mobile', icon: Smartphone, label: '390px' }
                ].map(mode => (
                  <button
                    key={mode.id} 
                    onClick={() => {
                      haptics.selection();
                      asmrAudio.playSwitch();
                      setPreviewMode(mode.id);
                    }}
                    className={`px-2 py-1 rounded-[2px] text-[11px] font-mono flex items-center gap-1 transition-all cursor-pointer ${previewMode === mode.id ? 'bg-[#1F242D] text-[#D2FF00] font-bold' : 'text-gray-500 hover:text-gray-300'}`}
                    title={`Preview in ${mode.label}`}
                  >
                    <mode.icon className="w-3.5 h-3.5" />
                    <span className="hidden xl:inline">{mode.label}</span>
                  </button>
                ))}
              </div>

              {/* JSON Export/Import */}
              <div className="hidden sm:flex items-center gap-1.5">
                <label className="cursor-pointer flex items-center justify-center w-8 h-8 rounded-[2px] border border-[#1F242D] bg-[#0E1116] hover:bg-[#151921] text-gray-400 hover:text-white transition-colors" title="Import JSON Config">
                  <Upload className="w-3.5 h-3.5" />
                  <input type="file" accept=".json" onChange={handleImportJson} className="hidden" />
                </label>
                <button onClick={handleExportJson} className="flex items-center justify-center w-8 h-8 rounded-[2px] border border-[#1F242D] bg-[#0E1116] hover:bg-[#151921] text-gray-400 hover:text-white transition-colors cursor-pointer" title="Export JSON Config">
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Primary High-Impact Deploy Button */}
              <motion.button
                whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
                onClick={handlePublish} disabled={isPublishing}
                className="px-3.5 sm:px-4 py-1.5 sm:py-2 bg-[#D2FF00] hover:bg-[#b8e000] text-[#08090C] font-mono font-black text-xs sm:text-sm rounded-[2px] shadow-[0_0_16px_rgba(210,255,0,0.35)] flex items-center gap-1.5 transition-all cursor-pointer shrink-0 border border-[#D2FF00]"
              >
                {isPublishing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Globe className="w-4 h-4 stroke-[2.5]" />}
                <span className="tracking-tight uppercase">Deploy</span>
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

      {/* Universal Floating Toast for Actions & Feedback */}
      <AnimatePresence>
        {statusMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            className="fixed top-4 sm:top-5 left-1/2 -translate-x-1/2 z-50 bg-[#0E1116] border border-[#D2FF00]/40 px-4 py-2 rounded-[2px] shadow-[0_0_25px_rgba(210,255,0,0.15)] flex items-center gap-2 max-w-[90vw] font-mono pointer-events-none"
          >
            <Sparkles className="w-4 h-4 text-[#D2FF00] shrink-0" />
            <span className="text-xs font-bold text-white">{statusMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- AI PROMPT & RESUME PDF HERO BANNER --- */}
      <section className="relative z-10 bg-[#0E1116]/80 border-b border-[#1F242D] py-3 px-4 backdrop-blur-md">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row gap-3 items-center justify-between">
          
          {/* AI Custom Prompt Input */}
          <div className="flex-1 w-full relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-500 font-mono text-xs">
              <Sparkles className="w-4 h-4 text-[#D2FF00]" />
            </div>
            <input
              type="text"
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="Describe your role to auto-craft portfolio blocks (e.g. 'Staff Security Architect specializing in eBPF')..."
              className="w-full bg-[#08090C] border border-[#1F242D] focus:border-[#D2FF00] rounded-[2px] pl-9 pr-24 py-2.5 text-xs sm:text-sm text-gray-100 placeholder-gray-500 focus:outline-none transition-all font-mono"
              onKeyDown={(e) => e.key === 'Enter' && handleGenerateFromAi()}
            />
            <div className="absolute inset-y-1 right-1 flex items-center">
              <button
                onClick={handleGenerateFromAi}
                disabled={isGeneratingAi || !aiPrompt.trim()}
                className="h-full px-3 bg-[#151921] hover:bg-[#1F242D] border border-[#1F242D] disabled:opacity-40 text-[#D2FF00] font-mono font-bold text-xs rounded-[2px] flex items-center gap-1 transition-all cursor-pointer"
              >
                {isGeneratingAi ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Zap className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">Synthesize</span>
              </button>
            </div>
          </div>

          {/* Quick Role & PDF Upload Triggers */}
          <div className="w-full md:w-auto flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 md:pb-0">
            {/* 1-Click Resume PDF Auto-Fill */}
            <button
              type="button"
              onClick={() => {
                haptics.selection();
                asmrAudio.playClick();
                pdfInputRef.current?.click();
              }}
              disabled={isParsingPdf}
              className="px-3.5 py-1.5 bg-[#D2FF00]/10 hover:bg-[#D2FF00]/20 border border-[#D2FF00]/40 text-[#D2FF00] font-mono font-bold text-xs rounded-[2px] flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(210,255,0,0.1)] active:scale-95 cursor-pointer whitespace-nowrap shrink-0"
              title="Upload your resume PDF to instantly auto-fill all profile fields"
            >
              {isParsingPdf ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <FileText className="w-3.5 h-3.5" />}
              <span>{isParsingPdf ? 'Parsing AST...' : '⚡ PDF Auto-Fill'}</span>
            </button>

            {/* Quick Presets */}
            {ROLE_PRESETS.map(preset => (
              <button
                key={preset.id} 
                onClick={() => loadPreset(preset.id)}
                className="px-2.5 py-1.5 bg-[#08090C] hover:bg-[#151921] border border-[#1F242D] hover:border-gray-500 rounded-[2px] text-xs font-mono text-gray-400 hover:text-white transition-all whitespace-nowrap shrink-0 cursor-pointer"
              >
                {preset.id === 'cybersecurity' && '🛡️ SecOps'}
                {preset.id === 'fullstack' && '🚀 Full-Stack'}
                {preset.id === 'ai_ml' && '🔮 AI / ML'}
                {preset.id === 'devops' && '⚡ DevOps'}
                {preset.id === 'fresher' && '💡 Fresher'}
                {preset.id === 'designer' && '✨ UI/UX'}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* --- STUDIO MAIN WORKBENCH GRID --- */}
      <div className="flex-1 max-w-[1600px] w-full mx-auto p-3 sm:p-4 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 relative z-10 pb-20">
        
        {/* === LEFT CONFIGURATION PANE (COL-SPAN-5) === */}
        <div className={`lg:col-span-5 flex flex-col h-[calc(100vh-170px)] ${mobileView === 'preview' ? 'hidden lg:flex' : 'flex'}`}>
          
          {/* Tectonic Sliding Tabs */}
          <div className="flex overflow-x-auto no-scrollbar bg-[#0E1116] p-1 rounded-[2px] border border-[#1F242D] mb-3 gap-1 shrink-0">
            {TABS.map(tab => (
              <button
                key={tab.id} 
                onClick={() => {
                  haptics.selection();
                  asmrAudio.playSwitch();
                  setActiveTab(tab.id);
                }}
                className={`relative px-3 py-2 rounded-[2px] text-xs font-mono font-bold flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer ${activeTab === tab.id ? 'text-[#08090C]' : 'text-gray-400 hover:text-white'}`}
              >
                {activeTab === tab.id && (
                  <motion.div layoutId="activeTab" className="absolute inset-0 bg-[#D2FF00] rounded-[2px]" transition={{ type: "spring", stiffness: 450, damping: 32 }} />
                )}
                <tab.icon className="w-3.5 h-3.5 relative z-10" />
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Form Scroll Area */}
          <div className="flex-1 bg-[#0E1116] rounded-[2px] p-4 sm:p-5 border border-[#1F242D] overflow-y-auto custom-scrollbar relative flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 8 }} transition={{ duration: 0.18 }}
                className="space-y-5 pb-4 font-sans"
              >
                
                {/* 1. THEMES TAB */}
                {activeTab === 'theme' && (
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                          <Palette className="w-3.5 h-3.5 text-[#D2FF00]" /> 1. Select Visual Aesthetic ({THEMES.length} Themes)
                        </h3>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {THEMES.map(theme => (
                          <div
                            key={theme.id} 
                            onClick={() => {
                              haptics.light();
                              asmrAudio.playSwitch();
                              handleInputChange('theme', theme.id);
                              if (theme.accentColor) {
                                handleInputChange('accentColor', theme.accentColor);
                              }
                            }}
                            className={`p-3 rounded-[2px] border cursor-pointer transition-all ${portfolioData.theme === theme.id ? 'border-[#D2FF00] bg-[#D2FF00]/5 shadow-[0_0_14px_rgba(210,255,0,0.12)]' : 'border-[#1F242D] bg-[#08090C]/60 hover:border-gray-600'}`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-bold text-xs text-white truncate">{theme.name}</span>
                              <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-[2px] bg-[#151921] text-gray-300 shrink-0">{theme.badge}</span>
                            </div>
                            <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed">{theme.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Accent Colors */}
                    <div>
                      <h3 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest mb-3">
                        2. Kinetic Accent Glow
                      </h3>
                      <div className="flex flex-wrap gap-2.5">
                        {ACCENT_COLORS.map(color => (
                          <button
                            key={color.id} 
                            onClick={() => {
                              haptics.light();
                              asmrAudio.playPop();
                              handleInputChange('accentColor', color.id);
                            }}
                            className={`w-10 h-10 rounded-[2px] flex items-center justify-center transition-all cursor-pointer ${portfolioData.accentColor === color.id ? 'bg-[#151921] ring-2 ring-[#D2FF00] scale-105' : 'bg-[#08090C] border border-[#1F242D] hover:border-gray-600'}`}
                            title={color.name}
                          >
                            <span className="w-5 h-5 rounded-[2px] shadow-sm" style={{ backgroundColor: color.hex }} />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Vanity URL Claim */}
                    <div className="pt-4 border-t border-[#1F242D] space-y-2.5">
                      <label className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest flex items-center justify-between">
                        <span>3. Claim Public Vanity URL</span>
                        <span className="text-[10px] text-gray-500 font-normal">Free Hosted Subdomain</span>
                      </label>
                      <div className={`flex items-center bg-[#08090C] border rounded-[2px] px-3 py-2 transition-colors ${slugStatus.state === 'taken' || slugErrorAlert ? 'border-red-500/60' : slugStatus.state === 'available' ? 'border-[#D2FF00]' : 'border-[#1F242D] focus-within:border-[#D2FF00]'}`}>
                        <span className="text-xs text-gray-500 font-mono">pandalime.com/p/</span>
                        <input
                          type="text" value={portfolioData.slug || ''}
                          onChange={(e) => { 
                            setSlugErrorAlert(''); 
                            handleInputChange('slug', e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, '-')); 
                          }}
                          placeholder="your-name"
                          className="bg-transparent border-none text-[#D2FF00] font-bold text-xs sm:text-sm focus:outline-none flex-1 font-mono ml-1"
                        />
                      </div>
                      {slugErrorAlert && (
                        <p className="text-xs text-red-400 font-mono font-semibold flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{slugErrorAlert}</span>
                        </p>
                      )}
                      {slugStatus.message && !slugErrorAlert && (
                        <p className={`text-xs font-mono ${slugStatus.state === 'available' ? 'text-[#D2FF00]' : 'text-amber-400'}`}>{slugStatus.message}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* 2. IDENTITY & PROFILE TAB */}
                {activeTab === 'profile' && (
                  <div className="space-y-4">
                    {/* PDF Resume Fast Auto-fill Banner */}
                    <div className="bg-[#08090C] border border-[#D2FF00]/30 rounded-[2px] p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-[2px] bg-[#D2FF00]/10 border border-[#D2FF00]/30 flex items-center justify-center text-[#D2FF00] shrink-0">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white font-mono">Auto-Fill from Resume PDF</p>
                          <p className="text-[11px] text-gray-400">Extracts bio, stack, metrics & roles directly.</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          haptics.selection();
                          asmrAudio.playClick();
                          pdfInputRef.current?.click();
                        }}
                        disabled={isParsingPdf}
                        className="w-full sm:w-auto px-3 py-1.5 bg-[#D2FF00] hover:bg-[#b8e000] text-[#08090C] font-mono font-bold text-xs rounded-[2px] flex items-center justify-center gap-1.5 transition-all cursor-pointer shrink-0"
                      >
                        {isParsingPdf ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Upload className="w-3 h-3" />}
                        <span>{isParsingPdf ? 'Parsing...' : 'Upload PDF'}</span>
                      </button>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400">Full Name</label>
                      <input type="text" value={portfolioData.fullName || ''} onChange={(e) => handleInputChange('fullName', e.target.value)} className="w-full bg-[#08090C] border border-[#1F242D] focus:border-[#D2FF00] rounded-[2px] px-3 py-2 text-xs text-white focus:outline-none font-mono" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400">Professional Title</label>
                      <input type="text" value={portfolioData.title || ''} onChange={(e) => handleInputChange('title', e.target.value)} placeholder="e.g. Staff Distributed Systems Engineer" className="w-full bg-[#08090C] border border-[#1F242D] focus:border-[#D2FF00] rounded-[2px] px-3 py-2 text-xs text-white focus:outline-none font-mono" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400">Hero Tagline</label>
                      <input type="text" value={portfolioData.tagline || ''} onChange={(e) => handleInputChange('tagline', e.target.value)} placeholder="e.g. ⚡ Low-Latency Systems • Rust & eBPF • High-Throughput Cloud" className="w-full bg-[#08090C] border border-[#1F242D] focus:border-[#D2FF00] rounded-[2px] px-3 py-2 text-xs text-white focus:outline-none font-mono" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400">Location & Open-to-Work Status</label>
                      <input type="text" value={portfolioData.location || ''} onChange={(e) => handleInputChange('location', e.target.value)} placeholder="Bengaluru, India / Remote" className="w-full bg-[#08090C] border border-[#1F242D] focus:border-[#D2FF00] rounded-[2px] px-3 py-2 text-xs text-white focus:outline-none font-mono" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400">Avatar Image</label>
                      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                        {PRESET_AVATARS.map(avatar => (
                          <img 
                            key={avatar.id} src={avatar.url} alt={avatar.label} 
                            onClick={() => {
                              haptics.light();
                              asmrAudio.playPop();
                              handleInputChange('avatarUrl', avatar.url);
                            }} 
                            className={`w-10 h-10 rounded-[2px] object-cover cursor-pointer transition-all shrink-0 ${portfolioData.avatarUrl === avatar.url ? 'ring-2 ring-[#D2FF00] scale-105' : 'opacity-50 hover:opacity-100 border border-[#1F242D]'}`} 
                          />
                        ))}
                      </div>
                      <input type="text" value={portfolioData.avatarUrl || ''} onChange={(e) => handleInputChange('avatarUrl', e.target.value)} placeholder="Custom Image URL..." className="w-full bg-[#08090C] border border-[#1F242D] focus:border-[#D2FF00] rounded-[2px] px-3 py-1.5 text-xs text-white focus:outline-none font-mono" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                         <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400">Executive Bio</label>
                         <button onClick={handlePolishBio} disabled={isPolishingBio} className="text-[10px] font-mono text-[#D2FF00] hover:underline font-bold flex items-center gap-1 cursor-pointer">
                           <Sparkles className="w-3 h-3"/> {isPolishingBio ? 'Polishing...' : 'AI Polish Bio'}
                         </button>
                      </div>
                      <textarea rows={3} value={portfolioData.bio || ''} onChange={(e) => handleInputChange('bio', e.target.value)} className="w-full bg-[#08090C] border border-[#1F242D] focus:border-[#D2FF00] rounded-[2px] p-3 text-xs text-white focus:outline-none leading-relaxed font-sans" />
                    </div>
                  </div>
                )}

                {/* 3. SOCIALS & CONTACT TAB */}
                {activeTab === 'social' && (
                  <div className="space-y-3.5">
                     {[
                       { id: 'linkedin', icon: Linkedin, label: 'LinkedIn Profile URL', color: 'text-blue-400', placeholder: 'https://linkedin.com/in/username' },
                       { id: 'github', icon: Github, label: 'GitHub Profile URL', color: 'text-gray-200', placeholder: 'https://github.com/username' },
                       { id: 'twitter', icon: Twitter, label: 'X (Twitter) URL', color: 'text-sky-400', placeholder: 'https://x.com/username' },
                       { id: 'tryhackme', icon: Terminal, label: 'TryHackMe / LeetCode / HuggingFace', color: 'text-emerald-400', placeholder: 'https://tryhackme.com/p/username' },
                       { id: 'website', icon: Globe, label: 'Personal Blog / Project Site', color: 'text-purple-400', placeholder: 'https://mysite.dev' },
                     ].map(social => (
                       <div key={social.id} className="space-y-1">
                         <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                           <social.icon className={`w-3.5 h-3.5 ${social.color}`}/> {social.label}
                         </label>
                         <input type="text" value={portfolioData.socialLinks?.[social.id] || ''} onChange={(e) => handleSocialChange(social.id, e.target.value)} placeholder={social.placeholder} className="w-full bg-[#08090C] border border-[#1F242D] focus:border-[#D2FF00] rounded-[2px] px-3 py-2 text-xs text-white focus:outline-none font-mono" />
                       </div>
                     ))}
                     <div className="space-y-1 pt-2 border-t border-[#1F242D]">
                       <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400">Recruiter Contact Email</label>
                       <input type="email" value={portfolioData.contactEmail || ''} onChange={(e) => handleInputChange('contactEmail', e.target.value)} placeholder="recruiter-contact@domain.com" className="w-full bg-[#08090C] border border-[#1F242D] focus:border-[#D2FF00] rounded-[2px] px-3 py-2 text-xs text-white focus:outline-none font-mono" />
                     </div>
                  </div>
                )}

                {/* 4. SKILLS TAB */}
                {activeTab === 'skills' && (
                  <div className="space-y-3.5">
                    <button onClick={addSkillCategory} className="w-full py-2 bg-[#08090C] hover:bg-[#151921] border border-[#1F242D] hover:border-[#D2FF00]/40 rounded-[2px] text-xs font-mono font-bold text-gray-300 hover:text-[#D2FF00] flex items-center justify-center gap-1.5 transition-all cursor-pointer">
                      <Plus className="w-3.5 h-3.5"/> + Add New Skill Category
                    </button>
                    <AnimatePresence>
                      {Object.entries(portfolioData.skills || {}).map(([category, skillsList]) => (
                        <motion.div key={category} variants={fadeUp} initial="hidden" animate="visible" exit="exit" className="bg-[#08090C] p-3.5 rounded-[2px] border border-[#1F242D] space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-[11px] font-mono font-bold text-white uppercase tracking-wider">{category}</span>
                            <button onClick={() => removeSkillCategory(category)} className="text-gray-500 hover:text-red-400 cursor-pointer p-0.5">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <input type="text" value={skillsList.join(', ')} onChange={(e) => handleSkillsChange(category, e.target.value)} placeholder="Comma-separated (e.g. Rust, Go, Kubernetes, eBPF)" className="w-full bg-[#0E1116] border border-[#1F242D] focus:border-[#D2FF00] rounded-[2px] px-3 py-1.5 text-xs text-white focus:outline-none font-mono" />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}

                {/* 5. PROJECTS TAB */}
                {activeTab === 'projects' && (
                  <div className="space-y-3.5">
                    <button onClick={addProject} className="w-full py-2 bg-[#08090C] hover:bg-[#151921] border border-[#1F242D] hover:border-[#D2FF00]/40 rounded-[2px] text-xs font-mono font-bold text-gray-300 hover:text-[#D2FF00] flex items-center justify-center gap-1.5 transition-all cursor-pointer">
                      <Plus className="w-3.5 h-3.5"/> + Add Featured Project
                    </button>
                    <motion.div variants={listContainer} initial="hidden" animate="visible" className="space-y-3">
                      <AnimatePresence>
                        {(portfolioData.projects || []).map((project, idx) => (
                          <motion.div key={idx} variants={fadeUp} initial="hidden" animate="visible" exit="exit" className="bg-[#08090C] p-3.5 rounded-[2px] border border-[#1F242D] space-y-2.5 relative group">
                             <button onClick={() => removeProject(idx)} className="absolute top-3 right-3 text-gray-500 hover:text-red-400 cursor-pointer p-0.5">
                               <Trash2 className="w-3.5 h-3.5" />
                             </button>
                             <div className="space-y-1 pt-1">
                               <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400">Project Title</label>
                               <input type="text" value={project.title || ''} onChange={(e) => handleProjectChange(idx, 'title', e.target.value)} className="w-full bg-[#0E1116] border border-[#1F242D] focus:border-[#D2FF00] rounded-[2px] px-3 py-1.5 text-xs font-bold text-white focus:outline-none font-mono" />
                             </div>
                             <div className="space-y-1">
                               <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400">Impact Metric / Recruiter Badge</label>
                               <input type="text" value={project.metric || ''} onChange={(e) => handleProjectChange(idx, 'metric', e.target.value)} placeholder="e.g. ⭐ 1.4k Stars • +4.2x Throughput" className="w-full bg-[#0E1116] border border-[#1F242D] focus:border-[#D2FF00] rounded-[2px] px-3 py-1.5 text-xs text-[#D2FF00] focus:outline-none font-mono" />
                             </div>
                             <div className="space-y-1">
                               <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400">Description</label>
                               <textarea rows={2} value={project.description || ''} onChange={(e) => handleProjectChange(idx, 'description', e.target.value)} className="w-full bg-[#0E1116] border border-[#1F242D] focus:border-[#D2FF00] rounded-[2px] px-3 py-1.5 text-xs text-gray-300 focus:outline-none font-sans" />
                             </div>
                             <div className="grid grid-cols-2 gap-2">
                                <input type="text" value={project.demoUrl || ''} onChange={(e) => handleProjectChange(idx, 'demoUrl', e.target.value)} placeholder="Live Demo URL" className="w-full bg-[#0E1116] border border-[#1F242D] focus:border-[#D2FF00] rounded-[2px] px-2.5 py-1.5 text-[11px] text-white focus:outline-none font-mono" />
                                <input type="text" value={project.githubUrl || ''} onChange={(e) => handleProjectChange(idx, 'githubUrl', e.target.value)} placeholder="GitHub Repository" className="w-full bg-[#0E1116] border border-[#1F242D] focus:border-[#D2FF00] rounded-[2px] px-2.5 py-1.5 text-[11px] text-white focus:outline-none font-mono" />
                             </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </motion.div>
                  </div>
                )}

                {/* 6. CAREER LOG TAB */}
                {activeTab === 'experience' && (
                  <div className="space-y-3.5">
                    <button onClick={addExperience} className="w-full py-2 bg-[#08090C] hover:bg-[#151921] border border-[#1F242D] hover:border-[#D2FF00]/40 rounded-[2px] text-xs font-mono font-bold text-gray-300 hover:text-[#D2FF00] flex items-center justify-center gap-1.5 transition-all cursor-pointer">
                      <Plus className="w-3.5 h-3.5"/> + Add Career Experience Role
                    </button>
                    <motion.div variants={listContainer} initial="hidden" animate="visible" className="space-y-3">
                      <AnimatePresence>
                        {(portfolioData.experience || []).map((exp, idx) => (
                          <motion.div key={idx} variants={fadeUp} initial="hidden" animate="visible" exit="exit" className="bg-[#08090C] p-3.5 rounded-[2px] border border-[#1F242D] space-y-2.5 relative">
                            <button onClick={() => removeExperience(idx)} className="absolute top-3 right-3 text-gray-500 hover:text-red-400 cursor-pointer p-0.5">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                            <div className="grid grid-cols-2 gap-2 pt-1">
                               <div className="space-y-1"><label className="text-[10px] font-mono font-bold uppercase text-gray-400">Role Title</label><input type="text" value={exp.role || ''} onChange={(e) => handleExperienceChange(idx, 'role', e.target.value)} className="w-full bg-[#0E1116] border border-[#1F242D] rounded-[2px] px-2.5 py-1.5 text-xs text-white focus:outline-none font-mono" /></div>
                               <div className="space-y-1"><label className="text-[10px] font-mono font-bold uppercase text-gray-400">Company</label><input type="text" value={exp.company || ''} onChange={(e) => handleExperienceChange(idx, 'company', e.target.value)} className="w-full bg-[#0E1116] border border-[#1F242D] rounded-[2px] px-2.5 py-1.5 text-xs text-white focus:outline-none font-mono" /></div>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                               <div className="space-y-1"><label className="text-[10px] font-mono font-bold uppercase text-gray-400">Period</label><input type="text" value={exp.period || ''} onChange={(e) => handleExperienceChange(idx, 'period', e.target.value)} placeholder="2023 - Present" className="w-full bg-[#0E1116] border border-[#1F242D] rounded-[2px] px-2.5 py-1.5 text-[11px] text-white focus:outline-none font-mono" /></div>
                               <div className="space-y-1"><label className="text-[10px] font-mono font-bold uppercase text-gray-400">Location</label><input type="text" value={exp.location || ''} onChange={(e) => handleExperienceChange(idx, 'location', e.target.value)} placeholder="Bengaluru / Remote" className="w-full bg-[#0E1116] border border-[#1F242D] rounded-[2px] px-2.5 py-1.5 text-[11px] text-white focus:outline-none font-mono" /></div>
                            </div>
                            <div className="space-y-1.5 pt-2 border-t border-[#1F242D]">
                              <div className="flex justify-between items-center"><label className="text-[10px] font-mono font-bold uppercase text-gray-400">Google XYZ Accomplishments</label><button onClick={() => addExperienceBullet(idx)} className="text-[10px] font-mono text-[#D2FF00] hover:underline font-bold cursor-pointer">+ Add Bullet</button></div>
                              {(exp.bullets || []).map((bullet, bIdx) => (
                                <div key={bIdx} className="flex gap-1.5">
                                  <input type="text" value={bullet} onChange={(e) => handleExperienceBulletChange(idx, bIdx, e.target.value)} className="flex-1 bg-[#0E1116] border border-[#1F242D] rounded-[2px] px-2.5 py-1.5 text-xs text-gray-200 focus:outline-none font-sans" />
                                  <button onClick={() => removeExperienceBullet(idx, bIdx)} className="text-gray-500 hover:text-red-400 p-1 cursor-pointer"><Trash2 className="w-3 h-3"/></button>
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

            {/* Editor Bottom Actions */}
            <div className="pt-3 mt-3 border-t border-[#1F242D] flex flex-col sm:flex-row gap-2 shrink-0">
              <button
                onClick={() => {
                  haptics.selection();
                  asmrAudio.playSwitch();
                  setMobileView('preview');
                }}
                className="lg:hidden w-full py-2.5 bg-[#151921] hover:bg-[#1F242D] text-gray-200 font-mono font-bold text-xs rounded-[2px] flex items-center justify-center gap-1.5 border border-[#1F242D] cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-[#D2FF00]" />
                <span>Switch to Live Preview Canvas</span>
              </button>

              <button
                onClick={handlePublish}
                disabled={isPublishing}
                className="w-full py-2.5 bg-[#D2FF00] hover:bg-[#b8e000] text-[#08090C] font-mono font-black text-xs sm:text-sm rounded-[2px] shadow-[0_0_14px_rgba(210,255,0,0.3)] flex items-center justify-center gap-2 transition-all cursor-pointer border border-[#D2FF00]"
              >
                {isPublishing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Globe className="w-4 h-4 stroke-[2.5]" />}
                <span>DEPLOY & PUBLISH TO DOMAIN</span>
              </button>
            </div>
          </div>
        </div>

        {/* === RIGHT LIVE INTERACTIVE PREVIEW (COL-SPAN-7) === */}
        <div className={`lg:col-span-7 flex flex-col items-center h-[calc(100vh-170px)] ${mobileView === 'editor' ? 'hidden lg:flex' : 'flex'}`}>
          
          <div className="w-full flex items-center justify-between mb-2 px-1">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-gray-400">
              <span className="w-2 h-2 rounded-full bg-[#D2FF00] animate-pulse" />
              <span>LIVE COMPILATION // {selectedTheme.name}</span>
            </div>
            
            {/* Mobile Top Switch Back */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                onClick={() => {
                  haptics.selection();
                  asmrAudio.playSwitch();
                  setMobileView('editor');
                }}
                className="text-[11px] font-mono font-bold text-gray-300 bg-[#0E1116] border border-[#1F242D] px-2.5 py-1 rounded-[2px] flex items-center gap-1 cursor-pointer"
              >
                <span>Edit Content</span>
              </button>
              
              <button
                onClick={handlePublish}
                disabled={isPublishing}
                className="text-[11px] font-mono font-black text-[#08090C] bg-[#D2FF00] hover:bg-[#b8e000] px-3 py-1 rounded-[2px] flex items-center gap-1 shadow-md shadow-[#D2FF00]/20 cursor-pointer"
              >
                <span>Deploy</span>
              </button>
            </div>
          </div>

          {/* Browser Window Mockup Frame */}
          <div className={`w-full h-full bg-[#0E1116] border border-[#1F242D] rounded-[2px] shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ${previewMode === 'mobile' ? 'max-w-sm mx-auto' : previewMode === 'tablet' ? 'max-w-2xl mx-auto' : 'max-w-full'}`}>
            
            {/* Window Header */}
            <div className="h-8 border-b border-[#1F242D] bg-[#08090C] flex items-center px-3 gap-2 shrink-0 justify-between">
               <div className="flex items-center gap-1.5">
                 <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                 <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                 <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
               </div>

               <div className="flex items-center justify-center bg-[#151921] rounded-[2px] px-3 py-0.5 border border-[#1F242D] max-w-[280px] truncate">
                 <span className="text-[10px] text-gray-400 font-mono truncate">https://pandalime.com/p/{portfolioData.slug || 'preview'}</span>
               </div>

               <div className="text-[9px] font-mono text-[#D2FF00] font-bold">
                 LATENCY: 8ms
               </div>
            </div>

            {/* Inner Portfolio Render Area */}
            <div className={`flex-1 overflow-y-auto custom-scrollbar ${selectedTheme.bgClass} p-5 sm:p-7 space-y-6`}>
              
              {/* Profile Hero Header */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 pb-5 border-b border-current/10">
                <img 
                  src={portfolioData.avatarUrl || PRESET_AVATARS[0].url} 
                  alt={portfolioData.fullName || 'User Avatar'} 
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-[2px] object-cover shadow-xl shrink-0" 
                  style={{ border: `2px solid ${selectedAccent.hex}` }} 
                />
                
                <div className="text-center sm:text-left space-y-1 flex-1">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <h2 className="text-xl sm:text-2xl font-black tracking-tight">{portfolioData.fullName || 'Alex Vance'}</h2>
                    {portfolioData.availabilityStatus && (
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-[2px] bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                        AVAILABLE
                      </span>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm font-bold tracking-wide uppercase font-mono" style={{ color: selectedAccent.hex }}>
                    {portfolioData.title || 'Senior Engineer'}
                  </p>

                  {portfolioData.location && (
                    <p className="text-[11px] opacity-70 flex items-center justify-center sm:justify-start gap-1">
                      <MapPin className="w-3 h-3 shrink-0" />
                      <span>{portfolioData.location}</span>
                    </p>
                  )}

                  {portfolioData.bio && (
                    <p className="text-xs opacity-80 leading-relaxed pt-1">{portfolioData.bio}</p>
                  )}
                </div>
              </div>

              {/* Technical Skills Matrix */}
              {portfolioData.skills && Object.keys(portfolioData.skills).length > 0 && (
                <div className="space-y-2.5">
                  <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider opacity-70 flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5" style={{ color: selectedAccent.hex }} /> Technical Stack & Tooling
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {Object.entries(portfolioData.skills).map(([cat, skList]) => (
                      <div key={cat} className={`p-2.5 rounded-[2px] ${selectedTheme.cardClass} space-y-1.5`}>
                        <p className="text-[10px] font-mono font-bold uppercase tracking-wider opacity-90">{cat}</p>
                        <div className="flex flex-wrap gap-1">
                          {skList.map((skill, sIdx) => (
                            <span key={sIdx} className="text-[10px] font-mono px-1.5 py-0.5 rounded-[2px] bg-black/20 border border-current/15">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Featured Projects */}
              {portfolioData.projects && portfolioData.projects.length > 0 && (
                <div className="space-y-2.5">
                  <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider opacity-70 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" style={{ color: selectedAccent.hex }} /> Featured Deployments & Architecture
                  </h4>
                  <div className="space-y-2.5">
                    {portfolioData.projects.map((proj, pIdx) => (
                      <div key={pIdx} className={`p-3.5 rounded-[2px] ${selectedTheme.cardClass} space-y-2`}>
                        <div className="flex justify-between items-start gap-2">
                          <h5 className="font-bold text-xs sm:text-sm">{proj.title}</h5>
                          {proj.metric && (
                            <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-[2px] bg-black/30 border border-current/20 shrink-0" style={{ color: selectedAccent.hex }}>
                              {proj.metric}
                            </span>
                          )}
                        </div>
                        {proj.description && (
                          <p className="text-xs opacity-75 leading-relaxed">{proj.description}</p>
                        )}
                        {(proj.demoUrl || proj.githubUrl) && (
                          <div className="flex items-center gap-3 pt-1 border-t border-current/10 text-[11px] font-mono font-bold">
                            {proj.demoUrl && (
                              <a href={proj.demoUrl} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1" style={{ color: selectedAccent.hex }}>
                                <span>Live Demo</span> <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                            {proj.githubUrl && (
                              <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="opacity-70 hover:opacity-100 flex items-center gap-1">
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

              {/* Work Experience */}
              {portfolioData.experience && portfolioData.experience.length > 0 && (
                <div className="space-y-2.5">
                  <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider opacity-70 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5" style={{ color: selectedAccent.hex }} /> Career Timeline
                  </h4>
                  <div className="space-y-2.5">
                    {portfolioData.experience.map((exp, eIdx) => (
                      <div key={eIdx} className={`p-3.5 rounded-[2px] ${selectedTheme.cardClass} space-y-1.5`}>
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="font-bold text-xs sm:text-sm">{exp.role}</h5>
                            <p className="text-xs font-mono font-semibold" style={{ color: selectedAccent.hex }}>{exp.company}</p>
                          </div>
                          <span className="text-[10px] font-mono opacity-60">{exp.period}</span>
                        </div>
                        {exp.bullets && exp.bullets.length > 0 && (
                          <ul className="space-y-1 pt-1 text-xs opacity-80 list-disc list-outside ml-3.5">
                            {exp.bullets.map((bullet, bIdx) => (
                              <li key={bIdx} className="leading-relaxed">{bullet}</li>
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

      {/* --- BEGINNER INTERACTIVE ONBOARDING TUTORIAL MODAL --- */}
      <AnimatePresence>
        {tutorialOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 16 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0 }} 
              className="bg-[#0E1116] border border-[#1F242D] rounded-[2px] p-6 sm:p-7 max-w-lg w-full space-y-5 text-white shadow-2xl font-sans relative"
            >
              <div className="flex items-center justify-between border-b border-[#1F242D] pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-[#D2FF00] text-[#08090C] rounded-[2px] flex items-center justify-center font-bold text-xs">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-mono font-bold text-[#D2FF00]">{TUTORIAL_STEPS[tutorialStep].badge}</span>
                </div>
                <button 
                  onClick={closeTutorial} 
                  className="text-xs font-mono text-gray-400 hover:text-white cursor-pointer px-2 py-0.5 rounded-[2px] bg-[#151921] border border-[#1F242D]"
                >
                  Skip Tour ✕
                </button>
              </div>

              {/* Tutorial Step Content */}
              <div className="space-y-3">
                <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
                  {TUTORIAL_STEPS[tutorialStep].title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  {TUTORIAL_STEPS[tutorialStep].desc}
                </p>
              </div>

              {/* Step Progress Dots */}
              <div className="flex items-center gap-2 pt-1">
                {TUTORIAL_STEPS.map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`h-1.5 rounded-[2px] transition-all duration-300 ${tutorialStep === idx ? 'w-8 bg-[#D2FF00]' : 'w-2 bg-[#1F242D]'}`} 
                  />
                ))}
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 pt-3 border-t border-[#1F242D]">
                <button
                  onClick={loadSamplePractice}
                  className="w-full sm:w-auto px-3 py-2 bg-[#151921] hover:bg-[#1F242D] text-[#D2FF00] border border-[#D2FF00]/30 font-mono text-xs font-bold rounded-[2px] flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Load Practice Sample Data</span>
                </button>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  {tutorialStep > 0 && (
                    <button
                      onClick={() => {
                        haptics.selection();
                        asmrAudio.playSwitch();
                        setTutorialStep(tutorialStep - 1);
                      }}
                      className="px-3 py-2 bg-[#151921] hover:bg-[#1F242D] text-gray-300 font-mono text-xs rounded-[2px] cursor-pointer"
                    >
                      Back
                    </button>
                  )}

                  <button
                    onClick={() => {
                      haptics.selection();
                      asmrAudio.playClick();
                      if (tutorialStep < TUTORIAL_STEPS.length - 1) {
                        setTutorialStep(tutorialStep + 1);
                      } else {
                        closeTutorial();
                        asmrAudio.playChime();
                      }
                    }}
                    className="flex-1 sm:flex-initial px-4 py-2 bg-[#D2FF00] hover:bg-[#b8e000] text-[#08090C] font-mono font-bold text-xs rounded-[2px] shadow-[0_0_12px_rgba(210,255,0,0.25)] flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <span>{TUTORIAL_STEPS[tutorialStep].actionLabel}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- PUBLISH DEPLOYMENT MODAL --- */}
      <AnimatePresence>
        {publishModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.95, y: 16 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-[#0E1116] border border-[#D2FF00]/40 rounded-[2px] p-6 sm:p-8 max-w-md w-full space-y-5 text-white shadow-[0_0_50px_rgba(210,255,0,0.15)] font-sans">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-[#D2FF00]/10 text-[#D2FF00] rounded-[2px] flex items-center justify-center mx-auto border border-[#D2FF00]/30 shadow-[0_0_20px_rgba(210,255,0,0.2)]">
                  <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
                </div>
                <h3 className="text-xl sm:text-2xl font-mono font-black tracking-tight uppercase">Portfolio is Live!</h3>
                <p className="text-xs text-gray-400 font-mono">Compiled & deployed to cloud edge. Ready for recruiters.</p>
              </div>

              <div className="bg-[#08090C] p-3.5 rounded-[2px] border border-[#1F242D] space-y-1.5">
                <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-gray-500">Public Hosted Link</label>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs sm:text-sm font-mono text-[#D2FF00] font-bold truncate">{publicUrl}</span>
                  <button onClick={copyShareLink} className="p-1.5 bg-[#151921] hover:bg-[#1F242D] rounded-[2px] transition-all shrink-0 cursor-pointer border border-[#1F242D]" title="Copy Link">
                    {copiedLink ? <Check className="w-4 h-4 text-[#D2FF00]" /> : <Copy className="w-4 h-4 text-gray-300" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2 pt-1 font-mono">
                <a href={publicUrl} target="_blank" rel="noreferrer" className="w-full py-2.5 bg-[#D2FF00] hover:bg-[#b8e000] text-[#08090C] font-black rounded-[2px] text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-[0_0_16px_rgba(210,255,0,0.3)]">
                  <span>Open Live Portfolio</span> <ExternalLink className="w-4 h-4" />
                </a>
                <button 
                  onClick={() => {
                    haptics.light();
                    asmrAudio.playSwitch();
                    setPublishModalOpen(false);
                  }} 
                  className="w-full py-2 bg-transparent hover:bg-white/5 text-gray-400 font-bold rounded-[2px] text-xs transition-colors cursor-pointer"
                >
                  Back to Studio Editor
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
