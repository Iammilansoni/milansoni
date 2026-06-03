import { Counter } from "@/components/counter";
import { Reveal } from "@/components/reveal";
import { STATS } from "@/lib/site";

export function StatsStrip() {
  return (
    <section className="relative border-y border-hairline bg-card/30">
      <div className="mx-auto max-w-7xl px-6 py-14 grid grid-cols-2 md:grid-cols-5 gap-8">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.05} className="text-center">
            <div className="font-display text-4xl md:text-5xl text-aurora">
              <Counter value={s.value} />
            </div>
            <div className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">
              {s.label}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
