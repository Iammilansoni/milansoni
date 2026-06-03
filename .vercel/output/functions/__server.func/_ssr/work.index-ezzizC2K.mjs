import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { R as Reveal, P as PROJECTS } from "./router-DBSTBaOm.mjs";
import "../_libs/seroval.mjs";
import { A as ArrowUpRight } from "../_libs/lucide-react.mjs";
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
function WorkIndex() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-7xl px-6 py-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs uppercase tracking-widest text-muted-foreground", children: "Work" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-4 font-display text-5xl md:text-7xl max-w-4xl", children: [
        "Case studies in ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-aurora", children: "applied engineering." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-16 grid md:grid-cols-2 gap-5", children: PROJECTS.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: i * 0.05, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/work/$slug", params: {
      slug: p.slug
    }, className: "group block glass rounded-3xl p-8 h-full hover:bg-secondary/60 transition relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute -top-20 -right-20 h-60 w-60 rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-700", style: {
        background: "radial-gradient(closest-side, var(--aurora-2), transparent 70%)"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-muted-foreground border border-hairline rounded-full px-3 py-1", children: p.tag }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-5 font-display text-3xl", children: p.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: p.blurb }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex flex-wrap gap-2", children: p.tech.slice(0, 5).map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] px-2.5 py-1 rounded-full bg-secondary text-muted-foreground", children: t }, t)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-center text-sm text-muted-foreground group-hover:text-foreground", children: [
        "Read case study ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "ml-1 h-4 w-4" })
      ] })
    ] }) }, p.slug)) })
  ] });
}
export {
  WorkIndex as component
};
