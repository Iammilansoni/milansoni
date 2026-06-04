export const SITE = {
  name: "Milan Soni",
  title: "Milan Soni — AI Engineer & Full Stack Developer",
  description:
    "Milan Soni is a Full Stack + AI Developer building production RAG pipelines, agentic AI workflows, and scalable MERN apps. SIH 2023 National Winner. Scopus-indexed researcher. 2026 CS Graduate from Jaipur, India.",
  email: "milansoni96946@gmail.com",
  location: "Churu (Rajasthan)",
  socials: {
    github: "https://github.com/Iammilansoni",
    linkedin: "https://www.linkedin.com/in/sonimilan/",
    medium: "https://medium.com/@milansoni96946",
    instagram: "https://www.instagram.com/iammilansoni",
    email: "mailto:milansoni96946@gmail.com",
  },
} as const;

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/work", label: "Projects" },
  { to: "/research", label: "Publications" },
  { to: "/lab", label: "AI Lab" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
] as const;

export type Project = {
  slug: string;
  name: string;
  tag: string;
  blurb: string;
  description: string;
  metrics: { value: string; label: string }[];
  tech: string[];
  problem: string;
  solution: string;
  architecture: string[];
  tradeoffs?: string[];
  results: string;
  githubUrl?: string;
  demoUrl?: string;
  heroImage?: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "miningniti",
    name: "MiningNiti",
    tag: "🏆 SIH 2023 National Winner",
    blurb:
      "Enterprise-Grade AI Document Intelligence Platform built for the Ministry of Coal.",
    description:
      "A retrieval-augmented intelligence platform that transforms mining operations with intelligent document processing, safety compliance analysis, and AI-powered knowledge extraction using a Multi-Agent system.",
    metrics: [
      { value: "44k+", label: "Teams Defeated" },
      { value: "5", label: "Specialized Agents" },
      { value: "FastAPI", label: "Microservice Core" },
    ],
    tech: ["Next.js 15", "FastAPI", "PostgreSQL", "pgvector", "Gemini 2.0", "Redis", "Docker"],
    problem:
      "Coal mining operations handle thousands of critical documents: MSHA regulations, safety protocols, environmental reports, and incident investigations. Finding specific information quickly can be the difference between compliance and violation, or even life and death.",
    solution:
      "We built a Multi-Agent AI System powered by Gemini 2.0 Flash and pgvector. Specialized agents (Classifier, Safety Analyzer, Entity Extractor, Summarizer) work concurrently, orchestrated by a FastAPI backend to deliver real-time compliance checks, risk scoring, and a citation-first RAG chat.",
    architecture: [
      "Frontend: Next.js 15 dashboard for real-time safety scores and RAG-powered chat.",
      "API Gateway: FastAPI routing requests with Clerk JWT verification and RBAC.",
      "AI Layer: Parallel execution via Orchestrator managing 4 specialized domain agents.",
      "Database: PostgreSQL + pgvector for semantic caching and document embeddings.",
      "Queueing: Celery + Redis for distributed background processing of large documents.",
    ],
    tradeoffs: [
      "PostgreSQL + pgvector over dedicated vector DBs: Chose pgvector to maintain ACID compliance with our relational document metadata and simplify infrastructure, accepting a slight latency trade-off.",
      "FastAPI over Next.js API Routes: Required heavy Python ML libraries (LangChain, Celery) for the multi-agent system which Serverless Node.js struggles to support efficiently.",
      "Redis + Celery over Serverless Functions: Document parsing (OCR) takes several minutes. Serverless functions timeout after 15-60s, necessitating a persistent background worker architecture."
    ],
    results:
      "Won the Smart India Hackathon (SIH) 2023 National Finale out of 44,000+ competing teams. The platform is an enterprise-ready solution that automatically flags compliance hazards and extracts mission-critical entities.",
    githubUrl: "https://github.com/Iammilansoni/MiningNiti",
    demoUrl: "https://miningniti.vercel.app/",
    heroImage: "/miningniti-dashboard.png",
  },
  {
    slug: "nlpforge-tester",
    name: "NLPForge",
    tag: "Enterprise AI NLP Platform",
    blurb:
      "AI-Powered NLP Dataset Generator & Semantic Search Platform.",
    description:
      "An enterprise-grade platform that bridges the gap between natural language and API testing. It processes plain English through a two-stage retrieval pipeline to produce structured, executable API test cases.",
    metrics: [
      { value: "Two-Stage", label: "Retrieval Pipeline" },
      { value: "8", label: "LLM Providers Supported" },
      { value: "Async", label: "Python Core" },
    ],
    tech: ["Next.js 16", "FastAPI", "Redis Vector", "FlashRank", "Ollama", "Docker"],
    problem:
      "Writing manual API test cases is tedious and doesn't scale. QA teams struggle to cover edge cases, and mapping natural language requirements into structured API payloads is slow and error-prone.",
    solution:
      "Built a platform that uses a fast KNN vector search in Redis followed by a FlashRank cross-encoder neural re-ranking pipeline to accurately match natural language queries to API templates, extracting payload slots via LLMs.",
    architecture: [
      "Frontend: Next.js 16 App Router SPA with TanStack Query and Framer Motion.",
      "Backend: Async FastAPI server with SQLAlchemy 2.0 and PostgreSQL 15.",
      "Stage 1 Retrieval: Ollama embedding model into Redis Stack (HNSW index) for KNN similarity search.",
      "Stage 2 Re-ranking: FlashRank (ms-marco-MiniLM-L-12-v2) for precise neural cross-encoder scoring.",
      "Extraction: LLM slot filling supporting 8 providers (OpenAI, Gemini, Anthropic, etc.)."
    ],
    tradeoffs: [
      "Two-Stage Retrieval vs Single-Stage: Added FlashRank re-ranking latency but drastically improved natural language to API mapping accuracy.",
      "Ollama Local Embeddings vs Cloud APIs: Chose local nomic-embed-text via Ollama to eliminate embedding API costs and preserve enterprise data privacy.",
      "Redis HNSW vs Pinecone: Hosted vector storage locally in Redis Stack alongside caching to reduce infrastructure complexity and vendor lock-in."
    ],
    results:
      "Empowered product teams to generate 1000s of synthetic test datasets (70% valid, 20% edge, 10% extreme) and evaluate LLM features in real-time before shipping.",
    githubUrl: "https://github.com/Iammilansoni/NLPFT-2",
    heroImage: "/nlpforge-ui.png",
  },
  {
    slug: "finsageai360",
    name: "FinSageAI360",
    tag: "AI Financial Intelligence Platform",
    blurb:
      "Real-time financial intelligence dashboard built at OBG Outsourcing.",
    description:
      "A multi-tenant SaaS that ingests accounting feeds, normalises them, and surfaces AI-generated cashflow, risk, and anomaly insights.",
    metrics: [
      { value: "+45%", label: "Faster report cycles" },
      { value: "+30%", label: "Operational efficiency" },
      { value: "RBAC", label: "Enterprise-grade" },
    ],
    tech: ["Next.js", "Node.js", "MongoDB", "Prisma", "JWT", "AI Analytics"],
    problem:
      "Mid-market finance teams patch reports together in spreadsheets, losing days every month and missing anomalies entirely.",
    solution:
      "A Next.js + Node.js platform with JWT auth, granular RBAC, and AI-driven anomaly detection over normalised ledger data, exposed through interactive analytics dashboards.",
    architecture: [
      "Multi-tenant data model on MongoDB via Prisma",
      "Stream ingestion of accounting feeds",
      "AI analytics layer for cashflow and anomaly detection",
      "Role-based dashboards with audit trails",
    ],
    results:
      "Cut monthly close reporting time by 45% and surfaced anomalies that were previously missed entirely.",
  },
  {
    slug: "smartlearnx",
    name: "SmartLearnX",
    tag: "Freelance Project",
    blurb:
      "A next-generation AI-powered LMS designed to transform online education into a personalized, intelligent, and data-driven learning experience.",
    description:
      "An adaptive educational ecosystem integrating AI, ML, NLP, and modern full-stack web technologies to enhance learning outcomes and reduce administrative workload through personalized course recommendations, dropout prediction, and AI-powered assessments.",
    metrics: [
      { value: "91.4%", label: "Dropout Prediction Accuracy" },
      { value: "0.89", label: "R² Forecasting Score" },
      { value: "24/7", label: "NLP Chatbot Support" },
    ],
    tech: ["React", "TypeScript", "Node.js", "FastAPI", "MongoDB", "Redis", "Docker", "Machine Learning"],
    problem:
      "Conventional LMS platforms provide static learning content, limited personalization, minimal learner engagement tracking, and lack predictive capabilities, leading to higher student dropout rates.",
    solution:
      "Implemented an AI-powered personalized learning system that analyzes user behavior to generate adaptive learning paths. Included machine learning-based dropout prediction (Logistic Regression) and academic performance forecasting (Random Forest).",
    architecture: [
      "Frontend: React and TypeScript SPA with comprehensive analytics dashboards and gamification elements.",
      "Backend: Node.js and Express server with a Python FastAPI-based AI/ML microservice for heavy analytics.",
      "Database & Queue: MongoDB for primary data, Redis and BullMQ for caching and background job processing.",
      "AI Layer: NLP-powered quiz generation via BERT and an intelligent virtual chatbot assistant (spaCy).",
      "Infrastructure: Docker containerization and Nginx reverse proxy for load balancing and secure deployment."
    ],
    tradeoffs: [
      "Microservices vs Monolith: Split AI/ML tasks into a dedicated FastAPI microservice to prevent blocking the Node.js backend during heavy NLP execution.",
      "ML vs Heuristics: Used Logistic Regression for dropout prediction, accepting training overhead to achieve significant long-term accuracy (91.4%)."
    ],
    results:
      "Successfully maintained response times below 2 seconds under high load. The ML dropout prediction model achieved an accuracy of 91.4%, and the academic performance forecasting model achieved an R² score of 0.89, validating the intelligent ecosystem.",
  },
];


