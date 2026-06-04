import { useRef, useEffect, useState, memo, lazy, Suspense } from "react";
import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, ArrowUpRight, Download } from "lucide-react";
import { Magnetic } from "@/components/ui/magnetic";
import { TextRoll } from "@/components/ui/text-roll";

// Lazy-load the heavy Three.js background to unblock first paint
const WebGLBackground = lazy(() => 
  import("@/components/webgl-background").then(m => ({ default: m.WebGLBackground }))
);

export const Hero = memo(function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Scroll Parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  // Mask tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  
  const maskSize = isHovered ? 400 : 40;
  const smoothSize = useSpring(maskSize, { stiffness: 100, damping: 20 });

  const maskImage = useMotionTemplate`radial-gradient(${smoothSize}px circle at ${smoothX}px ${smoothY}px, black 0%, transparent 100%)`;

  const rafId = useRef<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (rafId.current !== null) return;
    const { left, top } = e.currentTarget.getBoundingClientRect();
    const clientX = e.clientX;
    const clientY = e.clientY;
    
    rafId.current = requestAnimationFrame(() => {
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
      rafId.current = null;
    });
  };

  useEffect(() => {
    return () => {
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return (
    <motion.section
      ref={containerRef}
      style={{ opacity, scale }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative min-h-[calc(85dvh-6rem)] md:min-h-[calc(100vh-6rem)] flex flex-col items-center justify-center overflow-hidden bg-background cursor-default"
    >
      <div className="absolute inset-0 noise opacity-20 z-0 pointer-events-none" />
      <Suspense fallback={null}>
        <WebGLBackground />
      </Suspense>

      {/* Main Base Text (Dark/Muted) */}
      <motion.div style={{ y }} className="relative z-10 w-full flex flex-col items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-8 flex items-center gap-2 rounded-full border border-aurora-1/20 bg-aurora-1/5 px-4 py-1.5 text-xs font-mono text-aurora-1 backdrop-blur-sm pointer-events-none"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-aurora-1 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-aurora-1" />
          </span>
          AVAILABLE FOR 2026 ROLES
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: "circOut" }}
          className="font-display text-[15vw] leading-[0.8] tracking-tighter text-white/40 pointer-events-none"
        >
          MILAN SONI
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-6 flex flex-col items-center gap-3 pointer-events-none w-full max-w-2xl px-4"
        >
          <div className="text-sm font-mono text-muted-foreground/60 tracking-widest text-center whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md shadow-sm">
            <span className="text-muted-foreground/30 mr-2">[01]</span> AI ENGINEER · FULL STACK
          </div>
          <p className="text-muted-foreground/40 text-center text-lg md:text-xl leading-relaxed">
            Engineering <em className="font-display italic text-3xl md:text-4xl pr-1 tracking-wide">intelligent</em> systems, deterministic <em className="font-display italic text-3xl md:text-4xl pr-1 tracking-wide">agentic workflows</em>, and highly scalable architectures.
          </p>
        </motion.div>
      </motion.div>

      {/* Masked Bright Text Overlay */}
      <motion.div 
        className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none px-4"
        style={{ 
          y,
          maskImage,
          WebkitMaskImage: maskImage,
        }}
      >
        <div className="absolute inset-0 bg-linear-to-br from-aurora-1 via-aurora-2 to-aurora-3 opacity-20" />
        
        {/* Invisible spacer to match the base pill badge for perfect centering */}
        <div className="mb-8 flex items-center gap-2 rounded-full border border-transparent px-4 py-1.5 text-xs font-mono opacity-0 pointer-events-none">
          <span className="h-2 w-2" />
          AVAILABLE FOR 2026 ROLES
        </div>

        <h1 className="font-display text-[15vw] leading-[0.8] tracking-tighter text-foreground text-gradient mix-blend-plus-lighter">
          MILAN SONI
        </h1>
        
        <div className="mt-6 flex flex-col items-center gap-3 w-full max-w-2xl px-4">
          <div className="text-sm font-mono text-aurora-2 font-bold drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] tracking-widest text-center whitespace-nowrap rounded-full border border-transparent px-4 py-1.5">
            <span className="text-aurora-1/50 mr-2">[01]</span> AI ENGINEER · FULL STACK
          </div>
          <p className="text-aurora-1 text-center text-lg md:text-xl leading-relaxed font-medium drop-shadow-[0_0_10px_rgba(var(--aurora-1),0.8)]">
            Engineering <em className="font-display italic text-3xl md:text-4xl pr-1 tracking-wide text-white">intelligent</em> systems, deterministic <em className="font-display italic text-3xl md:text-4xl pr-1 tracking-wide text-white">agentic workflows</em>, and highly scalable architectures.
          </p>
        </div>
      </motion.div>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="relative z-30 mt-10 flex flex-wrap items-center justify-center gap-4"
      >
          <Magnetic strength={20}>
            <Link
              to="/work"
              className="group inline-flex items-center gap-3 rounded-full bg-foreground px-6 py-3 md:px-8 md:py-4 text-sm font-medium text-background transition hover:bg-aurora-1 hover:text-white"
            >
              <TextRoll text="Explore my work" />
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Magnetic>
          <Magnetic strength={20}>
            <a
              href="/MilanSoni_resume.pdf"
              className="inline-flex items-center gap-3 rounded-full glass px-6 py-3 md:px-8 md:py-4 text-sm font-medium hover:bg-secondary transition border border-hairline"
            >
              <Download className="h-4 w-4" /> <TextRoll text="Résumé" />
            </a>
          </Magnetic>
      </motion.div>

      {/* Stats Bar — visible on ALL screen sizes */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="relative z-30 mt-6 mb-6 flex flex-wrap items-center justify-center gap-6 md:gap-12 px-6 pointer-events-none"
      >
        <a href="https://www.sih.gov.in/sih2023-grand-finale-result" target="_blank" rel="noreferrer" className="flex flex-col items-center pointer-events-auto group hover:opacity-80 transition-opacity">
          <span className="font-display text-xl md:text-2xl text-aurora-1 group-hover:text-aurora-2 transition-colors flex items-center gap-1">
            Winner <ArrowUpRight className="h-3 w-3 md:h-4 md:w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </span>
          <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-widest text-muted-foreground">SIH '23 (Ministry of Coal)</span>
        </a>
        <div className="w-px h-8 md:h-10 bg-hairline" />
        <a href="https://drive.google.com/file/d/11DTgnEqtFGIB-PpX-SKyheMCue5xRe-_/view?usp=sharing" target="_blank" rel="noreferrer" className="flex flex-col items-center pointer-events-auto group hover:opacity-80 transition-opacity">
          <span className="font-display text-xl md:text-2xl text-foreground group-hover:text-aurora-2 transition-colors flex items-center gap-1">
            PICET-26 <ArrowUpRight className="h-3 w-3 md:h-4 md:w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </span>
          <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-widest text-muted-foreground">Scopus Indexed Paper</span>
        </a>
        <div className="w-px h-8 md:h-10 bg-hairline" />
        <div className="flex flex-col items-center">
          <span className="font-display text-xl md:text-2xl text-foreground">8.10</span>
          <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-widest text-muted-foreground">CGPA · B.Tech CSE</span>
        </div>
        <div className="w-px h-8 md:h-10 bg-hairline" />
        <div className="flex flex-col items-center">
          <span className="font-display text-xl md:text-2xl text-foreground">3+</span>
          <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-widest text-muted-foreground">Enterprise Internships</span>
        </div>
      </motion.div>
    </motion.section>
  );
});
