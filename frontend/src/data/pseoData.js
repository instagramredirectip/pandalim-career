// Programmatic SEO Matrix Data and Utilities for PandaLime Career

export const ROLES = [
  {
    id: 'software-engineer',
    title: 'Software Engineer',
    singular: 'Software Engineer',
    plural: 'Software Engineers',
    category: 'Engineering',
    avgSalary: '$120,000 - $185,000',
    topKeywords: [
      'Data Structures & Algorithms',
      'System Design',
      'Distributed Systems',
      'REST APIs',
      'Microservices',
      'CI/CD Pipelines',
      'Git & Version Control',
      'Unit & Integration Testing',
      'Object-Oriented Programming (OOP)',
      'Docker & Containerization',
      'Agile / Scrum Methodology',
      'Database Optimization (SQL/NoSQL)'
    ],
    overview: 'Software engineers build scalable, reliable backend and full-stack systems. ATS filters for software engineering roles heavily weight algorithmic problem solving, clean system architecture, code quality, and proven experience with high-throughput distributed systems.',
    atsTips: [
      'Quantify your impact using the STAR method (e.g., "Reduced API response latency by 35% through Redis caching").',
      'Explicitly list your tech stack in a dedicated Technical Skills section to ensure ATS keyword extraction parses every library and language.',
      'Highlight experience with distributed architecture, concurrency, and cloud deployment pipelines (AWS, GCP, Azure).'
    ]
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    singular: 'Data Scientist',
    plural: 'Data Scientists',
    category: 'Data & AI',
    avgSalary: '$125,000 - $190,000',
    topKeywords: [
      'Machine Learning',
      'Statistical Analysis',
      'Python (NumPy, Pandas, Scikit-Learn)',
      'SQL & Data Wrangling',
      'Predictive Modeling',
      'A/B Testing & Experimentation',
      'Deep Learning (PyTorch / TensorFlow)',
      'Data Visualization (Tableau / PowerBI)',
      'Feature Engineering',
      'Natural Language Processing (NLP)',
      'Big Data (Spark / Hadoop)',
      'Model Deployment & MLOps'
    ],
    overview: 'Data Scientists turn massive raw datasets into actionable predictive intelligence and business value. Modern ATS algorithms screen for mathematical rigor, statistical validation, end-to-end ML model lifecycle, and proficiency in SQL and Python data pipelines.',
    atsTips: [
      'Specify the business ROI of your ML models (e.g., "Built churn prediction model with 92% AUC, saving $450k annually").',
      'Mention both traditional statistical techniques (regression, hypothesis testing) and modern deep learning frameworks.',
      'Showcase your data pipeline experience alongside modeling to prove you can work across the full data science lifecycle.'
    ]
  },
  {
    id: 'ai-engineer',
    title: 'AI Engineer',
    singular: 'AI Engineer',
    plural: 'AI Engineers',
    category: 'Data & AI',
    avgSalary: '$140,000 - $210,000',
    topKeywords: [
      'Large Language Models (LLMs)',
      'Generative AI',
      'Retrieval-Augmented Generation (RAG)',
      'Vector Databases (Pinecone, Chroma)',
      'LangChain & LlamaIndex',
      'Fine-Tuning & Prompt Engineering',
      'PyTorch & Hugging Face',
      'CUDA & GPU Optimization',
      'Model Evaluation & Guardrails',
      'FastAPI / Model Serving',
      'Transformer Architectures',
      'Agentic AI Workflows'
    ],
    overview: 'AI Engineers bridge the gap between machine learning research and production software applications. ATS screening focuses on hands-on GenAI implementation, LLM orchestrations, RAG pipelines, latency optimization, and robust model evaluation metrics.',
    atsTips: [
      'Include specific model architectures, vector stores, and framework names (e.g., Llama 3, Claude 3.5, LangChain, Milvus).',
      'Detail your strategies for handling hallucinations, token cost optimization, and inference latency under scale.',
      'Emphasize end-to-end production deployments rather than just prompt experiments or hobbyist notebooks.'
    ]
  },
  {
    id: 'full-stack-developer',
    title: 'Full Stack Developer',
    singular: 'Full Stack Developer',
    plural: 'Full Stack Developers',
    category: 'Engineering',
    avgSalary: '$110,000 - $175,000',
    topKeywords: [
      'React / Next.js',
      'Node.js / Express',
      'TypeScript',
      'PostgreSQL & MongoDB',
      'RESTful & GraphQL APIs',
      'Tailwind CSS & Responsive UI',
      'State Management (Redux / Zustand)',
      'Authentication (OAuth / JWT)',
      'AWS / Cloud Deployment',
      'Docker & Microservices',
      'Web Performance Optimization',
      'CI/CD & Git'
    ],
    overview: 'Full Stack Developers manage both client-side user experience and backend server infrastructure. ATS algorithms look for versatility across modern JavaScript/TypeScript ecosystems, database architecture, state management, and cloud deployment.',
    atsTips: [
      'Balance both frontend metrics (Core Web Vitals, page load speed) and backend metrics (QPS, database query optimization).',
      'Highlight your proficiency in TypeScript, modern reactive frameworks, and secure API design.',
      'Demonstrate complete product ownership from UX wireframe to production database migration.'
    ]
  },
  {
    id: 'react-developer',
    title: 'React Developer',
    singular: 'React Developer',
    plural: 'React Developers',
    category: 'Frontend',
    avgSalary: '$105,000 - $165,000',
    topKeywords: [
      'React 18 / 19',
      'TypeScript',
      'Next.js (App Router)',
      'State Management (Redux Toolkit, Zustand)',
      'React Hooks & Custom Hooks',
      'Component-Driven Architecture',
      'Tailwind CSS & CSS Modules',
      'Frontend Testing (Jest, React Testing Library)',
      'Web Vitals & Performance Tuning',
      'GraphQL & REST Integration',
      'Accessibility (a11y / WCAG)',
      'Vite & Webpack Build Tools'
    ],
    overview: 'React Developers specialize in crafting ultra-responsive, accessible, and modular web interfaces. ATS parsers prioritize mastery of modern React hooks, server-side rendering (SSR), state management, bundle size reduction, and web accessibility standards.',
    atsTips: [
      'Quantify frontend optimizations such as Lighthouse score improvements, bundle size reduction, and conversion rate increases.',
      'Showcase automated testing experience with React Testing Library and Cypress/Playwright to stand out in recruiter filters.',
      'Ensure modern standards like React 18/19 server components, Suspense, and TypeScript type safety are highlighted.'
    ]
  },
  {
    id: 'python-developer',
    title: 'Python Developer',
    singular: 'Python Developer',
    plural: 'Python Developers',
    category: 'Engineering',
    avgSalary: '$115,000 - $175,000',
    topKeywords: [
      'Python 3 (Asyncio, Typing)',
      'Django & Django REST Framework',
      'FastAPI & Pydantic',
      'PostgreSQL & SQLAlchemy ORM',
      'Celery & Redis Task Queues',
      'Pytest & Test-Driven Development (TDD)',
      'Docker & Containerized Microservices',
      'Pandas & Data Processing',
      'API Security & OAuth2',
      'Cloud Services (AWS Lambda, ECS)',
      'Web Scraping (BeautifulSoup, Playwright)',
      'Code Profiling & Memory Optimization'
    ],
    overview: 'Python Developers engineer high-performance backend web services, asynchronous automation workflows, and data pipelines. ATS filters look for deep asynchronous Python knowledge, framework mastery (Django/FastAPI), database ORM efficiency, and testing discipline.',
    atsTips: [
      'Demonstrate async proficiency (Asyncio, Celery workers, background queues) for processing high concurrency workloads.',
      'Highlight adherence to PEP 8, static typing with MyPy, and extensive test coverage with Pytest.',
      'List specific ORM performance wins (e.g., resolving N+1 queries, indexing heavy PostgreSQL databases).'
    ]
  },
  {
    id: 'cloud-architect',
    title: 'Cloud Architect',
    singular: 'Cloud Architect',
    plural: 'Cloud Architects',
    category: 'Cloud & DevOps',
    avgSalary: '$150,000 - $225,000',
    topKeywords: [
      'AWS / Azure / Google Cloud Platform (GCP)',
      'Infrastructure as Code (Terraform / CloudFormation)',
      'Kubernetes (K8s) & Container Orchestration',
      'Cloud Migration & Hybrid Cloud',
      'High Availability & Disaster Recovery (DR)',
      'Zero-Trust Security & IAM Policies',
      'FinOps & Cloud Cost Optimization',
      'Microservices Architecture',
      'Serverless (Lambda, Cloud Functions)',
      'Observability (Datadog, Prometheus, Grafana)',
      'Networking (VPC, Transit Gateway, CDN)',
      'SOC2 & Compliance Governance'
    ],
    overview: 'Cloud Architects design resilient, enterprise-grade cloud ecosystems, zero-downtime migrations, and automated infrastructure pipelines. ATS systems prioritize cloud certifications, Terraform IaC mastery, Kubernetes management, and cost-reduction achievements.',
    atsTips: [
      'List all active cloud certifications prominently at the top of your resume (e.g., AWS Solutions Architect Professional, CKA).',
      'Highlight massive cost-savings figures (e.g., "Reduced cloud expenditure by $320k/year through spot instances and auto-scaling").',
      'Emphasize security compliance frameworks (HIPAA, SOC 2, ISO 27001) and multi-region failover strategies.'
    ]
  },
  {
    id: 'product-manager',
    title: 'Product Manager',
    singular: 'Product Manager',
    plural: 'Product Managers',
    category: 'Product',
    avgSalary: '$130,000 - $195,000',
    topKeywords: [
      'Product Strategy & Roadmapping',
      'User Research & Customer Discovery',
      'Data Analytics & Metrics (SQL, Mixpanel)',
      'Agile / Scrum Product Ownership',
      'Go-To-Market (GTM) Strategy',
      'A/B Testing & Feature Prioritization (RICE)',
      'Cross-Functional Leadership',
      'Product Requirements Documents (PRDs)',
      'User Journey & Wireframing',
      'Churn Reduction & User Retention',
      'Revenue Growth & Monetization',
      'Stakeholder Management'
    ],
    overview: 'Product Managers spearhead product vision, cross-functional execution, and commercial success. ATS screening looks for business metric impact (ARR, retention, MAU), customer discovery rigor, and structured prioritization frameworks.',
    atsTips: [
      'Tie every feature directly to business revenue, user growth, or operational efficiency metrics.',
      'Demonstrate technical literacy: working closely with engineering teams on API specs and system trade-offs.',
      'Detail your discovery process: user interviews, telemetry analytics, and quantitative validation.'
    ]
  },
  {
    id: 'front-end-developer',
    title: 'Front End Developer',
    singular: 'Front End Developer',
    plural: 'Front End Developers',
    category: 'Frontend',
    avgSalary: '$100,000 - $160,000',
    topKeywords: [
      'HTML5, CSS3, Modern JavaScript (ES6+)',
      'React / Vue / Angular',
      'TypeScript',
      'Responsive & Mobile-First Design',
      'Core Web Vitals & Performance',
      'Cross-Browser Compatibility',
      'CSS Preprocessors (Sass, Tailwind)',
      'Web Accessibility (WCAG 2.1 AA)',
      'REST APIs & Asynchronous State',
      'Git & Build Tools (Vite, Webpack)',
      'UI/UX Prototyping & Figma Translation',
      'Unit & End-to-End Testing'
    ],
    overview: 'Front End Developers build beautiful, high-speed, and intuitive user interfaces. ATS scanners filter for semantic HTML structure, CSS mastery, JavaScript fluency, responsive UI frameworks, and accessibility compliance.',
    atsTips: [
      'Include concrete metrics on Lighthouse score improvements, LCP (Largest Contentful Paint) speedups, and responsive testing across devices.',
      'Showcase collaboration with UX design teams and exact conversion rate bumps following UI redesigns.'
    ]
  },
  {
    id: 'marketing-manager',
    title: 'Marketing Manager',
    singular: 'Marketing Manager',
    plural: 'Marketing Managers',
    category: 'Marketing',
    avgSalary: '$95,000 - $155,000',
    topKeywords: [
      'Digital Marketing Strategy',
      'Search Engine Optimization (SEO & SEM)',
      'Paid Acquisition (Google Ads, Meta Ads)',
      'Content Marketing & Brand Strategy',
      'Marketing Automation (HubSpot, Marketo)',
      'Customer Acquisition Cost (CAC) & LTV',
      'Email Marketing & Lifecycle Nurturing',
      'Google Analytics 4 (GA4) & Tracking',
      'Conversion Rate Optimization (CRO)',
      'Social Media Marketing & PR',
      'Budget Management & ROI Analysis',
      'Campaign Analytics & Reporting'
    ],
    overview: 'Marketing Managers drive multi-channel customer acquisition, brand awareness, and revenue growth. ATS algorithms score for measurable growth numbers (CAC reduction, pipeline revenue, organic traffic surge) and tech tool proficiencies.',
    atsTips: [
      'Include hard numbers for marketing budget managed, revenue pipeline generated, and CAC reduction percentages.',
      'Highlight proficiency across analytics, CRM, and marketing automation tech stacks.'
    ]
  }
];

