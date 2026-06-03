import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail, Instagram, BookOpen, MapPin } from "lucide-react";
import { SITE, NAV } from "@/lib/site";
import { TextRoll } from "@/components/ui/text-roll";

const SOCIALS = [
  { label: "GitHub", href: SITE.socials.github, icon: Github },
  { label: "LinkedIn", href: SITE.socials.linkedin, icon: Linkedin },
  { label: "Medium", href: SITE.socials.medium, icon: BookOpen },
  { label: "Instagram", href: (SITE.socials as any).instagram, icon: Instagram },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden pt-32 pb-8">
      {/* Big name watermark */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-center overflow-hidden select-none z-0"
      >
        <span className="font-display text-[22vw] leading-none text-foreground/3 tracking-tighter whitespace-nowrap">
          MILAN SONI
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* ── Floating CTA Card ── */}
        <div className="relative overflow-hidden rounded-4xl border border-aurora-1/20 bg-background/50 backdrop-blur-2xl p-10 md:p-16 lg:p-20 flex flex-col lg:flex-row lg:items-center justify-between gap-10 shadow-2xl shadow-aurora-1/5 mb-24 group">
          {/* Ambient inner glows */}
          <div className="absolute inset-0 bg-linear-to-br from-aurora-1/10 via-transparent to-aurora-3/10 pointer-events-none" />
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-aurora-1/20 blur-3xl rounded-full pointer-events-none group-hover:bg-aurora-1/30 transition-colors duration-1000" />
          
          <div className="relative z-10 max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-widest text-aurora-2 mb-4 flex items-center gap-3">
              <span className="h-px w-6 bg-aurora-2" />
              Let's Work Together
            </p>
            <h2 className="font-display text-5xl md:text-7xl leading-[0.9] tracking-tight">
              Got a project<br />
              <em className="italic text-aurora">in mind?</em>
            </h2>
            <p className="mt-6 text-muted-foreground text-lg max-w-md leading-relaxed">
              Whether you need a scalable full-stack application or an intelligent AI agent system, I'm ready to build it.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row gap-4 shrink-0">
            <motion.a
              href={SITE.socials.email}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group/btn inline-flex items-center justify-center gap-3 rounded-full bg-foreground px-8 py-4 text-sm font-medium text-background transition-all hover:bg-aurora-1 hover:text-white shadow-lg"
            >
              <TextRoll text="Send me a message" />
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </motion.a>
            <motion.a
              href="/resume.pdf"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-3 rounded-full border border-hairline bg-background/50 backdrop-blur-sm px-8 py-4 text-sm font-medium hover:bg-secondary transition-all"
            >
              <TextRoll text="Download Résumé" />
            </motion.a>
          </div>
        </div>

        {/* ── Main Footer Grid ── */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-12 md:gap-8 mb-20">
          {/* Brand - takes 4 columns */}
          <div className="col-span-2 md:col-span-12 lg:col-span-5 lg:pr-12">
            <Link to="/" className="group inline-flex items-center gap-3 mb-6">
              <span className="inline-block h-8 w-8 rounded-xl bg-linear-to-br from-aurora-1 via-aurora-2 to-aurora-3 group-hover:scale-110 transition-transform shadow-[0_0_15px_--theme(--color-aurora-1/40)]" />
              <span className="font-display text-2xl tracking-tight">{SITE.name}</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-md">
              {SITE.description}
            </p>
            <div className="flex items-center gap-2.5 text-xs text-aurora-1 font-mono bg-aurora-1/5 border border-aurora-1/20 w-max px-4 py-2 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-aurora-1 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-aurora-1" />
              </span>
              Available for 2026 roles
            </div>
          </div>

          {/* Navigate - 2 cols */}
          <div className="md:col-span-4 lg:col-span-2">
            <p className="font-mono text-xs uppercase tracking-widest text-foreground mb-6">
              Navigate
            </p>
            <ul className="space-y-4">
              {NAV.map((n) => (
                <li key={n.to}>
                  <Link
                    to={n.to}
                    className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-aurora-1 transition-colors"
                  >
                    <span className="h-px w-0 bg-aurora-1 group-hover:w-4 transition-all duration-300 ease-out" />
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials - 2 cols */}
          <div className="md:col-span-4 lg:col-span-2">
            <p className="font-mono text-xs uppercase tracking-widest text-foreground mb-6">
              Connect
            </p>
            <ul className="space-y-4">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-3 text-sm text-muted-foreground hover:text-aurora-2 transition-colors"
                  >
                    <s.icon className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Credentials - 3 cols */}
          <div className="col-span-2 md:col-span-4 lg:col-span-3">
            <p className="font-mono text-xs uppercase tracking-widest text-foreground mb-6">
              Credentials
            </p>
            <ul className="space-y-6 text-sm">
              <li className="flex flex-col gap-1.5">
                <span className="text-foreground font-medium flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-aurora-1" />
                  🏆 SIH 2023
                </span>
                <span className="text-muted-foreground text-xs pl-4 font-mono">National Winner · Top 1%</span>
              </li>
              <li className="flex flex-col gap-1.5">
                <span className="text-foreground font-medium flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-aurora-2" />
                  📄 Scopus Indexed
                </span>
                <span className="text-muted-foreground text-xs pl-4 font-mono">PICET-2026 · Hybrid RAG</span>
              </li>
              <li className="flex flex-col gap-1.5">
                <span className="text-foreground font-medium flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-aurora-3" />
                  🎓 B.Tech CSE
                </span>
                <span className="text-muted-foreground text-xs pl-4 font-mono">CGPA 8.10 · 2026 Graduate</span>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="border-t border-hairline pt-8 pb-12 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <p className="font-mono text-xs text-muted-foreground/50">
            Designed & Developed with ❤️ by {SITE.name}.
          </p>
          <div className="flex items-center gap-8">
            <a
              href={`mailto:${SITE.email}`}
              className="font-mono text-xs text-muted-foreground/50 hover:text-aurora-1 transition-colors"
            >
              {SITE.email}
            </a>
            <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground/40">
              <MapPin className="h-3 w-3" />
              Churu (Rajasthan)
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
