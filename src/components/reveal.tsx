import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { type ReactNode } from "react";
import { EASE_OUT_EXPO, DUR } from "@/lib/motion";

type Direction = "up" | "down" | "left" | "right";

/**
 * Scroll-reveal primitive. Elements rise + fade on the shared expo curve.
 * Backwards compatible with the original `{ delay, y }` API; adds optional
 * `direction`, `distance`, `duration`, and a subtle `blur` for a premium
 * settle. Respects reduced-motion.
 */
export function Reveal({
  children,
  delay = 0,
  y,
  direction = "up",
  distance = 24,
  duration = DUR.base,
  blur = false,
  className,
  ...rest
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  direction?: Direction;
  distance?: number;
  duration?: number;
  blur?: boolean;
} & HTMLMotionProps<"div">) {
  const reduce = useReducedMotion();

  // Back-compat: an explicit `y` prop overrides direction/distance.
  const offset = y ?? distance;
  const from: Record<Direction, { x?: number; y?: number }> = {
    up: { y: offset },
    down: { y: -offset },
    left: { x: offset },
    right: { x: -offset },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...(reduce ? {} : from[direction]), filter: blur && !reduce ? "blur(8px)" : "blur(0px)" }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: reduce ? 0 : duration, ease: EASE_OUT_EXPO, delay: reduce ? 0 : delay }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
