import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/reveal";
import { type Article } from "@/lib/blog";

export function ArticleCard({ article, index }: { article: Article; index: number }) {
  const isMedium = article.source === 'medium';
  
  const content = (
    <div className="group glass rounded-2xl p-6 flex flex-col hover:bg-secondary/60 transition-colors h-full">
      <div className="flex items-center justify-between">
        <p className="text-xs font-mono text-muted-foreground">
          {new Date(article.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
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
      
      {article.coverImage && (
        <div className="mt-4 overflow-hidden rounded-xl h-48 w-full border border-hairline">
          <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
      )}

      <h3 className="mt-4 font-display text-xl leading-snug group-hover:text-aurora transition-colors">
        {article.title}
      </h3>
      
      <p className="mt-3 text-sm text-muted-foreground line-clamp-3 grow">
        {article.description}
      </p>
      
      <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-hairline/50">
        {article.categories.slice(0, 3).map((c) => (
          <span key={c} className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground border border-hairline rounded-full px-2 py-0.5">
            {c}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <Reveal delay={Math.min(index * 0.04, 0.3)} className="h-full">
      {isMedium && article.mediumUrl ? (
        <a href={article.mediumUrl} target="_blank" rel="noreferrer" className="block h-full">
          {content}
        </a>
      ) : (
        <Link to="/blog/$slug" params={{ slug: article.slug }} className="block h-full">
          {content}
        </Link>
      )}
    </Reveal>
  );
}
