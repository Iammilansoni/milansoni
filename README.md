<div align="center">

```
███╗   ███╗██╗███╗   ██╗██╗     ███████╗ █████╗ ███╗   ██╗ ██████╗████████╗██╗   ██╗███╗   ███╗
████╗ ████║██║████╗  ██║██║     ██╔════╝██╔══██╗████╗  ██║██╔════╝╚══██╔══╝██║   ██║████╗ ████║
██╔████╔██║██║██╔██╗ ██║██║     █████╗  ███████║██╔██╗ ██║██║        ██║   ██║   ██║██╔████╔██║
██║╚██╔╝██║██║██║╚██╗██║██║     ██╔══╝  ██╔══██║██║╚██╗██║██║        ██║   ██║   ██║██║╚██╔╝██║
██║ ╚═╝ ██║██║██║ ╚████║███████╗███████╗██║  ██║██║ ╚████║╚██████╗   ██║   ╚██████╔╝██║ ╚═╝ ██║
╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝╚══════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝   ╚═╝    ╚═════╝ ╚═╝     ╚═╝
```

# Milan Soni — AI Engineer & Full Stack Developer

**Building production RAG pipelines, multi-agent AI systems, and scalable enterprise platforms.**

[![Portfolio](https://img.shields.io/badge/Portfolio-milansoni.vercel.app-aurora?style=for-the-badge)](https://milansoni.vercel.app)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-sonimilan-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/sonimilan/)
[![GitHub](https://img.shields.io/badge/GitHub-Iammilansoni-333?style=for-the-badge&logo=github)](https://github.com/Iammilansoni)
[![Email](https://img.shields.io/badge/Email-milansoni96946@gmail.com-EA4335?style=for-the-badge&logo=gmail)](mailto:milansoni96946@gmail.com)

---

</div>

## About Me

I'm **Milan Soni**, an AI Engineer and Full Stack Developer based in Churu, Rajasthan. I specialize in transforming complex real-world bottlenecks into intelligent, automated, and beautifully designed software systems.

- **SIH 2023 National Winner** — Top 1% out of 44,000+ teams, recognized by Coal India Limited & CMPDI
- **Scopus-Indexed Researcher** — Peer-reviewed paper on hybrid attention-based temporal modeling (PICET-2026, IET Conference Proceedings)
- **CS Graduate (2026)** — B.Tech CSE from Global Institute of Technology, Jaipur (CGPA: 8.10)
- **3 Enterprise Internships** — Shipped production systems at nTheta Works, OBG Outsourcing, and Om Logistics

---

## What I Build

| Area | What I Do |
|------|-----------|
| **AI / LLM Engineering** | Production RAG pipelines with hybrid search, multi-agent orchestration (6 agents), cross-encoder reranking, evaluation harnesses |
| **Full Stack** | Next.js 16 + React 19 frontends, FastAPI async backends, Clerk auth, enterprise RBAC |
| **Data & Infrastructure** | PostgreSQL + pgvector, Redis HNSW indexes, Docker orchestration, $0/month free-tier deployments |
| **Systems Thinking** | Algorithm design, scalable backend architecture, multi-provider AI orchestration |

---

## Featured Projects

### MiningNiti — AI Document Intelligence for Mining

> **SIH 2023 National Winner** | Recognized by Coal India Limited & CMPDI

A full-stack AI platform combining a multi-agent AI pipeline (6 specialized agents across 4 AI providers) with production-grade RAG (hybrid search + cross-encoder reranking) and real-time compliance auditing.

```
    Document Upload
           │
           ▼
    ┌─────────────┐
    │ Orchestrator │──── Runs 6 agents concurrently via asyncio
    └──────┬──────┘
           │
     ┌─────┼─────┬──────────┬──────────┬────────────┐
     ▼     ▼     ▼          ▼          ▼            ▼
Classifier Safety  Entity    Summarizer  Compliance
  Agent   Analyzer Extractor   Agent      Auditor
(Groq)  (Mistral) (Cerebras) (Cerebras) (Gemini)
     │     │     │          │          │            │
     └─────┴─────┴──────────┴──────────┴────────────┘
           │
           ▼
    Chunks + Embeddings → pgvector (HNSW index)
```

**Tech:** Next.js 16, React 19, FastAPI, PostgreSQL + pgvector, Supabase, Upstash Redis, Clerk Auth, Groq, Cerebras, Mistral, Gemini, Docker

**Results:** Won SIH 2023 National Finale. 6 AI agents, 4 providers, $0/month infrastructure cost.

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
| Full Stack Developer Intern | nTheta Works | Oct – Dec 2025 | Two-stage semantic retrieval, 40% accuracy improvement |
| AI & Full Stack Developer | Freelance | Jul – Aug 2025 | 91.4% dropout prediction, NLP chatbot |
| Full Stack Developer Intern | OBG Outsourcing | May – Jul 2025 | +45% report speed, +30% efficiency |
| Software Developer Intern | Om Logistics | Jun – Aug 2024 | 70% latency reduction, 10K+ docs |

---

## Tech Stack

```
Languages       : JavaScript (ES6+) · TypeScript · Python · C++
Frontend        : React 19 · Next.js 16 · Redux · Tailwind CSS v4 · Framer Motion · Recharts · Radix UI / shadcn
Backend         : FastAPI 0.128 · Node.js · Express.js · SQLAlchemy 2.0 · Pydantic v2 · JWT · Clerk Auth · RBAC · Microservices
AI / ML         : LangChain · LangGraph · RAG Pipelines · Hybrid Search (Vector + BM25) · Cross-Encoder Reranking · FlashRank · Ollama · AI Agents · pgvector
LLM Providers   : Groq (Llama 3.3) · Cerebras (GPT-OSS-120B) · Mistral (Magistral) · Google Gemini · OpenAI · Anthropic · DeepSeek · HuggingFace
Databases       : PostgreSQL + pgvector · Supabase · MongoDB · Redis Stack 7.2 (HNSW) · Upstash Redis · Prisma ORM
Cloud / DevOps  : Vercel · HuggingFace Spaces · Docker Compose · GitHub Actions CI/CD · Linux · Git
```

---

## Portfolio Architecture

This repository is a production-grade personal portfolio built with modern web engineering principles.

```
milan-vision-labs/
├── src/
│   ├── routes/              # TanStack Router file-based routes
│   │   ├── index.tsx        # Home (Hero + Bento + Projects + Experience + Education)
│   │   ├── about.tsx        # About page with journey timeline
│   │   ├── work.index.tsx   # Projects listing
│   │   ├── work.$slug.tsx   # Individual project case studies
│   │   ├── research.tsx     # Publications
│   │   ├── lab.tsx          # AI Lab
│   │   ├── blog.tsx         # Blog (Medium + local)
│   │   └── contact.tsx      # Contact form
│   ├── components/
│   │   ├── sections/        # Page sections (Hero, BentoGrid, FeaturedProjects, etc.)
│   │   ├── ui/              # Reusable UI primitives (shadcn/ui + custom)
│   │   └── blog/            # Blog components
│   ├── lib/
│   │   └── site.ts          # Centralized data (projects, experience, tech stack)
│   └── hooks/               # Custom React hooks
├── public/                  # Static assets
├── vite.config.ts           # Vite + TanStack Router plugin
├── tailwind.config.ts       # Tailwind CSS v4 with Aurora palette
└── package.json
```

### Key Features

- **Dynamic Hero Section** — Ambient drifting background blobs, noise overlays, and scroll-linked parallax
- **Bento Grid Layout** — Re-engineered project card stacking with solid backdrops to prevent visual bleed-through
- **Sticky Project Cards** — Scroll-pinned case study cards with scale/opacity transitions
- **Tech Marquee** — Infinite scrolling technology showcase with dual-row animation
- **WebGL Background** — Three.js-powered ambient background (lazy-loaded for performance)
- **Command Palette** — Cmd+K search interface for quick navigation
- **AI Chat** — Gemini-powered chat assistant with portfolio context
- **Scroll Progress** — Visual scroll indicator with aurora gradient
- **Glassmorphic Design System** — Custom HSL "Aurora" color palette with glass effects
- **SEO Optimized** — Meta tags, Open Graph, canonical URLs, structured data (JSON-LD)

---

## Local Development

```bash
# Clone the repository
git clone https://github.com/Iammilansoni/milan-vision-labs.git
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
| `bun preview` | Preview production build |
| `bun lint` | Run ESLint |
| `bun format` | Format with Prettier |

---

## Deployment

This portfolio is deployed on **Vercel** with automatic deployments from the `main` branch.

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

**Built with React 19, Next.js 16, TanStack Router, Tailwind CSS v4, and Framer Motion.**

Designed & Developed with passion by Milan Soni.

</div>
