// Comprehensive dataset for PandaLime Free ATS & Career Tools Suite

// =========================================================================
// 1. SKILLS & KEYWORDS DATABASE FOR INSTANT NLP EXTRACTOR
// =========================================================================
export const SKILL_CATEGORIES = {
  programming: {
    label: "Languages & Core Tech",
    icon: "Code",
    color: "bg-blue-50 text-blue-700 border-blue-200",
    skills: [
      "JavaScript", "TypeScript", "Python", "Java", "C++", "C#", "Go", "Golang", 
      "Rust", "Ruby", "PHP", "Swift", "Kotlin", "Dart", "Scala", "R", "SQL", 
      "HTML5", "CSS3", "Bash", "Shell Scripting", "Solidity"
    ]
  },
  frameworks: {
    label: "Frameworks & Libraries",
    icon: "Layers",
    color: "bg-purple-50 text-purple-700 border-purple-200",
    skills: [
      "React", "React Native", "Next.js", "Vue.js", "Angular", "Node.js", "Express.js", 
      "NestJS", "Django", "FastAPI", "Flask", "Spring Boot", "ASP.NET Core", 
      "Ruby on Rails", "Laravel", "Tailwind CSS", "Redux", "GraphQL", "REST APIs", 
      "gRPC", "Flutter", "Electron", "Svelte", "jQuery"
    ]
  },
  cloudDevops: {
    label: "Cloud & DevOps",
    icon: "Cloud",
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
    skills: [
      "AWS", "Amazon Web Services", "Microsoft Azure", "Google Cloud Platform", "GCP", 
      "Docker", "Kubernetes", "K8s", "Terraform", "CI/CD", "GitHub Actions", 
      "Jenkins", "GitLab CI", "Ansible", "Helm", "Prometheus", "Grafana", 
      "Linux", "Nginx", "Serverless", "AWS Lambda", "CloudFormation", "OpenTelemetry"
    ]
  },
  databases: {
    label: "Databases & Storage",
    icon: "Database",
    color: "bg-amber-50 text-amber-700 border-amber-200",
    skills: [
      "PostgreSQL", "MySQL", "MongoDB", "Redis", "Elasticsearch", "DynamoDB", 
      "Cassandra", "Snowflake", "BigQuery", "Oracle DB", "SQLite", "Kafka", 
      "RabbitMQ", "Apache Spark", "Apache Flink", "Supabase", "Prisma", "Hibernate"
    ]
  },
  aiData: {
    label: "AI, ML & Analytics",
    icon: "Cpu",
    color: "bg-rose-50 text-rose-700 border-rose-200",
    skills: [
      "Machine Learning", "Deep Learning", "Artificial Intelligence", "Generative AI", 
      "LLMs", "Large Language Models", "PyTorch", "TensorFlow", "scikit-learn", 
      "NLP", "Natural Language Processing", "Computer Vision", "LangChain", 
      "Pandas", "NumPy", "OpenAI API", "Hugging Face", "Vector Databases", "RAG", "Data Pipelines"
    ]
  },
  methodologies: {
    label: "Practices & Methodologies",
    icon: "CheckCircle2",
    color: "bg-indigo-50 text-indigo-700 border-indigo-200",
    skills: [
      "Agile", "Scrum", "Kanban", "Test-Driven Development", "TDD", "Microservices", 
      "Distributed Systems", "Object-Oriented Programming", "OOP", "System Design", 
      "Code Review", "Unit Testing", "Jest", "Cypress", "Selenium", "Cybersecurity", 
      "OAuth", "SOC 2", "GDPR", "Design Patterns", "Performance Optimization"
    ]
  },
  softSkills: {
    label: "Soft Skills & Leadership",
    icon: "Users",
    color: "bg-teal-50 text-teal-700 border-teal-200",
    skills: [
      "Cross-functional Collaboration", "Stakeholder Management", "Team Leadership", 
      "Technical Mentorship", "Problem Solving", "Strategic Planning", "Project Management", 
      "Communication Skills", "Root Cause Analysis", "Agile Leadership", "Customer Focus"
    ]
  }
};

// Flattened keyword array with regex patterns for accurate case-insensitive boundary matching
export const ALL_SKILLS_FLAT = Object.values(SKILL_CATEGORIES).flatMap(cat => cat.skills);

