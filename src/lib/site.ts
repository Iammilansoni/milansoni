export const SITE = {
  name: "Milan Soni",
  title: "Milan Soni — AI Engineer & Full Stack Developer",
  description:
    "Milan Soni is a Full Stack + AI Developer building production RAG pipelines, multi-agent AI systems, and scalable enterprise platforms. SIH 2023 National Winner (Coal India & CMPDI). Scopus-indexed researcher. 6 AI agents deployed across 4 providers. $0/month infrastructure.",
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
    tag: "🏆 SIH 2023 National Winner · Recognized by Coal India Limited & CMPDI",
    blurb:
      "AI-Powered Document Intelligence for the Mining Industry — transforming thousands of fragmented PDFs into an instantly queryable, citation-backed source of truth.",
    description:
      "A full-stack AI platform that combines a multi-agent AI pipeline (6 specialized agents across 4 AI providers) with production-grade RAG (hybrid search + cross-encoder reranking) and real-time compliance auditing. Built for the Ministry of Coal to manage safety documentation, regulatory compliance, and institutional knowledge across coal mining operations.",
    metrics: [
      { value: "6", label: "Specialized AI Agents" },
      { value: "4", label: "AI Providers (Free Tiers)" },
      { value: "$0/mo", label: "Infrastructure Cost" },
    ],
    tech: ["Next.js 16", "React 19", "FastAPI", "PostgreSQL + pgvector", "Supabase", "Upstash Redis", "Clerk Auth", "Groq", "Cerebras", "Mistral", "Gemini", "Docker"],
    problem:
      "Coal mining operations generate thousands of critical documents — MSHA regulations, equipment manuals, safety protocols, environmental impact assessments, and incident investigations. Information is fragmented across PDFs and siloated databases. Compliance risk is high: missing a regulation update can mean violations, fines, or lives. Finding a specific clause across 500 pages takes hours.",
    solution:
      "Deployed 6 specialized AI agents that run concurrently via asyncio: Classifier (Groq/Llama 3.3), Safety Analyzer (Mistral/Magistral), Entity Extractor (Cerebras/GPT-OSS-120B), Summarizer (Cerebras), Compliance Auditor (Gemini), orchestrated by a FastAPI backend. The RAG pipeline uses hybrid search (pgvector cosine + pg_trgm BM25) combined via Reciprocal Rank Fusion, followed by ms-marco-MiniLM-L-6-v2 cross-encoder reranking for precise Top-5 chunk retrieval.",
    architecture: [
      "Frontend: Next.js 16 + React 19 dashboard with Clerk auth, Framer Motion animations, Recharts analytics, and react-pdf viewer.",
      "API Gateway: FastAPI 0.128 with Clerk JWT verification, slowapi rate limiting, and Pydantic v2 validation.",
      "AI Agent Layer: 6 parallel agents (Classifier, Safety Analyzer, Entity Extractor, Summarizer, Compliance Auditor, Orchestrator) across Groq, Mistral, Cerebras, and Gemini.",
      "RAG Pipeline: Hybrid search (pgvector + pg_trgm BM25) → Reciprocal Rank Fusion → ms-marco-MiniLM-L-6-v2 cross-encoder reranking → Top-5 chunks → LLM generation.",
      "Database: Supabase PostgreSQL + pgvector (HNSW index) for embeddings + pg_trgm for keyword matching.",
      "Cache: Upstash Redis for session caching and background job queuing.",
    ],
    tradeoffs: [
      "Supabase pgvector over Pinecone/Weaviate: Chose Supabase for free-tier PostgreSQL + pgvector to maintain ACID compliance with relational document metadata and eliminate vendor lock-in.",
      "4 AI Providers over Single Provider: Distributed agents across Groq, Cerebras, Mistral, and Gemini to maximize free-tier quotas (14,400+ requests/day combined) and enable automatic fallback.",
      "Hybrid Search over Pure Vector: Added BM25 keyword matching alongside cosine similarity via Reciprocal Rank Fusion — crucial for mining domain where exact regulation numbers matter.",
    ],
    results:
      "Won Smart India Hackathon 2023 National Finale for the Ministry of Coal. Recognized by Coal India Limited & CMPDI. Enterprise-ready platform that auto-classifies documents, detects hazards, extracts entities, and provides citation-backed RAG chat — all on $0/month infrastructure using free tiers.",
    githubUrl: "https://github.com/Iammilansoni/MiningNiti",
    demoUrl: "https://miningniti.vercel.app/",
    heroImage: "/miningniti-dashboard.png",
  },
  {
    slug: "nlpforge-tester",
    name: "NLPForge",
    tag: "Enterprise AI NLP Platform",
    blurb:
      "AI-Powered NLP Dataset Generator & Semantic Search Platform — transforming natural language queries into executable API test cases.",
    description:
      "An enterprise-grade platform that bridges the gap between natural language and API testing. Describe what you want to test in plain English, and NLPForge processes your request through a two-stage retrieval pipeline (KNN vector similarity + FlashRank neural re-ranking) to produce structured, executable API test cases with slot extraction via LLMs.",
    metrics: [
      { value: "Two-Stage", label: "Retrieval Pipeline" },
      { value: "8", label: "LLM Providers" },
      { value: "15+", label: "Embedding Models" },
    ],
    tech: ["Next.js 16", "FastAPI", "SQLAlchemy 2.0", "PostgreSQL 15", "Redis Stack 7.2", "FlashRank", "Ollama", "Docker", "TanStack Query", "Framer Motion"],
    problem:
      "Writing manual API test cases is tedious and doesn't scale. QA teams struggle to cover edge cases, and mapping natural language requirements into structured API payloads is slow and error-prone. Existing tools require deep technical knowledge of API schemas.",
    solution:
      "Built a two-stage retrieval pipeline: Stage 1 uses Ollama embeddings (nomic-embed-text) stored in Redis Stack HNSW indexes for fast KNN vector similarity search (Top-5 candidates). Stage 2 applies FlashRank cross-encoder (ms-marco-MiniLM-L-12-v2) for precise neural re-ranking. LLM-powered slot extraction supports 8 providers (OpenAI, Gemini, Anthropic, Grok, DeepSeek, Ollama, HuggingFace, Custom) to generate structured JSON payloads.",
    architecture: [
      "Frontend: Next.js 16 App Router SPA with TanStack Query v5, Framer Motion animations, and Radix UI components.",
      "Backend: Async FastAPI 0.123+ with SQLAlchemy 2.0 (async), Pydantic v2 validation, and full asyncio architecture.",
      "Stage 1 Retrieval: Ollama embedding models (15+ options) → Redis Stack 7.2 HNSW indexes for KNN similarity search.",
      "Stage 2 Re-ranking: FlashRank (ms-marco-MiniLM-L-12-v2) cross-encoder for precise pairwise scoring.",
      "Dataset Generation: AI-powered synthetic data across 8 LLM providers with 70% valid, 20% edge, 10% extreme distribution.",
      "Infrastructure: Docker Compose orchestration with health checks on PostgreSQL, Redis, Ollama, Backend, and Frontend.",
    ],
    tradeoffs: [
      "Two-Stage Retrieval vs Single-Stage: Added FlashRank re-ranking latency (~50ms) but improved NL-to-API mapping accuracy by 40% — critical for enterprise adoption.",
      "Ollama Local Embeddings vs Cloud APIs: Chose local nomic-embed-text via Ollama to eliminate embedding API costs ($0/month) and preserve enterprise data privacy.",
      "Redis HNSW vs Dedicated Vector DB: Hosted vector storage in Redis Stack alongside caching to reduce infrastructure complexity — single store for vectors, sessions, and queues.",
    ],
    results:
      "Empowered product teams to generate 1000s of synthetic test datasets (70% valid, 20% edge, 10% extreme) and evaluate LLM features in real-time. Reduced manual QA effort by ~60% and improved template matching accuracy by 40%.",
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
  { value: "6", label: "AI Agents in MiningNiti" },
  { value: "4", label: "AI Providers (Free Tiers)" },
  { value: "$0", label: "Monthly Infrastructure Cost" },
  { value: "40+", label: "Public GitHub Repos" },
  { value: "3", label: "Enterprise Internships" },
  { value: "70%", label: "Query Latency Reduction" },
] as const;

