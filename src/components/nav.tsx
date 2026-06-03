import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { NAV, SITE } from "@/lib/site";
import { Magnetic } from "@/components/ui/magnetic";
import { TextRoll } from "@/components/ui/text-roll";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { useSoundSystem } from "@/lib/sound";

export function Nav({ onOpenCommand }: { onOpenCommand: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { location } = useRouterState();
  const { scrollY } = useScroll();
  const { isMuted, toggleMute } = useSoundSystem();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setScrolled(latest > 8);
  });

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-150%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div
          className={`glass rounded-full flex items-center justify-between gap-2 px-3 py-2 transition-all ${
            scrolled ? "shadow-elevated bg-background/60" : ""
          }`}
        >
          <Magnetic strength={40}>
            <Link to="/" className="flex items-center gap-2 pl-2 pr-3">
              <span className="inline-block h-6 w-6 rounded-md bg-gradient-to-br from-aurora-1 via-aurora-2 to-aurora-3" />
              <span className="font-display text-lg leading-none">{SITE.name}</span>
            </Link>
          </Magnetic>

          <nav className="hidden md:flex items-center gap-1 text-sm">
            {NAV.slice(1).map((item) => {
              const active = location.pathname === item.to ||
                (item.to !== "/" && location.pathname.startsWith(item.to));
              return (
                <Magnetic key={item.to} strength={30}>
                  <Link
                    to={item.to}
                    className={`block px-3 py-1.5 rounded-full transition-colors ${
                      active
                        ? "text-foreground bg-secondary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <TextRoll text={item.label} />
                  </Link>
                </Magnetic>
              );
            })}
          </nav>

          <div className="flex items-center gap-1">
            <Magnetic strength={30}>
              <button
                onClick={toggleMute}
                className="h-9 w-9 flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Toggle sound"
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </button>
            </Magnetic>
            <button
              onClick={onOpenCommand}
              className="hidden sm:inline-flex items-center gap-2 text-xs text-muted-foreground border border-hairline rounded-full px-3 py-1.5 hover:text-foreground hover:bg-secondary transition"
            >
              <span>Search</span>
              <kbd className="font-mono text-[10px] bg-secondary border border-hairline rounded px-1 py-0.5">⌘K</kbd>
            </button>
            <Magnetic strength={30}>
              <Link
                to="/contact"
                className="block text-sm rounded-full bg-foreground text-background px-4 py-1.5 hover:opacity-90 transition"
              >
                Hire me
              </Link>
            </Magnetic>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
