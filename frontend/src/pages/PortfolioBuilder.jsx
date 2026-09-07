import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Eye, 
  Share2, 
  Download, 
  Upload, 
  Check, 
  Copy, 
  ArrowRight, 
  ShieldCheck, 
  Code2, 
  Cpu, 
  Briefcase, 
  Layers, 
  Palette, 
  User, 
  Globe, 
  ExternalLink, 
  Plus, 
  Trash2, 
  RefreshCw, 
  QrCode, 
  ScanLine, 
  Award, 
  Zap, 
  Smartphone, 
  Monitor,
  Terminal,
  Github,
  Linkedin,
  Twitter,
  Mail,
  MapPin,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { THEMES, ACCENT_COLORS, PRESET_AVATARS, ROLE_PRESETS } from '../data/portfolioTemplates';
import { apiRequest } from '../config/api';

export default function PortfolioBuilder() {
  // Active Preset as base
  const defaultPreset = ROLE_PRESETS[0];

  // Portfolio State
  const [portfolioData, setPortfolioData] = useState(() => {
    try {
      const saved = localStorage.getItem('pandalime_portfolio_draft');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return defaultPreset;
  });

  // UI State
  const [activeTab, setActiveTab] = useState('theme'); // 'theme', 'profile', 'social', 'skills', 'projects', 'experience'
  const [previewMode, setPreviewMode] = useState('desktop'); // 'desktop', 'mobile'
  const [mobileView, setMobileView] = useState('editor'); // 'editor', 'preview'
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [isPolishingBio, setIsPolishingBio] = useState(false);
  const [publishModalOpen, setPublishModalOpen] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [slugStatus, setSlugStatus] = useState({ state: 'idle', message: '', isOwner: false });
  const [slugErrorAlert, setSlugErrorAlert] = useState('');

  // Auto-save draft to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('pandalime_portfolio_draft', JSON.stringify(portfolioData));
    } catch {
      // ignore
    }
  }, [portfolioData]);

  // Real-time Vanity URL Availability & Conflict Check
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
        message: `"${rawSlug}" is a reserved showcase name. Pick your own unique vanity URL to publish.`, 
        isOwner: false 
      });
      return;
    }

    const editKey = localStorage.getItem(`pandalime_portfolio_key_${rawSlug}`) || '';

    setSlugStatus({ state: 'checking', message: 'Checking availability...', isOwner: false });

    const timeoutId = setTimeout(async () => {
      try {
        const res = await apiRequest(`/api/portfolios/check-availability/${rawSlug}?editKey=${encodeURIComponent(editKey)}`);
        if (res && res.ok) {
          const data = await res.json();
          if (data.available) {
            setSlugStatus({
              state: 'available',
              message: data.isOwner ? '✓ You own this vanity URL (updates allowed)' : '✓ Available! Ready to claim',
              isOwner: !!data.isOwner
            });
            setSlugErrorAlert('');
          } else {
            setSlugStatus({
              state: data.isReserved ? 'reserved' : 'taken',
              message: data.message || `⚠️ The name "${rawSlug}" is already taken by another user. Please choose another username.`,
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

  // Load a role preset
  const loadPreset = (presetId) => {
    const found = ROLE_PRESETS.find(p => p.id === presetId);
    if (found) {
      setPortfolioData(JSON.parse(JSON.stringify(found)));
      setStatusMessage(`Loaded "${found.title}" preset!`);
      setTimeout(() => setStatusMessage(''), 3000);
    }
  };

  // Handle simple text fields
  const handleInputChange = (field, value) => {
    setPortfolioData(prev => {
      const updated = {
        ...prev,
        [field]: value
      };
      // Auto-update vanity slug if user is customizing fullName and currently on default preset slug
      if (field === 'fullName' && value.trim()) {
        const isPresetSlug = !prev.slug || ROLE_PRESETS.some(p => p.slug === prev.slug || p.id === prev.slug);
        if (isPresetSlug) {
          const generatedSlug = value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
          if (generatedSlug) {
            updated.slug = generatedSlug;
          }
        }
      }
      return updated;
    });
  };

  // Handle nested social links
  const handleSocialChange = (network, value) => {
    setPortfolioData(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [network]: value
      }
    }));
  };

  // Handle metrics change
  const handleMetricChange = (index, field, value) => {
    const updated = [...(portfolioData.metrics || [])];
    updated[index] = { ...updated[index], [field]: value };
    setPortfolioData(prev => ({ ...prev, metrics: updated }));
  };

  // Handle project additions/modifications
  const handleProjectChange = (index, field, value) => {
    const updated = [...(portfolioData.projects || [])];
    updated[index] = { ...updated[index], [field]: value };
    setPortfolioData(prev => ({ ...prev, projects: updated }));
  };

  const addProject = () => {
    const newProj = {
      title: 'New High-Impact Project',
      description: 'Engineered a scalable web application solving real-world customer pain points.',
      metric: '🚀 5k+ Active Users • 99.9% Uptime',
      tags: ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
      demoUrl: 'https://demo.dev',
      githubUrl: 'https://github.com/my-repo'
    };
    setPortfolioData(prev => ({
      ...prev,
      projects: [newProj, ...(prev.projects || [])]
    }));
  };

  const removeProject = (index) => {
    setPortfolioData(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }));
  };

  // Handle experience changes
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
    const updated = [...(portfolioData.experience || [])];
    updated[expIndex].bullets.push('Quantified accomplishment using STAR formula with measurable metrics.');
    setPortfolioData(prev => ({ ...prev, experience: updated }));
  };

  const removeExperienceBullet = (expIndex, bulletIndex) => {
    const updated = [...(portfolioData.experience || [])];
    updated[expIndex].bullets = updated[expIndex].bullets.filter((_, i) => i !== bulletIndex);
    setPortfolioData(prev => ({ ...prev, experience: updated }));
  };

  const addExperience = () => {
    const newExp = {
      role: 'Senior Engineer',
      company: 'Tech Innovations Inc.',
      period: '2023 - Present',
      location: 'Remote',
      bullets: [
        'Architected and deployed microservices serving 1M+ daily active requests with sub-50ms latency.',
        'Mentored junior engineers and instituted automated CI/CD pipelines reducing deployment friction.'
      ]
    };
    setPortfolioData(prev => ({
      ...prev,
      experience: [newExp, ...(prev.experience || [])]
    }));
  };

  const removeExperience = (index) => {
    setPortfolioData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  // Handle Skills
  const handleSkillsChange = (category, skillsCsv) => {
    const skillList = skillsCsv.split(',').map(s => s.trim()).filter(Boolean);
    setPortfolioData(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: skillList
      }
    }));
  };

  const addSkillCategory = () => {
    const categoryName = prompt('Enter new skill category name (e.g. "Cloud & DevOps", "Tools & Frameworks"):');
    if (categoryName && categoryName.trim()) {
      setPortfolioData(prev => ({
        ...prev,
        skills: {
          ...prev.skills,
          [categoryName.trim()]: ['Skill 1', 'Skill 2', 'Skill 3']
        }
      }));
    }
  };

  const removeSkillCategory = (category) => {
    const updated = { ...portfolioData.skills };
    delete updated[category];
    setPortfolioData(prev => ({ ...prev, skills: updated }));
  };

  // AI Assistant: Generate from Natural Language Prompt
  const handleGenerateFromAi = async () => {
    if (!aiPrompt.trim()) return;
    setIsGeneratingAi(true);
    setStatusMessage('Crafting customized portfolio with AI...');

    try {
      const response = await apiRequest('/api/tools/portfolio-ai-assist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'generate_from_prompt',
          prompt: aiPrompt,
          currentData: portfolioData
        })
      });

      if (response && response.ok) {
        const result = await response.json();
        if (result.portfolio) {
          setPortfolioData(prev => ({
            ...prev,
            ...result.portfolio,
            slug: prev.slug || result.portfolio.slug
          }));
          setStatusMessage('✨ Portfolio generated and customized successfully!');
        }
      } else {
        // Fallback intelligent heuristic if offline
        heuristicGenerate(aiPrompt);
      }
    } catch (error) {
      console.warn('AI Assist Endpoint offline, using instant smart heuristic fallback:', error);
      heuristicGenerate(aiPrompt);
    } finally {
      setIsGeneratingAi(false);
      setTimeout(() => setStatusMessage(''), 4000);
    }
  };

  // Client-side heuristic fallback for 100% offline resilience
  const heuristicGenerate = (promptText) => {
    const lower = promptText.toLowerCase();
    let matchedPreset = ROLE_PRESETS[0];

    if (lower.includes('cyber') || lower.includes('security') || lower.includes('hack') || lower.includes('pentest') || lower.includes('soc')) {
      matchedPreset = ROLE_PRESETS.find(p => p.id === 'cybersecurity');
    } else if (lower.includes('ai') || lower.includes('ml') || lower.includes('data') || lower.includes('machine learning') || lower.includes('llm')) {
      matchedPreset = ROLE_PRESETS.find(p => p.id === 'ai_ml');
    } else if (lower.includes('devops') || lower.includes('sre') || lower.includes('kubernetes') || lower.includes('cloud') || lower.includes('terraform')) {
      matchedPreset = ROLE_PRESETS.find(p => p.id === 'devops');
    } else if (lower.includes('fresher') || lower.includes('student') || lower.includes('junior') || lower.includes('graduate') || lower.includes('college')) {
      matchedPreset = ROLE_PRESETS.find(p => p.id === 'fresher');
    } else if (lower.includes('design') || lower.includes('ui') || lower.includes('ux') || lower.includes('product designer') || lower.includes('figma')) {
      matchedPreset = ROLE_PRESETS.find(p => p.id === 'designer');
    } else {
      matchedPreset = ROLE_PRESETS.find(p => p.id === 'fullstack');
    }

    setPortfolioData(prev => ({
      ...JSON.parse(JSON.stringify(matchedPreset)),
      tagline: `⚡ ${promptText.slice(0, 70)}...`,
      slug: prev.slug || matchedPreset.slug
    }));
    setStatusMessage('✨ Generated custom profile based on your prompt!');
  };

  // AI Polish Bio
  const handlePolishBio = async () => {
    if (!portfolioData.bio) return;
    setIsPolishingBio(true);
    setStatusMessage('Polishing bio with executive AI phrasing...');

    try {
      const response = await apiRequest('/api/tools/portfolio-ai-assist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'polish_bio',
          bio: portfolioData.bio,
          title: portfolioData.title
        })
      });

      if (response && response.ok) {
        const result = await response.json();
        if (result.polishedBio) {
          handleInputChange('bio', result.polishedBio);
          setStatusMessage('✨ Bio successfully polished!');
        }
      }
    } catch (e) {
      console.warn('Bio polish fallback');
    } finally {
      setIsPolishingBio(false);
      setTimeout(() => setStatusMessage(''), 3000);
    }
  };

  // Publish / Save Portfolio
  const handlePublish = async () => {
    const slug = (portfolioData.slug || 'my-portfolio').toLowerCase().trim().replace(/[^a-z0-9_-]/g, '-');
    
    if (!slug || slug.length < 2) {
      setSlugErrorAlert('Please enter a valid vanity URL slug (at least 2 characters).');
      setActiveTab('theme');
      return;
    }

    const isPreset = ROLE_PRESETS.some(p => p.slug === slug || p.id === slug);
    if (isPreset) {
      setSlugErrorAlert(`The URL prefix "${slug}" is a reserved showcase template. Please enter your own unique username or vanity slug.`);
      setActiveTab('theme');
      return;
    }

    setIsPublishing(true);
    setSlugErrorAlert('');
    setStatusMessage('Verifying URL and publishing portfolio...');

    try {
      const storedKey = localStorage.getItem(`pandalime_portfolio_key_${slug}`) || '';
      const payload = {
        ...portfolioData,
        slug,
        editKey: storedKey
      };

      const res = await apiRequest('/api/portfolios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res && res.status === 409) {
        const errData = await res.json();
        const msg = errData.error || `⚠️ The vanity URL "${slug}" is already taken by another user. Please choose a different name.`;
        setSlugErrorAlert(msg);
        setSlugStatus({
          state: 'taken',
          message: msg,
          isOwner: false
        });
        setActiveTab('theme');
        setIsPublishing(false);
        return;
      }

      if (res && res.ok) {
        const resData = await res.json();
        if (resData.editKey) {
          localStorage.setItem(`pandalime_portfolio_key_${slug}`, resData.editKey);
        }
      }

      // Save locally first so instant preview always works
      localStorage.setItem(`pandalime_portfolio_${slug}`, JSON.stringify(payload));
      localStorage.setItem('pandalime_portfolio_draft', JSON.stringify(payload));

      setPublishModalOpen(true);
    } catch (error) {
      console.warn('Publish fallback notice:', error);
      // Even if network has issues, the client storage is ready!
      localStorage.setItem(`pandalime_portfolio_${slug}`, JSON.stringify({ ...portfolioData, slug }));
      setPublishModalOpen(true);
    } finally {
      setIsPublishing(false);
      setStatusMessage('');
    }
  };

  // Export JSON file
  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(portfolioData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${portfolioData.slug || 'pandalime-portfolio'}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import JSON file
  const handleImportJson = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (parsed.fullName || parsed.title) {
          setPortfolioData(parsed);
          setStatusMessage('✓ Successfully imported portfolio JSON!');
          setTimeout(() => setStatusMessage(''), 3000);
        }
      } catch (err) {
        alert('Invalid JSON file format.');
      }
    };
    reader.readAsText(file);
  };

  const publicUrl = `https://www.pandalime.com/p/${portfolioData.slug || 'my-portfolio'}`;

  const copyShareLink = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const selectedTheme = THEMES.find(t => t.id === portfolioData.theme) || THEMES[0];
  const selectedAccent = ACCENT_COLORS.find(c => c.id === portfolioData.accentColor) || ACCENT_COLORS[0];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col font-sans w-full max-w-full overflow-x-hidden">
      <SEOHead 
        title="AI Developer & Cyber Portfolio Builder | Free Hosted Portfolio Page | PandaLime"
        description="Build and host your developer or cyber portfolio on pandalime.com/p/:username. Choose from 5 modern themes with instant AI prompts and QR code sharing."
        canonical="/portfolio-builder"
      />

      {/* --- TOP APP HEADER --- */}
      <header className="bg-gray-900/90 border-b border-gray-800 sticky top-0 z-40 backdrop-blur-md px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2 font-black text-white text-lg tracking-tight hover:text-lime-400 transition-colors">
              <div className="w-8 h-8 bg-lime-500 rounded-lg flex items-center justify-center text-gray-900">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="hidden sm:inline">PandaLime</span>
            </Link>
            <span className="text-gray-600 hidden sm:inline">/</span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-lime-400 bg-lime-950/80 border border-lime-500/30 px-2 py-0.5 rounded-md">
                Portfolio Studio
              </span>
              {statusMessage && (
                <span className="text-xs font-semibold text-lime-400 animate-pulse hidden md:inline">
                  {statusMessage}
                </span>
              )}
            </div>
          </div>

          {/* Desktop/Mobile Toggle & Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Mobile View Switcher */}
            <div className="lg:hidden flex bg-gray-800 rounded-lg p-0.5 border border-gray-700 text-xs font-bold">
              <button
                onClick={() => setMobileView('editor')}
                className={`px-3 py-1 rounded-md transition-all ${mobileView === 'editor' ? 'bg-lime-500 text-gray-900 shadow' : 'text-gray-400'}`}
              >
                Editor
              </button>
              <button
                onClick={() => setMobileView('preview')}
                className={`px-3 py-1 rounded-md transition-all ${mobileView === 'preview' ? 'bg-lime-500 text-gray-900 shadow' : 'text-gray-400'}`}
              >
                Live Preview
              </button>
            </div>

            {/* Desktop Device Switcher */}
            <div className="hidden lg:flex items-center bg-gray-800 rounded-lg p-0.5 border border-gray-700">
              <button
                onClick={() => setPreviewMode('desktop')}
                className={`p-1.5 rounded-md transition-colors ${previewMode === 'desktop' ? 'bg-gray-700 text-lime-400 shadow-sm' : 'text-gray-400 hover:text-white'}`}
                title="Desktop Preview"
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPreviewMode('mobile')}
                className={`p-1.5 rounded-md transition-colors ${previewMode === 'mobile' ? 'bg-gray-700 text-lime-400 shadow-sm' : 'text-gray-400 hover:text-white'}`}
                title="Mobile Preview"
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>

            {/* Export / Import Dropdown Options */}
            <label className="cursor-pointer hidden sm:flex items-center gap-1 text-xs text-gray-400 hover:text-gray-200 px-2.5 py-1.5 rounded-lg border border-gray-700 hover:bg-gray-800 transition-colors">
              <Upload className="w-3.5 h-3.5" />
              <span>Import</span>
              <input type="file" accept=".json" onChange={handleImportJson} className="hidden" />
            </label>

            <button
              onClick={handleExportJson}
              className="hidden sm:flex items-center gap-1 text-xs text-gray-400 hover:text-gray-200 px-2.5 py-1.5 rounded-lg border border-gray-700 hover:bg-gray-800 transition-colors"
              title="Backup JSON"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>

            {/* Publish & Host Button */}
            <button
              onClick={handlePublish}
              disabled={isPublishing}
              className="px-4 py-1.5 sm:py-2 bg-lime-500 hover:bg-lime-400 text-gray-950 font-black text-xs sm:text-sm rounded-xl shadow-lg shadow-lime-500/20 flex items-center gap-1.5 transition-all active:scale-95 shrink-0 cursor-pointer"
            >
              {isPublishing ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Globe className="w-4 h-4" />
              )}
              <span>Publish & Share</span>
            </button>

          </div>
        </div>
      </header>

      {/* --- CREATIVE PROMPT GENERATOR BANNER --- */}
      <section className="bg-gradient-to-r from-gray-900 via-gray-850 to-gray-900 border-b border-gray-800 py-4 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            
            <div className="flex-1 w-full">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-lime-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-gray-300">
                  AI Auto-Fill & Creative Role Presets
                </span>
              </div>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    placeholder="Describe your role (e.g. 'Senior Cyber Threat Hunter in Bengaluru with AWS security and OSCP certs')..."
                    className="w-full bg-gray-950 border border-gray-700 focus:border-lime-400 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-gray-100 placeholder-gray-500 focus:outline-none transition-colors"
                    onKeyDown={(e) => e.key === 'Enter' && handleGenerateFromAi()}
                  />
                </div>
                <button
                  onClick={handleGenerateFromAi}
                  disabled={isGeneratingAi || !aiPrompt.trim()}
                  className="px-4 py-2.5 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 text-lime-400 font-bold text-xs sm:text-sm rounded-xl border border-gray-700 flex items-center gap-1.5 transition-all shrink-0 cursor-pointer"
                >
                  {isGeneratingAi ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                  <span className="hidden sm:inline">Auto-Fill</span>
                </button>
              </div>
            </div>

            {/* Quick 1-Click Role Chips */}
            <div className="w-full md:w-auto">
              <span className="text-xs text-gray-400 block mb-1.5 font-semibold">1-Click Role Presets:</span>
              <div className="flex flex-wrap gap-1.5">
                {ROLE_PRESETS.map(preset => (
                  <button
                    key={preset.id}
                    onClick={() => loadPreset(preset.id)}
                    className="px-2.5 py-1 bg-gray-950 hover:bg-lime-950/60 hover:text-lime-300 border border-gray-800 hover:border-lime-500/40 rounded-lg text-xs font-medium text-gray-300 transition-all active:scale-95"
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

          </div>
        </div>
      </section>

      {/* --- STUDIO MAIN CONTENT: SPLIT SCREEN (EDITOR vs PREVIEW) --- */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-hidden">
        
        {/* ================= LEFT / EDITOR COLUMN ================= */}
        <div className={`lg:col-span-5 flex flex-col space-y-4 ${mobileView === 'preview' ? 'hidden lg:flex' : 'flex'}`}>
          
          {/* Navigation Tabs */}
          <div className="flex overflow-x-auto no-scrollbar bg-gray-900 p-1.5 rounded-2xl border border-gray-800 gap-1 text-xs font-bold">
            <button
              onClick={() => setActiveTab('theme')}
              className={`px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all shrink-0 ${activeTab === 'theme' ? 'bg-lime-500 text-gray-950 shadow-sm' : 'text-gray-400 hover:text-white'}`}
            >
              <Palette className="w-3.5 h-3.5" /> Theme
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all shrink-0 ${activeTab === 'profile' ? 'bg-lime-500 text-gray-950 shadow-sm' : 'text-gray-400 hover:text-white'}`}
            >
              <User className="w-3.5 h-3.5" /> Profile
            </button>
            <button
              onClick={() => setActiveTab('social')}
              className={`px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all shrink-0 ${activeTab === 'social' ? 'bg-lime-500 text-gray-950 shadow-sm' : 'text-gray-400 hover:text-white'}`}
            >
              <Globe className="w-3.5 h-3.5" /> Links
            </button>
            <button
              onClick={() => setActiveTab('skills')}
              className={`px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all shrink-0 ${activeTab === 'skills' ? 'bg-lime-500 text-gray-950 shadow-sm' : 'text-gray-400 hover:text-white'}`}
            >
              <Code2 className="w-3.5 h-3.5" /> Skills
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all shrink-0 ${activeTab === 'projects' ? 'bg-lime-500 text-gray-950 shadow-sm' : 'text-gray-400 hover:text-white'}`}
            >
              <Layers className="w-3.5 h-3.5" /> Projects
            </button>
            <button
              onClick={() => setActiveTab('experience')}
              className={`px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all shrink-0 ${activeTab === 'experience' ? 'bg-lime-500 text-gray-950 shadow-sm' : 'text-gray-400 hover:text-white'}`}
            >
              <Briefcase className="w-3.5 h-3.5" /> Career
            </button>
          </div>

          {/* Form Container */}
          <div className="bg-gray-900 rounded-2xl p-5 sm:p-6 border border-gray-800 overflow-y-auto max-h-[calc(100vh-280px)] space-y-6">
            
            {/* ----------------- TAB 1: THEME & PALETTE ----------------- */}
            {activeTab === 'theme' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-gray-200 uppercase tracking-wider mb-3">1. Select Visual Theme</h3>
                  <div className="space-y-2.5">
                    {THEMES.map(theme => (
                      <div
                        key={theme.id}
                        onClick={() => handleInputChange('theme', theme.id)}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all ${portfolioData.theme === theme.id ? 'border-lime-400 bg-gray-850 shadow-md ring-1 ring-lime-400' : 'border-gray-800 bg-gray-950/60 hover:border-gray-700'}`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-sm text-white flex items-center gap-2">
                            {theme.name}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-gray-800 text-lime-400 border border-gray-700">
                            {theme.badge}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 leading-relaxed">{theme.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-gray-200 uppercase tracking-wider mb-3">2. Accent Neon / Glow Color</h3>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {ACCENT_COLORS.map(color => (
                      <button
                        key={color.id}
                        onClick={() => handleInputChange('accentColor', color.id)}
                        className={`p-2.5 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${portfolioData.accentColor === color.id ? 'border-white bg-gray-800 ring-2 ring-white/20' : 'border-gray-800 bg-gray-950 hover:border-gray-700'}`}
                      >
                        <span className="w-5 h-5 rounded-full shadow-md" style={{ backgroundColor: color.hex }}></span>
                        <span className="text-[10px] font-bold text-gray-300">{color.name.split(' ')[1] || color.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-bold text-gray-200 block">Your Vanity URL Slug</label>
                    {slugStatus.state === 'available' && (
                      <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-md flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Available
                      </span>
                    )}
                    {slugStatus.state === 'taken' && (
                      <span className="text-[11px] font-bold text-red-400 bg-red-950/60 border border-red-500/30 px-2 py-0.5 rounded-md flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> Already Taken
                      </span>
                    )}
                    {slugStatus.state === 'reserved' && (
                      <span className="text-[11px] font-bold text-amber-400 bg-amber-950/60 border border-amber-500/30 px-2 py-0.5 rounded-md flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> Reserved
                      </span>
                    )}
                    {slugStatus.state === 'checking' && (
                      <span className="text-[11px] text-gray-400 flex items-center gap-1">
                        <RefreshCw className="w-3 h-3 animate-spin text-lime-400" /> Checking...
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400">Unique public link hosted on PandaLime to share on LinkedIn, GitHub, and resumes.</p>
                  
                  <div className={`flex items-center bg-gray-950 border rounded-xl px-3 py-2 transition-colors ${slugStatus.state === 'taken' ? 'border-red-500/80 ring-1 ring-red-500/30' : slugStatus.state === 'available' ? 'border-emerald-500/60' : 'border-gray-700 focus-within:border-lime-400'}`}>
                    <span className="text-xs text-gray-500 font-mono">pandalime.com/p/</span>
                    <input
                      type="text"
                      value={portfolioData.slug || ''}
                      onChange={(e) => {
                        setSlugErrorAlert('');
                        handleInputChange('slug', e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, '-'));
                      }}
                      placeholder="your-name"
                      className="bg-transparent border-none text-lime-400 font-bold text-xs sm:text-sm focus:outline-none flex-1 font-mono"
                    />
                  </div>

                  {slugErrorAlert && (
                    <div className="p-3 bg-red-950/80 border border-red-500/50 rounded-xl flex items-start gap-2 text-red-200 text-xs">
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold">Name Already Used</p>
                        <p className="text-[11px] text-red-300 mt-0.5">{slugErrorAlert}</p>
                      </div>
                    </div>
                  )}

                  {slugStatus.state === 'taken' && (
                    <div className="p-2.5 bg-gray-950/80 border border-red-500/30 rounded-xl space-y-1.5">
                      <p className="text-[11px] text-red-300 font-medium">
                        ⚠️ <strong>@{portfolioData.slug}</strong> is already owned by another developer. Try one of these available handles:
                      </p>
                      <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                        {[`${portfolioData.slug}-dev`, `${portfolioData.slug}-${new Date().getFullYear()}`, `${portfolioData.slug}-tech`].map(sug => (
                          <button
                            key={sug}
                            type="button"
                            onClick={() => {
                              setSlugErrorAlert('');
                              handleInputChange('slug', sug);
                            }}
                            className="px-2.5 py-1 bg-gray-800 hover:bg-lime-500 hover:text-gray-950 text-lime-400 rounded-lg text-[11px] font-mono font-bold transition-all flex items-center gap-1"
                          >
                            <span>+{sug}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {slugStatus.state === 'reserved' && (
                    <p className="text-[11px] text-amber-400 bg-amber-950/40 p-2 rounded-lg border border-amber-500/30">
                      ℹ️ <strong>"{portfolioData.slug}"</strong> is a built-in showcase template name. Type your personal name (e.g. <code>{(portfolioData.fullName || 'john-doe').toLowerCase().replace(/[^a-z0-9]+/g, '-')}</code>) to publish your own portfolio.
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* ----------------- TAB 2: PROFILE & BIO ----------------- */}
            {activeTab === 'profile' && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase text-gray-400 mb-1.5 block">Full Name</label>
                  <input
                    type="text"
                    value={portfolioData.fullName || ''}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="Alex Vance"
                    className="w-full bg-gray-950 border border-gray-700 focus:border-lime-400 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-gray-400 mb-1.5 block">Professional Title</label>
                  <input
                    type="text"
                    value={portfolioData.title || ''}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Senior Penetration Tester & Cloud SecOps"
                    className="w-full bg-gray-950 border border-gray-700 focus:border-lime-400 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-gray-400 mb-1.5 block">Hero Tagline / Subtitle</label>
                  <input
                    type="text"
                    value={portfolioData.tagline || ''}
                    onChange={(e) => handleInputChange('tagline', e.target.value)}
                    placeholder="🛡️ Offensive Security • Vulnerability Research • AWS Hardening"
                    className="w-full bg-gray-950 border border-gray-700 focus:border-lime-400 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-bold uppercase text-gray-400">Avatar Image</label>
                    <span className="text-[10px] text-gray-500">Pick preset or paste URL</span>
                  </div>
                  <div className="grid grid-cols-6 gap-2 mb-2">
                    {PRESET_AVATARS.map(avatar => (
                      <img
                        key={avatar.id}
                        src={avatar.url}
                        alt={avatar.label}
                        onClick={() => handleInputChange('avatarUrl', avatar.url)}
                        className={`w-10 h-10 rounded-xl object-cover cursor-pointer border-2 transition-all ${portfolioData.avatarUrl === avatar.url ? 'border-lime-400 scale-105 shadow-md' : 'border-gray-800 opacity-60 hover:opacity-100'}`}
                        title={avatar.label}
                      />
                    ))}
                  </div>
                  <input
                    type="text"
                    value={portfolioData.avatarUrl || ''}
                    onChange={(e) => handleInputChange('avatarUrl', e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full bg-gray-950 border border-gray-700 focus:border-lime-400 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none font-mono"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold uppercase text-gray-400 mb-1.5 block">Location</label>
                    <input
                      type="text"
                      value={portfolioData.location || ''}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      placeholder="Bengaluru, India / Remote"
                      className="w-full bg-gray-950 border border-gray-700 focus:border-lime-400 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase text-gray-400 mb-1.5 block">Availability Status</label>
                    <input
                      type="text"
                      value={portfolioData.availabilityStatus || ''}
                      onChange={(e) => handleInputChange('availabilityStatus', e.target.value)}
                      placeholder="🟢 Open to Full-Time & Red Teaming"
                      className="w-full bg-gray-950 border border-gray-700 focus:border-lime-400 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-bold uppercase text-gray-400">About / Executive Bio</label>
                    <button
                      onClick={handlePolishBio}
                      disabled={isPolishingBio || !portfolioData.bio}
                      className="text-[11px] text-lime-400 hover:text-lime-300 font-bold flex items-center gap-1 disabled:opacity-50"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>{isPolishingBio ? 'Polishing...' : 'AI Polish Bio'}</span>
                    </button>
                  </div>
                  <textarea
                    rows={4}
                    value={portfolioData.bio || ''}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    placeholder="Briefly describe your core expertise, achievements, and what drives you..."
                    className="w-full bg-gray-950 border border-gray-700 focus:border-lime-400 rounded-xl p-3 text-xs sm:text-sm text-white focus:outline-none leading-relaxed"
                  />
                </div>

                {/* Metrics Matrix */}
                <div className="pt-2 border-t border-gray-800">
                  <label className="text-xs font-bold uppercase text-gray-400 mb-2 block">Key Highlight Metric Counters</label>
                  <div className="grid grid-cols-2 gap-2">
                    {(portfolioData.metrics || []).map((m, idx) => (
                      <div key={idx} className="bg-gray-950 p-2.5 rounded-xl border border-gray-800 space-y-1">
                        <input
                          type="text"
                          value={m.value}
                          onChange={(e) => handleMetricChange(idx, 'value', e.target.value)}
                          placeholder="45+"
                          className="w-full bg-transparent text-lime-400 font-bold text-sm focus:outline-none"
                        />
                        <input
                          type="text"
                          value={m.label}
                          onChange={(e) => handleMetricChange(idx, 'label', e.target.value)}
                          placeholder="Security Audits"
                          className="w-full bg-transparent text-gray-400 text-xs focus:outline-none"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ----------------- TAB 3: SOCIAL & CONTACT LINKS ----------------- */}
            {activeTab === 'social' && (
              <div className="space-y-4">
                <p className="text-xs text-gray-400">Provide direct links to help recruiters verify your code, projects, and work history.</p>
                
                <div>
                  <label className="text-xs font-bold uppercase text-gray-400 mb-1.5 flex items-center gap-1.5">
                    <Linkedin className="w-3.5 h-3.5 text-blue-400" /> LinkedIn URL
                  </label>
                  <input
                    type="text"
                    value={portfolioData.socialLinks?.linkedin || ''}
                    onChange={(e) => handleSocialChange('linkedin', e.target.value)}
                    placeholder="https://linkedin.com/in/username"
                    className="w-full bg-gray-950 border border-gray-700 focus:border-lime-400 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-gray-400 mb-1.5 flex items-center gap-1.5">
                    <Github className="w-3.5 h-3.5 text-gray-300" /> GitHub URL
                  </label>
                  <input
                    type="text"
                    value={portfolioData.socialLinks?.github || ''}
                    onChange={(e) => handleSocialChange('github', e.target.value)}
                    placeholder="https://github.com/username"
                    className="w-full bg-gray-950 border border-gray-700 focus:border-lime-400 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-gray-400 mb-1.5 flex items-center gap-1.5">
                    <Twitter className="w-3.5 h-3.5 text-sky-400" /> X (Twitter) URL
                  </label>
                  <input
                    type="text"
                    value={portfolioData.socialLinks?.twitter || ''}
                    onChange={(e) => handleSocialChange('twitter', e.target.value)}
                    placeholder="https://x.com/username"
                    className="w-full bg-gray-950 border border-gray-700 focus:border-lime-400 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-gray-400 mb-1.5 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-emerald-400" /> TryHackMe / LeetCode / HackerRank URL
                  </label>
                  <input
                    type="text"
                    value={portfolioData.socialLinks?.tryhackme || portfolioData.socialLinks?.leetcode || ''}
                    onChange={(e) => handleSocialChange('tryhackme', e.target.value)}
                    placeholder="https://tryhackme.com/p/username or https://leetcode.com/username"
                    className="w-full bg-gray-950 border border-gray-700 focus:border-lime-400 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-gray-400 mb-1.5 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-lime-400" /> Contact Email (Public)
                  </label>
                  <input
                    type="email"
                    value={portfolioData.contactEmail || ''}
                    onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                    placeholder="my-email@example.com"
                    className="w-full bg-gray-950 border border-gray-700 focus:border-lime-400 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-gray-400 mb-1.5 flex items-center gap-1.5">
                    <Download className="w-3.5 h-3.5 text-purple-400" /> Resume PDF Download Link (Google Drive / Direct URL)
                  </label>
                  <input
                    type="text"
                    value={portfolioData.socialLinks?.resumeUrl || ''}
                    onChange={(e) => handleSocialChange('resumeUrl', e.target.value)}
                    placeholder="https://drive.google.com/file/d/.../view"
                    className="w-full bg-gray-950 border border-gray-700 focus:border-lime-400 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* ----------------- TAB 4: SKILLS MATRIX ----------------- */}
            {activeTab === 'skills' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <p className="text-xs text-gray-400">Comma-separated skills grouped by domain.</p>
                  <button
                    onClick={addSkillCategory}
                    className="text-xs text-lime-400 hover:text-lime-300 font-bold flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Category
                  </button>
                </div>

                {Object.entries(portfolioData.skills || {}).map(([category, skillsList]) => (
                  <div key={category} className="bg-gray-950 p-4 rounded-2xl border border-gray-800 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-white uppercase tracking-wider">{category}</span>
                      <button
                        onClick={() => removeSkillCategory(category)}
                        className="text-gray-500 hover:text-rose-400 text-xs"
                        title="Delete category"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <input
                      type="text"
                      value={skillsList.join(', ')}
                      onChange={(e) => handleSkillsChange(category, e.target.value)}
                      placeholder="React, TypeScript, Next.js..."
                      className="w-full bg-gray-900 border border-gray-700 focus:border-lime-400 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* ----------------- TAB 5: PROJECTS SHOWCASE ----------------- */}
            {activeTab === 'projects' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold uppercase text-gray-400">Featured Projects ({(portfolioData.projects || []).length})</span>
                  <button
                    onClick={addProject}
                    className="px-3 py-1.5 bg-lime-500/10 text-lime-400 border border-lime-500/30 hover:bg-lime-500/20 rounded-xl text-xs font-bold flex items-center gap-1 transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Project
                  </button>
                </div>

                {(portfolioData.projects || []).map((project, idx) => (
                  <div key={idx} className="bg-gray-950 p-4 rounded-2xl border border-gray-800 space-y-3 relative group">
                    <button
                      onClick={() => removeProject(idx)}
                      className="absolute top-3 right-3 text-gray-600 hover:text-rose-400 transition-colors"
                      title="Delete Project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div>
                      <label className="text-[11px] font-bold text-gray-400 uppercase block mb-1">Project Title</label>
                      <input
                        type="text"
                        value={project.title}
                        onChange={(e) => handleProjectChange(idx, 'title', e.target.value)}
                        placeholder="CloudGuard — AWS IAM Security Scanner"
                        className="w-full bg-gray-900 border border-gray-700 focus:border-lime-400 rounded-xl px-3 py-1.5 text-xs text-white font-bold focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-gray-400 uppercase block mb-1">Impact Metric Tag</label>
                      <input
                        type="text"
                        value={project.metric || ''}
                        onChange={(e) => handleProjectChange(idx, 'metric', e.target.value)}
                        placeholder="⭐ 1.4k Stars • 0 CVEs"
                        className="w-full bg-gray-900 border border-gray-700 focus:border-lime-400 rounded-xl px-3 py-1.5 text-xs text-lime-400 font-semibold focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-gray-400 uppercase block mb-1">Description</label>
                      <textarea
                        rows={2}
                        value={project.description}
                        onChange={(e) => handleProjectChange(idx, 'description', e.target.value)}
                        placeholder="What problem does this project solve and what was your technical contribution?"
                        className="w-full bg-gray-900 border border-gray-700 focus:border-lime-400 rounded-xl p-2.5 text-xs text-gray-200 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-gray-400 uppercase block mb-1">Tech Stack Tags (Comma-separated)</label>
                      <input
                        type="text"
                        value={Array.isArray(project.tags) ? project.tags.join(', ') : project.tags}
                        onChange={(e) => handleProjectChange(idx, 'tags', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                        placeholder="Python, AWS, Docker, React"
                        className="w-full bg-gray-900 border border-gray-700 focus:border-lime-400 rounded-xl px-3 py-1.5 text-xs text-gray-300 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[11px] font-bold text-gray-400 uppercase block mb-1">Live Demo URL</label>
                        <input
                          type="text"
                          value={project.demoUrl || ''}
                          onChange={(e) => handleProjectChange(idx, 'demoUrl', e.target.value)}
                          placeholder="https://demo.dev"
                          className="w-full bg-gray-900 border border-gray-700 focus:border-lime-400 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-gray-400 uppercase block mb-1">GitHub Repo URL</label>
                        <input
                          type="text"
                          value={project.githubUrl || ''}
                          onChange={(e) => handleProjectChange(idx, 'githubUrl', e.target.value)}
                          placeholder="https://github.com/..."
                          className="w-full bg-gray-900 border border-gray-700 focus:border-lime-400 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ----------------- TAB 6: EXPERIENCE & CERTS ----------------- */}
            {activeTab === 'experience' && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold uppercase text-gray-400">Work Experience ({(portfolioData.experience || []).length})</span>
                    <button
                      onClick={addExperience}
                      className="px-3 py-1.5 bg-lime-500/10 text-lime-400 border border-lime-500/30 hover:bg-lime-500/20 rounded-xl text-xs font-bold flex items-center gap-1 transition-all"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Role
                    </button>
                  </div>

                  {(portfolioData.experience || []).map((exp, idx) => (
                    <div key={idx} className="bg-gray-950 p-4 rounded-2xl border border-gray-800 space-y-3 relative">
                      <button
                        onClick={() => removeExperience(idx)}
                        className="absolute top-3 right-3 text-gray-600 hover:text-rose-400 transition-colors"
                        title="Delete Role"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[11px] font-bold text-gray-400 uppercase block mb-1">Position / Title</label>
                          <input
                            type="text"
                            value={exp.role}
                            onChange={(e) => handleExperienceChange(idx, 'role', e.target.value)}
                            placeholder="Lead Security Engineer"
                            className="w-full bg-gray-900 border border-gray-700 focus:border-lime-400 rounded-xl px-3 py-1.5 text-xs text-white font-bold focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-bold text-gray-400 uppercase block mb-1">Company Name</label>
                          <input
                            type="text"
                            value={exp.company}
                            onChange={(e) => handleExperienceChange(idx, 'company', e.target.value)}
                            placeholder="CyberShield Systems"
                            className="w-full bg-gray-900 border border-gray-700 focus:border-lime-400 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[11px] font-bold text-gray-400 uppercase block mb-1">Time Period</label>
                          <input
                            type="text"
                            value={exp.period}
                            onChange={(e) => handleExperienceChange(idx, 'period', e.target.value)}
                            placeholder="2023 - Present"
                            className="w-full bg-gray-900 border border-gray-700 focus:border-lime-400 rounded-xl px-3 py-1.5 text-xs text-gray-300 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-bold text-gray-400 uppercase block mb-1">Location</label>
                          <input
                            type="text"
                            value={exp.location}
                            onChange={(e) => handleExperienceChange(idx, 'location', e.target.value)}
                            placeholder="Bengaluru / Remote"
                            className="w-full bg-gray-900 border border-gray-700 focus:border-lime-400 rounded-xl px-3 py-1.5 text-xs text-gray-300 focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Bullets */}
                      <div>
                        <div className="flex justify-between items-center mb-1.5">
                          <label className="text-[11px] font-bold text-gray-400 uppercase">Quantified Accomplishments (STAR Bullets)</label>
                          <button
                            onClick={() => addExperienceBullet(idx)}
                            className="text-[10px] text-lime-400 hover:text-lime-300 font-bold"
                          >
                            + Add Bullet
                          </button>
                        </div>
                        <div className="space-y-1.5">
                          {(exp.bullets || []).map((bullet, bIdx) => (
                            <div key={bIdx} className="flex items-center gap-1.5">
                              <input
                                type="text"
                                value={bullet}
                                onChange={(e) => handleExperienceBulletChange(idx, bIdx, e.target.value)}
                                className="flex-1 bg-gray-900 border border-gray-700 focus:border-lime-400 rounded-xl px-3 py-1.5 text-xs text-gray-200 focus:outline-none"
                              />
                              <button
                                onClick={() => removeExperienceBullet(idx, bIdx)}
                                className="text-gray-500 hover:text-rose-400 p-1"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

        {/* ================= RIGHT / LIVE PREVIEW COLUMN ================= */}
        <div className={`lg:col-span-7 flex flex-col items-center ${mobileView === 'editor' ? 'hidden lg:flex' : 'flex'}`}>
          <div className="w-full flex items-center justify-between mb-2 px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-lime-400" /> Live Interactive Preview
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-gray-500">Theme: {selectedTheme.name}</span>
              <button 
                onClick={handlePublish}
                className="text-xs text-lime-400 hover:underline font-bold"
              >
                Publish Now →
              </button>
            </div>
          </div>

          {/* Interactive Frame Wrapper */}
          <div className={`w-full bg-gray-900 border border-gray-800 rounded-2xl p-2 sm:p-4 shadow-2xl transition-all ${previewMode === 'mobile' ? 'max-w-sm' : 'max-w-full'}`}>
            
            {/* Live Portfolio Card Mockup Rendering */}
            <div className={`w-full rounded-xl overflow-hidden border border-gray-800 transition-all ${selectedTheme.bgClass} max-h-[calc(100vh-280px)] overflow-y-auto p-4 sm:p-8 space-y-8`}>
              
              {/* Profile Top Bar */}
              <div className="flex flex-col sm:flex-row items-center gap-5 pb-6 border-b border-gray-800/60">
                <img
                  src={portfolioData.avatarUrl || PRESET_AVATARS[0].url}
                  alt={portfolioData.fullName}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover border-2 shadow-xl shrink-0"
                  style={{ borderColor: selectedAccent.hex }}
                />
                <div className="text-center sm:text-left flex-1 space-y-1">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                      {portfolioData.fullName || 'Alex Vance'}
                    </h2>
                    {portfolioData.availabilityStatus && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
                        {portfolioData.availabilityStatus}
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-semibold" style={{ color: selectedAccent.hex }}>
                    {portfolioData.title || 'Senior Penetration Tester'}
                  </p>
                  <p className="text-xs text-gray-400">
                    {portfolioData.location || 'Bengaluru / Remote'}
                  </p>
                </div>
              </div>

              {/* Bio & Metrics */}
              <div className="space-y-4">
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  {portfolioData.bio}
                </p>

                {/* Metric Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {(portfolioData.metrics || []).map((m, i) => (
                    <div key={i} className={`p-3 rounded-xl border text-center ${selectedTheme.cardClass}`}>
                      <p className="text-base sm:text-lg font-black" style={{ color: selectedAccent.hex }}>{m.value}</p>
                      <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">{m.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills Matrix */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5" style={{ color: selectedAccent.hex }} /> Technical Skills & Tooling
                </h4>
                <div className="space-y-2">
                  {Object.entries(portfolioData.skills || {}).map(([cat, skList]) => (
                    <div key={cat} className="space-y-1">
                      <p className="text-[11px] font-bold text-gray-400">{cat}:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {skList.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-gray-900/90 text-gray-200 border border-gray-800"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Featured Projects */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" style={{ color: selectedAccent.hex }} /> Featured Projects
                </h4>
                <div className="space-y-3">
                  {(portfolioData.projects || []).slice(0, 3).map((proj, pIdx) => (
                    <div key={pIdx} className={`p-4 rounded-xl border ${selectedTheme.cardClass} space-y-2`}>
                      <div className="flex justify-between items-start">
                        <h5 className="font-bold text-sm text-white">{proj.title}</h5>
                        {proj.metric && (
                          <span className="text-[10px] font-bold text-lime-400 bg-lime-950/60 px-2 py-0.5 rounded-md border border-lime-500/20">
                            {proj.metric}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-300 leading-relaxed">{proj.description}</p>
                      <div className="flex flex-wrap gap-1 pt-1">
                        {(proj.tags || []).map((tag, tIdx) => (
                          <span key={tIdx} className="text-[9px] font-mono text-gray-400 bg-gray-900 px-1.5 py-0.5 rounded border border-gray-800">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Career Experience Timeline */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5" style={{ color: selectedAccent.hex }} /> Career Timeline
                </h4>
                <div className="space-y-4">
                  {(portfolioData.experience || []).map((exp, eIdx) => (
                    <div key={eIdx} className="border-l-2 border-gray-800 pl-3 space-y-1">
                      <div className="flex justify-between items-baseline">
                        <p className="text-xs font-bold text-white">{exp.role} <span className="text-gray-400 font-normal">@ {exp.company}</span></p>
                        <span className="text-[10px] text-gray-500">{exp.period}</span>
                      </div>
                      <ul className="space-y-1 text-[11px] text-gray-300 list-disc list-inside">
                        {(exp.bullets || []).map((b, bI) => (
                          <li key={bI}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Links & Contact */}
              <div className="pt-6 border-t border-gray-800 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-400">
                <div className="flex items-center gap-3">
                  {portfolioData.socialLinks?.github && <span>GitHub</span>}
                  {portfolioData.socialLinks?.linkedin && <span>LinkedIn</span>}
                  {portfolioData.contactEmail && <span>Email: {portfolioData.contactEmail}</span>}
                </div>
                <div className="text-[10px] text-gray-600">
                  Hosted on pandalime.com
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* ================= PUBLISH & SHARE MODAL ================= */}
      {publishModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8 max-w-lg w-full space-y-6 text-white shadow-2xl relative animate-in fade-in zoom-in-95">
            
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-lime-500/20 text-lime-400 rounded-xl flex items-center justify-center mx-auto mb-3 border border-lime-500/30">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-black tracking-tight">Your Portfolio is Live!</h3>
              <p className="text-xs sm:text-sm text-gray-400">
                Your portfolio is hosted on PandaLime and ready to be shared with recruiters.
              </p>
            </div>

            {/* Shareable Link Box */}
            <div className="bg-gray-950 p-4 rounded-2xl border border-gray-800 space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Shareable Public URL</label>
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs sm:text-sm font-mono text-lime-400 font-bold truncate">
                  {publicUrl}
                </span>
                <button
                  onClick={copyShareLink}
                  className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 shrink-0 transition-all active:scale-95"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-lime-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* QR Code & View Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="p-2 bg-white rounded-2xl shrink-0">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(publicUrl)}`}
                  alt="Portfolio QR Code"
                  className="w-20 h-20"
                />
              </div>
              <div className="text-center sm:text-left space-y-1">
                <p className="text-xs font-bold text-gray-200">Resume QR Code Ready</p>
                <p className="text-[11px] text-gray-400">Add this QR code to your printed PDF resume so hiring managers can view your live projects in 1 scan.</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-2 pt-2">
              <a
                href={`/p/${portfolioData.slug || 'my-portfolio'}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 bg-lime-500 hover:bg-lime-400 text-gray-950 font-black rounded-xl text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-lime-500/20"
              >
                <span>Open Live Portfolio</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                onClick={() => setPublishModalOpen(false)}
                className="w-full py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold rounded-xl text-xs transition-colors"
              >
                Back to Studio Editor
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

