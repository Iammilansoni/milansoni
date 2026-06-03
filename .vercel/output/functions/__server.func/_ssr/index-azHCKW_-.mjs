import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { M as Magnetic, T as TextRoll, A as AmbientBlobs, R as Reveal, P as PROJECTS } from "./router-DBSTBaOm.mjs";
import { C as Canvas, u as useFrame } from "../_libs/react-three__fiber.mjs";
import { E as ExperienceTimeline } from "./experience-timeline-hPuQFr6W.mjs";
import { S as SiPython, a as SiFastapi, b as SiNodedotjs, c as SiExpress, d as SiLangchain, e as SiRedis, f as SiPostgresql, g as SiMongodb, h as SiPrisma, i as SiReact, j as SiNextdotjs, k as SiTypescript, l as SiJavascript, m as SiCplusplus, n as SiTailwindcss, o as SiRedux, p as SiGraphql, F as FaAws, q as SiDocker, r as SiVercel, s as SiLinux } from "../_libs/react-icons.mjs";
import "../_libs/seroval.mjs";
import { u as useScroll, c as useTransform, d as useMotionValue, a as useSpring, e as useMotionTemplate, m as motion } from "../_libs/framer-motion.mjs";
import { c as ArrowRight, D as Download, A as ArrowUpRight, d as Brain, g as Globe, h as Database, i as Layers, N as Network, j as Star, k as Award, B as BookOpen, U as Users, l as DatabaseZap, C as Cpu, m as GitMerge, n as FileBraces } from "../_libs/lucide-react.mjs";
import { P as Points, a as PointMaterial } from "../_libs/react-three__drei.mjs";
import { m as AdditiveBlending } from "../_libs/three.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/cmdk.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "./server-DNXF0cKP.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
import "../_libs/zustand.mjs";
import "../_libs/use-sync-external-store.mjs";
import "../_libs/scheduler.mjs";
import "../_libs/its-fine.mjs";
import "../_libs/react-use-measure.mjs";
import "../_libs/babel__runtime.mjs";
function NeuralNetwork({ count = 2e3 }) {
  const ref = reactExports.useRef(null);
  const positions = reactExports.useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.5 * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      p[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      p[i * 3 + 2] = r * Math.cos(phi);
    }
    return p;
  }, [count]);
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
      const targetX = state.pointer.x * Math.PI / 4;
      const targetY = state.pointer.y * Math.PI / 4;
      ref.current.rotation.x += 0.05 * (targetY - ref.current.rotation.x);
      ref.current.rotation.y += 0.05 * (targetX - ref.current.rotation.y);
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("group", { rotation: [0, 0, Math.PI / 4], children: /* @__PURE__ */ jsxRuntimeExports.jsx(Points, { ref, positions, stride: 3, frustumCulled: false, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    PointMaterial,
    {
      transparent: true,
      color: "#b088f5",
      size: 0.015,
      sizeAttenuation: true,
      depthWrite: false,
      blending: AdditiveBlending
    }
  ) }) });
}
function WebGLBackground() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 z-[-1] opacity-60 mix-blend-screen pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Canvas, { camera: { position: [0, 0, 4], fov: 50 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(NeuralNetwork, {}) }) });
}
function Hero() {
  const containerRef = reactExports.useRef(null);
  const [isHovered, setIsHovered] = reactExports.useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const maskSize = isHovered ? 400 : 40;
  const smoothSize = useSpring(maskSize, { stiffness: 100, damping: 20 });
  const maskImage = useMotionTemplate`radial-gradient(${smoothSize}px circle at ${smoothX}px ${smoothY}px, black 0%, transparent 100%)`;
  const handleMouseMove = (e) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.section,
    {
      ref: containerRef,
      style: { opacity, scale },
      onMouseMove: handleMouseMove,
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false),
      className: "relative min-h-[calc(100vh-6rem)] flex flex-col items-center justify-center overflow-hidden bg-background cursor-default",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 noise opacity-20 z-0 pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(WebGLBackground, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { style: { y }, className: "relative z-10 w-full flex flex-col items-center justify-center px-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 1, delay: 0.2 },
              className: "mb-8 flex items-center gap-2 rounded-full border border-aurora-1/20 bg-aurora-1/5 px-4 py-1.5 text-xs font-mono text-aurora-1 backdrop-blur-sm pointer-events-none",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative flex h-2 w-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-aurora-1 opacity-75" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative inline-flex h-2 w-2 rounded-full bg-aurora-1" })
                ] }),
                "AVAILABLE FOR 2026 ROLES"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.h1,
            {
              initial: { opacity: 0, scale: 0.95 },
              animate: { opacity: 1, scale: 1 },
              transition: { duration: 1.2, delay: 0.4, ease: "circOut" },
              className: "font-display text-[15vw] leading-[0.8] tracking-tighter text-white/40 pointer-events-none",
              children: "MILAN SONI"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { duration: 1, delay: 0.8 },
              className: "mt-6 flex flex-col items-center gap-3 pointer-events-none w-full max-w-2xl px-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm font-mono text-muted-foreground/60 tracking-widest text-center whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md shadow-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/30 mr-2", children: "[01]" }),
                  " AI ENGINEER · FULL STACK"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground/40 text-center text-lg md:text-xl leading-relaxed", children: [
                  "Engineering ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "font-display italic text-3xl md:text-4xl pr-1 tracking-wide", children: "intelligent" }),
                  " systems, deterministic ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "font-display italic text-3xl md:text-4xl pr-1 tracking-wide", children: "agentic workflows" }),
                  ", and highly scalable architectures."
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none px-4",
            style: {
              y,
              maskImage,
              WebkitMaskImage: maskImage
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-linear-to-br from-aurora-1 via-aurora-2 to-aurora-3 opacity-20" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 flex items-center gap-2 rounded-full border border-transparent px-4 py-1.5 text-xs font-mono opacity-0 pointer-events-none", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2" }),
                "AVAILABLE FOR 2026 ROLES"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-[15vw] leading-[0.8] tracking-tighter text-foreground text-gradient mix-blend-plus-lighter", children: "MILAN SONI" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-col items-center gap-3 w-full max-w-2xl px-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm font-mono text-aurora-2 font-bold drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] tracking-widest text-center whitespace-nowrap rounded-full border border-transparent px-4 py-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-aurora-1/50 mr-2", children: "[01]" }),
                  " AI ENGINEER · FULL STACK"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-aurora-1 text-center text-lg md:text-xl leading-relaxed font-medium drop-shadow-[0_0_10px_rgba(var(--aurora-1),0.8)]", children: [
                  "Engineering ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "font-display italic text-3xl md:text-4xl pr-1 tracking-wide text-white", children: "intelligent" }),
                  " systems, deterministic ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "font-display italic text-3xl md:text-4xl pr-1 tracking-wide text-white", children: "agentic workflows" }),
                  ", and highly scalable architectures."
                ] })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 1, duration: 1 },
            className: "absolute bottom-8 md:bottom-24 z-30 flex flex-wrap items-center justify-center gap-6",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Magnetic, { strength: 20, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: "/work",
                  className: "group inline-flex items-center gap-3 rounded-full bg-foreground px-8 py-4 text-sm font-medium text-background transition hover:bg-aurora-1 hover:text-white",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TextRoll, { text: "Explore my work" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-1" })
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Magnetic, { strength: 20, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: "/resume.pdf",
                  className: "inline-flex items-center gap-3 rounded-full glass px-8 py-4 text-sm font-medium hover:bg-secondary transition border border-hairline",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }),
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TextRoll, { text: "Résumé" })
                  ]
                }
              ) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { delay: 1.2, duration: 1 },
            className: "absolute bottom-6 left-0 right-0 z-30 hidden md:flex items-center justify-between px-12 pointer-events-none",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-12 pointer-events-auto", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "https://www.sih.gov.in/sih2023-grand-finale-result", target: "_blank", rel: "noreferrer", className: "flex flex-col group hover:opacity-80 transition-opacity", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-2xl text-aurora-1 group-hover:text-aurora-2 transition-colors flex items-center gap-2", children: [
                  "Top 1% ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: "SIH 2023 National Winner" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px h-10 bg-hairline" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "https://drive.google.com/file/d/11DTgnEqtFGIB-PpX-SKyheMCue5xRe-_/view?usp=sharing", target: "_blank", rel: "noreferrer", className: "flex flex-col group hover:opacity-80 transition-opacity", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-2xl text-foreground group-hover:text-aurora-2 transition-colors flex items-center gap-2", children: [
                  "PICET-26 ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: "Scopus Indexed Paper" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px h-10 bg-hairline" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-2xl text-foreground", children: "8.10" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: "CGPA · B.Tech CSE" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px h-10 bg-hairline" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-2xl text-foreground", children: "3+" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: "Enterprise Internships" })
              ] })
            ] })
          }
        )
      ]
    }
  );
}
function FeaturedProjects() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6 py-28", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs uppercase tracking-widest text-muted-foreground", children: "Selected work · 2023 — 2025" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-3 font-display text-4xl md:text-6xl max-w-3xl", children: [
        "Production-grade systems, ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-aurora", children: "not class projects." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-24 space-y-24 pb-24", children: PROJECTS.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProjectCard, { p, index: i, total: PROJECTS.length }, p.slug)) })
  ] }) });
}
function ProjectCard({ p, index, total }) {
  const containerRef = reactExports.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"]
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.5, 1]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      ref: containerRef,
      style: {
        position: "sticky",
        top: "15vh",
        zIndex: index
      },
      className: "origin-top",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { style: { scale, opacity }, className: "origin-top", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/work/$slug",
          params: { slug: p.slug },
          className: "group block bg-background rounded-[3rem] p-8 md:p-12 transition relative overflow-hidden shadow-[0_-20px_40px_rgba(0,0,0,0.4)] border border-hairline/50",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-secondary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "pointer-events-none absolute -top-32 -right-32 h-120 w-120 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-1000 z-0",
                style: { background: "radial-gradient(closest-side, var(--aurora-1), transparent 70%)" }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-12 gap-12 relative z-10", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-7 flex flex-col justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center gap-2 text-xs font-mono text-aurora-2 border border-aurora-2/30 rounded-full bg-aurora-2/10 px-3 py-1 mb-6", children: p.tag }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-4xl md:text-6xl mb-4 group-hover:text-aurora transition-colors", children: p.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg leading-relaxed max-w-xl", children: p.blurb })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 flex flex-wrap gap-2", children: p.tech.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-mono px-3 py-1.5 rounded-md bg-background/50 border border-hairline text-muted-foreground", children: t }, t)) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-5 grid grid-cols-2 gap-4 content-start pt-6", children: [
                p.metrics.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-background/30 border border-hairline/50 p-6 flex flex-col justify-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-3xl text-gradient mb-2", children: m.value }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-muted-foreground leading-tight", children: m.label })
                ] }, m.label)),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 mt-4 flex items-center justify-end text-sm font-medium text-foreground group-hover:text-aurora-1 transition-colors", children: [
                  "Read case study ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" })
                ] })
              ] })
            ] })
          ]
        }
      ) })
    }
  );
}
function Tilt({ children, className }) {
  const ref = reactExports.useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);
  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      ref,
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
      style: {
        rotateX,
        rotateY,
        transformStyle: "preserve-3d"
      },
      className,
      children
    }
  );
}
function Education() {
  const coursework = [
    "Data Structures & Algorithms",
    "Artificial Intelligence",
    "Database Management Systems",
    "Operating Systems",
    "Computer Networks",
    "Object-Oriented Programming"
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative py-28 overflow-hidden bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 aurora-bg opacity-30 mix-blend-screen pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-7xl px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs uppercase tracking-widest text-muted-foreground", children: "Foundation" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-3 font-display text-4xl md:text-6xl max-w-3xl", children: [
          "Education & ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-aurora", children: "Credentials." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-16 grid grid-cols-1 md:grid-cols-12 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tilt, { className: "md:col-span-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-4xl p-8 md:p-12 h-full flex flex-col relative overflow-hidden group hover:bg-secondary/20 transition duration-700 border border-aurora-1/10 hover:border-aurora-1/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -right-20 -top-20 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-1000 pointer-events-none group-hover:scale-105 transform origin-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Network, { className: "w-[500px] h-[500px] text-aurora-1" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col h-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 text-xs font-mono text-aurora-1 mb-6 border border-aurora-1/20 bg-aurora-1/10 rounded-full px-3 py-1 w-max", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3 h-3 fill-aurora-1 text-aurora-1" }),
              "B.Tech Computer Science"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-4xl md:text-5xl mb-2 text-foreground max-w-lg", children: "Global Institute of Technology" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg mb-8", children: "Jaipur, Rajasthan · Oct 2022 – May 2026" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-12", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4", children: "Core Coursework" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 max-w-xl", children: coursework.map((course) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-4 py-2 rounded-full border border-hairline bg-background/50 text-xs font-medium text-foreground hover:border-aurora-1/50 transition-colors cursor-default", children: course }, course)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto grid grid-cols-2 gap-4 border-t border-hairline pt-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-4xl text-aurora", children: "8.10" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-muted-foreground mt-1", children: "Cumulative GPA" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-4xl text-gradient", children: "2026" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-muted-foreground mt-1", children: "Graduation Year" })
              ] })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-4 flex flex-col gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tilt, { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-4xl p-8 h-full flex flex-col justify-center relative overflow-hidden group hover:bg-secondary/40 transition duration-500", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-8 h-8 text-aurora-2 mb-4 group-hover:scale-110 transition-transform duration-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display text-2xl text-foreground mb-2", children: "NASSCOM Certified" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "Full Stack Developer certification by IT-ITeS Sector Skills Council (2024)." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-aurora-2 border-t border-hairline pt-3 mt-auto", children: "Industry Credential" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tilt, { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-4xl p-8 h-full flex flex-col justify-center relative overflow-hidden group hover:bg-secondary/40 transition duration-500", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-8 h-8 text-aurora-3 mb-4 group-hover:scale-110 transition-transform duration-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display text-2xl text-foreground mb-2", children: "Hackathon Organizer" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "CodeFiesta (2023–2025). Managed logistics, scaling, and technical operations." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-aurora-3 border-t border-hairline pt-3 mt-auto", children: "Community Leadership" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tilt, { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-4xl p-8 h-full flex flex-col justify-center relative overflow-hidden group hover:bg-secondary/40 transition duration-500", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-8 h-8 text-aurora-1 mb-4 group-hover:scale-110 transition-transform duration-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display text-2xl text-foreground mb-2", children: "Academic Leadership" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "Class Representative (2 yrs) and volunteer programming tutor for junior students." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-widest text-aurora-1 border-t border-hairline pt-3 mt-auto", children: "Mentorship & Impact" })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 grid grid-cols-1 gap-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Tilt, { className: "w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-4xl p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden group hover:bg-secondary/20 transition duration-700 border border-aurora-1/20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-linear-to-r from-aurora-1/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-center gap-6 relative z-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 rounded-2xl border border-aurora-1/20 bg-background/50 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-8 h-8 text-aurora-1" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center gap-2 text-[10px] font-mono text-aurora-1 mb-2 uppercase tracking-widest", children: "🥇 First Place Winner · Jigyasa Event" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display text-2xl md:text-3xl text-foreground mb-2", children: "Blockchain Technology Presentation" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-2xl leading-relaxed", children: "Awarded first place at GIT Jaipur for presenting advanced architectural insights into Blockchain technology, smart contracts, and decentralized systems." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 shrink-0 w-full md:w-auto mt-4 md:mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "https://www.linkedin.com/in/sonimilan/overlay/1720793634608/single-media-viewer/?profileId=ACoAAD8piA8BZ-BgPuiIf8eBWQ8P0fjWXPcdZbw", target: "_blank", rel: "noreferrer", className: "inline-flex items-center justify-center w-full md:w-auto gap-2 text-sm font-medium px-6 py-3 rounded-full bg-foreground text-background hover:bg-aurora-1 hover:text-white transition-colors", children: [
          "View Presentation ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-4 w-4" })
        ] }) })
      ] }) }) })
    ] })
  ] });
}
const ROW_1 = [
  { name: "Python", icon: SiPython },
  { name: "FastAPI", icon: SiFastapi },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "Express.js", icon: SiExpress },
  { name: "LangChain", icon: SiLangchain },
  { name: "LangGraph", icon: Network },
  { name: "LLMs", icon: Brain },
  { name: "RAG Pipelines", icon: Layers },
  { name: "Vector Embeddings", icon: DatabaseZap },
  { name: "FAISS", icon: Cpu },
  { name: "Redis Vector DB", icon: SiRedis },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "MongoDB", icon: SiMongodb },
  { name: "Prisma ORM", icon: SiPrisma }
];
const ROW_2 = [
  { name: "React.js", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "TypeScript", icon: SiTypescript },
  { name: "JavaScript (ES6+)", icon: SiJavascript },
  { name: "C++", icon: SiCplusplus },
  { name: "Tailwind CSS", icon: SiTailwindcss },
  { name: "Redux", icon: SiRedux },
  { name: "GraphQL", icon: SiGraphql },
  { name: "AWS (EC2, S3, Lambda)", icon: FaAws },
  { name: "Docker", icon: SiDocker },
  { name: "CI/CD", icon: GitMerge },
  { name: "Vercel", icon: SiVercel },
  { name: "Linux", icon: SiLinux },
  { name: "REST APIs", icon: FileBraces }
];
function TechMarquee() {
  const row1 = [...ROW_1, ...ROW_1, ...ROW_1];
  const row2 = [...ROW_2, ...ROW_2, ...ROW_2];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden py-24 bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-7xl px-6 mb-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs uppercase tracking-widest text-muted-foreground text-center", children: "Tooling Ecosystem" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "relative flex flex-col gap-6 overflow-hidden",
        style: {
          maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              className: "flex gap-4 w-max",
              animate: { x: ["0%", "-33.33%"] },
              transition: {
                repeat: Infinity,
                ease: "linear",
                duration: 40
              },
              children: row1.map((tech, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center gap-2.5 px-6 py-3 rounded-full glass border border-hairline whitespace-nowrap text-sm font-mono text-muted-foreground hover:text-aurora-2 hover:border-aurora-2/30 hover:bg-secondary/40 transition-colors duration-300",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(tech.icon, { className: "h-4 w-4" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: tech.name })
                  ]
                },
                i
              ))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              className: "flex gap-4 w-max",
              animate: { x: ["-33.33%", "0%"] },
              transition: {
                repeat: Infinity,
                ease: "linear",
                duration: 35
              },
              children: row2.map((tech, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center gap-2.5 px-6 py-3 rounded-full glass border border-hairline whitespace-nowrap text-sm font-mono text-muted-foreground hover:text-aurora-1 hover:border-aurora-1/30 hover:bg-secondary/40 transition-colors duration-300",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(tech.icon, { className: "h-4 w-4" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: tech.name })
                  ]
                },
                i
              ))
            }
          )
        ]
      }
    )
  ] });
}
const CAPABILITIES = [
  {
    icon: Brain,
    area: "AI / LLM Engineering",
    summary: "Production RAG pipelines, agentic orchestration, evaluation harnesses, and observability.",
    signals: ["LangChain", "LangGraph", "FAISS", "Redis Vector DB", "RAG", "Prompt Engineering"],
    depth: 95
  },
  {
    icon: Globe,
    area: "Full Stack (MERN + Next.js)",
    summary: "End-to-end web apps with server-side rendering, REST & GraphQL APIs, and enterprise auth.",
    signals: ["Next.js", "React", "Node.js", "FastAPI", "TypeScript", "JWT + RBAC"],
    depth: 92
  },
  {
    icon: Database,
    area: "Data & Infrastructure",
    summary: "Multi-tenant databases, vector stores, Docker microservices, and CI/CD pipelines.",
    signals: ["MongoDB", "PostgreSQL", "Redis", "Docker", "AWS (EC2, S3, Lambda)", "CI/CD"],
    depth: 85
  },
  {
    icon: Layers,
    area: "Systems Thinking",
    summary: "Algorithm design in C++, scalable backend architecture, and cross-team delivery.",
    signals: ["C++", "Graph Algorithms", "System Design", "Microservices", "Agile/Scrum"],
    depth: 88
  }
];
const PROOF_POINTS = [
  {
    kicker: "🏆 SIH 2023",
    headline: "National Winner",
    sub: "Top 1% of 44,000+ teams",
    detail: "Built a production-grade AI document intelligence platform for the Ministry of Coal in a 48-hr sprint.",
    accent: "aurora-1",
    links: [
      { label: "Official Results", href: "https://www.sih.gov.in/sih2023-grand-finale-result" },
      { label: "GitHub Repo", href: "https://github.com/Iammilansoni/MiningNiti" }
    ]
  },
  {
    kicker: "📄 Scopus Indexed",
    headline: "PICET-2026",
    sub: "IET Conference Proceedings",
    detail: "Peer-reviewed research on hybrid attention-based temporal modeling for LMS dropout prediction.",
    accent: "aurora-2",
    links: [
      { label: "Read Paper", href: "https://drive.google.com/file/d/11DTgnEqtFGIB-PpX-SKyheMCue5xRe-_/view?usp=sharing" },
      { label: "Certificate", href: "https://drive.google.com/file/d/1TbxYA73JiKCRnVgqTIqLMfLdVtKWDX_l/view?usp=sharing" },
      { label: "Track 3: ID 759", href: "https://picet.in/" }
    ]
  }
];
function BentoGrid() {
  const containerRef = reactExports.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const y2 = useTransform(scrollYProgress, [0, 1], [30, -30]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { ref: containerRef, className: "relative overflow-hidden py-32", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AmbientBlobs, { colors: ["oklch(0.70 0.28 295)", "oklch(0.72 0.18 200)"], opacity: 0.45 }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 mx-auto max-w-7xl px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-xs uppercase tracking-widest text-aurora-2 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/40", children: "[02]" }),
          " Capability Matrix"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-4 font-display text-5xl md:text-7xl max-w-4xl leading-[0.9]", children: [
          "What I build,",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "italic text-aurora", children: "and how deep" }),
          " ",
          "I go."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-muted-foreground max-w-2xl text-base md:text-lg leading-relaxed", children: "Three internships, one national win, one Scopus-indexed publication. Here is the technical breadth behind those results." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { style: { y: y1 }, className: "mt-16 space-y-3", children: CAPABILITIES.map((cap, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: i * 0.07, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Tilt, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group glass rounded-3xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-secondary/20 transition-all duration-500 relative overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-linear-to-r from-aurora-1/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 md:w-1/4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-2xl bg-aurora-1/10 flex items-center justify-center text-aurora-1 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(cap.icon, { className: "h-6 w-6" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl", children: cap.area }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:w-1/2 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: cap.summary }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: cap.signals.map((sig) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] px-2 py-1 rounded border border-hairline bg-background/50 text-muted-foreground", children: sig }, sig)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:w-32 shrink-0 flex flex-col gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] text-muted-foreground uppercase tracking-widest", children: "Depth" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[11px] text-aurora-1", children: [
              cap.depth,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 rounded-full bg-secondary overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              className: "h-full rounded-full bg-linear-to-r from-aurora-1 to-aurora-2",
              initial: { width: 0 },
              whileInView: { width: `${cap.depth}%` },
              viewport: { once: true },
              transition: { duration: 1.2, delay: i * 0.1, ease: "easeOut" }
            }
          ) })
        ] })
      ] }) }) }, cap.area)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { style: { y: y2 }, className: "mt-20 grid grid-cols-1 md:grid-cols-12 gap-4", children: [
        PROOF_POINTS.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: i * 0.1, className: "md:col-span-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Tilt, { className: "h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-3xl p-6 h-full flex flex-col gap-4 group hover:bg-secondary/20 transition-all duration-500 relative overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-linear-to-br from-aurora-1/8 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[10px] uppercase tracking-widest text-aurora-2", children: p.kicker }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-3xl", children: p.headline }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-xs text-aurora-1 mt-1", children: p.sub })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed mt-auto", children: p.detail }),
          p.links && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mt-4 relative z-20", children: p.links.map((link) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: link.href,
              target: "_blank",
              rel: "noreferrer",
              className: "inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full bg-background border border-hairline hover:bg-aurora-1 hover:text-white hover:border-aurora-1 transition-all",
              children: [
                link.label,
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-3 w-3" })
              ]
            },
            link.label
          )) })
        ] }) }) }, p.headline)),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { className: "md:col-span-4", delay: 0.2, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Tilt, { className: "h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-3xl p-6 md:p-8 h-full flex flex-col justify-between relative overflow-hidden group border border-aurora-1/10 hover:border-aurora-1/25 transition-all duration-500", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-linear-to-br from-aurora-1/10 to-aurora-3/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 w-max rounded-full border border-aurora-1/20 bg-aurora-1/5 px-3 py-1.5 relative z-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative flex h-2 w-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-aurora-1 opacity-75" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative inline-flex h-2 w-2 rounded-full bg-aurora-1" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] uppercase tracking-widest text-aurora-1", children: "Open to 2026 Roles" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 mt-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display text-4xl leading-tight", children: [
              "Full Stack",
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-aurora", children: "& GenAI" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              "Engineer"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center gap-3 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs px-2.5 py-1 rounded-full border border-aurora-1/20 bg-aurora-1/10 text-aurora-1", children: "8.10 CGPA" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs px-2.5 py-1 rounded-full border border-hairline bg-background/50 text-muted-foreground", children: "SDE / AI / GenAI Roles" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: "/contact",
              className: "relative z-10 mt-6 inline-flex items-center gap-2 text-sm font-medium text-foreground group-hover:text-aurora-1 transition-colors",
              children: [
                "Let's talk ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" })
              ]
            }
          )
        ] }) }) })
      ] })
    ] })
  ] });
}
const QUOTES = [
  { quote: "Milan ships at the level of a senior engineer. He understands both the product and the model.", name: "Engineering Lead", role: "nTheta Works" },
  { quote: "Rare combination of full-stack craft and applied AI judgement. He'd be a force in any startup.", name: "Mentor", role: "Industry Reviewer" },
  { quote: "Took a vague problem and shipped a usable, production-grade AI system inside a week.", name: "Project Sponsor", role: "OBG Outsourcing" }
];
function Testimonials() {
  const items = [...QUOTES, ...QUOTES, ...QUOTES, ...QUOTES];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden py-28", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AmbientBlobs,
      {
        colors: ["oklch(0.75 0.22 285)", "oklch(0.78 0.22 170)"],
        opacity: 0.4
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 mx-auto max-w-7xl px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs uppercase tracking-widest text-muted-foreground", children: "Signals" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 font-display text-4xl md:text-6xl max-w-3xl", children: "What people say." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "mt-16 flex overflow-hidden relative",
        style: { maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "flex gap-6 pr-6 w-max",
            animate: { x: ["0%", "-25%"] },
            transition: {
              repeat: Infinity,
              ease: "linear",
              duration: 35
            },
            children: items.map((q, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-[320px] md:w-[480px] shrink-0 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Tilt, { className: "block h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("figure", { className: "glass rounded-4xl p-8 md:p-10 h-full flex flex-col group relative overflow-hidden transition-all duration-700 hover:shadow-[0_0_40px_-10px_rgba(var(--aurora-1),0.3)] hover:border-aurora-1/30 hover:bg-secondary/20", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -inset-24 bg-linear-to-br from-aurora-1/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl pointer-events-none" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("blockquote", { className: "font-display text-2xl md:text-3xl leading-snug relative z-10 group-hover:text-white transition-colors duration-500", children: [
                '"',
                q.quote,
                '"'
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("figcaption", { className: "pt-6 border-t border-hairline mt-auto relative z-10 group-hover:border-aurora-1/20 transition-colors duration-500", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-base font-medium text-foreground group-hover:text-aurora-2 transition-colors duration-500", children: q.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: q.role })
              ] })
            ] }) }) }, i))
          }
        )
      }
    )
  ] });
}
function CTASection() {
  const containerRef = reactExports.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const y = useTransform(scrollYProgress, [0, 1], ["20%", "0%"]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { ref: containerRef, className: "relative min-h-[90vh] flex items-center justify-center overflow-hidden py-32 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      style: { scale, y },
      className: "w-full mx-auto max-w-7xl px-6 relative",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-aurora-1/20 to-transparent blur-3xl opacity-50 rounded-[4rem] -z-10" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-[3rem] p-12 md:p-24 text-center overflow-hidden border border-hairline/50 relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 aurora-bg opacity-30 mix-blend-screen" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col items-center justify-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-sm uppercase tracking-[0.3em] text-aurora-2 mb-8", children: "Open to Opportunities" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-[10vw] md:text-[8vw] leading-[0.8] tracking-tighter text-gradient pb-6", children: "LET'S TALK" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-8 max-w-xl text-lg md:text-xl text-muted-foreground leading-relaxed", children: "Looking for someone to ship product end-to-end? From foundational GenAI features to scalable full-stack applications." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Magnetic, { strength: 30, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", className: "relative inline-flex items-center justify-center rounded-full bg-foreground text-background px-12 py-6 text-xl font-medium transition duration-500 hover:scale-105 hover:bg-aurora-1 hover:text-white shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(var(--aurora-1),0.5)]", children: "Start a conversation" }) }) })
          ] })
        ] })
      ]
    }
  ) });
}
function Index() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Hero, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BentoGrid, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FeaturedProjects, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ExperienceTimeline, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Education, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TechMarquee, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Testimonials, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CTASection, {})
  ] });
}
export {
  Index as component
};
