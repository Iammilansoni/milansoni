# Milan Soni — Master Resume Context

> **Purpose:** A single, comprehensive source of truth about Milan Soni — profile, skills, projects, experience, education, achievements, and writing. Use this as context to generate targeted resumes, cover letters, and LinkedIn content for job applications. Copy the relevant sections and tailor bullet points to each role.

---

## 1. Personal & Contact Information

| Field | Detail |
|-------|--------|
| **Full Name** | Milan Soni |
| **Headline / Role** | AI Engineer & Full Stack Developer |
| **Location** | Churu, Rajasthan, India |
| **Email (primary)** | milansoni96946@gmail.com |
| **Portfolio** | https://milansoni.vercel.app |
| **GitHub** | https://github.com/Iammilansoni |
| **LinkedIn** | https://www.linkedin.com/in/sonimilan/ |
| **Medium (blog)** | https://medium.com/@milansoni96946 |

---

## 2. Professional Summary

AI Engineer and Full Stack Developer who turns complex real-world bottlenecks into intelligent, automated, production-grade software. Specializes in **production RAG pipelines**, **multi-agent LLM orchestration**, and **scalable enterprise platforms**.

**Signature credentials:**
- 🏆 **Smart India Hackathon (SIH) 2023 National Winner** — Top 1% of 44,000+ teams; recognized by Coal India Limited & CMPDI (Ministry of Coal).
- 📄 **Scopus-Indexed Researcher** — Peer-reviewed paper on hybrid attention-based temporal modeling (PICET-2026, IET Conference Proceedings).
- 🌐 **Open-Source Contributor to OmniRoute** — 7 PRs merged into a 90k★ universal AI gateway (375+ LLM providers, 21,000+ tests).
- 💼 **3 Enterprise Internships + Freelance** — Shipped production systems at nTheta Works, OBG Outsourcing, and Om Logistics.
- 🎓 **B.Tech CSE 2026** — Global Institute of Technology, Jaipur (CGPA 8.10).

**One-line variants (pick by role):**
- *AI-focused:* "AI Engineer building production RAG pipelines and multi-agent LLM systems — SIH 2023 National Winner & Scopus-indexed researcher."
- *Full-stack:* "Full Stack Developer (React 19 / FastAPI) shipping enterprise SaaS with AI-driven analytics and multi-tenant RBAC."
- *Generalist:* "CS graduate ('26) with 3 internships, a national hackathon win, published research, and 7 merged PRs in a 90k★ AI project."

---

## 3. Core Expertise

| Area | What Milan Does |
|------|-----------------|
| **AI / LLM Engineering** | Production RAG pipelines with hybrid search, multi-agent orchestration (5 agents), cross-encoder reranking, evaluation harnesses, multi-provider LLM routing |
| **Full Stack** | React 19 + TanStack/Next.js frontends, FastAPI async backends, Clerk/JWT auth, enterprise RBAC, multi-tenant SaaS |
| **Data & Infrastructure** | PostgreSQL + pgvector, Redis HNSW indexes, Docker orchestration, CI/CD, $0/month free-tier deployments |
| **Systems Thinking** | Algorithm design, scalable backend architecture, multi-provider AI orchestration, state-machine agent design |

---

## 4. Technical Skills

- **Languages:** JavaScript (ES6+), TypeScript, Python, C++
- **Frontend:** React 19, Next.js 16, TanStack Start/Router/Query, Redux, Tailwind CSS v4, Framer Motion, Recharts, Radix UI / shadcn, Three.js
- **Backend:** FastAPI 0.128, Node.js, Express.js, SQLAlchemy 2.0, Pydantic v2, REST APIs, GraphQL, JWT, Clerk Auth, RBAC, Microservices
- **AI / ML:** LangChain, LangGraph, RAG Pipelines, Hybrid Search (Vector + Full-Text), Cross-Encoder Reranking, FlashRank, Ollama, AI Agents, Prompt Engineering, Vector Embeddings, pgvector, BERT, spaCy, scikit-learn (Logistic Regression, Random Forest)
- **LLM Providers:** NVIDIA NIM (nemotron-3.5-super-vl-120b-a12b), Groq (gpt-oss-120b), Mistral (magistral-small), Google Gemini, OpenAI, Anthropic, DeepSeek, HuggingFace
- **Databases:** PostgreSQL + pgvector, Supabase, MongoDB, Redis Stack 7.2 (HNSW), Upstash Redis, Prisma ORM, FAISS
- **Cloud / DevOps:** Vercel, Nitro, HuggingFace Spaces, Docker Compose, GitHub Actions CI/CD, Linux, Git, Nginx

