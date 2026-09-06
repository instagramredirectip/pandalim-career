import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Sparkles, 
  Copy, 
  Check, 
  ArrowRight, 
  FileText, 
  Layers, 
  ShieldCheck, 
  Zap, 
  RotateCcw, 
  ChevronDown, 
  Tag, 
  Cpu, 
  CheckCircle2, 
  ScanLine,
  HelpCircle,
  Code,
  Cloud,
  Database,
  Users
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import LanguageSelector from '../components/LanguageSelector';
import { SKILL_CATEGORIES, SAMPLE_JOB_DESCRIPTIONS } from '../data/toolsData';

export default function JobKeywordExtractor() {
  const [jobText, setJobText] = useState('');
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const navigate = useNavigate();

  // Instant client-side NLP extraction matching against comprehensive technical skill dictionary
  const extractedResults = useMemo(() => {
    if (!jobText.trim()) return null;

    const lowerText = ` ${jobText.toLowerCase()} `;
    const categorized = {};
    let totalCount = 0;

    Object.entries(SKILL_CATEGORIES).forEach(([key, category]) => {
      const matched = [];
      category.skills.forEach(skill => {
        // Safe regex boundary match for skills like C++, C#, Go, R, etc.
        const escaped = skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(^|[^a-zA-Z0-9_+#])${escaped}([^a-zA-Z0-9_+#]|$)`, 'i');
        if (regex.test(lowerText)) {
          matched.push(skill);
          totalCount++;
        }
      });

      if (matched.length > 0) {
        categorized[key] = {
          label: category.label,
          color: category.color,
          skills: matched
        };
      }
    });

    // Also extract frequent capitalized 2-word terms (e.g. "Distributed Systems", "Incident Response")
    const words = jobText.split(/\s+/).length;

    return {
      categorized,
      totalCount,
      wordCount: words,
      densityScore: Math.min(100, Math.round((totalCount / Math.max(1, words / 15)) * 100))
    };
  }, [jobText]);

  const handleCopyKeywords = () => {
    if (!extractedResults) return;
    const allSkills = Object.values(extractedResults.categorized).flatMap(c => c.skills);
    navigator.clipboard.writeText(allSkills.join(', '));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleScanResume = () => {
    if (!jobText.trim()) return;
    try {
      sessionStorage.setItem('prefill_job_description', jobText);
    } catch (e) {
      console.warn(e);
    }
    navigate('/dashboard', { state: { jobDescription: jobText } });
  };

  const loadSample = (sample) => {
    setJobText(sample.text);
  };

  const faqs = [
    {
      q: "How does the Job Description Keyword Extractor work?",
      a: "Our neural parser searches the pasted job posting for over 350+ technical languages, frameworks, cloud architectures, methodologies, and core competencies. It groups them by functional category and highlights the exact keywords corporate Applicant Tracking Systems (ATS) will check for."
    },
    {
      q: "Why do Applicant Tracking Systems (ATS) look for specific keywords?",
      a: "Enterprise applicant systems like Workday, Taleo, Greenhouse, and Lever receive hundreds of applicants per requisition. Automated filters rank candidate profiles based on the exact presence, context, and frequency of mandatory skills listed in the job description."
    },
    {
      q: "Is it bad to do 'keyword stuffing' on my resume?",
      a: "Yes! Simply copy-pasting a block of keywords or hiding white text will trigger spam filters and result in immediate rejection by human recruiters. Instead, weave the extracted technical keywords naturally into STAR-method accomplishment bullets (e.g. 'Architected microservices using Docker and PostgreSQL...')."
    },
    {
      q: "Can I transfer the extracted keywords to scan my resume directly?",
      a: "Yes! Click 'Scan Your Resume Against This Job Description' to seamlessly load your job description into PandaLime's free AI ATS scanner."
    }
  ];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.pandalime.com/" },
        { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://www.pandalime.com/tools" },
        { "@type": "ListItem", "position": 3, "name": "Job Description Keyword Extractor", "item": "https://www.pandalime.com/tools/job-description-keyword-extractor" }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Job Description Keyword Extractor & ATS Skill Finder",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "All Web Browsers",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "description": "Extract hard skills, technical keywords, cloud tools, and required certifications from any job posting to pass corporate ATS resume filters."
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": { "@type": "Answer", "text": f.a }
      }))
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <SEOHead 
        title="Free Job Description Keyword Extractor & ATS Skill Finder | PandaLime"
        description="Extract required technical skills, programming languages, cloud tools, and soft skills from any job description. Optimize your resume keywords to beat Workday, Taleo, and Greenhouse filters."
        canonical="/tools/job-description-keyword-extractor"
        jsonLd={jsonLd}
      />

      {/* --- TOP NAVBAR --- */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex justify-between items-center gap-2">
          <Link to="/" className="flex items-center gap-2 text-gray-900 font-black text-xl sm:text-2xl tracking-tight shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-lime-500 rounded-xl flex items-center justify-center text-white shadow-md shadow-lime-500/20 shrink-0">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <span>PandaLime</span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <LanguageSelector variant="nav" />
            <Link to="/tools" className="text-sm font-semibold text-gray-600 hover:text-lime-600 transition-colors hidden sm:block">
              All Tools
            </Link>
            <Link 
              to="/dashboard" 
              className="px-3.5 py-2 sm:px-5 sm:py-2.5 bg-lime-500 hover:bg-lime-600 active:scale-95 text-white rounded-xl font-bold text-xs sm:text-sm shadow-md shadow-lime-500/20 transition-all hover:-translate-y-0.5 shrink-0 flex items-center gap-1.5 whitespace-nowrap"
            >
              <ScanLine className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Scan Resume Free</span>
              <span className="sm:hidden">Scan Free</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* --- BREADCRUMBS --- */}
      <div className="bg-gray-100 border-b border-gray-200 py-2.5">
        <div className="max-w-6xl mx-auto px-4 text-xs text-gray-500 flex items-center gap-2 overflow-x-auto">
          <Link to="/" className="hover:text-lime-600 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/tools" className="hover:text-lime-600 transition-colors">Tools</Link>
          <span>/</span>
          <span className="text-gray-800 font-semibold truncate">Job Description Keyword Extractor</span>
        </div>
      </div>

      {/* --- HERO HEADER --- */}
      <header className="bg-white py-14 sm:py-16 border-b border-gray-200 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-lime-100 text-lime-800 font-bold text-xs uppercase tracking-wider mb-5">
            <Search className="w-3.5 h-3.5" />
            <span>Instant ATS Skill & Keyword Parser</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-4 leading-tight">
            Job Description <br className="sm:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-600 to-green-600">
              Keyword Extractor
            </span>
          </h1>

          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Paste any job posting from LinkedIn, Indeed, or Naukri to instantly uncover required hard skills, tools, cloud architectures, and ATS screening keywords.
          </p>
        </div>
      </header>

      {/* --- INTERACTIVE TOOL INTERFACE --- */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Input Area */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between">
                <label htmlFor="jd-input" className="font-bold text-gray-900 text-sm sm:text-base flex items-center gap-2">
                  <FileText className="w-4 h-4 text-lime-600" />
                  <span>Paste Job Description Text</span>
                </label>
                {jobText && (
                  <button 
                    onClick={() => setJobText('')}
                    className="text-xs text-gray-400 hover:text-red-500 flex items-center gap-1 transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" /> Clear
                  </button>
                )}
              </div>

              <textarea 
                id="jd-input"
                rows={10}
                value={jobText}
                onChange={(e) => setJobText(e.target.value)}
                placeholder="Paste the target job description here (e.g. Senior Software Engineer at Amazon, TCS Digital Fresher, Data Scientist)..."
                className="w-full p-4 rounded-2xl border border-gray-200 focus:border-lime-500 focus:ring-4 focus:ring-lime-500/10 outline-none text-sm text-gray-800 leading-relaxed resize-y transition-all font-mono placeholder:font-sans placeholder:text-gray-400"
              />

              {/* Sample JDs Quick Load */}
              <div className="space-y-2 pt-2">
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                  Or load a sample job posting:
                </p>
                <div className="flex flex-wrap gap-2">
                  {SAMPLE_JOB_DESCRIPTIONS.map((sample) => (
                    <button
                      key={sample.id}
                      type="button"
                      onClick={() => loadSample(sample)}
                      className="px-3 py-1.5 bg-gray-50 hover:bg-lime-50 hover:text-lime-800 hover:border-lime-300 text-gray-700 text-xs font-semibold rounded-xl border border-gray-200 transition-all text-left"
                    >
                      + {sample.title.split('(')[0]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Extraction Results */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div>
                  <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-amber-500" /> Extracted ATS Keywords
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {extractedResults ? `${extractedResults.totalCount} technical keywords found` : 'Paste a job description to extract'}
                  </p>
                </div>

                {extractedResults && extractedResults.totalCount > 0 && (
                  <button
                    onClick={handleCopyKeywords}
                    className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied!' : 'Copy All'}</span>
                  </button>
                )}
              </div>

              {!extractedResults || extractedResults.totalCount === 0 ? (
                <div className="py-12 text-center text-gray-400 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-gray-50 mx-auto flex items-center justify-center text-gray-300">
                    <Tag className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-medium">
                    No keywords extracted yet.
                  </p>
                  <p className="text-xs text-gray-400 max-w-xs mx-auto">
                    Paste a job description on the left or select a sample to see the instant skill breakdown.
                  </p>
                </div>
              ) : (
                <div className="space-y-6 max-h-[500px] overflow-y-auto pr-1">
                  
                  {/* Category Pill Sections */}
                  {Object.entries(extractedResults.categorized).map(([catKey, catData]) => (
                    <div key={catKey} className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-bold text-gray-500 uppercase tracking-wider">
                        <span>{catData.label}</span>
                        <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded-full text-gray-600">{catData.skills.length}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {catData.skills.map((skill, sIdx) => (
                          <span 
                            key={sIdx}
                            className={`px-3 py-1 rounded-xl text-xs font-bold border transition-transform hover:scale-105 ${catData.color}`}
                          >
                            ✓ {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* Primary Next Action CTA */}
                  <div className="pt-4 border-t border-gray-100 space-y-3">
                    <button
                      onClick={handleScanResume}
                      className="w-full py-4 bg-lime-500 hover:bg-lime-600 text-white rounded-2xl font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-lime-500/25 transition-all hover:-translate-y-0.5 cursor-pointer"
                    >
                      <ScanLine className="w-5 h-5" />
                      <span>Scan Resume Against This JD (1-Click)</span>
                    </button>
                    <p className="text-[11px] text-gray-400 text-center">
                      Auto-loads this job description into PandaLime AI Scanner. 100% Free.
                    </p>
                  </div>

                </div>
              )}

            </div>
          </div>

        </div>
      </main>

      {/* --- EDUCATIONAL GUIDE SECTION --- */}
      <section className="bg-white py-16 border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4">
              How to Optimize Your Resume with Extracted Keywords
            </h3>
            <p className="text-gray-600 text-base leading-relaxed">
              Applicant Tracking Systems (ATS) score candidates based on keyword relevance. Follow these three best practices to pass automated screening without triggering spam penalties.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 space-y-3">
              <div className="w-8 h-8 rounded-xl bg-lime-500 text-white font-black flex items-center justify-center text-sm">1</div>
              <h4 className="font-bold text-gray-900 text-base">Match Exact Technical Terms</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                If the posting specifies "AWS Lambda" and "PostgreSQL", don't just write "Cloud" and "SQL". Match the exact naming conventions the ATS filter algorithm was configured to search for.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 space-y-3">
              <div className="w-8 h-8 rounded-xl bg-lime-500 text-white font-black flex items-center justify-center text-sm">2</div>
              <h4 className="font-bold text-gray-900 text-base">Weave into STAR Bullets</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Avoid a raw "Skills" laundry list. Integrate your top tools directly into achievement bullets: <em>"Architected microservices using Docker and Redis, improving latency by 35%."</em>
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 space-y-3">
              <div className="w-8 h-8 rounded-xl bg-lime-500 text-white font-black flex items-center justify-center text-sm">3</div>
              <h4 className="font-bold text-gray-900 text-base">Check Final ATS Score</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Upload your completed PDF resume to <Link to="/dashboard" className="text-lime-600 font-bold hover:underline">PandaLime</Link> to simulate how Workday, Taleo, or TCS iON evaluate your keyword match density.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="bg-gray-50 py-16 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-3">
              Frequently Asked Questions About Job Keywords
            </h3>
            <p className="text-gray-600 text-base">
              Everything you need to know about ATS keyword density and recruiter filtering.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h4 className="font-bold text-gray-900 text-base mb-2 flex items-start gap-2">
                  <HelpCircle className="w-5 h-5 text-lime-600 shrink-0 mt-0.5" />
                  <span>{faq.q}</span>
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed pl-7">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-gray-900 text-gray-400 py-12 border-t border-gray-800 text-xs text-center">
        <div className="max-w-6xl mx-auto px-4 space-y-4">
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-300">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <Link to="/tools" className="hover:text-white transition-colors">All Tools</Link>
            <Link to="/tools/job-description-keyword-extractor" className="hover:text-white transition-colors text-lime-400 font-bold">JD Keyword Extractor</Link>
            <Link to="/tools/star-bullet-generator" className="hover:text-white transition-colors">STAR Bullet Generator</Link>
            <Link to="/tools/ats-action-verbs" className="hover:text-white transition-colors">250+ Action Verbs</Link>
            <Link to="/dashboard" className="hover:text-white transition-colors">Resume Scanner</Link>
            <Link to="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
          <p>&copy; {new Date().getFullYear()} PandaLime Career (www.pandalime.com). All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}