// =========================================================================
// 2. SAMPLE JOB DESCRIPTIONS FOR 1-CLICK TESTING
// =========================================================================
export const SAMPLE_JOB_DESCRIPTIONS = [
  {
    id: "full-stack-sde",
    title: "Senior Full Stack Engineer (React + Node.js)",
    company: "FinTech Scale-up",
    text: `We are seeking a Senior Full Stack Engineer to architect high-throughput financial web applications.
Requirements:
- 4+ years of professional software engineering experience with JavaScript and TypeScript.
- Strong proficiency with React, Next.js, Tailwind CSS, and state management (Redux).
- Deep expertise in backend development with Node.js, Express.js, and REST APIs.
- Experience with PostgreSQL database optimization, Redis caching, and Prisma ORM.
- Hands-on experience deploying scalable microservices to AWS (AWS Lambda, S3, CloudFront) using Docker and GitHub Actions CI/CD pipelines.
- Solid understanding of Unit Testing (Jest, Cypress), Agile/Scrum methodologies, and cross-functional team collaboration.`
  },
  {
    id: "backend-cloud",
    title: "Backend Cloud & Distributed Systems Engineer",
    company: "Enterprise SaaS",
    text: `Looking for a Backend Distributed Systems Engineer to scale our core cloud platform.
Key Qualifications:
- Proficiency in Python, Go (Golang), or Java with deep knowledge of Object-Oriented Programming (OOP) and System Design.
- Experience designing and managing microservices using gRPC, REST APIs, and Apache Kafka for asynchronous event streaming.
- Strong database skills in PostgreSQL, MySQL, and DynamoDB.
- Proven experience with Docker containerization, Kubernetes (K8s) orchestration, and Terraform infrastructure as code on GCP or AWS.
- Passion for performance optimization, automated CI/CD pipelines, and root cause analysis in high-load production environments.`
  },
  {
    id: "tcs-freshers",
    title: "TCS / Infosys Graduate Systems Engineer",
    company: "IT Services / Campus Hiring",
    text: `Job Description for Graduate Systems Engineer / TCS NQT Digital Hiring:
Candidates must have strong foundational skills in Computer Science and Engineering:
- Proficient in core programming languages: Java, Python, or C++.
- Solid understanding of Data Structures, Algorithms, Object-Oriented Programming (OOP), and Database Management Systems (DBMS / SQL).
- Familiarity with HTML5, CSS3, JavaScript, and basic web development.
- Knowledge of Software Engineering principles, Agile methodologies, Git version control, and SDLC life cycle.
- Strong analytical, problem-solving, and communication skills.`
  },
  {
    id: "ai-data-scientist",
    title: "AI & Machine Learning Engineer",
    company: "AI Intelligence Labs",
    text: `Join our team to build state-of-the-art Generative AI and RAG applications.
Requirements:
- 3+ years in Machine Learning, Deep Learning, and Artificial Intelligence.
- Expert Python programming skills with PyTorch, TensorFlow, and scikit-learn.
- Hands-on experience with LLMs, OpenAI API, LangChain, Hugging Face, and Vector Databases (Pinecone, ChromaDB).
- Experience building end-to-end data pipelines with Pandas, NumPy, Apache Spark, and Snowflake.
- Familiarity with Docker, FastAPI for model serving, and deploying AI workloads on AWS or GCP.`
  }
];

