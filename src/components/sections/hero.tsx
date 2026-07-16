import { useRef, useEffect, useState, memo, lazy, Suspense } from "react";
import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue, useSpring, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, ArrowUpRight, Download, ChevronDown } from "lucide-react";
import { Magnetic } from "@/components/ui/magnetic";
import { TextRoll } from "@/components/ui/text-roll";
import { EASE_OUT_EXPO, EASE_OUT_QUINT } from "@/lib/motion";

// Lazy-load the heavy Three.js background to unblock first paint
const WebGLBackground = lazy(() =>
  import("@/components/webgl-background").then(m => ({ default: m.WebGLBackground }))
);

// ── Kinetic name: per-letter staggered rise with blur settle ─────────────
const nameContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045, delayChildren: 0.3 } },
};
const letterVariant: Variants = {
  hidden: { y: "60%", opacity: 0, rotateX: 65, filter: "blur(8px)" },
  visible: {
    y: "0%",
    opacity: 1,
    rotateX: 0,
    filter: "blur(0px)",
    transition: { duration: 1, ease: EASE_OUT_EXPO },
  },
};

function KineticName({ text, className, style }: { text: string; className?: string; style?: React.CSSProperties }) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  return (
    <motion.h1
      variants={reduce ? undefined : nameContainer}
      initial={reduce ? undefined : "hidden"}
      animate={reduce ? undefined : "visible"}
      className={className}
      style={{ perspective: 900, ...style }}
    >
      {words.map((word, wi) => (
        <span key={wi} className="inline-block overflow-hidden align-bottom">
          {word.split("").map((ch, ci) => (
            <motion.span
              key={ci}
              variants={reduce ? undefined : letterVariant}
              className="inline-block"
              style={{ transformOrigin: "bottom" }}
            >
              {ch}
            </motion.span>
          ))}
          {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </motion.h1>
  );
}

// ── Staggered word reveal for subtitle ──────────────────────────────────
const sentenceContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.9 } },
};
const wordVariant: Variants = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.6, ease: EASE_OUT_QUINT },
  },
};

function StaggeredSentence({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.p
      variants={reduce ? undefined : sentenceContainer}
      initial={reduce ? undefined : "hidden"}
      animate={reduce ? undefined : "visible"}
      className={className}
    >
      {children}
    </motion.p>
  );
}

function StaggerWord({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <span className="inline-block overflow-hidden align-bottom mr-[0.3em]">
      <motion.span
        variants={reduce ? undefined : wordVariant}
        className="inline-block"
      >
        {children}
      </motion.span>
    </span>
  );
}

// ── Stats with stagger ──────────────────────────────────────────────────
const statsContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 1.3 } },
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

