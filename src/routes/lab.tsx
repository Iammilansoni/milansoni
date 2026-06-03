import { createFileRoute } from "@tanstack/react-router";
import { AILab } from "@/components/sections/ai-lab";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/lab")({
  head: () => ({
    meta: [
      { title: "AI Lab — Milan Soni" },
      { name: "description", content: "AI Experiments & Labs — RAG, Agentic AI, LLM apps, prompt engineering, automation." },
      { property: "og:title", content: "AI Lab — Milan Soni" },
      { property: "og:description", content: "Applied AI experiments and patterns." },
      { property: "og:url", content: "/lab" },
    ],
    links: [{ rel: "canonical", href: "/lab" }],
  }),
  component: LabPage,
});

function LabPage() {
  return (
    <div>
      <div className="relative">
        <div className="aurora-bg" />
        <div className="relative mx-auto max-w-4xl px-6 pt-16 pb-4 text-center">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">AI Lab</p>
            <h1 className="mt-4 font-display text-5xl md:text-7xl">
              Where ideas become <span className="text-aurora">systems.</span>
            </h1>
            <p className="mt-6 text-muted-foreground max-w-2xl mx-auto">
              An evolving collection of applied AI patterns I use to ship reliable production systems.
            </p>
          </Reveal>
        </div>
      </div>
      <AILab />
    </div>
  );
}
