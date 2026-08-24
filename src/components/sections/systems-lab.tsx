import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Pause, Play } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeader } from "@/components/section-header";

/**
 * An interactive walk through the pipeline these systems actually run, stage
 * by stage. A tag cloud says "I know LangChain"; this says how the pieces fit
 * and what each one is measured on.
 *
 * Every figure here is traceable to a shipped repository — see the linked case
 * studies.
 */

type Stage = {
  id: string;
  kicker: string;
  label: string;
  title: string;
  blurb: string;
  points: string[];
  /** The uncomfortable part. Included deliberately. */
  note?: string;
  metrics?: { value: string; label: string }[];
  tech: string[];
  source: { label: string; href: string };
};

const STAGES: Stage[] = [
  {
    id: "understanding",
    kicker: "01",
    label: "Query Understanding",
    title: "Bound the input before it reaches anything expensive",
    blurb:
      "The cheapest place to stop a bad request is before it touches a model. Everything here runs ahead of retrieval.",
    points: [
      "23 prompt-injection guard patterns — instruction override, role-play, and system-prompt extraction attempts are rejected up front.",
      "A hard 1,500-character query cap. Anything longer returns a 422 before it reaches retrieval, rather than quietly costing tokens.",
      "Rate limiting at 120 requests/minute per IP via slowapi, applied as a default limit rather than per-route opt-in.",
    ],
    tech: ["FastAPI", "Pydantic v2", "slowapi"],
    source: { label: "MiningNiti", href: "/work/miningniti" },
  },
  {
    id: "retrieval",
    kicker: "02",
    label: "Hybrid Retrieval",
    title: "Two independent signals, fused — because vectors alone miss clause numbers",
    blurb:
      "Semantic search finds things that mean the same. It does not reliably find 30 CFR 75.323. So both run, and the results are merged.",
    points: [
      "Embeddings: Gemini gemini-embedding-001 at 768 dimensions, into pgvector with an HNSW index for cosine similarity.",
      "Lexical arm: PostgreSQL full-text search — ts_rank_cd over a GIN tsvector.",
      "Fusion: Reciprocal Rank Fusion at k=60, which merges two ranked lists without needing their scores to be on a comparable scale.",
      "Over-fetch 20 candidates here, so the reranker downstream has something to actually choose between.",
    ],
    note: "The lexical arm is full-text search, not BM25. Everyone writes \"hybrid BM25 + vector\"; real BM25 needs an extension like pg_search. It started as pg_trgm trigram similarity and had to be replaced — a three-token question like \"methane limits?\" scored into the floor against a 1,000-word chunk.",
    tech: ["pgvector", "HNSW", "GIN tsvector", "RRF k=60"],
    source: { label: "MiningNiti", href: "/work/miningniti" },
  },
  {
    id: "reranking",
    kicker: "03",
    label: "Cross-Encoder Rerank",
    title: "Re-score the shortlist with a model that reads query and passage together",
    blurb:
      "Bi-encoders embed the query and the document separately and compare vectors. A cross-encoder reads both at once. Slower per pair, materially more accurate — which is why it only runs on 20 candidates, not the corpus.",
    points: [
      "ms-marco-MiniLM-L-6-v2 through sentence-transformers, narrowing 20 candidates to the top 5.",
      "Runs on CPU. No GPU in the deployment, and none needed at this corpus size.",
    ],
    note: "Reranking is also the single best way to hide a broken retriever. Disabling the lexical arm entirely left every aggregate retrieval metric unchanged — the cross-encoder simply compensated. A green dashboard could not tell working hybrid search from half-dead hybrid search.",
    tech: ["sentence-transformers", "ms-marco-MiniLM-L-6-v2"],
    source: { label: "MiningNiti", href: "/work/miningniti" },
  },
  {
    id: "router",
    kicker: "04",
    label: "Agent Router",
    title: "One classification decides which agents run at all",
    blurb:
      "Routing is not a formality here — the classifier's output is load-bearing. It runs first and alone, because everything downstream branches on it.",
    points: [
      "Classifier on Groq gpt-oss-120b, sorting documents into safety, regulatory, equipment, or geological.",
      "The category gates execution: a document classified equipment skips the hazard screen entirely, so it never pays for an analysis it does not need.",
      "The taxonomy was deliberately collapsed from nine categories to four. A finer label that nothing downstream branches on is just a more expensive label.",
    ],
    tech: ["Groq", "gpt-oss-120b", "asyncio"],
    source: { label: "MiningNiti", href: "/work/miningniti" },
  },
  {
    id: "agents",
    kicker: "05",
    label: "Specialized Agents",
    title: "Five agents, four providers, one coordinator that is not an agent",
    blurb:
      "Four run on upload; the fifth runs only when asked. Splitting the work by cognitive task gives each step its own prompt, its own model, and its own failure boundary.",
    points: [
      "Safety Analyzer (Mistral magistral-small), Entity Extractor and Summarizer (Cerebras gpt-oss-120b) run concurrently under asyncio.gather() once the classifier returns.",
      "Compliance Auditor (Groq) runs on demand and returns a per-clause Pass / Fail / Not Addressed matrix — a shape someone can act on, not a paragraph to re-read.",
      "Fallback is routed by token budget, not preference: Groq's free tier allows 8K tokens/minute, Cerebras serves the identical model at 30K. Same output, four times the headroom.",
      "Each agent catches its own exceptions and returns them in an errors list rather than raising, so one failure does not kill the run.",
    ],
    note: "Retry logic originally existed in both the orchestrator and the agent base class. Composed, they reached nine attempts and minutes of sleep per agent on a single failure. It now lives in exactly one place.",
    metrics: [
      { value: "5", label: "Agents" },
      { value: "4", label: "Providers" },
      { value: "30K", label: "Tokens/min Headroom" },
    ],
    tech: ["Groq", "Cerebras", "Mistral", "asyncio"],
    source: { label: "MiningNiti", href: "/work/miningniti" },
  },
  {
    id: "reasoning",
    kicker: "06",
    label: "Grounded Generation",
    title: "Answers that cite their source, and refuse when the source isn't there",
    blurb:
      "Generation is constrained to the retrieved context. The interesting behaviour is what happens when the context does not contain the answer.",
    points: [
      "Streamed over SSE with inline [Document, Page X] citations, so a claim can be checked against a page rather than trusted.",
      "The system prompt forbids answering beyond retrieved context.",
    ],
    note: "In the demo, asking about a manager's duties gets a model that says those duties are not in the retrieved context and offers the owner's duties instead — with citations. That looks like a miss and is actually the guardrail working: a near-miss is reported as a near-miss rather than confabulated into an answer.",
    tech: ["SSE streaming", "Citation grounding"],
    source: { label: "MiningNiti", href: "/work/miningniti" },
  },
  {
    id: "evaluation",
    kicker: "07",
    label: "Evaluation Gate",
    title: "The stage most portfolios skip — and the one that blocks the build",
    blurb:
      "RAG fails in two distinct ways: retrieval brings back the wrong thing, or generation mishandles the right thing. A single end-to-end score hides which. So they are measured separately, and retrieval is gated in CI.",
    points: [
      "12 labelled queries over a 130-chunk corpus, scored on every CI run with a local sentence-transformers model — no API keys, deterministic.",
      "Direct guards that the lexical index returns rows and can distinguish 30 CFR 75.323 from 75.400. Those are the tests that fail when it actually breaks.",
      "Generation quality (faithfulness, answer relevancy) is LLM-judged and run on demand rather than in CI, because it needs a key.",
      "On the research side: Monte Carlo Dropout over 30 passes produces a posterior that escalates uncertain cases to a human instead of guessing — 28.4% escalated, expected calibration error 0.038.",
    ],
    note: "A 130-chunk corpus is small, and perfect scores mean the gate is working, not that retrieval is solved. Its job is to fail loudly on a regression.",
    metrics: [
      { value: "1.000", label: "Hit Rate@5 · floor 0.90" },
      { value: "0.958", label: "Recall@5 · floor 0.85" },
      { value: "0.968", label: "nDCG@5 · floor 0.75" },
    ],
    tech: ["pytest", "GitHub Actions", "MC Dropout", "Platt scaling"],
    source: { label: "HATF Early Warning", href: "/work/hatf-lms-early-warning" },
  },
];

