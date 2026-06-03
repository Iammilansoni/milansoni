import { Reveal } from "@/components/reveal";
import { motion } from "framer-motion";
import { Bot, Brain, Network, Workflow, Wand2 } from "lucide-react";

const LABS = [
  { icon: Brain, title: "RAG Systems", desc: "Hybrid retrieval, semantic chunking, re-ranking, and citation-grounded answers." },
  { icon: Bot, title: "Agentic AI", desc: "Multi-step agents with tool use, memory, and human-in-the-loop gates." },
  { icon: Network, title: "LLM Applications", desc: "Production LLM features with eval harnesses, guardrails, and observability." },
  { icon: Wand2, title: "Prompt Engineering", desc: "Structured outputs, few-shot patterns, and reasoning scaffolds that scale." },
  { icon: Workflow, title: "AI Automation", desc: "Workflow orchestration with LangChain / LangGraph for repeatable business ops." },
];

export function AILab() {
  return (
    <section className="relative overflow-hidden">
      <div className="aurora-bg opacity-60" />
      <div className="relative mx-auto max-w-7xl px-6 py-28">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">AI Experiments & Labs</p>
          <h2 className="mt-3 font-display text-4xl md:text-6xl max-w-3xl">
            A working <span className="text-aurora">applied-AI lab.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-muted-foreground">
            I treat AI as a craft. Each lab below is an active line of work — patterns I use to ship dependable systems into production.
          </p>
        </Reveal>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {LABS.map((l, i) => (
            <Reveal key={l.title} delay={i * 0.05}>
              <motion.div whileHover={{ y: -4 }} className="glass rounded-2xl p-6 h-full">
                <l.icon className="h-6 w-6 text-aurora-1" />
                <h3 className="mt-5 font-display text-2xl">{l.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{l.desc}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
