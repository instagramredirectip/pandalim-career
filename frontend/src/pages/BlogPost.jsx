import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Clock, 
  Calendar, 
  Share2, 
  ScanLine, 
  CheckCircle2, 
  BookOpen, 
  ListTree, 
  Zap, 
  Copy, 
  Check, 
  HelpCircle, 
  ChevronDown, 
  Terminal, 
  Cpu, 
  Database, 
  Network, 
  Sparkles, 
  XCircle, 
  FileCode,
  ArrowRight
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MobileDrawer from '../components/MobileDrawer';
import { getBlogPostBySlug, BLOG_POSTS } from '../data/blogPosts';
import { prefetchRoute } from '../utils/prefetch';

/* ==========================================================================
   1. Interactive Architecture Visualizer Component (StitchMCP Kinesis Tectonic)
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
    <div className="my-8 border border-[#2E323D] bg-[#181A20] p-6 sm:p-8 not-prose shadow-2xl relative overflow-hidden rounded-[2px]">
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#ff5722]/5 blur-3xl pointer-events-none"></div>

      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-[#2E323D]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-[#ff5722] animate-ping inline-block"></span>
          <span className="font-mono text-xs uppercase tracking-widest text-[#ff5722] font-bold">
            Interactive Topology Explorer // Specification
          </span>
        </div>
        <span className="font-mono text-[10px] text-[#9ca3af] bg-[#121316] px-2.5 py-1 border border-[#2E323D] uppercase tracking-wider">
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
              className={`p-4 text-left transition-all duration-150 cursor-pointer border relative rounded-[2px] ${
                isActive 
                  ? 'border-[#ff5722] bg-[#22252D] shadow-[0_0_20px_rgba(255,87,34,0.15)]' 
                  : 'border-[#2E323D] bg-[#121316] hover:border-[#ff5722]/60'
              }`}
            >
              {isActive && (
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#ff5722]"></div>
              )}
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] text-[#ff5722] font-bold">{layer.num} //</span>
                <span className={`text-[9px] font-mono px-1.5 py-0.5 border uppercase tracking-wider ${
                  isActive ? 'border-[#ff5722]/40 text-[#ffb5a0] bg-[#ff5722]/10' : 'border-[#2E323D] text-[#9ca3af]'
                }`}>
                  {layer.tag}
                </span>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#ff5722]' : 'text-[#9ca3af]'}`} />
                <h4 className="font-bold text-sm text-[#f3f4f6]">{layer.title}</h4>
              </div>
              <p className="text-xs text-[#d1d5db] line-clamp-2 leading-relaxed">
                {layer.shortDesc}
              </p>
            </button>
          );
        })}
      </div>

      {/* Active Layer Inspector Terminal */}
      <div className="border border-[#2E323D] bg-[#0d0e11] p-5 font-mono text-xs rounded-[2px]">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#2E323D] text-[#9ca3af]">
          <div className="flex items-center gap-2">
            <span className="text-[#ff5722] font-bold">{current.num}</span>
            <span className="text-[#f3f4f6] font-bold">{current.title} Specification Inspector</span>
          </div>
          <span className="text-[#ffb5a0] font-mono text-[10px] tracking-wider uppercase">{current.protocol}</span>
        </div>
        <p className="text-[#d1d5db] mb-4 leading-relaxed font-sans text-sm">
          {current.fullDesc}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[#1b1b1f] text-[11px]">
          <div>
            <span className="text-[#9ca3af] block mb-1 uppercase tracking-wider text-[9px]">Communication Protocol:</span>
            <span className="text-[#ffb5a0] font-bold">{current.protocol}</span>
          </div>
          <div>
            <span className="text-[#9ca3af] block mb-1 uppercase tracking-wider text-[9px]">Reference Implementation:</span>
            <span className="text-[#f3f4f6]">{current.example}</span>
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
    <div className="my-8 border border-[#2E323D] bg-[#181A20] p-6 sm:p-8 not-prose shadow-2xl rounded-[2px]">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-[#2E323D]">
        <div className="flex items-center gap-2">
          <FileCode className="w-4 h-4 text-[#ff5722]" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#ff5722] font-bold">
            Live Tool Schema Studio (JSON Schema 2020-12)
          </span>
        </div>
        <span className="font-mono text-[10px] text-[#9ca3af] uppercase tracking-wider">
          RFC 8259 // JSON-RPC 2.0 Compliant
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input Parameters */}
        <div className="lg:col-span-5 space-y-4">
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-[#9ca3af] mb-1.5">
              Tool Name
            </label>
            <input
              type="text"
              value={toolName}
              onChange={(e) => setToolName(e.target.value)}
              className="w-full px-3 py-2 bg-[#121316] border border-[#2E323D] text-[#f3f4f6] font-mono text-xs focus:border-[#ff5722] focus:outline-none transition-colors rounded-[2px]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-[#9ca3af] mb-1.5">
              Description (Model Prompt Instruction)
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 bg-[#121316] border border-[#2E323D] text-[#f3f4f6] font-sans text-xs focus:border-[#ff5722] focus:outline-none transition-colors rounded-[2px]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-[#9ca3af] mb-1.5">
              Parameter Key
            </label>
            <input
              type="text"
              value={paramName}
              onChange={(e) => setParamName(e.target.value)}
              className="w-full px-3 py-2 bg-[#121316] border border-[#2E323D] text-[#f3f4f6] font-mono text-xs focus:border-[#ff5722] focus:outline-none transition-colors rounded-[2px]"
            />
          </div>

          <div className="p-3 border border-[#ff5722]/30 bg-[#ff5722]/5 text-[11px] text-[#d1d5db] leading-relaxed font-sans rounded-[2px]">
            <span className="text-[#ff5722] font-bold">MCP Specification Note:</span> Parameter descriptions directly determine model tool selection confidence inside autonomous reasoning trajectories.
          </div>
        </div>

        {/* Live Output Code Box */}
        <div className="lg:col-span-7">
          <div className="border border-[#2E323D] bg-[#0d0e11] rounded-[2px]">
            <div className="flex items-center justify-between px-4 py-2 bg-[#181A20] border-b border-[#2E323D] text-xs">
              <span className="font-mono text-[11px] text-[#ffb5a0] font-bold">
                generated_schema.json
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-2.5 py-1 bg-[#22252D] hover:bg-[#ff5722] hover:text-[#121316] text-[#f3f4f6] text-xs font-mono cursor-pointer transition-colors border border-[#2E323D] rounded-[2px]"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#ff5722]" />
                    <span className="text-[#ff5722]">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Schema</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 text-xs font-mono text-[#ffb5a0]/90 overflow-x-auto max-h-72 leading-relaxed">
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
    <div className="my-8 border border-[#2E323D] bg-[#181A20] p-6 sm:p-8 not-prose shadow-2xl rounded-[2px]">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-[#2E323D]">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#ff5722]" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#ff5722] font-bold">
            Live Context Simulator: Static PDF ATS vs. Dynamic MCP Candidate Server
          </span>
        </div>
        <span className="font-mono text-[10px] text-[#9ca3af] uppercase">
          PandaLime 2026 Paradigm
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <button
          type="button"
          onClick={() => setSelectedScenario('redis')}
          className={`px-3.5 py-1.5 text-xs font-mono cursor-pointer border transition-all rounded-[2px] ${
            selectedScenario === 'redis'
              ? 'bg-[#ff5722]/10 text-[#ff5722] border-[#ff5722] font-bold'
              : 'bg-[#121316] text-[#9ca3af] border-[#2E323D] hover:border-[#ff5722]/60'
          }`}
        >
          Scenario 1: Redis Rate Limiter Deep Query
        </button>
        <button
          type="button"
          onClick={() => setSelectedScenario('k8s')}
          className={`px-3.5 py-1.5 text-xs font-mono cursor-pointer border transition-all rounded-[2px] ${
            selectedScenario === 'k8s'
              ? 'bg-[#ff5722]/10 text-[#ff5722] border-[#ff5722] font-bold'
              : 'bg-[#121316] text-[#9ca3af] border-[#2E323D] hover:border-[#ff5722]/60'
          }`}
        >
          Scenario 2: Kubernetes Ingress Verification
        </button>
      </div>

      <div className="p-3.5 bg-[#121316] border border-[#2E323D] mb-5 font-mono text-xs text-[#d1d5db] rounded-[2px]">
        <span className="text-[#ff5722] font-bold">Recruiter AI Agent Query:</span> "{current.query}"
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Legacy ATS PDF Box */}
        <div className="border border-red-900/50 bg-red-950/20 p-4 rounded-[2px]">
          <div className="flex items-center gap-2 text-xs font-mono text-red-400 font-bold mb-3 pb-2 border-b border-red-900/40">
            <XCircle className="w-4 h-4 text-red-500" />
            <span>Legacy Static PDF / ATS (1998 - 2024)</span>
          </div>
          <p className="text-xs text-red-300/80 leading-relaxed font-sans mb-3">
            {current.staticResult}
          </p>
          <div className="text-[10px] font-mono text-red-400 bg-red-950/60 p-2 border border-red-900/50">
            BOTTLENECK: Static text tokens stripped. No proof of execution.
          </div>
        </div>

        {/* Dynamic MCP Server Box */}
        <div className="border border-[#ff5722]/50 bg-[#ff5722]/5 p-4 rounded-[2px]">
          <div className="flex items-center gap-2 text-xs font-mono text-[#ffb5a0] font-bold mb-3 pb-2 border-b border-[#ff5722]/30">
            <CheckCircle2 className="w-4 h-4 text-[#ff5722]" />
            <span>Dynamic Candidate MCP Server (2026+)</span>
          </div>
          <pre className="text-[11px] font-mono text-[#ffb5a0]/90 overflow-x-auto max-h-48 leading-relaxed mb-3">
            <code>{JSON.stringify(current.mcpResponse, null, 2)}</code>
          </pre>
          <div className="text-[10px] font-mono text-[#ff5722] bg-[#121316] p-2 border border-[#ff5722]/30 flex items-center justify-between">
            <span>RESULT: Instant AI Verification</span>
            <Link to="/portfolio-builder" className="underline hover:text-white">Build MCP Portfolio →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   4. Code Block with Dark StitchMCP Styling & Copy Button
   ========================================================================== */
function CodeSnippetBlock({ language, code }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 border border-[#2E323D] bg-[#0d0e11] not-prose shadow-2xl overflow-hidden rounded-[2px]">
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#181A20] border-b border-[#2E323D] text-xs text-[#9ca3af]">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 bg-[#ff5722]"></span>
          <span className="font-mono uppercase font-bold text-[#ffb5a0] text-[11px] tracking-wider">
            {language}
          </span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 bg-[#22252D] hover:bg-[#ff5722] hover:text-[#121316] text-[#f3f4f6] font-mono text-xs transition-colors cursor-pointer border border-[#2E323D] rounded-[2px]"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-[#ff5722]" />
              <span className="text-[#ff5722]">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Code</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-4 sm:p-5 text-xs sm:text-sm font-mono text-[#ffb5a0]/90 bg-[#0d0e11] overflow-x-auto leading-relaxed">
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
    <section className="my-10 p-6 sm:p-8 bg-[#181A20] text-[#f3f4f6] border border-[#2E323D] shadow-2xl rounded-[2px]">
      <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#ff5722] mb-2">
        <HelpCircle className="w-4 h-4" /> Frequently Asked Questions
      </div>
      <h3 className="text-xl sm:text-2xl font-extrabold text-[#f3f4f6] mb-6 tracking-tight">
        Model Context Protocol (MCP) Expert FAQs
      </h3>
      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div 
              key={idx} 
              className={`border transition-all rounded-[2px] ${
                isOpen ? 'border-[#ff5722] bg-[#22252D]' : 'border-[#2E323D] bg-[#121316] hover:border-[#ff5722]/60'
              }`}
              itemScope 
              itemType="https://schema.org/Question"
            >
              <button
                type="button"
                onClick={() => toggleFAQ(idx)}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-bold text-sm sm:text-base text-[#f3f4f6] hover:text-[#ffb5a0] transition-colors cursor-pointer gap-4"
              >
                <span itemProp="name" className="flex-1">{faq.question}</span>
                <ChevronDown className={`w-4 h-4 text-[#ff5722] shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              {isOpen && (
                <div 
                  className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-[#d1d5db] leading-relaxed border-t border-[#2E323D] pt-3.5 font-sans"
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
      <div className="min-h-screen bg-[#121316] text-[#f3f4f6] flex flex-col justify-between font-sans">
        <Navbar onOpenMobileMenu={() => setMobileMenuOpen(true)} />
        <div className="max-w-md mx-auto text-center py-20 px-4">
          <h1 className="text-2xl font-bold text-[#f3f4f6] mb-3">Guide Not Found</h1>
          <p className="text-[#9ca3af] mb-6 text-sm">The requested career or ATS guide could not be located.</p>
          <Link to="/blog" className="px-5 py-2.5 bg-[#ff5722] text-[#121316] font-bold text-sm rounded-[2px]">
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
          ? "text-[#ff5722] hover:text-[#ff6e40] font-semibold underline underline-offset-4 decoration-[#ff5722]/60 hover:decoration-[#ff6e40] transition-colors"
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
        return <strong key={index} className={`font-bold ${isDarkTechnical ? 'text-[#f3f4f6]' : 'text-gray-950'}`}>{parseInlineMarkdown(boldMatch[1])}</strong>;
      }

      const codeMatch = part.match(/^`(.*?)`$/);
      if (codeMatch) {
        return (
          <code key={index} className={`px-1.5 py-0.5 font-mono text-xs font-semibold border ${
            isDarkTechnical
              ? 'bg-[#121316] text-[#ffb5a0] border-[#2E323D]'
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
            <div id={id} className={`mt-14 mb-5 pt-6 border-t ${isDarkTechnical ? 'border-[#2E323D]' : 'border-gray-100'} scroll-mt-24`}>
              {isDarkTechnical && (
                <div className="font-mono text-[11px] text-[#ff5722] font-bold uppercase tracking-widest mb-1.5">
                  [ SECTION // ARCHITECTURAL SPECIFICATION ]
                </div>
              )}
              <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${isDarkTechnical ? 'text-[#f3f4f6]' : 'text-gray-950'}`}>
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
          <h3 key={idx} className={`text-lg sm:text-xl font-bold mt-8 mb-3 ${isDarkTechnical ? 'text-[#f3f4f6] font-mono' : 'text-gray-900'}`}>
            {isDarkTechnical && <span className="text-[#ff5722] mr-2">›</span>}
            {parseInlineMarkdown(trimmed.replace('### ', ''))}
          </h3>
        );
      }

      // Blockquotes / Key Takeaway Boxes
      if (trimmed.startsWith('> ')) {
        const cleanText = trimmed.replace(/^>\s+/gm, '');
        return (
          <div key={idx} className={`my-6 p-5 border-l-4 text-sm leading-relaxed shadow-lg rounded-[2px] ${
            isDarkTechnical
              ? 'bg-[#181A20] border-[#ff5722] text-[#d1d5db] font-sans'
              : 'bg-lime-50/80 border-lime-500 rounded-r-2xl text-gray-800'
          }`}>
            <div className="flex items-center gap-2 mb-1.5">
              <Zap className={`w-4 h-4 ${isDarkTechnical ? 'text-[#ff5722]' : 'text-lime-600'}`} />
              <span className={`font-mono text-xs uppercase font-bold tracking-wider ${isDarkTechnical ? 'text-[#ff5722]' : 'text-lime-900'}`}>
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
          <div key={idx} className={`my-6 overflow-x-auto border shadow-xl rounded-[2px] ${isDarkTechnical ? 'border-[#2E323D] bg-[#0d0e11]' : 'border-gray-200 rounded-xl'}`}>
            <table className="min-w-full text-xs sm:text-sm text-left divide-y divide-[#2E323D]">
              <thead className={isDarkTechnical ? "bg-[#181A20] text-[#ffb5a0] font-mono" : "bg-gray-900 text-white font-bold"}>
                <tr>
                  {headers.map((h, hIdx) => (
                    <th key={hIdx} className="px-4 py-3.5 font-bold uppercase tracking-wider text-[11px]">{parseInlineMarkdown(h)}</th>
                  ))}
                </tr>
              </thead>
              <tbody className={`divide-y ${isDarkTechnical ? 'divide-[#2E323D]/60 bg-[#0d0e11]' : 'divide-gray-100 bg-white'}`}>
                {dataRows.map((row, rIdx) => (
                  <tr key={rIdx} className={isDarkTechnical ? (rIdx % 2 === 0 ? 'bg-[#0d0e11]' : 'bg-[#121316]') : (rIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50/70')}>
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className={`px-4 py-3 ${isDarkTechnical ? 'text-[#d1d5db] font-sans' : 'text-gray-700 font-medium'}`}>
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
          <ul key={idx} className={`my-4 space-y-2.5 pl-5 list-disc text-sm sm:text-base leading-relaxed ${isDarkTechnical ? 'text-[#d1d5db] marker:text-[#ff5722]' : 'text-gray-700'}`}>
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
          <div key={idx} className={`my-5 p-5 border shadow-xl space-y-2.5 rounded-[2px] ${isDarkTechnical ? 'bg-[#181A20] border-[#2E323D]' : 'bg-white border-gray-200 rounded-2xl'}`}>
            {items.map((item, iIdx) => (
              <div key={iIdx} className={`flex items-start gap-2.5 text-xs sm:text-sm ${isDarkTechnical ? 'text-[#d1d5db] font-sans' : 'text-gray-800'}`}>
                <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${isDarkTechnical ? 'text-[#ff5722]' : 'text-lime-600'}`} />
                <span>{parseInlineMarkdown(item)}</span>
              </div>
            ))}
          </div>
        );
      }

      // Standard Paragraph
      return (
        <p key={idx} className={`my-4 text-sm sm:text-base leading-relaxed font-sans ${isDarkTechnical ? 'text-[#d1d5db]' : 'text-gray-700'}`}>
          {parseInlineMarkdown(trimmed)}
        </p>
      );
    });
  };

  return (
    <div className={`min-h-screen font-sans flex flex-col justify-between ${isDarkTechnical ? 'bg-[#121316] text-[#f3f4f6]' : 'bg-gray-50 text-gray-900'}`}>
      <SEOHead 
        title={`${post.title} | PandaLime`}
        description={post.excerpt}
        canonical={`/blog/${post.slug}`}
        jsonLd={jsonLd}
      />

      {/* Reading Progress Indicator */}
      {isDarkTechnical && (
        <div 
          className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-[#ff5722] via-[#ff6e40] to-[#ffb5a0] z-50 transition-all duration-100"
          style={{ width: `${scrollProgress}%` }}
        />
      )}

      <Navbar onOpenMobileMenu={() => setMobileMenuOpen(true)} />
      <MobileDrawer isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 font-mono text-xs text-[#9ca3af] mb-6" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-[#ff5722] transition-colors">Home</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-[#ff5722] transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-[#f3f4f6] truncate max-w-xs">{post.title}</span>
          </nav>

          {/* Article Header Card */}
          <header className={`p-6 sm:p-10 border shadow-2xl space-y-6 rounded-[2px] ${
            isDarkTechnical 
              ? 'bg-[#181A20] border-[#2E323D] relative overflow-hidden' 
              : 'bg-white border-gray-200 rounded-2xl'
          }`}>
            {isDarkTechnical && (
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff5722]/5 blur-3xl pointer-events-none"></div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-3 relative z-10">
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 font-mono font-bold text-xs uppercase tracking-wider border rounded-[2px] ${
                  isDarkTechnical 
                    ? 'bg-[#ff5722]/10 text-[#ff5722] border-[#ff5722]/30' 
                    : 'bg-lime-100 text-lime-900 rounded-lg'
                }`}>
                  {post.category}
                </span>
                {isDarkTechnical && (
                  <span className="font-mono text-[10px] text-[#9ca3af] border border-[#2E323D] px-2 py-0.5 hidden sm:inline-block rounded-[2px]">
                    DISPATCH NO. 048 // MCP SPEC 2026
                  </span>
                )}
              </div>

              <button
                onClick={handleShare}
                className={`px-3 py-1.5 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer border rounded-[2px] ${
                  isDarkTechnical
                    ? 'bg-[#22252D] hover:bg-[#ff5722] hover:text-[#121316] text-[#f3f4f6] border-[#2E323D]'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg'
                }`}
                title="Copy share link"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copied ? 'Link Copied!' : 'Share Guide'}</span>
              </button>
            </div>

            <h1 className={`text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight relative z-10 ${
              isDarkTechnical ? 'text-[#f3f4f6]' : 'text-gray-950'
            }`}>
              {post.title}
            </h1>

            <p className={`text-base sm:text-lg leading-relaxed relative z-10 ${
              isDarkTechnical ? 'text-[#d1d5db] font-sans' : 'text-gray-600'
            }`}>
              {post.excerpt}
            </p>

            {/* Author and Metadata Bar */}
            <div className={`flex flex-wrap items-center justify-between gap-4 pt-6 border-t text-xs sm:text-sm relative z-10 ${
              isDarkTechnical ? 'border-[#2E323D] text-[#9ca3af] font-mono' : 'border-gray-100 text-gray-500'
            }`}>
              <div className="flex items-center gap-3">
                <img 
                  src={post.author.avatar} 
                  alt={post.author.name} 
                  className={`w-10 h-10 object-cover border rounded-[2px] ${
                    isDarkTechnical ? 'border-[#ff5722]/50' : 'rounded-full border-gray-200'
                  }`}
                />
                <div>
                  <p className={`font-bold ${isDarkTechnical ? 'text-[#f3f4f6]' : 'text-gray-900'}`}>{post.author.name}</p>
                  <p className="text-[#9ca3af] text-xs font-mono">{post.author.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#9ca3af]" />
                  <span>{post.publishedDate}</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className={`w-3.5 h-3.5 ${isDarkTechnical ? 'text-[#ff5722]' : 'text-lime-600'}`} />
                  <span>{post.readTime}</span>
                </span>
                <span>•</span>
                <span>{post.wordCount} words</span>
              </div>
            </div>
          </header>

          {/* Table of Contents Box */}
          {post.tableOfContents && post.tableOfContents.length > 0 && (
            <div className={`my-8 p-6 border shadow-xl rounded-[2px] ${
              isDarkTechnical 
                ? 'bg-[#181A20] border-[#2E323D] text-[#f3f4f6]' 
                : 'bg-gray-900 text-gray-100 rounded-2xl border-gray-800'
            }`}>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#ff5722] mb-3 uppercase tracking-wider">
                <ListTree className="w-4 h-4" /> Table of Contents
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm font-sans">
                {post.tableOfContents.map(toc => (
                  <li key={toc.id}>
                    <a 
                      href={`#${toc.id}`} 
                      className={`transition-colors flex items-center gap-1.5 p-1 rounded-[2px] ${
                        isDarkTechnical 
                          ? 'text-[#d1d5db] hover:text-[#ff5722] hover:bg-[#22252D]' 
                          : 'text-gray-300 hover:text-lime-400'
                      }`}
                    >
                      <span className="text-[#ff5722] font-mono">›</span>
                      <span className="truncate">{toc.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Article Main Body */}
          <article className={`p-6 sm:p-10 border shadow-2xl my-8 prose-sm sm:prose max-w-none rounded-[2px] ${
            isDarkTechnical 
              ? 'bg-[#181A20] border-[#2E323D] text-[#d1d5db]' 
              : 'bg-white border-gray-200 rounded-2xl text-gray-800'
          }`}>
            {renderFormattedContent(post.content)}
          </article>

          {/* Dedicated Technical FAQ Section */}
          {post.faqs && post.faqs.length > 0 && (
            <BlogPostFAQSection faqs={post.faqs} parseInlineMarkdown={parseInlineMarkdown} />
          )}

          {/* In-Article Action CTA Card */}
          <div className={`border shadow-2xl my-10 p-8 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden rounded-[2px] ${
            isDarkTechnical
              ? 'bg-[#181A20] border-[#ff5722]/50 text-white'
              : 'bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950 text-white rounded-2xl border-gray-800'
          }`}>
            {isDarkTechnical && (
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#ff5722]/10 blur-3xl pointer-events-none"></div>
            )}
            <div className="space-y-2 max-w-md relative z-10">
              <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-mono font-bold border rounded-[2px] ${
                isDarkTechnical ? 'bg-[#ff5722]/10 text-[#ff5722] border-[#ff5722]/40' : 'rounded bg-lime-500/20 text-lime-400'
              }`}>
                <Sparkles className="w-3.5 h-3.5" /> Instant ATS Calibration
              </div>
              <h3 className="text-xl font-black text-[#f3f4f6]">Test Your Resume Against Modern ATS Bots</h3>
              <p className="text-xs sm:text-sm text-[#d1d5db]">
                Upload your PDF or markdown resume. Get instant semantic match scoring, missing keyword gaps, and recruiter critique in under 15 seconds.
              </p>
            </div>

            <Link
              to="/dashboard"
              onMouseEnter={() => prefetchRoute('/dashboard')}
              className={`px-6 py-3.5 font-bold text-xs sm:text-sm transition-all shrink-0 flex items-center gap-2 cursor-pointer relative z-10 rounded-[2px] ${
                isDarkTechnical
                  ? 'bg-[#ff5722] hover:bg-[#ff6e40] active:bg-[#e64a19] text-[#121316] font-mono shadow-[0_0_20px_rgba(255,87,34,0.3)]'
                  : 'bg-lime-500 hover:bg-lime-400 text-gray-950 font-black rounded-xl shadow-lg'
              }`}
            >
              <ScanLine className="w-4 h-4" />
              <span>Launch Free ATS Scanner</span>
            </Link>
          </div>

          {/* Author Bio Box */}
          <div className={`p-6 sm:p-8 border shadow-xl my-8 flex flex-col sm:flex-row items-start sm:items-center gap-5 rounded-[2px] ${
            isDarkTechnical 
              ? 'bg-[#181A20] border-[#2E323D] text-[#d1d5db]' 
              : 'bg-white border-gray-200 rounded-2xl shadow-xs'
          }`}>
            <img 
              src={post.author.avatar} 
              alt={post.author.name} 
              className={`w-16 h-16 object-cover shrink-0 rounded-[2px] ${
                isDarkTechnical ? 'border border-[#ff5722]/50' : 'rounded-2xl border-2 border-lime-500/40'
              }`} 
            />
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <h4 className="font-extrabold text-[#f3f4f6] text-base">{post.author.name}</h4>
                <span className={`text-[10px] font-mono px-2 py-0.5 font-bold border rounded-[2px] ${
                  isDarkTechnical ? 'bg-[#121316] text-[#ff5722] border-[#2E323D]' : 'bg-gray-100 text-gray-700 rounded-full'
                }`}>
                  {post.author.role}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed font-sans">
                The PandaLime AI Research & ATS Calibration Lab reverse-engineers enterprise recruitment workflows and explores next-generation agentic protocols (Model Context Protocol, LangChain, semantic AST parsers) to keep engineers ahead of automated hiring filters.
              </p>
            </div>
          </div>

          {/* Related Articles Grid */}
          <div className="my-12 space-y-6">
            <h3 className="text-xl font-extrabold text-[#f3f4f6] flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#ff5722]" /> Related Research Guides
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {relatedPosts.map(rel => (
                <Link
                  key={rel.slug}
                  to={`/blog/${rel.slug}`}
                  onMouseEnter={() => prefetchRoute(`/blog/${rel.slug}`)}
                  className={`p-5 border transition-all group flex flex-col justify-between shadow-xl rounded-[2px] ${
                    isDarkTechnical
                      ? 'bg-[#181A20] border-[#2E323D] hover:border-[#ff5722]'
                      : 'bg-white border-gray-200 hover:border-lime-500 rounded-2xl'
                  }`}
                >
                  <div className="space-y-2">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 border rounded-[2px] ${
                      isDarkTechnical
                        ? 'text-[#ff5722] bg-[#ff5722]/10 border-[#ff5722]/30'
                        : 'text-lime-800 bg-lime-50 rounded border-lime-200/60'
                    }`}>
                      {rel.category}
                    </span>
                    <h4 className={`font-bold text-xs sm:text-sm line-clamp-2 ${
                      isDarkTechnical ? 'text-[#d1d5db] group-hover:text-[#ff5722]' : 'text-gray-900 group-hover:text-lime-700'
                    }`}>
                      {rel.title}
                    </h4>
                  </div>
                  <div className={`pt-3 mt-3 border-t text-[11px] font-mono font-bold flex items-center gap-1 ${
                    isDarkTechnical ? 'border-[#2E323D] text-[#ff5722]' : 'border-gray-100 text-lime-700'
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