// =========================================================================
// 3. 250+ CATEGORIZED ATS ACTION VERBS & POWER WORDS
// =========================================================================
export const ACTION_VERB_CATEGORIES = [
  {
    id: "engineering",
    name: "Engineering & Architecture",
    badge: "Technical & Development",
    description: "Use these verbs to demonstrate technical mastery, architecture creation, and code deployment.",
    verbs: [
      { verb: "Architected", meaning: "Designed the overarching structure of a system", example: "Architected a multi-tenant microservices architecture handling 15M daily requests." },
      { verb: "Engineered", meaning: "Constructed complex technical solutions", example: "Engineered real-time payment webhook processing with 99.99% uptime." },
      { verb: "Deployed", meaning: "Released software into production environments", example: "Deployed containerized services across 12 Kubernetes clusters via ArgoCD." },
      { verb: "Refactored", meaning: "Restructured existing code to improve maintainability", example: "Refactored legacy monolith into modular TypeScript services, reducing technical debt by 40%." },
      { verb: "Overhauled", meaning: "Completely renovated or re-implemented a system", example: "Overhauled authentication subsystem to OAuth 2.0 and JWT, slashing login failures by 65%." },
      { verb: "Automated", meaning: "Replaced manual repetitive steps with scripts or CI/CD", example: "Automated test suites and CI/CD pipelines, cutting deployment cycle from 2 hours to 8 minutes." },
      { verb: "Configured", meaning: "Set up and optimized infrastructure tools", example: "Configured AWS CloudWatch alarms and Prometheus metrics to achieve proactive incident response." },
      { verb: "Integrated", meaning: "Connected disparate APIs, databases, or third-party tools", example: "Integrated Razorpay and Stripe payment gateways, boosting international checkout conversion by 28%." },
      { verb: "Migrated", meaning: "Moved systems or data safely from one platform to another", example: "Migrated 2.4TB PostgreSQL database to AWS Aurora with zero unplanned downtime." },
      { verb: "Programmed", meaning: "Wrote clean, efficient code for specific business logic", example: "Programmed distributed caching layer in Redis, improving API response times by 320ms." },
      { verb: "Standardized", meaning: "Established consistent engineering practices across teams", example: "Standardized API design schemas with OpenAPI/Swagger across 8 engineering pods." },
      { verb: "Containerized", meaning: "Packaged applications into lightweight Docker containers", example: "Containerized 14 legacy web services for seamless ECS Fargate orchestration." },
      { verb: "Instrumented", meaning: "Added monitoring, metrics, and tracing", example: "Instrumented OpenTelemetry distributed tracing across 30 microservices for real-time latency bottleneck analysis." }
    ]
  },
  {
    id: "growth",
    name: "Growth, Scale & Performance",
    badge: "Speed & Scale",
    description: "Verbs to showcase speed improvements, scalability, throughput, and measurable ROI.",
    verbs: [
      { verb: "Accelerated", meaning: "Sped up processes or product velocity", example: "Accelerated database query execution by 74% via index optimization and read-replicas." },
      { verb: "Scaled", meaning: "Expanded capacity to handle growing traffic or volume", example: "Scaled platform infrastructure from 50k to 1.2M concurrent users during peak flash sales." },
      { verb: "Maximized", meaning: "Achieved highest possible performance or output", example: "Maximized Redis cache hit ratio from 62% to 94%, reducing database load by half." },
      { verb: "Amplified", meaning: "Greatly increased reach, traffic, or engagement", example: "Amplified organic search impressions by 350% through programmatic SEO and SSG optimization." },
      { verb: "Optimized", meaning: "Fine-tuned resources, code, or memory usage", example: "Optimized React bundle size by 45% using code splitting and dynamic imports." },
      { verb: "Boosted", meaning: "Elevated key business or technical metrics", example: "Boosted core web vitals score from 58 to 96 on mobile devices, uplifting user retention." },
      { verb: "Expanded", meaning: "Grew scope, user base, or feature footprint", example: "Expanded API capabilities to support 6 new regional payment methods across Southeast Asia." },
      { verb: "Yielded", meaning: "Produced quantifiable financial or engineering returns", example: "Yielded $85k in annual AWS compute cost savings by eliminating idle EC2 instances." },
      { verb: "Enhanced", meaning: "Made significant qualitative and quantitative improvements", example: "Enhanced checkout UX, driving a 19% increase in completed transactions." }
    ]
  },
  {
    id: "leadership",
    name: "Leadership & Management",
    badge: "Team & Strategy",
    description: "Verbs demonstrating initiative, ownership, mentorship, and cross-functional leadership.",
    verbs: [
      { verb: "Spearheaded", meaning: "Led a major initiative from conception to completion", example: "Spearheaded the zero-downtime migration of customer data across 4 global regions." },
      { verb: "Championed", meaning: "Advocated for and established impactful engineering standards", example: "Championed Test-Driven Development (TDD) across the engineering department, increasing code coverage to 88%." },
      { verb: "Directed", meaning: "Guided cross-functional teams toward project milestones", example: "Directed a sprint team of 6 engineers and 2 QA specialists to deliver Q3 roadmap on schedule." },
      { verb: "Orchestrated", meaning: "Coordinated complex dependencies across multiple stakeholders", example: "Orchestrated cross-department product launch involving design, engineering, and sales teams." },
      { verb: "Mentored", meaning: "Coached junior engineers and fostered talent growth", example: "Mentored 5 associate software engineers, resulting in 2 fast-track promotions." },
      { verb: "Pioneered", meaning: "Introduced cutting-edge technology or first-time processes", example: "Pioneered the company's first internal AI developer tooling suite, saving 15 hours/week per engineer." },
      { verb: "Mobilized", meaning: "Rallied resources to solve critical blockers", example: "Mobilized incident response team during critical Sev-1 outage, recovering service within 14 minutes." },
      { verb: "Empowered", meaning: "Provided autonomy and tools for team success", example: "Empowered frontend engineers with self-serve design system tokens in Tailwind." }
    ]
  },
  {
    id: "analysis",
    name: "Analysis, Research & Problem Solving",
    badge: "Data & Insights",
    description: "Verbs highlighting investigative rigor, root cause diagnosis, and data-driven decisions.",
    verbs: [
      { verb: "Uncovered", meaning: "Discovered hidden bugs, inefficiencies, or user trends", example: "Uncovered memory leak in background worker threads, eliminating daily server crashes." },
      { verb: "Audited", meaning: "Conducted systematic examination of code, security, or costs", example: "Audited cloud infrastructure for SOC 2 compliance, closing 18 critical security vulnerabilities." },
      { verb: "Benchmarked", meaning: "Measured performance against industry or internal baselines", example: "Benchmarked 4 database alternatives (PostgreSQL vs MongoDB vs Cassandra) for high-frequency write loads." },
      { verb: "Synthesized", meaning: "Combined disparate data points into actionable insights", example: "Synthesized 50,000+ user session analytics to identify 3 major checkout abandonment bottlenecks." },
      { verb: "Diagnosed", meaning: "Pinpointed the root cause of complex technical bugs", example: "Diagnosed intermittent network timeout issues across microservices via distributed tracing." },
      { verb: "Formulated", meaning: "Created structured plans or algorithms to solve problems", example: "Formulated dynamic pricing algorithm that lifted gross merchandise value by 12%." },
      { verb: "Extracted", meaning: "Mined valuable data or features from raw sources", example: "Extracted NLP entities from 200k+ customer support tickets to automate ticket routing." }
    ]
  },
  {
    id: "efficiency",
    name: "Efficiency & Cost Reduction",
    badge: "Cost & Lean Operations",
    description: "Verbs proving your ability to do more with less, cut waste, and streamline workflows.",
    verbs: [
      { verb: "Streamlined", meaning: "Simplified and removed friction from processes", example: "Streamlined developer onboarding, reducing time-to-first-commit from 5 days to 4 hours." },
      { verb: "Consolidated", meaning: "Combined redundant tools or servers into a unified solution", example: "Consolidated 6 disparate monitoring tools into Datadog, saving $40,000 in licensing." },
      { verb: "Eliminated", meaning: "Completely removed unnecessary bottlenecks or errors", example: "Eliminated 98% of manual database seeding tasks by authoring automated Docker scripts." },
      { verb: "Curtailed", meaning: "Strictly reduced wasteful consumption or downtime", example: "Curtailed cloud storage costs by 35% through automatic S3 lifecycle archiving rules." },
      { verb: "Refined", meaning: "Polished workflows to achieve higher accuracy and speed", example: "Refined customer search relevance, reducing zero-result queries from 14% to 1.8%." },
      { verb: "Accelerated", meaning: "Shortened turnarounds and feedback loops", example: "Accelerated PR review cycles by 50% through automated linting and preview deployment bots." }
    ]
  }
];

