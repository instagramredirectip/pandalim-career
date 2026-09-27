// Programmatic SEO Matrix Data and Utilities for PandaLime Career
// Optimized for Indian IT Job Seekers, Freshers, GCCs, and Global Tech

export const ROLES = [
  {
    id: 'software-engineer',
    title: 'Software Engineer',
    singular: 'Software Engineer',
    plural: 'Software Engineers',
    category: 'Engineering',
    h1: 'Software Engineer ATS Resume Checker & Keyword Guide',
    seoTitle: 'Software Engineer ATS Resume Checker & Keywords | PandaLime',
    seoDesc: 'Check your Software Engineer resume against ATS filters. Find missing technical keywords, see Google X-Y-Z bullet examples, and pass recruiter screenings.',
    avgSalaryIndia: '₹8 LPA - ₹32 LPA',
    avgSalaryGlobal: '$120,000 - $185,000',
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
    skillsByCategory: {
      'Core Languages': ['Java', 'Python', 'C++', 'Go', 'TypeScript', 'SQL'],
      'Architecture & Design': ['System Design', 'Microservices', 'Distributed Systems', 'Design Patterns', 'Event-Driven Architecture'],
      'Frameworks & Backend': ['Spring Boot', 'Node.js', 'FastAPI', 'Django', 'Express.js'],
      'Database & Storage': ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Kafka'],
      'DevOps & Tools': ['Docker', 'Kubernetes', 'AWS', 'Git', 'CI/CD Pipelines', 'JUnit/PyTest']
    },
    bulletExamples: [
      {
        before: 'Responsible for writing backend APIs and fixing database bugs.',
        after: 'Architected 8 RESTful microservices in Java Spring Boot, reducing API response times by 38% for 450k daily active users.',
        explanation: 'Replaces passive duty phrasing with an active verb (Architected), specific tech stack (Java Spring Boot), and a quantified business metric (38% reduction, 450k users).'
      },
      {
        before: 'Worked on database queries and improved performance.',
        after: 'Optimized complex PostgreSQL queries and implemented Redis caching, cutting p99 database query latency from 850ms to 120ms.',
        explanation: 'Uses Google X-Y-Z formula (Accomplished [X] measured by [Y] by doing [Z]) to prove tangible technical impact.'
      },
      {
        before: 'Helped team set up deployment pipelines.',
        after: 'Built automated GitHub Actions CI/CD pipeline with Docker and Kubernetes, reducing release deployment cycle time by 65%.',
        explanation: 'Shows ownership and specific tooling (GitHub Actions, Docker, K8s) that ATS parsers look for.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Listing programming languages without demonstrating project depth',
        fix: 'Instead of just listing "Java, Python, C++", mention how you applied them inside your work experience bullets with specific frameworks and libraries.'
      },
      {
        mistake: 'Failing to quantify engineering outcomes',
        fix: 'Add concrete metrics: percentages of latency reduction, query optimizations, uptime improvements, user scale, or hours saved per sprint.'
      },
      {
        mistake: 'Omitting testing and CI/CD tools',
        fix: 'Modern software engineering ATS filters scan for unit testing (JUnit, Jest, PyTest) and CI/CD (Jenkins, GitHub Actions, Docker). Always include your testing approach.'
      }
    ],
    overview: 'Software engineers build scalable, reliable backend and full-stack systems. ATS filters for software engineering roles heavily weight algorithmic problem solving, clean system architecture, code quality, and proven experience with high-throughput distributed systems.',
    atsTips: [
      'Quantify your impact using the STAR method (e.g., "Reduced database query time by 42% through Redis caching").',
      'Explicitly list your tech stack in a dedicated Technical Skills section so ATS keyword extraction parses every library and language.',
      'Highlight experience with distributed architecture, concurrency, and cloud deployment pipelines (AWS, GCP, Azure).'
    ],
    faqs: [
      {
        q: 'What keywords do ATS systems look for in a Software Engineer resume?',
        a: 'ATS systems look for core programming languages (Java, Python, C++, Go), architecture patterns (Microservices, Distributed Systems, REST APIs), databases (PostgreSQL, MongoDB, Redis), and DevOps tooling (Docker, Kubernetes, CI/CD pipelines, Git).'
      },
      {
        q: 'How long should a Software Engineer resume be?',
        a: 'For engineers with under 5 years of experience, keep your resume to a single page. For senior engineers (5+ years) with extensive project deliverables, a 2-page clean format is standard and parsed accurately by ATS.'
      },
      {
        q: 'Should I include LeetCode and GitHub links on my resume?',
        a: 'Yes! Include clickable GitHub, LinkedIn, and coding profile links in the contact header. ATS parsers extract URLs, and human recruiters frequently check pinned GitHub repositories for code quality.'
      }
    ]
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    singular: 'Data Scientist',
    plural: 'Data Scientists',
    category: 'Data & AI',
    h1: 'Data Scientist ATS Resume Checker & Keyword Guide',
    seoTitle: 'Data Scientist ATS Resume Checker & Keywords | PandaLime',
    seoDesc: 'Check your Data Scientist resume against ATS filters. Find missing ML & Python keywords, see STAR bullet examples, and pass data science recruiter screenings.',
    avgSalaryIndia: '₹9 LPA - ₹35 LPA',
    avgSalaryGlobal: '$125,000 - $190,000',
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
    skillsByCategory: {
      'Machine Learning & AI': ['Scikit-Learn', 'PyTorch', 'TensorFlow', 'XGBoost', 'NLP', 'Computer Vision', 'LLMs'],
      'Data Analysis & Math': ['Statistical Modeling', 'Hypothesis Testing', 'A/B Testing', 'Regression', 'Time Series Forecasting'],
      'Programming & Querying': ['Python', 'R', 'SQL', 'Pandas', 'NumPy'],
      'Big Data & Cloud': ['Apache Spark', 'Databricks', 'AWS SageMaker', 'BigQuery', 'Snowflake'],
      'Visualization & BI': ['Tableau', 'Power BI', 'Matplotlib', 'Seaborn']
    },
    bulletExamples: [
      {
        before: 'Built a customer churn prediction model using machine learning.',
        after: 'Developed an XGBoost customer churn model with 91.4% AUC, identifying $620k in at-risk annual subscription revenue.',
        explanation: 'Mentions the exact algorithm (XGBoost), performance evaluation metric (91.4% AUC), and dollar value of business impact.'
      },
      {
        before: 'Ran A/B tests on website features to improve user conversions.',
        after: 'Designed and evaluated 14 statistical A/B tests across 1.2M user sessions, resulting in an 8.4% conversion rate uplift.',
        explanation: 'Highlights statistical methodology, sample size (1.2M sessions), and verified percentage outcome.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Describing machine learning models without sharing business impact or ROI',
        fix: 'Always connect model accuracy (AUC, F1-score, RMSE) to a business metric (revenue, churn reduction, operational hours saved).'
      },
      {
        mistake: 'Omitting SQL and data pipeline experience',
        fix: 'Data science ATS parsers prioritize candidates who can extract and clean their own data using advanced SQL and Spark, not just run pre-cleaned notebook scripts.'
      }
    ],
    overview: 'Data Scientists turn massive raw datasets into actionable predictive intelligence and business value. Modern ATS algorithms screen for mathematical rigor, statistical validation, end-to-end ML model lifecycle, and proficiency in SQL and Python data pipelines.',
    atsTips: [
      'Specify the business ROI of your ML models (e.g., "Built churn prediction model with 92% AUC, saving $450k annually").',
      'Mention both traditional statistical techniques (regression, hypothesis testing) and modern deep learning frameworks.',
      'Showcase your data pipeline experience alongside modeling to prove you can work across the full data science lifecycle.'
    ],
    faqs: [
      {
        q: 'What are the most important ATS keywords for a Data Scientist resume?',
        a: 'High-priority keywords include Machine Learning, Python (Pandas, Scikit-Learn, PyTorch), SQL, Statistical Modeling, A/B Testing, Feature Engineering, and MLOps/Cloud tools (AWS SageMaker, Databricks).'
      },
      {
        q: 'Should I mention model evaluation metrics on my resume?',
        a: 'Yes. State specific metrics like AUC-ROC, Precision/Recall, F1-Score, or MAPE to demonstrate mathematical rigor and model validation capabilities.'
      }
    ]
  },
  {
    id: 'ai-engineer',
    title: 'AI Engineer',
    singular: 'AI Engineer',
    plural: 'AI Engineers',
    category: 'Data & AI',
    h1: 'AI Engineer ATS Resume Checker & GenAI Keyword Guide',
    seoTitle: 'AI Engineer ATS Resume Checker & GenAI Keywords | PandaLime',
    seoDesc: 'Check your AI Engineer resume against modern ATS filters. Optimize for LLMs, RAG, LangChain, vector databases, and production AI deployment.',
    avgSalaryIndia: '₹12 LPA - ₹45 LPA',
    avgSalaryGlobal: '$140,000 - $210,000',
    topKeywords: [
      'Large Language Models (LLMs)',
      'Generative AI',
      'Retrieval-Augmented Generation (RAG)',
      'Vector Databases (Pinecone, Chroma, Milvus)',
      'LangChain & LlamaIndex',
      'Fine-Tuning & Prompt Engineering',
      'PyTorch & Hugging Face',
      'CUDA & GPU Optimization',
      'Model Evaluation & Guardrails',
      'FastAPI / Model Serving',
      'Transformer Architectures',
      'Agentic AI Workflows'
    ],
    skillsByCategory: {
      'GenAI & LLM Frameworks': ['LangChain', 'LlamaIndex', 'Hugging Face', 'OpenAI API', 'Claude API', 'Ollama', 'vLLM'],
      'Vector Search & RAG': ['Pinecone', 'ChromaDB', 'Qdrant', 'Milvus', 'Hybrid Search', 'Reranking'],
      'Model Training & Tuning': ['PyTorch', 'PEFT/LoRA', 'Fine-Tuning', 'Quantization (GGUF, AWQ)', 'CUDA'],
      'Deployment & Backend': ['FastAPI', 'Docker', 'Triton Inference Server', 'AWS SageMaker', 'Kubernetes'],
      'Evaluation & Guardrails': ['RAGAS', 'TruLens', 'NeMo Guardrails', 'Prompt Engineering', 'Hallucination Mitigation']
    },
    bulletExamples: [
      {
        before: 'Created a RAG chatbot using LangChain and OpenAI.',
        after: 'Architected enterprise RAG assistant using LangChain, Pinecone, and Claude 3.5, reducing customer support resolution time by 52% across 80,000 monthly inquiries.',
        explanation: 'Names the exact vector database, LLM model, and business scale metrics.'
      },
      {
        before: 'Worked on fine-tuning language models for classification.',
        after: 'Fine-tuned Llama 3 8B using LoRA on domain-specific medical data, boosting classification accuracy from 78% to 94.2% while decreasing inference cost by 60%.',
        explanation: 'Shows advanced tuning methods (LoRA) and concrete improvements in both accuracy and inference spend.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Listing prompt engineering without showing production software implementation',
        fix: 'Highlight backend model serving (FastAPI, vLLM, Docker), evaluation frameworks (RAGAS), and vector search architectures.'
      },
      {
        mistake: 'Ignoring latency and cost optimization',
        fix: 'Include details on token caching, streaming responses, quantization, and GPU memory management.'
      }
    ],
    overview: 'AI Engineers bridge the gap between machine learning research and production software applications. ATS screening focuses on hands-on GenAI implementation, LLM orchestrations, RAG pipelines, latency optimization, and robust model evaluation metrics.',
    atsTips: [
      'Include specific model architectures, vector stores, and framework names (e.g., Llama 3, Claude, LangChain, Pinecone).',
      'Detail your strategies for handling hallucinations, token cost optimization, and inference latency under scale.',
      'Emphasize end-to-end production deployments rather than just toy prompt experiments.'
    ],
    faqs: [
      {
        q: 'What skills differentiate an AI Engineer from a traditional ML Engineer on a resume?',
        a: 'AI Engineers focus heavily on Generative AI, LLM orchestration (LangChain, LlamaIndex), RAG architecture, vector search (Pinecone, Chroma), fine-tuning (LoRA), and agentic workflows alongside backend deployment.'
      }
    ]
  },
  {
    id: 'full-stack-developer',
    title: 'Full Stack Developer',
    singular: 'Full Stack Developer',
    plural: 'Full Stack Developers',
    category: 'Engineering',
    h1: 'Full Stack Developer ATS Resume Checker & Keyword Guide',
    seoTitle: 'Full Stack Developer ATS Resume Checker & Keywords | PandaLime',
    seoDesc: 'Check your Full Stack Developer resume against ATS filters. Optimize for React, Node.js, TypeScript, SQL, cloud deployments, and pass recruiter scans.',
    avgSalaryIndia: '₹7 LPA - ₹28 LPA',
    avgSalaryGlobal: '$110,000 - $175,000',
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
    skillsByCategory: {
      'Frontend': ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux Toolkit', 'Zustand', 'HTML5/CSS3'],
      'Backend': ['Node.js', 'Express.js', 'NestJS', 'REST APIs', 'GraphQL', 'Authentication (JWT, OAuth)'],
      'Databases': ['PostgreSQL', 'MongoDB', 'MySQL', 'Prisma ORM', 'Redis'],
      'Cloud & DevOps': ['AWS (S3, EC2, Lambda)', 'Docker', 'Vercel', 'GitHub Actions', 'CI/CD']
    },
    bulletExamples: [
      {
        before: 'Built full stack web application with React and Node.js.',
        after: 'Engineered full-stack SaaS platform using React, TypeScript, Node.js, and PostgreSQL, scaling to 15,000 daily active users with 99.9% uptime.',
        explanation: 'Provides concrete user volume, reliability metrics, and full tech stack details.'
      },
      {
        before: 'Created user authentication and payment checkout flows.',
        after: 'Implemented secure OAuth2 authentication and Stripe/Razorpay payment gateway integration, increasing checkout completion rates by 22%.',
        explanation: 'Focuses on security, real integration names, and business conversion uplift.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Only showing frontend work without backend database architecture',
        fix: 'Ensure your work history shows balanced ownership across UI components, REST/GraphQL APIs, database schema design, and deployment.'
      },
      {
        mistake: 'Failing to mention TypeScript',
        fix: 'TypeScript is one of the highest-weighted keywords for modern full-stack developer requisitions. Explicitly feature TypeScript in your skills and project bullets.'
      }
    ],
    overview: 'Full Stack Developers manage both client-side user experience and backend server infrastructure. ATS algorithms look for versatility across modern JavaScript/TypeScript ecosystems, database architecture, state management, and cloud deployment.',
    atsTips: [
      'Balance both frontend metrics (page speed, accessibility) and backend metrics (API response times, database query tuning).',
      'Highlight your proficiency in TypeScript, modern reactive frameworks, and secure API design.',
      'Demonstrate complete product ownership from UX design to production database migrations.'
    ],
    faqs: [
      {
        q: 'What is the best format for a Full Stack Developer resume?',
        a: 'Use a clean single-column format with a dedicated Technical Skills section organized by Frontend, Backend, Databases, and Cloud/DevOps. Place quantifiable project bullet points under your work experience.'
      }
    ]
  },
  {
    id: 'react-developer',
    title: 'React Developer',
    singular: 'React Developer',
    plural: 'React Developers',
    category: 'Frontend',
    h1: 'React Developer ATS Resume Checker & Keyword Guide',
    seoTitle: 'React Developer ATS Resume Checker & Keywords | PandaLime',
    seoDesc: 'Check your React Developer resume against ATS filters. Optimize for React 18/19, Next.js, TypeScript, Redux, Tailwind, and land frontend interviews.',
    avgSalaryIndia: '₹6 LPA - ₹25 LPA',
    avgSalaryGlobal: '$105,000 - $165,000',
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
    skillsByCategory: {
      'React Ecosystem': ['React 18/19', 'Next.js', 'React Router', 'Server Components', 'Suspense', 'Custom Hooks'],
      'Core Frontend': ['TypeScript', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Tailwind CSS'],
      'State & Data': ['Redux Toolkit', 'Zustand', 'TanStack Query (React Query)', 'GraphQL', 'Axios'],
      'Testing & Tooling': ['Jest', 'React Testing Library', 'Playwright', 'Vite', 'Webpack', 'Git']
    },
    bulletExamples: [
      {
        before: 'Created responsive frontend components in React.',
        after: 'Refactored legacy UI into modular React 18 component library with TypeScript and Tailwind CSS, improving Lighthouse performance score from 58 to 96.',
        explanation: 'Shows modern React capabilities and quantifiable Lighthouse metrics.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Listing outdated React patterns (class components, Redux boilerplate without Toolkit)',
        fix: 'Emphasize functional components, custom hooks, Redux Toolkit or Zustand, and React 18/19 features.'
      }
    ],
    overview: 'React Developers specialize in crafting ultra-responsive, accessible, and modular web interfaces. ATS parsers prioritize mastery of modern React hooks, server-side rendering (SSR), state management, bundle size reduction, and web accessibility standards.',
    atsTips: [
      'Quantify frontend optimizations such as Lighthouse score improvements, bundle size reduction, and conversion rate increases.',
      'Showcase automated testing experience with React Testing Library and Cypress/Playwright to stand out in recruiter filters.'
    ],
    faqs: [
      {
        q: 'Do ATS scanners look for Next.js on a React developer resume?',
        a: 'Yes. Next.js and Server-Side Rendering (SSR) are among the most frequently requested skills in modern React job postings.'
      }
    ]
  },
  {
    id: 'python-developer',
    title: 'Python Developer',
    singular: 'Python Developer',
    plural: 'Python Developers',
    category: 'Engineering',
    h1: 'Python Developer ATS Resume Checker & Backend Keyword Guide',
    seoTitle: 'Python Developer ATS Resume Checker & Keywords | PandaLime',
    seoDesc: 'Check your Python Developer resume against ATS filters. Optimize for Django, FastAPI, Asyncio, SQL, Celery, and pass backend engineering screens.',
    avgSalaryIndia: '₹7 LPA - ₹26 LPA',
    avgSalaryGlobal: '$115,000 - $175,000',
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
    skillsByCategory: {
      'Frameworks': ['FastAPI', 'Django', 'Django REST Framework', 'Flask'],
      'Asynchronous & Queues': ['Asyncio', 'Celery', 'Redis', 'RabbitMQ'],
      'Databases & ORM': ['PostgreSQL', 'SQLAlchemy', 'Django ORM', 'MySQL', 'MongoDB'],
      'Testing & Quality': ['PyTest', 'Unittest', 'MyPy', 'Flake8', 'TDD'],
      'DevOps & Cloud': ['Docker', 'AWS (Lambda, ECS)', 'Linux', 'Git', 'CI/CD']
    },
    bulletExamples: [
      {
        before: 'Wrote Python scripts and APIs for client projects.',
        after: 'Engineered high-throughput FastAPI backend handling 2.5M daily API requests with Celery async workers and Redis caching.',
        explanation: 'Quantifies request volume and proves knowledge of async architecture.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Listing Python without specifying frameworks and testing tools',
        fix: 'Always mention your framework (Django, FastAPI), testing library (PyTest), and database interaction method (SQLAlchemy, raw SQL).'
      }
    ],
    overview: 'Python Developers engineer high-performance backend web services, asynchronous automation workflows, and data pipelines. ATS filters look for deep asynchronous Python knowledge, framework mastery (Django/FastAPI), database ORM efficiency, and testing discipline.',
    atsTips: [
      'Demonstrate async proficiency (Asyncio, Celery workers, background queues) for processing high concurrency workloads.',
      'Highlight adherence to PEP 8, static typing with MyPy, and extensive test coverage with Pytest.'
    ],
    faqs: [
      {
        q: 'Which Python frameworks carry the highest weight in ATS searches?',
        a: 'FastAPI and Django REST Framework are currently the most sought-after backend frameworks for Python developers.'
      }
    ]
  },
  {
    id: 'cloud-architect',
    title: 'Cloud Architect',
    singular: 'Cloud Architect',
    plural: 'Cloud Architects',
    category: 'Cloud & DevOps',
    h1: 'Cloud Architect ATS Resume Checker & AWS/Azure Keyword Guide',
    seoTitle: 'Cloud Architect ATS Resume Checker & Keywords | PandaLime',
    seoDesc: 'Check your Cloud Architect resume against ATS filters. Optimize for AWS, Azure, GCP, Terraform, Kubernetes, FinOps, and pass enterprise screens.',
    avgSalaryIndia: '₹18 LPA - ₹50 LPA',
    avgSalaryGlobal: '$150,000 - $225,000',
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
    skillsByCategory: {
      'Cloud Platforms': ['AWS (EKS, ECS, Lambda, RDS, S3)', 'Microsoft Azure', 'Google Cloud (GCP)'],
      'Infrastructure as Code': ['Terraform', 'Terragrunt', 'Ansible', 'CloudFormation'],
      'Containers & Orchestration': ['Kubernetes', 'Docker', 'Helm', 'ArgoCD', 'Istio Service Mesh'],
      'Security & Governance': ['IAM Policies', 'Zero Trust', 'KMS Encryption', 'SOC 2', 'ISO 27001', 'HIPAA'],
      'Monitoring & FinOps': ['Datadog', 'Prometheus', 'Grafana', 'AWS Cost Explorer', 'Cloud Cost Optimization']
    },
    bulletExamples: [
      {
        before: 'Managed cloud infrastructure on AWS for our applications.',
        after: 'Architected multi-region AWS infrastructure with Terraform and Kubernetes, achieving 99.99% uptime while slashing annual cloud infrastructure spend by $340k via FinOps initiatives.',
        explanation: 'Highlights multi-region architecture, high availability (99.99%), and substantial cost savings.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Leaving off cloud certifications or placing them at the bottom',
        fix: 'Certifications like AWS Solutions Architect Professional or CKA are major ATS screening gates. Feature them prominently in your header.'
      }
    ],
    overview: 'Cloud Architects design resilient, enterprise-grade cloud ecosystems, zero-downtime migrations, and automated infrastructure pipelines. ATS systems prioritize cloud certifications, Terraform IaC mastery, Kubernetes management, and cost-reduction achievements.',
    atsTips: [
      'List all active cloud certifications prominently near the top of your resume.',
      'Highlight concrete cost-savings figures achieved through autoscaling and reservation planning.'
    ],
    faqs: [
      {
        q: 'How heavily do ATS algorithms weight cloud certifications?',
        a: 'Very heavily. For Cloud Architect and DevOps roles, certifications (AWS SA Pro, CKA, Azure Solutions Architect) often serve as automated Boolean cutoff filters in ATS systems.'
      }
    ]
  },
  {
    id: 'product-manager',
    title: 'Product Manager',
    singular: 'Product Manager',
    plural: 'Product Managers',
    category: 'Product',
    h1: 'Product Manager ATS Resume Checker & Metric-Driven Guide',
    seoTitle: 'Product Manager ATS Resume Checker & Keywords | PandaLime',
    seoDesc: 'Check your Product Manager resume against ATS filters. Optimize for PRDs, GTM strategy, user retention, A/B testing, and land senior PM interviews.',
    avgSalaryIndia: '₹14 LPA - ₹40 LPA',
    avgSalaryGlobal: '$130,000 - $195,000',
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
    skillsByCategory: {
      'Product Management': ['Product Strategy', 'Roadmapping', 'PRD Authoring', 'Feature Prioritization (RICE/MoSCoW)', 'GTM Strategy'],
      'Data & Analytics': ['SQL', 'Mixpanel', 'Amplitude', 'Google Analytics 4', 'A/B Testing', 'Cohort Analysis'],
      'Methodology & Tools': ['Agile / Scrum', 'Jira', 'Figma', 'Confluence', 'User Interviews', 'Usability Testing']
    },
    bulletExamples: [
      {
        before: 'Managed the mobile app roadmap and worked with developers.',
        after: 'Led cross-functional team of 8 engineers and 2 designers to launch 1-click checkout feature, driving $1.4M incremental annual ARR and reducing mobile cart abandonment by 18%.',
        explanation: 'Highlights team leadership, specific shipped feature, and direct revenue/conversion impact.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Listing feature releases without showing customer adoption or business impact',
        fix: 'Every product bullet must pair a feature release with user adoption rate (MAU, DAU), retention bump, or revenue generated.'
      }
    ],
    overview: 'Product Managers spearhead product vision, cross-functional execution, and commercial success. ATS screening looks for business metric impact (ARR, retention, MAU), customer discovery rigor, and structured prioritization frameworks.',
    atsTips: [
      'Tie every feature directly to business revenue, user growth, or operational efficiency metrics.',
      'Demonstrate technical literacy: working closely with engineering teams on API specs and system trade-offs.'
    ],
    faqs: [
      {
        q: 'What metrics should a Product Manager include on a resume?',
        a: 'Focus on metrics like ARR/MRR growth, churn reduction percentages, conversion rate uplifts, Monthly Active Users (MAU), and feature adoption rates.'
      }
    ]
  },
  {
    id: 'front-end-developer',
    title: 'Front End Developer',
    singular: 'Front End Developer',
    plural: 'Front End Developers',
    category: 'Frontend',
    h1: 'Front End Developer ATS Resume Checker & Keyword Guide',
    seoTitle: 'Front End Developer ATS Resume Checker & Keywords | PandaLime',
    seoDesc: 'Check your Front End Developer resume against ATS filters. Optimize for HTML5, CSS3, JavaScript, React, Web Vitals, accessibility, and pass screenings.',
    avgSalaryIndia: '₹6 LPA - ₹24 LPA',
    avgSalaryGlobal: '$100,000 - $160,000',
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
    skillsByCategory: {
      'Languages & Core': ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'TypeScript'],
      'Frameworks & UI': ['React', 'Next.js', 'Vue.js', 'Tailwind CSS', 'Sass', 'CSS Modules'],
      'Performance & a11y': ['Core Web Vitals (LCP, INP, CLS)', 'WCAG Accessibility', 'Lighthouse Optimization'],
      'Tooling & Testing': ['Vite', 'Webpack', 'Jest', 'Cypress', 'Playwright', 'Git']
    },
    bulletExamples: [
      {
        before: 'Built responsive web pages for desktop and mobile.',
        after: 'Engineered 20+ responsive web interfaces with React, TypeScript, and Tailwind CSS, improving mobile Core Web Vitals and cutting initial page load time by 44%.',
        explanation: 'Shows responsive implementation coupled with measurable load speed improvements.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Failing to mention web performance and Core Web Vitals',
        fix: 'Modern frontend screening algorithms prioritize knowledge of LCP, INP, CLS, lazy loading, and asset optimization.'
      }
    ],
    overview: 'Front End Developers build high-speed, intuitive, and accessible user interfaces. ATS scanners filter for semantic HTML structure, CSS mastery, JavaScript fluency, responsive UI frameworks, and accessibility compliance.',
    atsTips: [
      'Include concrete metrics on Lighthouse score improvements, LCP speedups, and responsive testing across devices.'
    ],
    faqs: [
      {
        q: 'How do ATS filters evaluate frontend development resumes?',
        a: 'They look for modern JavaScript/TypeScript proficiency, framework experience (React, Vue, Angular), CSS architecture (Tailwind), and performance optimization techniques.'
      }
    ]
  },
  {
    id: 'marketing-manager',
    title: 'Marketing Manager',
    singular: 'Marketing Manager',
    plural: 'Marketing Managers',
    category: 'Marketing',
    h1: 'Marketing Manager ATS Resume Checker & Growth Keyword Guide',
    seoTitle: 'Marketing Manager ATS Resume Checker & Keywords | PandaLime',
    seoDesc: 'Check your Marketing Manager resume against ATS filters. Optimize for SEO, Paid Ads, GA4, CAC reduction, GTM strategy, and land growth marketing interviews.',
    avgSalaryIndia: '₹8 LPA - ₹25 LPA',
    avgSalaryGlobal: '$95,000 - $155,000',
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
    skillsByCategory: {
      'Digital Marketing & Growth': ['SEO', 'SEM', 'Google Ads', 'Meta Ads', 'Paid Acquisition', 'CRO'],
      'Analytics & Measurement': ['Google Analytics 4 (GA4)', 'HubSpot', 'Mixpanel', 'Attribution Modeling', 'CAC & LTV Analysis'],
      'Content & Lifecycle': ['Content Marketing', 'Email Automation', 'Copywriting', 'Brand Strategy', 'Lifecycle Nurturing']
    },
    bulletExamples: [
      {
        before: 'Managed Google Ads campaigns and social media accounts.',
        after: 'Managed $45k/month multi-channel paid acquisition budget across Google & LinkedIn Ads, reducing Customer Acquisition Cost (CAC) by 29% while driving $1.8M in qualified pipeline.',
        explanation: 'Demonstrates budget scale ($45k/mo), CAC efficiency improvement, and revenue impact ($1.8M pipeline).'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Listing marketing activities without showing ROI and pipeline revenue',
        fix: 'Tie your campaigns directly to customer acquisition numbers, lead volume, CAC reduction, and closed revenue.'
      }
    ],
    overview: 'Marketing Managers drive multi-channel customer acquisition, brand awareness, and revenue growth. ATS algorithms score for measurable growth numbers (CAC reduction, pipeline revenue, organic traffic surge) and tech tool proficiencies.',
    atsTips: [
      'Include hard numbers for marketing budget managed, revenue pipeline generated, and CAC reduction percentages.'
    ],
    faqs: [
      {
        q: 'What marketing analytics tools should be on my resume?',
        a: 'Feature Google Analytics 4, Google Tag Manager, HubSpot/Marketo, and SQL/BI tools to demonstrate data-driven marketing decision making.'
      }
    ]
  }
];