export const Hero = memo(function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Scroll Parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  // Mask tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const maskSize = isHovered ? 400 : 40;
  const smoothSize = useSpring(maskSize, { stiffness: 100, damping: 20 });

  const maskImage = useMotionTemplate`radial-gradient(${smoothSize}px circle at ${smoothX}px ${smoothY}px, black 0%, transparent 100%)`;

  const rafId = useRef<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (rafId.current !== null) return;
    const { left, top } = e.currentTarget.getBoundingClientRect();
    const clientX = e.clientX;
    const clientY = e.clientY;

    rafId.current = requestAnimationFrame(() => {
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
      rafId.current = null;
    });
  };

  useEffect(() => {
    return () => {
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return (
    <motion.section
      ref={containerRef}
      style={{ opacity, scale }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative min-h-[calc(85dvh-6rem)] md:min-h-[calc(100vh-6rem)] flex flex-col items-center justify-center overflow-hidden bg-background cursor-default"
    >
      <div className="absolute inset-0 noise opacity-20 z-0 pointer-events-none" />
      <Suspense fallback={null}>
        <WebGLBackground />
      </Suspense>

      {/* ── Main Base Text ── */}
      <motion.div style={{ y }} className="relative z-10 w-full flex flex-col items-center justify-center px-4 pointer-events-none">
        {/* Status pill — slide up + blur settle */}
        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE_OUT_EXPO }}
          className="mb-8 flex items-center gap-2 rounded-full border border-aurora-1/20 bg-aurora-1/5 px-4 py-1.5 text-xs font-mono text-aurora-1 backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-aurora-1 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-aurora-1" />
          </span>
          AVAILABLE FOR 2026 ROLES
        </motion.div>

        {/* Kinetic name — per-letter rise with blur settle */}
        <KineticName
          text="MILAN SONI"
          className="font-display text-hero text-foreground/50 dark:text-foreground/35"
        />

        {/* Subtitle pill + tagline — staggered word reveal */}
        <div className="mt-6 flex flex-col items-center gap-3 w-full max-w-2xl px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.85, ease: EASE_OUT_EXPO }}
            className="text-sm font-mono text-muted-foreground/70 tracking-widest text-center whitespace-nowrap rounded-full border border-hairline bg-foreground/[0.03] px-4 py-1.5 backdrop-blur-md shadow-sm"
          >
            <span className="text-muted-foreground/40 mr-2">[01]</span> AI ENGINEER · FULL STACK · RAG SPECIALIST
          </motion.div>

          <StaggeredSentence className="text-muted-foreground text-center text-lg md:text-xl leading-relaxed">
            <StaggerWord>Engineering</StaggerWord>
            <StaggerWord><em className="font-display italic text-3xl md:text-4xl pr-1 tracking-wide text-foreground">intelligent</em></StaggerWord>
            <StaggerWord>systems,</StaggerWord>
            <StaggerWord><em className="font-display italic text-3xl md:text-4xl pr-1 tracking-wide text-foreground">multi-agent AI pipelines</em>,</StaggerWord>
            <StaggerWord>and</StaggerWord>
            <StaggerWord>production</StaggerWord>
            <StaggerWord><em className="font-display italic text-3xl md:text-4xl pr-1 tracking-wide text-foreground">RAG architectures</em>.</StaggerWord>
          </StaggeredSentence>
        </div>
      </motion.div>

      {/* ── Masked Bright Text Overlay ── */}
      <motion.div
        className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none px-4"
        style={{
          y,
          maskImage,
          WebkitMaskImage: maskImage,
        }}
      >
        <div className="absolute inset-0 bg-linear-to-br from-aurora-1 via-aurora-2 to-aurora-3 opacity-20" />

        {/* Invisible spacer to match the base pill badge */}
        <div className="mb-8 flex items-center gap-2 rounded-full border border-transparent px-4 py-1.5 text-xs font-mono opacity-0 pointer-events-none">
          <span className="h-2 w-2" />
          AVAILABLE FOR 2026 ROLES
        </div>

        <KineticName
          text="MILAN SONI"
          className="font-display text-hero font-bold text-foreground mix-blend-plus-lighter"
          style={{ filter: "brightness(1.3) drop-shadow(0 0 30px color-mix(in oklab, var(--aurora-1) 40%, transparent))" }}
        />

        <div className="mt-6 flex flex-col items-center gap-3 w-full max-w-2xl px-4">
          <div className="text-sm font-mono text-aurora-2 font-bold drop-shadow-[0_0_15px_color-mix(in_oklab,var(--aurora-1)_60%,transparent)] tracking-widest text-center whitespace-nowrap rounded-full border border-transparent px-4 py-1.5">
            <span className="text-aurora-1/50 mr-2">[01]</span> AI ENGINEER · FULL STACK · RAG SPECIALIST
          </div>
          <p className="text-aurora-1 text-center text-lg md:text-xl leading-relaxed font-medium">
            Engineering <em className="font-display italic text-3xl md:text-4xl pr-1 tracking-wide text-foreground">intelligent</em> systems, <em className="font-display italic text-3xl md:text-4xl pr-1 tracking-wide text-foreground">multi-agent AI pipelines</em>, and production <em className="font-display italic text-3xl md:text-4xl pr-1 tracking-wide text-foreground">RAG architectures</em>.
          </p>
        </div>
      </motion.div>

      {/* ── CTAs — staggered scale-bounce entrance ── */}
      <motion.div
        className="relative z-30 mt-10 flex flex-wrap items-center justify-center gap-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7, ease: EASE_OUT_EXPO }}
        >
          <Magnetic strength={20}>
            <Link
              to="/work"
              className="group inline-flex items-center gap-3 rounded-full bg-foreground px-6 py-3 md:px-8 md:py-4 text-sm font-medium text-background transition hover:bg-aurora-1 hover:text-primary-foreground"
            >
              <TextRoll text="Explore my work" />
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Magnetic>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.7, ease: EASE_OUT_EXPO }}
        >
          <Magnetic strength={20}>
            <a
              href="/Milan_Soni_Resume.pdf"
              className="inline-flex items-center gap-3 rounded-full glass px-6 py-3 md:px-8 md:py-4 text-sm font-medium hover:bg-secondary transition border border-hairline"
            >
              <Download className="h-4 w-4" /> <TextRoll text="Résumé" />
            </a>
          </Magnetic>
        </motion.div>
      </motion.div>

      {/* ── Stats Bar — staggered with blur settle ── */}
      <motion.div
        variants={statsContainer}
        initial="hidden"
        animate="visible"
        className="relative z-30 mt-6 mb-6 flex flex-wrap items-center justify-center gap-6 md:gap-12 px-6 pointer-events-none"
      >
        <motion.a variants={statItem} href="https://www.sih.gov.in/sih2023-grand-finale-result" target="_blank" rel="noreferrer" className="flex flex-col items-center pointer-events-auto group hover:opacity-80 transition-opacity">
          <span className="font-display text-xl md:text-2xl text-aurora-1 group-hover:text-aurora-2 transition-colors flex items-center gap-1">
            Winner <ArrowUpRight className="h-3 w-3 md:h-4 md:w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </span>
          <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-widest text-muted-foreground">SIH '23 (Coal India & CMPDI)</span>
        </motion.a>
        <motion.div variants={statItem} className="w-px h-8 md:h-10 bg-hairline" />
        <motion.a variants={statItem} href="https://drive.google.com/file/d/11DTgnEqtFGIB-PpX-SKyheMCue5xRe-_/view?usp=sharing" target="_blank" rel="noreferrer" className="flex flex-col items-center pointer-events-auto group hover:opacity-80 transition-opacity">
          <span className="font-display text-xl md:text-2xl text-foreground group-hover:text-aurora-2 transition-colors flex items-center gap-1">
            PICET-26 <ArrowUpRight className="h-3 w-3 md:h-4 md:w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </span>
          <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-widest text-muted-foreground">Scopus Indexed Paper</span>
        </motion.a>
        <motion.div variants={statItem} className="w-px h-8 md:h-10 bg-hairline" />
        <motion.div variants={statItem} className="flex flex-col items-center">
          <span className="font-display text-xl md:text-2xl text-foreground">6</span>
          <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-widest text-muted-foreground">AI Agents Deployed</span>
        </motion.div>
        <motion.div variants={statItem} className="w-px h-8 md:h-10 bg-hairline" />
        <motion.div variants={statItem} className="flex flex-col items-center">
          <span className="font-display text-xl md:text-2xl text-foreground">3+</span>
          <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-widest text-muted-foreground">Enterprise Internships</span>
        </motion.div>
        <motion.div variants={statItem} className="w-px h-8 md:h-10 bg-hairline" />
        <motion.a variants={statItem} href="https://github.com/diegosouzapw/OmniRoute" target="_blank" rel="noreferrer" className="flex flex-col items-center pointer-events-auto group hover:opacity-80 transition-opacity">
          <span className="font-display text-xl md:text-2xl text-foreground group-hover:text-aurora-2 transition-colors flex items-center gap-1">
            10.9k★ <ArrowUpRight className="h-3 w-3 md:h-4 md:w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </span>
          <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-widest text-muted-foreground">Open Source · OmniRoute</span>
        </motion.a>
      </motion.div>

      {/* ── Scroll indicator — gentle bounce ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="relative z-30 mb-4"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1 text-muted-foreground/40"
        >
          <span className="text-[9px] font-mono uppercase tracking-[0.3em]">Scroll</span>
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.div>
    </motion.section>
  );
});
