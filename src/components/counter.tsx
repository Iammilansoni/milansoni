import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

export function Counter({ value }: { value: string }) {
  const numeric = parseFloat(value.replace(/[^\d.]/g, ""));
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v).toLocaleString());

  useEffect(() => {
    if (!inView || isNaN(numeric)) return;
    const controls = animate(mv, numeric, { duration: 1.6, ease: [0.22, 1, 0.36, 1] });
    return controls.stop;
  }, [inView, numeric, mv]);

  if (isNaN(numeric)) {
    return <span ref={ref}>{value}</span>;
  }

  const prefix = value.match(/^[^\d]+/)?.[0] ?? "";
  const trailing = value.match(/[^\d,.]+$/)?.[0] ?? "";

  return (
    <span ref={ref}>
      {prefix}
      <motion.span>{rounded}</motion.span>
      {trailing}
    </span>
  );
}
