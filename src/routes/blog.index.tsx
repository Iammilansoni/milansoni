import { useServerFn } from "@tanstack/react-start";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SITE } from "@/lib/site";
import { getAllPosts } from "@/lib/blog";
import { ArticleCard } from "@/components/blog/article-card";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Articles & Insights | Milan Soni" },
      { name: "description", content: "Thoughts on Software Engineering, Full Stack Development, AI, GenAI, RAG Systems, Career Growth, and Real-World Projects." },
      { property: "og:title", content: "Articles & Insights | Milan Soni" },
      { property: "og:description", content: "Thoughts on Software Engineering, Full Stack Development, AI, GenAI, RAG Systems, Career Growth, and Real-World Projects." },
      { property: "og:url", content: "https://milansoni.vercel.app/blog" },
    ],
    links: [{ rel: "canonical", href: "https://milansoni.vercel.app/blog" }],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const getPosts = useServerFn(getAllPosts);
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["all-posts"],
    queryFn: () => getPosts({}),
    staleTime: 1000 * 60 * 30, // 30 minutes
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const allCategories = useMemo(() => {
    const cats = new Set<string>();
    posts.forEach(p => p.categories.forEach(c => cats.add(c)));
    return Array.from(cats);
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        post.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory ? post.categories.includes(selectedCategory) : true;
      
      return matchesSearch && matchesCategory;
    });
  }, [posts, searchQuery, selectedCategory]);

  return (
    <div className="relative min-h-screen">
      <div className="aurora-bg opacity-40" />
      <div className="relative mx-auto max-w-6xl px-6 py-32">
        <Reveal>
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-widest text-aurora">Writing</p>
            <h1 className="mt-4 font-display text-5xl md:text-7xl">Articles & <span className="text-muted-foreground">Insights</span></h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Thoughts on Software Engineering, Full Stack Development, AI, GenAI, RAG Systems, Career Growth, and Real-World Projects.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative max-w-md w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search articles..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-secondary/50 border border-hairline rounded-full pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:border-aurora transition-colors"
              />
            </div>
            
            <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 scrollbar-none">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-colors border ${selectedCategory === null ? 'bg-foreground text-background border-foreground' : 'bg-transparent border-hairline text-muted-foreground hover:border-aurora'}`}
              >
                All
              </button>
              {allCategories.map(c => (
                <button
                  key={c}
                  onClick={() => setSelectedCategory(c)}
                  className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-colors border ${selectedCategory === c ? 'bg-foreground text-background border-foreground' : 'bg-transparent border-hairline text-muted-foreground hover:border-aurora'}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-16">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="glass rounded-2xl p-6 h-[400px] animate-pulse" />
              ))}
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="glass rounded-2xl p-10 text-center">
              <p className="text-muted-foreground">
                No articles found matching your criteria.
              </p>
              <button 
                onClick={() => { setSearchQuery(""); setSelectedCategory(null); }}
                className="mt-4 text-sm text-aurora hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((p, i) => (
                <ArticleCard key={p.slug} article={p} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
