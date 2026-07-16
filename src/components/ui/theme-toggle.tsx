import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { EASE_OUT_EXPO } from "@/lib/motion";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid an icon hydration mismatch: the real theme is only known on the client
  useEffect(() => setMounted(true), []);

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className="relative h-9 w-9 flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors overflow-hidden"
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      title={`Switch to ${isDark ? "light" : "dark"} theme`}
    >
      {mounted && (
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isDark ? "moon" : "sun"}
            initial={{ y: 12, opacity: 0, rotate: -40 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -12, opacity: 0, rotate: 40 }}
            transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-[18px] w-[18px]" />}
          </motion.span>
        </AnimatePresence>
      )}
    </button>
  );
}
