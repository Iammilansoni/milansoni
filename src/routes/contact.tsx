import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Github, Linkedin, Mail, PenLine } from "lucide-react";
import { toast } from "sonner";
import { Reveal } from "@/components/reveal";
import { SITE } from "@/lib/site";

const Schema = z.object({
  name: z.string().trim().min(1, "Required").max(80),
  email: z.string().trim().email("Invalid email").max(200),
  message: z.string().trim().min(10, "Tell me a bit more").max(2000),
});

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Milan Soni" },
      { name: "description", content: "Get in touch with Milan Soni — open to Software Engineering, Full Stack and GenAI roles." },
      { property: "og:title", content: "Contact — Milan Soni" },
      { property: "og:description", content: "Open to engineering opportunities." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [pending, setPending] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = Schema.safeParse({
      name: fd.get("name"),
      email: fd.get("email"),
      message: fd.get("message"),
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Invalid input");
      return;
    }
    setPending(true);
    // Open user's mail client as a no-backend fallback.
    const body = encodeURIComponent(`From: ${parsed.data.name} <${parsed.data.email}>\n\n${parsed.data.message}`);
    const subject = encodeURIComponent(`Hello from ${parsed.data.name}`);
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
    setTimeout(() => {
      setPending(false);
      toast.success("Opening your email client — looking forward to it!");
    }, 400);
  };

  const channels = [
    { icon: Mail, label: "Email", value: SITE.email, href: SITE.socials.email },
    { icon: Github, label: "GitHub", value: "@Iammilansoni", href: SITE.socials.github },
    { icon: Linkedin, label: "LinkedIn", value: "in/sonimilan", href: SITE.socials.linkedin },
    { icon: PenLine, label: "Medium", value: "@milansoni96946", href: SITE.socials.medium },
  ];

  return (
    <div className="relative">
      <div className="aurora-bg opacity-60" />
      <div className="relative mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Contact</p>
          <h1 className="mt-4 font-display text-5xl md:text-7xl max-w-3xl">
            Let's build <span className="text-aurora">something good.</span>
          </h1>
          <p className="mt-6 max-w-xl text-muted-foreground">
            Roles, collaborations, or just a problem worth thinking about — I read everything that lands in my inbox.
          </p>
        </Reveal>

        <div className="mt-16 grid lg:grid-cols-5 gap-8">
          <Reveal className="lg:col-span-3">
            <form onSubmit={onSubmit} className="glass rounded-3xl p-7 space-y-5">
              <Field label="Your name" name="name" placeholder="Ada Lovelace" />
              <Field label="Email" name="email" type="email" placeholder="ada@example.com" />
              <div>
                <label className="text-xs uppercase tracking-widest text-muted-foreground">Message</label>
                <textarea
                  name="message"
                  rows={6}
                  required
                  className="mt-2 w-full rounded-xl bg-card/60 border border-hairline px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring resize-y"
                  placeholder="Tell me about the role, the company, or the problem…"
                />
              </div>
              <button
                type="submit"
                disabled={pending}
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background hover:opacity-90 transition disabled:opacity-50"
              >
                {pending ? "Opening email client…" : "Send message →"}
              </button>
              <p className="text-[11px] text-muted-foreground font-mono">
                Opens your email client · I typically reply within 24 hours
              </p>
            </form>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-2 space-y-3">
            {channels.map((c) => (
              <a key={c.label} href={c.href} target={c.href.startsWith("mailto") ? undefined : "_blank"} rel="noreferrer" className="group flex items-center gap-4 glass rounded-2xl p-5 hover:bg-secondary/60 transition">
                <div className="h-10 w-10 grid place-items-center rounded-xl bg-secondary border border-hairline">
                  <c.icon className="h-4 w-4 text-aurora-1" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">{c.label}</div>
                  <div className="text-sm truncate group-hover:text-aurora transition">{c.value}</div>
                </div>
              </a>
            ))}
            <div className="glass rounded-2xl p-5">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Based in</div>
              <div className="mt-1 text-sm">{SITE.location}</div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

function Field({ label, name, type = "text", placeholder }: { label: string; name: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-widest text-muted-foreground">{label}</label>
      <input
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl bg-card/60 border border-hairline px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
      />
    </div>
  );
}
