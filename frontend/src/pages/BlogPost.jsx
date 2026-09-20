import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Clock, 
  Calendar, 
  User, 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  Share2, 
  ScanLine, 
  Globe, 
  CheckCircle2, 
  BookOpen, 
  ListTree, 
  ShieldCheck, 
  Zap, 
  Copy, 
  Check, 
  HelpCircle, 
  ChevronDown, 
  Terminal, 
  Layers, 
  Cpu, 
  Database, 
  Network, 
  Play, 
  XCircle, 
  FileCode 
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MobileDrawer from '../components/MobileDrawer';
import { getBlogPostBySlug, BLOG_POSTS } from '../data/blogPosts';
import { prefetchRoute } from '../utils/prefetch';

/* ==========================================================================
   1. Interactive Architecture Visualizer Component
   ========================================================================== */
function InteractiveArchitectureVisualizer() {
  const [activeLayer, setActiveLayer] = useState('host');

  const layers = [
    {
      id: 'host',
      num: '01',
      title: 'MCP Host',
      tag: 'Application Layer',
      icon: Terminal,
      shortDesc: 'Initiates workflow & enforces human consent.',
      fullDesc: 'The user-facing application (e.g., Claude Desktop, Cursor, Zed, or PandaLime Agent). The Host renders the visual UI, manages session lifecycles, coordinates clients, and intercepts tool requests to prompt the user for explicit permission.',
      protocol: 'UI Events & Process Supervision',
      example: 'Claude Desktop / Cursor IDE / PandaLime Agent UI'
    },
    {
      id: 'client',
      num: '02',
      title: 'MCP Client',
      tag: 'Protocol Layer',
      icon: Cpu,
      shortDesc: 'Maintains 1:1 stateful JSON-RPC connection.',
      fullDesc: 'A specialized protocol adapter embedded inside the Host. It maintains a 1:1 stateful session with an MCP Server, serializes requests into JSON-RPC 2.0 messages, and routes server capability discoveries.',
      protocol: 'JSON-RPC 2.0 (Bidirectional)',
      example: '@modelcontextprotocol/sdk/client'
    },
    {
      id: 'server',
      num: '03',
      title: 'MCP Server',
      tag: 'Service Layer',
      icon: Network,
      shortDesc: 'Exposes Resources, Prompts & Tools.',
      fullDesc: 'A lightweight process or microservice running locally via stdio or remotely via HTTP-SSE. It registers capabilities and executes business logic when authorized by the Host.',
      protocol: 'stdio Process / HTTP with Server-Sent Events',
      example: 'PandaLime-Resume-Evaluator (Node.js/TypeScript)'
    },
    {
      id: 'data',
      num: '04',
      title: 'Local Data / APIs',
      tag: 'Resource Layer',
      icon: Database,
      shortDesc: 'Underlying files, Git repos & cloud APIs.',
      fullDesc: 'The raw data sources and tools wrapped by the MCP Server—such as local markdown resumes, Git commit logs, Docker daemons, Postgres databases, or ATS screening endpoints.',
      protocol: 'POSIX Filesystem / REST / SQL',
      example: 'file:///resume.md | github://repos | postgres://'
    }
  ];

  const current = layers.find(l => l.id === activeLayer) || layers[0];

  return (
    <div className="my-8 border border-zinc-800 bg-[#0d0d10] p-6 sm:p-8 not-prose shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 blur-3xl pointer-events-none"></div>

      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-orange-500 animate-pulse"></span>
          <span className="font-mono text-xs uppercase tracking-widest text-orange-400 font-bold">
            Interactive Topology Explorer
          </span>
        </div>
        <span className="font-mono text-[11px] text-zinc-500 bg-zinc-900 px-2.5 py-1 border border-zinc-800">
          Click any layer to inspect protocol role
        </span>
      </div>

      {/* Layer Selector Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {layers.map((layer) => {
          const Icon = layer.icon;
          const isActive = layer.id === activeLayer;
          return (
            <button
              key={layer.id}
              type="button"
              onClick={() => setActiveLayer(layer.id)}
              className={`p-4 text-left transition-all cursor-pointer border relative ${
                isActive 
                  ? 'border-orange-500 bg-zinc-900/90 shadow-[0_0_20px_rgba(249,115,22,0.15)]' 
                  : 'border-zinc-800 bg-[#121215] hover:border-zinc-700'
              }`}
            >
              {isActive && (
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-orange-500"></div>
              )}
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] text-orange-500 font-bold">{layer.num} //</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.5 border ${
                  isActive ? 'border-orange-500/40 text-orange-400 bg-orange-500/10' : 'border-zinc-800 text-zinc-500'
                }`}>
                  {layer.tag}
                </span>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <Icon className={`w-4 h-4 ${isActive ? 'text-orange-400' : 'text-zinc-400'}`} />
                <h4 className="font-bold text-sm text-white">{layer.title}</h4>
              </div>
              <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                {layer.shortDesc}
              </p>
            </button>
          );
        })}
      </div>

      {/* Active Layer Inspector Terminal */}
      <div className="border border-zinc-800 bg-zinc-950 p-5 font-mono text-xs">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-800 text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="text-orange-400 font-bold">{current.num}</span>
            <span className="text-white font-bold">{current.title} Specification Inspector</span>
          </div>
          <span className="text-orange-500/80 font-mono text-[11px]">{current.protocol}</span>
        </div>
        <p className="text-zinc-300 mb-4 leading-relaxed font-sans text-sm">
          {current.fullDesc}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-zinc-900 text-[11px]">
          <div>
            <span className="text-zinc-500 block mb-1">Communication Protocol:</span>
            <span className="text-orange-300 font-bold">{current.protocol}</span>
          </div>
          <div>
            <span className="text-zinc-500 block mb-1">Reference Implementations:</span>
            <span className="text-zinc-300">{current.example}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   2. Interactive JSON Schema Studio Component
   ========================================================================== */
function InteractiveJsonSchemaStudio() {
  const [toolName, setToolName] = useState('evaluate_candidate_resume');
  const [description, setDescription] = useState('Analyzes candidate markdown resume against job requirements and computes ATS scoring metrics.');
  const [paramName, setParamName] = useState('resume_markdown');
  const [copied, setCopied] = useState(false);

  const schema = {
    name: toolName.trim() || 'tool_name',
    description: description.trim() || 'Tool description',
    inputSchema: {
      type: 'object',
      properties: {
        [paramName.trim() || 'input_param']: {
          type: 'string',
          description: `Raw input value for ${paramName.trim() || 'input_param'}`
        }
      },
      required: [paramName.trim() || 'input_param']
    }
  };

  const jsonString = JSON.stringify(schema, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-8 border border-zinc-800 bg-[#0d0d10] p-6 sm:p-8 not-prose shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <FileCode className="w-4 h-4 text-orange-500" />
          <span className="font-mono text-xs uppercase tracking-widest text-orange-400 font-bold">
            Live Tool Schema Studio (JSON Schema 2020-12)
          </span>
        </div>
        <span className="font-mono text-[11px] text-zinc-400">
          RFC 8259 // JSON-RPC 2.0 Compliant
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input Parameters */}
        <div className="lg:col-span-5 space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
              Tool Name
            </label>
            <input
              type="text"
              value={toolName}
              onChange={(e) => setToolName(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 text-white font-mono text-xs focus:border-orange-500 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
              Description (Instructs Model)
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 text-white font-sans text-xs focus:border-orange-500 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
              Parameter Identifier
            </label>
            <input
              type="text"
              value={paramName}
              onChange={(e) => setParamName(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 text-white font-mono text-xs focus:border-orange-500 focus:outline-none transition-colors"
            />
          </div>

          <div className="p-3 border border-orange-500/30 bg-orange-500/5 text-[11px] text-zinc-400 leading-relaxed font-sans">
            <span className="text-orange-400 font-bold">Model Context Protocol Rule:</span> Parameter descriptions directly influence LLM decision confidence when selecting tools during autonomous execution loops.
          </div>
        </div>

        {/* Live Output Code Box */}
        <div className="lg:col-span-7">
          <div className="border border-zinc-800 bg-zinc-950">
            <div className="flex items-center justify-between px-4 py-2 bg-zinc-900 border-b border-zinc-800 text-xs">
              <span className="font-mono text-[11px] text-orange-400 font-bold">
                generated_schema.json
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono cursor-pointer transition-colors border border-zinc-700"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-orange-400" />
                    <span className="text-orange-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Schema</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 text-xs font-mono text-orange-300/90 overflow-x-auto max-h-72 leading-relaxed">
              <code>{jsonString}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   3. Interactive Dynamic Resume Context Simulator
   ========================================================================== */
function InteractiveResumeSimulator() {
  const [selectedScenario, setSelectedScenario] = useState('redis');

  const scenarios = {
    redis: {
      query: "Did the candidate implement rate-limiting in their Redis cluster project?",
      staticResult: "REJECTED BY ATS // Optical parser encountered unindexed table in PDF. Match score 42%.",
      mcpResponse: {
        status: "verified",
        candidate: "alex-secops",
        protocol: "mcp://pandalime.com/p/alex-secops/tools/query_project_source",
        findings: {
          project: "Distributed Token Bucket Rate Limiter",
          algorithm: "Sliding Window Counter over Redis Lua Scripts",
          metrics: "Mitigated 100k req/sec with <2ms P99 latency",
          cve_hardening: "CVE-2023-45142 verified patched",
          github_verified_commit: "commit a9f4c32b (Signed GPG)"
        },
        recruiter_verdict: "100% Verified Technical Competency"
      }
    },
    k8s: {
      query: "Verify candidate's production Kubernetes deployment scale and ingress architecture.",
      staticResult: "UNRESOLVED // Resume contains 'Kubernetes' keyword but lacks verifiable operational metrics.",
      mcpResponse: {
        status: "verified",
        candidate: "alex-secops",
        protocol: "mcp://pandalime.com/p/alex-secops/resources/production_benchmarks",
        findings: {
          infrastructure: "EKS Multi-AZ Cluster (48 worker nodes)",
          mesh: "Istio Service Mesh with mTLS Strict Enforced",
          traffic_volume: "4.2M daily active API requests",
          uptime_sla: "99.992% rolling 12-month SLA"
        },
        recruiter_verdict: "Senior SRE / DevOps Qualified"
      }
    }
  };

  const current = scenarios[selectedScenario];

  return (
    <div className="my-8 border border-zinc-800 bg-[#0d0d10] p-6 sm:p-8 not-prose shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-orange-500" />
          <span className="font-mono text-xs uppercase tracking-widest text-orange-400 font-bold">
            Live Context Simulator: Static PDF ATS vs. Dynamic MCP Candidate Server
          </span>
        </div>
        <span className="font-mono text-[11px] text-zinc-500">
          PandaLime 2026 Paradigm
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <button
          type="button"
          onClick={() => setSelectedScenario('redis')}
          className={`px-3.5 py-1.5 text-xs font-mono cursor-pointer border transition-all ${
            selectedScenario === 'redis'
              ? 'bg-orange-500/10 text-orange-400 border-orange-500 font-bold'
              : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:border-zinc-700'
          }`}
        >
          Scenario 1: Redis Rate Limiter Deep Query
        </button>
        <button
          type="button"
          onClick={() => setSelectedScenario('k8s')}
          className={`px-3.5 py-1.5 text-xs font-mono cursor-pointer border transition-all ${
            selectedScenario === 'k8s'
              ? 'bg-orange-500/10 text-orange-400 border-orange-500 font-bold'
              : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:border-zinc-700'
          }`}
        >
          Scenario 2: Kubernetes Ingress Verification
        </button>
      </div>

      <div className="p-3.5 bg-zinc-950 border border-zinc-800 mb-5 font-mono text-xs text-zinc-300">
        <span className="text-orange-500 font-bold">Recruiter AI Agent Prompt:</span> "{current.query}"
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Legacy ATS PDF Box */}
        <div className="border border-red-900/50 bg-red-950/20 p-4">
          <div className="flex items-center gap-2 text-xs font-mono text-red-400 font-bold mb-3 pb-2 border-b border-red-900/40">
            <XCircle className="w-4 h-4 text-red-500" />
            <span>Legacy Static PDF / ATS (1998 - 2024)</span>
          </div>
          <p className="text-xs text-red-300/80 leading-relaxed font-sans mb-3">
            {current.staticResult}
          </p>
          <div className="text-[10px] font-mono text-red-500 bg-red-950/60 p-2 border border-red-900/50">
            BOTTLENECK: Static text tokens stripped. No proof of execution.
          </div>
        </div>

        {/* Dynamic MCP Server Box */}
        <div className="border border-orange-500/50 bg-orange-950/10 p-4">
          <div className="flex items-center gap-2 text-xs font-mono text-orange-400 font-bold mb-3 pb-2 border-b border-orange-500/30">
            <CheckCircle2 className="w-4 h-4 text-orange-400" />
            <span>Dynamic Candidate MCP Server (2026+)</span>
          </div>
          <pre className="text-[11px] font-mono text-orange-200/90 overflow-x-auto max-h-48 leading-relaxed mb-3">
            <code>{JSON.stringify(current.mcpResponse, null, 2)}</code>
          </pre>
          <div className="text-[10px] font-mono text-orange-400 bg-orange-950/40 p-2 border border-orange-500/30 flex items-center justify-between">
            <span>RESULT: Instant AI Verification</span>
            <Link to="/portfolio-builder" className="underline hover:text-white">Build MCP Portfolio →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   4. Code Block with Dark Styling & Copy Button
   ========================================================================== */
function CodeSnippetBlock({ language, code }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 border border-zinc-800 bg-[#09090b] not-prose shadow-2xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900/90 border-b border-zinc-800 text-xs text-zinc-400">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 bg-orange-500"></span>
          <span className="font-mono uppercase font-bold text-orange-400 text-[11px] tracking-wider">
            {language}
          </span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-mono text-xs transition-colors cursor-pointer border border-zinc-700"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-orange-400" />
              <span className="text-orange-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Code</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-4 sm:p-5 text-xs sm:text-sm font-mono text-orange-200/90 bg-[#09090b] overflow-x-auto leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

/* ==========================================================================
   5. Technical FAQ Accordion Section
   ========================================================================== */
function BlogPostFAQSection({ faqs, parseInlineMarkdown }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="my-10 p-6 sm:p-8 bg-[#0d0d10] text-zinc-100 border border-zinc-800 shadow-2xl">
      <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-orange-400 mb-2">
        <HelpCircle className="w-4 h-4" /> Frequently Asked Questions
      </div>
      <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-6 tracking-tight">
        Model Context Protocol (MCP) Expert FAQs
      </h3>
      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div 
              key={idx} 
              className={`border transition-all ${
                isOpen ? 'border-orange-500/60 bg-zinc-900/90' : 'border-zinc-800 bg-zinc-950/70 hover:border-zinc-700'
              }`}
              itemScope 
              itemType="https://schema.org/Question"
            >
              <button
                type="button"
                onClick={() => toggleFAQ(idx)}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-bold text-sm sm:text-base text-zinc-100 hover:text-orange-400 transition-colors cursor-pointer gap-4"
              >
                <span itemProp="name" className="flex-1">{faq.question}</span>
                <ChevronDown className={`w-4 h-4 text-orange-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              {isOpen && (
                <div 
                  className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-zinc-300 leading-relaxed border-t border-zinc-800/60 pt-3.5 font-sans"
                  itemScope 
                  itemProp="acceptedAnswer" 
                  itemType="https://schema.org/Answer"
                >
                  <div itemProp="text">
                    {parseInlineMarkdown(faq.answer)}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ==========================================================================
   6. Main BlogPost Page Component
   ========================================================================== */
export default function BlogPost() {
  const { slug } = useParams();
  const post = getBlogPostBySlug(slug);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#09090b] text-white flex flex-col justify-between font-sans">
        <Navbar onOpenMobileMenu={() => setMobileMenuOpen(true)} />
        <div className="max-w-md mx-auto text-center py-20 px-4">
          <h1 className="text-2xl font-bold text-white mb-3">Guide Not Found</h1>
          <p className="text-zinc-400 mb-6 text-sm">The requested career or ATS guide could not be located.</p>
          <Link to="/blog" className="px-5 py-2.5 bg-orange-500 text-black font-bold text-sm">
            Back to All Guides
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isDarkTechnical = post.category === 'AI & Workflows' || post.slug.includes('model-context-protocol');

  const relatedPosts = BLOG_POSTS.filter(p => p.slug !== post.slug).slice(0, 3);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.pandalime.com/" },
        { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.pandalime.com/blog" },
        { "@type": "ListItem", "position": 3, "name": post.title, "item": `https://www.pandalime.com/blog/${post.slug}` }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "keywords": post.tags.join(', '),
      "wordCount": post.wordCount,
      "datePublished": post.publishedDate,
      "dateModified": post.publishedDate,
      "mainEntityOfPage": `https://www.pandalime.com/blog/${post.slug}`,
      "author": {
        "@type": "Person",
        "name": post.author.name,
        "jobTitle": post.author.role
      },
      "publisher": {
        "@type": "Organization",
        "name": "PandaLime Career",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.pandalime.com/assets/hero.png"
        }
      }
    }
  ];

  if (post.faqs && post.faqs.length > 0) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": post.faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    });
  }

  // Helper: parse inline markdown
  const parseInlineMarkdown = (text) => {
    if (typeof text !== 'string') return text;
    const regex = /(\[.*?\]\(.*?\)|\*\*.*?\*\*|`.*?`)/g;
    const parts = text.split(regex);

    return parts.map((part, index) => {
      if (!part) return null;

      const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
      if (linkMatch) {
        const [, label, url] = linkMatch;
        const linkClass = isDarkTechnical
          ? "text-orange-400 hover:text-orange-300 font-semibold underline underline-offset-4 decoration-orange-500/60 hover:decoration-orange-400 transition-colors"
          : "text-lime-700 hover:text-lime-800 font-semibold underline underline-offset-2 decoration-lime-500/50 hover:decoration-lime-600 transition-colors";

        if (url.startsWith('/')) {
          return (
            <Link key={index} to={url} className={linkClass}>
              {parseInlineMarkdown(label)}
            </Link>
          );
        }
        return (
          <a key={index} href={url} target="_blank" rel="noopener noreferrer" className={linkClass}>
            {parseInlineMarkdown(label)}
          </a>
        );
      }

      const boldMatch = part.match(/^\*\*(.*?)\*\*$/);
      if (boldMatch) {
        return <strong key={index} className={`font-bold ${isDarkTechnical ? 'text-white' : 'text-gray-950'}`}>{parseInlineMarkdown(boldMatch[1])}</strong>;
      }

      const codeMatch = part.match(/^`(.*?)`$/);
      if (codeMatch) {
        return (
          <code key={index} className={`px-1.5 py-0.5 font-mono text-xs font-semibold border ${
            isDarkTechnical
              ? 'bg-zinc-900 text-orange-300 border-zinc-800'
              : 'bg-gray-100 text-gray-900 border-gray-200 rounded'
          }`}>
            {codeMatch[1]}
          </code>
        );
      }

      return part;
    });
  };

  // Helper: render rich content blocks
  const renderFormattedContent = (contentStr) => {
    return contentStr.split('\n\n').map((block, idx) => {
      const trimmed = block.trim();
      if (!trimmed) return null;

      // Fenced Code Blocks
      if (trimmed.startsWith('```')) {
        const lines = trimmed.split('\n');
        const firstLine = lines[0].replace(/```/, '').trim();
        const lang = firstLine || 'code';
        const codeLines = lines.slice(1);
        if (codeLines.length > 0 && codeLines[codeLines.length - 1].trim().startsWith('```')) {
          codeLines.pop();
        }
        const codeContent = codeLines.join('\n');
        return <CodeSnippetBlock key={idx} language={lang} code={codeContent} />;
      }

      // H2 Headings with ID anchor
      if (trimmed.startsWith('## ')) {
        const match = trimmed.match(/^##\s+(.*?)(?:\s+\{#(.*?)\})?$/);
        const title = match ? match[1] : trimmed.replace('## ', '');
        const id = match && match[2] ? match[2] : '';

        return (
          <React.Fragment key={idx}>
            <div id={id} className={`mt-14 mb-5 pt-6 border-t ${isDarkTechnical ? 'border-zinc-800' : 'border-gray-100'} scroll-mt-24`}>
              {isDarkTechnical && (
                <div className="font-mono text-[11px] text-orange-500 font-bold uppercase tracking-widest mb-1.5">
                  [ SECTION // SPECIFICATION ]
                </div>
              )}
              <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${isDarkTechnical ? 'text-white' : 'text-gray-950'}`}>
                {parseInlineMarkdown(title)}
              </h2>
            </div>

            {/* Injected Interactive Widgets on Target Headings */}
            {isDarkTechnical && id === 'mcp-architecture' && (
              <InteractiveArchitectureVisualizer />
            )}
            {isDarkTechnical && id === 'tool-schema-workshop' && (
              <InteractiveJsonSchemaStudio />
            )}
            {isDarkTechnical && id === 'resume-of-the-future' && (
              <InteractiveResumeSimulator />
            )}
          </React.Fragment>
        );
      }

      // H3 Headings
      if (trimmed.startsWith('### ')) {
        return (
          <h3 key={idx} className={`text-lg sm:text-xl font-bold mt-8 mb-3 ${isDarkTechnical ? 'text-zinc-100 font-mono' : 'text-gray-900'}`}>
            {isDarkTechnical && <span className="text-orange-500 mr-2">›</span>}
            {parseInlineMarkdown(trimmed.replace('### ', ''))}
          </h3>
        );
      }

      // Blockquotes / Key Takeaway Boxes
      if (trimmed.startsWith('> ')) {
        const cleanText = trimmed.replace(/^>\s+/gm, '');
        return (
          <div key={idx} className={`my-6 p-5 border-l-4 text-sm leading-relaxed shadow-lg ${
            isDarkTechnical
              ? 'bg-[#121215] border-orange-500 text-zinc-300 font-sans'
              : 'bg-lime-50/80 border-lime-500 rounded-r-2xl text-gray-800'
          }`}>
            <div className="flex items-center gap-2 mb-1.5">
              <Zap className={`w-4 h-4 ${isDarkTechnical ? 'text-orange-400' : 'text-lime-600'}`} />
              <span className={`font-mono text-xs uppercase font-bold tracking-wider ${isDarkTechnical ? 'text-orange-400' : 'text-lime-900'}`}>
                Key Architecture Takeaway
              </span>
            </div>
            {parseInlineMarkdown(cleanText)}
          </div>
        );
      }

      // Tables
      if (trimmed.startsWith('|')) {
        const rows = trimmed.split('\n').filter(r => !r.includes('---'));
        if (rows.length === 0) return null;
        const headers = rows[0].split('|').filter(c => c.trim() !== '').map(c => c.trim());
        const dataRows = rows.slice(1).map(r => r.split('|').filter(c => c.trim() !== '').map(c => c.trim()));

        return (
          <div key={idx} className={`my-6 overflow-x-auto border shadow-xl ${isDarkTechnical ? 'border-zinc-800 bg-[#0c0c0e]' : 'border-gray-200 rounded-xl'}`}>
            <table className="min-w-full text-xs sm:text-sm text-left divide-y divide-zinc-800">
              <thead className={isDarkTechnical ? "bg-zinc-900 text-orange-400 font-mono" : "bg-gray-900 text-white font-bold"}>
                <tr>
                  {headers.map((h, hIdx) => (
                    <th key={hIdx} className="px-4 py-3.5 font-bold uppercase tracking-wider text-[11px]">{parseInlineMarkdown(h)}</th>
                  ))}
                </tr>
              </thead>
              <tbody className={`divide-y ${isDarkTechnical ? 'divide-zinc-800/60 bg-[#0c0c0e]' : 'divide-gray-100 bg-white'}`}>
                {dataRows.map((row, rIdx) => (
                  <tr key={rIdx} className={isDarkTechnical ? (rIdx % 2 === 0 ? 'bg-[#0c0c0e]' : 'bg-zinc-950') : (rIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50/70')}>
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className={`px-4 py-3 ${isDarkTechnical ? 'text-zinc-300 font-sans' : 'text-gray-700 font-medium'}`}>
                        {parseInlineMarkdown(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }

      // Bullet Lists
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        const items = trimmed.split('\n').map(i => i.replace(/^[-*]\s+/, '').trim());
        return (
          <ul key={idx} className={`my-4 space-y-2.5 pl-5 list-disc text-sm sm:text-base leading-relaxed ${isDarkTechnical ? 'text-zinc-300 marker:text-orange-500' : 'text-gray-700'}`}>
            {items.map((item, iIdx) => (
              <li key={iIdx}>{parseInlineMarkdown(item)}</li>
            ))}
          </ul>
        );
      }

      // Checklists
      if (trimmed.startsWith('- [ ]')) {
        const items = trimmed.split('\n').map(i => i.replace(/^- \[[ x]\]\s+/, '').trim());
        return (
          <div key={idx} className={`my-5 p-5 border shadow-xl space-y-2.5 ${isDarkTechnical ? 'bg-[#0d0d10] border-zinc-800' : 'bg-white border-gray-200 rounded-2xl'}`}>
            {items.map((item, iIdx) => (
              <div key={iIdx} className={`flex items-start gap-2.5 text-xs sm:text-sm ${isDarkTechnical ? 'text-zinc-300 font-sans' : 'text-gray-800'}`}>
                <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${isDarkTechnical ? 'text-orange-400' : 'text-lime-600'}`} />
                <span>{parseInlineMarkdown(item)}</span>
              </div>
            ))}
          </div>
        );
      }

      // Standard Paragraph
      return (
        <p key={idx} className={`my-4 text-sm sm:text-base leading-relaxed font-sans ${isDarkTechnical ? 'text-zinc-300' : 'text-gray-700'}`}>
          {parseInlineMarkdown(trimmed)}
        </p>
      );
    });
  };

  return (
    <div className={`min-h-screen font-sans flex flex-col justify-between ${isDarkTechnical ? 'bg-[#09090b] text-zinc-100' : 'bg-gray-50 text-gray-900'}`}>
      <SEOHead 
        title={`${post.title} | PandaLime`}
        description={post.excerpt}
        canonical={`/blog/${post.slug}`}
        jsonLd={jsonLd}
      />

      {/* Reading Progress Indicator */}
      {isDarkTechnical && (
        <div 
          className="fixed top-0 left-0 h-1 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-400 z-50 transition-all duration-100"
          style={{ width: `${scrollProgress}%` }}
        />
      )}

      <Navbar onOpenMobileMenu={() => setMobileMenuOpen(true)} />
      <MobileDrawer isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 font-mono text-xs text-zinc-500 mb-6" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-orange-400 transition-colors">Home</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-orange-400 transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-zinc-300 truncate max-w-xs">{post.title}</span>
          </nav>

          {/* Article Header Card */}
          <header className={`p-6 sm:p-10 border shadow-2xl space-y-6 ${
            isDarkTechnical 
              ? 'bg-[#0d0d10] border-zinc-800 relative overflow-hidden' 
              : 'bg-white border-gray-200 rounded-2xl'
          }`}>
            {isDarkTechnical && (
              <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 blur-3xl pointer-events-none"></div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-3 relative z-10">
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 font-mono font-bold text-xs uppercase tracking-wider border ${
                  isDarkTechnical 
                    ? 'bg-orange-500/10 text-orange-400 border-orange-500/30' 
                    : 'bg-lime-100 text-lime-900 rounded-lg'
                }`}>
                  {post.category}
                </span>
                {isDarkTechnical && (
                  <span className="font-mono text-[10px] text-zinc-500 border border-zinc-800 px-2 py-0.5 hidden sm:inline-block">
                    OPEN STANDARD SPEC // 2026
                  </span>
                )}
              </div>

              <button
                onClick={handleShare}
                className={`px-3 py-1.5 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer border ${
                  isDarkTechnical
                    ? 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border-zinc-700'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg'
                }`}
                title="Copy share link"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copied ? 'Link Copied!' : 'Share Guide'}</span>
              </button>
            </div>

            <h1 className={`text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight relative z-10 ${
              isDarkTechnical ? 'text-white' : 'text-gray-950'
            }`}>
              {post.title}
            </h1>

            <p className={`text-base sm:text-lg leading-relaxed relative z-10 ${
              isDarkTechnical ? 'text-zinc-300 font-sans' : 'text-gray-600'
            }`}>
              {post.excerpt}
            </p>

            {/* Author and Metadata Bar */}
            <div className={`flex flex-wrap items-center justify-between gap-4 pt-6 border-t text-xs sm:text-sm relative z-10 ${
              isDarkTechnical ? 'border-zinc-800 text-zinc-400 font-mono' : 'border-gray-100 text-gray-500'
            }`}>
              <div className="flex items-center gap-3">
                <img 
                  src={post.author.avatar} 
                  alt={post.author.name} 
                  className={`w-10 h-10 object-cover border ${
                    isDarkTechnical ? 'border-orange-500/40' : 'rounded-full border-gray-200'
                  }`}
                />
                <div>
                  <p className={`font-bold ${isDarkTechnical ? 'text-white' : 'text-gray-900'}`}>{post.author.name}</p>
                  <p className="text-zinc-500 text-xs font-mono">{post.author.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                  <span>{post.publishedDate}</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className={`w-3.5 h-3.5 ${isDarkTechnical ? 'text-orange-400' : 'text-lime-600'}`} />
                  <span>{post.readTime}</span>
                </span>
                <span>•</span>
                <span>{post.wordCount} words</span>
              </div>
            </div>
          </header>

          {/* Table of Contents Box */}
          {post.tableOfContents && post.tableOfContents.length > 0 && (
            <div className={`my-8 p-6 border shadow-xl ${
              isDarkTechnical 
                ? 'bg-[#0d0d10] border-zinc-800 text-zinc-100' 
                : 'bg-gray-900 text-gray-100 rounded-2xl border-gray-800'
            }`}>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-orange-400 mb-3 uppercase tracking-wider">
                <ListTree className="w-4 h-4" /> Table of Contents
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm font-sans">
                {post.tableOfContents.map(toc => (
                  <li key={toc.id}>
                    <a 
                      href={`#${toc.id}`} 
                      className={`transition-colors flex items-center gap-1.5 p-1 ${
                        isDarkTechnical 
                          ? 'text-zinc-400 hover:text-orange-400 hover:bg-zinc-900/50' 
                          : 'text-gray-300 hover:text-lime-400'
                      }`}
                    >
                      <span className="text-orange-500 font-mono">›</span>
                      <span className="truncate">{toc.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Article Main Body */}
          <article className={`p-6 sm:p-10 border shadow-2xl my-8 prose-sm sm:prose max-w-none ${
            isDarkTechnical 
              ? 'bg-[#0d0d10] border-zinc-800 text-zinc-200' 
              : 'bg-white border-gray-200 rounded-2xl text-gray-800'
          }`}>
            {renderFormattedContent(post.content)}
          </article>

          {/* Dedicated Technical FAQ Section */}
          {post.faqs && post.faqs.length > 0 && (
            <BlogPostFAQSection faqs={post.faqs} parseInlineMarkdown={parseInlineMarkdown} />
          )}

          {/* In-Article Action CTA Card */}
          <div className={`border shadow-2xl my-10 p-8 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden ${
            isDarkTechnical
              ? 'bg-[#0d0d10] border-orange-500/40 text-white'
              : 'bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950 text-white rounded-2xl border-gray-800'
          }`}>
            {isDarkTechnical && (
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 blur-3xl pointer-events-none"></div>
            )}
            <div className="space-y-2 max-w-md relative z-10">
              <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-mono font-bold border ${
                isDarkTechnical ? 'bg-orange-500/10 text-orange-400 border-orange-500/40' : 'rounded bg-lime-500/20 text-lime-400'
              }`}>
                <Sparkles className="w-3.5 h-3.5" /> Instant ATS Calibration
              </div>
              <h3 className="text-xl font-black text-white">Test Your Resume Against Modern ATS Bots</h3>
              <p className="text-xs sm:text-sm text-zinc-400">
                Upload your PDF or markdown resume. Get instant semantic match scoring, missing keyword gaps, and recruiter critique in under 15 seconds.
              </p>
            </div>

            <Link
              to="/dashboard"
              onMouseEnter={() => prefetchRoute('/dashboard')}
              className={`px-6 py-3.5 font-bold text-xs sm:text-sm transition-all shrink-0 flex items-center gap-2 cursor-pointer relative z-10 ${
                isDarkTechnical
                  ? 'bg-orange-500 hover:bg-orange-400 text-black font-mono shadow-[0_0_20px_rgba(249,115,22,0.3)]'
                  : 'bg-lime-500 hover:bg-lime-400 text-gray-950 font-black rounded-xl shadow-lg'
              }`}
            >
              <ScanLine className="w-4 h-4" />
              <span>Launch Free ATS Scanner</span>
            </Link>
          </div>

          {/* Author Bio Box */}
          <div className={`p-6 sm:p-8 border shadow-xl my-8 flex flex-col sm:flex-row items-start sm:items-center gap-5 ${
            isDarkTechnical 
              ? 'bg-[#0d0d10] border-zinc-800 text-zinc-300' 
              : 'bg-white border-gray-200 rounded-2xl shadow-xs'
          }`}>
            <img 
              src={post.author.avatar} 
              alt={post.author.name} 
              className={`w-16 h-16 object-cover shrink-0 ${
                isDarkTechnical ? 'border border-orange-500/40' : 'rounded-2xl border-2 border-lime-500/40'
              }`} 
            />
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <h4 className="font-extrabold text-white text-base">{post.author.name}</h4>
                <span className={`text-[10px] font-mono px-2 py-0.5 font-bold border ${
                  isDarkTechnical ? 'bg-zinc-900 text-orange-400 border-zinc-800' : 'bg-gray-100 text-gray-700 rounded-full'
                }`}>
                  {post.author.role}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                The PandaLime AI Research & ATS Calibration Lab reverse-engineers enterprise recruitment workflows and explores next-generation agentic protocols (Model Context Protocol, LangChain, semantic AST parsers) to keep engineers ahead of automated hiring filters.
              </p>
            </div>
          </div>

          {/* Related Articles Grid */}
          <div className="my-12 space-y-6">
            <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-orange-500" /> Related Research Guides
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {relatedPosts.map(rel => (
                <Link
                  key={rel.slug}
                  to={`/blog/${rel.slug}`}
                  onMouseEnter={() => prefetchRoute(`/blog/${rel.slug}`)}
                  className={`p-5 border transition-all group flex flex-col justify-between shadow-xl ${
                    isDarkTechnical
                      ? 'bg-[#0d0d10] border-zinc-800 hover:border-orange-500/60'
                      : 'bg-white border-gray-200 hover:border-lime-500 rounded-2xl'
                  }`}
                >
                  <div className="space-y-2">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 border ${
                      isDarkTechnical
                        ? 'text-orange-400 bg-orange-500/10 border-orange-500/30'
                        : 'text-lime-800 bg-lime-50 rounded border-lime-200/60'
                    }`}>
                      {rel.category}
                    </span>
                    <h4 className={`font-bold text-xs sm:text-sm line-clamp-2 ${
                      isDarkTechnical ? 'text-zinc-200 group-hover:text-orange-400' : 'text-gray-900 group-hover:text-lime-700'
                    }`}>
                      {rel.title}
                    </h4>
                  </div>
                  <div className={`pt-3 mt-3 border-t text-[11px] font-mono font-bold flex items-center gap-1 ${
                    isDarkTechnical ? 'border-zinc-900 text-orange-400' : 'border-gray-100 text-lime-700'
                  }`}>
                    <span>Read Protocol Guide</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
