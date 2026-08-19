import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeader } from "@/components/section-header";
import { PROJECTS, type Project } from "@/lib/site";

/**
 * The three strongest case studies. FinSageAI360 and SmartLearnX still live on
 * /work — showing all five here flattened the hierarchy and buried the two that
 * carry a national win and a peer-reviewed paper.
 */
const FEATURED_SLUGS = ["miningniti", "hatf-lms-early-warning", "nlpforge-tester"] as const;

const FEATURED = FEATURED_SLUGS.map(
  (slug) => PROJECTS.find((p) => p.slug === slug)!
).filter(Boolean);

export function FeaturedProjects() {
  return (
    <section className="section-y relative">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          index={2}
          kicker="Selected work"
          title={<>Production systems, not class projects.</>}
          lead="Each one ships, is measured, and has its trade-offs written down."
        />

        <div className="mt-16 border-t border-hairline">
          {FEATURED.map((p, i) => (
            <ProjectRow key={p.slug} p={p} index={i + 1} />
          ))}
        </div>

        <Reveal>
          <Link
            to="/work"
            className="group mt-10 inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-accent"
          >
            All case studies
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function ProjectRow({ p, index }: { p: Project; index: number }) {
  return (
    <Reveal>
      <Link
        to="/work/$slug"
        params={{ slug: p.slug }}
        /* Full-width rows get a growing accent rule rather than the card lift —
           translating an edge-to-edge row just makes the divider look broken. */
        className="group relative grid gap-6 border-b border-hairline py-12 before:absolute before:top-1/2 before:-left-4 before:h-0 before:w-[2px] before:-translate-y-1/2 before:rounded-full before:bg-accent before:transition-[height] before:duration-500 before:ease-[cubic-bezier(0.22,1,0.36,1)] before:content-[''] hover:before:h-1/2 md:grid-cols-12 md:gap-10"
      >
        <div className="md:col-span-7">
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-xs text-muted-foreground">
              {String(index).padStart(2, "0")}
            </span>
            <h3 className="font-display text-headline text-foreground transition-colors group-hover:text-accent">
              {p.name}
            </h3>
            <ArrowUpRight className="h-4 w-4 shrink-0 self-center text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
          </div>

          <p className="mt-3 font-mono text-xs leading-relaxed text-accent">{p.tag}</p>

          <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">{p.blurb}</p>

          <div className="mt-6 flex flex-wrap gap-1.5">
            {p.tech.slice(0, 7).map((t) => (
              <span
                key={t}
                className="rounded border border-hairline px-2 py-1 font-mono text-[10px] text-muted-foreground"
              >
                {t}
              </span>
            ))}
            {p.tech.length > 7 && (
              <span className="px-2 py-1 font-mono text-[10px] text-muted-foreground">
                +{p.tech.length - 7}
              </span>
            )}
          </div>
        </div>

        <dl className="grid grid-cols-3 gap-4 self-start md:col-span-5 md:gap-6">
          {p.metrics.map((m) => (
            <div key={m.label}>
              <dt className="sr-only">{m.label}</dt>
              <dd>
                <span className="block font-display text-2xl text-foreground md:text-3xl">
                  {m.value}
                </span>
                <span className="mt-1.5 block font-mono text-[10px] uppercase leading-tight tracking-wider text-muted-foreground">
                  {m.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </Link>
    </Reveal>
  );
}