export const COMPANIES = [
  {
    id: 'google',
    name: 'Google',
    atsType: 'Google Custom Internal ATS / Taleo',
    hiringFocus: 'Engineering excellence, algorithmic efficiency, distributed computing, and the Google "Googliness" collaborative leadership standard.',
    keyAttributes: [
      'Demonstrated scale (millions/billions of daily active users or petabytes of data)',
      'Strong computer science fundamentals and algorithmic complexity understanding',
      'Clear STAR-method quantified achievements (X-Y-Z formula: Accomplished [X] as measured by [Y], by doing [Z])',
      'Open-source contributions and system architecture depth'
    ]
  },
  {
    id: 'amazon',
    name: 'Amazon',
    atsType: 'Amazon Internal ATS (iCIMS / Custom)',
    hiringFocus: 'Amazon Leadership Principles (Customer Obsession, Ownership, Bias for Action, Deliver Results, Dive Deep, Earn Trust).',
    keyAttributes: [
      'Direct mapping of achievements to Amazon Leadership Principles in bullet points',
      'End-to-end operational ownership: building, launching, and supporting in production',
      'Deep metrics and data-driven decision making (frugality, latency reduction, revenue impact)',
      'Experience with AWS cloud infrastructure and microservices at planetary scale'
    ]
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    atsType: 'Microsoft Talent Architecture / SAP SuccessFactors',
    hiringFocus: 'Growth mindset, inclusive collaboration, cloud-first architecture on Azure, enterprise security, and AI-first engineering.',
    keyAttributes: [
      'Enterprise-grade code quality, security compliance, and accessibility',
      'Cross-group collaboration and multi-team technical alignment',
      'Experience with Azure, .NET/C#, TypeScript, or large-scale AI Copilot models',
      'System modernization and legacy-to-cloud transformation projects'
    ]
  },
  {
    id: 'meta',
    name: 'Meta',
    atsType: 'Meta Internal Recruiting Engine',
    hiringFocus: 'High velocity, building fast with impact, deep product intuition, open-source tech (React, PyTorch), and infrastructure scaling.',
    keyAttributes: [
      'Evidence of extreme execution speed and shipping products from 0 to 1',
      'Deep mastery of modern web or AI open source frameworks (React, GraphQL, PyTorch, Llama)',
      'Metrics showing dramatic user engagement or infrastructure efficiency gains',
      'Autonomous problem solving with minimal managerial direction'
    ]
  },
  {
    id: 'netflix',
    name: 'Netflix',
    atsType: 'Lever / Workday ATS',
    hiringFocus: 'Stunning colleagues, context not control, high freedom & responsibility, and mastery in distributed streaming resilience.',
    keyAttributes: [
      'Senior-level technical judgment and self-management without micromanagement',
      'Chaos engineering, fault-tolerant distributed systems, and real-time streaming architectures',
      'Track record of making high-stakes technical architectural decisions independently',
      'Clear, candid technical communication and documentation'
    ]
  },
  {
    id: 'tcs',
    name: 'TCS',
    atsType: 'TCS iON / Talent Acquisition System',
    hiringFocus: 'Enterprise software development, client delivery excellence, rigorous QA standards, agile delivery models, and broad technology capabilities.',
    keyAttributes: [
      'Experience with enterprise client projects and multi-tier architectures',
      'Certifications (Java, AWS, Azure, Scrum Master, Python, Cloud)',
      'Strong fundamentals in SDLC, code documentation, and automated unit testing',
      'Structured project lifecycle and stakeholder communication skills'
    ]
  },
  {
    id: 'infosys',
    name: 'Infosys',
    atsType: 'Infosys Careers Portal / Taleo / SuccessFactors',
    hiringFocus: 'Digital transformation, cloud migration, enterprise software lifecycle, and full-stack enterprise engineering.',
    keyAttributes: [
      'Enterprise frameworks, RESTful web services, and database management',
      'Agile delivery, continuous integration, and client delivery milestone tracking',
      'Recognized technical certifications and problem-solving aptitude',
      'Experience working across global distributed teams'
    ]
  },
  {
    id: 'wipro',
    name: 'Wipro',
    atsType: 'Wipro Candidate Gateway / iCIMS',
    hiringFocus: 'Cloud services, AI automation, cybersecurity, agile engineering, and enterprise application maintenance.',
    keyAttributes: [
      'Full-stack development, database query optimization, and API security',
      'System integration, migration to cloud platforms, and automated test pipelines',
      'Domain expertise across BFSI, Healthcare, Retail, or Manufacturing sectors',
      'Continuous learning credentials and enterprise certifications'
    ]
  },
  {
    id: 'top-startups',
    name: 'Top Startups',
    atsType: 'Greenhouse / Lever / Ashby ATS',
    hiringFocus: 'Rapid iteration, product ownership, 0-to-1 building, versatility across the entire stack, and hunger to solve ambiguous problems.',
    keyAttributes: [
      'Demonstrated versatility across frontend, backend, databases, and DevOps',
      'High ownership mentality: shipping products quickly and iterating based on user feedback',
      'Side projects, open source code, or entrepreneurial track record',
      'Thriving in fast-paced, high-autonomy environments with rapid pivot cycles'
    ]
  }
];

