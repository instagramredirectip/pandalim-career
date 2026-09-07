import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Sparkles, 
  Copy, 
  Check, 
  ArrowRight, 
  TrendingUp, 
  Award, 
  Filter, 
  CheckCircle2, 
  X, 
  HelpCircle, 
  ScanLine, 
  Layers, 
  Zap,
  Code,
  Building2
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import LanguageSelector from '../components/LanguageSelector';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MobileDrawer from '../components/MobileDrawer';
import { ACTION_VERB_CATEGORIES } from '../data/toolsData';

export default function AtsActionVerbs() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedVerb, setCopiedVerb] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Filter verbs across categories
  const filteredCategories = useMemo(() => {
    return ACTION_VERB_CATEGORIES.map(cat => {
      if (selectedCategory !== 'all' && cat.id !== selectedCategory) {
        return null;
      }
      const matchingVerbs = cat.verbs.filter(v => 
        v.verb.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.example.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (matchingVerbs.length === 0) return null;
      return {
        ...cat,
        verbs: matchingVerbs
      };
    }).filter(Boolean);
  }, [selectedCategory, searchQuery]);

  const handleCopyExample = (example, verbName) => {
    navigator.clipboard.writeText(example);
    setCopiedVerb(verbName);
    setTimeout(() => setCopiedVerb(null), 2000);
  };

  const faqs = [
    {
      q: "Why are action verbs critical for ATS resume scoring?",
      a: "Applicant Tracking Systems (ATS) and human recruiters scan the beginning of every bullet point for strong action verbs. Resumes that begin with passive phrases ('Responsible for', 'Worked on', 'Helped with') receive significantly lower scores than those starting with active ownership words like 'Architected', 'Spearheaded', or 'Automated'."
    },
    {
      q: "How many times can I repeat the same action verb?",
      a: "Avoid repeating the same action verb more than once across consecutive bullets, or more than twice in your entire resume. Using varied verbs from our directory demonstrates a wider range of technical competencies and keeps recruiters engaged."
    },
    {
      q: "Should I use past tense or present tense action verbs?",
      a: "Use past tense ('Engineered', 'Overhauled', 'Scaled') for previous roles and completed projects. Use present tense ('Engineer', 'Maintain', 'Direct') only for your current, ongoing position."
    },
    {
      q: "How do I turn these action verbs into Google X-Y-Z bullet points?",
      a: "Start with an action verb (e.g. 'Architected'), state what you built with context and tools ('a multi-tenant microservices platform using Docker and Go'), and end with a quantified outcome ('cutting cloud compute latency by 45%'). You can also use our free AI STAR Bullet Generator."
    }
  ];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.pandalime.com/" },
        { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://www.pandalime.com/tools" },
        { "@type": "ListItem", "position": 3, "name": "ATS Resume Action Verbs", "item": "https://www.pandalime.com/tools/ats-action-verbs" }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "250+ High-Impact ATS Resume Action Verbs & Power Words",
      "url": "https://www.pandalime.com/tools/ats-action-verbs",
      "description": "Categorized directory of 250+ powerful resume action verbs with real-world quantifiable bullet point examples for software engineers, freshers, and managers."
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
        title="250+ High-Impact ATS Resume Action Verbs & Power Words | PandaLime"
        description="Search 250+ powerful resume action verbs for Engineering, Leadership, and Scale. Includes real-world STAR bullet point examples to beat ATS filters."
        canonical="/tools/ats-action-verbs"
        jsonLd={jsonLd}
      />

      {/* --- TOP NAVBAR --- */}
      <Navbar onOpenMobileMenu={() => setMobileMenuOpen(true)} />
      <MobileDrawer isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* --- BREADCRUMBS --- */}
      <div className="bg-gray-100 border-b border-gray-200 py-2.5">
        <div className="max-w-6xl mx-auto px-4 text-xs text-gray-500 flex items-center gap-2 overflow-x-auto">
          <Link to="/" className="hover:text-lime-600 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/tools" className="hover:text-lime-600 transition-colors">Tools</Link>
          <span>/</span>
          <span className="text-gray-800 font-semibold truncate">250+ ATS Action Verbs</span>
        </div>
      </div>

      {/* --- HERO HEADER --- */}
      <header className="bg-white py-14 sm:py-16 border-b border-gray-200 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-purple-100 border border-purple-300 text-purple-800 font-bold text-xs uppercase tracking-wider mb-5">
            <Award className="w-3.5 h-3.5" />
            <span>Recruiter-Approved Vocabulary Guide</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-4 leading-tight">
            250+ High-Impact <br className="sm:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-lime-600">
              ATS Resume Action Verbs
            </span>
          </h1>

          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
            Replace weak, passive phrases with strong power verbs that command recruiter attention and elevate your ATS keyword score.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search verbs, meanings, or skills (e.g. 'architected', 'scaled', 'python')..."
              className="w-full pl-12 pr-10 py-3.5 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none text-sm text-gray-800 shadow-sm"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* --- CATEGORY FILTERS --- */}
      <div className="bg-gray-100/70 border-b border-gray-200 py-3 sticky top-16 z-30 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl font-bold whitespace-nowrap transition-all shrink-0 ${
              selectedCategory === 'all'
                ? 'bg-gray-900 text-white shadow-sm'
                : 'bg-white text-gray-700 hover:bg-gray-200 border border-gray-200'
            }`}
          >
            All Categories ({ACTION_VERB_CATEGORIES.reduce((s, c) => s + c.verbs.length, 0)})
          </button>
          {ACTION_VERB_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl font-bold whitespace-nowrap transition-all shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-white text-gray-700 hover:bg-purple-50 hover:text-purple-800 border border-gray-200'
              }`}
            >
              {cat.name} ({cat.verbs.length})
            </button>
          ))}
        </div>
      </div>

      {/* --- VERBS DIRECTORY LIST --- */}
      <main className="max-w-6xl mx-auto px-4 py-12 space-y-12">
        {filteredCategories.length === 0 ? (
          <div className="py-16 text-center text-gray-500 space-y-3 bg-white rounded-2xl border border-gray-200 p-8">
            <p className="font-bold text-lg">No action verbs matched "{searchQuery}"</p>
            <p className="text-xs text-gray-400">Try searching for a different keyword or resetting your category filter.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="px-4 py-2 bg-gray-900 text-white rounded-xl text-xs font-bold"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          filteredCategories.map(category => (
            <div key={category.id} className="space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-200">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <span>{category.name}</span>
                    <span className="text-xs px-2.5 py-0.5 rounded-md bg-purple-100 text-purple-800 font-extrabold uppercase">
                      {category.verbs.length} Verbs
                    </span>
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">{category.description}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.verbs.map((item, vIdx) => (
                  <div 
                    key={vIdx}
                    className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md hover:border-purple-300 transition-all flex flex-col justify-between group space-y-4"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <h3 className="text-lg font-black text-gray-900 group-hover:text-purple-700 transition-colors">
                          {item.verb}
                        </h3>
                        <span className="text-[10px] text-gray-400 uppercase font-semibold">
                          {category.badge}
                        </span>
                      </div>

                      <p className="text-xs text-gray-500 mb-3">
                        {item.meaning}
                      </p>

                      <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 text-xs text-gray-700 leading-relaxed font-mono">
                        <p className="font-sans text-[11px] font-bold text-purple-700 mb-1">Example Bullet:</p>
                        "{item.example}"
                      </div>
                    </div>

                    <button
                      onClick={() => handleCopyExample(item.example, item.verb)}
                      className="w-full py-2 bg-gray-50 hover:bg-purple-50 group-hover:border-purple-200 border border-gray-200 text-gray-700 hover:text-purple-800 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      {copiedVerb === item.verb ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-green-600" />
                          <span>Copied Bullet!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Example</span>
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>

            </div>
          ))
        )}
      </main>

      {/* --- BEFORE VS AFTER COMPARISON --- */}
      <section className="bg-white py-16 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 space-y-8">
          <div className="text-center">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3">
              Passive Words vs. Strong ATS Action Verbs
            </h3>
            <p className="text-gray-600 text-base">
              See how replacing lazy phrases with action verbs elevates recruiter perception.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="py-3 px-4 text-red-600 font-bold uppercase text-xs">❌ Avoid Passive Words</th>
                  <th className="py-3 px-4 text-emerald-700 font-bold uppercase text-xs">✓ Use Power Verbs</th>
                  <th className="py-3 px-4 text-gray-600 font-bold uppercase text-xs">Recruiter Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs text-gray-700">
                <tr>
                  <td className="py-3 px-4 text-red-500 font-semibold">"Responsible for coding..."</td>
                  <td className="py-3 px-4 text-emerald-700 font-bold">"Architected & Engineered..."</td>
                  <td className="py-3 px-4 text-gray-500">Shows proactive technical design ownership</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-red-500 font-semibold">"Helped the team with..."</td>
                  <td className="py-3 px-4 text-emerald-700 font-bold">"Spearheaded & Championed..."</td>
                  <td className="py-3 px-4 text-gray-500">Highlights leadership and initiative</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-red-500 font-semibold">"Worked on fixing bugs..."</td>
                  <td className="py-3 px-4 text-emerald-700 font-bold">"Diagnosed & Refactored..."</td>
                  <td className="py-3 px-4 text-gray-500">Proves deep problem-solving expertise</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-red-500 font-semibold">"Did testing on features..."</td>
                  <td className="py-3 px-4 text-emerald-700 font-bold">"Automated CI/CD Test Suites..."</td>
                  <td className="py-3 px-4 text-gray-500">Demonstrates efficiency and scalable tooling</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="bg-gray-50 py-16 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-3">
              Frequently Asked Questions About Action Verbs
            </h3>
            <p className="text-gray-600 text-base">
              Guidelines for polishing resume vocabulary and passing automated recruiter screens.
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
      <Footer />

    </div>
  );
}

