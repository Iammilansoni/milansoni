import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/reveal";
import { EXPERIENCE } from "@/lib/site";
import { ExperienceTimeline } from "@/components/sections/experience-timeline";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title: "Experience & Internships | Milan Soni" },
      { name: "description", content: "Explore Milan Soni's industry experience across AI testing platforms (nTheta), financial intelligence (OBG Outsourcing), and document automation (Om Logistics)." },
      { property: "og:title", content: "Experience & Internships | Milan Soni" },
      { property: "og:description", content: "Explore Milan Soni's industry experience across AI testing platforms (nTheta), financial intelligence (OBG Outsourcing), and document automation (Om Logistics)." },
      { property: "og:url", content: "https://milan-soni-portfolio.vercel.app/experience" },
    ],
    links: [{ rel: "canonical", href: "https://milan-soni-portfolio.vercel.app/experience" }],
  }),
  component: ExperiencePage,
});

function ExperiencePage() {
  return (
    <div>
      <div className="relative">
        <div className="aurora-bg opacity-50" />
        <div className="relative mx-auto max-w-5xl px-6 pt-16 pb-4">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Experience</p>
            <h1 className="mt-4 font-display text-5xl md:text-7xl max-w-3xl">
              {EXPERIENCE.length} teams. <span className="text-aurora">Real shipping.</span>
            </h1>
          </Reveal>
        </div>
      </div>
      <ExperienceTimeline />
    </div>
  );
}