// Standalone Special Niches
export const SPECIAL_NICHES = [
  {
    slug: 'tcs-freshers',
    title: 'TCS Freshers Resume ATS Optimization',
    role: 'Fresher / Entry-Level Software Engineer',
    company: 'TCS',
    description: 'Optimize your entry-level resume for the TCS NQT and iON ATS screening. Highlight academic projects, core Java/C++/Python skills, and problem-solving certifications.',
    topKeywords: ['Core Java', 'Python Fundamentals', 'C / C++', 'Object-Oriented Programming (OOP)', 'Data Structures', 'Database Management (DBMS)', 'SQL Queries', 'Academic Projects', 'Git Basics', 'Problem Solving Aptitude', 'Communication Skills', 'SDLC'],
    overview: 'TCS hiring filters for fresh graduates rely heavily on TCS NQT scores, academic project depth, coding fundamentals, and verified technical certifications.',
    atsTips: [
      'Detail your final-year and semester projects with tech stacks, your specific role, and github repository links.',
      'Explicitly list your academic aggregate percentage/CGPA if above criteria (60%+).',
      'Highlight coding platform handles (LeetCode, HackerRank, GeeksforGeeks) and score percentiles.'
    ]
  },
  {
    slug: 'infosys-roles',
    title: 'Infosys Specialist Programmer & SE Resume ATS Optimization',
    role: 'Software Engineer & Specialist Programmer',
    company: 'Infosys',
    description: 'Tailor your resume for Infosys InfyTQ, HackWithInfy, and Specialist Programmer hiring ATS filters. Maximize keyword score for high-paying enterprise engineering bands.',
    topKeywords: ['Java 8/11/17', 'Spring Boot', 'Microservices', 'RESTful APIs', 'SQL / PostgreSQL', 'Data Structures & Algorithms', 'Cloud Fundamentals (AWS/Azure)', 'Angular / React', 'CI/CD Pipelines', 'JUnit Testing', 'Agile Methodologies', 'Design Patterns'],
    overview: 'Infosys hiring tracks like Specialist Programmer (SP) and Digital Specialist Engineer (DSE) look for advanced algorithmic problem solving, modern cloud-native frameworks, and microservices architecture.',
    atsTips: [
      'Highlight experience with Spring Boot, Microservices, and REST API development.',
      'Showcase your competitive programming achievements or InfyTQ / HackWithInfy rankings.',
      'Emphasize your unit testing and database indexing skills.'
    ]
  }
];

