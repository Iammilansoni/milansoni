<div align="center">

# Milan Soni

### AI Engineer · Full Stack Developer · RAG Specialist

<p>
  <a href="https://milansoni.vercel.app"><img src="https://img.shields.io/badge/Portfolio-milansoni.vercel.app-000?style=flat-square&logo=vercel" alt="Portfolio"/></a>
  <a href="https://www.linkedin.com/in/sonimilan"><img src="https://img.shields.io/badge/LinkedIn-sonimilan-0A66C2?style=flat-square&logo=linkedin" alt="LinkedIn"/></a>
  <a href="https://medium.com/@milansoni96946"><img src="https://img.shields.io/badge/Medium-@milansoni96946-12100E?style=flat-square&logo=medium" alt="Medium"/></a>
  <a href="mailto:milansoni96946@gmail.com"><img src="https://img.shields.io/badge/Email-milansoni96946-EA4335?style=flat-square&logo=gmail" alt="Email"/></a>
</p>

<img src="https://komarev.com/ghpvc/?username=iammilansoni&label=Profile%20views&color=0e75b6&style=flat" alt="Profile Views" />

</div>

---

I build production RAG pipelines, multi-agent AI systems, and scalable enterprise platforms. SIH 2023 National Winner. Scopus-indexed researcher. Recent graduate looking for full-time roles where I can ship product end-to-end.

---

## What I Build

| Area | What I Do |
|------|-----------|
| **AI / LLM Engineering** | Production RAG pipelines with hybrid search, multi-agent orchestration (6 agents), cross-encoder reranking, evaluation harnesses |
| **Full Stack** | React 19 + TanStack Start frontends, FastAPI async backends, Clerk auth, enterprise RBAC |
| **Data & Infrastructure** | PostgreSQL + pgvector, Redis HNSW indexes, Docker orchestration, $0/month free-tier deployments |
| **Systems Thinking** | Algorithm design, scalable backend architecture, multi-provider AI orchestration |

---

## Open Source — OmniRoute

