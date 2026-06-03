export function AuroraBackground({ className = "" }: { className?: string }) {
  return (
    <div className={`aurora-bg noise ${className}`} aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, color-mix(in oklab, var(--primary) 18%, transparent), transparent 60%)",
        }}
      />
    </div>
  );
}
