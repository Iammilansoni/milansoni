export const SITE = {
  name: "Milan Soni",
  title: "Milan Soni — AI Engineer & Full Stack Developer",
  description:
    "AI Engineer and Full Stack Developer building production RAG pipelines, multi-agent orchestration systems, and multi-provider LLM infrastructure. Shipped code to a 90k★ open-source AI gateway (7 PRs merged, 21,000+ tests), rebuilt solo the Ministry of Coal document-intelligence platform a team of us won SIH 2023 National with (44,000+ teams), this time with retrieval quality gated in CI, and shipped it on pgvector with routing across 3 LLM providers + Gemini embeddings. Scopus-indexed researcher. B.Tech CSE '26.",
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
      "A document-intelligence platform for coal mining: four AI agents analyse every uploaded regulation, a fifth audits compliance on demand, and a hybrid-retrieval chat answers questions with page-level citations. Retrieval quality is scored against a labelled golden set on every CI run, and the score blocks the build. Two builds, two years apart — the SIH 2023 winner was a team prototype; this is an independent, ground-up rebuild, solo since June 2025, sharing none of that code.",
    metrics: [
      { value: "5", label: "Specialized AI Agents" },
      { value: "CI-Gated", label: "12-Query / 130-Chunk Eval" },
      { value: "pgvector", label: "No Managed Vector DB" },
    ],
    tech: ["Next.js 16", "React 19", "FastAPI", "Python 3.14", "uv", "PostgreSQL + pgvector", "Supabase", "Upstash Redis", "Clerk Auth", "NVIDIA NIM", "Groq", "Mistral", "Gemini", "Docker"],
    problem:
      "Coal mining generates thousands of critical documents — MSHA regulations, equipment manuals, safety protocols, environmental impact assessments, incident investigations — scattered across PDFs and siloed systems. Finding a specific clause across 500 pages takes hours, and a missed regulation update means violations, fines, or lives.",
    solution:
      "Four agents run on every upload: a classifier whose category feeds a safety analyzer, entity extractor and summarizer running concurrently under asyncio.gather(). A fifth audits compliance on demand, cross-referencing operational documents against regulations into a per-clause Pass / Fail / Not Addressed matrix. The safety analyzer is skipped entirely for non-safety categories, so an equipment manual never pays for a hazard screen it does not need. Questions go through a measured retrieval pipeline and every answer cites its document and page.",
    architecture: [
      "Frontend: Next.js 16 App Router (Turbopack) + React 19 — Clerk auth, TanStack Query, Recharts analytics, portal multi-format viewer (PDF, plain text, images) + ⌘K command palette.",
      "API: FastAPI 0.128+ (Python 3.14, uv) with 11 routers (37 endpoints) under /api/v1, Clerk JWT verification via JWKS (PyJWT) with RS256 pinned, JWKS cached and azp validation, URL validation on ingestion, slowapi rate limiting at 120 req/min per IP, Pydantic v2 validation and audit logging.",
      "Agents: Classifier (Groq gpt-oss-120b ↔ NVIDIA NIM) runs first because its category feeds the rest; Safety Analyzer (Mistral magistral-small ↔ NVIDIA NIM/Groq), Entity Extractor and Summarizer (NVIDIA NIM nemotron-3.5-super-vl-120b-a12b ↔ Groq) run concurrently; Compliance Auditor (Groq ↔ NVIDIA NIM) runs on demand.",
      "Orchestration: no agent framework. Coordination is hand-written on asyncio.gather() with per-agent error isolation, per-call quota-aware provider failover (disabling thinking tokens on NIM for fast JSON), and a content-addressed Redis cache keyed by SHA-256 + PIPELINE_VERSION. Failure is loud: a degraded section lands on Document.processing_error and metadata.degraded_sections rather than a silent empty result.",
      "Ingestion: pdfplumber for layout and tables with a Tesseract OCR fallback for pages yielding almost no extractable text (capped at 50 pages/doc at 200 DPI); chunks of ~1000 words with 200 overlap under a hard 4,000-character ceiling, embedded 100 at a time.",
      "Retrieval: Input filtering and a 1,500-character query cap → Gemini gemini-embedding-001 (768-dim) → pgvector cosine (HNSW) fused with PostgreSQL full-text ts_rank_cd over a STORED GIN tsvector via Reciprocal Rank Fusion (k=60) → over-fetch 20 → ms-marco-MiniLM-L-6-v2 cross-encoder rerank to top 5 → generation streamed over SSE with inline [Document, Page X] citations.",
      "Data: Supabase PostgreSQL 16 with pgvector HNSW + GIN, Supabase Storage for durable uploads, Upstash Redis caching completed analyses — failed or degraded runs are never cached.",
      "CI: blocking checks for backend lint (black, isort), pytest unit & PostgreSQL integration suites, deterministic retrieval regression gate, frontend ESLint + Next.js production build, and Docker image validation, with Alembic migrations running before server startup and interrupted-job recovery on restart.",
      "Evaluation & observability: retrieval and generation are scored separately, because a blended number hides which half failed. Retrieval runs in CI as a blocking gate on a local sentence-transformers model — deterministic, no API keys. Generation quality (faithfulness and relevancy, 0.70 thresholds) is Gemini-judged on demand. LangSmith traces the orchestrator, hybrid search and chat generation end to end.",
    ],
    tradeoffs: [
      "Chose the weaker PDF library on purpose: PyMuPDF extracts more reliably but is AGPL-3.0, and this project ships MIT — so pdfplumber it was. It then turned out to recover tables that PyMuPDF flattens, and mining regulations are largely tabular, which made the licence-driven choice the better technical one too.",
      "A 400-row table became a single 14,703-character chunk. Chunk size was configured in words and grouped by sentence, but a Markdown table contains no sentence-ending punctuation, so the whole table emitted as one chunk. gemini-embedding-001 truncates silently past ~2,048 tokens, so most of that table was never indexed and nothing anywhere raised an error. Fix: a hard MAX_CHUNK_CHARS = 4000 applied after sentence grouping.",
      "Aggregate metrics could not prove the lexical arm was alive. Making the keyword search return nothing left every aggregate retrieval metric unchanged — at a 130-chunk corpus the cross-encoder fully compensated, so a green dashboard could not distinguish working hybrid search from half-dead hybrid search. The suite now carries direct guards that the lexical index returns rows and can tell 30 CFR 75.323 from 75.400.",
      "Two retry layers multiplied instead of adding. Backoff existed in both the orchestrator and the agent base class; composed, they reached up to nine attempts and minutes of sleep per agent on a single failure. Retry and per-call provider fallback now live in BaseAgent._generate_json and nowhere else.",
      "Fallback routed around free-tier quota limits: Groq caps around 8K tokens/minute and Mistral quotas can exhaust per-request, so Entity Extractor and Summarizer run primary on NVIDIA NIM (nemotron-3.5-super-vl-120b-a12b with thinking disabled for fast JSON) with Groq fallback, while Classifier, Safety Analyzer, and Compliance Auditor automatically fail over to NVIDIA NIM / Groq when quota-limited.",
    ],
    results:
      "Two builds, two years apart. The Smart India Hackathon 2023 entry — a team prototype against the Ministry of Coal problem statement — won the National Finale and was recognised by Coal India Limited & CMPDI. This is not that codebase: it is an independent, ground-up rebuild started June 2025 and developed solo since, and none of the 2023 code carried over. Retrieval is scored on every CI run against a labelled golden set of 12 queries over a 130-chunk mining corpus: Hit Rate@5 1.000 (floor 0.90), MRR 1.000 (floor 0.75), Recall@5 0.958 (floor 0.85), nDCG@5 0.968 (floor 0.75) — the gate blocks the build. 321 unit tests (262 pytest unit + 59 pillar unittest) and 18 retrieval-metric checks pass offline out of 380 collected tests across unit, PostgreSQL integration, and LLM-eval suites, spanning 11 API routers and 37 endpoints — all on pgvector rather than a managed vector database.",
    limits: [
      "Database access is synchronous inside async endpoints, so a query blocks the event loop and throughput per worker is bounded.",
      "The background queue is an in-process asyncio.Queue: queued work does not scale across replicas (startup Postgres advisory locks recover interrupted rows on restart).",
      "Analysis agents see roughly 15K characters of head and tail rather than the whole document. Retrieval still indexes the full text — the limit applies to the agents only.",
      "The lexical arm is PostgreSQL full-text search, not true BM25. Everyone claims 'hybrid BM25 + vector'; real BM25 needs an extension like pg_search. Worth being precise about rather than rounding up.",
      "The retrieval gate runs against a 130-chunk golden corpus. At that scale the metrics are directional — they catch a regression, they are not a claim about production-scale behaviour.",
      "No frontend unit/E2E test suite yet. All 321 unit tests are backend; the frontend is covered by TypeScript typechecking, ESLint, and a blocking Next.js production build.",
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
    tag: "Natural-Language to Validated REST API Router",
    blurb:
      "Natural-Language to Validated API Request Router — routing plain-English requests into OpenAPI-validated endpoints across 20+ providers with PostgreSQL RLS.",
    description:
      "An async FastAPI platform that turns plain-English requests (e.g. 'refund order 8820') into schema-validated REST API calls across 20+ LLM and embedding providers using pgvector HNSW retrieval, deterministic extraction rules + local Ollama fallback, and PostgreSQL Row-Level Security.",
    metrics: [
      { value: "80% / 97%", label: "Top-1 / Top-3 (180-Query CI)" },
      { value: "98%", label: "Slot Precision (55 → 1 Errors)" },
      { value: "229", label: "Pytest Tests (43 RLS Endpoints)" },
    ],
    tech: ["FastAPI", "PostgreSQL + pgvector", "PostgreSQL RLS", "SQLAlchemy 2.0", "Pydantic v2", "Celery", "Redis", "Next.js", "Ollama", "Docker", "pytest"],
    problem:
      "Mapping free-form natural-language instructions into executable REST calls frequently breaks in production: embeddings return plausible wrong routes, LLMs invent ungrounded parameter values, and multi-tenant workspaces leak template state without database-level enforcement.",
    solution:
      "Engineered a schema-validated NL-to-API router with pgvector HNSW retrieval over OpenAPI endpoint specs, rule + local Ollama slot extraction with Pydantic validation cutting invented parameter values from 55 to 1 per 100 requests (98% precision), and PostgreSQL Row-Level Security enforcing tenant boundaries across 43 tested endpoints.",
    architecture: [
      "API & Schema Engine: Async FastAPI with SQLAlchemy 2.0, Pydantic v2 strict parameter validation, and Celery + Redis background processing.",
      "Retrieval: pgvector HNSW cosine search across 20+ supported LLM and embedding providers with a 180-query CI evaluation gate.",
      "Slot Extraction & Guardrails: Schema-driven rule extraction + local Ollama fallback ensuring ungrounded values drop from 55 to 1 per 100 requests (98% precision).",
      "Multi-Tenant Security: PostgreSQL Row-Level Security (RLS) policies + owner-scoped queries verified by a 43-endpoint cross-user tenancy test suite.",
      "Testing & Frontend: 229 pytest tests (197 unit + 32 PostgreSQL integration) paired with a Next.js workspace UI.",
    ],
    tradeoffs: [
      "Ablated off cross-encoder reranking after benchmarking: adding a cross-encoder degraded short-command API routing compared to dense pgvector max-pooling, so disabling it lifted top-1 accuracy from 59% to 80% (97% top-3) on the 180-query CI gate.",
      "pgvector HNSW + PostgreSQL RLS over a separate Redis vector store: consolidating vectors and tenant policies in PostgreSQL eliminated dual-store synchronization bugs across 43 RLS-protected endpoints.",
      "Rules + local Ollama fallback before cloud LLMs: deterministic schema rules handle structured fields reliably, leaving zero room for invented IDs or ungrounded defaults.",
    ],
    results:
      "Raised top-1 API routing accuracy from 59% to 80% (97% top-3) on a 180-query CI gate after ablating a degrading reranker; cut ungrounded parameter values from 55 to 1 per 100 requests (98% precision); verified multi-tenant isolation across 43 RLS endpoints and 229 pytest tests (197 unit, 32 PostgreSQL integration) across 20+ providers.",
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
      { value: "JWT + RBAC", label: "Multi-Tenant Isolation" },
      { value: "Ledger", label: "Anomaly Validation" },
      { value: "MongoDB", label: "Prisma Data Layer" },
    ],
    tech: ["Next.js", "Node.js", "MongoDB", "Prisma", "JWT", "AI Analytics"],
    problem:
      "Mid-market finance teams patch reports together in spreadsheets, losing days every month and missing anomalies entirely.",
    solution:
      "Built JWT-authenticated REST APIs (Node.js/Express/MongoDB) with granular RBAC for multi-tenant ledger isolation and automated anomaly-validation checks over normalised financial feeds.",
    architecture: [
      "Multi-tenant data model on MongoDB via Prisma",
      "Stream ingestion of accounting feeds",
      "Automated validation checks for cashflow and ledger anomalies",
      "Role-based dashboards with audit trails",
    ],
    results:
      "Delivered multi-tenant RBAC ledger isolation and automated financial close validation checks replacing manual spreadsheet checks.",
  },
  {
    slug: "smartlearnx",
    name: "SmartLearnX",
    tag: "Freelance Project",
    blurb:
      "A full-stack AI-assisted LMS integrating dropout risk scoring, performance forecasting, BERT quiz generation, and a spaCy student support assistant.",
    description:
      "An adaptive educational ecosystem integrating ML/NLP microservices with a Node.js and React web application for course recommendations, student risk tracking, and automated quiz assistance.",
    metrics: [
      { value: "FastAPI", label: "ML Microservice" },
      { value: "NLP", label: "BERT + spaCy Pipeline" },
      { value: "Docker", label: "Nginx Container Stack" },
    ],
    tech: ["React", "TypeScript", "Node.js", "FastAPI", "MongoDB", "Redis", "Docker", "Machine Learning"],
    problem:
      "Conventional LMS platforms provide static learning content, limited personalization, and minimal automated study assistance.",
    solution:
      "Implemented an adaptive LMS with a FastAPI microservice running Logistic Regression dropout risk scoring and Random Forest performance forecasting alongside a React/Node.js web application.",
    architecture: [
      "Frontend: React and TypeScript SPA with analytics dashboards.",
      "Backend: Node.js and Express server with a Python FastAPI ML microservice.",
      "Database & Queue: MongoDB for primary data, Redis and BullMQ for caching and background jobs.",
      "AI Layer: Quiz generation via BERT and a student Q&A chatbot built with spaCy.",
      "Infrastructure: Docker containerization and Nginx reverse proxy.",
    ],
    tradeoffs: [
      "Microservices vs Monolith: Split Python ML/NLP inference into a dedicated FastAPI microservice so heavy NLP calls never block the Node.js API.",
      "Interpretable Baselines First: Used Logistic Regression and Random Forest models for fast, low-resource inference behind FastAPI.",
    ],
    results:
      "Shipped end-to-end across React, Node.js, FastAPI, MongoDB, Redis/BullMQ, Docker, and Nginx with automated BERT quiz generation and spaCy chatbot workflows.",
  },
];


