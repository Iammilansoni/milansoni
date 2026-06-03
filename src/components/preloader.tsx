import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Skip entirely for reduced motion users
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    if (prefersReduced) {
      setIsVisible(false);
      onComplete();
      return;
    }

    document.body.style.overflow = "hidden";

    let interval: NodeJS.Timeout;
    // Fast loading simulation (max ~800ms)
    interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsVisible(false);
            document.body.style.overflow = "auto";
            setTimeout(onComplete, 400); // Wait for exit animation
          }, 300); // Brief pause at 100%
          return 100;
        }
        const inc = Math.floor(Math.random() * 20) + 15;
        return Math.min(prev + inc, 100);
      });
    }, 60);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "auto";
    };
  }, [onComplete]);

  if (!isVisible && progress === 0) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background text-foreground"
        >
          <div className="absolute inset-0 noise opacity-20 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center">
            {/* The Percentage */}
            <motion.div 
              className="font-display text-8xl md:text-[12rem] leading-none"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {progress}%
            </motion.div>
            
            {/* The Loading Bar Container */}
            <div className="mt-8 h-1 w-64 max-w-[80vw] overflow-hidden rounded-full bg-secondary">
              <motion.div
                className="h-full bg-aurora-1"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "circOut" }}
              />
            </div>
            
            <div className="mt-6 flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-aurora-2 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-aurora-2" />
              </span>
              Initializing Core
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
