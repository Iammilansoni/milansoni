<div align="center">

```text
  __  __ ___ _        _    _   _       ____   ___  _   _ ___       ____   ___  ____ _____ _____ ___  _     ___ ___  
 |  \/  |_ _| |      / \  | \ | |     / ___| / _ \| \ | |_ _|     |  _ \ / _ \|  _ \_   _|  ___/ _ \| |   |_ _/ _ \ 
 | |\/| || || |     / _ \ |  \| |     \___ \| | | |  \| || |      | |_) | | | | |_) || | | |_ | | | | |    | | | | |
 | |  | || || |___ / ___ \| |\  |      ___) | |_| | |\  || |      |  __/| |_| |  _ < | | |  _|| |_| | |___ | | |_| |
 |_|  |_|___|_____/_/   \_\_| \_|     |____/ \___/|_| \_|___|     |_|    \___/|_| \_\|_| |_|   \___/|_____|___\___/ 
```

**AI Engineer · Full Stack Developer · RAG Specialist**

[![Portfolio](https://img.shields.io/badge/Portfolio-milansoni.vercel.app-aurora?style=for-the-badge)](https://milansoni.vercel.app)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-sonimilan-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/sonimilan/)
[![GitHub](https://img.shields.io/badge/GitHub-Iammilansoni-333?style=for-the-badge&logo=github)](https://github.com/Iammilansoni)
[![Email](https://img.shields.io/badge/Email-milansoni96946@gmail.com-EA4335?style=for-the-badge&logo=gmail)](mailto:milansoni96946@gmail.com)

---

# Milan Soni — AI Engineer & Full Stack Developer

**Building production RAG pipelines, multi-agent AI systems, and scalable enterprise platforms.**

</div>

## About Me

I'm **Milan Soni**, an AI Engineer and Full Stack Developer. I ship production RAG pipelines, multi-agent orchestration systems, and multi-provider LLM infrastructure.

- **SIH 2023 National Winner** — Top 1% out of 44,000+ teams, recognized by Coal India Limited & CMPDI
- **Open Source Contributor** — 5+ PRs merged to OmniRoute (50k★), 21,000+ tests, across 4 releases
- **Scopus-Indexed Researcher** — Peer-reviewed paper on hybrid attention-based temporal modeling (PICET-2026, IET Conference Proceedings)
- **CS Graduate (2026)** — B.Tech CSE from Global Institute of Technology, Jaipur (CGPA: 8.10)

---

## What I Build

| Area | What I Do |
|------|-----------|
| **AI / LLM Engineering** | Production RAG pipelines with hybrid search, multi-agent orchestration (5 agents), cross-encoder reranking, evaluation harnesses |
| **Full Stack** | React 19 + TanStack Start frontends, FastAPI async backends, Clerk auth, enterprise RBAC |
| **Data & Infrastructure** | PostgreSQL + pgvector, Redis HNSW indexes, Docker orchestration, $0/month free-tier deployments |
| **Systems Thinking** | Algorithm design, scalable backend architecture, multi-provider AI orchestration |

---

## Featured Projects

### MiningNiti — AI Document Intelligence for Mining

> **SIH 2023 National Winner** | Recognized by Coal India Limited & CMPDI

A document-intelligence platform for coal mining: five specialized AI agents analyze every uploaded regulation, and a hybrid-retrieval chat answers questions with page-level citations. Retrieval quality is scored in CI and the score blocks the build.

```
    Document Upload
           │
           ▼
    ┌──────────────┐
    │  Classifier  │  Groq gpt-oss-120b — runs FIRST
    └──────┬───────┘  its category feeds the rest
           │
     ┌─────┴──────────┬─────────────────┐   asyncio.gather()
     ▼                ▼                 ▼
 Safety Analyzer  Entity Extractor  Summarizer
 (Mistral)        (Cerebras)        (Cerebras)
 skipped for
 non-safety docs
           │
           ▼
    Chunks + Embeddings → pgvector (HNSW)

    ┌────────────────────┐
    │ Compliance Auditor │  Groq — ON DEMAND, not on upload
    └────────────────────┘  per-clause Pass / Fail / Not Addressed
```

An Orchestrator coordinates these five; it is a coordinator, not a sixth agent.

**Retrieval:** 23 injection-guard patterns + 1,500-char cap → Gemini gemini-embedding-001 (768-dim) → pgvector cosine (HNSW) fused with PostgreSQL full-text `ts_rank_cd` via Reciprocal Rank Fusion (k=60) → over-fetch 20 → ms-marco-MiniLM-L-6-v2 cross-encoder → top 5 → streamed over SSE with inline `[Document, Page X]` citations. *(The lexical arm is Postgres full-text search, not true BM25.)*

**Tech:** Next.js 16, React 19, FastAPI, PostgreSQL + pgvector, Supabase, Upstash Redis, Clerk Auth, Groq, Cerebras, Mistral, Gemini, Docker

**Quality gate (CI):** Hit Rate@5 1.000 · MRR 1.000 · Recall@5 0.958 · nDCG@5 0.968 — against floors of 0.90 / 0.75 / 0.85 / 0.75 on 12 labelled queries over a 130-chunk corpus.

**Results:** Won SIH 2023 National Finale. 5 AI agents, 4 providers, 262 tests, 26.2K lines, $0/month infrastructure.

**Links:** [GitHub](https://github.com/Iammilansoni/MiningNiti) | [Live Demo](https://miningniti.vercel.app/)

---

### NLPForge — NLP Dataset Generator & Semantic Search

> Enterprise AI NLP Platform

An enterprise-grade platform bridging natural language and API testing. Describe what you want to test in plain English, and NLPForge processes your request through a two-stage retrieval pipeline to produce structured, executable API test cases.

```
  Input: "Authenticate with email user@test.com and password pass123"
                          │
                          ▼
  ┌─────────────────────────────────────────┐
  │  Stage 1: KNN Vector Similarity Search  │
  │  Ollama → Redis HNSW (Top-5)           │
  ├─────────────────────────────────────────┤
  │  Stage 2: FlashRank Cross-Encoder       │
  │  ms-marco-MiniLM-L-12-v2 Reranking     │
  └─────────────────────────────────────────┘
                          │
                          ▼
  { api_name, endpoint, method, extracted_body }
```

**Tech:** Next.js 16, FastAPI, SQLAlchemy 2.0, PostgreSQL 15, Redis Stack 7.2, FlashRank, Ollama, Docker

**Results:** 8 LLM providers, 15+ embedding models, 40% accuracy improvement, 60% QA effort reduction.

**Links:** [GitHub](https://github.com/Iammilansoni/NLPFT-2)

---

### FinSageAI360 — AI Financial Intelligence

> Built at OBG Outsourcing

A multi-tenant SaaS that ingests accounting feeds, normalises them, and surfaces AI-generated cashflow, risk, and anomaly insights.

**Tech:** Next.js, Node.js, MongoDB, Prisma, JWT, AI Analytics

**Results:** +45% faster report cycles, +30% operational efficiency, enterprise-grade RBAC.

---

### SmartLearnX — AI-Powered LMS

> Freelance Project

An adaptive educational ecosystem integrating AI, ML, NLP, and modern full-stack web technologies to enhance learning outcomes through personalized course recommendations, dropout prediction, and AI-powered assessments.

**Tech:** React, TypeScript, Node.js, FastAPI, MongoDB, Redis, Docker, Machine Learning

**Results:** 91.4% dropout prediction accuracy, 0.89 R² forecasting score, 24/7 NLP chatbot support.

---

## Experience

| Role | Company | Period | Key Impact |
|------|---------|--------|------------|
| Open Source Contributor | [OmniRoute](https://github.com/diegosouzapw/OmniRoute) (50k★) | Jul 2026 | 5+ PRs shipped: HTTP 400 fix (schema adoption), provider filter (9/9 tests), Claude 5 Sonnet integration, 42-locale docs normalization |
| Full Stack Developer Intern | nTheta Works | Oct – Dec 2025 | Two-stage semantic retrieval pipeline: 40% accuracy improvement, 60% QA reduction |
| AI & Full Stack Developer | Freelance | Jul – Aug 2025 | ML dropout prediction (91.4%), performance forecasting (R²=0.89), 24/7 NLP chatbot |
| Full Stack Developer Intern | OBG Outsourcing | May – Jul 2025 | Led FinSageAI360: +45% report speed, +30% operational efficiency |
| Software Developer Intern | Om Logistics | Jun – Aug 2024 | LangChain + FAISS: 70% latency reduction across 10K+ docs |

---

## Open Source — OmniRoute

> [OmniRoute](https://github.com/diegosouzapw/OmniRoute) · 50k★ · 230+ LLM providers · Open-source universal AI gateway

Contributed to the largest open-source universal AI gateway — a single OpenAI-compatible endpoint routing across 230+ LLM providers with MCP server, A2A protocol, memory system, guardrails, and 21,000+ tests.

### Frontend Engineering (React / Next.js)

Shipped an accessible **"Configured Only"** filter for the provider-rankings dashboard — maps live `/api/providers` connection state to a filterable data grid with a "Status" column, `role="switch"` with `aria-checked` for screen reader accessibility, `useEffect` cleanup for memory-leak prevention, and a full Vitest suite. **168 additions across 4 files, 9/9 tests passing (PR #6245, v3.8.45).**

### API & Provider Integrations (Claude 5 Sonnet)

Integrated **Claude 5 Sonnet** into the `claude_web` provider registry with a registry regression test, shipping a verified signed commit within hours of the model's release. **PR #6209, v3.8.45.**

### Architecture & CI/CD Pipelines

Audited 9 core docs and ~20 localized READMEs across 42 locales, removing untranslated Portuguese/Chinese prose and correcting stale architecture facts (routing strategies **13→17**, service modules **36→134**). Passed `docs-sync-strict` CI gate — **zero regressions (PR #6105, v3.8.44).**

### Core Backend Logic & Schema Design

Diagnosed an HTTP 400 regression for strict LLM providers (Xiaomi MiMo) caused by system-message ordering in the memory-injection pipeline. Proposed a **declarative Zod schema** with a `systemMessageMustBeFirst` flag — adopted by the maintainer into the broader shipped fix. **25/25 Vitest + 30/30 Node test-runner coverage (PR #6225).**

---

## Tech Stack

```
Languages       : JavaScript (ES6+) · TypeScript · Python · C++
Frontend        : React 19 · TanStack Start · TanStack Router · TanStack Query · Tailwind CSS v4 · Framer Motion · Recharts · Radix UI / shadcn · Three.js
Backend         : FastAPI 0.128 · Node.js · Express.js · SQLAlchemy 2.0 · Pydantic v2 · JWT · Clerk Auth · RBAC · Microservices
AI / ML         : LangChain · LangGraph · RAG Pipelines · Hybrid Search (Vector + BM25) · Cross-Encoder Reranking · FlashRank · Ollama · AI Agents · pgvector
LLM Providers   : Groq (Llama 3.3) · Cerebras (GPT-OSS-120B) · Mistral (Magistral) · Google Gemini · OpenAI · Anthropic · DeepSeek · HuggingFace
Databases       : PostgreSQL + pgvector · Supabase · MongoDB · Redis Stack 7.2 (HNSW) · Upstash Redis · Prisma ORM
Cloud / DevOps  : Vercel · Nitro · HuggingFace Spaces · Docker Compose · GitHub Actions CI/CD · Linux · Git
```

---

## Portfolio Architecture

This repository is a production-grade personal portfolio built with modern web engineering principles.

```
milan-vision-labs/
├── src/
│   ├── routes/                  # TanStack Router file-based routes
│   │   ├── __root.tsx           # Root layout (nav, footer, AI chat, command palette)
│   │   ├── index.tsx            # Home (Hero + Bento + Projects + Experience + Education + Marquee + Articles + Testimonials + CTA)
│   │   ├── about.tsx            # About page with journey timeline
│   │   ├── work.index.tsx       # Projects listing
│   │   ├── work.$slug.tsx       # Individual project case studies
│   │   ├── blog.index.tsx       # Blog listing (Medium + local articles)
│   │   ├── blog.$slug.tsx       # Individual blog post with TOC + code blocks
│   │   ├── experience.tsx       # Work experience
│   │   └── contact.tsx          # Contact form
│   ├── components/
│   │   ├── sections/            # Page sections (Hero, BentoGrid, FeaturedProjects, etc.)
│   │   ├── ui/                  # 50+ reusable UI primitives (shadcn/ui + custom)
│   │   └── blog/                # Blog components (TOC, code blocks, reading progress)
│   ├── content/
│   │   └── blog/                # Local markdown articles
│   ├── lib/
│   │   ├── site.ts              # Centralized data (projects, experience, tech stack)
│   │   ├── chat.ts              # Gemini AI chat server function
│   │   ├── blog.ts              # Article types + server functions (local + Medium)
│   │   ├── medium.functions.ts  # Medium RSS feed integration
│   │   ├── sound.tsx            # Sound effects
│   │   └── utils.ts             # Utility functions
│   ├── hooks/                   # Custom React hooks
│   └── styles.css               # Tailwind v4 + oklch Aurora design tokens
├── public/                      # Static assets (favicon, images, resume, blog covers)
├── vite.config.ts               # Vite + TanStack Start + Nitro
├── components.json              # shadcn/ui config (new-york style)
└── package.json
```

### Key Features

- **Dynamic Hero Section** — Ambient drifting blobs, noise overlays, and scroll-linked parallax
- **Bento Grid Layout** — Re-engineered project card stacking with solid backdrops to prevent visual bleed-through
- **Tech Marquee** — Infinite scrolling technology showcase with dual-row animation
- **WebGL Background** — Three.js-powered neural network particle system (lazy-loaded for performance)
- **Command Palette** — Cmd+K search interface for quick navigation
- **AI Chat** — Gemini-powered chat assistant with portfolio context (scoped to article content on blog posts)
- **Blog System** — Markdown-based with TOC sidebar, code blocks with syntax highlighting, reading progress, and Medium RSS integration
- **Scroll Progress** — Visual scroll indicator with aurora gradient
- **Glassmorphic Design System** — Custom oklch "Aurora" color palette with glass effects, powered by Tailwind CSS v4
- **SEO Optimized** — Meta tags, Open Graph, canonical URLs, structured data (JSON-LD), sitemap, robots.txt

---

## Local Development

```bash
# Clone the repository
git clone https://github.com/Iammilansoni/milansoni.git
cd milan-vision-labs

# Install dependencies
bun install    # or npm install

# Start development server
bun dev        # or npm run dev

# Build for production
bun build      # or npm run build

# Preview production build
bun preview    # or npm run preview
```

### Scripts

| Command | Description |
|---------|-------------|
| `bun dev` | Start Vite dev server |
| `bun build` | Production build |
| `bun build:dev` | Development-mode build |
| `bun preview` | Preview production build |
| `bun lint` | Run ESLint |
| `bun format` | Format with Prettier |

---

## Deployment

This portfolio is deployed on **Vercel** with automatic deployments from the `main` branch. The build uses **Nitro** with the Vercel preset for edge-optimized server-side rendering.

**Live:** [https://milansoni.vercel.app](https://milansoni.vercel.app)

---

## Contact

| Platform | Link |
|----------|------|
| **Email** | [milansoni96946@gmail.com](mailto:milansoni96946@gmail.com) |
| **LinkedIn** | [linkedin.com/in/sonimilan](https://www.linkedin.com/in/sonimilan/) |
| **GitHub** | [github.com/Iammilansoni](https://github.com/Iammilansoni) |
| **Medium** | [medium.com/@milansoni96946](https://medium.com/@milansoni96946) |
| **Instagram** | [instagram.com/iammilansoni](https://www.instagram.com/iammilansoni) |
| **Portfolio** | [milansoni.vercel.app](https://milansoni.vercel.app) |

---

<div align="center">

**Built with React 19, TanStack Start, Tailwind CSS v4, Three.js, and Framer Motion.**

Designed & Developed with passion by Milan Soni.

</div>
