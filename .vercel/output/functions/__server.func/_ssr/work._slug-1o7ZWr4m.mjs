import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as Route$1, R as Reveal, M as Magnetic, c as cn } from "./router-DBSTBaOm.mjs";
import { u as useNodesState, a as useEdgesState, i as index, B as Background, H as Handle } from "../_libs/xyflow__react.mjs";
import { S as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import "../_libs/seroval.mjs";
import { o as ArrowLeft, G as Github, E as ExternalLink, p as Play, g as Globe, q as Server, C as Cpu, h as Database, i as Layers, e as Bot } from "../_libs/lucide-react.mjs";
import { P as Position } from "../_libs/xyflow__system.mjs";
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
import "../_libs/framer-motion.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
import "../_libs/classcat.mjs";
import "../_libs/zustand.mjs";
import "../_libs/use-sync-external-store.mjs";
import "../_libs/d3-zoom.mjs";
import "../_libs/d3-transition.mjs";
import "../_libs/d3-dispatch.mjs";
import "../_libs/d3-timer.mjs";
import "../_libs/d3-interpolate.mjs";
import "../_libs/d3-color.mjs";
import "../_libs/d3-selection.mjs";
import "../_libs/d3-ease.mjs";
import "../_libs/d3-drag.mjs";
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = reactExports.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
  }
);
Button.displayName = "Button";
const CustomNode = ({ data }) => {
  const Icon = data.icon;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `px-4 py-3 shadow-md rounded-xl bg-background/80 backdrop-blur-md border border-aurora-1/20 flex items-center gap-3 w-56 ${data.isActive ? "ring-2 ring-aurora-1 shadow-[0_0_30px_--theme(--color-aurora-1/40)]" : ""} transition-all duration-300`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Handle, { type: "target", position: Position.Top, className: "w-2 h-2 bg-aurora-1! border-0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `p-2 rounded-lg ${data.isActive ? "bg-aurora-1 text-white" : "bg-aurora-1/10 text-aurora-1"} transition-colors duration-300`, children: Icon && /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-bold text-foreground", children: data.label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground font-mono leading-tight", children: data.subLabel })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Handle, { type: "source", position: Position.Bottom, className: "w-2 h-2 bg-aurora-1! border-0" })
  ] });
};
const nodeTypes = {
  custom: CustomNode
};
const initialNodes = [
  { id: "frontend", type: "custom", position: { x: 350, y: 20 }, data: { label: "Frontend", subLabel: "Next.js 15 + shadcn", icon: Globe, isActive: false } },
  { id: "gateway", type: "custom", position: { x: 350, y: 120 }, data: { label: "API Gateway", subLabel: "FastAPI + JWT Auth", icon: Server, isActive: false } },
  { id: "orchestrator", type: "custom", position: { x: 350, y: 220 }, data: { label: "AI Agent Layer", subLabel: "4 Parallel Domain Agents", icon: Cpu, isActive: false } },
  { id: "db", type: "custom", position: { x: 50, y: 340 }, data: { label: "Vector Store", subLabel: "PostgreSQL + pgvector", icon: Database, isActive: false } },
  { id: "redis", type: "custom", position: { x: 350, y: 340 }, data: { label: "Task Queue", subLabel: "Redis + Celery", icon: Layers, isActive: false } },
  { id: "gemini", type: "custom", position: { x: 650, y: 340 }, data: { label: "LLM Engine", subLabel: "Gemini 2.0 Flash", icon: Bot, isActive: false } }
];
const edgeStyle = { stroke: "#ffffff", strokeWidth: 2, opacity: 0.2 };
const activeEdgeStyle = { stroke: "#a855f7", strokeWidth: 3, opacity: 1 };
const initialEdges = [
  { id: "e-front-gate", source: "frontend", target: "gateway", type: "smoothstep", animated: false, style: edgeStyle },
  { id: "e-gate-orch", source: "gateway", target: "orchestrator", type: "smoothstep", animated: false, style: edgeStyle },
  { id: "e-orch-db", source: "orchestrator", target: "db", type: "smoothstep", animated: false, style: edgeStyle },
  { id: "e-orch-redis", source: "orchestrator", target: "redis", type: "smoothstep", animated: false, style: edgeStyle },
  { id: "e-orch-gemini", source: "orchestrator", target: "gemini", type: "smoothstep", animated: false, style: edgeStyle }
];
function ArchitectureGraph() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isSimulating, setIsSimulating] = reactExports.useState(false);
  const [stepText, setStepText] = reactExports.useState("System idle. Ready for request.");
  const simulate = async () => {
    if (isSimulating) return;
    setIsSimulating(true);
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    const setNodeActive = (id, active) => {
      setNodes((nds) => nds.map((n) => n.id === id ? { ...n, data: { ...n.data, isActive: active } } : n));
    };
    const setEdgeActive = (id, active) => {
      setEdges((eds) => eds.map((e) => e.id === id ? { ...e, animated: active, style: active ? activeEdgeStyle : edgeStyle } : e));
    };
    setNodes(initialNodes);
    setEdges(initialEdges);
    setStepText("1. Client uploads document via Next.js frontend...");
    setNodeActive("frontend", true);
    await sleep(600);
    setEdgeActive("e-front-gate", true);
    await sleep(600);
    setNodeActive("frontend", false);
    setStepText("2. FastAPI Gateway authenticates JWT & routes to Orchestrator...");
    setNodeActive("gateway", true);
    setEdgeActive("e-front-gate", false);
    await sleep(800);
    setEdgeActive("e-gate-orch", true);
    await sleep(600);
    setNodeActive("gateway", false);
    setStepText("3. Orchestrator initializes Classifier, Safety, Entity, & Summarizer agents...");
    setNodeActive("orchestrator", true);
    setEdgeActive("e-gate-orch", false);
    await sleep(1e3);
    setStepText("4. Agents execute concurrently against Redis, pgvector & Gemini...");
    setEdgeActive("e-orch-db", true);
    setEdgeActive("e-orch-redis", true);
    setEdgeActive("e-orch-gemini", true);
    await sleep(600);
    setNodeActive("db", true);
    setNodeActive("redis", true);
    setNodeActive("gemini", true);
    await sleep(1800);
    setStepText("5. Results compiled and aggregated by Orchestrator...");
    setNodeActive("db", false);
    setNodeActive("redis", false);
    setNodeActive("gemini", false);
    setEdgeActive("e-orch-db", false);
    setEdgeActive("e-orch-redis", false);
    setEdgeActive("e-orch-gemini", false);
    await sleep(1e3);
    setStepText("6. Response streamed back through Gateway to Client.");
    setNodeActive("orchestrator", false);
    setNodeActive("gateway", true);
    setEdgeActive("e-gate-orch", true);
    await sleep(600);
    setNodeActive("gateway", false);
    setEdgeActive("e-gate-orch", false);
    setNodeActive("frontend", true);
    setEdgeActive("e-front-gate", true);
    await sleep(1e3);
    setStepText("Pipeline execution completed successfully.");
    setNodeActive("frontend", false);
    setEdgeActive("e-front-gate", false);
    setIsSimulating(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-3xl border border-hairline bg-background/50 shadow-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-aurora-1/5 via-transparent to-transparent pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 p-6 md:p-8 flex flex-col h-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs uppercase tracking-widest text-aurora-1 mb-2", children: "Interactive Node Graph" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl md:text-3xl text-foreground", children: "MiningNiti Multi-Agent Pipeline." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 bg-secondary/50 backdrop-blur border border-hairline rounded-full pl-6 pr-2 py-2 w-full md:w-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-muted-foreground mr-4 truncate max-w-[200px] md:max-w-xs", children: stepText }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: simulate,
              disabled: isSimulating,
              className: "rounded-full gap-2 shrink-0 h-9 px-4 text-xs",
              children: [
                isSimulating ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3 h-3 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-3 h-3" }),
                isSimulating ? "Simulating..." : "Simulate"
              ]
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-[500px] bg-black/40 border border-hairline rounded-2xl overflow-hidden backdrop-blur-sm relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        index,
        {
          nodes,
          edges,
          onNodesChange,
          onEdgesChange,
          nodeTypes,
          fitView: true,
          fitViewOptions: { padding: 0.2 },
          proOptions: { hideAttribution: true },
          className: "react-flow-glass",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Background, { color: "#ffffff", gap: 16, size: 1, opacity: 0.05 })
        }
      ) })
    ] })
  ] });
}
function CaseStudy() {
  const {
    project: p
  } = Route$1.useLoaderData();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aurora-bg opacity-50" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-4xl px-6 py-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/work", className: "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
        " All work"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-10 inline-block text-xs font-mono border border-hairline rounded-full px-3 py-1 text-muted-foreground", children: p.tag }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-5 font-display text-5xl md:text-7xl leading-none", children: p.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed", children: p.description }),
        (p.githubUrl || p.demoUrl) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-wrap items-center gap-4", children: [
          p.githubUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: p.githubUrl, target: "_blank", rel: "noreferrer", className: "inline-flex items-center gap-2 rounded-full border border-hairline bg-secondary/50 px-5 py-2.5 text-sm font-medium hover:bg-secondary transition", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Github, { className: "w-4 h-4" }),
            " View Source Code"
          ] }),
          p.demoUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: p.demoUrl, target: "_blank", rel: "noreferrer", className: "inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-2.5 text-sm font-medium hover:opacity-90 transition", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-4 h-4" }),
            " Visit Live Site"
          ] })
        ] }),
        p.heroImage && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-16 w-full rounded-3xl border border-hairline bg-black/40 p-2 shadow-2xl backdrop-blur-sm overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.heroImage, alt: `${p.name} UI`, className: "w-full rounded-2xl object-cover border border-hairline/50" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-24 grid lg:grid-cols-12 gap-16 lg:gap-24", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-8 space-y-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "The Problem", children: p.problem }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "The Solution", children: p.solution }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-3xl mb-8 flex items-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px flex-1 bg-hairline" }),
              "Architecture",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px flex-1 bg-hairline" })
            ] }),
            p.slug === "miningniti" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArchitectureGraph, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-4", children: p.architecture.map((a, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-5 glass rounded-2xl p-6 relative overflow-hidden group", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-linear-to-r from-aurora-1/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-aurora-1 pt-1.5", children: String(i + 1).padStart(2, "0") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground leading-relaxed relative", children: a })
            ] }, i)) }),
            p.tradeoffs && p.tradeoffs.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-16", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display text-2xl mb-6 flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-aurora-2" }),
                "Technical Trade-offs"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-4", children: p.tradeoffs.map((t, i) => {
                const [title, ...descParts] = t.split(":");
                return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "glass rounded-2xl p-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { className: "text-foreground block mb-2", children: [
                    title,
                    ":"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground leading-relaxed", children: descParts.join(":") })
                ] }, i);
              }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Impact & Results", children: p.results })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-32 space-y-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 0.1, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-mono uppercase tracking-widest text-muted-foreground", children: "Impact" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4", children: p.metrics.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl p-5 border-l-2 border-l-aurora-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-3xl text-aurora", children: m.value }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-[11px] uppercase tracking-wider text-muted-foreground", children: m.label })
            ] }, m.label)) })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 0.2, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 pt-8 border-t border-hairline", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs font-mono uppercase tracking-widest text-muted-foreground", children: "Stack" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: p.tech.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1.5 rounded-full border border-hairline text-sm text-muted-foreground hover:text-foreground hover:border-aurora-1 transition-colors", children: t }, t)) })
          ] }) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-32 border-t border-hairline pt-12 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-3xl", children: "Want something similar?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "Let's build a production-grade system." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Magnetic, { strength: 20, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", className: "rounded-full bg-foreground text-background px-8 py-4 font-medium hover:opacity-90 transition", children: "Start a conversation" }) })
      ] }) })
    ] })
  ] });
}
function Section({
  title,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-muted-foreground text-lg leading-relaxed", children })
  ] });
}
export {
  CaseStudy as component
};