export const COMPANIES = [
  // --- Indian IT Giants & Service Leaders ---
  {
    id: 'tcs',
    name: 'TCS (Tata Consultancy Services)',
    shortName: 'TCS',
    region: 'India / Global',
    atsType: 'TCS iON Talent Acquisition System',
    hiringFocus: 'Enterprise software development, client delivery excellence, rigorous QA standards, agile delivery models, and broad technology capabilities.',
    keyAttributes: [
      'Experience with enterprise client projects and multi-tier architectures',
      'Technical certifications in Java, AWS, Azure, Python, or Scrum',
      'Strong fundamentals in SDLC, code documentation, and automated unit testing',
      'Structured project lifecycle management and stakeholder communication'
    ],
    screeningRules: 'TCS iON scans for exact technical skill matches, academic percentage thresholds (typically 60%+ for campus hiring), and clear project documentation.'
  },
  {
    id: 'infosys',
    name: 'Infosys',
    shortName: 'Infosys',
    region: 'India / Global',
    atsType: 'Infosys Career Portal / Taleo',
    hiringFocus: 'Digital transformation, cloud migration, enterprise software lifecycle, and full-stack enterprise engineering.',
    keyAttributes: [
      'Enterprise frameworks, RESTful web services, and database management',
      'Agile delivery, continuous integration, and client delivery milestone tracking',
      'Recognized technical certifications and problem-solving aptitude',
      'Experience working across global distributed teams'
    ],
    screeningRules: 'Infosys filters heavily score Spring Boot, Microservices, Cloud fundamentals, and competitive programming credentials (InfyTQ, HackWithInfy).'
  },
  {
    id: 'wipro',
    name: 'Wipro',
    shortName: 'Wipro',
    region: 'India / Global',
    atsType: 'Wipro Candidate Gateway / iCIMS',
    hiringFocus: 'Cloud services, AI automation, cybersecurity, agile engineering, and enterprise application maintenance.',
    keyAttributes: [
      'Full-stack development, database query optimization, and API security',
      'System integration, migration to cloud platforms, and automated test pipelines',
      'Domain expertise across BFSI, Healthcare, Retail, or Manufacturing sectors'
    ],
    screeningRules: 'Wipro Candidate Gateway prioritizes clean single-column formatting, core computer science subjects, and practical capstone project implementation.'
  },
  {
    id: 'hcltech',
    name: 'HCLTech',
    shortName: 'HCLTech',
    region: 'India / Global',
    atsType: 'HCL Career Portal / Taleo',
    hiringFocus: 'Engineering and R&D services, digital enterprise solutions, hybrid cloud migrations, and cybersecurity infrastructure.',
    keyAttributes: [
      'Deep domain software engineering and systems programming experience',
      'Cloud infrastructure management and automation tools',
      'End-to-end SDLC ownership and client delivery metrics'
    ],
    screeningRules: 'HCLTech uses Taleo to match specific programming language versions, database engines, and years of experience against requisition criteria.'
  },
  {
    id: 'cognizant',
    name: 'Cognizant',
    shortName: 'Cognizant',
    region: 'India / Global',
    atsType: 'Cognizant Careers Gateway / Workday',
    hiringFocus: 'Modern digital engineering, cloud application modernization, enterprise data architecture, and AI-driven automation.',
    keyAttributes: [
      'Full stack JavaScript/TypeScript, Java Spring Boot, or Python microservices',
      'Data engineering pipelines and relational database mastery',
      'Agile delivery methodology and client problem resolution'
    ],
    screeningRules: 'Cognizant uses Workday ATS to evaluate digital engineering capabilities, cloud certifications, and full stack project portfolios.'
  },
  {
    id: 'accenture-india',
    name: 'Accenture India',
    shortName: 'Accenture',
    region: 'India / Global',
    atsType: 'Accenture Talent Gateway / Workday',
    hiringFocus: 'Enterprise cloud strategy, digital transformation, custom systems integration, and AI-enabled operations.',
    keyAttributes: [
      'Cross-functional problem solving and client delivery governance',
      'Strong cloud certifications across AWS, Microsoft Azure, or GCP',
      'Collaborative team leadership and structured software architecture'
    ],
    screeningRules: 'Accenture filters look for demonstrated cloud migration experience, client consulting impact, and structured agile project delivery.'
  },
  {
    id: 'ltimindtree',
    name: 'LTIMindtree',
    shortName: 'LTIMindtree',
    region: 'India / Global',
    atsType: 'LTI Mindtree Careers / SuccessFactors',
    hiringFocus: 'Digital engineering, cloud enablement, data and insights, and enterprise consulting solutions.',
    keyAttributes: [
      'Modern web frameworks, microservices architecture, and cloud data lakes',
      'Continuous integration and automated QA regression suites',
      'High-impact client deliverables and agile sprint leadership'
    ],
    screeningRules: 'SuccessFactors ATS matches exact skills, testing automation libraries, and enterprise database proficiencies.'
  },
  {
    id: 'tech-mahindra',
    name: 'Tech Mahindra',
    shortName: 'Tech Mahindra',
    region: 'India / Global',
    atsType: 'Tech Mahindra Recruitment Portal',
    hiringFocus: 'Telecommunications networks, 5G solutions, enterprise digital transformation, and cybersecurity.',
    keyAttributes: [
      'Network engineering, telecom software protocols, and cloud computing',
      'Robust backend systems, Linux environments, and relational databases'
    ],
    screeningRules: 'Screens for telecom software protocols, backend Java/Python systems, and cloud infrastructure experience.'
  },

  // --- Indian Tech Unicorns & Product Leaders ---
  {
    id: 'flipkart',
    name: 'Flipkart',
    shortName: 'Flipkart',
    region: 'India (Bengaluru)',
    atsType: 'Greenhouse ATS',
    hiringFocus: 'Ultra-high concurrency e-commerce scale (Big Billion Days), microservices, low-latency search/recommendation engines, and warehouse tech.',
    keyAttributes: [
      'Experience handling high QPS distributed systems and database sharding',
      'Deep algorithm optimization, caching layers (Redis/Aerospike), and Kafka event streams',
      'Rapid product iteration and data-backed feature experiments'
    ],
    screeningRules: 'Flipkart recruiters review resumes filtered by Greenhouse ATS. Resumes with strong system design, Kafka, and high QPS metrics rank highest.'
  },
  {
    id: 'swiggy',
    name: 'Swiggy',
    shortName: 'Swiggy',
    region: 'India (Bengaluru)',
    atsType: 'Lever ATS',
    hiringFocus: 'Hyperlocal delivery routing algorithms, real-time demand forecasting, low-latency microservices, and mobile-first experience.',
    keyAttributes: [
      'Real-time geolocation systems, geospatial queries, and Kafka event streaming',
      'Scalable Golang/Java backend services and high-throughput databases'
    ],
    screeningRules: 'Lever ATS parses candidate skill graphs. Swiggy filters look for distributed backend languages (Go, Java), caching, and real-time streaming.'
  },
  {
    id: 'zomato',
    name: 'Zomato',
    shortName: 'Zomato',
    region: 'India (Gurgaon / NCR)',
    atsType: 'Greenhouse ATS',
    hiringFocus: 'Consumer app speed, search & recommendation relevance, quick commerce logistics (Blinkit), and high-scale backend reliability.',
    keyAttributes: [
      'High-scale backend architectures and asynchronous message queues',
      'Clean modular frontend architecture and lightning-fast user experience'
    ],
    screeningRules: 'Greenhouse ATS prioritizes candidates with proven product impact, consumer scale, and modern tech stacks (React, Node, Go, Python).'
  },
  {
    id: 'razorpay',
    name: 'Razorpay',
    shortName: 'Razorpay',
    region: 'India (Bengaluru)',
    atsType: 'Greenhouse ATS',
    hiringFocus: 'Fintech transaction security, 99.999% payment gateway uptime, banking integrations, and API design excellence.',
    keyAttributes: [
      'Fintech security, idempotency, distributed transactions, and PCI-DSS compliance',
      'Clean developer APIs, high-reliability architecture, and Go/Node.js microservices'
    ],
    screeningRules: 'Screens for high availability (99.99%+), distributed transaction management, idempotency, and secure API design.'
  },

  // --- Global MNCs & Tech Giants ---
  {
    id: 'google',
    name: 'Google',
    shortName: 'Google',
    region: 'Global / India (Bengaluru & Hyderabad)',
    atsType: 'Google Internal Hiring Platform',
    hiringFocus: 'Engineering excellence, algorithmic efficiency, distributed computing, and collaborative leadership.',
    keyAttributes: [
      'Algorithms and data structures mastery with computational complexity analysis',
      'Demonstrated impact using Google\'s X-Y-Z formula',
      'Large-scale distributed systems and high-throughput software architecture'
    ],
    screeningRules: 'Google recruiters evaluate resumes using the X-Y-Z formula: Accomplished [X] as measured by [Y], by doing [Z]. Clear metrics are mandatory.'
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    shortName: 'Microsoft',
    region: 'Global / India (Hyderabad & Bengaluru)',
    atsType: 'Microsoft Talent Portal / iCIMS',
    hiringFocus: 'Cloud infrastructure (Azure), enterprise software architecture, AI innovations, and customer-first design.',
    keyAttributes: [
      'Deep systems programming, Azure services, or full-stack web applications',
      'Collaborative cross-team engineering and clear technical design documentation',
      'Metrics demonstrating reliability, security, and developer productivity'
    ],
    screeningRules: 'iCIMS and Microsoft recruiters look for enterprise scalability, cloud architecture, and strong fundamentals in C#, Java, Python, or C++.'
  },
  {
    id: 'amazon',
    name: 'Amazon',
    shortName: 'Amazon',
    region: 'Global / India (Bengaluru, Hyderabad, Chennai)',
    atsType: 'Amazon Jobs Portal / Workday',
    hiringFocus: 'Amazon Leadership Principles (Customer Obsession, Ownership, Bias for Action, Deliver Results) and distributed cloud systems.',
    keyAttributes: [
      'Demonstrated ownership and measurable customer impact',
      'Deep experience with AWS services and distributed microservices',
      'Data-driven decision making and root cause analysis'
    ],
    screeningRules: 'Workday ATS parses resume bullets for metrics and action verbs that align with Amazon Leadership Principles.'
  }
];

