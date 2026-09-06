// Portfolio Themes, Palettes, Avatars, and 1-Click Role Presets

export const THEMES = [
  {
    id: 'cyber',
    name: 'Cyber Defense & Terminal Hacker',
    tag: 'Tech & Cyber Enthusiasts',
    desc: 'Dark obsidian terminal with green/cyan neon accents, security pills, glitch highlights, and monospace code aesthetic.',
    badge: 'Popular for SecOps & Devs',
    bgClass: 'bg-[#0a0d14] text-gray-100',
    cardClass: 'bg-[#111622]/90 border border-emerald-500/30 hover:border-emerald-400/60 shadow-[0_0_20px_rgba(16,185,129,0.08)]',
    accentColor: 'lime'
  },
  {
    id: 'minimal',
    name: 'Silicon Valley Minimalist',
    tag: 'Clean & Ultra-Modern',
    desc: 'Apple & Stripe inspired clean layout, crisp contrast typography, frosted cards, and subtle elegant borders.',
    badge: 'Recruiter Recommended',
    bgClass: 'bg-gray-950 text-gray-100',
    cardClass: 'bg-gray-900/80 border border-gray-800 hover:border-gray-700 shadow-xl backdrop-blur-md',
    accentColor: 'lime'
  },
  {
    id: 'matrix',
    name: 'Deep AI & Neural Matrix',
    tag: 'AI & Data Science',
    desc: 'Futuristic deep space violet-indigo gradient, glowing ambient cards, and holographic badges.',
    badge: 'Great for AI/ML',
    bgClass: 'bg-[#09071a] text-purple-50',
    cardClass: 'bg-[#130f2e]/80 border border-purple-500/30 hover:border-purple-400/60 shadow-[0_0_25px_rgba(168,85,247,0.12)]',
    accentColor: 'purple'
  },
  {
    id: 'executive',
    name: 'Executive Enterprise Leader',
    tag: 'Tech Leads & Managers',
    desc: 'Midnight navy with warm amber/gold highlights, structured career timeline, and enterprise impact stats.',
    badge: 'Leadership & High-Impact',
    bgClass: 'bg-[#071324] text-slate-100',
    cardClass: 'bg-[#0d213a]/85 border border-amber-500/30 hover:border-amber-400/60 shadow-xl',
    accentColor: 'amber'
  },
  {
    id: 'aurora',
    name: 'Aurora Creative Glass',
    tag: 'Designers & Creative Devs',
    desc: 'Dynamic frosted glassmorphism with glowing radial gradients, rounded pill tags, and lively accents.',
    badge: 'Creative & UI/UX',
    bgClass: 'bg-[#0c101c] text-cyan-50',
    cardClass: 'bg-[#151d30]/70 border border-cyan-500/30 hover:border-cyan-400/60 shadow-[0_0_25px_rgba(6,182,212,0.12)] backdrop-blur-xl',
    accentColor: 'cyan'
  }
];

export const ACCENT_COLORS = [
  { id: 'lime', name: 'Neon Lime', hex: '#84cc16', ring: 'ring-lime-400', bg: 'bg-lime-500', text: 'text-lime-400', border: 'border-lime-400', glow: 'shadow-lime-500/20' },
  { id: 'cyan', name: 'Cyber Cyan', hex: '#06b6d4', ring: 'ring-cyan-400', bg: 'bg-cyan-500', text: 'text-cyan-400', border: 'border-cyan-400', glow: 'shadow-cyan-500/20' },
  { id: 'purple', name: 'Electric Purple', hex: '#a855f7', ring: 'ring-purple-400', bg: 'bg-purple-500', text: 'text-purple-400', border: 'border-purple-400', glow: 'shadow-purple-500/20' },
  { id: 'emerald', name: 'Matrix Emerald', hex: '#10b981', ring: 'ring-emerald-400', bg: 'bg-emerald-500', text: 'text-emerald-400', border: 'border-emerald-400', glow: 'shadow-emerald-500/20' },
  { id: 'amber', name: 'Sunset Amber', hex: '#f59e0b', ring: 'ring-amber-400', bg: 'bg-amber-500', text: 'text-amber-400', border: 'border-amber-400', glow: 'shadow-amber-500/20' },
  { id: 'rose', name: 'Ruby Crimson', hex: '#f43f5e', ring: 'ring-rose-400', bg: 'bg-rose-500', text: 'text-rose-400', border: 'border-rose-400', glow: 'shadow-rose-500/20' }
];

