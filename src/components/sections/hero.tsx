import { memo, lazy, Suspense, useRef, useEffect, useState, type RefObject } from "react";
import { Link } from "@tanstack/react-router";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useReducedMotion,
  type MotionValue,
  type Variants,
} from "framer-motion";
import { ArrowRight, ArrowUpRight, Download, ChevronDown } from "lucide-react";
import { Magnetic } from "@/components/ui/magnetic";
import { TextRoll } from "@/components/ui/text-roll";
import { EASE_OUT_EXPO } from "@/lib/motion";

// Three.js stays off the critical path — the name paints without it.
const WebGLBackground = lazy(() =>
  import("@/components/webgl-background").then(m => ({ default: m.WebGLBackground }))
);

const NAME = "MILAN SONI";

/**
 * The rotating identity line.
 *
 * Every entry is a fact that is already stated and sourced elsewhere on this
 * page — the stat bar directly below carries the primary links for the SIH
 * result, the PiCET paper and the OmniRoute repository, and the agent count and
 * infrastructure cost come from the MiningNiti case study. Nothing here is only
 * visible during the rotation, so a reader who never sees line [03] loses no
 * information; the movement is emphasis, not content.
 *
 * Keep [01] the longest line: the pill is sized to the widest entry and holds
 * that width forever, so the widest entry is what sets the hero's layout.
 */
const ROLES = [
  "AI ENGINEER · FULL STACK · RAG SPECIALIST",
  "SIH 2023 WINNER · MINISTRY OF COAL",
  "SCOPUS-INDEXED AUTHOR · PiCET-2026 · IET",
  "5+ PRs MERGED · OMNIROUTE · 50k★",
  "5 PRODUCTION AGENTS · 4 LLM PROVIDERS",
];
const ROLE_INTERVAL = 3600;

const STATS = [
  {
    value: "Winner",
    label: "SIH '23 (Coal India & CMPDI)",
    href: "https://www.sih.gov.in/sih2023-grand-finale-result",
    accent: true,
  },
  {
    value: "PiCET-26",
    label: "Scopus Indexed Paper",
    href: "https://drive.google.com/file/d/11DTgnEqtFGIB-PpX-SKyheMCue5xRe-_/view?usp=sharing",
  },
  // 5, not 6 — the repo has five agents; the sixth row in the old README was
  // the RAG chat pipeline, and the Orchestrator is a coordinator.
  { value: "5", label: "AI Agents Deployed" },
  { value: "3+", label: "Enterprise Internships" },
  {
    value: "50k★",
    label: "Open Source · OmniRoute",
    href: "https://github.com/diegosouzapw/OmniRoute",
  },
];

const statsContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 1.2 } },
};
const statItem: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE_OUT_EXPO },
  },
};

/**
 * The masked content stack, rendered twice: once as the real, readable
 * document, and once as an aria-hidden bright copy revealed through a
 * cursor-following mask.
 *
 * Rendering it from one component is what keeps the two layers from drifting
 * apart — the previous build had the whole block copy-pasted, which is how it
 * ended up shipping two <h1>s and reading the tagline twice to screen readers.
 * The same reasoning is why `role` is passed in rather than held here: two
 * independent timers would let the base and the revealed copy show different
 * lines.
 */
