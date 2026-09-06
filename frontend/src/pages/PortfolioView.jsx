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

export default function PortfolioView() {
  const { slug } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    let isMounted = true;
    const loadPortfolio = async () => {
      setLoading(true);

      // 1. Check local storage cache
      try {
        const localData = localStorage.getItem(`pandalime_portfolio_${slug}`);
        if (localData) {
          const parsed = JSON.parse(localData);
          if (isMounted) {
            setPortfolio(parsed);
            setLoading(false);
          }
        }
      } catch (e) {}

      // 2. Fetch from backend API
      try {
        const res = await fetch(`/api/portfolios/${slug}`);
        if (res.ok) {
          const remoteData = await res.json();
          if (remoteData.portfolio && isMounted) {
            setPortfolio(remoteData.portfolio);
            setLoading(false);
            return;
          }
        }
      } catch (e) {
        console.warn('Backend fetch fallback');
      }

      // 3. Preset fallback if matched by slug
      const matchedPreset = ROLE_PRESETS.find(p => p.slug === slug || p.id === slug);
      if (matchedPreset && isMounted) {
        setPortfolio(matchedPreset);
      } else if (!portfolio && isMounted) {
        // Fallback default
        setPortfolio(ROLE_PRESETS[0]);
      }

      if (isMounted) setLoading(false);
    };

    loadPortfolio();
    return () => { isMounted = false; };
  }, [slug]);

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
    <div className={`min-h-screen font-sans ${theme.bgClass} selection:bg-lime-500 selection:text-gray-950 antialiased`}>
      <SEOHead
        title={`${p.fullName} — ${p.title} | PandaLime Portfolio`}
        description={p.bio || `${p.fullName}'s professional developer and cyber portfolio.`}
        canonical={`/p/${slug || p.slug}`}
        jsonLd={jsonLd}
      />

      {/* --- TOP BRAND & CREATOR BAR --- */}
      <nav className="bg-gray-950/80 border-b border-gray-800/80 sticky top-0 z-40 backdrop-blur-md px-4 py-2.5">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 text-white text-xs sm:text-sm font-black tracking-tight hover:text-lime-400 transition-colors">
            <div className="w-6 h-6 bg-lime-500 rounded-md flex items-center justify-center text-gray-950">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <span>PandaLime DevFolio</span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={copyLink}
              className="px-2.5 py-1 bg-gray-900 hover:bg-gray-800 text-gray-300 border border-gray-700 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-lime-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copiedLink ? 'Link Copied!' : 'Share Portfolio'}</span>
            </button>

            <Link
              to="/portfolio-builder"
              className="px-3 py-1 bg-lime-500 hover:bg-lime-400 text-gray-950 rounded-lg text-xs font-black shadow-md shadow-lime-500/20 flex items-center gap-1 transition-all"
            >
              <Zap className="w-3 h-3" />
              <span>Create Your Own</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* --- HERO HEADER SECTION --- */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-20 space-y-16">
        
        {/* Profile Card */}
        <section className={`p-6 sm:p-10 rounded-3xl border ${theme.cardClass} relative overflow-hidden backdrop-blur-xl shadow-2xl`}>
          
          {/* Cyber Terminal Watermark Pill if Cyber Theme */}
          {p.theme === 'cyber' && (
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 font-mono text-[10px] text-emerald-400/70 bg-emerald-950/80 border border-emerald-500/30 px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span>[SEC_STATUS: CLEAR]</span>
            </div>
          )}

          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            
            {/* Avatar */}
            <div className="relative shrink-0">
              <img
                src={p.avatarUrl}
                alt={p.fullName}
                className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl object-cover border-2 shadow-2xl"
                style={{ borderColor: accent.hex }}
              />
              {p.availabilityStatus && (
                <div className="absolute -bottom-2 -right-2 bg-gray-900 border border-gray-700 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-lime-400 shadow-md flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-lime-400"></span>
                  <span>Available</span>
                </div>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left space-y-4">
              
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                  {p.fullName}
                </h1>
                <p className="text-lg sm:text-xl font-bold mt-1" style={{ color: accent.hex }}>
                  {p.title}
                </p>
                {p.tagline && (
                  <p className="text-xs sm:text-sm text-gray-400 mt-1 font-mono">
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
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl">
                {p.bio}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
                {p.contactEmail && (
                  <button
                    onClick={copyEmail}
                    className="px-4 py-2 bg-white text-gray-950 font-bold text-xs sm:text-sm rounded-xl flex items-center gap-1.5 hover:bg-gray-200 transition-all shadow-md cursor-pointer"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-600" /> : <Mail className="w-4 h-4" />}
                    <span>{copiedEmail ? 'Email Copied!' : p.contactEmail}</span>
                  </button>
                )}

                {p.socialLinks?.resumeUrl && p.socialLinks.resumeUrl !== '#' && (
                  <a
                    href={p.socialLinks.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-gray-200 border border-gray-700 font-bold text-xs sm:text-sm rounded-xl flex items-center gap-1.5 transition-all"
                  >
                    <Download className="w-4 h-4 text-purple-400" />
                    <span>Download CV</span>
                  </a>
                )}

                {/* Social Icon Pills */}
                <div className="flex items-center gap-1.5 pl-2">
                  {p.socialLinks?.github && (
                    <a
                      href={p.socialLinks.github}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 bg-gray-900/90 hover:bg-gray-800 text-gray-300 hover:text-white border border-gray-700 rounded-xl transition-colors"
                      title="GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {p.socialLinks?.linkedin && (
                    <a
                      href={p.socialLinks.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 bg-gray-900/90 hover:bg-gray-800 text-gray-300 hover:text-white border border-gray-700 rounded-xl transition-colors"
                      title="LinkedIn"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {p.socialLinks?.twitter && (
                    <a
                      href={p.socialLinks.twitter}
                      target="_blank"
                      rel="noreferrer"
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
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-gray-800/80">
              {p.metrics.map((m, i) => (
                <div key={i} className="text-center md:text-left">
                  <p className="text-2xl sm:text-3xl font-black tracking-tight" style={{ color: accent.hex }}>
                    {m.value}
                  </p>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-0.5">
                    {m.label}
                  </p>
                </div>
              ))}
            </div>
          )}

        </section>

        {/* --- TECHNICAL SKILLS MATRIX --- */}
        {p.skills && Object.keys(p.skills).length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <Code2 className="w-5 h-5" style={{ color: accent.hex }} />
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Technical Stack & Tooling
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(p.skills).map(([category, skillsList]) => (
                <div key={category} className={`p-5 rounded-2xl border ${theme.cardClass} space-y-3`}>
                  <h3 className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center justify-between">
                    <span>{category}</span>
                    <span className="text-[10px] font-mono text-gray-500">({skillsList.length})</span>
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {skillsList.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-xs font-medium px-2.5 py-1 rounded-lg bg-gray-900/90 text-gray-200 border border-gray-800 hover:border-gray-700 transition-colors"
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
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5" style={{ color: accent.hex }} />
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Featured Projects & Architecture
                </h2>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {p.projects.map((proj, pIdx) => (
                <div 
                  key={pIdx} 
                  className={`p-6 rounded-3xl border ${theme.cardClass} flex flex-col justify-between space-y-4 hover:translate-y-[-2px] transition-all group`}
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="text-lg font-bold text-white group-hover:text-lime-300 transition-colors">
                        {proj.title}
                      </h3>
                      {proj.metric && (
                        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-lime-950/80 text-lime-400 border border-lime-500/30 shrink-0">
                          {proj.metric}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                      {proj.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {(proj.tags || []).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-gray-900 text-gray-400 border border-gray-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-3 pt-2 border-t border-gray-800/60 text-xs font-bold">
                    {proj.demoUrl && (
                      <a
                        href={proj.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-white hover:text-lime-400 flex items-center gap-1 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live Demo</span>
                      </a>
                    )}
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noreferrer"
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
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5" style={{ color: accent.hex }} />
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Work Experience & Impact
              </h2>
            </div>

            <div className="space-y-6">
              {p.experience.map((exp, eIdx) => (
                <div key={eIdx} className={`p-6 sm:p-8 rounded-3xl border ${theme.cardClass} space-y-3`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        {exp.role} <span className="font-normal text-gray-400">at</span> <span style={{ color: accent.hex }}>{exp.company}</span>
                      </h3>
                      {exp.location && (
                        <p className="text-xs text-gray-500">{exp.location}</p>
                      )}
                    </div>
                    <span className="text-xs font-mono text-gray-400 bg-gray-900 px-3 py-1 rounded-full border border-gray-800 self-start sm:self-auto">
                      {exp.period}
                    </span>
                  </div>

                  <ul className="space-y-2 pt-2 text-xs sm:text-sm text-gray-300 list-disc list-outside ml-4">
                    {(exp.bullets || []).map((bullet, bIdx) => (
                      <li key={bIdx} className="leading-relaxed">
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
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5" style={{ color: accent.hex }} />
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Certifications & Accreditations
              </h2>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              {p.certifications.map((cert, cIdx) => (
                <div key={cIdx} className={`p-4 rounded-2xl border ${theme.cardClass} space-y-1`}>
                  <p className="font-bold text-sm text-white">{cert.name}</p>
                  <p className="text-xs text-gray-400">{cert.issuer} • {cert.year}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* --- BOTTOM CTA: ATS RESUME SCANNER & PORTFOLIO CREATOR --- */}
        <section className="bg-gradient-to-r from-lime-950/40 via-gray-900 to-lime-950/40 border border-lime-500/30 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl">
          <div className="max-w-xl mx-auto space-y-3">
            <div className="w-12 h-12 bg-lime-500 text-gray-950 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-lime-500/30">
              <ScanLine className="w-6 h-6" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Are you hiring {p.fullName}?
            </h2>
            <p className="text-xs sm:text-sm text-gray-300">
              Check out their verified technical stack, copy their contact details, or test your own resume on PandaLime's Free AI ATS Scanner.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            {p.contactEmail && (
              <a
                href={`mailto:${p.contactEmail}?subject=Interview%20Invitation%20via%20PandaLime`}
                className="px-6 py-3 bg-white text-gray-950 hover:bg-gray-200 font-bold rounded-xl text-sm transition-all shadow-lg"
              >
                Send Interview Invite
              </a>
            )}
            <Link
              to="/dashboard"
              className="px-6 py-3 bg-lime-500 hover:bg-lime-400 text-gray-950 font-black rounded-xl text-sm transition-all shadow-lg shadow-lime-500/20 flex items-center gap-2"
            >
              <ScanLine className="w-4 h-4" />
              <span>Free ATS Resume Scan</span>
            </Link>
          </div>
        </section>

      </main>

      {/* --- FOOTER --- */}
      <footer className="border-t border-gray-800 py-8 px-4 text-center text-xs text-gray-500">
        <p>
          Hosted on <Link to="/" className="text-gray-400 hover:text-lime-400 font-bold">PandaLime Career</Link> (www.pandalime.com). 
          Built with <Link to="/portfolio-builder" className="text-lime-400 hover:underline font-bold">PandaLime Portfolio Studio</Link>.
        </p>
      </footer>

    </div>
  );
}
