export const SITE = {
  name: "Milan Soni",
  title: "Milan Soni — AI Engineer & Full Stack Developer",
  description:
    "AI Engineer and Full Stack Developer building production RAG pipelines, multi-agent orchestration systems, and multi-provider LLM infrastructure. Shipped code to a 50k★ open-source AI gateway (5+ PRs merged, 21,000+ tests), rebuilt solo the Ministry of Coal document-intelligence platform a team of us won SIH 2023 National with (44,000+ teams), this time with retrieval quality gated in CI, and deployed $0/month production systems using free-tier AI providers. Scopus-indexed researcher. B.Tech CSE '26.",
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
  /** Caveat shown beside the demo link (e.g. cold-start latency). */
  demoNote?: string;
  heroImage?: string;
  /** Known constraints, stated plainly. Reads as maturity, not weakness. */
  limits?: string[];
  /** Present when the project implements a peer-reviewed publication. */
  research?: {
    title: string;
    authors: string;
    venue: string;
    paperId: string;
    status: string;
    paperUrl?: string;
    certificateUrl?: string;
    /** How the shipped product relates to the paper — stated honestly. */
    relationship: string;
  };
};

export const PROJECTS: Project[] = [
  {
    slug: "miningniti",
    name: "MiningNiti",
    tag: "🏆 SIH 2023 National Winner (Ministry of Coal) · Independent solo rebuild, June 2025 → present",
    blurb:
      "AI-Powered Document Intelligence for the Mining Industry — transforming thousands of fragmented PDFs into an instantly queryable, citation-backed source of truth.",
    description:
      "A document-intelligence platform for coal mining: four AI agents analyse every uploaded regulation, a fifth audits compliance on demand, and a hybrid-retrieval chat answers questions with page-level citations. Retrieval quality is scored against a labelled golden set on every CI run, and the score blocks the build. Two builds, four years apart — the SIH 2023 winner was a team prototype; this is an independent, ground-up rebuild, solo since June 2025, sharing none of that code.",
    metrics: [
      { value: "5", label: "Specialized AI Agents" },
      { value: "1.000", label: "Hit Rate@5 (CI-gated)" },
      { value: "$0/mo", label: "Infrastructure Cost" },
    ],
    tech: ["Next.js 16", "React 19", "FastAPI", "PostgreSQL + pgvector", "Supabase", "Upstash Redis", "Clerk Auth", "Groq", "Cerebras", "Mistral", "Gemini", "Docker"],
    problem:
      "Coal mining generates thousands of critical documents — MSHA regulations, equipment manuals, safety protocols, environmental impact assessments, incident investigations — scattered across PDFs and siloed systems. Finding a specific clause across 500 pages takes hours, and a missed regulation update means violations, fines, or lives.",
    solution:
      "Four agents run on every upload: a classifier whose category feeds a safety analyzer, entity extractor and summarizer running concurrently under asyncio.gather(). A fifth audits compliance on demand, cross-referencing operational documents against regulations into a per-clause Pass / Fail / Not Addressed matrix. The safety analyzer is skipped entirely for non-safety categories, so an equipment manual never pays for a hazard screen it does not need. Questions go through a measured retrieval pipeline and every answer cites its document and page.",
    architecture: [
      "Frontend: Next.js 16 App Router (Turbopack) + React 19 across 15 routes — Clerk auth, TanStack Query, Recharts analytics, react-pdf viewer.",
      "API: FastAPI 0.128 with 11 routers under /api/v1, Clerk JWT verification via JWKS (PyJWT) with RS256 pinned, JWKS cached and the azp claim validated, a DNS-resolving SSRF guard on URL ingestion, slowapi rate limiting at 120 req/min per IP, Pydantic v2 validation and audit logging on every mutation.",
      "Agents: Classifier (Groq gpt-oss-120b) runs first because its category feeds the rest; Safety Analyzer (Mistral magistral-small), Entity Extractor and Summarizer (Cerebras gpt-oss-120b) run concurrently; Compliance Auditor (Groq) runs on demand.",
      "Orchestration: no agent framework. Coordination is hand-written on asyncio.gather() with per-agent error isolation, quota-aware provider failover and a content-addressed Redis cache, so a re-upload of identical content costs zero LLM calls. Failure is loud: a section that cannot be produced is recorded on Document.processing_error and metadata.degraded_sections and shown in the UI, rather than laundered into a plausible-looking empty result.",
      "Ingestion: pdfplumber for layout and tables with a Tesseract OCR fallback for pages yielding almost no extractable text (capped at 50 pages/doc at 200 DPI); chunks of ~1000 words with 200 overlap under a hard 4,000-character ceiling, embedded 100 at a time.",
      "Retrieval: 23 prompt-injection guard patterns and a 1,500-character query cap → Gemini gemini-embedding-001 (768-dim) → pgvector cosine (HNSW) fused with PostgreSQL full-text ts_rank_cd over a GIN tsvector via Reciprocal Rank Fusion (k=60) → over-fetch 20 → ms-marco-MiniLM-L-6-v2 cross-encoder rerank to top 5 → generation streamed over SSE with inline [Document, Page X] citations.",
      "Data: Supabase PostgreSQL 16 with pgvector HNSW, Supabase Storage for uploads, Upstash Redis caching completed analyses keyed by SHA-256(extracted text) + PIPELINE_VERSION — failed runs are never cached.",
      "CI: five jobs — backend lint, a bandit security scan, pytest with coverage against real PostgreSQL and Redis services, the retrieval quality gate, and a frontend lint-and-build. Alembic migrations run before the server binds, so a failed migration stops the deploy rather than serving a half-built schema.",
      "Evaluation & observability: retrieval and generation are scored separately, because a blended number hides which half failed. Retrieval runs in CI as a blocking gate on a local sentence-transformers model — deterministic, no API keys. Generation quality (faithfulness and relevancy, 0.70 thresholds) is Gemini-judged on demand. LangSmith traces the orchestrator, hybrid search and chat generation end to end.",
    ],
    tradeoffs: [
      "Chose the weaker PDF library on purpose: PyMuPDF extracts more reliably but is AGPL-3.0, and this project ships MIT — so pdfplumber it was. It then turned out to recover tables that PyMuPDF flattens, and mining regulations are largely tabular, which made the licence-driven choice the better technical one too.",
      "A 400-row table became a single 14,703-character chunk. Chunk size was configured in words and grouped by sentence, but a Markdown table contains no sentence-ending punctuation, so the whole table emitted as one chunk. gemini-embedding-001 truncates silently past ~2,048 tokens, so most of that table was never indexed and nothing anywhere raised an error. Fix: a hard MAX_CHUNK_CHARS = 4000 applied after sentence grouping.",
      "Aggregate metrics could not prove the lexical arm was alive. Making the keyword search return nothing left every aggregate retrieval metric unchanged — at a 130-chunk corpus the cross-encoder fully compensated, so a green dashboard could not distinguish working hybrid search from half-dead hybrid search. The suite now carries direct guards that the lexical index returns rows and can tell 30 CFR 75.323 from 75.400.",
      "Two retry layers multiplied instead of adding. Backoff existed in both the orchestrator and the agent base class; composed, they reached up to nine attempts and minutes of sleep per agent on a single failure. Retry and provider fallback now live in BaseAgent._generate_json and nowhere else.",
      "Fallback routed by token budget, not preference: Groq's free tier allows 8K tokens/minute — the tightest constraint in the system — while Cerebras serves the identical gpt-oss-120b at 30K/minute. So agents fall back to Cerebras on a Groq rate limit: same model, same output, four times the headroom.",
    ],
    results:
      "Two builds, four years apart. The Smart India Hackathon 2023 entry — a team prototype against the Ministry of Coal problem statement — won the National Finale and was recognised by Coal India Limited & CMPDI. This is not that codebase: it is an independent, ground-up rebuild started June 2025 and developed solo since, and none of the 2023 code carried over. Retrieval is scored on every CI run against a labelled golden set of 12 queries over a 130-chunk mining corpus: Hit Rate@5 1.000 (floor 0.90), MRR 1.000 (floor 0.75), Recall@5 0.958 (floor 0.85), nDCG@5 0.968 (floor 0.75) — the gate blocks the build. 242 tests pass as blocking CI gates on every push (215 unit, 27 integration), out of 274 collected once the eval suites are counted, across 27.1K lines in two apps and 36 REST endpoints — all on $0/month infrastructure.",
    limits: [
      "Database access is synchronous inside async endpoints, so a query blocks the event loop and throughput per worker is bounded.",
      "The background queue is an in-process asyncio.Queue: queued work does not survive a restart and does not scale across replicas.",
      "Analysis agents see roughly 15K characters of head and tail rather than the whole document. Retrieval still indexes the full text — the limit applies to the agents only.",
      "The lexical arm is PostgreSQL full-text search, not true BM25. Everyone claims 'hybrid BM25 + vector'; real BM25 needs an extension like pg_search. Worth being precise about rather than rounding up.",
      "The retrieval gate runs against a 130-chunk golden corpus. At that scale the metrics are directional — they catch a regression, they are not a claim about production-scale behaviour.",
      "No frontend test suite. All 215 unit tests are backend; the frontend is covered by lint and a blocking production build, nothing more.",
    ],
    githubUrl: "https://github.com/Iammilansoni/MiningNiti",
    demoUrl: "https://miningniti.vercel.app/",
    demoNote:
      "The backend runs on a free HuggingFace Space that sleeps when idle — a cold first request can take up to a minute.",
    heroImage: "/miningniti-dashboard.png",
  },
  {
    slug: "hatf-lms-early-warning",
    name: "HATF Early Warning",
    tag: "📄 Scopus-Indexed Paper → Shipped Product · PiCET-2026 (IET Proceedings)",
    blurb:
      "Turning a peer-reviewed research paper into a working AI product — early dropout prediction that reaches educators before students disappear.",
    description:
      "An end-to-end early-warning system built from my co-authored PiCET-2026 paper on the Hybrid Attention Temporal Framework (HATF). It predicts student dropout risk from week 2 of an 8-week course, explains every score in behaviours an advisor can independently verify, quantifies its own uncertainty, and measures its own bias. A paper ends at a results table; this delivers the paper's own stated future-work item — the dashboard that gets the prediction in front of a human in time.",
    metrics: [
      { value: "0.789", label: "ROC-AUC at Week 2 of 8" },
      { value: "28.4%", label: "Escalated to Human Review" },
      { value: "11", label: "Models Benchmarked" },
    ],
    tech: ["PyTorch", "FastAPI", "Next.js 15", "React 19", "TypeScript", "Tailwind CSS v4", "pandas", "scikit-learn", "Streamlit", "pytest", "Docker", "uv", "Render", "Vercel"],
    problem:
      "Roughly one in three students who enrol in an online course never finish, and institutions usually notice too late to help. The problem has an awkward shape most tutorials skip: the prediction has to be early to matter, time flows one way so leakage is silent and fatal, the costs are asymmetric (a missed student is real harm, an unnecessary check-in costs five minutes), advisor time is finite, and a risk score without a reason is something no educator can act on, argue with, or overrule.",
    solution:
      "A single 59,951-parameter HATF model — multi-scale causal convolutions (kernels 1/3/7), a unidirectional LSTM, masked temporal attention, and prediction-week embeddings — serves every prediction week from one checkpoint. Causality is structural rather than conventional: convolutions are left-padded and the LSTM is unidirectional, so future weeks are physically unreachable, proved by tests that overwrite masked weeks with noise 50×. Monte Carlo Dropout over 30 stochastic passes produces a posterior that escalates uncertain cases to a human instead of guessing, and Platt scaling puts the outputs back on a scale where 0.30 means roughly a 30% chance.",
    architecture: [
      "Data: synthetic LMS generator — 500 students, 8 weeks, 7 behavioural archetypes. Behaviour is simulated first and the label sampled from it with real noise, so the task is learnable but never separable. No real student data.",
      "Features: 25 leakage-free weekly signals across activity, assessment, interaction and timing — every feature at week t computed from weeks ≤ t.",
      "Model: multi-scale causal CNN → unidirectional LSTM → masked multi-head temporal attention → MC-dropout head (30 passes) on CPU.",
      "Explanations: occlusion-based sensitivity, shown as raising risk only when model sensitivity and the student's deviation from the cohort agree — so an explanation can never contradict itself.",
      "API: FastAPI with nine endpoints and OpenAPI docs, deployed on Render. No endpoint performs an action on a student.",
      "Frontend: Next.js 15 App Router with React Server Components fetching server-side, deployed on Vercel — cohort triage, per-student reasoning, fairness report and model card.",
    ],
    tradeoffs: [
      "Published the baseline table even though the proposed model loses: eleven models trained under identical conditions, and HATF finishes last on the demo cohort. The whole table sits inside the noise (0.030 AUC spread against ±0.05 intervals on 82 test students), and it still ships — because at statistically indistinguishable accuracy it is the only model that also produces the attention, uncertainty and window-usage the explanation layer is built on. A product reason, not a metric one.",
      "F2-optimal threshold with a 40% flag-rate cap over plain accuracy: missing a struggling student is a worse error than an unnecessary check-in, but a model that flags most of the cohort has produced a spreadsheet nobody opens, not a signal.",
      "Reported a negative result rather than burying it: the in-batch demographic-parity regulariser moved every held-out fairness gap by exactly 0.0000, making it a free no-op rather than a trade-off. Attention also came out effectively uniform, so the system detects that condition and says the model draws on history evenly instead of highlighting the top bars of a flat distribution.",
    ],
    results:
      "ROC-AUC rises from 0.789 at week 2 to 0.876 by week 8 (pooled 0.845, 95% CI 0.751–0.924) on held-out test students, with expected calibration error of 0.038 and 28.4% of predictions escalated for human review. Counterfactual invariance measures exactly 0.000000 — every sensitive attribute of every test student rewritten and the model re-run, verifying rather than asserting that demographics are excluded. 110 tests, a 240 KB checkpoint that trains on a laptop CPU, and the full API and dashboard live in production.",
    githubUrl: "https://github.com/Iammilansoni/hatf-lms-early-warning-poc",
    demoUrl: "https://hatf-lms-early-warning-poc.vercel.app/",
    research: {
      title:
        "Hybrid Attention-Based Temporal Modeling for Early Dropout Prediction in Learning Management Systems",
      authors:
        "Pradeep Jha, Manju Mathur, Abhay Purohit, Milan Soni, Avadhi Singhal, Abhilash Joshi — Department of CSE, Global Institute of Technology, Jaipur",
      venue:
        "8th Parul University International Conference on Engineering & Technology (PiCET-2026), 1–2 May 2026 · IET Conference Proceedings (Scopus indexed)",
      paperId: "PU/PiCET26/COP/327",
      status: "Accepted · in press",
      paperUrl:
        "https://drive.google.com/file/d/11DTgnEqtFGIB-PpX-SKyheMCue5xRe-_/view?usp=sharing",
      certificateUrl:
        "https://drive.google.com/file/d/1TbxYA73JiKCRnVgqTIqLMfLdVtKWDX_l/view?usp=sharing",
      relationship:
        "The paper evaluates HATF on three real LMS datasets totalling 7,935 students across 45 courses, reporting F1 94.2% and AUC 96.1%. This implementation runs on synthetic data and reports its own, independently measured numbers — the two are not comparable, and nothing here reproduces the paper's results. What it adds is the other half of the job: the explanation layer, the uncertainty escalation, the fairness audit, and an interface a non-ML educator can actually use.",
    },
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
    company: "OmniRoute",
    role: "Open Source Contributor",
    period: "Jul 2026",
    location: "Remote",
    highlights: [
      "Diagnosed an HTTP 400 regression in the memory-injection pipeline affecting strict LLM providers (Xiaomi MiMo); proposed a declarative systemMessageMustBeFirst Zod schema flag adopted by the maintainer into the shipped fix — 25/25 Vitest + 30/30 Node test-runner coverage (PR #6225)",
      "Built an accessible 'Configured Only' filter toggle for the provider-rankings dashboard, mapping live connection state to a filterable data grid — 168 additions across 4 files, 9/9 tests passing, shipped into v3.8.45 (PR #6245)",
      "Integrated Claude 5 Sonnet into the claude_web provider registry with regression test coverage, shipping a verified signed commit within hours of the model's release (PR #6209, v3.8.45)",
      "Audited and normalized 9 core docs + 20+ localized READMEs across 42 locales, removing untranslated Portuguese/Chinese prose and correcting stale architecture metrics (routing strategies 13→17, service modules 36→134) — passed docs-sync-strict CI gate with zero regressions (PR #6105, v3.8.44)",
      "Proposed a schema extension (Issue #6241) to standardize effort and thinking parameters across the multi-provider routing platform for next-gen reasoning models",
    ],
  },
  {
    company: "nTheta Works Pvt. Ltd.",
    role: "Full Stack Developer Intern",
    period: "Oct – Dec 2025",
    location: "Remote",
    highlights: [
      "Built a two-stage semantic retrieval pipeline (Ollama embeddings → Redis HNSW → FlashRank cross-encoder reranking) for NLPForge, an enterprise LLM API testing platform — improved template matching accuracy by 40% and reduced manual QA effort by 60%",
      "Shipped async FastAPI microservices + Next.js/TypeScript dashboards with Docker Compose orchestration and CI/CD on Linux servers",
    ],
  },
  {
    company: "Freelance Client",
    role: "AI & Full Stack Developer",
    period: "Jul 2025 – Aug 2025",
    location: "Remote",
    highlights: [
      "Built SmartLearnX, an AI-powered LMS, with a dropout prediction model (Logistic Regression, 91.4% accuracy) and academic performance forecasting (Random Forest, R² = 0.89) deployed as a FastAPI microservice alongside a React/Node.js frontend",
      "Integrated NLP features (BERT for quiz generation, spaCy chatbot) serving 24/7 student support with sub-2-second response times under load",
    ],
  },
  {
    company: "OBG Outsourcing Pvt. Ltd.",
    role: "Full Stack Developer Intern",
    period: "May – Jul 2025",
    location: "Jaipur",
    highlights: [
      "Led FinSageAI360, a multi-tenant financial intelligence SaaS — cut monthly close reporting time by 45% and reduced manual operational effort by 30% through AI-driven anomaly detection and real-time KPI dashboards",
      "Designed a JWT-authenticated REST API (Node.js/Express/MongoDB) with granular RBAC for multi-tenant data isolation",
    ],
  },
  {
    company: "Om Logistics Ltd.",
    role: "Software Developer Intern",
    period: "Jun – Aug 2024",
    location: "Delhi",
    highlights: [
      "Optimized enterprise document search by implementing LangChain + FAISS vector embeddings — reduced query latency by 70% across 10,000+ documents and improved retrieval accuracy by 40%",
      "Built RESTful APIs (Node.js) to automate logistics workflows, eliminating 20% of manual data-entry tasks",
    ],
  },
  {
    company: "CodeFiesta",
    role: "Organising Team & Sponsorship Head",
    period: "2024 – 2025",
    location: "GIT Jaipur",
    // The institute's own report on CodeFiesta 4.0: the participants list
    // runs to 200 teams, with 13 named in the final round.
    href: "https://gitjaipur.com/wp-content/uploads/2026/01/hackathon-Report_4.0.pdf",
    linkLabel: "Official event report",
    highlights: [
      "Sponsors: 18+ — outreach, partnership negotiation and sponsor relationships across editions 3.0 and 4.0",
      "2025 edition: 200 teams from 30+ colleges, 24-hour onsite build, 13 in the final round",
      "Handled logistics, scaling and technical operations across two editions of the event",
    ],
  },
] as const;

