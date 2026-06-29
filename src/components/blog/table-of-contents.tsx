import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, List, BookOpen } from "lucide-react";
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

  const tocList = (
    <ul className="space-y-1">
      {headings.map((h) => (
        <li key={h.id}>
          <button
            onClick={() => scrollTo(h.id)}
            className={cn(
              "block w-full text-left text-sm py-1.5 transition-all duration-200 border-l-2 pl-3",
              h.level === 3 && "ml-3",
              activeId === h.id
                ? "text-aurora-1 border-aurora-1 font-medium bg-aurora-1/5 rounded-r-lg"
                : "text-muted-foreground border-transparent hover:text-foreground hover:border-hairline/50"
            )}
          >
            {h.text}
          </button>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {/* Mobile TOC */}
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
              <nav className="glass rounded-b-2xl border border-t-0 border-hairline px-5 py-4">
                {tocList}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop TOC - rendered inline, not fixed/sticky */}
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="glass rounded-2xl border border-hairline p-5">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-4 h-4 text-aurora-1" />
            <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              On this page
            </p>
          </div>
          {tocList}
        </div>
      </aside>
    </>
  );
}
