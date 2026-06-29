import { useState, useCallback } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/reveal";
import { type Article } from "@/lib/blog";

export function ArticleCard({ article, index }: { article: Article; index: number }) {
  const isMedium = article.source === "medium";
  const isFeatured = index === 0;

  return (
    <Reveal delay={Math.min(index * 0.04, 0.3)} className={`h-full ${isFeatured ? "md:col-span-2" : ""}`}>
      {isMedium && article.mediumUrl ? (
        <a href={article.mediumUrl} target="_blank" rel="noreferrer" className="block h-full">
          <CardInner article={article} isFeatured={isFeatured} />
        </a>
      ) : (
        <Link to="/blog/$slug" params={{ slug: article.slug }} className="block h-full">
          <CardInner article={article} isFeatured={isFeatured} />
        </Link>
      )}
    </Reveal>
  );
}

function CardInner({ article, isFeatured }: { article: Article; isFeatured: boolean }) {
  const isMedium = article.source === "medium";
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setGlowPos({ x, y });
  }, []);

  return (
    <div
      className={`group relative glass rounded-2xl flex flex-col hover:bg-secondary/60 transition-colors h-full overflow-hidden ${
        isFeatured ? "p-8" : "p-6"
      }`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Animated gradient border for featured card */}
      {isFeatured && (
        <div
          className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10"
          style={{
            background:
              "conic-gradient(from var(--angle, 0deg), oklch(0.70 0.28 295), oklch(0.75 0.24 220), oklch(0.78 0.22 170), oklch(0.70 0.28 295))",
            animation: "spin-border 3s linear infinite",
          }}
        />
      )}

      {/* Mouse-tracking radial glow */}
      {isHovering && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none z-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, oklch(0.70 0.28 295 / 0.12), transparent 60%)`,
          }}
        />
      )}

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center justify-between">
          <p className="text-xs font-mono text-muted-foreground">
            {new Date(article.publishedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
          <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground">
            <span>{article.readingTime}</span>
            {isMedium && (
              <span className="inline-flex items-center gap-1 bg-black text-white px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-semibold border border-white/20">
                Medium <ArrowUpRight className="w-3 h-3" />
              </span>
            )}
          </div>
        </div>

        {/* Proof-of-Work badges */}
        {article.badges && article.badges.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {article.badges.map((badge) => (
              <span
                key={badge.label}
                className="inline-flex items-center gap-1.5 text-[10px] font-mono text-aurora-3 bg-aurora-3/10 border border-aurora-3/20 rounded-full px-2.5 py-1"
              >
                <span className="text-muted-foreground">{badge.label}</span>
                <span className="text-aurora-3 font-medium">{badge.value}</span>
              </span>
            ))}
          </div>
        )}

        {article.coverImage && (
          <div className={`mt-4 overflow-hidden rounded-xl border border-hairline ${isFeatured ? "h-64" : "h-48"}`}>
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}

        <h3
          className={`mt-4 font-display leading-snug group-hover:text-aurora transition-colors ${
            isFeatured ? "text-2xl md:text-3xl" : "text-xl"
          }`}
        >
          {article.title}
        </h3>

        <p className="mt-3 text-sm text-muted-foreground line-clamp-3 grow">
          {article.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-hairline/50">
          {article.categories.slice(0, 3).map((c) => (
            <span
              key={c}
              className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground border border-hairline rounded-full px-2 py-0.5"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
