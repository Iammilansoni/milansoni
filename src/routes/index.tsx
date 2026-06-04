import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { Hero } from "@/components/sections/hero";
import { SITE } from "@/lib/site";

// Lazy-load below-fold sections to optimize LCP and TTI
const BentoGrid = lazy(() => import("@/components/sections/bento-grid").then(m => ({ default: m.BentoGrid })));
const FeaturedProjects = lazy(() => import("@/components/sections/featured-projects").then(m => ({ default: m.FeaturedProjects })));
const ExperienceTimeline = lazy(() => import("@/components/sections/experience-timeline").then(m => ({ default: m.ExperienceTimeline })));
const Education = lazy(() => import("@/components/sections/education").then(m => ({ default: m.Education })));
const TechMarquee = lazy(() => import("@/components/sections/tech-marquee").then(m => ({ default: m.TechMarquee })));
const RecentArticles = lazy(() => import("@/components/sections/recent-articles").then(m => ({ default: m.RecentArticles })));
const Testimonials = lazy(() => import("@/components/sections/testimonials").then(m => ({ default: m.Testimonials })));
const CTASection = lazy(() => import("@/components/sections/cta").then(m => ({ default: m.CTASection })));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Milan Soni | AI Engineer & Full Stack Developer | SIH 2023 Winner" },
      { name: "description", content: "Portfolio of Milan Soni, a Full Stack + AI Developer specializing in production RAG pipelines, agentic AI workflows, and scalable enterprise applications." },
      { property: "og:title", content: "Milan Soni | AI Engineer & Full Stack Developer | SIH 2023 Winner" },
      { property: "og:description", content: "Portfolio of Milan Soni, a Full Stack + AI Developer specializing in production RAG pipelines, agentic AI workflows, and scalable enterprise applications." },
      { property: "og:url", content: "https://milan-soni-portfolio.vercel.app/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <Suspense fallback={<div className="h-96" />}>
        <BentoGrid />
        <FeaturedProjects />
        <ExperienceTimeline />
        <Education />
        <TechMarquee />
        <RecentArticles />
        <Testimonials />
        <CTASection />
      </Suspense>
    </>
  );
}
