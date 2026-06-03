import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/reveal";
import { ArrowRight, BookOpen } from "lucide-react";

// Mock data: in a real app, you might parse this from a JSON manifest generated during build
const ARTICLES = [
  {
    slug: "agents-in-production",
    title: "Deploying Agentic AI in Production",
    date: "June 2026",
    blurb: "Lessons learned building multi-step reasoning agents that don't hallucinate and actually solve business problems.",
    readTime: "8 min read"
  },
  {
    slug: "rag-optimizations",
    title: "Advanced RAG Optimization Strategies",
    date: "April 2026",
    blurb: "Moving beyond basic semantic search. Hybrid retrieval, query rewriting, and semantic chunking deep dive.",
    readTime: "12 min read"
  }
];

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "Research & Writing | Milan Soni" },
      { name: "description", content: "Read Milan Soni's research and deep dives on applied AI, full-stack architecture, and building production systems that scale." },
      { property: "og:title", content: "Research & Writing | Milan Soni" },
      { property: "og:description", content: "Read Milan Soni's research and deep dives on applied AI, full-stack architecture, and building production systems that scale." },
      { property: "og:url", content: "https://milan-soni-portfolio.vercel.app/research" },
    ],
    links: [{ rel: "canonical", href: "https://milan-soni-portfolio.vercel.app/research" }],
  }),
  component: ResearchIndex,
});

function ResearchIndex() {
  return (
    <div className="relative min-h-screen">
      <div className="aurora-bg opacity-30" />
      <div className="relative mx-auto max-w-4xl px-6 pt-32 pb-24">
        <Reveal>
          <div className="flex items-center gap-4 mb-6">
            <BookOpen className="h-6 w-6 text-aurora-1" />
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Research Vault</span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl">
            Writing & <span className="text-aurora">Research.</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
            I write about the intersection of applied AI, full-stack engineering, and designing systems that scale. Here you'll find deep dives into my architecture decisions.
          </p>
        </Reveal>

        <div className="mt-24 space-y-8">
          {ARTICLES.map((a, i) => (
            <Reveal key={a.slug} delay={i * 0.1}>
              <Link 
                to={`/research/${a.slug}`}
                className="group block glass rounded-[2rem] p-8 hover:bg-secondary/30 transition duration-500 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-aurora-1/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />
                <div className="relative z-10">
                  <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground mb-4">
                    <span>{a.date}</span>
                    <span>·</span>
                    <span className="text-aurora-2">{a.readTime}</span>
                  </div>
                  <h2 className="font-display text-3xl group-hover:text-aurora transition-colors">{a.title}</h2>
                  <p className="mt-4 text-muted-foreground leading-relaxed max-w-2xl">
                    {a.blurb}
                  </p>
                  <div className="mt-8 flex items-center gap-2 text-sm font-medium text-aurora-1 group-hover:translate-x-2 transition-transform duration-300">
                    Read article <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
