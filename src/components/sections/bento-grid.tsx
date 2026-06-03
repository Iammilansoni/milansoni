import { useRef, memo } from "react";
import { Reveal } from "@/components/reveal";
import { motion, useScroll, useTransform } from "framer-motion";
import { Trophy, BookOpen, ArrowUpRight, Cpu, Globe, Database, Brain, Layers } from "lucide-react";
import { Tilt } from "@/components/ui/tilt";
import { AmbientBlobs } from "@/components/ambient-blobs";

// ─── Data ────────────────────────────────────────────────────────────────────

const CAPABILITIES = [
  {
    icon: Brain,
    area: "AI / LLM Engineering",
    summary: "Production RAG pipelines, agentic orchestration, evaluation harnesses, and observability.",
    signals: ["LangChain", "LangGraph", "FAISS", "Redis Vector DB", "RAG", "Prompt Engineering"],
    depth: 95,
  },
  {
    icon: Globe,
    area: "Full Stack (MERN + Next.js)",
    summary: "End-to-end web apps with server-side rendering, REST & GraphQL APIs, and enterprise auth.",
    signals: ["Next.js", "React", "Node.js", "FastAPI", "TypeScript", "JWT + RBAC"],
    depth: 92,
  },
  {
    icon: Database,
    area: "Data & Infrastructure",
    summary: "Multi-tenant databases, vector stores, Docker microservices, and CI/CD pipelines.",
    signals: ["MongoDB", "PostgreSQL", "Redis", "Docker", "AWS (EC2, S3, Lambda)", "CI/CD"],
    depth: 85,
  },
  {
    icon: Layers,
    area: "Systems Thinking",
    summary: "Algorithm design in C++, scalable backend architecture, and cross-team delivery.",
    signals: ["C++", "Graph Algorithms", "System Design", "Microservices", "Agile/Scrum"],
    depth: 88,
  },
];