export const EXPERIENCE = [
  {
    company: "nTheta Works Pvt. Ltd.",
    role: "Full Stack Developer Intern",
    period: "Oct – Dec 2025",
    location: "Remote",
    highlights: [
      "Built an internal two-stage semantic template search pipeline (Ollama embeddings → Redis HNSW → FlashRank cross-encoder reranking) for an enterprise LLM API-testing platform",
      "Shipped async FastAPI microservices + Next.js/TypeScript dashboards integrating 8 LLM providers, Docker Compose (6 services, 18 Alembic migrations), and CI/CD pipelines",
    ],
  },
  {
    company: "Freelance Client",
    role: "AI & Full Stack Developer",
    period: "Jul 2025 – Aug 2025",
    location: "Remote",
    highlights: [
      "Built SmartLearnX, an AI-assisted LMS, with Logistic Regression dropout risk scoring and Random Forest performance forecasting deployed in a FastAPI microservice alongside a React/Node.js frontend",
      "Integrated BERT quiz generation and a spaCy chatbot assistant backed by MongoDB, Redis/BullMQ, and Docker/Nginx",
    ],
  },
  {
    company: "OBG Outsourcing Pvt. Ltd.",
    role: "Full Stack Developer Intern",
    period: "May – Jul 2025",
    location: "Jaipur",
    highlights: [
      "Built JWT-authenticated REST APIs (Node.js/Express/MongoDB) with granular RBAC for multi-tenant ledger isolation in FinSageAI360",
      "Implemented automated financial anomaly-validation checks and interactive KPI dashboards using Next.js and Prisma",
    ],
  },
  {
    company: "Om Logistics Ltd.",
    role: "Software Developer Intern",
    period: "Jun – Aug 2024",
    location: "Delhi",
    highlights: [
      "Built semantic document search across enterprise logistics records using Python, LangChain, and FAISS vector embeddings",
      "Built RESTful APIs (Node.js) to automate internal logistics lookup workflows",
    ],
  },
  {
    company: "OmniRoute",
    role: "Open-Source Contributor (Part-Time)",
    period: "Jul 2026 – Sep 2026",
    location: "Remote",
    highlights: [
      "Authored 7 merged PRs in the 90k★ open-source universal AI gateway (375+ providers, 21,000+ tests), including parsing Claude-format thinking blocks into observed usage telemetry (PR #13969) and enforcing Gemini-Web reasoning/tool schemas to block malformed upstream requests (PR #9397)",
      "Fixed quota reset-window routing strategy prioritization under rate limits (PR #9353) and refactored MITM dynamic imports to eliminate Next.js Turbopack warnings (PR #6366)",
      "Built an accessible 'Configured Only' filter toggle mapping live /api/providers state (168 additions, 9/9 Vitest, PR #6245, v3.8.45) and integrated Claude 5 Sonnet into claude_web with regression coverage (PR #6209, v3.8.45)",
      "Audited docs across 42 locales passing docs-sync-strict CI (PR #6105, v3.8.44), plus diagnosed a strict-provider system-message ordering regression (PR #6172) with a declarative systemMessageMustBeFirst Zod schema design later adopted by the maintainer into PR #6225",
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
  { value: "321", label: "Unit Tests · MiningNiti" },
  { value: "229", label: "Pytest Tests · NLPForge" },
  { value: "90k+", label: "Stars · OmniRoute" },
  { value: "3", label: "Enterprise Internships" },
] as const;

export const TECH_STACK = {
  Languages: ["JavaScript (ES6+)", "TypeScript", "Python", "C++"],
  Frontend: ["React 19", "Next.js 16", "Redux", "Tailwind CSS v4", "Framer Motion", "Recharts", "Radix UI / shadcn"],
  Backend: ["FastAPI 0.128", "Node.js", "Express.js", "SQLAlchemy 2.0", "Pydantic v2", "uv", "REST APIs", "GraphQL", "JWT", "Clerk Auth", "RBAC", "Microservices"],
  "AI / ML": ["LangChain", "LangGraph", "Google ADK", "RAG Pipelines", "Hybrid Search (Vector + Full-Text)", "Reciprocal Rank Fusion", "Cross-Encoder Reranking", "FlashRank", "Ollama", "AI Agents", "Prompt Engineering", "Retrieval Evaluation (Hit Rate / MRR / nDCG)", "pgvector"],
  "LLM Providers": ["NVIDIA NIM (Nemotron 3.5 Super VL)", "Groq (gpt-oss-120b)", "Mistral (magistral-small)", "Google Gemini", "OpenAI", "Anthropic", "DeepSeek", "HuggingFace"],
  Databases: ["PostgreSQL + pgvector", "Supabase", "MongoDB", "Redis Stack 7.2 (HNSW)", "Upstash Redis", "Prisma ORM"],
  "Cloud / DevOps": ["Vercel", "HuggingFace Spaces", "Docker Compose", "GitHub Actions CI/CD", "Linux", "Git"],
} as const;