// Helper to generate or retrieve all valid pSEO slugs
export function getAllPseoSlugs() {
  const slugs = [];
  
  // Role + Company combinations
  ROLES.forEach(role => {
    COMPANIES.forEach(company => {
      slugs.push(`${role.id}-at-${company.id}`);
    });
  });

  // Standalone roles
  ROLES.forEach(role => {
    slugs.push(role.id);
  });

  // Special niches
  SPECIAL_NICHES.forEach(niche => {
    if (!slugs.includes(niche.slug)) {
      slugs.push(niche.slug);
    }
  });

  return slugs;
}

// Helper to resolve slug to structured data
export function getPseoData(slug) {
  if (!slug) return null;

  // Check special niches first
  const special = SPECIAL_NICHES.find(n => n.slug === slug);
  if (special) {
    return {
      slug,
      title: special.title,
      roleName: special.role,
      companyName: special.company,
      category: 'Entry Level & Specialized',
      description: special.description,
      topKeywords: special.topKeywords,
      overview: special.overview,
      atsTips: special.atsTips,
      atsType: 'Enterprise Screening Portal',
      hiringFocus: 'Core technical foundation, project clarity, and problem-solving agility.',
      isCombination: false
    };
  }

  // Check role + company combinations (e.g. software-engineer-at-google)
  if (slug.includes('-at-')) {
    const [roleId, companyId] = slug.split('-at-');
    const role = ROLES.find(r => r.id === roleId);
    const company = COMPANIES.find(c => c.id === companyId);

    if (role && company) {
      return {
        slug,
        title: `Free AI ATS Resume Scanner for ${role.plural} at ${company.name}`,
        roleName: role.title,
        roleId: role.id,
        companyName: company.name,
        companyId: company.id,
        category: role.category,
        avgSalary: role.avgSalary,
        description: `Beat the ${company.name} Applicant Tracking System. Free AI-powered resume scanner and keyword optimizer tailored specifically for ${role.title} applications at ${company.name}.`,
        topKeywords: role.topKeywords,
        overview: role.overview,
        atsTips: role.atsTips,
        atsType: company.atsType,
        hiringFocus: company.hiringFocus,
        keyAttributes: company.keyAttributes,
        isCombination: true
      };
    }
  }

  // Check standalone role (e.g. software-engineer)
  const role = ROLES.find(r => r.id === slug);
  if (role) {
    return {
      slug,
      title: `Free AI ATS Resume Scanner for ${role.plural}`,
      roleName: role.title,
      roleId: role.id,
      companyName: 'Top Companies',
      companyId: null,
      category: role.category,
      avgSalary: role.avgSalary,
      description: `Optimize your ${role.title} resume for modern ATS algorithms. Scan for missing critical keywords, calculate match score, and beat recruiter screening filters for free.`,
      topKeywords: role.topKeywords,
      overview: role.overview,
      atsTips: role.atsTips,
      atsType: 'Workday, Taleo, Greenhouse, Lever, iCIMS',
      hiringFocus: 'Demonstrated domain expertise, quantified business impact, and technical tool proficiency.',
      keyAttributes: [
        'High keyword density for target technical competencies',
        'STAR-method quantified project accomplishments',
        'Clean ATS-readable single-column structure'
      ],
      isCombination: false
    };
  }

  // Fallback for custom / dynamic slug
  const formatted = slug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return {
    slug,
    title: `Free AI ATS Resume Scanner for ${formatted}`,
    roleName: formatted,
    roleId: slug,
    companyName: 'Top Companies',
    companyId: null,
    category: 'General Careers',
    avgSalary: 'Market Competitive',
    description: `Optimize your resume for ${formatted} positions with our free AI ATS scanner. Discover missing keywords, boost your score, and land interviews.`,
    topKeywords: [
      'Domain Specific Keywords',
      'Technical Tools & Frameworks',
      'Quantified STAR Bullet Points',
      'Agile / Collaboration Workflows',
      'Problem Solving & Architecture',
      'Project Ownership & ROI'
    ],
    overview: `Applicant Tracking Systems screen thousands of resumes for ${formatted} roles before any human recruiter reads them. Our AI checks your resume for high-impact keywords and formatting compatibility.`,
    atsTips: [
      'Tailor your bullet points directly to the target job description requirements.',
      'Quantify your results with percentages, dollar amounts, and scale metrics.',
      'Use standard headings like Experience, Skills, Education, and Certifications.'
    ],
    atsType: 'Enterprise ATS Filters',
    hiringFocus: 'Technical competency, verified career progression, and role-specific achievement.',
    keyAttributes: [
      'Accurate keyword alignment with job postings',
      'Clean formatting free of tables, text boxes, and complex graphics',
      'Action-oriented bullet points'
    ],
    isCombination: false
  };
}

