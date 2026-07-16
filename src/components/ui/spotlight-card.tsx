import { useRef, type ReactNode } from "react";

/**
 * Wraps a card and tracks the pointer as CSS custom properties (--mx/--my) so
 * a soft radial highlight (`.spotlight::before`, see styles.css) can follow the
 * cursor. Pairs well with the existing <Tilt>. Zero cost when idle; no React
 * re-renders on move (writes CSS vars directly).
 */
export function SpotlightCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <div ref={ref} onMouseMove={onMove} className={`spotlight ${className}`}>
      {children}
    </div>
  );
}
