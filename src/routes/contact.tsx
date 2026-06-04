import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Github, Linkedin, Mail, PenLine, Check } from "lucide-react";
import { toast } from "sonner";
import { Reveal } from "@/components/reveal";
import { SITE } from "@/lib/site";
import { motion, AnimatePresence } from "framer-motion";

const Schema = z.object({
  name: z.string().trim().min(1, "Required").max(80),
  email: z.string().trim().email("Invalid email").max(200),
  message: z.string().trim().min(10, "Tell me a bit more").max(2000),
});

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Milan Soni | Hire GenAI & Full Stack Engineer" },
      { name: "description", content: "Get in touch with Milan Soni. I'm actively open to Software Engineering, Full Stack, and GenAI roles. Let's build production-grade systems." },
      { property: "og:title", content: "Contact Milan Soni | Hire GenAI & Full Stack Engineer" },
      { property: "og:description", content: "Get in touch with Milan Soni. I'm actively open to Software Engineering, Full Stack, and GenAI roles. Let's build production-grade systems." },
      { property: "og:url", content: "https://milansoni.vercel.app/contact" },
    ],
    links: [{ rel: "canonical", href: "https://milansoni.vercel.app/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [pending, setPending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
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

    try {
      fd.append("access_key", "afc8b487-79a3-4a1b-9c9d-45a13d613f63");
      fd.append("subject", `New Portfolio Contact from ${parsed.data.name}`);
      
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: fd
      });
      
      const data = await response.json();
      
      if (data.success) {
        setIsSent(true);
        form.reset(); // Clear the form fields
        
        // Reset the success state after 3 seconds
        setTimeout(() => setIsSent(false), 3000);
      } else {
        toast.error("Something went wrong. Please try again or reach out on LinkedIn.");
      }
    } catch (error) {
      toast.error("Network error. Please try again or reach out on LinkedIn.");
    } finally {
      setPending(false);
    }
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
                disabled={pending || isSent}
                className={`relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 disabled:opacity-50 min-w-[180px] ${
                  isSent 
                    ? "bg-green-500/20 text-green-400 border border-green-500/30" 
                    : "bg-foreground text-background hover:opacity-90"
                }`}
              >
                <AnimatePresence mode="wait">
                  {isSent ? (
                    <motion.div
                      key="sent"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2"
                    >
                      Message Sent! <Check className="h-4 w-4" />
                    </motion.div>
                  ) : pending ? (
                    <motion.div
                      key="sending"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      Sending...
                    </motion.div>
                  ) : (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      Send message →
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>

              <p className="text-[11px] text-muted-foreground font-mono">
                Securely delivered to my inbox · I typically reply within 24 hours
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
