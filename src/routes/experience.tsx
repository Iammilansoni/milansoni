import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/reveal";
import { EXPERIENCE } from "@/lib/site";
import { ExperienceTimeline } from "@/components/sections/experience-timeline";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title: "Experience — Milan Soni" },
      { name: "description", content: "Industry experience across AI testing, financial intelligence, and document automation platforms." },
      { property: "og:title", content: "Experience — Milan Soni" },
      { property: "og:description", content: "Internships and engineering roles." },
      { property: "og:url", content: "/experience" },
    ],
    links: [{ rel: "canonical", href: "/experience" }],
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