export const EXPERIENCE = [
  {
    company: "nTheta Works Pvt. Ltd.",
    role: "Full Stack Developer Intern",
    period: "Oct – Dec 2025",
    location: "Remote",
    highlights: [
      "Architected FastAPI microservices + Next.js / TypeScript dashboards for NLPForge-Tester, an enterprise LLM API testing platform",
      "Containerized via Docker with automated CI/CD pipelines on Linux servers",
      "Engineered two-stage semantic retrieval (Redis Vector DB + FlashRank neural re-ranking) — improved template matching by 40% and cut manual QA effort by ~60%",
    ],
  },
  {
    company: "Freelance Client",
    role: "AI & Full Stack Developer",
    period: "Jul 2025 – Aug 2025",
    location: "Remote",
    highlights: [
      "Architected SmartLearnX, an AI-powered Learning Management System utilizing React, Node.js, and FastAPI microservices",
      "Engineered a dropout prediction model (Logistic Regression, 91.4% accuracy) and academic forecasting system (Random Forest, 0.89 R²)",
      "Integrated NLP features (BERT, spaCy) for automated quiz generation and a 24/7 intelligent virtual chatbot assistant",
    ],
  },
  {
    company: "OBG Outsourcing Pvt. Ltd.",
    role: "Full Stack Developer Intern",
    period: "May – Jul 2025",
    location: "Jaipur",
    highlights: [
      "Led FinSageAI360, an AI-driven financial intelligence platform (Next.js, Redux, Tailwind CSS, Prisma ORM) with real-time KPI dashboards",
      "Designed secure REST API backend (Node.js + Express.js + MongoDB) with JWT auth and RBAC",
      "Reduced manual operational effort by 30% and accelerated financial report generation by 45%",
    ],
  },
  {
    company: "Om Logistics Ltd.",
    role: "Software Developer Intern",
    period: "Jun – Aug 2024",
    location: "Delhi",
    highlights: [
      "Optimized enterprise document search via LangChain + FAISS vector embeddings — reduced query latency by 70% across 10,000+ documents",
      "Designed and integrated RESTful APIs (Node.js) to automate logistics workflows",
      "Improved retrieval accuracy by 40% and eliminated 20% of manual data-entry tasks",
    ],
  },
] as const;

export const STATS = [
  { value: "44,000+", label: "Teams competed against" },
  { value: "#1", label: "National rank — SIH 2023" },
  { value: "40+", label: "Public GitHub repos" },
  { value: "10,000+", label: "Documents processed in RAG" },
  { value: "3", label: "Enterprise internships" },
  { value: "70%", label: "Query latency reduction (Om Logistics)" },
] as const;

export const TECH_STACK = {
  Languages: ["JavaScript (ES6+)", "TypeScript", "Python", "C++"],
  Frontend: ["React.js", "Next.js", "Redux", "Tailwind CSS", "HTML5 / CSS3"],
  Backend: ["Node.js", "Express.js", "FastAPI", "REST APIs", "GraphQL", "JWT", "OAuth 2.0", "RBAC", "Microservices"],
  "AI / ML": ["LangChain", "LangGraph", "LLMs", "RAG Pipelines", "Prompt Engineering", "Vector Embeddings", "FAISS", "AI Agents"],
  Databases: ["MongoDB", "PostgreSQL", "Redis Vector DB", "Prisma ORM", "Firebase"],
  "Cloud / DevOps": ["AWS (EC2, S3, Lambda)", "Docker", "CI/CD", "Vercel", "Linux", "Git"],
} as const;
