import { motion } from "framer-motion";
import { Reveal } from "@/components/reveal";
import { TECH_STACK } from "@/lib/site";

const RINGS = Object.entries(TECH_STACK);

export function TechOrbit() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 py-28">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              The stack
            </p>
            <h2 className="mt-3 font-display text-4xl md:text-6xl">
              A toolkit tuned for <span className="text-aurora">AI-native</span> products.
            </h2>
            <p className="mt-6 text-muted-foreground max-w-lg">
              I move fluidly across the stack — from React Server Components on the
              edge to FastAPI microservices, vector databases, and agentic
              orchestration layers.
            </p>

            <div className="mt-8 grid gap-4">
              {RINGS.map(([group, items]) => (
                <div key={group} className="border-t border-hairline pt-4">
                  <div className="flex items-baseline justify-between">
                    <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{group}</span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {items.map((it) => (
                      <span key={it} className="text-sm px-3 py-1 rounded-full glass">{it}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative aspect-square w-full max-w-[520px] mx-auto">
              <div className="absolute inset-0 rounded-full aurora-bg" />
              {/* central node */}
              <div className="absolute inset-0 grid place-items-center">
                <div className="glass rounded-2xl px-4 py-3 text-center">
                  <div className="font-display text-2xl">Milan</div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">core</div>
                </div>
              </div>
              {RINGS.map(([group, items], ringIdx) => {
                const radius = 110 + ringIdx * 60;
                const duration = 30 + ringIdx * 10;
                return (
                  <motion.div
                    key={group}
                    className="absolute inset-0"
                    animate={{ rotate: ringIdx % 2 ? -360 : 360 }}
                    transition={{ duration, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="absolute inset-0 rounded-full border border-hairline" style={{ margin: `calc(50% - ${radius}px)` }} />
                    {items.map((label, i) => {
                      const angle = (i / items.length) * Math.PI * 2;
                      const x = Math.cos(angle) * radius;
                      const y = Math.sin(angle) * radius;
                      return (
                        <motion.div
                          key={label}
                          animate={{ rotate: ringIdx % 2 ? 360 : -360 }}
                          transition={{ duration, repeat: Infinity, ease: "linear" }}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                          style={{ transform: `translate(${x}px, ${y}px)` }}
                        >
                          <span className="block whitespace-nowrap rounded-full glass px-2.5 py-1 text-[11px] font-mono -translate-x-1/2 -translate-y-1/2">
                            {label}
                          </span>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
