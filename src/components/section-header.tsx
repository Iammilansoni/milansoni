import { type ReactNode } from "react";
import { Reveal } from "@/components/reveal";

/**
 * The one section header used across the site. Numbering ([01], [02], …) was
 * previously applied inconsistently — present on two sections, absent on the
 * rest — so it read as decoration rather than structure.
 */
export function SectionHeader({
  index,
  kicker,
  title,
  lead,
}: {
  index: number;
  kicker: string;
  title: ReactNode;
  lead?: ReactNode;
}) {
  return (
    <Reveal>
      <p className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
        <span className="text-accent">[{String(index).padStart(2, "0")}]</span>
        {kicker}
      </p>
      <h2 className="mt-4 max-w-3xl font-display text-display text-foreground">{title}</h2>
      {lead && <p className="mt-5 max-w-2xl text-lead text-muted-foreground">{lead}</p>}
    </Reveal>
  );
}
