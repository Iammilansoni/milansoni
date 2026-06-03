import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ROLES = [
  "Full Stack Developer.",
  "GenAI Engineer.",
  "AI Product Builder.",
  "RAG Systems Engineer.",
  "Software Engineer.",
];

export function Typewriter() {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = ROLES[idx];
    if (!deleting && text === current) {
      const t = setTimeout(() => setDeleting(true), 1500);
      return () => clearTimeout(t);
    }
    if (deleting && text === "") {
      setDeleting(false);
      setIdx((i) => (i + 1) % ROLES.length);
      return;
    }
    const delay = deleting ? 35 : 70;
    const t = setTimeout(() => {
      setText((prev) =>
        deleting ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1),
      );
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, idx]);

  return (
    <span className="inline-flex items-baseline">
      <span className="text-aurora">{text}</span>
      <motion.span
        aria-hidden
        className="ml-1 inline-block h-[0.9em] w-[2px] bg-foreground/80"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
      />
    </span>
  );
}