function HeroStack({
  bright = false,
  role,
  onPauseChange,
}: {
  bright?: boolean;
  role: number;
  onPauseChange?: (paused: boolean) => void;
}) {
  return (
    <div className="flex w-full flex-col items-center px-4">
      {/* Availability — a transparent spacer on the bright layer so the two
          stacks stay in vertical lockstep. */}
      <div
        className={
          bright
            ? "pointer-events-none mb-8 flex items-center gap-2 rounded-full border border-transparent px-4 py-1.5 text-xs opacity-0"
            : "mb-8 flex items-center gap-2 rounded-full border border-accent/25 bg-accent/[0.06] px-4 py-1.5 font-mono text-xs text-accent backdrop-blur-sm"
        }
      >
        <span className="relative flex h-2 w-2">
          {!bright && (
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
          )}
          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
        </span>
        AVAILABLE FOR 2026 ROLES
      </div>

      {bright ? (
        <span className="hero-bright block font-display text-hero font-bold text-foreground">
          {NAME}
        </span>
      ) : (
        <h1 className="hero-name font-display text-hero">{NAME}</h1>
      )}

      <div className="mt-6 flex w-full max-w-2xl flex-col items-center gap-3 px-4">
        {/*
          Role — an auto-advancing line. All entries are rendered stacked in a
          single grid cell, so the pill is measured once against the longest one
          and never resizes as they cycle; only opacity, blur and a 4px lift
          animate, which means zero layout shift and no reflow of the masked
          copy sitting on top of it.

          Hovering the pill pauses the rotation, and reduced-motion stops it
          from ever starting.
        */}
        <div
          onMouseEnter={bright ? undefined : () => onPauseChange?.(true)}
          onMouseLeave={bright ? undefined : () => onPauseChange?.(false)}
          className={
            bright
              ? "pointer-events-none max-w-full rounded-full border border-transparent px-3 py-1.5 text-center font-mono text-[10px] font-bold tracking-[0.04em] text-accent drop-shadow-[0_0_15px_color-mix(in_oklab,var(--accent)_60%,transparent)] sm:px-4 sm:text-sm sm:tracking-widest"
              : "pointer-events-auto max-w-full rounded-full border border-hairline bg-foreground/[0.03] px-3 py-1.5 text-center font-mono text-[10px] tracking-[0.04em] text-muted-foreground shadow-sm backdrop-blur-md sm:px-4 sm:text-sm sm:tracking-widest"
          }
        >
          <span className="grid max-w-full place-items-center">
            {ROLES.map((r, i) => (
              <motion.span
                key={r}
                aria-hidden={i === role ? undefined : "true"}
                /* max-w-full + normal wrapping is the safety net for very
                   narrow phones (≤320px): the line breaks instead of being
                   clipped, and because every entry shares one grid cell the
                   pill is still sized to the tallest, so wrapping costs no
                   layout shift either. */
                className="col-start-1 row-start-1 max-w-full whitespace-normal sm:whitespace-nowrap"
                initial={false}
                animate={
                  i === role
                    ? { opacity: 1, y: 0, filter: "blur(0px)" }
                    : { opacity: 0, y: -4, filter: "blur(3px)" }
                }
                transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
              >
                <span className={bright ? "mr-2 text-accent/50" : "mr-2 text-muted-foreground/60"}>
                  [{String(i + 1).padStart(2, "0")}]
                </span>
                {r}
              </motion.span>
            ))}
          </span>
        </div>

        {/* Tagline */}
        <p
          className={`text-center text-lg leading-relaxed md:text-xl ${
            bright ? "font-medium text-accent" : "text-muted-foreground"
          }`}
        >
          Engineering{" "}
          <em className="pr-1 font-display text-3xl italic tracking-wide text-foreground md:text-4xl">
            intelligent
          </em>{" "}
          systems,{" "}
          <em className="pr-1 font-display text-3xl italic tracking-wide text-foreground md:text-4xl">
            multi-agent AI pipelines
          </em>
          , and production{" "}
          <em className="pr-1 font-display text-3xl italic tracking-wide text-foreground md:text-4xl">
            RAG architectures
          </em>
          .
        </p>
      </div>
    </div>
  );
}

/**
 * Owns the rotation state.
 *
 * It lives here rather than in `Hero` so that advancing the line re-renders
 * only the two text stacks — putting it in `Hero` would re-render the lazy
 * `<Canvas>` alongside it every few seconds.
 */
function HeroStacks({
  stackRef,
  y,
  maskImage,
  reduce,
}: {
  stackRef: RefObject<HTMLDivElement | null>;
  y: MotionValue<string>;
  maskImage: MotionValue<string>;
  reduce: boolean;
}) {
  const [role, setRole] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || paused) return;
    const id = window.setInterval(() => {
      // Skip ticks on a backgrounded tab, so returning to the page resumes
      // from the line that was left rather than an arbitrary one.
      if (document.hidden) return;
      setRole(r => (r + 1) % ROLES.length);
    }, ROLE_INTERVAL);
    return () => window.clearInterval(id);
  }, [reduce, paused]);

  return (
    /*
      Both layers live in ONE relative box and render the same component, so
      the revealed copy sits exactly on top of the base. Anchoring the bright
      layer to the section instead (`absolute inset-0` on a flex section that
      also holds the CTAs, stats and scroll cue) offsets it vertically and
      shows a second, ghosted name below the real one.
    */
    <motion.div
      ref={stackRef}
      style={reduce ? undefined : { y }}
      className="pointer-events-none relative z-10 flex w-full flex-col items-center justify-center"
    >
      <HeroStack role={role} onPauseChange={setPaused} />

      {!reduce && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center"
          style={{ maskImage, WebkitMaskImage: maskImage }}
        >
          <div className="absolute inset-0 bg-accent opacity-[0.07]" />
          <HeroStack bright role={role} />
        </motion.div>
      )}
    </motion.div>
  );
}

