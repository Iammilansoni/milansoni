import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { type Article } from "@/lib/blog";

export function ArticleCard({ article, index }: { article: Article; index: number }) {
  const isMedium = article.source === "medium";
  const isFeatured = index === 0;

  return (
    <Reveal
      delay={Math.min(index * 0.04, 0.3)}
      className={`h-full ${isFeatured ? "md:col-span-2" : ""}`}
    >
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

/**
 * The featured card lays out horizontally so the extra width does something —
 * previously it spanned two columns but kept the same vertical stack, leaving a
 * wide, half-empty card. Pointer tracking is handled by SpotlightCard, which
 * writes CSS variables directly; the old version called setState on every
 * mousemove and re-rendered the card continuously while hovered.
 */
function CardInner({ article, isFeatured }: { article: Article; isFeatured: boolean }) {
  const isMedium = article.source === "medium";

  return (
    <SpotlightCard className="h-full rounded-xl">
      <article
        className={`card-hover group relative flex h-full flex-col overflow-hidden rounded-xl border border-hairline bg-card shadow-[var(--shadow-elevated)] ${
          isFeatured ? "md:grid md:grid-cols-12 md:gap-0" : ""
        }`}
      >
        {article.coverImage && (
          <div
            className={`overflow-hidden border-hairline ${
              isFeatured
                ? "border-b md:col-span-5 md:h-full md:border-b-0 md:border-r"
                : "border-b"
            }`}
          >
            <img
              src={article.coverImage}
              alt=""
              loading="lazy"
              className={`w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] ${
                isFeatured ? "h-56 md:h-full md:min-h-[19rem]" : "h-44"
              }`}
            />
          </div>
        )}

        <div
          className={`flex flex-1 flex-col ${isFeatured ? "p-7 md:col-span-7 md:p-9" : "p-6"} ${
            article.coverImage ? "" : "pt-6"
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-mono text-xs text-muted-foreground">
              {new Date(article.publishedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
            <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground">
              <span>{article.readingTime}</span>
              {isMedium && (
                <span className="inline-flex items-center gap-1 rounded-full border border-hairline px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                  Medium <ArrowUpRight className="h-3 w-3" />
                </span>
              )}
            </div>
          </div>

          {article.badges && article.badges.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {article.badges.map((badge) => (
                <span
                  key={badge.label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-accent/[0.07] px-2.5 py-1 font-mono text-[10px]"
                >
                  <span className="text-muted-foreground">{badge.label}</span>
                  <span className="font-medium text-accent">{badge.value}</span>
                </span>
              ))}
            </div>
          )}

          <h3
            className={`mt-4 font-display leading-snug text-foreground transition-colors group-hover:text-accent ${
              isFeatured ? "text-2xl md:text-[2rem] md:leading-[1.15]" : "text-xl"
            }`}
          >
            {article.title}
          </h3>

          <p
            className={`mt-3 grow text-sm leading-relaxed text-muted-foreground ${
              isFeatured ? "line-clamp-4 md:text-base" : "line-clamp-3"
            }`}
          >
            {article.description}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-hairline pt-4">
            {article.categories.slice(0, 3).map((c) => (
              <span
                key={c}
                className="rounded-full border border-hairline px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
              >
                {c}
              </span>
            ))}
            <span className="ml-auto inline-flex items-center gap-1 text-xs font-medium text-foreground transition-colors group-hover:text-accent">
              Read
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>
      </article>
    </SpotlightCard>
  );
}
