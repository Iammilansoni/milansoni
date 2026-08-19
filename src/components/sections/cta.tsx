import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Magnetic } from "@/components/ui/magnetic";
import { SITE } from "@/lib/site";

export function CTASection() {
  return (
    <section className="section-y relative border-t border-hairline">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="grid gap-10 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-7">
              <div className="inline-flex items-center gap-2.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                  Open to 2026 roles
                </span>
              </div>

              <h2 className="mt-6 font-display text-display text-foreground">Let's talk.</h2>

              <p className="mt-5 max-w-xl text-lead text-muted-foreground">
                Looking for someone to ship product end to end — from applied GenAI features to the
                full-stack platform around them? I'm interested in AI engineering and SDE roles.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Magnetic strength={16}>
                  <Link
                    to="/contact"
                    className="group inline-flex items-center gap-2.5 rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
                  >
                    Start a conversation
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </Magnetic>
                <a
                  href={`mailto:${SITE.email}`}
                  className="inline-flex items-center gap-2.5 rounded-full border border-hairline px-7 py-3.5 text-sm font-medium transition-colors hover:bg-secondary"
                >
                  {SITE.email}
                </a>
              </div>
            </div>

            <ul className="border-t border-hairline md:col-span-5">
              {[
                { label: "GitHub", href: SITE.socials.github, handle: "@Iammilansoni" },
                { label: "LinkedIn", href: SITE.socials.linkedin, handle: "in/sonimilan" },
                { label: "Medium", href: SITE.socials.medium, handle: "@milansoni96946" },
              ].map((s) => (
                <li key={s.label} className="border-b border-hairline">
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between gap-4 py-4"
                  >
                    <span className="text-sm font-medium text-foreground transition-colors group-hover:text-accent">
                      {s.label}
                    </span>
                    <span className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                      {s.handle}
                      <ArrowUpRight className="h-3.5 w-3.5 transition-colors group-hover:text-accent" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