export const Hero = memo(function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  // The masked layer is positioned against the content stack, so the mask
  // coordinates must be measured from that box rather than from the section.
  const stackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Scroll parallax on the whole hero.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  // Pointer position driving the reveal mask. Motion values only — moving the
  // cursor never re-renders React.
  const mouseX = useMotionValue(-600);
  const mouseY = useMotionValue(-600);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const maskImage = useMotionTemplate`radial-gradient(320px circle at ${smoothX}px ${smoothY}px, black 0%, transparent 100%)`;

  useEffect(() => {
    if (reduce) return;
    const el = containerRef.current;
    if (!el) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let frame: number | null = null;
    let cx = 0;
    let cy = 0;

    const onMove = (e: MouseEvent) => {
      cx = e.clientX;
      cy = e.clientY;
      if (frame !== null) return;
      frame = requestAnimationFrame(() => {
        const rect = (stackRef.current ?? el).getBoundingClientRect();
        mouseX.set(cx - rect.left);
        mouseY.set(cy - rect.top);
        frame = null;
      });
    };

    el.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
      el.removeEventListener("mousemove", onMove);
    };
  }, [mouseX, mouseY, reduce]);

  return (
    <motion.section
      ref={containerRef}
      style={reduce ? undefined : { opacity, scale }}
      className="relative flex min-h-[calc(85dvh-6rem)] cursor-default flex-col items-center justify-center overflow-hidden md:min-h-[calc(100vh-6rem)]"
    >
      <div className="noise pointer-events-none absolute inset-0 z-0" />
      <Suspense fallback={null}>
        <WebGLBackground />
      </Suspense>

      <HeroStacks stackRef={stackRef} y={y} maskImage={maskImage} reduce={!!reduce} />

      {/* CTAs */}
      <div className="relative z-30 mt-10 flex flex-wrap items-center justify-center gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7, ease: EASE_OUT_EXPO }}
        >
          <Magnetic strength={20}>
            <Link
              to="/work"
              className="group inline-flex items-center gap-3 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:opacity-90 md:px-8 md:py-4"
            >
              <TextRoll text="Explore my work" />
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Magnetic>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.7, ease: EASE_OUT_EXPO }}
        >
          <Magnetic strength={20}>
            <a
              href="/Milan_Soni_Resume.pdf"
              className="glass inline-flex items-center gap-3 rounded-full border border-hairline px-6 py-3 text-sm font-medium transition hover:bg-secondary md:px-8 md:py-4"
            >
              <Download className="h-4 w-4" /> <TextRoll text="Résumé" />
            </a>
          </Magnetic>
        </motion.div>
      </div>

      {/* Stats */}
      <motion.div
        variants={statsContainer}
        initial="hidden"
        animate="visible"
        className="pointer-events-none relative z-30 mt-8 mb-6 flex flex-wrap items-center justify-center gap-6 px-6 md:gap-12"
      >
        {STATS.map((s, i) => (
          <div key={s.label} className="flex items-center gap-6 md:gap-12">
            {i > 0 && (
              <motion.div variants={statItem} className="h-8 w-px bg-hairline md:h-10" />
            )}
            {s.href ? (
              <motion.a
                variants={statItem}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="group pointer-events-auto flex flex-col items-center transition-opacity hover:opacity-80"
              >
                <span
                  className={`flex items-center gap-1 font-display text-xl transition-colors md:text-2xl ${
                    s.accent ? "text-accent" : "text-foreground"
                  } group-hover:text-accent`}
                >
                  {s.value}
                  <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100 md:h-4 md:w-4" />
                </span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground md:text-[10px]">
                  {s.label}
                </span>
              </motion.a>
            ) : (
              <motion.div variants={statItem} className="flex flex-col items-center">
                <span className="font-display text-xl text-foreground md:text-2xl">{s.value}</span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground md:text-[10px]">
                  {s.label}
                </span>
              </motion.div>
            )}
          </div>
        ))}
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.9, duration: 1 }}
        className="relative z-30 mb-4"
      >
        <motion.div
          animate={reduce ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1 text-muted-foreground"
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.3em]">Scroll</span>
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </motion.section>
  );
});
