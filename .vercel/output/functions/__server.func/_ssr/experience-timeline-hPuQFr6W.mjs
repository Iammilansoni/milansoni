import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { A as AmbientBlobs, R as Reveal, E as EXPERIENCE } from "./router-DBSTBaOm.mjs";
import { u as useScroll, c as useTransform, m as motion } from "../_libs/framer-motion.mjs";
function ExperienceTimeline() {
  const containerRef = reactExports.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden py-32", ref: containerRef, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AmbientBlobs,
      {
        colors: ["oklch(0.72 0.18 200)", "oklch(0.70 0.28 295)"],
        opacity: 0.4
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 mx-auto max-w-7xl px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs uppercase tracking-widest text-muted-foreground", children: "Experience" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-3 font-display text-5xl md:text-7xl max-w-3xl leading-[0.9]", children: [
          "Shipping inside ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", { className: "hidden md:block" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-aurora", children: "real engineering teams." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-32 relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-[15px] md:left-1/2 top-0 bottom-0 w-px bg-hairline md:-translate-x-1/2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "absolute left-[15px] md:left-1/2 top-0 w-px md:-translate-x-1/2 bg-linear-to-b from-aurora-1 via-aurora-2 to-aurora-3 shadow-[0_0_15px_rgba(255,255,255,0.8)] z-10",
            style: { height: lineHeight }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-24", children: EXPERIENCE.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { delay: i * 0.1, className: `relative md:grid md:grid-cols-2 md:gap-16 items-center ${i % 2 ? "md:[&>div:first-child]:order-2" : ""}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute left-[15px] md:left-1/2 top-0 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-20 flex items-center justify-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-4 rounded-full bg-background border-2 border-aurora-1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                className: "absolute inset-0 rounded-full bg-aurora-2 blur-md",
                animate: { scale: [1, 1.5, 1], opacity: [0.5, 0.8, 0.5] },
                transition: { duration: 2, repeat: Infinity }
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pl-12 md:pl-0 md:pr-16 md:text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs uppercase tracking-widest text-aurora-1", children: e.period }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-3 font-display text-3xl md:text-4xl", children: e.company }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-base text-muted-foreground", children: e.role }),
            "location" in e && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 font-mono text-xs text-muted-foreground/60", children: e.location })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pl-12 md:pl-16 mt-6 md:mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass rounded-4xl p-8 space-y-4 hover:bg-secondary/40 transition duration-500", children: e.highlights.map((h, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-2 h-1.5 w-1.5 rounded-full bg-aurora-2 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm leading-relaxed", children: h })
          ] }, idx)) }) })
        ] }, e.company)) })
      ] })
    ] })
  ] });
}
export {
  ExperienceTimeline as E
};
