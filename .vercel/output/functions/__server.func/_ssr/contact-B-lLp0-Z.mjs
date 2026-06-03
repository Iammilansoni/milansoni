import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { R as Reveal, S as SITE } from "./router-DBSTBaOm.mjs";
import "../_libs/seroval.mjs";
import { M as Mail, G as Github, L as Linkedin, P as PenLine } from "../_libs/lucide-react.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/isbot.mjs";
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
const Schema = objectType({
  name: stringType().trim().min(1, "Required").max(80),
  email: stringType().trim().email("Invalid email").max(200),
  message: stringType().trim().min(10, "Tell me a bit more").max(2e3)
});
function ContactPage() {
  const [pending, setPending] = reactExports.useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = Schema.safeParse({
      name: fd.get("name"),
      email: fd.get("email"),
      message: fd.get("message")
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Invalid input");
      return;
    }
    setPending(true);
    const body = encodeURIComponent(`From: ${parsed.data.name} <${parsed.data.email}>

${parsed.data.message}`);
    const subject = encodeURIComponent(`Hello from ${parsed.data.name}`);
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
    setTimeout(() => {
      setPending(false);
      toast.success("Opening your email client — looking forward to it!");
    }, 400);
  };
  const channels = [{
    icon: Mail,
    label: "Email",
    value: SITE.email,
    href: SITE.socials.email
  }, {
    icon: Github,
    label: "GitHub",
    value: "@Iammilansoni",
    href: SITE.socials.github
  }, {
    icon: Linkedin,
    label: "LinkedIn",
    value: "in/sonimilan",
    href: SITE.socials.linkedin
  }, {
    icon: PenLine,
    label: "Medium",
    value: "@milansoni96946",
    href: SITE.socials.medium
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aurora-bg opacity-60" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-6xl px-6 py-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs uppercase tracking-widest text-muted-foreground", children: "Contact" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-4 font-display text-5xl md:text-7xl max-w-3xl", children: [
          "Let's build ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-aurora", children: "something good." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 max-w-xl text-muted-foreground", children: "Roles, collaborations, or just a problem worth thinking about — I read everything that lands in my inbox." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-16 grid lg:grid-cols-5 gap-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { className: "lg:col-span-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit, className: "glass rounded-3xl p-7 space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Your name", name: "name", placeholder: "Ada Lovelace" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Email", name: "email", type: "email", placeholder: "ada@example.com" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Message" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { name: "message", rows: 6, required: true, className: "mt-2 w-full rounded-xl bg-card/60 border border-hairline px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring resize-y", placeholder: "Tell me about the role, the company, or the problem…" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: pending, className: "inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background hover:opacity-90 transition disabled:opacity-50", children: pending ? "Sending…" : "Send message →" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { delay: 0.1, className: "lg:col-span-2 space-y-3", children: [
          channels.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: c.href, target: c.href.startsWith("mailto") ? void 0 : "_blank", rel: "noreferrer", className: "group flex items-center gap-4 glass rounded-2xl p-5 hover:bg-secondary/60 transition", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 grid place-items-center rounded-xl bg-secondary border border-hairline", children: /* @__PURE__ */ jsxRuntimeExports.jsx(c.icon, { className: "h-4 w-4 text-aurora-1" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: c.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm truncate group-hover:text-aurora transition", children: c.value })
            ] })
          ] }, c.label)),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Based in" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-sm", children: SITE.location })
          ] })
        ] })
      ] })
    ] })
  ] });
}
function Field({
  label,
  name,
  type = "text",
  placeholder
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { name, type, required: true, placeholder, className: "mt-2 w-full rounded-xl bg-card/60 border border-hairline px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring" })
  ] });
}
export {
  ContactPage as component
};
