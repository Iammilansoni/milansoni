import { Reveal } from "@/components/reveal";
import { motion } from "framer-motion";
import { Tilt } from "@/components/ui/tilt";
import { AmbientBlobs } from "@/components/ambient-blobs";

const QUOTES = [
  { quote: "Milan ships at the level of a senior engineer. He understands both the product and the model.", name: "Engineering Lead", role: "nTheta Works" },
  { quote: "Rare combination of full-stack craft and applied AI judgement. He'd be a force in any startup.", name: "Mentor", role: "Industry Reviewer" },
  { quote: "Took a vague problem and shipped a usable, production-grade AI system inside a week.", name: "Project Sponsor", role: "OBG Outsourcing" },
];

export function Testimonials() {
  // Duplicate quotes to ensure seamless infinite scrolling
  const items = [...QUOTES, ...QUOTES, ...QUOTES, ...QUOTES];

  return (
    <section className="relative overflow-hidden py-28">
      <AmbientBlobs
        colors={["oklch(0.75 0.22 285)", "oklch(0.78 0.22 170)"]}
        opacity={0.4}
      />
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Signals</p>
          <h2 className="mt-3 font-display text-4xl md:text-6xl max-w-3xl">What people say.</h2>
        </Reveal>
      </div>

      <div 
        className="mt-16 flex overflow-hidden relative"
        style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}
      >
        <motion.div
          className="flex gap-6 pr-6 w-max"
          animate={{ x: ["0%", "-25%"] }} // Shift by exactly one full set of QUOTES
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 35,
          }}
        >
          {items.map((q, i) => (
            <div key={i} className="w-[320px] md:w-[480px] shrink-0 py-8">
              <Tilt className="block h-full">
                <figure className="glass rounded-4xl p-8 md:p-10 h-full flex flex-col group relative overflow-hidden transition-all duration-700 hover:shadow-[0_0_40px_-10px_rgba(var(--aurora-1),0.3)] hover:border-aurora-1/30 hover:bg-secondary/20">
                  <div className="absolute -inset-24 bg-linear-to-br from-aurora-1/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl pointer-events-none" />
                  
                  <blockquote className="font-display text-2xl md:text-3xl leading-snug relative z-10 group-hover:text-white transition-colors duration-500">"{q.quote}"</blockquote>
                  <figcaption className="pt-6 border-t border-hairline mt-auto relative z-10 group-hover:border-aurora-1/20 transition-colors duration-500">
                    <div className="text-base font-medium text-foreground group-hover:text-aurora-2 transition-colors duration-500">{q.name}</div>
                    <div className="text-sm text-muted-foreground">{q.role}</div>
                  </figcaption>
                </figure>
              </Tilt>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
