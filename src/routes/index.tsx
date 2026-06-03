import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/sections/hero";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { ExperienceTimeline } from "@/components/sections/experience-timeline";
import { Education } from "@/components/sections/education";
import { TechMarquee } from "@/components/sections/tech-marquee";
import { BentoGrid } from "@/components/sections/bento-grid";
import { Testimonials } from "@/components/sections/testimonials";
import { CTASection } from "@/components/sections/cta";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: SITE.title },
      { name: "description", content: SITE.description },
      { property: "og:title", content: SITE.title },
      { property: "og:description", content: SITE.description },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <BentoGrid />
      <FeaturedProjects />
      <ExperienceTimeline />
      <Education />
      <TechMarquee />
      <Testimonials />
      <CTASection />
    </>
  );
}