const PROOF_POINTS = [
  {
    kicker: "🏆 SIH 2023",
    headline: "National Winner",
    sub: "Top 1% of 44,000+ teams",
    detail: "Built a production-grade AI document intelligence platform for the Ministry of Coal in a 48-hr sprint.",
    accent: "aurora-1",
    links: [
      { label: "Official Results", href: "https://www.sih.gov.in/sih2023-grand-finale-result" },
      { label: "GitHub Repo", href: "https://github.com/Iammilansoni/MiningNiti" },
    ]
  },
  {
    kicker: "📄 Scopus Indexed",
    headline: "PICET-2026",
    sub: "IET Conference Proceedings",
    detail: "Peer-reviewed research on hybrid attention-based temporal modeling for LMS dropout prediction.",
    accent: "aurora-2",
    links: [
      { label: "Read Paper", href: "https://drive.google.com/file/d/11DTgnEqtFGIB-PpX-SKyheMCue5xRe-_/view?usp=sharing" },
      { label: "Certificate", href: "https://drive.google.com/file/d/1TbxYA73JiKCRnVgqTIqLMfLdVtKWDX_l/view?usp=sharing" },
      { label: "Track 3: ID 759", href: "https://picet.in/" }
    ]
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export const BentoGrid = memo(function BentoGrid() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const y2 = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section ref={containerRef} className="relative overflow-hidden py-32">
      <AmbientBlobs colors={["oklch(0.70 0.28 295)", "oklch(0.72 0.18 200)"]} opacity={0.45} />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* ── Header ── */}
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-aurora-2 flex items-center gap-2">
            <span className="text-muted-foreground/40">[02]</span> Capability Matrix
          </p>
          <h2 className="mt-4 font-display text-5xl md:text-7xl max-w-4xl leading-[0.9]">
            What I build,{" "}
            <em className="italic text-aurora">
              and how deep
            </em>{" "}
            I go.
          </h2>
          <p className="mt-6 text-muted-foreground max-w-2xl text-base md:text-lg leading-relaxed">
            Three internships, one national win, one Scopus-indexed publication.
            Here is the technical breadth behind those results.
          </p>
        </Reveal>

        {/* ── Capability Rows ── */}
        <motion.div style={{ y: y1 }} className="mt-16 space-y-3">
          {CAPABILITIES.map((cap, i) => (
            <Reveal key={cap.area} delay={i * 0.07}>
              <Tilt>
                <div className="group glass rounded-3xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-secondary/20 transition-all duration-500 relative overflow-hidden">
                  {/* Hover glow */}
                  <div className="absolute inset-0 bg-linear-to-r from-aurora-1/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  
                  {/* Left: Icon & Area */}
                  <div className="flex items-center gap-4 md:w-1/4">
                    <div className="h-12 w-12 rounded-2xl bg-aurora-1/10 flex items-center justify-center text-aurora-1 shrink-0">
                      <cap.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl">{cap.area}</h3>
                    </div>
                  </div>

                  {/* Mid: Summary & Signals */}
                  <div className="md:w-1/2 space-y-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">{cap.summary}</p>
                    <div className="flex flex-wrap gap-2">
                      {cap.signals.map((sig) => (
                        <span key={sig} className="font-mono text-[10px] px-2 py-1 rounded border border-hairline bg-background/50 text-muted-foreground">
                          {sig}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Depth bar */}
                  <div className="md:w-32 shrink-0 flex flex-col gap-1.5">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">Depth</span>
                      <span className="font-mono text-[11px] text-aurora-1">{cap.depth}%</span>
                    </div>
                    <div className="h-1 rounded-full bg-secondary overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-linear-to-r from-aurora-1 to-aurora-2"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${cap.depth}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: i * 0.1, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </motion.div>

        {/* ── Proof Points + Availability ── */}
        <motion.div style={{ y: y2 }} className="mt-20 grid grid-cols-1 md:grid-cols-12 gap-4">

          {/* Trophy / Publication */}
          {PROOF_POINTS.map((p, i) => (
            <Reveal key={p.headline} delay={i * 0.1} className="md:col-span-4">
              <Tilt className="h-full">
                <div className="glass rounded-3xl p-6 h-full flex flex-col gap-4 group hover:bg-secondary/20 transition-all duration-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-linear-to-br from-aurora-1/8 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  <div className="font-mono text-[10px] uppercase tracking-widest text-aurora-2">{p.kicker}</div>
                  <div>
                    <div className="font-display text-3xl">{p.headline}</div>
                    <div className="font-mono text-xs text-aurora-1 mt-1">{p.sub}</div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mt-auto">{p.detail}</p>
                  
                  {/* Highly Visible External Links */}
                  {p.links && (
                    <div className="flex flex-wrap gap-2 mt-4 relative z-20">
                      {p.links.map((link) => (
                        <a 
                          key={link.label}
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full bg-background border border-hairline hover:bg-aurora-1 hover:text-white hover:border-aurora-1 transition-all"
                        >
                          {link.label} <ArrowUpRight className="h-3 w-3" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </Tilt>
            </Reveal>
          ))}

          {/* Availability / Identity — the CTA card */}
          <Reveal className="md:col-span-4" delay={0.2}>
            <Tilt className="h-full">
              <div className="glass rounded-3xl p-6 md:p-8 h-full flex flex-col justify-between relative overflow-hidden group border border-aurora-1/10 hover:border-aurora-1/25 transition-all duration-500">
                <div className="absolute inset-0 bg-linear-to-br from-aurora-1/10 to-aurora-3/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {/* Status pill */}
                <div className="flex items-center gap-2 w-max rounded-full border border-aurora-1/20 bg-aurora-1/5 px-3 py-1.5 relative z-10">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-aurora-1 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-aurora-1" />
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-aurora-1">Open to 2026 Roles</span>
                </div>

                <div className="relative z-10 mt-6">
                  <h3 className="font-display text-4xl leading-tight">Full Stack<br /><span className="text-aurora">& GenAI</span><br />Engineer</h3>
                  <div className="mt-4 flex items-center gap-3 flex-wrap">
                    <span className="font-mono text-xs px-2.5 py-1 rounded-full border border-aurora-1/20 bg-aurora-1/10 text-aurora-1">8.10 CGPA</span>
                    <span className="font-mono text-xs px-2.5 py-1 rounded-full border border-hairline bg-background/50 text-muted-foreground">SDE / AI / GenAI Roles</span>
                  </div>
                </div>

                <a
                  href="/contact"
                  className="relative z-10 mt-6 inline-flex items-center gap-2 text-sm font-medium text-foreground group-hover:text-aurora-1 transition-colors"
                >
                  Let's talk <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </Tilt>
          </Reveal>
        </motion.div>
      </div>
    </section>
  );
});