---

## 5. Professional Experience

### nTheta Works Pvt. Ltd. — Full Stack Developer Intern · Remote · Oct – Dec 2025
- Built an internal two-stage semantic API-template search pipeline (Ollama embeddings → Redis HNSW → FlashRank cross-encoder reranking) for an enterprise LLM API-testing platform.
- Shipped async FastAPI microservices + Next.js/TypeScript dashboards integrating 8 LLM providers, 6-service Docker Compose stack, 18 Alembic migrations, and CI/CD on Linux servers.

### Freelance Client — AI & Full Stack Developer · Remote · Jul – Aug 2025
- Built **SmartLearnX**, an AI-assisted LMS, with Logistic Regression dropout risk scoring and Random Forest performance forecasting deployed in a FastAPI microservice alongside a React/Node.js frontend.
- Integrated NLP features (BERT quiz generation, spaCy chatbot) backed by MongoDB, Redis/BullMQ, and Docker/Nginx.

### OBG Outsourcing Pvt. Ltd. — Full Stack Developer Intern · Jaipur · May – Jul 2025
- Built JWT-authenticated REST APIs (Node.js/Express/MongoDB) with granular RBAC for multi-tenant ledger isolation and automated financial anomaly-validation checks for **FinSageAI360**.

### Om Logistics Ltd. — Software Developer Intern · Delhi · Jun – Aug 2024
- Implemented semantic document search with Python, LangChain, and FAISS vector embeddings alongside Node.js RESTful APIs automating internal logistics lookup workflows.

