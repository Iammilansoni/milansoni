import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { ArticleCard } from "@/components/blog/article-card";
import { getAllPosts } from "@/lib/blog";

export function RecentArticles() {
  const getPosts = useServerFn(getAllPosts);
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["all-posts"],
    queryFn: () => getPosts({}),
    staleTime: 1000 * 60 * 30, // 30 mins
  });

  const recentPosts = posts.slice(0, 3); // Display top 3 most recent

  return (
    <section id="articles" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Writing</p>
              <h2 className="mt-3 font-display text-4xl md:text-6xl max-w-3xl">Articles & Insights</h2>
            </div>
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-wider text-muted-foreground hover:text-aurora transition-colors"
            >
              View all articles <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="glass rounded-2xl p-6 h-[400px] animate-pulse" />
            ))
          ) : recentPosts.length > 0 ? (
            recentPosts.map((p, i) => (
              <ArticleCard key={p.slug} article={p} index={i} />
            ))
          ) : (
            <div className="col-span-full glass rounded-2xl p-10 text-center">
              <p className="text-muted-foreground">Articles coming soon.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
