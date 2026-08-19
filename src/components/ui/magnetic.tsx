import React, { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/**
 * Pulls its child slightly toward the pointer. Now reserved for primary CTAs
 * only — it previously wrapped seven separate nav elements, so the entire
 * header drifted under the cursor.
 *
 * Driven by motion values rather than state, so tracking the pointer does not
 * re-render. The hover tick sound it used to play is gone with the sound
 * system.
 */
export function Magnetic({
  children,
  strength = 15,
}: {
  children: ReactNode;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spring = { stiffness: 150, damping: 15, mass: 0.1 };
  const smoothX = useSpring(x, spring);
  const smoothY = useSpring(y, spring);

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce || !ref.current) return;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    x.set((e.clientX - (left + width / 2)) / strength);
    y.set((e.clientY - (top + height / 2)) / strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ x: smoothX, y: smoothY }}
      className="inline-flex"
    >
      {children}
    </motion.div>
  );
}
