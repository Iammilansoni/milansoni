import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, List } from "lucide-react";
import { cn } from "@/lib/utils";

type TocItem = {
  id: string;
  text: string;
  level: number;
};

function generateId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function extractHeadings(markdown: string): TocItem[] {
  const headings: TocItem[] = [];
  const lines = markdown.split("\n");
  let inCodeBlock = false;

  for (const line of lines) {
    if (line.startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    const match = line.match(/^(#{2,3})\s+(.+)/);
    if (match) {
      const level = match[1].length;
      const text = match[2].replace(/[*_`]/g, "").trim();
      headings.push({ id: generateId(text), text, level });
    }
  }

  return headings;
}

export function TableOfContents({ markdown }: { markdown: string }) {
  const [activeId, setActiveId] = useState<string>("");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const headings = extractHeadings(markdown);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -80% 0px", threshold: 0 }
    );

    for (const heading of headings) {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [headings]);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsMobileOpen(false);
    }
  }, []);

  if (headings.length === 0) return null;

  return (
    <>
      {/* Mobile TOC toggle */}
      <div className="lg:hidden mb-8">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="w-full flex items-center justify-between glass rounded-2xl px-5 py-4 border border-hairline"
        >
          <span className="flex items-center gap-2 text-sm font-mono uppercase tracking-wider text-muted-foreground">
            <List className="w-4 h-4" />
            Table of Contents
          </span>
          <ChevronDown
            className={cn(
              "w-4 h-4 text-muted-foreground transition-transform",
              isMobileOpen && "rotate-180"
            )}
          />
        </button>
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <nav className="glass rounded-b-2xl border border-t-0 border-hairline px-5 py-4 space-y-1">
                {headings.map((h) => (
                  <button
                    key={h.id}
                    onClick={() => scrollTo(h.id)}
                    className={cn(
                      "block w-full text-left text-sm py-1.5 transition-colors",
                      h.level === 3 && "pl-4",
                      activeId === h.id
                        ? "text-aurora-1 font-medium"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {h.text}
                  </button>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop sticky TOC */}
      <nav className="hidden lg:block fixed right-8 top-32 w-56 z-40">
        <div className="glass rounded-2xl border border-hairline p-5">
          <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-4">
            On this page
          </p>
          <ul className="space-y-1">
            {headings.map((h) => (
              <li key={h.id}>
                <button
                  onClick={() => scrollTo(h.id)}
                  className={cn(
                    "block w-full text-left text-sm py-1 transition-colors border-l-2 pl-3",
                    h.level === 3 && "ml-3",
                    activeId === h.id
                      ? "text-aurora-1 border-aurora-1 font-medium"
                      : "text-muted-foreground border-transparent hover:text-foreground hover:border-hairline"
                  )}
                >
                  {h.text}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}
