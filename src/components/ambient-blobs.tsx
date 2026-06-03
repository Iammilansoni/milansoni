import { useRef, useEffect } from "react";

interface AmbientBlobsProps {
  /** Override blob colors — defaults to your aurora palette */
  colors?: [string, string, string?];
  /** Overall opacity multiplier */
  opacity?: number;
  className?: string;
}

/**
 * Wibify-style slowly drifting radial light blobs.
 * Pure CSS — zero JS runtime cost after mount.
 * Each blob has its own random drift path so they never look mechanical.
 */
export function AmbientBlobs({
  colors = ["oklch(0.70 0.28 295)", "oklch(0.75 0.24 220)", "oklch(0.78 0.22 170)"],
  opacity = 1,
  className = "",
}: AmbientBlobsProps) {
  return (
    <div
      aria-hidden="true"
      className={`ambient-blobs pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ opacity }}
    >
      <div className="blob blob-1" style={{ background: colors[0] }} />
      <div className="blob blob-2" style={{ background: colors[1] }} />
      {colors[2] && <div className="blob blob-3" style={{ background: colors[2] }} />}
    </div>
  );
}