const byId = (id: string) => STAGES.find(s => s.id === id)!;

/** Long enough to actually read a panel, not so long the tour looks stalled. */
const AUTO_ADVANCE_MS = 5200;

export function SystemsLab() {
  // Starts at stage 01 so the tour walks the pipeline in the order it runs.
  const [activeId, setActiveId] = useState(STAGES[0].id);
  const [touring, setTouring] = useState(true);
  const [hovering, setHovering] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const lastPointer = useRef({ x: -1, y: -1 });
  const active = byId(activeId);
  const activeIndex = STAGES.findIndex(s => s.id === activeId);
  const reduce = useReducedMotion();

  /**
   * Picking a stage ends the tour for good.
   *
   * This is the whole reason the pattern is tolerable: the moment a visitor
   * takes control, nothing may pull the panel out from under them while they
   * are still reading it.
   */
  const select = useCallback((id: string) => {
    setActiveId(id);
    setTouring(false);
  }, []);

  // Only tour while the section is actually on screen.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), {
      threshold: 0.35,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Hover can never stay latched once the section leaves the viewport.
  useEffect(() => {
    if (!onScreen) setHovering(false);
  }, [onScreen]);

  /**
   * Pause only for a pointer that actually moved.
   *
   * Scrolling the section under a stationary cursor fires `mouseover` with no
   * matching `mouseout`, which latched `hovering` on and left the tour frozen
   * for good — the exact case of someone scrolling down with their cursor
   * resting over the diagram. Chrome also emits a synthetic `mousemove` after
   * a scroll, so the guard compares coordinates rather than trusting the event.
   */
  const onPointerActivity = useCallback((e: React.MouseEvent) => {
    if (e.clientX === lastPointer.current.x && e.clientY === lastPointer.current.y) return;
    lastPointer.current = { x: e.clientX, y: e.clientY };
    setHovering(true);
  }, []);

  const running = touring && !hovering && onScreen && !reduce;

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      // A backgrounded tab would otherwise burn through every stage unseen.
      if (document.hidden) return;
      setActiveId(cur => {
        const i = STAGES.findIndex(s => s.id === cur);
        return STAGES[(i + 1) % STAGES.length].id;
      });
    }, AUTO_ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [running]);

  return (
    <section ref={sectionRef} className="section-y relative">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          index={3}
          kicker="AI Systems Lab"
          title={<>How I actually build these systems.</>}
          lead="Not a list of tools — the pipeline itself. It walks itself stage by stage; select any node to take over and see what runs there, why it was built that way, and what it is measured on."
        />

        <div
          onMouseMove={onPointerActivity}
          onMouseLeave={() => setHovering(false)}
          className="mt-16 grid gap-8 lg:grid-cols-12 lg:gap-12"
        >
          {/* ── Diagram ── */}
          <Reveal className="lg:col-span-5">
            <div className="rounded-xl border border-hairline bg-card/40 p-5 sm:p-7">
              <Terminal>User query</Terminal>
              <Drop />
              <Node id="understanding" activeId={activeId} onSelect={select} />
              <Fork />

              {/* Two parallel branches */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-3">
                  <Node id="retrieval" activeId={activeId} onSelect={select} />
                  <Drop short />
                  <Node id="reranking" activeId={activeId} onSelect={select} />
                </div>
                <div className="space-y-3">
                  <Node id="router" activeId={activeId} onSelect={select} />
                  <Drop short />
                  <Node id="agents" activeId={activeId} onSelect={select} />
                </div>
              </div>

              <Merge />
              <Node id="reasoning" activeId={activeId} onSelect={select} />
              <Drop />
              <Node id="evaluation" activeId={activeId} onSelect={select} />
              <Drop />
              <Terminal>Final response</Terminal>
            </div>
          </Reveal>

          {/* ── Detail panel ── */}
          <div className="lg:col-span-7">
            {/* ── Tour control ──
                A visible pause/resume control is what makes an auto-advancing
                panel acceptable rather than hostile: the reader can always
                stop it, and it reports where it is in the pipeline. */}
            <div className="mb-3 flex items-center justify-between gap-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                {running ? "Auto-touring" : touring ? "Paused" : "Manual"}
                <span className="mx-2 text-muted-foreground/40">·</span>
                Stage {String(activeIndex + 1).padStart(2, "0")} / {String(STAGES.length).padStart(2, "0")}
              </span>
              <button
                type="button"
                onClick={() => setTouring(t => !t)}
                aria-pressed={touring}
                className="inline-flex items-center gap-1.5 rounded-full border border-hairline px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:border-accent/40 hover:text-accent"
              >
                {touring ? (
                  <>
                    <Pause className="h-2.5 w-2.5" /> Pause tour
                  </>
                ) : (
                  <>
                    <Play className="h-2.5 w-2.5" /> Auto-tour
                  </>
                )}
              </button>
            </div>

            {/* Progress hairline — shows the tour is on a timer rather than
                jumping at random. Restarts whenever the stage or run state
                changes, via the key. */}
            <div className="mb-3 h-px w-full overflow-hidden bg-hairline">
              <motion.div
                key={`${activeId}-${running}`}
                className="h-px origin-left bg-accent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: running ? 1 : 0 }}
                transition={{ duration: running ? AUTO_ADVANCE_MS / 1000 : 0, ease: "linear" }}
              />
            </div>

            <div
              id="systems-lab-panel"
              /* Silent while the tour drives it — a live region firing every
                 5s would talk over a screen-reader user continuously. It
                 becomes polite once they take control and their own choices
                 are worth announcing. */
              aria-live={touring ? "off" : "polite"}
              className="rounded-xl border border-hairline bg-card p-6 shadow-[var(--shadow-elevated)] sm:p-8"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={reduce ? undefined : { opacity: 0, y: 8 }}
                  animate={reduce ? undefined : { opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                    Stage {active.kicker} · {active.label}
                  </p>
                  <h3 className="mt-3 font-display text-headline text-foreground">
                    {active.title}
                  </h3>
                  <p className="mt-4 leading-relaxed text-muted-foreground">{active.blurb}</p>

                  <ul className="mt-6 space-y-3">
                    {active.points.map((pt) => (
                      <li key={pt} className="flex gap-3.5">
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent"
                        />
                        <span className="text-sm leading-relaxed text-muted-foreground">{pt}</span>
                      </li>
                    ))}
                  </ul>

                  {active.metrics && (
                    <dl className="mt-7 grid grid-cols-3 gap-4 border-t border-hairline pt-6">
                      {active.metrics.map((m) => (
                        <div key={m.label}>
                          <dt className="sr-only">{m.label}</dt>
                          <dd>
                            <span className="block font-display text-2xl text-foreground">
                              {m.value}
                            </span>
                            <span className="mt-1 block font-mono text-[10px] uppercase leading-tight tracking-wider text-muted-foreground">
                              {m.label}
                            </span>
                          </dd>
                        </div>
                      ))}
                    </dl>
                  )}

                  {active.note && (
                    <p className="mt-7 border-l-2 border-accent/40 pl-4 text-sm leading-relaxed text-muted-foreground">
                      {active.note}
                    </p>
                  )}

                  <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-hairline pt-6">
                    <div className="flex flex-wrap gap-1.5">
                      {active.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded border border-hairline px-2 py-1 font-mono text-[10px] text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <a
                      href={active.source.href}
                      className="group ml-auto inline-flex items-center gap-1 text-sm font-medium text-foreground transition-colors hover:text-accent"
                    >
                      {active.source.label}
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Diagram primitives ─────────────────────────────────────────────────── */

function Node({
  id,
  activeId,
  onSelect,
}: {
  id: string;
  activeId: string;
  onSelect: (id: string) => void;
}) {
  const stage = byId(id);
  const isActive = id === activeId;

  return (
    <button
      type="button"
      onClick={() => onSelect(id)}
      aria-controls="systems-lab-panel"
      aria-current={isActive ? "true" : undefined}
      className={`w-full rounded-lg border px-3 py-2.5 text-left transition-colors ${
        isActive
          ? "border-accent bg-accent/[0.09]"
          : "border-hairline bg-background hover:border-accent/40 hover:bg-secondary"
      }`}
    >
      <span
        className={`block font-mono text-[9px] tracking-widest ${
          isActive ? "text-accent" : "text-muted-foreground"
        }`}
      >
        {stage.kicker}
      </span>
      <span
        className={`mt-0.5 block text-xs font-medium leading-snug sm:text-sm ${
          isActive ? "text-accent" : "text-foreground"
        }`}
      >
        {stage.label}
      </span>
    </button>
  );
}

function Terminal({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-full border border-dashed border-hairline px-3 py-2 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
      {children}
    </div>
  );
}

/** Vertical connector between two stacked nodes. */
function Drop({ short = false }: { short?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={`mx-auto w-px bg-hairline ${short ? "h-3" : "h-5"} ${short ? "" : "my-1"}`}
    />
  );
}

/** Splits the single rail into the two parallel branches. */
function Fork() {
  return (
    <div aria-hidden="true" className="relative h-9">
      <span className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-hairline" />
      <span className="absolute left-1/4 right-1/4 top-4 h-px bg-hairline" />
      <span className="absolute left-1/4 top-4 h-5 w-px bg-hairline" />
      <span className="absolute right-1/4 top-4 h-5 w-px bg-hairline" />
    </div>
  );
}

/** Rejoins the two branches into the single rail. */
function Merge() {
  return (
    <div aria-hidden="true" className="relative h-9">
      <span className="absolute left-1/4 top-0 h-5 w-px bg-hairline" />
      <span className="absolute right-1/4 top-0 h-5 w-px bg-hairline" />
      <span className="absolute left-1/4 right-1/4 top-5 h-px bg-hairline" />
      <span className="absolute left-1/2 top-5 h-4 w-px -translate-x-1/2 bg-hairline" />
    </div>
  );
}
