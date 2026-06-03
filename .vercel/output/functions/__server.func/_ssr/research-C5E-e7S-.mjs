import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { R as Reveal } from "./router-DBSTBaOm.mjs";
import "../_libs/seroval.mjs";
import { B as BookOpen, c as ArrowRight } from "../_libs/lucide-react.mjs";
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
import "../_libs/framer-motion.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const ARTICLES = [{
  slug: "agents-in-production",
  title: "Deploying Agentic AI in Production",
  date: "June 2026",
  blurb: "Lessons learned building multi-step reasoning agents that don't hallucinate and actually solve business problems.",
  readTime: "8 min read"
}, {
  slug: "rag-optimizations",
  title: "Advanced RAG Optimization Strategies",
  date: "April 2026",
  blurb: "Moving beyond basic semantic search. Hybrid retrieval, query rewriting, and semantic chunking deep dive.",
  readTime: "12 min read"
}];
function ResearchIndex() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aurora-bg opacity-30" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-4xl px-6 pt-32 pb-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-6 w-6 text-aurora-1" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs uppercase tracking-widest text-muted-foreground", children: "Research Vault" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-5xl md:text-7xl", children: [
          "Writing & ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-aurora", children: "Research." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed", children: "I write about the intersection of applied AI, full-stack engineering, and designing systems that scale. Here you'll find deep dives into my architecture decisions." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-24 space-y-8", children: ARTICLES.map((a, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: i * 0.1, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: `/research/${a.slug}`, className: "group block glass rounded-[2rem] p-8 hover:bg-secondary/30 transition duration-500 relative overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-aurora-1/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-xs font-mono text-muted-foreground mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: a.date }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-aurora-2", children: a.readTime })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl group-hover:text-aurora transition-colors", children: a.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground leading-relaxed max-w-2xl", children: a.blurb }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex items-center gap-2 text-sm font-medium text-aurora-1 group-hover:translate-x-2 transition-transform duration-300", children: [
            "Read article ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
          ] })
        ] })
      ] }) }, a.slug)) })
    ] })
  ] });
}
export {
  ResearchIndex as component
};
