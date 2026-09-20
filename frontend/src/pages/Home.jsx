import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  UploadCloud, 
  ScanLine, 
  Briefcase, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  ShieldCheck, 
  ChevronDown, 
  Check, 
  X, 
  Cpu, 
  Target, 
  BarChart3, 
  Layers, 
  Search, 
  Building2, 
  Zap, 
  Globe, 
  Terminal, 
  ExternalLink, 
  Eye, 
  BookOpen,
  Sparkles,
  Flame,
  ArrowUpRight,
  Code2,
  Lock,
  Activity
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import MobileDrawer from '../components/MobileDrawer';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ROLES, COMPANIES, SPECIAL_NICHES } from '../data/pseoData';
import { BLOG_POSTS } from '../data/blogPosts';
import { prefetchRoute } from '../utils/prefetch';

export default function Home() {
  const [openFaq, setOpenFaq] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeBenchmarkRole, setActiveBenchmarkRole] = useState('swe');

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const steps = [
    {
      step: "01",
      icon: <UploadCloud className="w-5 h-5 text-[#D2FF00]" />,
      title: "PDF / TeX Document Ingestion",
      description: "Submit your raw resume in PDF, TeX, or DOCX. In-memory lexical tokenizer breaks down your document structure without credential requirements."
    },
    {
      step: "02",
      icon: <ScanLine className="w-5 h-5 text-[#FF5722]" />,
      title: "Heuristic ATS Decompilation",
      description: "Our neural parser maps your content against Workday, Greenhouse, Ashby, and Lever heuristics, pinpointing keyword density deficits."
    },
    {
      step: "03",
      icon: <Briefcase className="w-5 h-5 text-[#D2FF00]" />,
      title: "Calibrated Optimization & Deployment",
      description: "Inject quantified STAR impact metrics, eliminate structural parsing blockers, and deploy an accompanying hosted developer portfolio."
    }
  ];

  const atsPillars = [
    {
      id: "PIL_01",
      icon: <Target className="w-5 h-5 text-[#D2FF00]" />,
      title: "Semantic Vector Alignment",
      desc: "Modern ATS uses contextual word embeddings to score relevancy. We highlight exact technical tools, cloud infrastructure, and frameworks missing from your resume."
    },
    {
      id: "PIL_02",
      icon: <Layers className="w-5 h-5 text-[#FF5722]" />,
      title: "AST Structural Viability",
      desc: "Multi-column layouts, tables, and unsupported font glyphs cause hard parser crashes. PandaLime validates that your document extracts cleanly into standard database fields."
    },
    {
      id: "PIL_03",
      icon: <BarChart3 className="w-5 h-5 text-[#D2FF00]" />,
      title: "Google STAR / X-Y-Z Density",
      desc: "Top engineering leaders reject passive phrasing. We calculate your measurable impact ratio: 'Accomplished [X], measured by [Y], by doing [Z]'."
    },
    {
      id: "PIL_04",
      icon: <Cpu className="w-5 h-5 text-[#FF5722]" />,
      title: "Enterprise Filter Emulation",
      desc: "Simulate candidate ranking thresholds across Workday, Taleo, Greenhouse, Lever, and Ashby before your application reaches a human recruiter."
    }
  ];

  const verbTransformExamples = [
    {
      id: "VERB_01",
      before: "Helped with backend scale and performance",
      after: "Orchestrated Kubernetes autoscaling policy, absorbing 4.2x Black Friday traffic spike without SLA degradation",
      powerScore: "98/100",
      atsWeight: "99.4% (Ashby)"
    },
    {
      id: "VERB_02",
      before: "Fixed critical bugs in production systems",
      after: "Eliminated 42% latency bottleneck via eBPF probe profiling & memory leak tracing in Go runtime",
      powerScore: "96/100",
      atsWeight: "97.1% (Workday)"
    },
    {
      id: "VERB_03",
      before: "Worked on frontend speed and loading",
      after: "Engineered Next.js incremental cache slashing Core Web Vitals LCP from 3.4s to 0.7s across 8M pageviews",
      powerScore: "94/100",
      atsWeight: "95.8% (Lever)"
    },
    {
      id: "VERB_04",
      before: "Led microservice migration effort",
      after: "Spearheaded multi-region gRPC migration, deprecating 12 monolith services and slashing AWS egress costs by $180k/yr",
      powerScore: "99/100",
      atsWeight: "99.1% (Greenhouse)"
    }
  ];

  const roastSnippets = [
    {
      id: "AUDIT_4912",
      role: "Senior Full-Stack Developer",
      score: "42/100",
      status: "HARSH ROAST",
      statusColor: "text-[#FF5722] border-[#FF5722]/40 bg-[#FF5722]/10",
      critique: "Your summary reads like a corporate LinkedIn post from 2014. Zero parser keywords. Zero quantified throughput. You wrote 'passionate coder' twice.",
      fix: "Replace generic intro with: 'Full-Stack Engineer with 6+ years shipping high-concurrency Node.js & React architectures serving 2M+ MAU.'"
    },
    {
      id: "AUDIT_3084",
      role: "DevOps & Cloud Engineer",
      score: "88/100",
      status: "CALIBRATED",
      statusColor: "text-[#D2FF00] border-[#D2FF00]/40 bg-[#D2FF00]/10",
      critique: "Putting 15 programming languages in your sidebar is a red flag for senior infrastructure roles. Narrow down to your primary production stack.",
      fix: "Group into Core (Go, Python), Infra (Terraform, K8s), and Telemetry (Prometheus, Grafana) to pass Ashby semantic categorization."
    },
    {
      id: "AUDIT_7190",
      role: "Data Platform Engineer",
      score: "59/100",
      status: "NEEDS METRICS",
      statusColor: "text-amber-400 border-amber-500/40 bg-amber-500/10",
      critique: "Never write 'responsible for database optimization' without specifying the query plan speedup or data volume handled.",
      fix: "Rewritten: 'Restructured Snowflake partition keys and vectorized dbt queries, reducing daily ETL processing time from 4.2 hours to 38 minutes.'"
    }
  ];

  const benchmarkRoles = {
    swe: {
      title: "Staff Software Engineer (Infra)",
      score: 94,
      impact: "96/100",
      speed: "118ms AST tokenization",
      density: "94/100",
      metricsQuotient: "89%",
      rejectionRisk: "0.8% (Negligible)",
      topKeywords: ["Kubernetes", "gRPC", "Distributed Consensus", "eBPF", "Kafka"]
    },
    secops: {
      title: "Senior Security / DevSecOps",
      score: 91,
      impact: "93/100",
      speed: "124ms AST tokenization",
      density: "92/100",
      metricsQuotient: "86%",
      rejectionRisk: "1.2% (Low)",
      topKeywords: ["Threat Modeling", "IAM Hardening", "SOC 2 Type II", "Terraform", "CI/CD Gateways"]
    },
    data: {
      title: "Principal AI / ML Platform Engineer",
      score: 96,
      impact: "98/100",
      speed: "112ms AST tokenization",
      density: "95/100",
      metricsQuotient: "92%",
      rejectionRisk: "0.4% (Elite)",
      topKeywords: ["PyTorch", "vLLM Inference", "Feature Store", "CUDA Profiling", "Vector Databases"]
    }
  };

  const toolsSuite = [
    {
      id: "01",
      tag: "NLP PARSER",
      title: "Job Keyword Extractor",
      desc: "Extract hard skills, cloud frameworks, and credential dependencies from any target job posting in under 100ms.",
      link: "/tools/job-description-keyword-extractor",
      cta: "Extract Keywords"
    },
    {
      id: "02",
      tag: "GOOGLE X-Y-Z",
      title: "STAR Bullet Generator",
      desc: "Transform weak task descriptions into high-leverage accomplishments following the Google engineering rubric.",
      link: "/tools/star-bullet-generator",
      cta: "Generate Bullets"
    },
    {
      id: "03",
      tag: "250+ VERBS",
      title: "ATS Action Verbs Taxonomy",
      desc: "Replace passive phrases like 'worked on' with surgical power verbs across Architecture, Performance, and SecOps.",
      link: "/tools/ats-action-verbs",
      cta: "Explore Verbs"
    },
    {
      id: "04",
      tag: "HOSTED URL",
      title: "AI Portfolio Studio",
      desc: "Build and deploy a recruiter-ready personal website on pandalime.com/p/:username with 5 developer themes.",
      link: "/portfolio-builder",
      cta: "Build Portfolio"
    },
    {
      id: "05",
      tag: "COMMUNITY HUD",
      title: "Brutal Roast Wall",
      desc: "Inspect live deconstructed resumes and uncensored AI critique streams from candidate submissions worldwide.",
      link: "/roast-wall",
      cta: "View Roast Wall"
    },
    {
      id: "06",
      tag: "RESEARCH LAB",
      title: "Career Research Blueprints",
      desc: "Technical whitepapers, ATS parser reverse-engineering guides, and FAANG leveling breakdown reports.",
      link: "/blog",
      cta: "Browse Blueprints"
    }
  ];

  const faqs = [
    {
      question: "What is an ATS (Applicant Tracking System) resume scanner?",
      answer: "An ATS resume scanner is automated software used by over 98% of Fortune 500 enterprises and Indian IT leaders (TCS, Infosys, Wipro, Google) to parse, index, and rank candidate resumes against specific job descriptions before a human recruiter conducts a manual review."
    },
    {
      question: "How does PandaLime deconstruct resume AST and keyword gaps?",
      answer: "PandaLime parses your resume text into an Abstract Syntax Tree (AST), extracts structural metadata, and calculates high-dimensional semantic vector similarity against the target job posting. It identifies exact hard skill deficits, formatting collision risks, and quantifiable impact scores in real time."
    },
    {
      question: "What is considered a competitive ATS benchmark score?",
      answer: "A score of 75% or higher guarantees safe passage through algorithmic filtering thresholds in enterprise systems like Workday, Greenhouse, and Ashby. Scores below 60% are typically automatically discarded due to low semantic keyword density."
    },
    {
      question: "Which Applicant Tracking Systems does PandaLime calibrate against?",
      answer: "PandaLime evaluates compatibility across all tier-1 enterprise platforms including Workday, Taleo, Greenhouse, Lever, Ashby, iCIMS, SAP SuccessFactors, and BambooHR."
    },
    {
      question: "How does the Hosted AI Portfolio Studio work?",
      answer: "PandaLime generates a fast, SEO-optimized personal developer portfolio hosted directly at pandalime.com/p/:yourname. It includes live project showcases, interactive skill matrices, structured JSON-LD Person schema, and an instant resume-printable QR code."
    },
    {
      question: "Is my resume data stored, sold, or shared?",
      answer: "No. Your document is processed strictly in memory during the diagnostic session. We adhere to a strict Zero-Data Resale Guarantee—we never sell or monetize your data with third-party recruiters, advertisers, or data brokers."
    }
  ];

  // Schema: SoftwareApplication + WebSite + FAQPage
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "PandaLime AI Resume Scanner & Portfolio Studio",
      "operatingSystem": "All Web Browsers",
      "applicationCategory": "BusinessApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "description": "Free AI-powered ATS resume scanner and portfolio website builder. Decompile resumes against job descriptions, uncover missing keywords, and launch recruiter-ready developer portfolios."
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }
  ];

  const currentRoleData = benchmarkRoles[activeBenchmarkRole];

  return (
    <div className="min-h-screen bg-[#08090C] font-sans text-[#E1E2E9] w-full max-w-full overflow-x-hidden selection:bg-[#D2FF00] selection:text-[#08090C]">
      <SEOHead 
        title="Free AI Resume Scanner & AI Portfolio Studio | PandaLime"
        description="Scan your resume for free with PandaLime AI. Beat ATS filters (Workday, Taleo, Greenhouse), uncover missing keywords, and build your recruiter-ready portfolio."
        canonical="/"
        jsonLd={jsonLd}
      />

      {/* Marquee Animation Styles */}
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            display: flex;
            width: 200%;
            animation: marquee 25s linear infinite;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}
      </style>

      {/* --- TOP NAVBAR --- */}
      <Navbar onOpenMobileMenu={() => setMobileMenuOpen(true)} />
      <MobileDrawer isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* --- HERO SECTION --- */}
      <header className="relative bg-[#08090C] pt-12 sm:pt-16 pb-16 sm:pb-24 border-b border-[#1F242D] overflow-hidden">
        {/* Architectural Hairline Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1F242D_1px,transparent_1px),linear-gradient(to_bottom,#1F242D_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Eyebrow HUD Stamp */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0E1116] border border-[#1F242D] rounded-[2px] shadow-sm">
              <span className="w-2 h-2 rounded-none bg-[#D2FF00] animate-pulse" />
              <span className="font-mono text-[10px] sm:text-[11px] font-bold text-[#D2FF00] tracking-widest uppercase">
                [ ATS_KERNEL_V4.8 ] // HEURISTIC DECOMPILATION ACTIVE
              </span>
            </div>
          </div>

          {/* Colossal Headline */}
          <div className="text-center max-w-5xl mx-auto mb-8">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#F5F7FA] leading-[1.08] mb-6">
              RE-ENGINEER YOUR CAREER <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D2FF00] via-[#FF5722] to-[#D2FF00]">
                FOR THE AI DECADE.
              </span>
            </h1>
            
            <p className="text-sm sm:text-base md:text-lg text-[#9BA3AF] max-w-3xl mx-auto leading-relaxed">
              Enterprise ATS algorithms (Workday, Greenhouse, Taleo, Ashby) reject 98% of candidate resumes. PandaLime decompiles your resume AST, isolates keyword density bottlenecks, and deploys high-converting developer & cybersecurity portfolio websites.
            </p>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3.5 max-w-md mx-auto mb-10 px-2">
            <Link 
              to="/dashboard" 
              onMouseEnter={() => prefetchRoute('/dashboard')}
              onTouchStart={() => prefetchRoute('/dashboard')}
              className="w-full sm:w-auto px-7 py-3.5 bg-[#D2FF00] hover:bg-[#E5FF66] text-[#08090C] rounded-[2px] font-mono font-bold text-sm tracking-wider uppercase shadow-[0_0_20px_rgba(210,255,0,0.25)] hover:shadow-[0_0_30px_rgba(210,255,0,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
            >
              <ScanLine className="w-4 h-4 text-[#08090C]" />
              <span>SCAN RESUME FREE</span>
              <ArrowRight className="w-4 h-4 text-[#08090C]" />
            </Link>

            <Link
              to="/portfolio-builder" 
              onMouseEnter={() => prefetchRoute('/portfolio-builder')}
              onTouchStart={() => prefetchRoute('/portfolio-builder')}
              className="w-full sm:w-auto px-7 py-3.5 bg-[#0E1116] hover:bg-[#151921] text-[#F5F7FA] hover:text-[#FF5722] rounded-[2px] font-mono font-bold text-sm tracking-wider uppercase border border-[#1F242D] hover:border-[#FF5722] transition-all flex items-center justify-center gap-2 cursor-pointer group active:scale-[0.98]"
            >
              <Globe className="w-4 h-4 text-[#FF5722] group-hover:scale-110 transition-transform" />
              <span>BUILD PORTFOLIO</span>
              <span className="text-[9px] font-mono bg-[#FF5722]/20 text-[#FF5722] px-1.5 py-0.5 rounded-[2px] border border-[#FF5722]/40 ml-1">
                FREE
              </span>
            </Link>
          </div>

          {/* Quick Metrics Ticker */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-mono text-[#9BA3AF] mb-12">
            <span className="flex items-center gap-1.5 text-[#E1E2E9]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#D2FF00]" /> 0-Credit Card Instant Scan
            </span>
            <span className="hidden sm:inline text-[#2E323D]">|</span>
            <span className="flex items-center gap-1.5 text-[#E1E2E9]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#FF5722]" /> Hosted at /p/:username
            </span>
            <span className="hidden sm:inline text-[#2E323D]">|</span>
            <span className="flex items-center gap-1.5 text-[#E1E2E9]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#D2FF00]" /> 5 High-Cadence Themes
            </span>
          </div>

          {/* --- HERO INTERACTIVE DROPZONE & AST TERMINAL PREVIEW --- */}
          <div className="max-w-5xl mx-auto grid lg:grid-cols-12 gap-4">
            
            {/* Left: Interactive Dropzone Trigger Panel */}
            <div className="lg:col-span-6 bg-[#0E1116] border border-[#1F242D] rounded-[2px] p-6 relative flex flex-col justify-between group hover:border-[#2E323D] transition-colors">
              {/* Corner coordinate stamps */}
              <span className="absolute top-2 left-2 font-mono text-[9px] text-[#505763]">[01/AST]</span>
              <span className="absolute top-2 right-2 font-mono text-[9px] text-[#505763]">MODE: STRICT</span>

              <div className="mt-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 bg-[#151921] border border-[#1F242D] rounded-[2px] flex items-center justify-center text-[#D2FF00]">
                    <UploadCloud className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#D2FF00] bg-[#D2FF00]/10 border border-[#D2FF00]/30 px-2 py-0.5 rounded-[2px]">
                    READY FOR INGESTION
                  </span>
                </div>

                <h2 className="font-bold text-lg text-[#F5F7FA] mb-2">
                  Drop Resume Document to Decompile
                </h2>
                <p className="text-xs text-[#9BA3AF] leading-relaxed mb-6">
                  Supports PDF, TeX, and DOCX formats. Parses semantic skill trees, keyword density gaps, and ATS parsing bottlenecks.
                </p>

                {/* Simulated File Target Area */}
                <Link
                  to="/dashboard"
                  className="border border-dashed border-[#2E323D] hover:border-[#D2FF00] bg-[#090B0E] p-5 rounded-[2px] flex flex-col items-center justify-center text-center transition-all cursor-pointer block"
                >
                  <ScanLine className="w-6 h-6 text-[#D2FF00] mb-2 animate-bounce" />
                  <span className="font-mono text-xs font-bold text-[#F5F7FA]">
                    CLICK OR DRAG RESUME (PDF)
                  </span>
                  <span className="font-mono text-[10px] text-[#505763] mt-1">
                    MAX 10MB • INSTANT MEMORY PARSER
                  </span>
                </Link>
              </div>

              <div className="pt-4 mt-6 border-t border-[#1F242D] flex items-center justify-between font-mono text-[11px] text-[#9BA3AF]">
                <span>STATUS: IDLE_LISTENING</span>
                <span className="text-[#D2FF00] font-bold">SHA256_VERIFIED</span>
              </div>
            </div>

            {/* Right: Live AST Telemetry & Parser Terminal Stream */}
            <div className="lg:col-span-6 bg-[#090B0E] border border-[#1F242D] rounded-[2px] p-6 relative font-mono flex flex-col justify-between">
              {/* Header Bar */}
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#1F242D] mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-none bg-[#FF5722]" />
                    <div className="w-2.5 h-2.5 rounded-none bg-amber-400" />
                    <div className="w-2.5 h-2.5 rounded-none bg-[#D2FF00]" />
                    <span className="text-[10px] text-[#9BA3AF] ml-2 font-bold">
                      pandalime-daemon v4.8
                    </span>
                  </div>
                  <span className="text-[9px] text-[#D2FF00] bg-[#D2FF00]/10 px-2 py-0.5 rounded-[2px] border border-[#D2FF00]/20">
                    LATENCY: 114ms
                  </span>
                </div>

                {/* Terminal Stream Logs */}
                <div className="space-y-1.5 text-[11px] text-[#9BA3AF] leading-snug">
                  <p className="text-[#505763]">$ pandalime daemon --audit --strict-tokens</p>
                  <p className="text-[#D2FF00]">&gt; Ingesting resume AST: [candidate_senior_infra.pdf]</p>
                  <p>&gt; Extracted 1,420 tokens across 4 structural nodes.</p>
                  <p className="text-[#FF5722]">&gt; Critical keyword bottleneck: 'eBPF' &amp; 'Kafka' missing.</p>
                  <p className="text-[#E1E2E9]">&gt; STAR metric density quotient: 89.2% [CALIBRATED].</p>
                  <p className="text-[#D2FF00]">&gt; ATS Compatibility Index: 94.2% [PASS_THRESHOLD].</p>
                </div>
              </div>

              {/* Segmented Score Dial Preview */}
              <div className="mt-6 pt-4 border-t border-[#1F242D]">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-bold text-[#F5F7FA] uppercase">
                    PARSEABILITY INDEX
                  </span>
                  <span className="text-sm font-bold text-[#D2FF00]">
                    94.2 / 100
                  </span>
                </div>
                
                {/* Sharp Segmented Tick Progress Bar */}
                <div className="grid grid-cols-10 gap-1 h-2">
                  {[...Array(10)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-full rounded-none ${i < 9 ? 'bg-[#D2FF00]' : 'bg-[#1F242D]'}`} 
                    />
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>
      </header>

      {/* --- EMPLOYERS & ENTERPRISE ATS PLATFORMS MARQUEE --- */}
      <section className="py-6 bg-[#0E1116] border-b border-[#1F242D] overflow-hidden flex flex-col items-center">
        <p className="font-mono text-[10px] font-bold text-[#505763] uppercase tracking-widest mb-3 text-center px-4">
          CALIBRATED FOR CANDIDATES TARGETING TOP EMPLOYERS &amp; ENTERPRISE ATS PARSERS
        </p>
        <div className="w-full overflow-hidden relative">
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0E1116] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0E1116] to-transparent z-10 pointer-events-none" />
          
          <div className="animate-marquee flex items-center gap-10 md:gap-16 px-8">
            {['WORKDAY', 'GREENHOUSE', 'ASHBY', 'LEVER', 'TALEO', 'TCS', 'INFOSYS', 'WIPRO', 'GOOGLE', 'MICROSOFT', 'AMAZON', 'META', 'FLIPKART', 'SWIGGY', 'ZOMATO', 'WORKDAY', 'GREENHOUSE', 'ASHBY'].map((item, i) => (
              <span key={i} className="font-mono text-xs md:text-sm font-bold text-[#9BA3AF] hover:text-[#D2FF00] tracking-wider transition-colors cursor-default whitespace-nowrap">
                // {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 2: INTERACTIVE ATS DIAGNOSTIC RADAR & LIVE SCORE TICKER --- */}
      <section className="py-16 sm:py-24 bg-[#08090C] border-b border-[#1F242D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#0E1116] border border-[#1F242D] text-[#D2FF00] font-mono text-[10px] uppercase tracking-widest rounded-[2px] mb-2">
                <Activity className="w-3.5 h-3.5" /> TELEMETRY CORE
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#F5F7FA] tracking-tight">
                ATS Diagnostic Radar &amp; Leveling Benchmark
              </h2>
              <p className="text-xs sm:text-sm text-[#9BA3AF] mt-1">
                Deconstructed scoring metrics across senior engineering, security, and AI platform roles.
              </p>
            </div>

            {/* Role Switcher Tabs */}
            <div className="flex items-center gap-1 bg-[#0E1116] p-1 border border-[#1F242D] rounded-[2px]">
              <button
                onClick={() => setActiveBenchmarkRole('swe')}
                className={`px-3 py-1.5 font-mono text-xs font-bold rounded-[2px] transition-all cursor-pointer ${
                  activeBenchmarkRole === 'swe' 
                    ? 'bg-[#D2FF00] text-[#08090C]' 
                    : 'text-[#9BA3AF] hover:text-[#F5F7FA]'
                }`}
              >
                INFRA / SWE
              </button>
              <button
                onClick={() => setActiveBenchmarkRole('secops')}
                className={`px-3 py-1.5 font-mono text-xs font-bold rounded-[2px] transition-all cursor-pointer ${
                  activeBenchmarkRole === 'secops' 
                    ? 'bg-[#FF5722] text-[#F5F7FA]' 
                    : 'text-[#9BA3AF] hover:text-[#F5F7FA]'
                }`}
              >
                SECOPS / CLOUD
              </button>
              <button
                onClick={() => setActiveBenchmarkRole('data')}
                className={`px-3 py-1.5 font-mono text-xs font-bold rounded-[2px] transition-all cursor-pointer ${
                  activeBenchmarkRole === 'data' 
                    ? 'bg-[#D2FF00] text-[#08090C]' 
                    : 'text-[#9BA3AF] hover:text-[#F5F7FA]'
                }`}
              >
                AI / PLATFORM
              </button>
            </div>
          </div>

          {/* Benchmark HUD Card */}
          <div className="bg-[#0E1116] border border-[#1F242D] rounded-[2px] p-6 sm:p-8">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Score Cluster */}
              <div className="lg:col-span-4 bg-[#090B0E] border border-[#1F242D] p-6 rounded-[2px] text-center flex flex-col justify-between">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#505763]">
                    TARGET MATCH QUOTIENT
                  </span>
                  <div className="text-6xl sm:text-7xl font-mono font-black text-[#D2FF00] my-2">
                    {currentRoleData.score}<span className="text-2xl text-[#505763]">/100</span>
                  </div>
                  <span className="font-mono text-xs font-bold text-[#F5F7FA]">
                    {currentRoleData.title}
                  </span>
                </div>

                <div className="mt-6 pt-4 border-t border-[#1F242D] space-y-2 text-left">
                  <div className="flex justify-between font-mono text-xs">
                    <span className="text-[#9BA3AF]">Status:</span>
                    <span className="text-[#D2FF00] font-bold">ALGORITHMIC PASS</span>
                  </div>
                  <div className="flex justify-between font-mono text-xs">
                    <span className="text-[#9BA3AF]">Rejection Risk:</span>
                    <span className="text-[#D2FF00] font-bold">{currentRoleData.rejectionRisk}</span>
                  </div>
                </div>
              </div>

              {/* Right Diagnostic Breakdown Grid */}
              <div className="lg:col-span-8 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  
                  <div className="bg-[#151921] border border-[#1F242D] p-4 rounded-[2px]">
                    <span className="font-mono text-[10px] text-[#9BA3AF] uppercase">Impact Verbs Quotient</span>
                    <div className="text-xl font-mono font-bold text-[#F5F7FA] mt-1">
                      {currentRoleData.impact}
                    </div>
                    <p className="text-xs text-[#9BA3AF] mt-1">High density of Google X-Y-Z active power verbs.</p>
                  </div>

                  <div className="bg-[#151921] border border-[#1F242D] p-4 rounded-[2px]">
                    <span className="font-mono text-[10px] text-[#9BA3AF] uppercase">Parsing Latency</span>
                    <div className="text-xl font-mono font-bold text-[#D2FF00] mt-1">
                      {currentRoleData.speed}
                    </div>
                    <p className="text-xs text-[#9BA3AF] mt-1">Clean structural AST extraction without formatting collisions.</p>
                  </div>

                  <div className="bg-[#151921] border border-[#1F242D] p-4 rounded-[2px]">
                    <span className="font-mono text-[10px] text-[#9BA3AF] uppercase">Skill Density Score</span>
                    <div className="text-xl font-mono font-bold text-[#F5F7FA] mt-1">
                      {currentRoleData.density}
                    </div>
                    <p className="text-xs text-[#9BA3AF] mt-1">Contextual keyword clustering matching enterprise JD.</p>
                  </div>

                  <div className="bg-[#151921] border border-[#1F242D] p-4 rounded-[2px]">
                    <span className="font-mono text-[10px] text-[#9BA3AF] uppercase">Quantified Metrics Ratio</span>
                    <div className="text-xl font-mono font-bold text-[#FF5722] mt-1">
                      {currentRoleData.metricsQuotient}
                    </div>
                    <p className="text-xs text-[#9BA3AF] mt-1">Measurable business outcomes, SLA metrics, and dollar savings.</p>
                  </div>

                </div>

                {/* Top Matched Keywords Bar */}
                <div className="bg-[#090B0E] border border-[#1F242D] p-4 rounded-[2px]">
                  <span className="font-mono text-[10px] font-bold text-[#9BA3AF] uppercase tracking-wider block mb-2">
                    EXTRACTED CRITICAL KEYWORDS:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {currentRoleData.topKeywords.map((kw, i) => (
                      <span key={i} className="font-mono text-xs font-bold text-[#D2FF00] bg-[#D2FF00]/10 border border-[#D2FF00]/30 px-2.5 py-0.5 rounded-[2px]">
                        + {kw}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* --- SECTION 3: ACTION VERB TRANSFORM MATRIX --- */}
      <section className="py-16 sm:py-24 bg-[#0E1116] border-b border-[#1F242D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#151921] border border-[#1F242D] text-[#FF5722] font-mono text-[10px] uppercase tracking-widest rounded-[2px] mb-3">
              <Zap className="w-3.5 h-3.5" /> // VERB ACCELERATOR
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F5F7FA] tracking-tight">
              High-Contrast Action Verb Transformations
            </h2>
            <p className="text-sm text-[#9BA3AF] mt-2 leading-relaxed">
              Compare generic, passive resume bullet points against calibrated high-density telemetry statements.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {verbTransformExamples.map((item) => (
              <div 
                key={item.id} 
                className="bg-[#08090C] border border-[#1F242D] rounded-[2px] p-6 hover:border-[#2E323D] transition-colors relative flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Top Meta Bar */}
                  <div className="flex items-center justify-between border-b border-[#1F242D] pb-3">
                    <span className="font-mono text-[10px] text-[#505763]">{item.id}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] font-bold text-[#D2FF00] bg-[#D2FF00]/10 border border-[#D2FF00]/30 px-2 py-0.5 rounded-[2px]">
                        SCORE: {item.powerScore}
                      </span>
                      <span className="font-mono text-[10px] text-[#9BA3AF]">
                        {item.atsWeight}
                      </span>
                    </div>
                  </div>

                  {/* Weak Phrasing */}
                  <div className="bg-[#151921]/50 border border-red-500/20 p-3 rounded-[2px]">
                    <span className="font-mono text-[10px] font-bold text-red-400 uppercase tracking-wider block mb-1">
                      [WEAK / GENERIC]
                    </span>
                    <p className="text-xs text-[#9BA3AF] line-through decoration-red-400/60">
                      "{item.before}"
                    </p>
                  </div>

                  {/* Calibrated Phrasing */}
                  <div className="bg-[#0E1116] border border-[#D2FF00]/30 p-3 rounded-[2px]">
                    <span className="font-mono text-[10px] font-bold text-[#D2FF00] uppercase tracking-wider block mb-1">
                      [CALIBRATED / HIGH IMPACT]
                    </span>
                    <p className="text-xs text-[#F5F7FA] font-medium leading-relaxed">
                      "{item.after}"
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-[#1F242D] flex items-center justify-between font-mono text-[11px] text-[#9BA3AF]">
                  <span>REWRITE GAIN: +34% WEIGHT</span>
                  <Link to="/tools/star-bullet-generator" className="text-[#D2FF00] hover:underline flex items-center gap-1 font-bold">
                    Generate <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link 
              to="/tools/ats-action-verbs" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#151921] hover:bg-[#1F242D] text-[#F5F7FA] border border-[#1F242D] hover:border-[#D2FF00] rounded-[2px] font-mono text-xs font-bold uppercase tracking-wider transition-all"
            >
              <span>Explore All 250+ High-Contrast Power Verbs</span>
              <ArrowRight className="w-4 h-4 text-[#D2FF00]" />
            </Link>
          </div>

        </div>
      </section>

      {/* --- SECTION 4: BRUTAL ROAST TELEMETRY STREAM --- */}
      <section className="py-16 sm:py-24 bg-[#08090C] border-b border-[#1F242D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#0E1116] border border-[#1F242D] text-[#FF5722] font-mono text-[10px] uppercase tracking-widest rounded-[2px] mb-2">
                <Flame className="w-3.5 h-3.5" /> // PEER &amp; AI AUDIT
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#F5F7FA] tracking-tight">
                Brutal ATS Resume Roast Telemetry
              </h2>
              <p className="text-xs sm:text-sm text-[#9BA3AF] mt-1">
                Uncensored diagnostic feedback deconstructing why hiring filters and hiring managers reject candidates.
              </p>
            </div>
            
            <Link
              to="/roast-wall"
              className="px-4 py-2 bg-[#FF5722] hover:bg-[#ff6e40] text-[#08090C] font-mono text-xs font-bold uppercase rounded-[2px] flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(255,87,34,0.3)] shrink-0"
            >
              <span>View Roast Wall Stream</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {roastSnippets.map((roast) => (
              <div 
                key={roast.id} 
                className="bg-[#0E1116] border border-[#1F242D] rounded-[2px] p-6 flex flex-col justify-between hover:border-[#FF5722]/50 transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-[#1F242D] pb-3">
                    <span className="font-mono text-[10px] text-[#505763]">{roast.id}</span>
                    <span className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded-[2px] border ${roast.statusColor}`}>
                      {roast.status} • {roast.score}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm text-[#F5F7FA] mb-1">
                      {roast.role}
                    </h3>
                    <p className="text-xs text-[#9BA3AF] italic leading-relaxed bg-[#08090C] p-3 rounded-[2px] border border-[#1F242D]">
                      "{roast.critique}"
                    </p>
                  </div>

                  <div className="bg-[#151921] p-3 rounded-[2px] border border-[#1F242D]">
                    <span className="font-mono text-[10px] font-bold text-[#D2FF00] uppercase block mb-1">
                      AI REWRITE REMEDY:
                    </span>
                    <p className="text-xs text-[#E1E2E9] leading-relaxed">
                      {roast.fix}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-[#1F242D] flex items-center justify-between font-mono text-[10px] text-[#505763]">
                  <span>COMMUNITY VERIFIED</span>
                  <Link to="/roast-wall" className="text-[#FF5722] hover:underline font-bold">
                    Read Audit &gt;
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* --- SECTION 5: 6-GRID FREE ATS & CAREER TOOLS SUITE --- */}
      <section className="py-16 sm:py-24 bg-[#0E1116] border-b border-[#1F242D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#151921] border border-[#1F242D] text-[#D2FF00] font-mono text-[10px] uppercase tracking-widest rounded-[2px] mb-3">
              <Sparkles className="w-3.5 h-3.5" /> 100% FREE AI CAREER SUITE
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F5F7FA] tracking-tight">
              Sovereign Career Optimization Tools
            </h2>
            <p className="text-sm text-[#9BA3AF] mt-2 leading-relaxed">
              Zero paywalls or forced subscriptions. Precision-machined utilities engineered for engineering candidates.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {toolsSuite.map((tool) => (
              <div 
                key={tool.id} 
                className="bg-[#08090C] border border-[#1F242D] rounded-[2px] p-6 hover:border-[#D2FF00] transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-[#505763]">
                      [{tool.id}/06]
                    </span>
                    <span className="font-mono text-[9px] font-bold text-[#D2FF00] bg-[#D2FF00]/10 border border-[#D2FF00]/30 px-2 py-0.5 rounded-[2px]">
                      {tool.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#F5F7FA] group-hover:text-[#D2FF00] transition-colors mb-2">
                    {tool.title}
                  </h3>

                  <p className="text-xs text-[#9BA3AF] leading-relaxed mb-6">
                    {tool.desc}
                  </p>
                </div>

                <Link
                  to={tool.link}
                  onMouseEnter={() => prefetchRoute(tool.link)}
                  className="w-full py-2.5 bg-[#151921] group-hover:bg-[#D2FF00] text-[#F5F7FA] group-hover:text-[#08090C] font-mono font-bold text-xs uppercase tracking-wider rounded-[2px] flex items-center justify-center gap-1.5 transition-all border border-[#1F242D] group-hover:border-[#D2FF00]"
                >
                  <span>{tool.cta}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link 
              to="/tools" 
              className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#D2FF00] hover:underline uppercase tracking-wider"
            >
              <span>Explore Complete Free Tools Directory Hub</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* --- SECTION 6: HOW IT WORKS (3-STEP INDUSTRIAL WORKFLOW) --- */}
      <section className="py-16 sm:py-24 bg-[#08090C] border-b border-[#1F242D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#0E1116] border border-[#1F242D] text-[#9BA3AF] font-mono text-[10px] uppercase tracking-widest rounded-[2px] mb-3">
              EXECUTION PIPELINE
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F5F7FA] tracking-tight">
              Three Steps to Algorithmic Clearance
            </h2>
            <p className="text-sm text-[#9BA3AF] mt-2 leading-relaxed">
              How PandaLime takes raw resume files and generates ATS-verified applications.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <div 
                key={i} 
                className="bg-[#0E1116] border border-[#1F242D] p-6 rounded-[2px] relative flex flex-col justify-between hover:border-[#2E323D] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-2xl font-black text-[#505763]">
                      {step.step}
                    </span>
                    <div className="w-9 h-9 bg-[#151921] border border-[#1F242D] rounded-[2px] flex items-center justify-center">
                      {step.icon}
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-[#F5F7FA] mb-2">{step.title}</h3>
                  <p className="text-xs text-[#9BA3AF] leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* --- SECTION 7: DEEP ATS ANALYSIS PILLARS --- */}
      <section className="py-16 sm:py-24 bg-[#0E1116] border-b border-[#1F242D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F5F7FA] tracking-tight">
              What Does an Enterprise ATS Actually Test?
            </h2>
            <p className="text-sm text-[#9BA3AF] mt-2">
              The four algorithmic dimensions corporate recruiters rely on to filter candidate pools.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {atsPillars.map((pillar) => (
              <div 
                key={pillar.id} 
                className="bg-[#08090C] border border-[#1F242D] p-5 rounded-[2px] hover:border-[#2E323D] transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-9 h-9 bg-[#151921] border border-[#1F242D] rounded-[2px] flex items-center justify-center">
                      {pillar.icon}
                    </div>
                    <span className="font-mono text-[9px] text-[#505763]">{pillar.id}</span>
                  </div>
                  <h3 className="text-sm font-bold text-[#F5F7FA] mb-2">{pillar.title}</h3>
                  <p className="text-xs text-[#9BA3AF] leading-relaxed">{pillar.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* --- SECTION 8: PORTFOLIO STUDIO SHOWCASE --- */}
      <section className="py-16 sm:py-24 bg-[#08090C] border-b border-[#1F242D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-[#0E1116] border border-[#1F242D] rounded-[2px] p-6 sm:p-10 relative overflow-hidden">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-7 space-y-4 text-left">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#151921] border border-[#1F242D] text-[#D2FF00] font-mono text-[10px] uppercase tracking-widest rounded-[2px]">
                  <Globe className="w-3.5 h-3.5" /> HOSTED RECRUITER PORTFOLIO
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-[#F5F7FA] tracking-tight">
                  Launch Your Recruiter-Ready Portfolio <br />
                  <span className="text-[#D2FF00] font-mono">
                    pandalime.com/p/:yourname
                  </span>
                </h2>
                <p className="text-xs sm:text-sm text-[#9BA3AF] leading-relaxed">
                  Don't just attach a PDF. Give engineering managers an interactive live website with your skills matrix, GitHub repositories, certifications, and 1-click QR code.
                </p>
                
                <div className="pt-2 flex flex-wrap gap-3">
                  <Link
                    to="/portfolio-builder"
                    className="px-6 py-3 bg-[#D2FF00] hover:bg-[#E5FF66] text-[#08090C] font-mono text-xs font-bold uppercase rounded-[2px] flex items-center gap-2 shadow-[0_0_15px_rgba(210,255,0,0.3)] transition-all"
                  >
                    <Globe className="w-4 h-4" />
                    <span>Create Free Portfolio</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    to="/p/alex-secops"
                    className="px-5 py-3 bg-[#151921] hover:bg-[#1F242D] text-[#F5F7FA] font-mono text-xs font-bold uppercase rounded-[2px] border border-[#1F242D] flex items-center gap-2 transition-all"
                  >
                    <span>View Live Sample</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#9BA3AF]" />
                  </Link>
                </div>
              </div>

              {/* Visual Card Preview */}
              <div className="lg:col-span-5 bg-[#090B0E] border border-[#1F242D] rounded-[2px] p-5 font-mono">
                <div className="flex items-center justify-between border-b border-[#1F242D] pb-3 mb-4">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 bg-[#FF5722] rounded-none" />
                    <div className="w-2.5 h-2.5 bg-amber-400 rounded-none" />
                    <div className="w-2.5 h-2.5 bg-[#D2FF00] rounded-none" />
                  </div>
                  <span className="text-[10px] text-[#D2FF00] bg-[#D2FF00]/10 px-2 py-0.5 rounded-[2px] border border-[#D2FF00]/20">
                    /p/alex-secops
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#D2FF00] text-[#08090C] font-bold text-sm flex items-center justify-center rounded-[2px]">
                      AV
                    </div>
                    <div>
                      <h4 className="text-[#F5F7FA] font-bold text-xs">Alex Vance</h4>
                      <p className="text-[#D2FF00] text-[10px]">SecOps &amp; Cloud Security</p>
                    </div>
                  </div>
                  <p className="text-[11px] text-[#9BA3AF] line-clamp-2">
                    "Specializing in Kubernetes threat modeling, AWS IAM policies, and automated DevSecOps pipelines."
                  </p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {['K8s', 'Terraform', 'AWS', 'Docker', 'Go'].map((skill, i) => (
                      <span key={i} className="text-[9px] bg-[#151921] text-[#9BA3AF] px-1.5 py-0.5 rounded-[2px] border border-[#1F242D]">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* --- SECTION 9: DEVELOPER & CANDIDATE TRUST MATRIX --- */}
      <section className="py-12 bg-[#0E1116] border-b border-[#1F242D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            
            <div className="bg-[#08090C] border border-[#1F242D] p-5 rounded-[2px]">
              <div className="text-2xl sm:text-3xl font-mono font-bold text-[#D2FF00]">150K+</div>
              <p className="font-mono text-[10px] text-[#9BA3AF] uppercase mt-1">Resumes Decompiled</p>
            </div>

            <div className="bg-[#08090C] border border-[#1F242D] p-5 rounded-[2px]">
              <div className="text-2xl sm:text-3xl font-mono font-bold text-[#F5F7FA]">99.4%</div>
              <p className="font-mono text-[10px] text-[#9BA3AF] uppercase mt-1">Enterprise ATS Compatibility</p>
            </div>

            <div className="bg-[#08090C] border border-[#1F242D] p-5 rounded-[2px]">
              <div className="text-2xl sm:text-3xl font-mono font-bold text-[#FF5722]">4.9 / 5</div>
              <p className="font-mono text-[10px] text-[#9BA3AF] uppercase mt-1">Trustpilot Rating</p>
            </div>

            <div className="bg-[#08090C] border border-[#1F242D] p-5 rounded-[2px]">
              <div className="text-2xl sm:text-3xl font-mono font-bold text-[#D2FF00]">&lt;118ms</div>
              <p className="font-mono text-[10px] text-[#9BA3AF] uppercase mt-1">Mean AST Token Latency</p>
            </div>

          </div>
        </div>
      </section>

      {/* --- SECTION 10: COMPARISON TABLE (PANDALIME VS TRADITIONAL) --- */}
      <section className="py-16 sm:py-24 bg-[#08090C] border-b border-[#1F242D]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F5F7FA] tracking-tight">
              Why PandaLime Outperforms Traditional Checkers
            </h2>
            <p className="text-xs sm:text-sm text-[#9BA3AF] mt-1">
              Contextual vector AST parsing compared against legacy keyword counters.
            </p>
          </div>

          <div className="overflow-x-auto border border-[#1F242D] rounded-[2px]">
            <table className="w-full text-left border-collapse font-mono text-xs">
              <thead>
                <tr className="border-b border-[#1F242D] bg-[#0E1116]">
                  <th className="py-3.5 px-4 font-bold text-[#505763] uppercase">Evaluation Feature</th>
                  <th className="py-3.5 px-4 font-bold text-[#D2FF00] uppercase bg-[#D2FF00]/5">PandaLime Core</th>
                  <th className="py-3.5 px-4 font-bold text-[#505763] uppercase">Legacy Checkers</th>
                  <th className="py-3.5 px-4 font-bold text-[#505763] uppercase">Manual Agency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1F242D] bg-[#08090C] text-[#9BA3AF]">
                <tr>
                  <td className="py-3.5 px-4 font-bold text-[#F5F7FA]">Instant AST Match Score (%)</td>
                  <td className="py-3.5 px-4 bg-[#D2FF00]/5 text-[#D2FF00] font-bold flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-[#D2FF00]" /> Instant 118ms
                  </td>
                  <td className="py-3.5 px-4">Basic Word Count</td>
                  <td className="py-3.5 px-4">Subjective</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-[#F5F7FA]">Semantic Keyword Gap Isolation</td>
                  <td className="py-3.5 px-4 bg-[#D2FF00]/5 text-[#D2FF00] font-bold flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-[#D2FF00]" /> Contextual Vector
                  </td>
                  <td className="py-3.5 px-4 text-[#505763] flex items-center gap-1.5">
                    <X className="w-4 h-4 text-[#FF5722]" /> Exact String Only
                  </td>
                  <td className="py-3.5 px-4">Partial</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-[#F5F7FA]">Google STAR Bullet Rewriting</td>
                  <td className="py-3.5 px-4 bg-[#D2FF00]/5 text-[#D2FF00] font-bold flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-[#D2FF00]" /> Autonomous
                  </td>
                  <td className="py-3.5 px-4 text-[#505763] flex items-center gap-1.5">
                    <X className="w-4 h-4 text-[#FF5722]" /> None
                  </td>
                  <td className="py-3.5 px-4">Slow / Expensive</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-[#F5F7FA]">Hosted Recruiter Web Portfolio</td>
                  <td className="py-3.5 px-4 bg-[#D2FF00]/5 text-[#D2FF00] font-bold flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-[#D2FF00]" /> Free /p/:slug
                  </td>
                  <td className="py-3.5 px-4 text-[#505763] flex items-center gap-1.5">
                    <X className="w-4 h-4 text-[#FF5722]" /> None
                  </td>
                  <td className="py-3.5 px-4">$500+ Setup</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-bold text-[#F5F7FA]">Credit Card Barrier</td>
                  <td className="py-3.5 px-4 bg-[#D2FF00]/5 text-[#D2FF00] font-bold flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-[#D2FF00]" /> 100% Free Scan
                  </td>
                  <td className="py-3.5 px-4 text-[#FF5722]">Paywalled</td>
                  <td className="py-3.5 px-4 text-[#FF5722]">$150 - $400</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* --- SECTION 11: FAQ ACCORDION WITH SCHEMA MARKUP --- */}
      <section className="py-16 sm:py-24 bg-[#0E1116] border-b border-[#1F242D]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#F5F7FA] tracking-tight">
              Frequently Asked Technical Questions
            </h2>
            <p className="text-xs sm:text-sm text-[#9BA3AF] mt-1">
              Everything you need to know about ATS architectures, tokenization, and privacy.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-[#08090C] border border-[#1F242D] rounded-[2px] overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-4 sm:p-5 text-left font-bold text-sm text-[#F5F7FA] flex justify-between items-center gap-4 hover:text-[#D2FF00] transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`w-4 h-4 text-[#505763] transition-transform duration-200 shrink-0 ${openFaq === index ? 'rotate-180 text-[#D2FF00]' : ''}`} />
                </button>
                {openFaq === index && (
                  <div className="px-4 sm:px-5 pb-5 text-xs text-[#9BA3AF] leading-relaxed border-t border-[#1F242D] pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* --- SECTION 12: INTERNAL LINK DIRECTORY (ROLES, COMPANIES & NICHES) --- */}
      <section className="py-16 bg-[#08090C] border-b border-[#1F242D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Roles Grid */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="w-4 h-4 text-[#D2FF00]" />
              <h3 className="text-base font-bold text-[#F5F7FA]">
                Targeted ATS Keyword Scanners by Engineering Role
              </h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
              {ROLES.map((role) => (
                <Link
                  key={role.id}
                  to={`/scanner/${role.id}`}
                  className="p-2.5 bg-[#0E1116] hover:bg-[#151921] hover:border-[#D2FF00] text-[#9BA3AF] hover:text-[#F5F7FA] font-mono text-[11px] rounded-[2px] border border-[#1F242D] transition-all text-center block"
                >
                  {role.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Companies Grid */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="w-4 h-4 text-[#FF5722]" />
              <h3 className="text-base font-bold text-[#F5F7FA]">
                Calibrated Resume Checkers for Top Tech Employers
              </h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
              {COMPANIES.map((company) => (
                <Link
                  key={company.id}
                  to={`/scanner/software-engineer-at-${company.id}`}
                  className="p-2.5 bg-[#0E1116] hover:bg-[#151921] hover:border-[#FF5722] text-[#9BA3AF] hover:text-[#F5F7FA] font-mono text-[11px] rounded-[2px] border border-[#1F242D] transition-all text-center block"
                >
                  {company.name} Resume Scan
                </Link>
              ))}
            </div>
          </div>

          {/* Special Niches */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Search className="w-4 h-4 text-[#D2FF00]" />
              <h4 className="text-sm font-bold text-[#F5F7FA]">Special Hiring Tracks &amp; New Grad Tracks</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {SPECIAL_NICHES.map((niche) => (
                <Link
                  key={niche.slug}
                  to={`/scanner/${niche.slug}`}
                  className="px-3 py-1.5 bg-[#0E1116] hover:bg-[#151921] hover:border-[#D2FF00] text-[#9BA3AF] hover:text-[#F5F7FA] font-mono text-[10px] rounded-[2px] border border-[#1F242D] transition-all"
                >
                  {niche.title}
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* --- SECTION 13: FEATURED CAREER RESEARCH ARTICLES --- */}
      <section className="py-16 bg-[#0E1116] border-b border-[#1F242D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#151921] text-[#D2FF00] font-mono text-[10px] uppercase tracking-wider rounded-[2px] mb-2 border border-[#1F242D]">
                <BookOpen className="w-3.5 h-3.5" /> EDITORIAL RESEARCH
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#F5F7FA]">
                Latest ATS Optimization &amp; Engineering Guides
              </h2>
            </div>
            <Link
              to="/blog"
              onMouseEnter={() => prefetchRoute('/blog')}
              className="px-3.5 py-1.5 bg-[#151921] hover:bg-[#1F242D] text-[#F5F7FA] font-mono text-xs font-bold rounded-[2px] border border-[#1F242D] flex items-center gap-1.5 transition-all shrink-0"
            >
              <span>Explore All Guides</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D2FF00]" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {BLOG_POSTS.slice(0, 3).map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                onMouseEnter={() => prefetchRoute(`/blog/${post.slug}`)}
                className="bg-[#08090C] p-5 rounded-[2px] border border-[#1F242D] hover:border-[#D2FF00] transition-all group flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between font-mono text-[10px]">
                    <span className="px-2 py-0.5 rounded-[2px] bg-[#151921] text-[#D2FF00] font-bold border border-[#1F242D]">
                      {post.category}
                    </span>
                    <span className="text-[#505763]">{post.readTime}</span>
                  </div>
                  <h3 className="font-bold text-sm text-[#F5F7FA] group-hover:text-[#D2FF00] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-[#9BA3AF] line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-[#1F242D] flex items-center justify-between font-mono text-xs font-bold text-[#D2FF00]">
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <Footer />

    </div>
  );
}