### OmniRoute — Open Source Contributor (Part-Time) · Remote · Jul 2026 – Present
*Open-source universal AI gateway — 90k★, 375+ LLM providers, single OpenAI-compatible endpoint, MCP server, A2A protocol, 21,000+ tests.*
- Authored **7 merged PRs**: fixed Claude thinking-block telemetry parsing (**PR #13969**), enforced Gemini-Web reasoning/tool constraints (**PR #9397**), fixed quota reset-window routing strategy prioritization (**PR #9353**), and eliminated Turbopack over-bundling warnings on MITM dynamic imports (**PR #6366**).
- Built an accessible "Configured Only" filter toggle for the live provider-rankings dashboard, mapping live connection state to a filterable data grid — 168 additions across 4 files, 9/9 tests passing, `role="switch"` + `aria-checked`; shipped into v3.8.45 (**PR #6245**).
- Integrated Claude 5 Sonnet into the `claude_web` provider registry with regression coverage (**PR #6209**, v3.8.45), normalized docs across 42 locales (**PR #6105**), and diagnosed a strict-provider system-message HTTP 400 regression (**PR #6172**) whose `systemMessageMustBeFirst` schema design the maintainer adopted into **PR #6225**.

---

## 6. Featured Projects

### 🏆 MiningNiti — AI Document Intelligence for Mining
*SIH 2023 National Winner (Ministry of Coal) · Recognized by Coal India Limited & CMPDI · Current repo: independent solo rebuild, June 2025 → present*
- **What:** A document-intelligence platform for coal mining — four AI agents analyse every uploaded regulation, a fifth audits compliance on demand, and a hybrid-retrieval chat answers questions about them with page-level citations. Retrieval quality is scored against a labelled golden set on every CI run, and the score blocks the build.
- **Project history (say this plainly — the repo README states it up front, so an interviewer who clicks through will see it):** two builds, two years apart. The Nov–Dec 2023 SIH entry was a *team* prototype and won the National Finale; CMPDI officials who judged the finals opened follow-up talks about deploying at scale, and those talks did not proceed — it was never deployed at CMPDI and there is no ongoing institutional relationship. The repository you link today is an independent, ground-up rebuild started June 2025, solo since, with none of the 2023 code carried over. Framing it this way is a strength: it turns a hackathon line into production work.
- **Problem:** Coal operations generate thousands of critical documents (MSHA regulations, equipment manuals, incident reports); finding one clause across 500 pages takes hours, and a missed regulation update means violations, fines, or lives.
- **Solution:** Four agents run on every upload — a Classifier (Groq gpt-oss-120b ↔ NVIDIA NIM) whose category feeds a Safety Analyzer (Mistral magistral-small ↔ NVIDIA NIM/Groq), Entity Extractor and Summarizer (NVIDIA NIM nemotron-3.5-super-vl-120b-a12b ↔ Groq) running concurrently under `asyncio.gather()`. A fifth, the Compliance Auditor (Groq ↔ NVIDIA NIM), runs on demand and produces a per-clause Pass / Fail / Not Addressed matrix. The safety analyzer is skipped for non-safety categories. Retrieval: Gemini embeddings (768-dim) → pgvector cosine (HNSW) fused with PostgreSQL full-text `ts_rank_cd` via Reciprocal Rank Fusion (k=60) → over-fetch 20 → ms-marco-MiniLM-L-6-v2 cross-encoder rerank to top 5, streamed over SSE with inline citations.
- **Stack:** Next.js 16, React 19, FastAPI 0.128+ (Python 3.14, uv), PostgreSQL 16 + pgvector, Supabase, Upstash Redis, Clerk Auth, NVIDIA NIM, Groq, Mistral, Gemini, Docker.
- **Results:** CI-gated retrieval quality — **Hit Rate@5 1.000**, MRR 1.000, Recall@5 0.958, nDCG@5 0.968 (floors 0.90 / 0.75 / 0.85 / 0.75) across 12 labelled queries over a 130-chunk corpus. **321 unit tests** (262 pytest unit + 59 pillar unittest) and **18 retrieval evals** pass offline out of **380 total collected tests**, spanning 11 API routers, **37 REST endpoints**, and **$0/month** infrastructure.
- **Engineering depth worth mentioning in interviews:**
  - Chose pdfplumber over PyMuPDF because PyMuPDF is AGPL-3.0 and the project ships MIT — and pdfplumber turned out to recover the tables PyMuPDF flattens, which matters because mining regulations are largely tabular.
  - Found a 400-row table collapsing into one 14,703-character chunk (Markdown tables have no sentence-ending punctuation, and the embedding model truncates silently past ~2,048 tokens, so most of it was never indexed with no error raised). Fixed with a hard 4,000-character chunk ceiling.
  - Proved the lexical arm was actually contributing: disabling it left every aggregate retrieval metric unchanged, so added direct guard tests that the lexical index returns rows and can distinguish 30 CFR 75.323 from 75.400.
  - Collapsed two compounding retry layers (orchestrator + agent base class reached nine attempts per failure) into one per-call failover loop.
  - Routed around free-tier quota limits using NVIDIA NIM (`nemotron-3.5-super-vl-120b-a12b` with thinking disabled for fast JSON) as primary for extraction & summarization and automatic quota failover for Groq & Mistral agents.
- **Known limits (state them; they read as maturity):** synchronous DB access inside async endpoints bounds per-worker throughput; the background queue is an in-process `asyncio.Queue` that does not span replicas (startup Postgres advisory locks recover interrupted rows on restart); analysis agents see ~15K characters of head and tail rather than the whole document (retrieval indexes the full text); the retrieval gate runs on a 130-chunk golden corpus, so its metrics are directional rather than a production-scale claim; there is no frontend unit test suite — all 321 unit tests are backend.
- **Differentiator worth leading with:** there is **no agent framework** in this repo — no LangChain, no LangGraph. Orchestration is hand-written on `asyncio.gather()` with per-agent error isolation, quota-aware provider failover and a content-addressed Redis cache (failed runs are never cached). Failure is loud: a section that cannot be produced lands on `Document.processing_error` and `metadata.degraded_sections` and is surfaced in the UI rather than returned as a silently empty result. LangSmith traces the orchestrator, hybrid search and chat generation.
- **Links:** GitHub github.com/Iammilansoni/MiningNiti · Demo miningniti.vercel.app *(free HuggingFace Space — a cold first request can take up to a minute)*

### NLPForge — Natural-Language to Validated REST API Router *(Standalone Open-Source Project · `Iammilansoni/NLPFT-2`)*
- **What:** Async FastAPI platform mapping plain-English instructions (e.g., `"refund order 8820"`) to schema-validated OpenAPI endpoints across **20+ LLM and embedding providers**.
- **Solution & Ablation:** `pgvector HNSW` retrieval + strict Pydantic v2 schema rules + local Ollama fallback; benchmark ablation proved cross-encoder reranking degraded short-command API routing, so disabling it lifted **top-1 accuracy from 59% to 80%** (**97% top-3**) on a 180-query CI gate and cut ungrounded values from **55 to 1 per 100 requests (98% precision)**.
- **Stack:** FastAPI, SQLAlchemy 2.0, Pydantic v2, PostgreSQL + `pgvector` (Row-Level Security), Celery, Redis, Next.js, Ollama, Docker, pytest.
- **Results:** **80% top-1 / 97% top-3** routing accuracy, **98% precision**, **43** RLS-isolated tenancy endpoints, **229 pytest tests** (197 unit + 32 PostgreSQL integration).
- **Links:** GitHub github.com/Iammilansoni/NLPFT-2

### FinSageAI360 — AI Financial Intelligence *(built at OBG Outsourcing)*
- **What:** Multi-tenant SaaS ingesting accounting feeds with JWT/RBAC ledger isolation and automated financial anomaly-validation checks.
- **Stack:** Next.js, Node.js, MongoDB, Prisma, JWT, RBAC, AI analytics.
- **Scope:** Multi-tenant ledger isolation and automated close-validation workflows.

### SmartLearnX — AI-Assisted LMS *(freelance)*
- **What:** Adaptive learning platform integrating a FastAPI ML microservice, BERT quiz generation, and a spaCy chatbot assistant.
- **Stack:** React, TypeScript, Node.js, FastAPI, MongoDB, Redis, BullMQ, Docker, Nginx, BERT, spaCy.
- **Scope:** Logistic Regression dropout risk scoring, Random Forest forecasting, and automated NLP student support.

---

## 7. Education

**B.Tech, Computer Science & Engineering** — Global Institute of Technology, Jaipur, Rajasthan
*Oct 2022 – Apr 2026 · CGPA: 8.10 (graduating 2026)*
- **Core coursework:** Data Structures & Algorithms, Artificial Intelligence, Database Management Systems, Operating Systems, Computer Networks, Object-Oriented Programming.

---

## 8. Achievements, Certifications & Leadership

- 🏆 **SIH 2023 National Winner** — Ministry of Coal problem statement; Top 1% of 44,000+ teams; recognized by Coal India Limited & CMPDI.
- 📄 **Scopus-Indexed Publication** — Peer-reviewed paper on hybrid attention-based temporal modeling (PiCET-2026, IET Conference Proceedings).
- 🥇 **First Place — Jigyasa Event (GIT Jaipur)** — Blockchain technology, smart contracts & decentralized systems presentation.
- 📜 **NASSCOM Certified Full Stack Developer** — IT-ITeS Sector Skills Council (2024).
- 🎤 **Organising Team & Sponsorship Head — CodeFiesta 3.0 & 4.0 (2024–2025)** — national-level hackathon, GIT Jaipur. **Sponsors: 18+** — outreach, partnership negotiation, sponsor relationships. Handled logistics, scaling, and technical operations across two editions of the event.
  - **Verified in the institute's official 4.0 report** ([PDF](https://gitjaipur.com/wp-content/uploads/2026/01/hackathon-Report_4.0.pdf)): **200 teams** in the 2025 participants list, **13 teams** in the final round, **24-hour** onsite format, 9–10 Oct 2025.
  - **Verified on** [gitjaipur.com](https://gitjaipur.com/national-level-hackathons/): participants **650+ (2024) → 750+ (2025)**; colleges **25+ → 30+**.
- 👥 **Class Representative (2 years)** and volunteer programming tutor for junior students.
- 🌐 **Open-source contributor** — 7 merged PRs into OmniRoute (90k★, 375+ providers).

---

## 9. Technical Writing (Blog / Medium)

- **RSC + Streaming LLMs: Zero-Latency AI Dashboards with Next.js Server Actions** — progressive streaming dropped TTFB from 3.2s → 120ms, cut client JS 40%.
- **The State Machine Paradigm: Ditching Linear LLM Chains for LangGraph Multi-Agent Workflows** — covers MiningNiti's earlier LangGraph stage before the 2026 rebuild moved to framework-free `asyncio.gather()`.
- **Stop Overpaying for Vector DBs: A Production Hybrid RAG Pipeline for $0/Month** — replaced Pinecone ($400/mo) with pgvector on Supabase; CI-gated retrieval at **Hit Rate@5 1.000, nDCG@5 0.968** (earlier non-reproducible numbers withdrawn).
- **How I Built a Production Multi-Agent AI System That Won a National Hackathon** — updated 2026 architecture dive on MiningNiti's 5-agent `asyncio.gather()` pipeline & `asyncio.Queue` job recovery.
- **Research: Deploying Agentic AI in Production** — state machines over prompt engineering; strict guardrails (Pydantic/Zod) for reliable agents.

---

## 10. Quantified Impact (for bullet-point reuse)

| Metric / Scope | Context |
|----------------|---------|
| Top 1% / 44,000+ teams | SIH 2023 National win |
| Deterministic 12-query / 130-chunk CI retrieval regression gate | MiningNiti retrieval |
| 321 unit tests + 18 retrieval evals offline · 380 collected · 37 endpoints | MiningNiti |
| $0/month infrastructure | MiningNiti / hybrid RAG |
| 6-service Docker Compose · 18 Alembic migrations · 8 LLM providers | nTheta Works internship |
| 80% top-1 · 97% top-3 · 98% precision (55 → 1) · 229 pytest · 43 RLS endpoints | NLPForge (`Iammilansoni/NLPFT-2`) |
| Multi-tenant JWT/RBAC ledger isolation & anomaly validation | FinSageAI360 (OBG Outsourcing) |
| FastAPI ML microservice + BERT quiz & spaCy chatbot | SmartLearnX (freelance) |
| LangChain + FAISS document indexing & Node.js lookup APIs | Om Logistics internship |
| Open-source logic/telemetry/UI PRs in 90k★ project (375+ providers) | OmniRoute (part-time OSS) |

---

## 11. Resume Tips for Tailoring

- **Lead with the strongest three:** SIH National win, Scopus paper, and OmniRoute contributions — these differentiate you from other new grads.
- **For AI/ML roles:** emphasize MiningNiti, NLPForge, RAG/LangGraph writing, and the research paper.
- **For full-stack/SWE roles:** emphasize FinSageAI360, SmartLearnX, REST/RBAC APIs, Docker/CI-CD, and React/FastAPI depth.
- **Keep bullets in XYZ form:** "Accomplished [X] as measured by [Y] by doing [Z]." The metrics table above supplies the Y.
- **One-page rule:** as a new grad, prioritize the win + paper + top 2 projects + 2 strongest internships; move the rest to a longer LinkedIn/portfolio version.
