import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "@/components/reveal";
import { AmbientBlobs } from "@/components/ambient-blobs";
import { EXPERIENCE } from "@/lib/site";

export function ExperienceTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative overflow-hidden py-32" ref={containerRef}>
      {/* Section-level ambient blobs — teal/green accent to differ from hero */}
      <AmbientBlobs
        colors={["oklch(0.72 0.18 200)", "oklch(0.70 0.28 295)"]}
        opacity={0.4}
      />
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Experience</p>
          <h2 className="mt-3 font-display text-5xl md:text-7xl max-w-3xl leading-[0.9]">
            Shipping inside <br className="hidden md:block"/>
            <span className="text-aurora">real engineering teams.</span>
          </h2>
        </Reveal>

        <div className="mt-32 relative">
          {/* Background track line */}
          <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-px bg-hairline md:-translate-x-1/2" />
          
          {/* Animated glowing line */}
          <motion.div 
            className="absolute left-[15px] md:left-1/2 top-0 w-px md:-translate-x-1/2 bg-linear-to-b from-aurora-1 via-aurora-2 to-aurora-3 shadow-[0_0_15px_rgba(255,255,255,0.8)] z-10"
            style={{ height: lineHeight }}
          />

          <div className="space-y-24">
            {EXPERIENCE.map((e, i) => (
              <Reveal key={e.company} delay={i * 0.1} className={`relative md:grid md:grid-cols-2 md:gap-16 items-center ${i % 2 ? "md:[&>div:first-child]:order-2" : ""}`}>
                
                {/* Timeline Node */}
                <div className="absolute left-[15px] md:left-1/2 top-0 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-20 flex items-center justify-center">
                  <div className="h-4 w-4 rounded-full bg-background border-2 border-aurora-1" />
                  <motion.div 
                    className="absolute inset-0 rounded-full bg-aurora-2 blur-md"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>

                <div className="pl-12 md:pl-0 md:pr-16 md:text-right">
                  <p className="font-mono text-xs uppercase tracking-widest text-aurora-1">{e.period}</p>
                  <h3 className="mt-3 font-display text-3xl md:text-4xl">{e.company}</h3>
                  <p className="mt-2 text-base text-muted-foreground">{e.role}</p>
                  {"location" in e && (
                    <p className="mt-1 font-mono text-xs text-muted-foreground/60">{(e as any).location}</p>
                  )}
                </div>

                <div className="pl-12 md:pl-16 mt-6 md:mt-0">
                  <div className="glass rounded-4xl p-8 space-y-4 hover:bg-secondary/40 transition duration-500">
                    {e.highlights.map((h, idx) => (
                      <div key={idx} className="flex gap-4">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-aurora-2 shrink-0" />
                        <span className="text-muted-foreground text-sm leading-relaxed">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
