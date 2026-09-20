import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Sparkles, 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  MapPin, 
  ExternalLink, 
  Download, 
  Check, 
  Code2, 
  Layers, 
  Briefcase, 
  Award, 
  ScanLine, 
  Share2, 
  Zap,
  Terminal
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { THEMES, ACCENT_COLORS, ROLE_PRESETS } from '../data/portfolioTemplates';
import { apiRequest } from '../config/api';
import { sanitizeUrl } from '../utils/sanitize';
import { asmrAudio } from '../utils/asmrAudio';
import { haptics } from '../utils/haptics';

export default function PortfolioView() {
  const { slug } = useParams();
  const cleanSlug = (slug || '').toLowerCase().trim().replace(/[^a-z0-9_-]/g, '-');
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const loadPortfolio = async () => {
      setLoading(true);
      let foundData = null;

      // 1. Check local storage cache first for instant rendering
      try {
        const localKey = `pandalime_portfolio_${cleanSlug}`;
        const localData = localStorage.getItem(localKey);
        if (localData) {
          const parsed = JSON.parse(localData);
          if (parsed && (parsed.fullName || parsed.title)) {
            foundData = parsed;
            if (isMounted) {
              setPortfolio(parsed);
              setLoading(false);
            }
          }
        }
      } catch {
        // ignore localStorage error
      }

      // 2. Fetch from backend API (database / cloud cache)
      try {
        const res = await apiRequest(`/api/portfolios/${cleanSlug}`);
        if (res && res.ok) {
          const remoteData = await res.json();
          if (remoteData && remoteData.portfolio && (remoteData.portfolio.fullName || remoteData.portfolio.title)) {
            foundData = remoteData.portfolio;
            if (isMounted) {
              setPortfolio(remoteData.portfolio);
              setLoading(false);
            }
            // Update local storage cache
            try {
              localStorage.setItem(`pandalime_portfolio_${cleanSlug}`, JSON.stringify(remoteData.portfolio));
            } catch {
              // ignore
            }
            return;
          }
        }
      } catch (e) {
        console.warn('Backend fetch note:', e);
      }

      // 3. If valid data was found locally, keep it and do NOT overwrite with default template!
      if (foundData) {
        if (isMounted) setLoading(false);
        return;
      }

      // 4. Check if matched against built-in role showcase presets
      const matchedPreset = ROLE_PRESETS.find(p => p.slug === cleanSlug || p.id === cleanSlug);
      if (matchedPreset) {
        if (isMounted) {
          setPortfolio(matchedPreset);
          setLoading(false);
        }
        return;
      }

      // 5. Check if user has an active draft in local storage
      try {
        const draft = localStorage.getItem('pandalime_portfolio_draft');
        if (draft) {
          const parsedDraft = JSON.parse(draft);
          if (parsedDraft && (parsedDraft.slug === cleanSlug || !cleanSlug)) {
            if (isMounted) {
              setPortfolio(parsedDraft);
              setLoading(false);
            }
            return;
          }
        }
      } catch {
        // ignore
      }

      // 6. Fallback default if nothing matched
      if (isMounted) {
        setPortfolio(ROLE_PRESETS[0]);
        setLoading(false);
      }
    };

    loadPortfolio();
    return () => { isMounted = false; };
  }, [cleanSlug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#08090C] text-gray-100 flex items-center justify-center p-4 font-mono">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 bg-[#D2FF00] rounded-[2px] flex items-center justify-center mx-auto text-[#08090C]">
            <Sparkles className="w-5 h-5 animate-spin" />
          </div>
          <p className="text-xs font-bold text-gray-400">COMPILING DEVFOLIO // LOADING TELEMETRY...</p>
        </div>
      </div>
    );
  }

  const p = portfolio || ROLE_PRESETS[0];
  const theme = THEMES.find(t => t.id === p.theme) || THEMES[0];
  const accent = ACCENT_COLORS.find(c => c.id === p.accentColor) || ACCENT_COLORS[0];
  const publicUrl = `https://www.pandalime.com/p/${slug || p.slug || 'profile'}`;
  const isLightMode = theme.id === 'light_ivory';

  const copyEmail = () => {
    haptics.selection();
    asmrAudio.playPop();
    if (p.contactEmail) {
      navigator.clipboard.writeText(p.contactEmail);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 3000);
    }
  };

  const copyLink = () => {
    haptics.success();
    asmrAudio.playPop();
    navigator.clipboard.writeText(publicUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  // Schema.org Person & ProfilePage
  const sameAsLinks = Object.values(p.socialLinks || {}).filter(url => url && url.startsWith('http'));
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      "mainEntity": {
        "@type": "Person",
        "name": p.fullName,
        "jobTitle": p.title,
        "description": p.bio,
        "url": publicUrl,
        "sameAs": sameAsLinks
      }
    }
  ];

  return (
    <div className={`min-h-screen font-sans ${theme.bgClass} selection:bg-[#D2FF00] selection:text-black antialiased w-full max-w-full overflow-x-hidden`}>
      <SEOHead
        title={`${p.fullName} — ${p.title} | PandaLime Portfolio`}
        description={p.bio || `${p.fullName}'s professional developer and cyber portfolio.`}
        canonical={`/p/${slug || p.slug}`}
        jsonLd={jsonLd}
      />

      {/* --- TOP BRAND & CREATOR BAR --- */}
      <nav className="bg-[#08090C]/95 border-b border-[#1F242D] sticky top-0 z-40 backdrop-blur-md px-3 sm:px-4 py-2.5 w-full text-white">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-2">
          <Link to="/" className="flex items-center gap-2 text-white text-xs sm:text-sm font-mono font-bold tracking-tight hover:text-[#D2FF00] transition-colors shrink-0">
            <div className="w-6 h-6 bg-[#D2FF00] rounded-[2px] flex items-center justify-center text-[#08090C] shrink-0 font-bold">
              <Terminal className="w-3.5 h-3.5" />
            </div>
            <span className="truncate max-w-[130px] sm:max-w-none font-black tracking-tight">PANDALIME DEVFOLIO</span>
          </Link>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={copyLink}
              className="px-2.5 py-1 bg-[#151921] hover:bg-[#1F242D] text-gray-300 border border-[#1F242D] rounded-[2px] text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer"
              title="Share Portfolio"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-[#D2FF00]" /> : <Share2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copiedLink ? 'Copied!' : 'Share'}</span>
            </button>

            <Link
              to="/portfolio-builder"
              onClick={() => {
                haptics.light();
                asmrAudio.playClick();
              }}
              className="px-3 py-1 bg-[#D2FF00] hover:bg-[#b8e000] text-[#08090C] rounded-[2px] text-xs font-mono font-bold shadow-[0_0_12px_rgba(210,255,0,0.25)] flex items-center gap-1.5 transition-all whitespace-nowrap"
            >
              <Zap className="w-3 h-3" />
              <span>Create Your Studio</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* --- HERO HEADER SECTION --- */}
      <main className="max-w-5xl mx-auto px-3.5 sm:px-6 py-6 sm:py-12 space-y-8 sm:space-y-12 w-full overflow-hidden">
        
        {/* Profile Card */}
        <section className={`p-5 sm:p-8 rounded-[2px] border ${theme.cardClass} relative overflow-hidden backdrop-blur-xl shadow-2xl w-full`}>
          
          {/* Watermark Pill */}
          {p.theme === 'cyber' && (
            <div className="flex justify-center md:justify-end mb-4 md:mb-0 md:absolute md:top-6 md:right-6">
              <div className="font-mono text-[10px] text-emerald-400/80 bg-emerald-950/80 border border-emerald-500/30 px-2 py-0.5 rounded-[2px] flex items-center gap-1.5 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>[SEC_STATUS: CLEAR]</span>
              </div>
            </div>
          )}

          <div className="flex flex-col md:flex-row items-center md:items-start gap-5 sm:gap-6">
            
            {/* Avatar */}
            <div className="relative shrink-0">
              <img
                src={sanitizeUrl(p.avatarUrl) || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80'}
                alt={p.fullName}
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-[2px] object-cover border-2 shadow-xl"
                style={{ borderColor: accent.hex }}
              />
              {p.availabilityStatus && (
                <div className="absolute -bottom-2 -right-2 bg-[#08090C] border border-[#1F242D] px-2 py-0.5 rounded-[2px] text-[10px] font-mono font-bold text-[#D2FF00] shadow-md flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D2FF00]" />
                  <span>Available</span>
                </div>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left space-y-2.5 w-full">
              
              <div>
                <h1 className={`text-2xl sm:text-4xl font-black tracking-tight break-words ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                  {p.fullName}
                </h1>
                <p className="text-sm sm:text-base font-mono font-bold mt-1 break-words" style={{ color: accent.hex }}>
                  {p.title}
                </p>
                {p.tagline && (
                  <p className="text-xs sm:text-sm opacity-70 mt-1 font-mono break-words">
                    {p.tagline}
                  </p>
                )}
              </div>

              {/* Location & Status Badges */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-xs">
                {p.location && (
                  <span className="flex items-center gap-1 opacity-80 bg-black/15 px-2.5 py-0.5 rounded-[2px] border border-current/15 font-mono text-[11px]">
                    <MapPin className="w-3 h-3" /> {p.location}
                  </span>
                )}
                {p.availabilityStatus && (
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-[2px] font-mono text-[11px] font-bold">
                    {p.availabilityStatus}
                  </span>
                )}
              </div>

              {/* Bio */}
              <p className="text-xs sm:text-sm opacity-85 leading-relaxed max-w-2xl break-words">
                {p.bio}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-2.5 pt-2 w-full">
                {p.contactEmail && (
                  <button
                    onClick={copyEmail}
                    className="px-3 py-1.5 bg-[#D2FF00] text-[#08090C] font-mono font-bold text-xs rounded-[2px] flex items-center gap-1.5 hover:bg-[#b8e000] transition-all shadow-md cursor-pointer max-w-full"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-[#08090C] shrink-0" /> : <Mail className="w-3.5 h-3.5 shrink-0" />}
                    <span className="truncate max-w-[180px] sm:max-w-none">{copiedEmail ? 'Copied!' : p.contactEmail}</span>
                  </button>
                )}

                {sanitizeUrl(p.socialLinks?.resumeUrl) && (
                  <a
                    href={sanitizeUrl(p.socialLinks.resumeUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-[#151921] hover:bg-[#1F242D] text-gray-200 border border-[#1F242D] font-mono font-bold text-xs rounded-[2px] flex items-center gap-1.5 transition-all shrink-0"
                  >
                    <Download className="w-3.5 h-3.5 text-purple-400" />
                    <span>Download CV</span>
                  </a>
                )}

                {/* Social Icon Pills */}
                <div className="flex items-center gap-1.5">
                  {sanitizeUrl(p.socialLinks?.github) && (
                    <a
                      href={sanitizeUrl(p.socialLinks.github)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 bg-[#151921] hover:bg-[#1F242D] text-gray-300 hover:text-white border border-[#1F242D] rounded-[2px] transition-colors"
                      title="GitHub"
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {sanitizeUrl(p.socialLinks?.linkedin) && (
                    <a
                      href={sanitizeUrl(p.socialLinks.linkedin)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 bg-[#151921] hover:bg-[#1F242D] text-gray-300 hover:text-white border border-[#1F242D] rounded-[2px] transition-colors"
                      title="LinkedIn"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {sanitizeUrl(p.socialLinks?.twitter) && (
                    <a
                      href={sanitizeUrl(p.socialLinks.twitter)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 bg-[#151921] hover:bg-[#1F242D] text-gray-300 hover:text-white border border-[#1F242D] rounded-[2px] transition-colors"
                      title="X / Twitter"
                    >
                      <Twitter className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

              </div>

            </div>

          </div>

          {/* Key Metrics Row */}
          {(p.metrics || []).length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mt-5 pt-5 border-t border-current/10">
              {p.metrics.map((m, i) => (
                <div key={i} className="text-center md:text-left bg-black/15 p-2 rounded-[2px] border border-current/10">
                  <p className="text-lg sm:text-xl font-mono font-black tracking-tight break-words" style={{ color: accent.hex }}>
                    {m.value}
                  </p>
                  <p className="text-[10px] font-mono opacity-70 uppercase tracking-wider mt-0.5 break-words">
                    {m.label}
                  </p>
                </div>
              ))}
            </div>
          )}

        </section>

        {/* --- TECHNICAL SKILLS MATRIX --- */}
        {p.skills && Object.keys(p.skills).length > 0 && (
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4" style={{ color: accent.hex }} />
              <h2 className={`text-base sm:text-xl font-bold font-mono tracking-tight ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                TECHNICAL STACK & TOOLING
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {Object.entries(p.skills).map(([category, skillsList]) => (
                <div key={category} className={`p-3.5 rounded-[2px] border ${theme.cardClass} space-y-2`}>
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-between opacity-80">
                    <span className="truncate">{category}</span>
                    <span className="text-[10px] opacity-60 shrink-0">({skillsList.length})</span>
                  </h3>
                  <div className="flex flex-wrap gap-1">
                    {skillsList.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-xs font-mono px-2 py-0.5 rounded-[2px] bg-black/20 border border-current/15 break-words"
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

        {/* --- FEATURED PROJECTS --- */}
        {(p.projects || []).length > 0 && (
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4" style={{ color: accent.hex }} />
                <h2 className={`text-base sm:text-xl font-bold font-mono tracking-tight ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                  FEATURED PROJECTS & ARCHITECTURE
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
              {p.projects.map((proj, pIdx) => (
                <div 
                  key={pIdx} 
                  className={`p-4 rounded-[2px] border ${theme.cardClass} flex flex-col justify-between space-y-3 transition-all`}
                >
                  <div className="space-y-2">
                    <div className="flex flex-wrap justify-between items-start gap-2">
                      <h3 className={`text-sm sm:text-base font-bold break-words ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                        {proj.title}
                      </h3>
                      {proj.metric && (
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-[2px] bg-black/30 border border-current/20 shrink-0" style={{ color: accent.hex }}>
                          {proj.metric}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-xs opacity-80 leading-relaxed break-words">
                      {proj.description}
                    </p>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {(proj.tags || []).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[10px] font-mono px-1.5 py-0.5 rounded-[2px] bg-black/25 border border-current/15 opacity-70"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-3 pt-2 border-t border-current/10 text-xs font-mono font-bold">
                    {sanitizeUrl(proj.demoUrl) && (
                      <a
                        href={sanitizeUrl(proj.demoUrl)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline flex items-center gap-1 transition-colors"
                        style={{ color: accent.hex }}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live Demo</span>
                      </a>
                    )}
                    {sanitizeUrl(proj.githubUrl) && (
                      <a
                        href={sanitizeUrl(proj.githubUrl)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="opacity-70 hover:opacity-100 flex items-center gap-1 transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Source</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* --- WORK EXPERIENCE & TIMELINE --- */}
        {(p.experience || []).length > 0 && (
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" style={{ color: accent.hex }} />
              <h2 className={`text-base sm:text-xl font-bold font-mono tracking-tight ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                WORK EXPERIENCE & TIMELINE
              </h2>
            </div>

            <div className="space-y-3">
              {p.experience.map((exp, eIdx) => (
                <div key={eIdx} className={`p-4 sm:p-5 rounded-[2px] border ${theme.cardClass} space-y-2`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div>
                      <h3 className={`text-sm sm:text-base font-bold break-words ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                        {exp.role} <span className="font-normal opacity-60">at</span> <span style={{ color: accent.hex }}>{exp.company}</span>
                      </h3>
                      {exp.location && (
                        <p className="text-[11px] font-mono opacity-60">{exp.location}</p>
                      )}
                    </div>
                    <span className="text-[10px] font-mono opacity-70 bg-black/20 px-2 py-0.5 rounded-[2px] border border-current/15 self-start sm:self-auto shrink-0">
                      {exp.period}
                    </span>
                  </div>

                  <ul className="space-y-1 pt-1 text-xs opacity-80 list-disc list-outside ml-3.5">
                    {(exp.bullets || []).map((bullet, bIdx) => (
                      <li key={bIdx} className="leading-relaxed break-words">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* --- BOTTOM CTA --- */}
        <section className="bg-[#08090C] border border-[#D2FF00]/40 rounded-[2px] p-6 sm:p-8 text-center space-y-4 shadow-2xl text-white">
          <div className="max-w-xl mx-auto space-y-2 font-mono">
            <div className="w-10 h-10 bg-[#D2FF00] text-[#08090C] rounded-[2px] flex items-center justify-center mx-auto shadow-lg">
              <ScanLine className="w-5 h-5 stroke-[2.5]" />
            </div>
            <h2 className="text-lg sm:text-2xl font-black break-words uppercase">
              Are you hiring {p.fullName}?
            </h2>
            <p className="text-xs text-gray-300 leading-relaxed font-sans">
              Connect with this candidate or test your own developer resume on PandaLime's Free AI ATS Scanner.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-1 w-full max-w-md mx-auto font-mono">
            {p.contactEmail && (
              <a
                href={`mailto:${p.contactEmail}?subject=Interview%20Invitation%20via%20PandaLime`}
                className="w-full sm:w-auto px-4 py-2 bg-white text-[#08090C] hover:bg-gray-200 font-bold rounded-[2px] text-xs transition-all shadow-md text-center"
              >
                Send Interview Invite
              </a>
            )}
            <Link
              to="/dashboard"
              className="w-full sm:w-auto px-4 py-2 bg-[#D2FF00] hover:bg-[#b8e000] text-[#08090C] font-black rounded-[2px] text-xs transition-all shadow-[0_0_12px_rgba(210,255,0,0.25)] flex items-center justify-center gap-1.5 text-center"
            >
              <ScanLine className="w-3.5 h-3.5" />
              <span>Free ATS Resume Scan</span>
            </Link>
          </div>
        </section>

      </main>

      {/* --- FOOTER --- */}
      <footer className="border-t border-[#1F242D] py-6 px-4 text-center text-xs font-mono text-gray-500 w-full bg-[#08090C]">
        <p>
          Hosted on <Link to="/" className="text-gray-300 hover:text-[#D2FF00] font-bold">PandaLime Career</Link> (www.pandalime.com). 
          Built with <Link to="/portfolio-builder" className="text-[#D2FF00] hover:underline font-bold">PandaLime Studio</Link>.
        </p>
      </footer>

    </div>
  );
}