// Special Niches & Regional Tech Hub Portals
export const SPECIAL_NICHES = [
  {
    slug: 'tcs-freshers',
    title: 'TCS Freshers Resume ATS Optimization',
    h1: 'TCS Freshers Resume ATS Checker & Placement Guide',
    seoTitle: 'TCS Freshers Resume ATS Checker & Keywords | PandaLime',
    seoDesc: 'Check your TCS Fresher resume against TCS iON ATS filters. Optimize for NQT, Ninja & Digital roles with academic project keywords and passing scores.',
    role: 'Fresher / Entry-Level Software Engineer',
    company: 'TCS',
    region: 'India Campus Hiring',
    salaryIndia: '₹3.6 LPA - ₹9 LPA (Ninja / Digital / Prime)',
    description: 'Optimize your entry-level resume for the TCS NQT and iON ATS screening. Highlight academic projects, core Java/C++/Python skills, and problem-solving certifications.',
    topKeywords: [
      'Core Java',
      'Python Fundamentals',
      'C / C++',
      'Object-Oriented Programming (OOP)',
      'Data Structures',
      'Database Management (DBMS)',
      'SQL Queries',
      'Academic Capstone Projects',
      'Git Basics',
      'Problem Solving Aptitude',
      'SDLC Fundamentals'
    ],
    overview: 'TCS campus and off-campus hiring filters rely on TCS NQT scores, academic project clarity, coding fundamentals, and verified technical skills. Standard single-column formatting is essential to pass TCS iON.',
    atsTips: [
      'Detail your final-year and semester projects with tech stacks, your specific role, and GitHub repository links.',
      'Explicitly list your academic aggregate percentage/CGPA if above criteria (60%+).',
      'Highlight coding platform handles (LeetCode, HackerRank, GeeksforGeeks) and score percentiles.'
    ],
    bulletExamples: [
      {
        before: 'Created a library management website for our college final year project.',
        after: 'Built full-stack Library Management System in Java Spring Boot and MySQL with role-based JWT authentication, tested across 500+ student records with 100% data integrity.',
        explanation: 'Transforms a generic college project into a concrete full-stack deliverable with specific tech stack and test validation.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Using multi-column or heavily graphical resume templates',
        fix: 'TCS iON parsers scramble text from Canva or two-column resumes. Use a clean, single-column standard layout.'
      },
      {
        mistake: 'Failing to list academic project technologies in detail',
        fix: 'Break down projects into Title, Technologies Used, Key Features, and GitHub Link.'
      }
    ]
  },
  {
    slug: 'infosys-roles',
    title: 'Infosys Specialist Programmer & SE Resume ATS Optimization',
    h1: 'Infosys SE & Specialist Programmer ATS Resume Checker',
    seoTitle: 'Infosys SE & SP ATS Resume Checker | PandaLime',
    seoDesc: 'Check your resume for Infosys InfyTQ, SE, DSE, and Specialist Programmer hiring. Optimize for Spring Boot, Java, microservices, and pass ATS filters.',
    role: 'Software Engineer & Specialist Programmer',
    company: 'Infosys',
    region: 'India Campus & Lateral Hiring',
    salaryIndia: '₹3.6 LPA - ₹9.5 LPA (SE / DSE / SP)',
    description: 'Tailor your resume for Infosys InfyTQ, HackWithInfy, and Specialist Programmer hiring ATS filters. Maximize keyword score for high-paying enterprise engineering bands.',
    topKeywords: [
      'Java 8/11/17',
      'Spring Boot',
      'Microservices',
      'RESTful APIs',
      'SQL / PostgreSQL',
      'Data Structures & Algorithms',
      'Cloud Fundamentals (AWS/Azure)',
      'Angular / React',
      'CI/CD Pipelines',
      'JUnit Testing',
      'Agile Methodologies',
      'Design Patterns'
    ],
    overview: 'Infosys hiring tracks like Specialist Programmer (SP) and Digital Specialist Engineer (DSE) look for advanced algorithmic problem solving, modern cloud-native frameworks, and microservices architecture.',
    atsTips: [
      'Highlight experience with Spring Boot, Microservices, and REST API development.',
      'Showcase your competitive programming achievements or InfyTQ / HackWithInfy rankings.',
      'Emphasize your unit testing and database indexing skills.'
    ],
    bulletExamples: [
      {
        before: 'Developed web services in Java for university project.',
        after: 'Engineered 10+ RESTful microservices using Java 17 and Spring Boot with PostgreSQL, implementing JUnit test suites achieving 88% code coverage.',
        explanation: 'Shows enterprise engineering standards, modern Java version, and unit test coverage.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Applying for Specialist Programmer without showing competitive programming or DSA depth',
        fix: 'Highlight LeetCode/CodeChef ratings, HackWithInfy rankings, and complex algorithms implemented in personal projects.'
      }
    ]
  },
  {
    slug: 'wipro-elite-nth',
    title: 'Wipro Elite NTH & Turbo Resume ATS Optimization',
    h1: 'Wipro Elite NTH & Turbo Resume ATS Checker',
    seoTitle: 'Wipro Elite NTH Resume ATS Checker & Guide | PandaLime',
    seoDesc: 'Check your resume for Wipro Elite NTH and Turbo hiring assessments. Optimize for core coding keywords, DBMS, capstone projects, and pass screening.',
    role: 'Project Engineer & Turbo Developer',
    company: 'Wipro',
    region: 'India Campus & Off-Campus',
    salaryIndia: '₹3.5 LPA - ₹6.5 LPA',
    description: 'Optimize your resume for Wipro Elite National Talent Hunt (NTH) and Turbo hiring filters. Score high on foundational coding and full-stack project keywords.',
    topKeywords: [
      'Java / C++',
      'Python Programming',
      'DBMS & SQL',
      'Data Structures',
      'Web Development Basics',
      'Cloud Fundamentals',
      'Software Testing',
      'Academic Capstone Project',
      'Aptitude & Logical Reasoning'
    ],
    overview: 'Wipro Elite and Turbo hiring algorithms prioritize strong foundational computer science subjects, error-free resume layout, and practical project implementation.',
    atsTips: [
      'Ensure standard single-column layout without complex columns or tables.',
      'Highlight software engineering internships and open-source contributions.'
    ],
    bulletExamples: [
      {
        before: 'Built an e-commerce website using Python and SQLite.',
        after: 'Developed responsive e-commerce web app using Python Django and SQLite, incorporating product search filters and user order management for 200+ simulated products.',
        explanation: 'Provides concrete scope and feature implementation details.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Missing academic eligibility criteria and graduation year',
        fix: 'Clearly state your Degree, Branch, Passing Year, and CGPA/Percentage at the top of your resume.'
      }
    ]
  },
  {
    slug: 'cognizant-genc',
    title: 'Cognizant GenC & GenC Next Resume ATS Optimization',
    h1: 'Cognizant GenC & GenC Next Resume ATS Checker',
    seoTitle: 'Cognizant GenC Resume ATS Checker & Keywords | PandaLime',
    seoDesc: 'Check your resume for Cognizant GenC, Elevate, and GenC Next hiring tracks. Optimize for full-stack, cloud, and programming keywords.',
    role: 'Programmer Analyst & Digital Engineer',
    company: 'Cognizant',
    region: 'India Campus & Off-Campus',
    salaryIndia: '₹4 LPA - ₹6.75 LPA',
    description: 'Tailor your resume for Cognizant GenC, GenC Elevate, and GenC Next hiring assessments. Highlight full stack development, cloud, and modern programming languages.',
    topKeywords: [
      'Java / Python',
      'Spring Boot / React',
      'SQL Database Queries',
      'Object Oriented Programming',
      'Cloud Concepts (AWS/Azure)',
      'Data Structures & Algorithms',
      'Git Version Control',
      'Agile Fundamentals'
    ],
    overview: 'Cognizant filters score candidates on digital readiness, full stack capability, and proven project execution.',
    atsTips: [
      'List hands-on project deliverables with metrics and technologies used.',
      'Include certifications from AWS, Microsoft, or HackerRank.'
    ],
    bulletExamples: [
      {
        before: 'Built a task management tool with React and Node.',
        after: 'Created full-stack task manager in React and Node.js with MongoDB database, featuring real-time task status updates and responsive mobile design.',
        explanation: 'Specifies the full MERN stack components and user-facing functionality.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Omitting cloud certifications',
        fix: 'Cognizant highly values entry-level cloud credentials like AWS Certified Cloud Practitioner or Azure Fundamentals (AZ-900).'
      }
    ]
  },
  {
    slug: 'bangalore-tech-jobs',
    title: 'Bengaluru Tech Jobs Resume ATS Optimization',
    h1: 'Bengaluru Tech Jobs ATS Resume Checker & Startup Guide',
    seoTitle: 'Bengaluru Tech Jobs ATS Resume Checker | PandaLime',
    seoDesc: 'Check your resume for top startups and GCCs in Bengaluru (Bangalore). Optimize for high-scale systems, Kafka, microservices, and land product company interviews.',
    role: 'Tech Professional / Software Engineer',
    company: 'Bengaluru Startups & GCCs',
    region: 'Bengaluru (Silicon Valley of India)',
    salaryIndia: '₹10 LPA - ₹45 LPA',
    description: 'Optimize your resume for top tech companies and high-growth startups in Bengaluru (Bangalore). Beat ATS algorithms at Swiggy, Flipkart, CRED, Razorpay, and global GCCs.',
    topKeywords: [
      'Scalable Microservices',
      'Distributed Systems',
      'System Design',
      'Kafka Event Streaming',
      'High QPS Scaling',
      'Golang / Java / Python',
      'React / TypeScript',
      'AWS / Kubernetes',
      'PostgreSQL / Redis'
    ],
    overview: 'Bengaluru tech recruiters and ATS filters place extreme weight on high-scale systems, rapid feature shipping, and modern cloud architectures.',
    atsTips: [
      'Showcase experience handling high-traffic and low-latency systems.',
      'Quantify your impact on revenue, user growth, or infrastructure cost optimization.'
    ],
    bulletExamples: [
      {
        before: 'Worked on backend services for food delivery app.',
        after: 'Engineered Golang microservices handling 12,000+ orders/minute during peak demand with Kafka event streaming and Redis caching, maintaining sub-80ms response times.',
        explanation: 'Provides exact scale metrics relevant to top Bangalore product companies.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Describing project tasks rather than high-scale system achievements',
        fix: 'Include peak QPS numbers, event throughput, latency benchmarks, and database sharding techniques.'
      }
    ]
  },
  {
    slug: 'hyderabad-tech-jobs',
    title: 'Hyderabad Tech Jobs Resume ATS Optimization',
    h1: 'Hyderabad Tech Jobs ATS Resume Checker & GCC Guide',
    seoTitle: 'Hyderabad Tech Jobs ATS Resume Checker | PandaLime',
    seoDesc: 'Check your resume for Microsoft IDC, Google, Amazon, and enterprise GCCs in Hyderabad. Optimize for cloud, distributed architecture, and pass ATS screens.',
    role: 'Software Engineer & Cloud Specialist',
    company: 'Hyderabad IT Hubs & MNCs',
    region: 'Hyderabad (Cyberabad / HITEC City)',
    salaryIndia: '₹9 LPA - ₹40 LPA',
    description: 'Tailor your resume for Microsoft IDC, Google Hyderabad, Amazon, and enterprise GCCs in HITEC City and Gachibowli.',
    topKeywords: [
      'Enterprise Java / .NET',
      'Cloud Migration (Azure/AWS)',
      'Distributed Architecture',
      'Data Pipelines',
      'Microservices',
      'REST APIs',
      'CI/CD Pipelines',
      'SQL / NoSQL Optimization'
    ],
    overview: 'Hyderabad tech employers look for deep enterprise software development, cloud platform expertise, and high-quality coding standards.',
    atsTips: [
      'Highlight enterprise cloud development and cross-team collaboration.',
      'Specify unit test coverage and automation frameworks.'
    ],
    bulletExamples: [
      {
        before: 'Migrated application from on-prem to cloud.',
        after: 'Led migration of legacy enterprise application to Microsoft Azure with Terraform IaC, improving disaster recovery RTO from 4 hours to 15 minutes.',
        explanation: 'Shows enterprise cloud migration skills and concrete disaster recovery SLA improvements.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Omitting enterprise design patterns and test coverage',
        fix: 'Feature unit test frameworks (JUnit, NUnit, PyTest) and design patterns (Factory, Observer, Repository).'
      }
    ]
  },
  {
    slug: 'pune-tech-jobs',
    title: 'Pune IT & Automotive Tech Resume ATS Optimization',
    h1: 'Pune IT & Automotive Tech ATS Resume Checker',
    seoTitle: 'Pune Tech Jobs ATS Resume Checker | PandaLime',
    seoDesc: 'Check your resume for Hinjawadi and Magarpatta IT parks and automotive tech centers in Pune. Optimize for Java, Spring Boot, cloud, and pass ATS screens.',
    role: 'Software Engineer & Embedded/Full Stack Developer',
    company: 'Pune IT Parks & GCCs',
    region: 'Pune (Hinjawadi & Magarpatta)',
    salaryIndia: '₹8 LPA - ₹35 LPA',
    description: 'Optimize your resume for Hinjawadi and Magarpatta IT companies, fintech centers, and automotive software hubs in Pune.',
    topKeywords: [
      'Java / Spring Boot',
      'Python / Django',
      'Automotive Software (AUTOSAR/C++)',
      'Cloud Solutions',
      'Fintech APIs',
      'Microservices',
      'PostgreSQL / Oracle',
      'DevOps & Docker'
    ],
    overview: 'Pune hiring filters evaluate strong software fundamentals, BFSI/fintech domain familiarity, and cloud architecture capabilities.',
    atsTips: [
      'Detail your backend architecture experience and database query tuning.',
      'Mention domain familiarity with finance, logistics, or automotive systems if applicable.'
    ],
    bulletExamples: [
      {
        before: 'Built financial payment modules in Spring Boot.',
        after: 'Developed secure payment processing microservices in Java Spring Boot with Oracle DB, processing ₹15 Crore monthly transaction volume with zero compliance breaches.',
        explanation: 'Demonstrates domain familiarity (Fintech/Banking) and transaction volume scale.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Failing to highlight domain expertise (Fintech, Automotive, Manufacturing)',
        fix: 'Mention industry standards, compliance protocols, and specific business flows.'
      }
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

  // 1. Check special niches first
  const special = SPECIAL_NICHES.find(n => n.slug === slug);
  if (special) {
    return {
      slug,
      title: special.seoTitle || `${special.title} | PandaLime`,
      h1: special.h1 || special.title,
      roleName: special.role,
      companyName: special.company,
      region: special.region || 'India / Global',
      category: 'Specialized Track & Regional Hub',
      salaryIndia: special.salaryIndia || 'Competitive',
      avgSalary: '$80,000 - $160,000',
      description: special.seoDesc || special.description,
      topKeywords: special.topKeywords,
      skillsByCategory: {
        'Core Technical Skills': special.topKeywords.slice(0, 5),
        'Frameworks & Practices': special.topKeywords.slice(5)
      },
      bulletExamples: special.bulletExamples || [
        {
          before: 'Worked on projects and solved problems.',
          after: 'Developed production-grade application using modern frameworks, tested across realistic datasets with verified quality benchmarks.',
          explanation: 'Demonstrates technical implementation with measurable outcomes.'
        }
      ],
      commonMistakes: special.commonMistakes || [
        {
          mistake: 'Using unreadable multi-column templates',
          fix: 'Stick to clean, single-column standard formatting with clear section headers.'
        }
      ],
      overview: special.overview,
      atsTips: special.atsTips,
      atsType: 'Enterprise Screening Portal / Campus ATS',
      hiringFocus: 'Core technical foundation, project clarity, and problem-solving agility.',
      isCombination: false
    };
  }

  // 2. Check role + company combinations (e.g. software-engineer-at-tcs, software-engineer-at-google)
  if (slug.includes('-at-')) {
    const [roleId, companyId] = slug.split('-at-');
    const role = ROLES.find(r => r.id === roleId);
    const company = COMPANIES.find(c => c.id === companyId);

    if (role && company) {
      const pageTitle = `${company.shortName || company.name} ${role.title} ATS Resume Checker | PandaLime`;
      const pageH1 = `${company.name} ${role.title} ATS Resume Scanner & Scoring Guide`;
      const pageDesc = `Check your ${role.title} resume for ${company.name} ATS screenings. Find required keywords for ${company.atsType}, see role-specific bullets, and land interviews.`;

      return {
        slug,
        title: pageTitle,
        h1: pageH1,
        roleName: role.title,
        roleId: role.id,
        companyName: company.name,
        companyShortName: company.shortName || company.name,
        companyId: company.id,
        region: company.region,
        category: role.category,
        salaryIndia: role.avgSalaryIndia,
        avgSalary: role.avgSalaryGlobal,
        description: pageDesc,
        topKeywords: role.topKeywords,
        skillsByCategory: role.skillsByCategory || {},
        bulletExamples: role.bulletExamples || [],
        commonMistakes: role.commonMistakes || [],
        overview: `${company.name} receives thousands of applications for ${role.title} positions. Applications are screened through ${company.atsType} to verify core technical proficiencies, project scale, and role alignment before reaching engineering managers.`,
        atsTips: [
          `Format your resume specifically for ${company.atsType} using clear standard section headers.`,
          ...role.atsTips
        ],
        atsType: company.atsType,
        hiringFocus: company.hiringFocus,
        keyAttributes: company.keyAttributes,
        screeningRules: company.screeningRules || `${company.name} screens for verified technical competencies, quantified project deliverables, and clean single-column formatting.`,
        faqs: [
          {
            q: `What ATS software does ${company.name} use for ${role.title} hiring?`,
            a: `${company.name} utilizes ${company.atsType} to parse incoming resumes, match candidate skills against job requisitions, and rank applicants for recruiter review.`
          },
          {
            q: `What keywords are required on a ${role.title} resume for ${company.name}?`,
            a: `Key proficiencies include ${role.topKeywords.slice(0, 6).join(', ')}, alongside demonstrated project architecture and quantified STAR-method accomplishments.`
          },
          {
            q: `What ATS score do I need to get an interview at ${company.name}?`,
            a: `Aim for an ATS match score of 75% or higher on PandaLime with zero critical missing technical skills to pass automated cutoffs at ${company.name}.`
          }
        ],
        isCombination: true
      };
    }
  }

  // 3. Check standalone role (e.g. software-engineer, data-scientist)
  const role = ROLES.find(r => r.id === slug);
  if (role) {
    return {
      slug,
      title: role.seoTitle || `${role.title} ATS Resume Checker & Keywords | PandaLime`,
      h1: role.h1 || `${role.title} ATS Resume Checker & Keyword Guide`,
      roleName: role.title,
      roleId: role.id,
      companyName: 'Top Tech Employers in India & Worldwide',
      companyShortName: 'Top Employers',
      companyId: null,
      region: 'India / Global',
      category: role.category,
      salaryIndia: role.avgSalaryIndia,
      avgSalary: role.avgSalaryGlobal,
      description: role.seoDesc || `Check your ${role.title} resume against ATS filters. Find missing technical keywords, see Google X-Y-Z bullet examples, and pass recruiter screenings.`,
      topKeywords: role.topKeywords,
      skillsByCategory: role.skillsByCategory || {},
      bulletExamples: role.bulletExamples || [],
      commonMistakes: role.commonMistakes || [],
      overview: role.overview,
      atsTips: role.atsTips,
      atsType: 'Workday, Taleo, TCS iON, Greenhouse, Lever, iCIMS',
      hiringFocus: 'Demonstrated domain expertise, quantified business impact, and technical tool proficiency.',
      keyAttributes: [
        'High keyword density for target technical competencies',
        'STAR-method quantified project accomplishments',
        'Clean ATS-readable single-column structure'
      ],
      faqs: role.faqs || [
        {
          q: `What keywords does the ATS look for in a ${role.title} resume?`,
          a: `For ${role.title} roles, applicant tracking systems scan for technical proficiencies like ${role.topKeywords.slice(0, 5).join(', ')}, alongside demonstrated project architecture and quantified STAR accomplishments.`
        }
      ],
      isCombination: false
    };
  }

  // 4. Fallback for custom / dynamic slug
  const formatted = slug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return {
    slug,
    title: `${formatted} ATS Resume Checker & Keywords | PandaLime`,
    h1: `${formatted} ATS Resume Checker & Keyword Guide`,
    roleName: formatted,
    roleId: slug,
    companyName: 'Top Tech Employers',
    companyShortName: 'Top Employers',
    companyId: null,
    region: 'India / Global',
    category: 'General Careers',
    salaryIndia: '₹6 LPA - ₹25 LPA',
    avgSalary: '$80,000 - $150,000',
    description: `Check your ${formatted} resume against job description ATS filters. Find missing keywords, format bullet points, and pass automated screenings.`,
    topKeywords: [
      'Domain Specific Keywords',
      'Technical Tools & Frameworks',
      'Quantified STAR Bullet Points',
      'Agile / Collaboration Workflows',
      'Problem Solving & Architecture',
      'Project Ownership & ROI'
    ],
    skillsByCategory: {
      'Core Competencies': ['Domain Specific Keywords', 'Technical Tools & Frameworks'],
      'Project & Delivery': ['Quantified STAR Bullet Points', 'Agile / Collaboration Workflows']
    },
    bulletExamples: [
      {
        before: 'Responsible for daily tasks and project deliverables.',
        after: 'Spearheaded key project initiatives resulting in 25% operational efficiency improvement across the department.',
        explanation: 'Uses strong action verbs and quantified impact metrics.'
      }
    ],
    commonMistakes: [
      {
        mistake: 'Using vague bullet points without numbers',
        fix: 'Add percentages, user volume, revenue impact, or time saved to every work experience bullet.'
      }
    ],
    overview: `Applicant Tracking Systems screen resumes for ${formatted} positions to evaluate candidate qualifications before recruiters review them. PandaLime checks your resume for role-specific keywords and clean formatting.`,
    atsTips: [
      'Tailor your bullet points directly to the target job description requirements.',
      'Quantify your results with percentages, scale metrics, and business outcomes.',
      'Use standard headings like Experience, Skills, Education, and Certifications.'
    ],
    atsType: 'Enterprise ATS Filters (Workday, Taleo, Greenhouse, Lever)',
    hiringFocus: 'Technical competency, verified career progression, and role-specific achievement.',
    keyAttributes: [
      'Accurate keyword alignment with job postings',
      'Clean formatting free of tables, text boxes, and complex graphics',
      'Action-oriented bullet points'
    ],
    faqs: [
      {
        q: `How do I pass the ATS screen for a ${formatted} role?`,
        a: `Upload your resume to PandaLime along with your target job description. Ensure all required skills and tools are explicitly mentioned in your work history with quantified outcomes.`
      }
    ],
    isCombination: false
  };
}
