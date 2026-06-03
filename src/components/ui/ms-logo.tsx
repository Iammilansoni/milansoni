import { cn } from "@/lib/utils";

/**
 * MS Monogram Logo.
 *
 * Uses the hand-generated calligraphic PNG image for pixel-perfect
 * handwritten look in the nav and footer. Falls back to the SVG
 * for small favicon-level renders.
 */
export function MSLogo({ className, size = 36 }: { className?: string; size?: number }) {
  return (
    <span
      className={cn("inline-flex items-center justify-center shrink-0 overflow-hidden rounded-sm", className)}
      style={{ width: size, height: size }}
    >
      <img
        src="/ms-logo.png"
        alt="MS monogram"
        width={size}
        height={size}
        className="object-contain w-full h-full"
        draggable={false}
      />
    </span>
  );
}

/**
 * MSLogoSVG — pure inline SVG calligraphic monogram.
 * Used for favicon-level sizes or when an image cannot be loaded.
 */
export function MSLogoSVG({ className, size = 32 }: { className?: string; size?: number }) {
  const uid = "ms-svg";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 110 72"
      width={size}
      height={Math.round(size * 0.655)}
      fill="none"
      aria-label="MS"
      role="img"
      className={cn("shrink-0", className)}
    >
      <defs>
        <linearGradient id={`${uid}-g`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#c084fc" />
          <stop offset="50%"  stopColor="#818cf8" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
        <filter id={`${uid}-glow`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g filter={`url(#${uid}-glow)`} stroke={`url(#${uid}-g)`} strokeLinecap="round" strokeLinejoin="round" fill="none">
        {/* M — italic script with thick/thin variation via multiple strokes */}
        {/* Thin entry hairline */}
        <path d="M 8,60 C 8,50 9,36 11,20 C 12,12 13,7 14,5" strokeWidth="1.4" />
        {/* Thick first downstroke */}
        <path d="M 14,5 C 17,18 19,34 20,50 C 21,56 21,60 22,63" strokeWidth="5.5" />
        {/* Thin valley connector */}
        <path d="M 22,63 C 23,55 25,42 28,28" strokeWidth="1.4" />
        {/* Thin upstroke to second peak */}
        <path d="M 28,28 C 30,18 32,10 34,5" strokeWidth="1.4" />
        {/* Thick second downstroke */}
        <path d="M 34,5 C 37,18 39,34 40,50 C 41,56 42,60 42,63" strokeWidth="5.5" />

        {/* Connecting stroke M → S (thin flowing curve) */}
        <path d="M 42,63 C 46,56 50,44 54,30 C 56,22 58,14 60,8" strokeWidth="1.4" />

        {/* S upper curve — moderate thickness */}
        <path d="M 60,8 C 62,5 66,4 70,5 C 74,6 76,10 74,14 C 72,17 68,18 64,17" strokeWidth="3.8" />
        {/* S middle crossover — thin hairline */}
        <path d="M 64,17 C 61,18 59,22 61,26" strokeWidth="1.3" />
        {/* S lower body — thick */}
        <path d="M 61,26 C 65,29 71,32 75,37 C 79,42 77,50 72,56 C 67,61 60,62 55,58" strokeWidth="4.2" />
        {/* S exit tail — thin */}
        <path d="M 55,58 C 53,56 52,53 53,50" strokeWidth="1.3" />
      </g>
    </svg>
  );
}
