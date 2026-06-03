import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { Magnetic } from "@/components/ui/magnetic";

export function CTASection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const y = useTransform(scrollYProgress, [0, 1], ["20%", "0%"]);

  return (
    <section ref={containerRef} className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-32 bg-background">
      <motion.div 
        style={{ scale, y }}
        className="w-full mx-auto max-w-7xl px-6 relative"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-aurora-1/20 to-transparent blur-3xl opacity-50 rounded-[4rem] -z-10" />
        
        <div className="glass rounded-[3rem] p-12 md:p-24 text-center overflow-hidden border border-hairline/50 relative">
          <div className="absolute inset-0 aurora-bg opacity-30 mix-blend-screen" />
          
          <div className="relative z-10 flex flex-col items-center justify-center">
            <p className="font-mono text-sm uppercase tracking-[0.3em] text-aurora-2 mb-8">
              Open to Opportunities
            </p>
            
            <h2 className="font-display text-[10vw] md:text-[8vw] leading-[0.8] tracking-tighter text-gradient pb-6">
              LET'S TALK
            </h2>
            
            <p className="mt-8 max-w-xl text-lg md:text-xl text-muted-foreground leading-relaxed">
              Looking for someone to ship product end-to-end? From foundational GenAI features to scalable full-stack applications.
            </p>
            
            <div className="mt-16">
              <Magnetic strength={30}>
                <Link to="/contact" className="relative inline-flex items-center justify-center rounded-full bg-foreground text-background px-12 py-6 text-xl font-medium transition duration-500 hover:scale-105 hover:bg-aurora-1 hover:text-white shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(var(--aurora-1),0.5)]">
                  Start a conversation
                </Link>
              </Magnetic>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
