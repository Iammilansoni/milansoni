/**
 * Shared motion tokens so Framer Motion animations stay consistent with the
 * CSS easing curves defined in styles.css (`--ease-*`). Import these instead
 * of sprinkling ad-hoc cubic-beziers across components.
 */

// Cubic-bezier control points (mirror the CSS `--ease-*` tokens)
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_OUT_QUINT = [0.22, 1, 0.36, 1] as const;
export const EASE_IN_OUT_SOFT = [0.65, 0, 0.35, 1] as const;

// Durations (seconds)
export const DUR = {
  fast: 0.45,
  base: 0.7,
  slow: 1.1,
} as const;

// Reusable spring presets
export const SPRING_SOFT = { type: "spring", stiffness: 120, damping: 20, mass: 0.6 } as const;
export const SPRING_SNAPPY = { type: "spring", stiffness: 260, damping: 26, mass: 0.7 } as const;

/**
 * Orchestrated reveal variants — a container staggers its children, each of
 * which rises + fades on the shared expo curve. Directional variants let a
 * section choose where elements enter from.
 */
export const staggerContainer = (stagger = 0.08, delayChildren = 0) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

export const fadeUp = (y = 24) => ({
  hidden: { opacity: 0, y },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.base, ease: EASE_OUT_EXPO },
  },
});
