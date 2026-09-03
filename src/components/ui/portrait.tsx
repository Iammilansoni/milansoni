import { memo, useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/motion";

/**
 * A photographic frame, built for the two studio portraits specifically.
 *
 * Both source images are a lit subject against pure black, and the whole
 * treatment follows from that: the plinth underneath continues the
 * photograph's own background (see `.plinth` in styles.css), the lower edge
 * of the image is masked so the figure runs out of light instead of hitting
 * a crop line, and nothing draws a bright rectangle around the subject.
 *
 * Three transforms are layered rather than combined, because they run on
 * different clocks and would otherwise overwrite one another on a single
 * node:
 *
 *   frame     — clip-path reveal, plays once when the frame enters view
 *   parallax  — continuous, driven by scroll position
 *   settle    — scale + blur, plays once alongside the reveal
 *
 * The parallax layer carries a static 1.12 over-scale so the ±`parallax`%
 * drift never exposes an edge; that leaves ~6% of margin against a default
 * 4% travel.
 */
type PortraitProps = {
  src: string;
  alt: string;
  /** Intrinsic pixel dimensions — set on the <img> so the frame never shifts. */
  width: number;
  height: number;
  /** Aspect + sizing classes for the frame, e.g. "aspect-[4/5]". */
  className?: string;
  /** Scroll drift of the image against its frame, in percent. */
  parallax?: number;
  /** How far into the plinth the lower edge dissolves. */
  fade?: "soft" | "deep";
  /** Mono index label pinned to the frame, e.g. "01". */
  index?: string;
  /** Mono caption rendered beneath the frame. */
  caption?: ReactNode;
  /** Above the fold — skips lazy loading and decodes eagerly. */
  priority?: boolean;
  /** Reveal delay, seconds. */
  delay?: number;
};

export const Portrait = memo(function Portrait({
  src,
  alt,
  width,
  height,
  className = "aspect-[4/5]",
  parallax = 4,
  fade = "soft",
  index,
  caption,
  priority = false,
  delay = 0,
}: PortraitProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Spring the raw progress, then map it — springing the mapped percentage
  // string is what makes the drift feel weighted rather than glued to the
  // scrollbar, and keeping the spring on the numeric value avoids unit
  // interpolation entirely.
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.35,
  });
  const y = useTransform(smooth, [0, 1], [`-${parallax}%`, `${parallax}%`]);

  // Pointer bloom. Written straight to the node as CSS custom properties,
  // so moving the cursor never re-renders React.
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = frameRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const captionNode = caption ? (
    <motion.figcaption
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: delay + 0.5 }}
      className="mt-4 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground"
    >
      <span className="h-px w-6 bg-hairline" />
      {caption}
    </motion.figcaption>
  ) : null;

  return (
    <figure className="group/portrait relative">
      <div
        ref={frameRef}
        onMouseMove={reduce ? undefined : onMove}
        className={`plinth relative overflow-hidden rounded-[1.75rem] ${className}`}
      >
        {/* Reveal — the frame opens downward, so the face arrives first. */}
        <motion.div
          className="absolute inset-0"
          initial={reduce ? { opacity: 0 } : { clipPath: "inset(0% 0% 100% 0%)" }}
          whileInView={reduce ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0%)" }}
          viewport={{ once: true, margin: "-12%" }}
          transition={{ duration: reduce ? 0.4 : 1.2, ease: EASE_OUT_EXPO, delay }}
        >
          <motion.div
            className="h-full w-full scale-[1.12] will-change-transform"
            style={reduce ? undefined : { y }}
          >
            <motion.img
              src={src}
              alt={alt}
              width={width}
              height={height}
              loading={priority ? "eager" : "lazy"}
              decoding={priority ? "sync" : "async"}
              fetchPriority={priority ? "high" : "auto"}
              draggable={false}
              className={`portrait-grade h-full w-full object-cover object-top ${
                fade === "deep" ? "portrait-fade-deep" : "portrait-fade"
              }`}
              initial={reduce ? false : { scale: 1.08, filter: "blur(14px)" }}
              whileInView={{ scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-12%" }}
              transition={{
                duration: reduce ? 0 : 1.4,
                ease: EASE_OUT_EXPO,
                delay,
              }}
            />
          </motion.div>
        </motion.div>

        {/* Grain, tied to the site-wide `--grain-opacity`, so the photograph
            picks up the same surface texture as every other panel. */}
        <div aria-hidden className="noise pointer-events-none absolute inset-0 z-[1]" />

        <div aria-hidden className="plinth-sheen" />

        {/* Crop marks — registration, not a border. */}
        <span aria-hidden className="crop-mark left-4 top-4 border-l border-t" />
        <span aria-hidden className="crop-mark right-4 top-4 border-r border-t" />
        <span aria-hidden className="crop-mark bottom-4 left-4 border-b border-l" />
        <span aria-hidden className="crop-mark bottom-4 right-4 border-b border-r" />

        {index && (
          <span
            aria-hidden
            className="absolute bottom-5 right-6 z-[3] font-mono text-[10px] tracking-[0.3em] text-white/45"
          >
            [{index}]
          </span>
        )}
      </div>

      {captionNode}
    </figure>
  );
});

/**
 * The identity crop — same photograph, reduced to a plate small enough to sit
 * inline beside a heading or a logotype.
 *
 * The orbiting arc is the only looping animation attached to these images. It
 * earns the loop by carrying meaning the static crop cannot: it is the same
 * "live" signal as the pulsing availability dots in the hero and footer, so a
 * reader who has seen those already knows how to read this one.
 */
export const PortraitAvatar = memo(function PortraitAvatar({
  src,
  alt,
  size = 72,
  focus = "50% 30%",
  zoom = 1,
  className = "",
}: {
  src: string;
  alt: string;
  size?: number;
  /**
   * Where the subject's face sits in the source frame. Doubles as the
   * transform origin, so `zoom` pushes in on the face rather than the
   * middle of the picture.
   *
   * Both source images need this. They are full-length studio frames, and a
   * circle laid over one un-zoomed crops to mostly empty backdrop with a
   * small head near the top — object-position alone cannot fix that, because
   * a near-square source in a square window has no overflow to reposition.
   */
  focus?: string;
  /** Scale applied about `focus`. */
  zoom?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <span
      className={`relative inline-flex shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <motion.span
        aria-hidden
        className="avatar-ring absolute inset-0 rounded-full"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
      />
      <span className="absolute inset-[3px] overflow-hidden rounded-full border border-white/10 bg-[oklch(0.085_0.006_265)]">
        <img
          src={src}
          alt={alt}
          width={size}
          height={size}
          loading="lazy"
          decoding="async"
          draggable={false}
          style={{ objectPosition: focus, transformOrigin: focus, scale: zoom }}
          className="portrait-grade h-full w-full object-cover"
        />
      </span>
    </span>
  );
});
