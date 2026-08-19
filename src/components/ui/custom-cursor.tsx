import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Cursor dot that trails the pointer.
 *
 * Position and hover-scale are driven entirely by motion values, so pointer
 * movement never triggers a React render — the previous implementation called
 * `setState` on every `mousemove`, re-rendering the tree hundreds of times a
 * second. Enabled only for fine pointers (mouse/trackpad); touch devices get
 * nothing, decided in an effect rather than during render so SSR and the
 * first client paint agree.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const scale = useMotionValue(1);

  const spring = { stiffness: 1000, damping: 50, mass: 0.1 };
  const smoothX = useSpring(x, spring);
  const smoothY = useSpring(y, spring);
  const smoothScale = useSpring(scale, { stiffness: 500, damping: 30 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches) return;

    setEnabled(true);

    let frame: number | null = null;
    let nextX = 0;
    let nextY = 0;

    const onMove = (e: MouseEvent) => {
      nextX = e.clientX;
      nextY = e.clientY;
      if (frame !== null) return;
      frame = requestAnimationFrame(() => {
        x.set(nextX);
        y.set(nextY);
        frame = null;
      });
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const interactive = !!target?.closest?.(
        'a, button, [role="button"], input, textarea, select, summary'
      );
      scale.set(interactive ? 2.5 : 1);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });

    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, [x, y, scale]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-100 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference"
      style={{ x: smoothX, y: smoothY, scale: smoothScale }}
    />
  );
}
