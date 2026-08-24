import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Magnetic } from "@/components/ui/magnetic";
import { Portrait } from "@/components/ui/portrait";
import { SITE } from "@/lib/site";

/**
 * The introduction band — the one place on the home page where the person
 * behind the work appears.
 *
 * It sits between the hero and the project list because the hero is
 * deliberately typographic: a photograph inside it would compete with the
 * cursor-revealed name for the same attention. Here it has the page to
 * itself.
 *
 * Unnumbered on purpose. The numbered sections ([02]…[06]) are the
 * portfolio's evidence; this is a transitional band, the same register as
 * the closing CTA, and numbering it would push every following section's
 * label out of step for no gain.
 *
 * The claim in the headline is quoted from the About page rather than
 * written fresh, and the supporting line lists the same surface area. One
 * position, stated once, in two places.
 */
export function Intro() {
  return (
    <section className="section-y relative border-t border-hairline">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 md:grid-cols-12 lg:gap-16">
          <div className="md:col-span-5">
            {/* A square crop here, against the tall 4:5 frame that opens the
                About page — same photograph, deliberately not the same
                picture twice. */}
            <Portrait
              src="/milan-portrait.jpg"
              alt="Milan Soni"
              width={1126}
              height={1397}
              className="aspect-square"
              parallax={4}
              index="01"
              caption={<>Milan Soni · {SITE.location}</>}
            />
          </div>

          <div className="md:col-span-7">
            <Reveal>
              <p className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
                <span className="text-accent">·</span>
                Behind the work
              </p>

              <h2 className="mt-4 max-w-2xl font-display text-display text-foreground">
                Most of the value isn't in the model — it's in the{" "}
                <em className="italic text-aurora">system around it.</em>
              </h2>

              <p className="mt-5 max-w-lg text-lead text-muted-foreground">
                Retrieval, evaluation, guardrails, UI, latency, auth, deploys. I build all of it —
                in production, at three companies.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Magnetic strength={16}>
                  <Link
                    to="/about"
                    className="group inline-flex items-center gap-2.5 rounded-full border border-hairline px-7 py-3.5 text-sm font-medium transition-colors hover:bg-secondary"
                  >
                    More about me
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </Magnetic>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
