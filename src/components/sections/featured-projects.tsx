import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "@/components/reveal";
import { PROJECTS } from "@/lib/site";

export function FeaturedProjects() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-6 py-28">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Selected work · 2023 — 2026
          </p>
          <h2 className="mt-3 font-display text-4xl md:text-6xl max-w-3xl">
            Production-grade systems, <span className="text-aurora">not class projects.</span>
          </h2>
        </Reveal>

        <div className="mt-24 space-y-24 pb-24">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.slug} p={p} index={i} total={PROJECTS.length} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ p, index, total }: { p: typeof PROJECTS[0], index: number, total: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"]
  });

  // Calculate dynamic scale and opacity for the card *behind* the next one
  // As the user scrolls past this card, it scales down slightly to look like it's being pushed back
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.5, 1]);

  return (
    <motion.div
      ref={containerRef}
      style={{
        position: "sticky",
        top: "15vh",
        zIndex: index,
      }}
      className="origin-top"
    >
      <motion.div style={{ scale, opacity }} className="origin-top">
        <Link
          to="/work/$slug"
          params={{ slug: p.slug }}
          className="group block bg-background rounded-[3rem] p-8 md:p-12 transition relative overflow-hidden shadow-[0_-20px_40px_rgba(0,0,0,0.4)] border border-hairline/50"
        >
          {/* Solid hover overlay */}
          <div className="absolute inset-0 bg-secondary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0" />
          <div
            className="pointer-events-none absolute -top-32 -right-32 h-120 w-120 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-1000 z-0"
            style={{ background: "radial-gradient(closest-side, var(--aurora-1), transparent 70%)" }}
          />
          <div className="grid md:grid-cols-12 gap-12 relative z-10">
            <div className="md:col-span-7 flex flex-col justify-between">
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-mono text-aurora-2 border border-aurora-2/30 rounded-full bg-aurora-2/10 px-3 py-1 mb-6">
                  {p.tag}
                </span>
                <h3 className="font-display text-4xl md:text-6xl mb-4 group-hover:text-aurora transition-colors">{p.name}</h3>
                <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">{p.blurb}</p>
              </div>
              <div className="mt-12 flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <span key={t} className="text-[11px] font-mono px-3 py-1.5 rounded-md bg-background/50 border border-hairline text-muted-foreground">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="md:col-span-5 grid grid-cols-2 gap-4 content-start pt-6">
              {p.metrics.map((m) => (
                <div key={m.label} className="rounded-3xl bg-background/30 border border-hairline/50 p-6 flex flex-col justify-center">
                  <div className="font-display text-3xl text-gradient mb-2">{m.value}</div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground leading-tight">{m.label}</div>
                </div>
              ))}
              <div className="col-span-2 mt-4 flex items-center justify-end text-sm font-medium text-foreground group-hover:text-aurora-1 transition-colors">
                Read case study <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}