export const PRESET_AVATARS = [
  { id: 'cyber_hacker', label: 'Cyber SecOps', url: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=400&auto=format&fit=crop&q=80' },
  { id: 'dev_coder', label: 'Full-Stack Dev', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80' },
  { id: 'ai_engineer', label: 'AI Researcher', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80' },
  { id: 'cloud_devops', label: 'Cloud Architect', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80' },
  { id: 'ux_designer', label: 'Product Designer', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80' },
  { id: 'minimal_pro', label: 'Tech Lead', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80' }
];

export const ROLE_PRESETS = [
  {
    id: 'cybersecurity',
    title: 'Cybersecurity Analyst & Ethical Hacker',
    tagline: '🛡️ Offensive Security • Penetration Testing • Cloud SecOps',
    theme: 'cyber',
    accentColor: 'lime',
    slug: 'alex-secops',
    fullName: 'Alex Vance',
    avatarUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=400&auto=format&fit=crop&q=80',
    location: 'Bengaluru, India / Remote',
    availabilityStatus: '🟢 Open to Red Teaming & Security Roles',
    contactEmail: 'alex.secops@pandalime.dev',
    socialLinks: {
      github: 'https://github.com/alex-secops',
      linkedin: 'https://linkedin.com/in/alex-secops',
      twitter: 'https://x.com/alex_secops',
      tryhackme: 'https://tryhackme.com/p/alex_sec',
      website: 'https://pandalime.com/p/alex-secops',
      resumeUrl: '#'
    },
    bio: 'Offensive security researcher and DevSecOps engineer with 4+ years of experience conducting red team simulations, zero-day vulnerability research, and hardening AWS cloud perimeters. Top 1% on TryHackMe, OSCP certified, with 12 CVE acknowledgments.',
    metrics: [
      { label: 'Security Audits Done', value: '45+' },
      { label: 'CVEs Discovered', value: '12' },
      { label: 'TryHackMe Rank', value: 'Top 1%' },
      { label: 'Zero-Day Bounties', value: '₹14L+' }
    ],
    skills: {
      'Security & Pentesting': ['Burp Suite Pro', 'Metasploit', 'Wireshark', 'Nmap', 'Ghidra', 'OWASP Top 10'],
      'Cloud & DevSecOps': ['AWS IAM Hardening', 'Kubernetes Security', 'Trivy', 'SonarQube', 'Terraform Sec'],
      'Languages & Tooling': ['Python', 'Bash / Shell', 'Go', 'C/C++', 'PowerShell', 'Linux Kernel']
    },
    projects: [
      {
        title: 'CloudGuard — Automated AWS IAM Privilege Escalation Scanner',
        description: 'Engineered an open-source security tool that analyzes AWS CloudTrail logs and IAM graphs to detect privilege escalation vectors in real-time.',
        metric: '⭐ 1.4k GitHub Stars • 0 False Positives',
        tags: ['Python', 'AWS SDK', 'Docker', 'Graph Theory'],
        demoUrl: 'https://github.com/alex-secops/cloudguard',
        githubUrl: 'https://github.com/alex-secops/cloudguard'
      },
      {
        title: 'ZeroVault — Zero-Knowledge Encrypted Secret Storage',
        description: 'Architected an end-to-end encrypted secret manager using AES-256-GCM and Argon2id key derivation with biometric WebAuthn verification.',
        metric: 'Audited by 2 Independent Security Firms',
        tags: ['Rust', 'WebAssembly', 'Cryptography', 'React'],
        demoUrl: 'https://zerovault-demo.dev',
        githubUrl: 'https://github.com/alex-secops/zerovault'
      },
      {
        title: 'KubeSentinel — eBPF-Based Kubernetes Runtime Threat Detector',
        description: 'Implemented kernel-level security telemetry leveraging eBPF to detect suspicious process execution and privilege breakouts in container clusters.',
        metric: '<1% CPU Overhead on 500-node cluster',
        tags: ['Go', 'eBPF', 'Kubernetes', 'Linux Kernel'],
        demoUrl: 'https://github.com/alex-secops/kubesentinel',
        githubUrl: 'https://github.com/alex-secops/kubesentinel'
      }
    ],
    experience: [
      {
        role: 'Lead Penetration Tester',
        company: 'CyberShield Systems',
        period: '2023 - Present',
        location: 'Bengaluru / Hybrid',
        bullets: [
          'Spearheaded 28+ external and internal penetration tests across fintech and banking microservices, remediating 94 high-severity vulnerabilities.',
          'Built automated CI/CD static application security testing (SAST) pipelines reducing critical production CVEs by 73%.',
          'Trained 60+ engineers on secure coding standards and modern container isolation security.'
        ]
      },
      {
        role: 'Security Engineer',
        company: 'FinSec Cloud Technologies',
        period: '2021 - 2023',
        location: 'Hyderabad',
        bullets: [
          'Managed SOC monitoring, incident response, and threat hunting across 150+ AWS accounts using Splunk and GuardDuty.',
          'Automated cloud vulnerability triage using Python and AWS Lambda, slashing mean time to resolve (MTTR) from 4 days to 4 hours.'
        ]
      }
    ],
    certifications: [
      { name: 'OSCP (Offensive Security Certified Professional)', issuer: 'OffSec', year: '2023' },
      { name: 'AWS Certified Security - Specialty', issuer: 'Amazon Web Services', year: '2024' },
      { name: 'Certified Ethical Hacker (CEH Master)', issuer: 'EC-Council', year: '2022' }
    ]
  },
  {
    id: 'fullstack',
    title: 'Senior Full-Stack & SaaS Engineer',
    tagline: '🚀 React • Node.js • Next.js • Distributed Systems & Cloud',
    theme: 'minimal',
    accentColor: 'lime',
    slug: 'priya-sharma',
    fullName: 'Priya Sharma',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    location: 'Pune / Remote',
    availabilityStatus: '🟢 Available for Full-Time & High-Impact Contracts',
    contactEmail: 'priya.dev@pandalime.dev',
    socialLinks: {
      github: 'https://github.com/priyasharma-dev',
      linkedin: 'https://linkedin.com/in/priyasharma-dev',
      twitter: 'https://x.com/priyacodes',
      leetcode: 'https://leetcode.com/priyasharma',
      website: 'https://pandalime.com/p/priya-sharma',
      resumeUrl: '#'
    },
    bio: 'Full-stack software architect with 5+ years of experience building high-scale SaaS web platforms, real-time collaboration engines, and resilient cloud backends. Passionate about developer tooling, sub-second latency APIs, and sleek accessible UI.',
    metrics: [
      { label: 'Years Experience', value: '5+' },
      { label: 'Active SaaS Users', value: '250k+' },
      { label: 'GitHub Contributions', value: '2,800+' },
      { label: 'Avg API Latency', value: '<45ms' }
    ],
    skills: {
      'Frontend Architecture': ['React 19', 'Next.js 15', 'TypeScript', 'Tailwind CSS', 'Redux / Zustand', 'Vite'],
      'Backend & Databases': ['Node.js', 'Express', 'PostgreSQL', 'Redis', 'GraphQL', 'Prisma ORM'],
      'Cloud & Infrastructure': ['AWS (Lambda, S3, ECS)', 'Docker', 'CI/CD Pipelines', 'Kafka', 'Vercel']
    },
    projects: [
      {
        title: 'SyncPulse — Real-Time Collaborative Canvas',
        description: 'Built a high-performance vector graphics and whiteboarding application supporting 50+ concurrent users per room with CRDT conflict resolution.',
        metric: '100k+ Monthly Canvas Sessions • 60 FPS rendering',
        tags: ['React', 'TypeScript', 'WebSockets', 'WebWorkers', 'Redis'],
        demoUrl: 'https://syncpulse-canvas.dev',
        githubUrl: 'https://github.com/priyasharma-dev/syncpulse'
      },
      {
        title: 'PayScale AI — Global Multi-Currency Subscription Billing Engine',
        description: 'Architected automated recurring payment processing with Razorpay & Stripe webhooks, dynamic invoicing, and localized tax calculation.',
        metric: 'Processed ₹4.2 Cr ($500k+) in transaction volume',
        tags: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe API', 'Razorpay'],
        demoUrl: 'https://payscale-billing.dev',
        githubUrl: 'https://github.com/priyasharma-dev/payscale'
      },
      {
        title: 'SpeedDB — In-Memory Distributed Key-Value Store in Go',
        description: 'Implemented an ACID-compliant, lightweight key-value store supporting Raft consensus and snapshot replication.',
        metric: 'Sub-millisecond P99 response time under 50k RPS',
        tags: ['Go', 'Raft Consensus', 'Distributed Systems', 'gRPC'],
        demoUrl: 'https://github.com/priyasharma-dev/speeddb',
        githubUrl: 'https://github.com/priyasharma-dev/speeddb'
      }
    ],
    experience: [
      {
        role: 'Senior Software Engineer',
        company: 'NovaStack SaaS Solutions',
        period: '2022 - Present',
        location: 'Bengaluru / Remote',
        bullets: [
          'Led a squad of 6 frontend and backend engineers in redesigning the core enterprise dashboard, improving Core Web Vitals (LCP) from 3.8s to 0.9s.',
          'Architected serverless microservices handling 12M+ monthly API requests with 99.98% uptime.',
          'Mentored 8 junior and mid-level developers on test-driven development (TDD) and clean architecture.'
        ]
      },
      {
        role: 'Full-Stack Developer',
        company: 'InfraScale Systems',
        period: '2020 - 2022',
        location: 'Pune',
        bullets: [
          'Engineered customer onboarding flow that increased trial-to-paid conversion rate by 27%.',
          'Migrated legacy monolith to modular React + GraphQL architecture, cutting deployment times in half.'
        ]
      }
    ],
    certifications: [
      { name: 'AWS Certified Solutions Architect – Associate', issuer: 'Amazon Web Services', year: '2023' },
      { name: 'Meta Certified Front-End Developer Specialization', issuer: 'Meta', year: '2022' }
    ]
  },
  {
    id: 'ai_ml',
    title: 'AI & Machine Learning Engineer',
    tagline: '🔮 LLMs • RAG Architectures • Computer Vision • PyTorch',
    theme: 'matrix',
    accentColor: 'purple',
    slug: 'rohan-ai',
    fullName: 'Dr. Rohan Mathur',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    location: 'Hyderabad / Bengaluru',
    availabilityStatus: '🟢 Open for AI Research & GenAI Engineering',
    contactEmail: 'rohan.ai@pandalime.dev',
    socialLinks: {
      github: 'https://github.com/rohan-aiml',
      linkedin: 'https://linkedin.com/in/rohan-mathur-ai',
      twitter: 'https://x.com/rohan_ml',
      website: 'https://pandalime.com/p/rohan-ai',
      resumeUrl: '#'
    },
    bio: 'Machine learning scientist specializing in Generative AI, Retrieval-Augmented Generation (RAG), and model quantization (vLLM, TensorRT-LLM). Published author with 3 conference papers on efficient transformer inference and multilingual embedding alignment.',
    metrics: [
      { label: 'ML Models Deployed', value: '20+' },
      { label: 'Hugging Face Downloads', value: '450k+' },
      { label: 'Inference Speedup', value: '4.5x' },
      { label: 'Citations & Papers', value: '180+' }
    ],
    skills: {
      'AI & Frameworks': ['PyTorch', 'Hugging Face', 'LangChain', 'LlamaIndex', 'TensorFlow', 'vLLM'],
      'LLM & NLP Techniques': ['RAG Pipelines', 'Fine-tuning (LoRA / QLoRA)', 'Vector DBs (Qdrant, Pinecone)', 'Embeddings'],
      'MLOps & Cloud': ['Docker', 'NVIDIA Triton', 'Kubeflow', 'AWS SageMaker', 'Weights & Biases']
    },
    projects: [
      {
        title: 'OmniDoc RAG — Multi-Modal Enterprise Document Intelligence',
        description: 'Engineered a production-ready RAG system processing 100k+ PDF pages with hybrid dense-sparse vector search, table parsing, and citation grounding.',
        metric: '94.2% Question-Answering Accuracy on Legal Benchmarks',
        tags: ['Python', 'LangChain', 'Qdrant', 'FastAPI', 'Gemini API'],
        demoUrl: 'https://github.com/rohan-aiml/omnidoc-rag',
        githubUrl: 'https://github.com/rohan-aiml/omnidoc-rag'
      },
      {
        title: 'MicroLlama-Quant — 4-bit Quantized Small Language Model',
        description: 'Fine-tuned and quantized open-weights models for edge device deployment on iOS and Android devices with sub-100ms time-to-first-token.',
        metric: '150k+ Community Downloads on Hugging Face',
        tags: ['PyTorch', 'LoRA', 'ONNX', 'Quantization', 'HuggingFace'],
        demoUrl: 'https://huggingface.co/rohan-aiml',
        githubUrl: 'https://github.com/rohan-aiml/microllama-quant'
      }
    ],
    experience: [
      {
        role: 'Senior Machine Learning Scientist',
        company: 'DeepCognition AI Labs',
        period: '2023 - Present',
        location: 'Hyderabad',
        bullets: [
          'Architected multilingual LLM fine-tuning pipelines serving 1.5M queries daily with 4.2x reduced GPU hosting costs using TensorRT-LLM.',
          'Built evaluation harness scoring hallucination rates and safety guardrails across 6 Indian regional languages.'
        ]
      }
    ],
    certifications: [
      { name: 'DeepLearning.AI Generative AI with LLMs', issuer: 'DeepLearning.AI', year: '2023' },
      { name: 'AWS Certified Machine Learning – Specialty', issuer: 'AWS', year: '2024' }
    ]
  },
  {
    id: 'devops',
    title: 'Cloud DevOps & Site Reliability Engineer (SRE)',
    tagline: '⚡ Kubernetes • Terraform • AWS • CI/CD • 99.99% Reliability',
    theme: 'cyber',
    accentColor: 'cyan',
    slug: 'arjun-sre',
    fullName: 'Arjun Nair',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    location: 'Bengaluru / Remote',
    availabilityStatus: '🟢 Open to SRE & Cloud Architect Roles',
    contactEmail: 'arjun.sre@pandalime.dev',
    socialLinks: {
      github: 'https://github.com/arjun-devops',
      linkedin: 'https://linkedin.com/in/arjun-nair-sre',
      twitter: 'https://x.com/arjun_sre',
      website: 'https://pandalime.com/p/arjun-sre',
      resumeUrl: '#'
    },
    bio: 'DevOps & SRE practitioner with 6+ years orchestrating highly available cloud platforms across AWS and GCP. Expert in Infrastructure-as-Code (Terraform), GitOps with ArgoCD, zero-downtime Canary deployments, and distributed Prometheus observability.',
    metrics: [
      { label: 'Uptime Maintained', value: '99.99%' },
      { label: 'Cloud Cost Cut', value: '38%' },
      { label: 'Kubernetes Nodes', value: '1,200+' },
      { label: 'Deployments / Day', value: '150+' }
    ],
    skills: {
      'Orchestration & Cloud': ['Kubernetes (EKS / GKE)', 'AWS Cloud', 'GCP', 'Docker', 'Helm', 'ArgoCD'],
      'IaC & Automation': ['Terraform', 'Ansible', 'GitHub Actions', 'GitLab CI', 'Bash Scripting', 'Python'],
      'Observability & Sec': ['Prometheus', 'Grafana', 'Datadog', 'OpenTelemetry', 'HashiCorp Vault']
    },
    projects: [
      {
        title: 'AutoKube — GitOps Multi-Cluster Provisioner',
        description: 'Automated the end-to-end declarative lifecycle management of 20+ production EKS clusters with Terraform and ArgoCD.',
        metric: 'Cut cluster provisioning time from 6 hours to 12 minutes',
        tags: ['Terraform', 'Kubernetes', 'ArgoCD', 'AWS EKS', 'Helm'],
        demoUrl: 'https://github.com/arjun-devops/autokube',
        githubUrl: 'https://github.com/arjun-devops/autokube'
      },
      {
        title: 'CostSentry — Intelligent AWS Cloud Cost Anomaly Detector',
        description: 'Built a serverless cost monitoring bot using AWS Cost Explorer API that alerts on runaway GPU and NAT gateway spending via Slack.',
        metric: 'Saved enterprise clients over ₹45 Lakhs ($55,000/yr)',
        tags: ['Python', 'AWS Lambda', 'EventBridge', 'Slack Webhooks'],
        demoUrl: 'https://github.com/arjun-devops/costsentry',
        githubUrl: 'https://github.com/arjun-devops/costsentry'
      }
    ],
    experience: [
      {
        role: 'Lead Site Reliability Engineer',
        company: 'ScaleGrid Infrastructure',
        period: '2022 - Present',
        location: 'Bengaluru',
        bullets: [
          'Engineered disaster recovery architecture with cross-region replication, reducing RTO to under 3 minutes and RPO to 0.',
          'Reduced annual AWS cloud bill by 38% through automated Karpenter spot node provisioning and EBS lifecycle policies.'
        ]
      }
    ],
    certifications: [
      { name: 'CKA (Certified Kubernetes Administrator)', issuer: 'Linux Foundation', year: '2023' },
      { name: 'HashiCorp Certified: Terraform Associate', issuer: 'HashiCorp', year: '2023' },
      { name: 'AWS Certified Solutions Architect – Professional', issuer: 'AWS', year: '2024' }
    ]
  },
  {
    id: 'fresher',
    title: 'Computer Science Graduate & Junior Software Engineer',
    tagline: '💡 DSA • Java • React • Spring Boot • Eager to Build',
    theme: 'minimal',
    accentColor: 'cyan',
    slug: 'kavya-fresher',
    fullName: 'Kavya Verma',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80',
    location: 'Delhi NCR, India',
    availabilityStatus: '🟢 Actively Looking for Graduate / Entry-Level Roles',
    contactEmail: 'kavya.verma@pandalime.dev',
    socialLinks: {
      github: 'https://github.com/kavya-verma',
      linkedin: 'https://linkedin.com/in/kavya-verma-tech',
      leetcode: 'https://leetcode.com/kavya_codes',
      website: 'https://pandalime.com/p/kavya-fresher',
      resumeUrl: '#'
    },
    bio: 'B.Tech in Computer Science graduate (2025 batch) with strong fundamentals in Data Structures & Algorithms (350+ LeetCode problems solved) and hands-on experience building full-stack web applications in Java Spring Boot and React.',
    metrics: [
      { label: 'LeetCode Solved', value: '350+' },
      { label: 'B.Tech CGPA', value: '8.9 / 10' },
      { label: 'Hackathons Won', value: '2' },
      { label: 'GitHub Repos', value: '18' }
    ],
    skills: {
      'Programming Languages': ['Java', 'C++', 'JavaScript', 'TypeScript', 'SQL'],
      'Frameworks & Libraries': ['Spring Boot', 'React.js', 'Express.js', 'Tailwind CSS', 'Hibernate'],
      'Tools & Database': ['Git / GitHub', 'PostgreSQL', 'MySQL', 'Postman', 'Docker Basics']
    },
    projects: [
      {
        title: 'CampusPlacer — Placement Portal & Interview Tracker',
        description: 'Developed a full-stack portal for campus recruiters to post openings, shortlist resumes, and schedule candidate interview rounds.',
        metric: 'Used by 1,200+ students during campus placement drive',
        tags: ['Java', 'Spring Boot', 'React', 'PostgreSQL', 'JWT Auth'],
        demoUrl: 'https://campusplacer-demo.dev',
        githubUrl: 'https://github.com/kavya-verma/campusplacer'
      },
      {
        title: 'AlgoVisualizer — Interactive Sorting & Graph Simulator',
        description: 'Built a web-based educational visualizer animating Dijkstra, A*, QuickSort, and MergeSort algorithms with step-by-step state breakdowns.',
        metric: '5k+ Monthly Visitors from CS Universities',
        tags: ['React', 'HTML5 Canvas', 'Data Structures', 'Algorithms'],
        demoUrl: 'https://algovisualizer-kavya.dev',
        githubUrl: 'https://github.com/kavya-verma/algovisualizer'
      }
    ],
    experience: [
      {
        role: 'Software Development Intern',
        company: 'CodeCraft Innovations',
        period: 'Summer 2024 (3 Months)',
        location: 'Noida / Remote',
        bullets: [
          'Developed 12 REST API endpoints in Spring Boot with JPA queries, reducing data retrieval latency by 35%.',
          'Wrote JUnit and Mockito test suites achieving 88% code coverage across authentication and booking modules.'
        ]
      }
    ],
    certifications: [
      { name: 'Java SE 17 Developer Certified Associate', issuer: 'Oracle', year: '2024' },
      { name: 'Postman API Fundamentals Student Expert', issuer: 'Postman', year: '2024' }
    ]
  },
  {
    id: 'designer',
    title: 'Product Designer & UI/UX Technologist',
    tagline: '✨ Design Systems • Figma • Frontend Prototyping • User Research',
    theme: 'aurora',
    accentColor: 'rose',
    slug: 'sam-design',
    fullName: 'Samantha Roy',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    location: 'Mumbai / Remote',
    availabilityStatus: '🟢 Open to Product Design & Design Systems Roles',
    contactEmail: 'sam.roy@pandalime.dev',
    socialLinks: {
      github: 'https://github.com/sam-ux',
      linkedin: 'https://linkedin.com/in/sam-roy-design',
      twitter: 'https://x.com/sam_designs',
      website: 'https://pandalime.com/p/sam-design',
      resumeUrl: '#'
    },
    bio: 'Product designer bridging the gap between pixel-perfect aesthetics and engineering feasibility. 5+ years crafting intuitive design systems, SaaS workflows, and micro-interactions that drive product adoption.',
    metrics: [
      { label: 'Products Shipped', value: '14+' },
      { label: 'Design Tokens', value: '400+' },
      { label: 'User Interviews', value: '120+' },
      { label: 'Avg NPS Score', value: '+68' }
    ],
    skills: {
      'Design & Research': ['Figma (Variables & Auto Layout)', 'Design Systems', 'User Journey Mapping', 'Usability Testing'],
      'UI Code & Prototyping': ['HTML5 / CSS3', 'Tailwind CSS', 'React Basics', 'Framer Motion', 'Storybook'],
      'Tools & Analytics': ['Miro', 'Lottie Animations', 'Mixpanel', 'Hotjar', 'Notion']
    },
    projects: [
      {
        title: 'Aura Design System — Enterprise UI Kit & Token Library',
        description: 'Created a comprehensive Figma and React token-based design system powering 6 enterprise applications.',
        metric: 'Reduced UI development sprint cycle by 40%',
        tags: ['Figma', 'Design Systems', 'Storybook', 'Tailwind CSS'],
        demoUrl: 'https://aura-design-system.dev',
        githubUrl: 'https://github.com/sam-ux/aura-design-system'
      }
    ],
    experience: [
      {
        role: 'Lead Product Designer',
        company: 'FinPulse Mobility',
        period: '2022 - Present',
        location: 'Mumbai',
        bullets: [
          'Redesigned the mobile checkout journey, cutting transaction friction by 32% and increasing overall conversion.',
          'Conducted 50+ user testing sessions to define information architecture for a multi-tenant enterprise portal.'
        ]
      }
    ],
    certifications: [
      { name: 'Google UX Design Professional Certificate', issuer: 'Google', year: '2022' },
      { name: 'Nielsen Norman Group UX Master Certified', issuer: 'NN/g', year: '2023' }
    ]
  }
];

