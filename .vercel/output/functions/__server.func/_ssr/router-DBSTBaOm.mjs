import { b as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider, u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent, d as useRouterState, L as Link, e as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { S as notFound, m as isRedirect } from "../_libs/tanstack__router-core.mjs";
import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { _ as _e } from "../_libs/cmdk.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { R as Root, P as Portal, C as Content, a as Close, O as Overlay, T as Title, D as Description } from "../_libs/radix-ui__react-dialog.mjs";
import { c as createServerFn, T as TSS_SERVER_FUNCTION, g as getServerFnById } from "./server-DNXF0cKP.mjs";
import { m as motion, A as AnimatePresence, u as useScroll, a as useSpring, b as useMotionValueEvent } from "../_libs/framer-motion.mjs";
import { V as VolumeX, a as Volume2, D as Download, M as Mail, T as Trophy, F as FileText, G as Github, L as Linkedin, P as PenLine, A as ArrowUpRight, B as BookOpen, I as Instagram, b as MapPin, S as Search, X } from "../_libs/lucide-react.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
function useServerFn(serverFn) {
  const router2 = useRouter();
  return reactExports.useCallback(async (...args) => {
    try {
      const res = await serverFn(...args);
      if (isRedirect(res)) throw res;
      return res;
    } catch (err) {
      if (isRedirect(err)) {
        err.options._fromLocation = router2.stores.location.get();
        return router2.navigate(router2.resolveRedirect(err).options);
      }
      throw err;
    }
  }, [router2, serverFn]);
}
const appCss = "/assets/styles-bKgmgfQx.css";
const SITE = {
  name: "Milan Soni",
  title: "Milan Soni — AI Engineer & Full Stack Developer",
  description: "Milan Soni is a Full Stack + AI Developer building production RAG pipelines, agentic AI workflows, and scalable MERN apps. SIH 2023 National Winner. Scopus-indexed researcher. 2026 CS Graduate from Jaipur, India.",
  email: "milansoni96946@gmail.com",
  location: "Churu (Rajasthan)",
  socials: {
    github: "https://github.com/Iammilansoni",
    linkedin: "https://www.linkedin.com/in/sonimilan/",
    medium: "https://medium.com/@milansoni96946",
    instagram: "https://www.instagram.com/iammilansoni",
    email: "mailto:milansoni96946@gmail.com"
  }
};
const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/work", label: "Work" },
  { to: "/research", label: "Research" },
  { to: "/lab", label: "AI Lab" },
  { to: "/blog", label: "Writing" },
  { to: "/contact", label: "Contact" }
];
const PROJECTS = [
  {
    slug: "miningniti",
    name: "MiningNiti",
    tag: "🏆 SIH 2023 National Winner",
    blurb: "Enterprise-Grade AI Document Intelligence Platform built for the Ministry of Coal.",
    description: "A retrieval-augmented intelligence platform that transforms mining operations with intelligent document processing, safety compliance analysis, and AI-powered knowledge extraction using a Multi-Agent system.",
    metrics: [
      { value: "44k+", label: "Teams Defeated" },
      { value: "5", label: "Specialized Agents" },
      { value: "FastAPI", label: "Microservice Core" }
    ],
    tech: ["Next.js 15", "FastAPI", "PostgreSQL", "pgvector", "Gemini 2.0", "Redis", "Docker"],
    problem: "Coal mining operations handle thousands of critical documents: MSHA regulations, safety protocols, environmental reports, and incident investigations. Finding specific information quickly can be the difference between compliance and violation, or even life and death.",
    solution: "We built a Multi-Agent AI System powered by Gemini 2.0 Flash and pgvector. Specialized agents (Classifier, Safety Analyzer, Entity Extractor, Summarizer) work concurrently, orchestrated by a FastAPI backend to deliver real-time compliance checks, risk scoring, and a citation-first RAG chat.",
    architecture: [
      "Frontend: Next.js 15 dashboard for real-time safety scores and RAG-powered chat.",
      "API Gateway: FastAPI routing requests with Clerk JWT verification and RBAC.",
      "AI Layer: Parallel execution via Orchestrator managing 4 specialized domain agents.",
      "Database: PostgreSQL + pgvector for semantic caching and document embeddings.",
      "Queueing: Celery + Redis for distributed background processing of large documents."
    ],
    tradeoffs: [
      "PostgreSQL + pgvector over dedicated vector DBs: Chose pgvector to maintain ACID compliance with our relational document metadata and simplify infrastructure, accepting a slight latency trade-off.",
      "FastAPI over Next.js API Routes: Required heavy Python ML libraries (LangChain, Celery) for the multi-agent system which Serverless Node.js struggles to support efficiently.",
      "Redis + Celery over Serverless Functions: Document parsing (OCR) takes several minutes. Serverless functions timeout after 15-60s, necessitating a persistent background worker architecture."
    ],
    results: "Won the Smart India Hackathon (SIH) 2023 National Finale out of 44,000+ competing teams. The platform is an enterprise-ready solution that automatically flags compliance hazards and extracts mission-critical entities.",
    githubUrl: "https://github.com/Iammilansoni/MiningNiti",
    demoUrl: "https://miningniti.vercel.app/",
    heroImage: "/miningniti-dashboard.png"
  },
  {
    slug: "nlpforge-tester",
    name: "NLPForge",
    tag: "Enterprise AI NLP Platform",
    blurb: "AI-Powered NLP Dataset Generator & Semantic Search Platform.",
    description: "An enterprise-grade platform that bridges the gap between natural language and API testing. It processes plain English through a two-stage retrieval pipeline to produce structured, executable API test cases.",
    metrics: [
      { value: "Two-Stage", label: "Retrieval Pipeline" },
      { value: "8", label: "LLM Providers Supported" },
      { value: "Async", label: "Python Core" }
    ],
    tech: ["Next.js 16", "FastAPI", "Redis Vector", "FlashRank", "Ollama", "Docker"],
    problem: "Writing manual API test cases is tedious and doesn't scale. QA teams struggle to cover edge cases, and mapping natural language requirements into structured API payloads is slow and error-prone.",
    solution: "Built a platform that uses a fast KNN vector search in Redis followed by a FlashRank cross-encoder neural re-ranking pipeline to accurately match natural language queries to API templates, extracting payload slots via LLMs.",
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
    results: "Empowered product teams to generate 1000s of synthetic test datasets (70% valid, 20% edge, 10% extreme) and evaluate LLM features in real-time before shipping.",
    githubUrl: "https://github.com/Iammilansoni/NLPFT-2",
    heroImage: "/nlpforge-ui.png"
  },
  {
    slug: "finsageai360",
    name: "FinSageAI360",
    tag: "AI Financial Intelligence Platform",
    blurb: "Real-time financial intelligence dashboard built at OBG Outsourcing.",
    description: "A multi-tenant SaaS that ingests accounting feeds, normalises them, and surfaces AI-generated cashflow, risk, and anomaly insights.",
    metrics: [
      { value: "+45%", label: "Faster report cycles" },
      { value: "+30%", label: "Operational efficiency" },
      { value: "RBAC", label: "Enterprise-grade" }
    ],
    tech: ["Next.js", "Node.js", "MongoDB", "Prisma", "JWT", "AI Analytics"],
    problem: "Mid-market finance teams patch reports together in spreadsheets, losing days every month and missing anomalies entirely.",
    solution: "A Next.js + Node.js platform with JWT auth, granular RBAC, and AI-driven anomaly detection over normalised ledger data, exposed through interactive analytics dashboards.",
    architecture: [
      "Multi-tenant data model on MongoDB via Prisma",
      "Stream ingestion of accounting feeds",
      "AI analytics layer for cashflow and anomaly detection",
      "Role-based dashboards with audit trails"
    ],
    results: "Cut monthly close reporting time by 45% and surfaced anomalies that were previously missed entirely."
  },
  {
    slug: "smartlearnx",
    name: "SmartLearnX",
    tag: "Freelance Project",
    blurb: "A next-generation AI-powered LMS designed to transform online education into a personalized, intelligent, and data-driven learning experience.",
    description: "An adaptive educational ecosystem integrating AI, ML, NLP, and modern full-stack web technologies to enhance learning outcomes and reduce administrative workload through personalized course recommendations, dropout prediction, and AI-powered assessments.",
    metrics: [
      { value: "91.4%", label: "Dropout Prediction Accuracy" },
      { value: "0.89", label: "R² Forecasting Score" },
      { value: "24/7", label: "NLP Chatbot Support" }
    ],
    tech: ["React", "TypeScript", "Node.js", "FastAPI", "MongoDB", "Redis", "Docker", "Machine Learning"],
    problem: "Conventional LMS platforms provide static learning content, limited personalization, minimal learner engagement tracking, and lack predictive capabilities, leading to higher student dropout rates.",
    solution: "Implemented an AI-powered personalized learning system that analyzes user behavior to generate adaptive learning paths. Included machine learning-based dropout prediction (Logistic Regression) and academic performance forecasting (Random Forest).",
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
    results: "Successfully maintained response times below 2 seconds under high load. The ML dropout prediction model achieved an accuracy of 91.4%, and the academic performance forecasting model achieved an R² score of 0.89, validating the intelligent ecosystem."
  }
];
const EXPERIENCE = [
  {
    company: "nTheta Works Pvt. Ltd.",
    role: "Full Stack Developer Intern",
    period: "Oct – Dec 2025",
    location: "Remote",
    highlights: [
      "Architected FastAPI microservices + Next.js / TypeScript dashboards for NLPForge-Tester, an enterprise LLM API testing platform",
      "Containerized via Docker with automated CI/CD pipelines on Linux servers",
      "Engineered two-stage semantic retrieval (Redis Vector DB + FlashRank neural re-ranking) — improved template matching by 40% and cut manual QA effort by ~60%"
    ]
  },
  {
    company: "Freelance Client",
    role: "AI & Full Stack Developer",
    period: "Jul 2025 – Aug 2025",
    location: "Remote",
    highlights: [
      "Architected SmartLearnX, an AI-powered Learning Management System utilizing React, Node.js, and FastAPI microservices",
      "Engineered a dropout prediction model (Logistic Regression, 91.4% accuracy) and academic forecasting system (Random Forest, 0.89 R²)",
      "Integrated NLP features (BERT, spaCy) for automated quiz generation and a 24/7 intelligent virtual chatbot assistant"
    ]
  },
  {
    company: "OBG Outsourcing Pvt. Ltd.",
    role: "Full Stack Developer Intern",
    period: "May – Jul 2025",
    location: "Jaipur",
    highlights: [
      "Led FinSageAI360, an AI-driven financial intelligence platform (Next.js, Redux, Tailwind CSS, Prisma ORM) with real-time KPI dashboards",
      "Designed secure REST API backend (Node.js + Express.js + MongoDB) with JWT auth and RBAC",
      "Reduced manual operational effort by 30% and accelerated financial report generation by 45%"
    ]
  },
  {
    company: "Om Logistics Ltd.",
    role: "Software Developer Intern",
    period: "Jun – Aug 2024",
    location: "Delhi",
    highlights: [
      "Optimized enterprise document search via LangChain + FAISS vector embeddings — reduced query latency by 70% across 10,000+ documents",
      "Designed and integrated RESTful APIs (Node.js) to automate logistics workflows",
      "Improved retrieval accuracy by 40% and eliminated 20% of manual data-entry tasks"
    ]
  }
];
const SoundContext = reactExports.createContext({
  isMuted: false,
  toggleMute: () => {
  },
  playHoverTick: () => {
  }
});
function SoundProvider({ children }) {
  const [isMuted, setIsMuted] = reactExports.useState(false);
  const [audioCtx, setAudioCtx] = reactExports.useState(null);
  reactExports.useEffect(() => {
    const initAudio = () => {
      if (!audioCtx) {
        setAudioCtx(new (window.AudioContext || window.webkitAudioContext)());
      }
    };
    window.addEventListener("click", initAudio, { once: true });
    return () => window.removeEventListener("click", initAudio);
  }, [audioCtx]);
  const toggleMute = () => setIsMuted((prev) => !prev);
  const playHoverTick = () => {
    if (isMuted || !audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(800, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.05);
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.1, audioCtx.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(1e-3, audioCtx.currentTime + 0.05);
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.05);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(SoundContext.Provider, { value: { isMuted, toggleMute, playHoverTick }, children });
}
const useSoundSystem = () => reactExports.useContext(SoundContext);
function Magnetic({
  children,
  strength = 15
}) {
  const ref = reactExports.useRef(null);
  const [position, setPosition] = reactExports.useState({ x: 0, y: 0 });
  const { playHoverTick } = useSoundSystem();
  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX / strength, y: middleY / strength });
  };
  const handleMouseEnter = () => {
    playHoverTick();
  };
  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      ref,
      onMouseMove: handleMouse,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: reset,
      animate: { x: position.x, y: position.y },
      transition: { type: "spring", stiffness: 150, damping: 15, mass: 0.1 },
      className: "inline-flex",
      children
    }
  );
}
function TextRoll({ text, className = "" }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.span,
    {
      initial: "initial",
      whileHover: "hover",
      className: `relative inline-flex overflow-hidden ${className}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex", children: text.split("").map((char, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.span,
          {
            variants: {
              initial: { y: 0 },
              hover: { y: "-100%" }
            },
            transition: { duration: 0.3, delay: i * 0.02, ease: [0.33, 1, 0.68, 1] },
            className: "inline-block whitespace-pre",
            children: char
          },
          i
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 inline-flex", "aria-hidden": "true", children: text.split("").map((char, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.span,
          {
            variants: {
              initial: { y: "100%" },
              hover: { y: 0 }
            },
            transition: { duration: 0.3, delay: i * 0.02, ease: [0.33, 1, 0.68, 1] },
            className: "inline-block whitespace-pre text-foreground",
            children: char
          },
          `clone-${i}`
        )) })
      ]
    }
  );
}
function Nav({ onOpenCommand }) {
  const [scrolled, setScrolled] = reactExports.useState(false);
  const [hidden, setHidden] = reactExports.useState(false);
  const { location } = useRouterState();
  const { scrollY } = useScroll();
  const { isMuted, toggleMute } = useSoundSystem();
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setScrolled(latest > 8);
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.header,
    {
      variants: {
        visible: { y: 0 },
        hidden: { y: "-150%" }
      },
      animate: hidden ? "hidden" : "visible",
      transition: { duration: 0.35, ease: "easeInOut" },
      className: `fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "py-2" : "py-4"}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-7xl px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `glass rounded-full flex items-center justify-between gap-2 px-3 py-2 transition-all ${scrolled ? "shadow-elevated bg-background/60" : ""}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Magnetic, { strength: 40, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2 pl-2 pr-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block h-6 w-6 rounded-md bg-gradient-to-br from-aurora-1 via-aurora-2 to-aurora-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-lg leading-none", children: SITE.name })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "hidden md:flex items-center gap-1 text-sm", children: NAV.slice(1).map((item) => {
              const active = location.pathname === item.to || item.to !== "/" && location.pathname.startsWith(item.to);
              return /* @__PURE__ */ jsxRuntimeExports.jsx(Magnetic, { strength: 30, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: item.to,
                  className: `block px-3 py-1.5 rounded-full transition-colors ${active ? "text-foreground bg-secondary" : "text-muted-foreground hover:text-foreground"}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(TextRoll, { text: item.label })
                }
              ) }, item.to);
            }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Magnetic, { strength: 30, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: toggleMute,
                  className: "h-9 w-9 flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground transition-colors",
                  "aria-label": "Toggle sound",
                  children: isMuted ? /* @__PURE__ */ jsxRuntimeExports.jsx(VolumeX, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Volume2, { className: "h-4 w-4" })
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  onClick: onOpenCommand,
                  className: "hidden sm:inline-flex items-center gap-2 text-xs text-muted-foreground border border-hairline rounded-full px-3 py-1.5 hover:text-foreground hover:bg-secondary transition",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Search" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { className: "font-mono text-[10px] bg-secondary border border-hairline rounded px-1 py-0.5", children: "⌘K" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Magnetic, { strength: 30, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/contact",
                  className: "block text-sm rounded-full bg-foreground text-background px-4 py-1.5 hover:opacity-90 transition",
                  children: "Hire me"
                }
              ) })
            ] })
          ]
        }
      ) })
    }
  );
}
const SOCIALS = [
  { label: "GitHub", href: SITE.socials.github, icon: Github },
  { label: "LinkedIn", href: SITE.socials.linkedin, icon: Linkedin },
  { label: "Medium", href: SITE.socials.medium, icon: BookOpen },
  { label: "Instagram", href: SITE.socials.instagram, icon: Instagram }
];
function Footer() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "relative overflow-hidden pt-32 pb-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        "aria-hidden": true,
        className: "pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-center overflow-hidden select-none z-0",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-[22vw] leading-none text-foreground/3 tracking-tighter whitespace-nowrap", children: "MILAN SONI" })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 mx-auto max-w-7xl px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-4xl border border-aurora-1/20 bg-background/50 backdrop-blur-2xl p-10 md:p-16 lg:p-20 flex flex-col lg:flex-row lg:items-center justify-between gap-10 shadow-2xl shadow-aurora-1/5 mb-24 group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-linear-to-br from-aurora-1/10 via-transparent to-aurora-3/10 pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-32 -right-32 w-96 h-96 bg-aurora-1/20 blur-3xl rounded-full pointer-events-none group-hover:bg-aurora-1/30 transition-colors duration-1000" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 max-w-2xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-xs uppercase tracking-widest text-aurora-2 mb-4 flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px w-6 bg-aurora-2" }),
            "Let's Work Together"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-5xl md:text-7xl leading-[0.9] tracking-tight", children: [
            "Got a project",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "italic text-aurora", children: "in mind?" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-muted-foreground text-lg max-w-md leading-relaxed", children: "Whether you need a scalable full-stack application or an intelligent AI agent system, I'm ready to build it." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col sm:flex-row gap-4 shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.a,
            {
              href: SITE.socials.email,
              whileHover: { scale: 1.03 },
              whileTap: { scale: 0.97 },
              className: "group/btn inline-flex items-center justify-center gap-3 rounded-full bg-foreground px-8 py-4 text-sm font-medium text-background transition-all hover:bg-aurora-1 hover:text-white shadow-lg",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TextRoll, { text: "Send me a message" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.a,
            {
              href: "/resume.pdf",
              whileHover: { scale: 1.03 },
              whileTap: { scale: 0.97 },
              className: "inline-flex items-center justify-center gap-3 rounded-full border border-hairline bg-background/50 backdrop-blur-sm px-8 py-4 text-sm font-medium hover:bg-secondary transition-all",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(TextRoll, { text: "Download Résumé" })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-12 gap-12 md:gap-8 mb-20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 md:col-span-12 lg:col-span-5 lg:pr-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "group inline-flex items-center gap-3 mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block h-8 w-8 rounded-xl bg-linear-to-br from-aurora-1 via-aurora-2 to-aurora-3 group-hover:scale-110 transition-transform shadow-[0_0_15px_--theme(--color-aurora-1/40)]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-2xl tracking-tight", children: SITE.name })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed mb-8 max-w-md", children: SITE.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 text-xs text-aurora-1 font-mono bg-aurora-1/5 border border-aurora-1/20 w-max px-4 py-2 rounded-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative flex h-2 w-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-aurora-1 opacity-75" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative inline-flex h-2 w-2 rounded-full bg-aurora-1" })
            ] }),
            "Available for 2026 roles"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-4 lg:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs uppercase tracking-widest text-foreground mb-6", children: "Navigate" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-4", children: NAV.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: n.to,
              className: "group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-aurora-1 transition-colors",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px w-0 bg-aurora-1 group-hover:w-4 transition-all duration-300 ease-out" }),
                n.label
              ]
            }
          ) }, n.to)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-4 lg:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs uppercase tracking-widest text-foreground mb-6", children: "Connect" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-4", children: SOCIALS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: s.href,
              target: "_blank",
              rel: "noreferrer",
              className: "group inline-flex items-center gap-3 text-sm text-muted-foreground hover:text-aurora-2 transition-colors",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: "h-4 w-4 group-hover:scale-110 transition-transform" }),
                s.label
              ]
            }
          ) }, s.label)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 md:col-span-4 lg:col-span-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs uppercase tracking-widest text-foreground mb-6", children: "Credentials" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-6 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex flex-col gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground font-medium flex items-center gap-2.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-aurora-1" }),
                "🏆 SIH 2023"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs pl-4 font-mono", children: "National Winner · Top 1%" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex flex-col gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground font-medium flex items-center gap-2.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-aurora-2" }),
                "📄 Scopus Indexed"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs pl-4 font-mono", children: "PICET-2026 · Hybrid RAG" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex flex-col gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground font-medium flex items-center gap-2.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-aurora-3" }),
                "🎓 B.Tech CSE"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs pl-4 font-mono", children: "CGPA 8.10 · 2026 Graduate" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-hairline pt-8 pb-12 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-xs text-muted-foreground/50", children: [
          "Designed & Developed with ❤️ by ",
          SITE.name,
          "."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: `mailto:${SITE.email}`,
              className: "font-mono text-xs text-muted-foreground/50 hover:text-aurora-1 transition-colors",
              children: SITE.email
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 font-mono text-xs text-muted-foreground/40", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3" }),
            "Churu (Rajasthan)"
          ] })
        ] })
      ] })
    ] })
  ] });
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const Dialog = Root;
const DialogPortal = Portal;
const DialogOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = Overlay.displayName;
const DialogContent = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = Content.displayName;
const DialogTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DialogTitle.displayName = Title.displayName;
const DialogDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = Description.displayName;
const Command = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  _e,
  {
    ref,
    className: cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-transparent text-popover-foreground",
      className
    ),
    ...props
  }
));
Command.displayName = _e.displayName;
const CommandDialog = ({ children, ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { ...props, children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { className: "overflow-hidden p-0 bg-background/60 backdrop-blur-2xl border-aurora-1/20 shadow-2xl shadow-aurora-1/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Command, { className: "**:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:font-medium **:[[cmdk-group-heading]]:text-muted-foreground **:[[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 **:[[cmdk-group]]:px-2 **:[[cmdk-input-wrapper]_svg]:h-5 **:[[cmdk-input-wrapper]_svg]:w-5 **:[[cmdk-input]]:h-12 **:[[cmdk-item]]:px-2 **:[[cmdk-item]]:py-3 **:[[cmdk-item]_svg]:h-5 **:[[cmdk-item]_svg]:w-5", children }) }) });
};
const CommandInput = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center border-b px-3", "cmdk-input-wrapper": "", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "mr-2 h-4 w-4 shrink-0 opacity-50" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx(
    _e.Input,
    {
      ref,
      className: cn(
        "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props
    }
  )
] }));
CommandInput.displayName = _e.Input.displayName;
const CommandList = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  _e.List,
  {
    ref,
    className: cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className),
    ...props
  }
));
CommandList.displayName = _e.List.displayName;
const CommandEmpty = reactExports.forwardRef((props, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(_e.Empty, { ref, className: "py-6 text-center text-sm", ...props }));
CommandEmpty.displayName = _e.Empty.displayName;
const CommandGroup = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  _e.Group,
  {
    ref,
    className: cn(
      "overflow-hidden p-1 text-foreground **:[[cmdk-group-heading]]:px-2 **:[[cmdk-group-heading]]:py-1.5 **:[[cmdk-group-heading]]:text-xs **:[[cmdk-group-heading]]:font-medium **:[[cmdk-group-heading]]:text-muted-foreground",
      className
    ),
    ...props
  }
));
CommandGroup.displayName = _e.Group.displayName;
const CommandSeparator = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  _e.Separator,
  {
    ref,
    className: cn("-mx-1 h-px bg-border", className),
    ...props
  }
));
CommandSeparator.displayName = _e.Separator.displayName;
const CommandItem = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  _e.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      className
    ),
    ...props
  }
));
CommandItem.displayName = _e.Item.displayName;
function CommandPalette({
  open,
  onOpenChange
}) {
  const navigate = useNavigate();
  const [copied, setCopied] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);
  const go = (to) => {
    onOpenChange(false);
    navigate({ to });
  };
  const copyEmail = () => {
    navigator.clipboard.writeText(SITE.socials.email);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      onOpenChange(false);
    }, 1e3);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandDialog, { open, onOpenChange, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CommandInput, { placeholder: "Type a command or search..." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandList, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CommandEmpty, { children: "No results found." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandGroup, { heading: "Quick Actions", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandItem, { onSelect: () => window.open("/resume.pdf", "_blank"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "mr-2 h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Download Resume" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandItem, { onSelect: copyEmail, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "mr-2 h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: copied ? "Copied to clipboard!" : "Copy Email Address" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CommandSeparator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandGroup, { heading: "Projects & Proofs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandItem, { onSelect: () => window.open("https://github.com/Iammilansoni/MiningNiti", "_blank"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "mr-2 h-4 w-4 text-aurora-1" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "SIH 2023 National Winner (MiningNiti)" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandItem, { onSelect: () => window.open("https://drive.google.com/file/d/11DTgnEqtFGIB-PpX-SKyheMCue5xRe-_/view", "_blank"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "mr-2 h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Scopus Indexed Paper (PICET-26)" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CommandSeparator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CommandGroup, { heading: "Navigation", children: NAV.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandItem, { onSelect: () => go(n.to), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "mr-2 h-4 w-4 opacity-50" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: n.label })
      ] }, n.to)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CommandSeparator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandGroup, { heading: "Social Links", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandItem, { onSelect: () => window.open(SITE.socials.github, "_blank"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Github, { className: "mr-2 h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "GitHub" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandItem, { onSelect: () => window.open(SITE.socials.linkedin, "_blank"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Linkedin, { className: "mr-2 h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "LinkedIn" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandItem, { onSelect: () => window.open(SITE.socials.medium, "_blank"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { className: "mr-2 h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Medium" })
        ] })
      ] })
    ] })
  ] });
}
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 1e-3 });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { className: "scroll-progress", style: { scaleX }, "aria-hidden": true });
}
function CustomCursor() {
  const [mousePosition, setMousePosition] = reactExports.useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (window.matchMedia("(max-width: 768px)").matches) return;
    const onMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    const handleMouseOver = (e) => {
      const target = e.target;
      if (target.tagName.toLowerCase() === "a" || target.tagName.toLowerCase() === "button" || target.closest("a") || target.closest("button") || target.getAttribute("role") === "button") {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);
  if (typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      className: "pointer-events-none fixed top-0 left-0 z-[100] h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-difference",
      style: {
        backgroundColor: "white"
      },
      animate: {
        x: mousePosition.x,
        y: mousePosition.y,
        scale: isHovering ? 2.5 : 1,
        opacity: 1
      },
      transition: {
        type: "spring",
        stiffness: 1e3,
        damping: 50,
        mass: 0.1
      }
    }
  ) });
}
function Preloader({ onComplete }) {
  const [progress, setProgress] = reactExports.useState(0);
  const [isVisible, setIsVisible] = reactExports.useState(true);
  reactExports.useEffect(() => {
    document.body.style.overflow = "hidden";
    let interval;
    interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsVisible(false);
            document.body.style.overflow = "auto";
            setTimeout(onComplete, 1e3);
          }, 400);
          return 100;
        }
        const inc = Math.floor(Math.random() * 15) + 5;
        return Math.min(prev + inc, 100);
      });
    }, 150);
    return () => {
      clearInterval(interval);
      document.body.style.overflow = "auto";
    };
  }, [onComplete]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isVisible && /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 1 },
      exit: { opacity: 0, y: "-100%" },
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
      className: "fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background text-foreground",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 noise opacity-20 pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              className: "font-display text-8xl md:text-[12rem] leading-none",
              initial: { opacity: 0, scale: 0.9 },
              animate: { opacity: 1, scale: 1 },
              transition: { duration: 0.5 },
              children: [
                progress,
                "%"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 h-1 w-64 max-w-[80vw] overflow-hidden rounded-full bg-secondary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              className: "h-full bg-aurora-1",
              initial: { width: "0%" },
              animate: { width: `${progress}%` },
              transition: { ease: "circOut" }
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative flex h-2 w-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-aurora-2 opacity-75" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative inline-flex h-2 w-2 rounded-full bg-aurora-2" })
            ] }),
            "Initializing Core"
          ] })
        ] })
      ]
    },
    "preloader"
  ) });
}
function AmbientBlobs({
  colors = ["oklch(0.70 0.28 295)", "oklch(0.75 0.24 220)", "oklch(0.78 0.22 170)"],
  opacity = 1,
  className = ""
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "aria-hidden": "true",
      className: `ambient-blobs pointer-events-none absolute inset-0 overflow-hidden ${className}`,
      style: { opacity },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "blob blob-1", style: { background: colors[0] } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "blob blob-2", style: { background: colors[1] } }),
        colors[2] && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "blob blob-3", style: { background: colors[2] } })
      ]
    }
  );
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex min-h-screen items-center justify-center px-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aurora-bg" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-md text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs uppercase tracking-widest text-muted-foreground", children: "Error 404" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 font-display text-6xl text-aurora", children: "Page not found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm text-muted-foreground", children: "The page drifted off into the aurora. Let's get you back." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/", className: "mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2 text-sm text-background hover:opacity-90 transition", children: "Return home →" })
    ] })
  ] });
}
function ErrorComponent({ error, reset }) {
  const router2 = useRouter();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex min-h-screen items-center justify-center px-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aurora-bg" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-md text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl", children: "This page didn't load" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: "Something went wrong on our end." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => {
              router2.invalidate();
              reset();
            },
            className: "rounded-full bg-foreground px-5 py-2 text-sm text-background hover:opacity-90 transition",
            children: "Try again"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/", className: "rounded-full border border-hairline px-5 py-2 text-sm hover:bg-secondary transition", children: "Go home" })
      ] })
    ] })
  ] });
}
const Route$a = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: SITE.title },
      { name: "description", content: SITE.description },
      { name: "author", content: SITE.name },
      { name: "theme-color", content: "#0a0a14" },
      { property: "og:site_name", content: SITE.name },
      { property: "og:type", content: "website" },
      { property: "og:title", content: SITE.title },
      { property: "og:description", content: SITE.description },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: SITE.title },
      { name: "twitter:description", content: SITE.description }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
      }
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: SITE.name,
          jobTitle: "Software Engineer & GenAI Engineer",
          email: SITE.email,
          address: { "@type": "PostalAddress", addressLocality: "Churu", addressRegion: "Rajasthan", addressCountry: "IN" },
          sameAs: [SITE.socials.github, SITE.socials.linkedin, SITE.socials.medium],
          knowsAbout: ["Full Stack Development", "Generative AI", "RAG", "Agentic AI", "LangChain", "FastAPI", "Next.js"]
        })
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", className: "dark", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$a.useRouteContext();
  const router2 = useRouter();
  const [cmdOpen, setCmdOpen] = reactExports.useState(false);
  const [preloaderDone, setPreloaderDone] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SoundProvider, { children: [
    !preloaderDone && /* @__PURE__ */ jsxRuntimeExports.jsx(Preloader, { onComplete: () => setPreloaderDone(true) }),
    preloaderDone && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 1 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 pointer-events-none noise", "aria-hidden": "true" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AmbientBlobs, { className: "fixed z-1", opacity: 0.6 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CustomCursor, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollProgress, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Nav, { onOpenCommand: () => setCmdOpen(true) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CommandPalette, { open: cmdOpen, onOpenChange: setCmdOpen }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "pt-24", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: -10 },
              transition: { duration: 0.3 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {})
            },
            router2.state.location.pathname
          ) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
        ]
      }
    )
  ] }) });
}
const $$splitComponentImporter$8 = () => import("./research-C5E-e7S-.mjs");
const Route$9 = createFileRoute("/research")({
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./lab-CuLwVA5F.mjs");
const Route$8 = createFileRoute("/lab")({
  head: () => ({
    meta: [{
      title: "AI Lab — Milan Soni"
    }, {
      name: "description",
      content: "AI Experiments & Labs — RAG, Agentic AI, LLM apps, prompt engineering, automation."
    }, {
      property: "og:title",
      content: "AI Lab — Milan Soni"
    }, {
      property: "og:description",
      content: "Applied AI experiments and patterns."
    }, {
      property: "og:url",
      content: "/lab"
    }],
    links: [{
      rel: "canonical",
      href: "/lab"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./experience-kAlNdQvN.mjs");
const Route$7 = createFileRoute("/experience")({
  head: () => ({
    meta: [{
      title: "Experience — Milan Soni"
    }, {
      name: "description",
      content: "Industry experience across AI testing, financial intelligence, and document automation platforms."
    }, {
      property: "og:title",
      content: "Experience — Milan Soni"
    }, {
      property: "og:description",
      content: "Internships and engineering roles."
    }, {
      property: "og:url",
      content: "/experience"
    }],
    links: [{
      rel: "canonical",
      href: "/experience"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./contact-B-lLp0-Z.mjs");
const Route$6 = createFileRoute("/contact")({
  head: () => ({
    meta: [{
      title: "Contact — Milan Soni"
    }, {
      name: "description",
      content: "Get in touch with Milan Soni — open to Software Engineering, Full Stack and GenAI roles."
    }, {
      property: "og:title",
      content: "Contact — Milan Soni"
    }, {
      property: "og:description",
      content: "Open to engineering opportunities."
    }, {
      property: "og:url",
      content: "/contact"
    }],
    links: [{
      rel: "canonical",
      href: "/contact"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  ...rest
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-80px" },
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
      className,
      ...rest,
      children
    }
  );
}
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const fetchMediumPosts = createServerFn({
  method: "GET"
}).handler(createSsrRpc("34581e7e177d3f3142ba418c3b64fb2f7e0b9afc1f9dc26fdf5feb86d8e6b422"));
const Route$5 = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Writing — Milan Soni" },
      { name: "description", content: "Essays and notes from Milan Soni on AI engineering, full-stack development, and building production systems." },
      { property: "og:title", content: "Writing — Milan Soni" },
      { property: "og:description", content: "Essays on AI and engineering." },
      { property: "og:url", content: "/blog" }
    ],
    links: [{ rel: "canonical", href: "/blog" }]
  }),
  component: BlogPage
});
function BlogPage() {
  const getPosts = useServerFn(fetchMediumPosts);
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["medium-posts"],
    queryFn: () => getPosts({}),
    staleTime: 1e3 * 60 * 30
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aurora-bg opacity-50" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-6xl px-6 py-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between flex-wrap gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs uppercase tracking-widest text-muted-foreground", children: "Writing" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-4 font-display text-5xl md:text-7xl", children: [
            "From the ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-aurora", children: "notebook." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: SITE.socials.medium, target: "_blank", rel: "noreferrer", className: "inline-flex items-center gap-1.5 text-sm rounded-full border border-hairline px-4 py-2 hover:bg-secondary transition", children: [
          "Follow on Medium ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-4 w-4" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-16", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-5", children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass rounded-2xl p-6 h-56 animate-pulse" }, i)) }) : posts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass rounded-2xl p-10 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
        "Couldn't reach Medium right now. You can browse posts directly on",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: SITE.socials.medium, target: "_blank", rel: "noreferrer", className: "text-aurora hover:underline", children: "medium.com/@milansoni96946" }),
        "."
      ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-5", children: posts.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: Math.min(i * 0.04, 0.3), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: p.link, target: "_blank", rel: "noreferrer", className: "group block glass rounded-2xl p-6 h-full hover:bg-secondary/60 transition", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-muted-foreground", children: p.pubDate ? new Date(p.pubDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Medium" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 font-display text-xl leading-snug group-hover:text-aurora transition", children: p.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground line-clamp-3", children: p.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex flex-wrap gap-2", children: p.categories.slice(0, 3).map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono uppercase tracking-wider text-muted-foreground border border-hairline rounded-full px-2 py-0.5", children: c }, c)) })
      ] }) }, p.link)) }) })
    ] })
  ] });
}
const $$splitComponentImporter$4 = () => import("./about-D_bteQPS.mjs");
const Route$4 = createFileRoute("/about")({
  head: () => ({
    meta: [{
      title: `About — ${SITE.name}`
    }, {
      name: "description",
      content: "The story behind Milan Soni — Computer Science graduate, SIH 2023 National Winner, and AI engineer building production systems."
    }, {
      property: "og:title",
      content: `About — ${SITE.name}`
    }, {
      property: "og:description",
      content: "Story behind Milan Soni — SIH winner and AI engineer."
    }, {
      property: "og:url",
      content: "/about"
    }],
    links: [{
      rel: "canonical",
      href: "/about"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./index-azHCKW_-.mjs");
const Route$3 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: SITE.title
    }, {
      name: "description",
      content: SITE.description
    }, {
      property: "og:title",
      content: SITE.title
    }, {
      property: "og:description",
      content: SITE.description
    }, {
      property: "og:url",
      content: "/"
    }],
    links: [{
      rel: "canonical",
      href: "/"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./work.index-ezzizC2K.mjs");
const Route$2 = createFileRoute("/work/")({
  head: () => ({
    meta: [{
      title: "Work — Milan Soni"
    }, {
      name: "description",
      content: "Selected case studies — MiningNiti, NLPForge Tester, FinSageAI360 and more."
    }, {
      property: "og:title",
      content: "Work — Milan Soni"
    }, {
      property: "og:description",
      content: "Case studies of production-grade AI and full-stack systems."
    }, {
      property: "og:url",
      content: "/work"
    }],
    links: [{
      rel: "canonical",
      href: "/work"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitNotFoundComponentImporter = () => import("./work._slug-SQZoEaer.mjs");
const $$splitComponentImporter$1 = () => import("./work._slug-1o7ZWr4m.mjs");
const Route$1 = createFileRoute("/work/$slug")({
  loader: ({
    params
  }) => {
    const project = PROJECTS.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return {
      project
    };
  },
  head: ({
    loaderData
  }) => {
    const p = loaderData?.project;
    if (!p) return {
      meta: [{
        title: "Case study — Milan Soni"
      }]
    };
    return {
      meta: [{
        title: `${p.name} — Case Study`
      }, {
        name: "description",
        content: p.blurb
      }, {
        property: "og:title",
        content: `${p.name} — Case Study`
      }, {
        property: "og:description",
        content: p.blurb
      }, {
        property: "og:type",
        content: "article"
      }, {
        property: "og:url",
        content: `/work/${p.slug}`
      }],
      links: [{
        rel: "canonical",
        href: `/work/${p.slug}`
      }],
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: p.name,
          description: p.blurb,
          author: {
            "@type": "Person",
            name: "Milan Soni"
          }
        })
      }]
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$1, "component"),
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
const $$splitComponentImporter = () => import("./research._slug-CPnzDunR.mjs");
const Route = createFileRoute("/research/$slug")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const ResearchRoute = Route$9.update({
  id: "/research",
  path: "/research",
  getParentRoute: () => Route$a
});
const LabRoute = Route$8.update({
  id: "/lab",
  path: "/lab",
  getParentRoute: () => Route$a
});
const ExperienceRoute = Route$7.update({
  id: "/experience",
  path: "/experience",
  getParentRoute: () => Route$a
});
const ContactRoute = Route$6.update({
  id: "/contact",
  path: "/contact",
  getParentRoute: () => Route$a
});
const BlogRoute = Route$5.update({
  id: "/blog",
  path: "/blog",
  getParentRoute: () => Route$a
});
const AboutRoute = Route$4.update({
  id: "/about",
  path: "/about",
  getParentRoute: () => Route$a
});
const IndexRoute = Route$3.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$a
});
const WorkIndexRoute = Route$2.update({
  id: "/work/",
  path: "/work/",
  getParentRoute: () => Route$a
});
const WorkSlugRoute = Route$1.update({
  id: "/work/$slug",
  path: "/work/$slug",
  getParentRoute: () => Route$a
});
const ResearchSlugRoute = Route.update({
  id: "/$slug",
  path: "/$slug",
  getParentRoute: () => ResearchRoute
});
const ResearchRouteChildren = {
  ResearchSlugRoute
};
const ResearchRouteWithChildren = ResearchRoute._addFileChildren(
  ResearchRouteChildren
);
const rootRouteChildren = {
  IndexRoute,
  AboutRoute,
  BlogRoute,
  ContactRoute,
  ExperienceRoute,
  LabRoute,
  ResearchRoute: ResearchRouteWithChildren,
  WorkSlugRoute,
  WorkIndexRoute
};
const routeTree = Route$a._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  AmbientBlobs as A,
  EXPERIENCE as E,
  Magnetic as M,
  PROJECTS as P,
  Reveal as R,
  SITE as S,
  TextRoll as T,
  Route$1 as a,
  Route as b,
  cn as c,
  router as r
};
