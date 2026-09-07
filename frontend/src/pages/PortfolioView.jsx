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
  Copy, 
  ShieldCheck, 
  Terminal, 
  Cpu, 
  Code2, 
  Layers, 
  Briefcase, 
  Award, 
  QrCode, 
  ScanLine, 
  Share2, 
  ArrowRight,
  Globe,
  Zap,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { THEMES, ACCENT_COLORS, ROLE_PRESETS } from '../data/portfolioTemplates';
import { apiRequest } from '../config/api';
import { sanitizeUrl } from '../utils/sanitize';

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

      // 4. Check if matched against built-in role showcase presets (e.g. alex-secops, priya-sharma, rohan-ai)
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
      <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center p-4 font-sans">
        <div className="text-center space-y-4 animate-pulse">
          <div className="w-12 h-12 bg-lime-500 rounded-2xl flex items-center justify-center mx-auto text-gray-950">
            <Sparkles className="w-6 h-6 animate-spin" />
          </div>
          <p className="text-sm font-bold text-gray-400">Loading Portfolio Profile...</p>
        </div>
      </div>
    );
  }

  const p = portfolio || ROLE_PRESETS[0];
  const theme = THEMES.find(t => t.id === p.theme) || THEMES[0];
  const accent = ACCENT_COLORS.find(c => c.id === p.accentColor) || ACCENT_COLORS[0];
  const publicUrl = `https://www.pandalime.com/p/${slug || p.slug || 'profile'}`;

  const copyEmail = () => {
    if (p.contactEmail) {
      navigator.clipboard.writeText(p.contactEmail);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 3000);
    }
  };

  const copyLink = () => {
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
    <div className={`min-h-screen font-sans ${theme.bgClass} selection:bg-lime-500 selection:text-gray-950 antialiased w-full max-w-full overflow-x-hidden`}>
      <SEOHead
        title={`${p.fullName} — ${p.title} | PandaLime Portfolio`}
        description={p.bio || `${p.fullName}'s professional developer and cyber portfolio.`}
        canonical={`/p/${slug || p.slug}`}
        jsonLd={jsonLd}
      />

      {/* --- TOP BRAND & CREATOR BAR --- */}
      <nav className="bg-gray-950/90 border-b border-gray-800/80 sticky top-0 z-40 backdrop-blur-md px-3 sm:px-4 py-2.5 w-full">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-2">
          <Link to="/" className="flex items-center gap-1.5 sm:gap-2 text-white text-xs sm:text-sm font-black tracking-tight hover:text-lime-400 transition-colors shrink-0">
            <div className="w-6 h-6 bg-lime-500 rounded-md flex items-center justify-center text-gray-950 shrink-0">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <span className="truncate max-w-[130px] sm:max-w-none">PandaLime DevFolio</span>
          </Link>

          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <button
              onClick={copyLink}
              className="p-1.5 sm:px-2.5 sm:py-1 bg-gray-900 hover:bg-gray-800 text-gray-300 border border-gray-700 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all"
              title="Share Portfolio"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-lime-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copiedLink ? 'Link Copied!' : 'Share'}</span>
            </button>

            <Link
              to="/portfolio-builder"
              className="px-2.5 py-1 bg-lime-500 hover:bg-lime-400 text-gray-950 rounded-lg text-xs font-black shadow-md shadow-lime-500/20 flex items-center gap-1 transition-all whitespace-nowrap"
            >
              <Zap className="w-3 h-3" />
              <span>Create Your Own</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* --- HERO HEADER SECTION --- */}
      <main className="max-w-5xl mx-auto px-3.5 sm:px-6 py-6 sm:py-16 space-y-10 sm:space-y-16 w-full overflow-hidden">
        
        {/* Profile Card */}
        <section className={`p-5 sm:p-10 rounded-2xl border ${theme.cardClass} relative overflow-hidden backdrop-blur-xl shadow-2xl w-full`}>
          
          {/* Cyber Terminal Watermark Pill (Clean on mobile, absolute on desktop) */}
          {p.theme === 'cyber' && (
            <div className="flex justify-center md:justify-end mb-4 md:mb-0 md:absolute md:top-6 md:right-6">
              <div className="font-mono text-[10px] text-emerald-400/80 bg-emerald-950/80 border border-emerald-500/30 px-2.5 py-1 rounded-md flex items-center gap-1.5 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span>[SEC_STATUS: CLEAR]</span>
              </div>
            </div>
          )}

          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8">
            
            {/* Avatar */}
            <div className="relative shrink-0">
              <img
                src={sanitizeUrl(p.avatarUrl) || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80'}
                alt={p.fullName}
                className="w-24 h-24 sm:w-36 sm:h-36 rounded-2xl object-cover border-2 shadow-2xl"
                style={{ borderColor: accent.hex }}
              />
              {p.availabilityStatus && (
                <div className="absolute -bottom-2 -right-2 bg-gray-900 border border-gray-700 px-2 py-0.5 rounded-md text-[10px] font-bold text-lime-400 shadow-md flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-lime-400"></span>
                  <span>Available</span>
                </div>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left space-y-3.5 w-full">
              
              <div>
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight break-words">
                  {p.fullName}
                </h1>
                <p className="text-base sm:text-xl font-bold mt-1 break-words" style={{ color: accent.hex }}>
                  {p.title}
                </p>
                {p.tagline && (
                  <p className="text-xs sm:text-sm text-gray-400 mt-1 font-mono break-words">
                    {p.tagline}
                  </p>
                )}
              </div>

              {/* Location & Status Badges */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-xs">
                {p.location && (
                  <span className="flex items-center gap-1 text-gray-400 bg-gray-900/80 px-2.5 py-1 rounded-lg border border-gray-800">
                    <MapPin className="w-3.5 h-3.5" /> {p.location}
                  </span>
                )}
                {p.availabilityStatus && (
                  <span className="bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 px-2.5 py-1 rounded-lg font-semibold">
                    {p.availabilityStatus}
                  </span>
                )}
              </div>

              {/* Bio */}
              <p className="text-xs sm:text-base text-gray-300 leading-relaxed max-w-2xl break-words">
                {p.bio}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 sm:gap-3 pt-2 w-full">
                {p.contactEmail && (
                  <button
                    onClick={copyEmail}
                    className="px-3.5 py-2 bg-white text-gray-950 font-bold text-xs sm:text-sm rounded-xl flex items-center gap-1.5 hover:bg-gray-200 transition-all shadow-md cursor-pointer max-w-full"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-600 shrink-0" /> : <Mail className="w-4 h-4 shrink-0" />}
                    <span className="truncate max-w-[180px] sm:max-w-none">{copiedEmail ? 'Email Copied!' : p.contactEmail}</span>
                  </button>
                )}

                {sanitizeUrl(p.socialLinks?.resumeUrl) && (
                  <a
                    href={sanitizeUrl(p.socialLinks.resumeUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 bg-gray-900 hover:bg-gray-800 text-gray-200 border border-gray-700 font-bold text-xs sm:text-sm rounded-xl flex items-center gap-1.5 transition-all shrink-0"
                  >
                    <Download className="w-4 h-4 text-purple-400" />
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
                      className="p-2 bg-gray-900/90 hover:bg-gray-800 text-gray-300 hover:text-white border border-gray-700 rounded-xl transition-colors"
                      title="GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {sanitizeUrl(p.socialLinks?.linkedin) && (
                    <a
                      href={sanitizeUrl(p.socialLinks.linkedin)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-900/90 hover:bg-gray-800 text-gray-300 hover:text-white border border-gray-700 rounded-xl transition-colors"
                      title="LinkedIn"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {sanitizeUrl(p.socialLinks?.twitter) && (
                    <a
                      href={sanitizeUrl(p.socialLinks.twitter)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-900/90 hover:bg-gray-800 text-gray-300 hover:text-white border border-gray-700 rounded-xl transition-colors"
                      title="X / Twitter"
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                  )}
                </div>

              </div>

            </div>

          </div>

          {/* Key Metrics Row */}
          {(p.metrics || []).length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-800/80">
              {p.metrics.map((m, i) => (
                <div key={i} className="text-center md:text-left bg-gray-950/40 sm:bg-transparent p-2.5 sm:p-0 rounded-xl border border-gray-800/50 sm:border-0">
                  <p className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight break-words" style={{ color: accent.hex }}>
                    {m.value}
                  </p>
                  <p className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider mt-0.5 break-words">
                    {m.label}
                  </p>
                </div>
              ))}
            </div>
          )}

        </section>

        {/* --- TECHNICAL SKILLS MATRIX --- */}
        {p.skills && Object.keys(p.skills).length > 0 && (
          <section className="space-y-4 sm:space-y-6">
            <div className="flex items-center gap-2">
              <Code2 className="w-5 h-5" style={{ color: accent.hex }} />
              <h2 className="text-lg sm:text-2xl font-bold text-white tracking-tight">
                Technical Stack & Tooling
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-4">
              {Object.entries(p.skills).map(([category, skillsList]) => (
                <div key={category} className={`p-4 sm:p-5 rounded-2xl border ${theme.cardClass} space-y-2.5 sm:space-y-3`}>
                  <h3 className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center justify-between">
                    <span className="truncate">{category}</span>
                    <span className="text-[10px] font-mono text-gray-500 shrink-0">({skillsList.length})</span>
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {skillsList.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-xs font-medium px-2.5 py-1 rounded-lg bg-gray-900/90 text-gray-200 border border-gray-800 hover:border-gray-700 transition-colors break-words"
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
          <section className="space-y-4 sm:space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5" style={{ color: accent.hex }} />
                <h2 className="text-lg sm:text-2xl font-bold text-white tracking-tight">
                  Featured Projects & Architecture
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {p.projects.map((proj, pIdx) => (
                <div 
                  key={pIdx} 
                  className={`p-5 sm:p-6 rounded-xl border ${theme.cardClass} flex flex-col justify-between space-y-4 hover:translate-y-[-2px] transition-all group`}
                >
                  <div className="space-y-3">
                    <div className="flex flex-wrap justify-between items-start gap-2">
                      <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-lime-300 transition-colors break-words">
                        {proj.title}
                      </h3>
                      {proj.metric && (
                        <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-lime-950/80 text-lime-400 border border-lime-500/30 shrink-0">
                          {proj.metric}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed break-words">
                      {proj.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {(proj.tags || []).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-gray-900 text-gray-400 border border-gray-800 break-words"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                    {/* Links */}
                    <div className="flex items-center gap-3 pt-2 border-t border-gray-800/60 text-xs font-bold">
                      {sanitizeUrl(proj.demoUrl) && (
                        <a
                          href={sanitizeUrl(proj.demoUrl)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white hover:text-lime-400 flex items-center gap-1 transition-colors"
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
                          className="text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>Source Code</span>
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
          <section className="space-y-4 sm:space-y-6">
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5" style={{ color: accent.hex }} />
              <h2 className="text-lg sm:text-2xl font-bold text-white tracking-tight">
                Work Experience & Impact
              </h2>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {p.experience.map((exp, eIdx) => (
                <div key={eIdx} className={`p-5 sm:p-8 rounded-xl border ${theme.cardClass} space-y-3`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white break-words">
                        {exp.role} <span className="font-normal text-gray-400">at</span> <span style={{ color: accent.hex }}>{exp.company}</span>
                      </h3>
                      {exp.location && (
                        <p className="text-xs text-gray-500">{exp.location}</p>
                      )}
                    </div>
                    <span className="text-[11px] sm:text-xs font-mono text-gray-400 bg-gray-900 px-2.5 py-1 rounded-md border border-gray-800 self-start sm:self-auto shrink-0">
                      {exp.period}
                    </span>
                  </div>

                  <ul className="space-y-2 pt-2 text-xs sm:text-sm text-gray-300 list-disc list-outside ml-4">
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

        {/* --- CERTIFICATIONS & ACHIEVEMENTS --- */}
        {(p.certifications || []).length > 0 && (
          <section className="space-y-4 sm:space-y-6">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5" style={{ color: accent.hex }} />
              <h2 className="text-lg sm:text-2xl font-bold text-white tracking-tight">
                Certifications & Accreditations
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {p.certifications.map((cert, cIdx) => (
                <div key={cIdx} className={`p-3.5 sm:p-4 rounded-xl border ${theme.cardClass} space-y-1`}>
                  <p className="font-bold text-sm text-white break-words">{cert.name}</p>
                  <p className="text-xs text-gray-400 break-words">{cert.issuer} • {cert.year}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* --- BOTTOM CTA: ATS RESUME SCANNER & PORTFOLIO CREATOR --- */}
        <section className="bg-gradient-to-r from-lime-950/40 via-gray-900 to-lime-950/40 border border-lime-500/30 rounded-2xl p-6 sm:p-12 text-center space-y-6 shadow-2xl">
          <div className="max-w-xl mx-auto space-y-3">
            <div className="w-12 h-12 bg-lime-500 text-gray-950 rounded-xl flex items-center justify-center mx-auto shadow-lg shadow-lime-500/30">
              <ScanLine className="w-6 h-6" />
            </div>
            <h2 className="text-xl sm:text-3xl font-black text-white break-words">
              Are you hiring {p.fullName}?
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Check out their verified technical stack, copy their contact details, or test your own resume on PandaLime's Free AI ATS Scanner.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2 w-full max-w-md mx-auto">
            {p.contactEmail && (
              <a
                href={`mailto:${p.contactEmail}?subject=Interview%20Invitation%20via%20PandaLime`}
                className="w-full sm:w-auto px-6 py-3 bg-white text-gray-950 hover:bg-gray-200 font-bold rounded-xl text-sm transition-all shadow-lg text-center"
              >
                Send Interview Invite
              </a>
            )}
            <Link
              to="/dashboard"
              className="w-full sm:w-auto px-6 py-3 bg-lime-500 hover:bg-lime-400 text-gray-950 font-black rounded-xl text-sm transition-all shadow-lg shadow-lime-500/20 flex items-center justify-center gap-2 text-center"
            >
              <ScanLine className="w-4 h-4 shrink-0" />
              <span>Free ATS Resume Scan</span>
            </Link>
          </div>
        </section>

      </main>

      {/* --- FOOTER --- */}
      <footer className="border-t border-gray-800 py-8 px-4 text-center text-xs text-gray-500 w-full">
        <p>
          Hosted on <Link to="/" className="text-gray-400 hover:text-lime-400 font-bold">PandaLime Career</Link> (www.pandalime.com). 
          Built with <Link to="/portfolio-builder" className="text-lime-400 hover:underline font-bold">PandaLime Portfolio Studio</Link>.
        </p>
      </footer>

    </div>
  );
}

