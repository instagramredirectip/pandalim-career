import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Copy, 
  Check, 
  ArrowRight, 
  RotateCcw, 
  Layers, 
  CheckCircle2, 
  Zap, 
  FileText, 
  HelpCircle, 
  Award,
  ScanLine,
  TrendingUp,
  Cpu,
  Loader2
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import LanguageSelector from '../components/LanguageSelector';
import { apiRequest } from '../config/api';

export default function StarBulletGenerator() {
  const [role, setRole] = useState('Software Engineer');
  const [task, setTask] = useState('Built user authentication system and fixed latency bugs');
  const [tools, setTools] = useState('React, Node.js, Redis, JWT');
  const [metric, setMetric] = useState('35% faster login speed, 50,000+ active users');
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [aiGeneratedBullets, setAiGeneratedBullets] = useState(null);

  // Pre-made sample roles for quick testing
  const sampleScenarios = [
    {
      role: 'Full Stack Engineer',
      task: 'Created a customer dashboard and optimized database queries',
      tools: 'React, TypeScript, PostgreSQL, Prisma',
      metric: 'reduced query time by 60%, supporting 25k daily users'
    },
    {
      role: 'DevOps / Cloud Engineer',
      task: 'Automated CI/CD deployments and migrated infrastructure to cloud',
      tools: 'AWS, Docker, Kubernetes, GitHub Actions, Terraform',
      metric: 'cut deployment time from 3 hours to 10 mins with 99.99% uptime'
    },
    {
      role: 'Fresher / College Student',
      task: 'Built an e-commerce project for final year capstone',
      tools: 'Java, Spring Boot, MySQL, HTML/CSS',
      metric: 'scored 95/100 and placed top 3 in university hackathon'
    },
    {
      role: 'Data Scientist / ML Engineer',
      task: 'Trained a churn prediction model and deployed REST API',
      tools: 'Python, scikit-learn, PyTorch, FastAPI, Snowflake',
      metric: 'achieved 89% accuracy, saving an estimated $120k annually'
    }
  ];

  const loadScenario = (sc) => {
    setRole(sc.role);
    setTask(sc.task);
    setTools(sc.tools);
    setMetric(sc.metric);
    setAiGeneratedBullets(null);
  };

  // Instant client-side deterministic STAR bullets
  const clientBullets = [
    `Architected and deployed high-performance solutions for ${task.toLowerCase()} utilizing ${tools || 'modern frameworks'}, yielding ${metric || 'measurable business improvements and high reliability'}.`,
    `Engineered scalable workflows utilizing ${tools || 'core technologies'} to address ${task.toLowerCase()}, accelerating execution efficiency by ${metric || '30%+ across production workloads'}.`,
    `Spearheaded the technical overhaul for ${task.toLowerCase()} leveraging ${tools || 'industry-standard tools'}, achieving ${metric || 'superior reliability and positive user outcomes'}.`
  ];

  const displayedBullets = aiGeneratedBullets || clientBullets;

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleGenerateAI = async () => {
    if (!task.trim()) return;
    setLoading(true);
    try {
      const res = await apiRequest('/api/tools/generate-star-bullets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, task, tools, metric })
      });
      if (res && res.ok) {
        const data = await res.json();
        if (data.bullets && Array.isArray(data.bullets)) {
          setAiGeneratedBullets(data.bullets);
        }
      }
    } catch (e) {
      console.warn('AI bullet fallback failed, using smart client-side templates:', e);
    } finally {
      setLoading(false);
    }
  };

  const faqs = [
    {
      q: "What is the STAR method for resume bullet points?",
      a: "STAR stands for Situation, Task, Action, and Result. It is a structured framework that shifts the focus of your resume from simple passive responsibilities ('Responsible for writing code') to active, quantifiable business achievements ('Engineered high-throughput API with 99.99% uptime...')."
    },
    {
      q: "What is Google's X-Y-Z formula for resume writing?",
      a: "Pioneered by former Google SVP of People Operations Laszlo Bock, the X-Y-Z formula states: 'Accomplished [X] as measured by [Y], by doing [Z]'. Resumes written with this formula consistently score in the top 5% of corporate ATS screening algorithms."
    },
    {
      q: "What if I don't know the exact numbers or metrics for my project?",
      a: "Estimate conservatively based on scope: percentage improvements (e.g., 'reduced latency by ~30%'), scale of data (e.g., 'processed 10k+ rows'), or operational time saved (e.g., 'saved team 4 hours per week'). Recruiters value demonstrated awareness of impact."
    },
    {
      q: "Can I use these generated bullets directly in my resume?",
      a: "Yes! Click the copy icon next to any generated bullet point and paste it directly into your resume PDF. Then test your resume score on PandaLime."
    }
  ];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.pandalime.com/" },
        { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://www.pandalime.com/tools" },
        { "@type": "ListItem", "position": 3, "name": "STAR Method Bullet Generator", "item": "https://www.pandalime.com/tools/star-bullet-generator" }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "AI STAR Method Resume Bullet Generator",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "All Web Browsers",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "description": "Generate high-impact, quantified resume bullet points using the STAR method and Google X-Y-Z formula to pass ATS screening."
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
        title="Free AI STAR Method Resume Bullet Generator & Rewriter | PandaLime"
        description="Transform passive job duties into recruiter-ready, quantified STAR bullet points using Google's X-Y-Z formula. 100% free AI resume rewriter."
        canonical="/tools/star-bullet-generator"
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
          <span className="text-gray-800 font-semibold truncate">STAR Bullet Generator</span>
        </div>
      </div>

      {/* --- HERO HEADER --- */}
      <header className="bg-white py-14 sm:py-16 border-b border-gray-200 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-blue-100 border border-blue-300 text-blue-800 font-bold text-xs uppercase tracking-wider mb-5">
            <Award className="w-3.5 h-3.5" />
            <span>Google X-Y-Z Formula Bullet Rewriter</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-4 leading-tight">
            AI STAR Method <br className="sm:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-lime-600">
              Resume Bullet Generator
            </span>
          </h1>

          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Turn passive job duties into recruiter-ready statements with strong action verbs and quantified impact metrics that pass ATS screening thresholds.
          </p>
        </div>
      </header>

      {/* --- INTERACTIVE GENERATOR --- */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Inputs */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-5">
              
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-blue-600" /> Enter Your Task Details
                </h2>
                <button 
                  onClick={() => {
                    setTask('');
                    setTools('');
                    setMetric('');
                    setAiGeneratedBullets(null);
                  }}
                  className="text-xs text-gray-400 hover:text-red-500 flex items-center gap-1 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
              </div>

              {/* Quick sample scenarios */}
              <div className="space-y-2">
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                  Quick-load scenario:
                </p>
                <div className="flex flex-wrap gap-2">
                  {sampleScenarios.map((sc, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => loadScenario(sc)}
                      className="px-3 py-1.5 bg-gray-50 hover:bg-blue-50 hover:text-blue-800 hover:border-blue-300 text-gray-700 text-xs font-semibold rounded-lg border border-gray-200 transition-all text-left"
                    >
                      + {sc.role}
                    </button>
                  ))}
                </div>
              </div>

              {/* Target Role */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Target Job Role
                </label>
                <input 
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. Software Engineer, Product Manager, Data Analyst"
                  className="w-full p-3.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none text-sm text-gray-800 font-medium"
                />
              </div>

              {/* Task / Action */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  What did you work on? (Draft duty / task)
                </label>
                <textarea 
                  rows={3}
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  placeholder="e.g. Built the checkout page and fixed payment gateway latency bugs"
                  className="w-full p-3.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none text-sm text-gray-800"
                />
              </div>

              {/* Tools & Tech Stack */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Tools, Technologies or Methods Used
                </label>
                <input 
                  type="text"
                  value={tools}
                  onChange={(e) => setTools(e.target.value)}
                  placeholder="e.g. React, Node.js, Redis, Docker"
                  className="w-full p-3.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none text-sm text-gray-800"
                />
              </div>

              {/* Measurable Metric */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Measurable Outcome / Metric (Estimates are OK)
                </label>
                <input 
                  type="text"
                  value={metric}
                  onChange={(e) => setMetric(e.target.value)}
                  placeholder="e.g. 35% faster page load, 50,000+ users, saved 4 hours/week"
                  className="w-full p-3.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none text-sm text-gray-800"
                />
              </div>

              {/* AI Refresh Button */}
              <button
                type="button"
                onClick={handleGenerateAI}
                disabled={loading || !task.trim()}
                className="w-full py-3.5 bg-gray-900 hover:bg-black disabled:bg-gray-400 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 text-lime-400" />}
                <span>{loading ? 'Generating with AI...' : 'Generate New AI STAR Variations'}</span>
              </button>

            </div>
          </div>

          {/* RIGHT: Generated STAR Bullets */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-6">
              
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <Award className="w-5 h-5 text-lime-600" /> Recruiter-Ready STAR Bullets
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Formatted with Google's X-Y-Z formula for maximum ATS keyword weight
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {displayedBullets.map((bullet, idx) => (
                  <div 
                    key={idx}
                    className="p-5 rounded-xl bg-gray-50 border border-gray-200 hover:border-blue-300 hover:bg-blue-50/40 transition-all space-y-3 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-blue-100 text-blue-800">
                        STAR Option #{idx + 1}
                      </span>
                      <button
                        onClick={() => handleCopy(bullet, idx)}
                        className="px-3 py-1 bg-white hover:bg-gray-100 border border-gray-200 text-gray-700 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
                      >
                        {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedIndex === idx ? 'Copied!' : 'Copy'}</span>
                      </button>
                    </div>

                    <p className="text-sm font-medium text-gray-800 leading-relaxed">
                      • {bullet}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1 text-[11px] text-gray-500">
                      <span className="px-2 py-0.5 bg-white border border-gray-200 rounded-md font-semibold text-emerald-700">✓ Action Verb</span>
                      <span className="px-2 py-0.5 bg-white border border-gray-200 rounded-md font-semibold text-blue-700">✓ Context & Tech</span>
                      <span className="px-2 py-0.5 bg-white border border-gray-200 rounded-md font-semibold text-purple-700">✓ Quantified Metric</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Next Step CTA */}
              <div className="pt-4 border-t border-gray-100 space-y-3">
                <Link
                  to="/dashboard"
                  className="w-full py-3.5 bg-lime-500 hover:bg-lime-600 text-white rounded-xl font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-lime-500/25 transition-all hover:-translate-y-0.5"
                >
                  <ScanLine className="w-5 h-5" />
                  <span>Test Your Complete Resume Score Free</span>
                </Link>
                <p className="text-[11px] text-gray-400 text-center">
                  Upload your updated PDF resume to see your instant 0-100% ATS score.
                </p>
              </div>

            </div>
          </div>

        </div>
      </main>

      {/* --- GOOGLE FORMULA EXPLANATION --- */}
      <section className="bg-white py-16 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 space-y-8">
          <div className="text-center">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3">
              Google's X-Y-Z Formula Explained
            </h3>
            <p className="text-gray-600 text-base">
              Why top tech recruiters at Google, Amazon, Microsoft, and TCS prioritize structured bullets.
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-lime-50 p-8 rounded-2xl border border-blue-200 text-gray-800 space-y-4">
            <p className="text-lg font-bold text-gray-900 text-center">
              "Accomplished <span className="text-blue-700">[X]</span> as measured by <span className="text-purple-700">[Y]</span>, by doing <span className="text-emerald-700">[Z]</span>"
            </p>
            <div className="grid sm:grid-cols-3 gap-4 pt-4 text-xs">
              <div className="bg-white p-4 rounded-xl border border-blue-100 shadow-sm">
                <p className="font-bold text-blue-700 mb-1">[X] The Outcome</p>
                <p className="text-gray-600">What specific business or engineering milestone did you hit?</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-purple-100 shadow-sm">
                <p className="font-bold text-purple-700 mb-1">[Y] The Metric</p>
                <p className="text-gray-600">How is success measured (%, $, latency, users, uptime)?</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-emerald-100 shadow-sm">
                <p className="font-bold text-emerald-700 mb-1">[Z] The Method</p>
                <p className="text-gray-600">What tools, architecture, or skills did you implement?</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="bg-gray-50 py-16 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-3">
              Frequently Asked Questions About STAR Bullets
            </h3>
            <p className="text-gray-600 text-base">
              Common questions on quantifying accomplishments and passing recruiter review.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
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
            <Link to="/tools/job-description-keyword-extractor" className="hover:text-white transition-colors">JD Keyword Extractor</Link>
            <Link to="/tools/star-bullet-generator" className="hover:text-white transition-colors text-lime-400 font-bold">STAR Bullet Generator</Link>
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

