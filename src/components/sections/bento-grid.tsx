import { memo } from "react";
import { Reveal } from "@/components/reveal";
import { SectionHeader } from "@/components/section-header";
import { ArrowUpRight } from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";

// ─── Data ────────────────────────────────────────────────────────────────────

const PROOF_POINTS = [
  {
    kicker: "SIH 2023",
    headline: "National Winner",
    sub: "Ministry of Coal · recognised by Coal India Limited & CMPDI",
    detail:
      "Built MiningNiti — AI document intelligence with 5 specialised agents, hybrid retrieval scored by a CI-gated eval, and per-clause compliance auditing, after replacing a $400/month vector DB with pgvector.",
    links: [
      { label: "Official results", href: "https://www.sih.gov.in/sih2023-grand-finale-result" },
      { label: "Source", href: "https://github.com/Iammilansoni/MiningNiti" },
    ],
  },
  {
    kicker: "Scopus indexed",
    headline: "PiCET-2026",
    sub: "IET Conference Proceedings · paper ID PU/PiCET26/COP/327",
    detail:
      "Co-authored research on the Hybrid Attention Temporal Framework for early dropout prediction — then built the half a paper leaves out: explanations, calibrated uncertainty, and a published fairness audit.",
    links: [
      {
        label: "Read paper",
        href: "https://drive.google.com/file/d/11DTgnEqtFGIB-PpX-SKyheMCue5xRe-_/view?usp=sharing",
      },
      { label: "Live product", href: "https://hatf-lms-early-warning-poc.vercel.app/" },
      { label: "Source", href: "https://github.com/Iammilansoni/hatf-lms-early-warning-poc" },
    ],
  },
  {
    kicker: "Open source",
    headline: "OmniRoute · 50k★",
    sub: "Universal AI gateway · 230+ LLM providers · 21,000+ tests",
    detail:
      "5+ PRs merged and shipped in v3.8.44 / v3.8.45, plus a provider-flag schema design adopted by the maintainer into their own fix.",
    links: [{ label: "Repository", href: "https://github.com/diegosouzapw/OmniRoute" }],
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export const BentoGrid = memo(function BentoGrid() {
  return (
    <section className="section-y relative">
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <SectionHeader
          index={4}
          kicker="Evidence"
          title={<>Credentials that can be checked.</>}
          lead="Three claims, each with a primary source behind it — an official result, a peer-reviewed paper, and merged code in someone else's repository."
        />

        {/* ── Credentials ── */}
        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {PROOF_POINTS.map((p, i) => (
            <Reveal key={p.headline} delay={i * 0.08}>
              <SpotlightCard className="h-full rounded-xl">
                <div className="card-hover flex h-full flex-col gap-3 rounded-xl border border-hairline bg-card p-6 shadow-[var(--shadow-elevated)]">
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                    {p.kicker}
                  </div>
                  <div>
                    <div className="font-display text-2xl text-foreground">{p.headline}</div>
                    <div className="mt-1.5 font-mono text-xs leading-relaxed text-muted-foreground">
                      {p.sub}
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">{p.detail}</p>

                  <div className="mt-auto flex flex-wrap gap-x-4 gap-y-2 pt-4">
                    {p.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group inline-flex items-center gap-1 text-xs font-medium text-foreground transition-colors hover:text-accent"
                      >
                        {link.label}
                        <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
});
