import { memo, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { SITE } from "@/lib/site";

/**
 * The positioning band — the figure on the left, and on the right the one
 * place on the site that says plainly who each visitor is and what they
 * should do next.
 *
 * The figure is unframed, and the trick that allows that is
 * `mix-blend-mode: screen`. Screen leaves the backdrop untouched wherever the
 * source is black, so a studio frame shot against black drops its own
 * background out on its own: no card, no border, no rounded rectangle, no
 * mask fighting the silhouette. Only the lit side of the subject survives,
 * and it appears to be lit *by* the page.
 *
 * That only holds over a dark backdrop, which is why the band paints its own
 * near-black core rather than inheriting the canvas. The core fades back to
 * `--background` at both edges, so on the dark theme the band is seamless
 * with the page, and on light paper it reads as a deliberate cinema strip
 * rather than a black box someone forgot to theme. Blending against paper
 * would erase the subject outright.
 *
 * Because that core is dark in BOTH themes, every colour in here is fixed
 * rather than tokenised — `text-foreground` would turn near-black on light
 * paper and vanish. The one exception is `--accent`, re-pointed on the
 * section to its dark-theme value so the token still works for descendants
 * without any of them having to know they are on a dark ground.
 */

/**
 * The three people who actually land on this page, and the next click for
 * each.
 *
 * One line apiece, and the line is a scan target rather than a paragraph —
 * nobody arrives at a portfolio intending to read. Each entry names the
 * credential and stops; the proof for all of it is one click away in the
 * action, and repeated at length further down the page.
 */
const AUDIENCES: ReadonlyArray<{
  who: string;
  line: string;
  action: string;
  /** Internal route. Typed to the literal so the router can check it. */
  to?: "/work";
  /** External or asset URL, used when `to` is absent. */
  href?: string;
  external?: boolean;
}> = [
  {
    who: "For recruiters",
    line: "B.Tech CSE '26 · three internships · SIH 2023 National winner. Open to AI and SDE roles.",
    action: "Résumé",
    href: "/Milan_Soni_Resume.pdf",
  },
  {
    who: "For founders",
    line: "Solo, end to end: an AI LMS, a financial SaaS, and a doc-intelligence platform that replaced a $400/mo vector DB with pgvector.",
    action: "See the work",
    to: "/work",
  },
  {
    who: "For engineers",
    line: "5+ PRs merged into OmniRoute, a 50k★ AI gateway. Trade-offs and eval harnesses written down.",
    action: "GitHub",
    href: SITE.socials.github,
    external: true,
  },
];

/**
 * One audience row, rendered as a single full-row link.
 *
 * Split out of the section so the hover styling lives in exactly one place —
 * the internal and external branches differ only in the element, and the
 * previous inline version had the class list duplicated across both.
 */
function RowLink({ a }: { a: (typeof AUDIENCES)[number] }) {
  const content = (
    <>
      <span className="shrink-0 pt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-accent sm:w-32">
        {a.who}
      </span>
      <span className="flex-1 text-sm leading-relaxed text-white/60 transition-colors duration-500 group-hover/row:text-white/85">
        {a.line}
      </span>
      <span className="inline-flex shrink-0 items-center gap-1.5 pt-0.5 text-sm font-medium text-white/85 transition-colors duration-300 group-hover/row:text-accent">
        {a.action}
        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 ease-out-quint group-hover/row:translate-x-0.5 group-hover/row:-translate-y-0.5" />
      </span>
    </>
  );

  const cls =
    "flex flex-col gap-3 py-5 transition-transform duration-500 ease-out-quint group-hover/row:translate-x-1 sm:flex-row sm:items-start sm:gap-6";

  return a.to ? (
    <Link to={a.to} className={cls}>
      {content}
    </Link>
  ) : (
    <a
      href={a.href}
      {...(a.external ? { target: "_blank", rel: "noreferrer" } : {})}
      className={cls}
    >
      {content}
    </a>
  );
}

export const PortraitStage = memo(function PortraitStage({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 26,
    mass: 0.4,
  });

  // The figure pushes in as it crosses the viewport and drifts a little
  // slower than the page. Both are wide, slow moves — at this scale a fast
  // one reads as a glitch rather than as camera work.
  const scale = useTransform(smooth, [0, 0.5, 1], [1.14, 1.0, 1.08]);
  const y = useTransform(smooth, [0, 1], ["5%", "-5%"]);

  // Held back at the extremes so the figure is never caught half-lit at the
  // band's edges, where the core has already faded toward the canvas.
  const opacity = useTransform(smooth, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // The copy drifts against the figure, gently and in the opposite
  // direction. One extra transform on one node buys the parallax depth that
  // makes the two columns read as separate planes rather than one flat card,
  // and it is deliberately a third of the figure's travel — matching them
  // would just look like the whole section was sliding.
  const copyY = useTransform(smooth, [0, 1], ["-2%", "2%"]);

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[100vh] w-full items-center overflow-hidden py-24"
      style={{ ["--accent" as string]: "oklch(0.78 0.15 277)" }}
    >
      {/*
        The band's own ground, eased rather than linear. A straight two-stop
        ramp spends most of its length in the mid-greys, which on light paper
        reads as a dirty grey bar; the extra stops front-load the darkening so
        the band commits to black quickly and the transition is felt as a fade
        instead of seen as a gradient.
      */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(to bottom," +
            " var(--background) 0%," +
            " color-mix(in oklab, var(--background) 55%, #06070b) 9%," +
            " color-mix(in oklab, var(--background) 18%, #06070b) 18%," +
            " #06070b 27%," +
            " #06070b 73%," +
            " color-mix(in oklab, var(--background) 18%, #06070b) 82%," +
            " color-mix(in oklab, var(--background) 55%, #06070b) 91%," +
            " var(--background) 100%)",
        }}
      />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-6 md:grid-cols-12 md:gap-6">
        {/* ── The figure ── */}
        <div className="md:col-span-5">
          <motion.img
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading="lazy"
            decoding="async"
            draggable={false}
            style={{
              ...(reduce ? {} : { scale, y, opacity }),
              mixBlendMode: "screen",
              /*
                The backdrop in these files is near-black, not black — around
                #0a0a0a. Screen keeps only what is brighter than the ground, so
                those few levels survive as a faint lit rectangle. Crushing the
                shadows takes the backdrop to true black, where screen drops it
                entirely, and the extra contrast is what the rim light on the
                face wants anyway.
              */
              filter: "brightness(0.96) contrast(1.2)",
              /*
                The crush handles the flat backdrop; this handles the corners,
                where the studio falloff is uneven enough to still register an
                edge, and carries the figure's lower body out into the band
                rather than ending it on a crop line.
              */
              WebkitMaskImage:
                "radial-gradient(76% 72% at 50% 42%, #000 46%, transparent 90%)",
              maskImage:
                "radial-gradient(76% 72% at 50% 42%, #000 46%, transparent 90%)",
            }}
            /* Pulled left of its column on wide screens so the figure reads as
               entering the band rather than sitting politely inside a grid
               cell. It stays centred once the layout stacks. */
            className="mx-auto h-[46vh] w-auto object-contain md:mx-0 md:h-[74vh] md:max-w-none lg:-ml-[14%]"
          />
        </div>

        {/* ── The addressed copy ── */}
        <motion.div className="md:col-span-7" style={reduce ? undefined : { y: copyY }}>
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-18%" }}
            transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
          >
            <p className="flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.28em] text-white/40">
              <span className="h-px w-6 bg-white/20" />
              Where I fit
            </p>

            <h2 className="mt-6 max-w-lg font-display text-4xl leading-[1.08] tracking-tight text-white md:text-5xl">
              Anyone can get a model to answer. Getting it{" "}
              <em className="italic text-accent">right</em>, every time, is the job.
            </h2>
          </motion.div>

          <ul className="mt-12 max-w-2xl border-t border-white/10">
            {AUDIENCES.map((a, i) => (
              <motion.li
                key={a.who}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-12%" }}
                transition={{
                  duration: 0.7,
                  ease: EASE_OUT_EXPO,
                  delay: 0.15 + i * 0.1,
                }}
                className="group/row relative border-b border-white/10"
              >
                {/*
                  The hover state. Everything here animates `transform` or a
                  colour and nothing animates layout, so the whole row stays
                  on the compositor — no reflow, no React render on hover, and
                  no JS listener per row.

                  The sweep sits on the <li> rather than inside the link so it
                  spans the full row width and is not carried along by the
                  link's nudge.
                */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-accent transition-transform duration-600 ease-out-quint group-hover/row:scale-x-100"
                />

                {/* The entire row is the link. Highlighting a row on hover
                    while only a corner of it was clickable was a false
                    affordance — and a recruiter scanning three rows should be
                    able to hit any part of one. */}
                <RowLink a={a} />
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Grain, so the band sits on the same surface as the rest of the site
          rather than looking like a cleaner layer pasted over it. */}
      <div aria-hidden className="noise pointer-events-none absolute inset-0" />
    </section>
  );
});
