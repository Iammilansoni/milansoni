import * as React from "react";
import { motion } from "framer-motion";

export function TextRoll({ text, className = "" }: { text: string; className?: string }) {
  return (
    <motion.span
      initial="initial"
      whileHover="hover"
      className={`relative inline-flex overflow-hidden ${className}`}
    >
      <span className="inline-flex">
        {text.split("").map((char, i) => (
          <motion.span
            key={i}
            variants={{
              initial: { y: 0 },
              hover: { y: "-100%" }
            }}
            transition={{ duration: 0.3, delay: i * 0.02, ease: [0.33, 1, 0.68, 1] }}
            className="inline-block whitespace-pre"
          >
            {char}
          </motion.span>
        ))}
      </span>
      <span className="absolute inset-0 inline-flex" aria-hidden="true">
        {text.split("").map((char, i) => (
          <motion.span
            key={`clone-${i}`}
            variants={{
              initial: { y: "100%" },
              hover: { y: 0 }
            }}
            transition={{ duration: 0.3, delay: i * 0.02, ease: [0.33, 1, 0.68, 1] }}
            /* Inherit the button's colour — do NOT pin this to text-foreground.
               The primary CTA is `bg-foreground text-background`, so a pinned
               foreground made the incoming copy light-on-light and the label
               appeared to vanish on hover. */
            className="inline-block whitespace-pre"
          >
            {char}
          </motion.span>
        ))}
      </span>
    </motion.span>
  );
}
