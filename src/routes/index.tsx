import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { Hero } from "@/components/sections/hero";
import { Intro } from "@/components/sections/intro";
import { PortraitStage } from "@/components/sections/portrait-stage";

// Below-fold sections stay lazy to protect LCP and TTI.
const FeaturedProjects = lazy(() => import("@/components/sections/featured-projects").then(m => ({ default: m.FeaturedProjects })));
const SystemsLab = lazy(() => import("@/components/sections/systems-lab").then(m => ({ default: m.SystemsLab })));
const BentoGrid = lazy(() => import("@/components/sections/bento-grid").then(m => ({ default: m.BentoGrid })));
const ExperienceTimeline = lazy(() => import("@/components/sections/experience-timeline").then(m => ({ default: m.ExperienceTimeline })));
const RecentArticles = lazy(() => import("@/components/sections/recent-articles").then(m => ({ default: m.RecentArticles })));
const CTASection = lazy(() => import("@/components/sections/cta").then(m => ({ default: m.CTASection })));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Milan Soni | AI Engineer & Full Stack Developer | SIH 2023 Winner" },
      { name: "description", content: "Portfolio of Milan Soni, a Full Stack + AI Developer specializing in production RAG pipelines, agentic AI workflows, and scalable enterprise applications." },
      { property: "og:title", content: "Milan Soni | AI Engineer & Full Stack Developer | SIH 2023 Winner" },
      { property: "og:description", content: "Portfolio of Milan Soni, a Full Stack + AI Developer specializing in production RAG pipelines, agentic AI workflows, and scalable enterprise applications." },
      { property: "og:url", content: "https://milansoni.vercel.app/" },
    ],
    links: [{ rel: "canonical", href: "https://milansoni.vercel.app/" }],
  }),
  component: Index,
});

/**
 * Five sections, with the work second. The previous homepage ran nine and put
 * the case studies third, behind a capability matrix — so the strongest
 * material arrived after two screens of scrolling.
 */
function Index() {
  return (
    <>
      <Hero />
      {/*
        Two portrait moments, deliberately far apart. The positioning band
        comes first, straight off the hero, routing each kind of visitor to
        their next click; the slower introduction waits until after the
        evidence. Stacking them would spend both in one scroll.
      */}
      <PortraitStage
        src="/milan-profile.jpg"
        alt="Milan Soni"
        width={1024}
        height={1006}
      />
      <Suspense fallback={<div className="h-96" />}>
        <FeaturedProjects />
        <SystemsLab />
        <BentoGrid />
        <ExperienceTimeline />
        <Intro />
        <RecentArticles />
        <CTASection />
      </Suspense>
    </>
  );
}
