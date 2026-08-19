import { Reveal } from "@/components/reveal";
import { SectionHeader } from "@/components/section-header";
import { ArrowUpRight } from "lucide-react";
import { EXPERIENCE } from "@/lib/site";

/**
 * Experience and education in one section. Previously two separate sections
 * carrying a scroll-driven glowing line, pulsing timeline nodes, ambient
 * blobs, a 500px watermark icon and eight tilting glass cards — a lot of
 * apparatus around what is, in substance, a list of roles.
 */

const CREDENTIALS = [
  {
    title: "NASSCOM Certified Full Stack Developer",
    detail: "IT-ITeS Sector Skills Council · 2024",
  },
  {
    title: "First place — Jigyasa, GIT Jaipur",
    detail: "Blockchain, smart contracts & decentralised systems",
    href: "https://www.linkedin.com/in/sonimilan/overlay/1720793634608/single-media-viewer/?profileId=ACoAAD8piA8BZ-BgPuiIf8eBWQ8P0fjWXPcdZbw",
  },
  {
    title: "Hackathon organiser — CodeFiesta",
    detail: "2023–2025 · logistics, scaling, technical operations",
  },
  {
    title: "Class representative, 2 years",
    detail: "Volunteer programming tutor for junior students",
  },
];

export function ExperienceTimeline() {
  return (
    <section className="section-y relative">
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <SectionHeader
          index={5}
          kicker="Experience"
          title={<>Shipping inside real engineering teams.</>}
          lead="Four teams, one open-source project, and the numbers each one moved."
        />

        {/* ── Roles ── */}
        <div className="mt-16 border-t border-hairline">
          {EXPERIENCE.map((e, i) => (
            <Reveal key={e.company} delay={i * 0.05}>
              <div className="grid gap-4 border-b border-hairline py-9 md:grid-cols-12 md:gap-10">
                <div className="md:col-span-4">
                  <p className="font-mono text-xs uppercase tracking-wider text-accent">
                    {e.period}
                  </p>
                  <h3 className="mt-2.5 font-display text-title text-foreground">{e.company}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{e.role}</p>
                  {"location" in e && (
                    <p className="mt-0.5 font-mono text-xs text-muted-foreground">{e.location}</p>
                  )}
                </div>

                <ul className="space-y-3 md:col-span-8">
                  {e.highlights.map((h, idx) => (
                    <li key={idx} className="flex gap-3.5">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent"
                      />
                      <span className="text-sm leading-relaxed text-muted-foreground">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ── Education & credentials ── */}
        <Reveal>
          <div className="mt-20 grid gap-10 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-5">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
                Foundation
              </p>
              <h3 className="mt-4 font-display text-headline text-foreground">
                B.Tech, Computer Science &amp; Engineering
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Global Institute of Technology, Jaipur · Oct 2022 – May 2026
              </p>
              <div className="mt-6 flex gap-10">
                <div>
                  <span className="block font-display text-3xl text-foreground">8.10</span>
                  <span className="mt-1 block font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    Cumulative GPA
                  </span>
                </div>
                <div>
                  <span className="block font-display text-3xl text-foreground">2026</span>
                  <span className="mt-1 block font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    Graduating
                  </span>
                </div>
              </div>
            </div>

            <ul className="border-t border-hairline md:col-span-7">
              {CREDENTIALS.map((c) => {
                const body = (
                  <>
                    <span className="text-sm font-medium text-foreground transition-colors group-hover:text-accent">
                      {c.title}
                    </span>
                    <span className="mt-1 block font-mono text-xs text-muted-foreground">
                      {c.detail}
                    </span>
                  </>
                );

                return (
                  <li key={c.title} className="border-b border-hairline py-4">
                    {c.href ? (
                      <a
                        href={c.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group -mx-3 flex items-start justify-between gap-4 rounded-md px-3 py-1 transition-colors hover:bg-accent/[0.05]"
                      >
                        <span>{body}</span>
                        <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground transition-colors group-hover:text-accent" />
                      </a>
                    ) : (
                      <div className="group">{body}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