export const STATS = [
  { value: "5", label: "AI Agents in MiningNiti" },
  { value: "4", label: "AI Providers (Free Tiers)" },
  { value: "$0", label: "Monthly Infrastructure Cost" },
  { value: "50k", label: "Stars · OmniRoute" },
  { value: "3", label: "Enterprise Internships" },
  { value: "70%", label: "Query Latency Reduction" },
] as const;

export const TECH_STACK = {
  Languages: ["JavaScript (ES6+)", "TypeScript", "Python", "C++"],
  Frontend: ["React 19", "Next.js 16", "Redux", "Tailwind CSS v4", "Framer Motion", "Recharts", "Radix UI / shadcn"],
  Backend: ["FastAPI 0.128", "Node.js", "Express.js", "SQLAlchemy 2.0", "Pydantic v2", "REST APIs", "GraphQL", "JWT", "Clerk Auth", "RBAC", "Microservices"],
  "AI / ML": ["LangChain", "LangGraph", "Google ADK", "RAG Pipelines", "Hybrid Search (Vector + Full-Text)", "Reciprocal Rank Fusion", "Cross-Encoder Reranking", "FlashRank", "Ollama", "AI Agents", "Prompt Engineering", "Retrieval Evaluation (Hit Rate / MRR / nDCG)", "pgvector"],
  "LLM Providers": ["Groq (gpt-oss-120b)", "Cerebras (gpt-oss-120b)", "Mistral (magistral-small)", "Google Gemini", "OpenAI", "Anthropic", "DeepSeek", "HuggingFace"],
  Databases: ["PostgreSQL + pgvector", "Supabase", "MongoDB", "Redis Stack 7.2 (HNSW)", "Upstash Redis", "Prisma ORM"],
  "Cloud / DevOps": ["Vercel", "HuggingFace Spaces", "Docker Compose", "GitHub Actions CI/CD", "Linux", "Git"],
} as const;
