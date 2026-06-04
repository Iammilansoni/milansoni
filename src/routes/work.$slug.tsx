import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Magnetic } from "@/components/ui/magnetic";
import { PROJECTS, type Project } from "@/lib/site";
import { ArchitectureGraph } from "@/components/sections/architecture-graph";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = (PROJECTS as readonly Project[]).find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.project;
    if (!p) return { meta: [{ title: "Case study — Milan Soni" }] };
    return {
      meta: [
        { title: `${p.name} | AI & Full Stack Case Study | Milan Soni` },
        { name: "description", content: p.blurb },
        { property: "og:title", content: `${p.name} | AI & Full Stack Case Study | Milan Soni` },
        { property: "og:description", content: p.blurb },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `https://milansoni.vercel.app/work/${p.slug}` },
      ],
      links: [{ rel: "canonical", href: `https://milansoni.vercel.app/work/${p.slug}` }],
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify([
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: p.name,
            description: p.blurb,
            author: { "@type": "Person", name: "Milan Soni" },
          },
          {
            "@context": "https://schema.org",
            "@type": "SoftwareSourceCode",
            name: p.name,
            description: p.description,
            programmingLanguage: p.tech,
            codeRepository: p.githubUrl || undefined,
            author: { "@type": "Person", name: "Milan Soni" }
          },
          {
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: p.name,
            text: p.problem + " " + p.solution + " " + p.results,
            author: { "@type": "Person", name: "Milan Soni" }
          }
        ]),
      }],
    };
  },
  component: CaseStudy,
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-6 py-32 text-center">
      <h1 className="font-display text-4xl">Project not found</h1>
      <Link to="/work" className="mt-6 inline-block text-aurora hover:underline">← Back to work</Link>
    </div>
  ),
});

function CaseStudy() {
  const { project: p } = Route.useLoaderData() as { project: Project };
  return (
    <article className="relative">
      <div className="aurora-bg opacity-50" />
      <div className="relative mx-auto max-w-4xl px-6 py-20">
        <Link to="/work" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> All work
        </Link>

        <Reveal>
          <span className="mt-10 inline-block text-xs font-mono border border-hairline rounded-full px-3 py-1 text-muted-foreground">{p.tag}</span>
          <h1 className="mt-5 font-display text-5xl md:text-7xl leading-none">{p.name}</h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">{p.description}</p>
          
          {(p.githubUrl || p.demoUrl) && (
            <div className="mt-8 flex flex-wrap items-center gap-4">
              {p.githubUrl && (
                <a href={p.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-hairline bg-secondary/50 px-5 py-2.5 text-sm font-medium hover:bg-secondary transition">
                  <Github className="w-4 h-4" /> View Source Code
                </a>
              )}
              {p.demoUrl && (
                <a href={p.demoUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-2.5 text-sm font-medium hover:opacity-90 transition">
                  <ExternalLink className="w-4 h-4" /> Visit Live Site
                </a>
              )}
            </div>
          )}

          {p.heroImage && (
            <div className="mt-16 w-full rounded-3xl border border-hairline bg-black/40 p-2 shadow-2xl backdrop-blur-sm overflow-hidden">
              <img src={p.heroImage} alt={`${p.name} UI`} loading="eager" fetchPriority="high" className="w-full rounded-2xl object-cover border border-hairline/50" />
            </div>
          )}
        </Reveal>

        <div className="mt-24 grid lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-8 space-y-20">
            <Section title="The Problem">{p.problem}</Section>
            <Section title="The Solution">{p.solution}</Section>
            
            <Reveal>
              <h2 className="font-display text-3xl mb-8 flex items-center gap-4">
                <span className="h-px flex-1 bg-hairline" />
                Architecture
                <span className="h-px flex-1 bg-hairline" />
              </h2>
              
              {p.slug === "miningniti" && (
                <div className="mb-12">
                  <ArchitectureGraph />
                </div>
              )}

              <ul className="space-y-4">
                {p.architecture.map((a, i) => (
                  <li key={i} className="flex gap-5 glass rounded-2xl p-6 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-linear-to-r from-aurora-1/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="font-mono text-xs text-aurora-1 pt-1.5">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-muted-foreground leading-relaxed relative">{a}</span>
                  </li>
                ))}
              </ul>

              {p.tradeoffs && p.tradeoffs.length > 0 && (
                <div className="mt-16">
                  <h3 className="font-display text-2xl mb-6 flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-aurora-2" />
                    Technical Trade-offs
                  </h3>
                  <ul className="space-y-4">
                    {p.tradeoffs.map((t, i) => {
                      const [title, ...descParts] = t.split(":");
                      return (
                        <li key={i} className="glass rounded-2xl p-6">
                          <strong className="text-foreground block mb-2">{title}:</strong>
                          <span className="text-muted-foreground leading-relaxed">{descParts.join(":")}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </Reveal>
            
            <Section title="Impact & Results">{p.results}</Section>
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-12">
              <Reveal delay={0.1}>
                <div className="space-y-6">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Impact</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                    {p.metrics.map((m) => (
                      <div key={m.label} className="glass rounded-2xl p-5 border-l-2 border-l-aurora-2">
                        <div className="font-display text-3xl text-aurora">{m.value}</div>
                        <div className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">{m.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="space-y-6 pt-8 border-t border-hairline">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <span key={t} className="px-3 py-1.5 rounded-full border border-hairline text-sm text-muted-foreground hover:text-foreground hover:border-aurora-1 transition-colors">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        <Reveal>
          <div className="mt-32 border-t border-hairline pt-12 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <h3 className="font-display text-3xl">Want something similar?</h3>
              <p className="mt-2 text-muted-foreground">Let's build a production-grade system.</p>
            </div>
            <Magnetic strength={20}>
              <Link to="/contact" className="rounded-full bg-foreground text-background px-8 py-4 font-medium hover:opacity-90 transition">
                Start a conversation
              </Link>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <h2 className="font-display text-3xl">{title}</h2>
      <p className="mt-5 text-muted-foreground text-lg leading-relaxed">{children}</p>
    </Reveal>
  );
}