export const TECH_STACK = {
  Languages: ["JavaScript (ES6+)", "TypeScript", "Python", "C++"],
  Frontend: ["React 19", "Next.js 16", "Redux", "Tailwind CSS v4", "Framer Motion", "Recharts", "Radix UI / shadcn"],
  Backend: ["FastAPI 0.128", "Node.js", "Express.js", "SQLAlchemy 2.0", "Pydantic v2", "REST APIs", "GraphQL", "JWT", "Clerk Auth", "RBAC", "Microservices"],
  "AI / ML": ["LangChain", "LangGraph", "RAG Pipelines", "Hybrid Search (Vector + BM25)", "Cross-Encoder Reranking", "FlashRank", "Ollama", "AI Agents", "Prompt Engineering", "Vector Embeddings", "pgvector"],
  "LLM Providers": ["Groq (Llama 3.3)", "Cerebras (GPT-OSS-120B)", "Mistral (Magistral)", "Google Gemini", "OpenAI", "Anthropic", "DeepSeek", "HuggingFace"],
  Databases: ["PostgreSQL + pgvector", "Supabase", "MongoDB", "Redis Stack 7.2 (HNSW)", "Upstash Redis", "Prisma ORM"],
  "Cloud / DevOps": ["Vercel", "HuggingFace Spaces", "Docker Compose", "GitHub Actions CI/CD", "Linux", "Git"],
} as const;
