import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { PROJECTS } from "@/lib/site";

export const Route = createFileRoute("/work/")({
  head: () => ({
    meta: [
      { title: "Work — Milan Soni" },
      { name: "description", content: "Selected case studies — MiningNiti, NLPForge Tester, FinSageAI360 and more." },
      { property: "og:title", content: "Work — Milan Soni" },
      { property: "og:description", content: "Case studies of production-grade AI and full-stack systems." },
      { property: "og:url", content: "/work" },
    ],
    links: [{ rel: "canonical", href: "/work" }],
  }),
  component: WorkIndex,
});

function WorkIndex() {
  return (
    <div className="relative mx-auto max-w-7xl px-6 py-24">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Work</p>
        <h1 className="mt-4 font-display text-5xl md:text-7xl max-w-4xl">
          Case studies in <span className="text-aurora">applied engineering.</span>
        </h1>
      </Reveal>

      <div className="mt-16 grid md:grid-cols-2 gap-5">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.05}>
            <Link to="/work/$slug" params={{ slug: p.slug }} className="group block glass rounded-3xl p-8 h-full hover:bg-secondary/60 transition relative overflow-hidden">
              <div
                className="pointer-events-none absolute -top-20 -right-20 h-60 w-60 rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-700"
                style={{ background: "radial-gradient(closest-side, var(--aurora-2), transparent 70%)" }}
              />
              <span className="text-xs font-mono text-muted-foreground border border-hairline rounded-full px-3 py-1">{p.tag}</span>
              <h2 className="mt-5 font-display text-3xl">{p.name}</h2>
              <p className="mt-3 text-muted-foreground">{p.blurb}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {p.tech.slice(0, 5).map((t) => (
                  <span key={t} className="text-[11px] px-2.5 py-1 rounded-full bg-secondary text-muted-foreground">{t}</span>
                ))}
              </div>
              <div className="mt-6 flex items-center text-sm text-muted-foreground group-hover:text-foreground">
                Read case study <ArrowUpRight className="ml-1 h-4 w-4" />
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