> [OmniRoute](https://github.com/diegosouzapw/OmniRoute) · 10.9k★ · 231+ LLM providers · Open-source universal AI gateway

Contributed across documentation, provider registry, frontend UX, and backend core:

| Contribution | What I Did | Status |
|-------------|-----------|--------|
| **Docs & i18n** (PR [#6105](https://github.com/diegosouzapw/OmniRoute/pull/6105)) | Audited and normalized 9 core docs + 20 localized READMEs across 42 locales. Removed untranslated Portuguese/Chinese prose, corrected stale architecture metrics. | Merged → v3.8.44 |
| **Claude 5 Sonnet** (PR [#6209](https://github.com/diegosouzapw/OmniRoute/pull/6209)) | Added Claude 5 Sonnet to the Claude Web provider registry with regression test coverage, shipped within hours of a user-reported bug. | Merged → v3.8.45 |
| **UI Filter** (PR [#6245](https://github.com/diegosouzapw/OmniRoute/pull/6245)) | Built an accessible "Configured Only" toggle for the provider-rankings dashboard. Added test coverage and memory-leak safeguards through code review. | Merged → v3.8.45 |
| **Memory Injection** (PR [#6172](https://github.com/diegosouzapw/OmniRoute/pull/6172)) | Diagnosed HTTP 400 regression for strict LLM providers caused by system-message ordering. Delivered a tested fix with `systemMessageMustBeFirst` provider flag — design adopted into maintainer's shipped fix. | In review |
| **Schema Proposal** ([#6241](https://github.com/diegosouzapw/OmniRoute/issues/6241)) | Proposed standardizing reasoning-model parameters (effort/thinking) as first-class fields in the core request schema. | Open |

---

## Featured Projects

### MiningNiti — AI Document Intelligence

> **SIH 2023 National Winner** · Recognized by Coal India Limited & CMPDI

Full-stack AI platform combining 6 specialized agents across 4 providers (Groq, Cerebras, Mistral, Gemini) with production RAG (hybrid search + cross-encoder reranking) and real-time compliance auditing. Deployed on $0/month infrastructure.

**Tech:** Next.js 16, React 19, FastAPI, PostgreSQL + pgvector, Supabase, Upstash Redis, Clerk Auth, Docker

[GitHub](https://github.com/Iammilansoni/MiningNiti) · [Live Demo](https://miningniti.vercel.app/)

---

### NLPForge — Enterprise AI NLP Platform

Two-stage retrieval pipeline (Ollama embeddings → Redis HNSW KNN → FlashRank cross-encoder reranking) for natural-language-to-API test case generation. 8 LLM providers, 15+ embedding models.

**Tech:** Next.js 16, FastAPI, SQLAlchemy 2.0, PostgreSQL 15, Redis Stack 7.2, FlashRank, Ollama, Docker

[GitHub](https://github.com/Iammilansoni/NLPFT-2)

---

### FinSageAI360 — AI Financial Intelligence

Multi-tenant SaaS for accounting feed ingestion, normalization, and AI-generated cashflow/risk/anomaly insights. Built at OBG Outsourcing. +45% faster report cycles, +30% operational efficiency.

**Tech:** Next.js, Node.js, MongoDB, Prisma, JWT, AI Analytics

---

### SmartLearnX — AI-Powered LMS

Adaptive learning platform with dropout prediction (91.4% accuracy), academic forecasting (0.89 R²), and NLP-powered assessments. Freelance project.

**Tech:** React, TypeScript, Node.js, FastAPI, MongoDB, Redis, Docker, ML

---

## Experience

| Role | Company | Period | Key Impact |
|------|---------|--------|------------|
| Open Source Contributor | [OmniRoute](https://github.com/diegosouzapw/OmniRoute) | Jul 2026 | 3 PRs merged (docs/i18n, provider registry, UI filter) across v3.8.44–v3.8.45 |
| Full Stack Developer Intern | nTheta Works | Oct – Dec 2025 | Two-stage semantic retrieval, 40% accuracy improvement |
| AI & Full Stack Developer | Freelance | Jul – Aug 2025 | 91.4% dropout prediction, NLP chatbot |
| Full Stack Developer Intern | OBG Outsourcing | May – Jul 2025 | +45% report speed, +30% efficiency |
| Software Developer Intern | Om Logistics | Jun – Aug 2024 | 70% latency reduction across 10K+ documents |

---

## Tech Stack

```
Languages       : JavaScript (ES6+) · TypeScript · Python · C++
Frontend        : React 19 · TanStack Start · Next.js · Tailwind CSS v4 · Framer Motion · Three.js · Radix UI / shadcn
Backend         : FastAPI · Node.js · Express.js · SQLAlchemy 2.0 · Pydantic v2 · JWT · Clerk Auth · RBAC
AI / ML         : LangChain · LangGraph · RAG Pipelines · Hybrid Search · Cross-Encoder Reranking · FlashRank · Ollama · AI Agents · pgvector
LLM Providers   : Groq · Cerebras · Mistral · Gemini · OpenAI · Anthropic · DeepSeek
Databases       : PostgreSQL + pgvector · Supabase · MongoDB · Redis Stack 7.2 · Prisma ORM
Cloud / DevOps  : Vercel · Nitro · Docker Compose · GitHub Actions · Linux · Git
```

---

## GitHub Stats

<div align="center">

![Milan's GitHub Stats](https://github-readme-stats.vercel.app/api?username=iammilansoni&show_icons=true&theme=radical&hide_border=true&include_all_commits=true&count_private=true)

![Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username=iammilansoni&layout=compact&theme=radical&hide_border=true&langs_count=8)

![GitHub Streak](https://github-readme-streak-stats.herokuapp.com/?user=iammilansoni&theme=radical&hide_border=true)

![Trophy](https://github-profile-trophy.vercel.app/?username=iammilansoni&theme=radical&no-frame=true&no-bg=false&margin-w=4&row=1&column=7)

</div>

---

## Activity Graph

[![Milan's github activity graph](https://github-readme-activity-graph.vercel.app/graph?username=iammilansoni&theme=react-dark&hide_border=true)](https://github.com/iammilansoni)

---

<div align="center">

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/sonimilan)
[![Email](https://img.shields.io/badge/Email-Contact-EA4335?style=for-the-badge&logo=gmail)](mailto:milansoni96946@gmail.com)
[![Portfolio](https://img.shields.io/badge/Portfolio-Visit-000?style=for-the-badge&logo=vercel)](https://milansoni.vercel.app)

**Open for full-time SDE / AI / GenAI roles.**

![Snake animation](https://raw.githubusercontent.com/iammilansoni/iammilansoni/output/github-contribution-grid-snake.svg)

</div>