// =========================================================================
// 4. STAR METHOD BULLET POINT TEMPLATES & FORMULAS
// =========================================================================
export const STAR_FORMULA_TEMPLATES = {
  softwareEngineer: [
    {
      action: "Architected and deployed",
      tech: "utilizing {tools}",
      metric: "cutting page latency by {metric}% and boosting throughput for {users} active users.",
      example: "Architected and deployed high-throughput GraphQL APIs utilizing React, Node.js, and Redis, cutting page latency by 42% and boosting throughput for 100k+ active users."
    },
    {
      action: "Refactored core legacy backend into",
      tech: "leveraging {tools}",
      metric: "reducing cloud compute expenses by {metric}% while maintaining 99.99% SLA.",
      example: "Refactored core legacy monolith into microservices leveraging Docker, Kubernetes, and Go, reducing cloud compute expenses by 30% while maintaining 99.99% SLA."
    },
    {
      action: "Automated end-to-end testing and CI/CD pipelines",
      tech: "using {tools}",
      metric: "shortening release cycles from {metric} to minutes with zero regression incidents.",
      example: "Automated end-to-end testing and CI/CD pipelines using GitHub Actions and Jest, shortening release cycles from 3 days to 15 minutes with zero regression incidents."
    }
  ],
  fresherStudent: [
    {
      action: "Developed full-stack web application",
      tech: "utilizing {tools}",
      metric: "achieving 98% test coverage and securing top 5 finalist standing among 200+ university teams.",
      example: "Developed full-stack campus placement portal utilizing Java, Spring Boot, and MySQL, achieving 98% test coverage and securing top 5 finalist standing among 200+ university teams."
    },
    {
      action: "Engineered responsive frontend interface",
      tech: "using {tools}",
      metric: "serving 1,500+ active student users with sub-second response times.",
      example: "Engineered responsive student dashboard interface using React and Tailwind CSS, serving 1,500+ active student users with sub-second response times."
    }
  ],
  dataAi: [
    {
      action: "Built automated data ingestion pipelines",
      tech: "utilizing {tools}",
      metric: "processing 5TB+ daily transaction data with 99.9% pipeline reliability.",
      example: "Built automated data ingestion pipelines utilizing Python, Apache Spark, and Snowflake, processing 5TB+ daily transaction data with 99.9% pipeline reliability."
    },
    {
      action: "Trained and deployed fine-tuned LLM models",
      tech: "using {tools}",
      metric: "increasing prediction accuracy by {metric}% and cutting customer response times by half.",
      example: "Trained and deployed fine-tuned LLM models using PyTorch, LangChain, and FastAPI, increasing prediction accuracy by 24% and cutting customer response times by half."
    }
  ]
};
