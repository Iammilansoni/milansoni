import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Reveal } from "@/components/reveal";
import { ArticleCard } from "@/components/blog/article-card";
import type { Article } from "@/lib/blog";

/* ─── Static recent articles (guaranteed to render) ─── */
const STATIC_RECENT: Article[] = [
  {
    slug: "building-multi-agent-ai",
    title: "How I Built a Production-Grade Multi-Agent AI System That Won a National Hackathon — and What It Taught Me About Real-World GenAI",
    description:
      "I built MiningNiti — an AI document intelligence platform for India's coal mining industry — using a multi-agent architecture, RAG-powered chat, and async background processing.",
    publishedAt: "2024-03-12T00:00:00Z",
    readingTime: "25 min read",
    categories: ["AI", "GenAI", "Software Engineering"],
    tags: ["LangChain", "FastAPI", "Next.js", "RAG"],
    source: "local",
    coverImage: "/miningniti-dashboard.png",
    relatedProjectSlug: "miningniti",
  },
  {
    slug: "i-built-and-shipped-many-ai-agents-heres-the-uncomfortable-truth-about-agentic-ai",
    title: "I Built & Shipped 10+ AI Agents. Here Is the Uncomfortable Truth About the Hype.",
    description:
      "After shipping over 10 AI agents in production, I have hard-earned lessons about what the hype gets wrong. Here is what actually matters when building real-world AI systems.",
    publishedAt: "2025-12-30T10:36:53Z",
    readingTime: "8 min read",
    categories: ["llm", "ai-agent", "software-development"],
    tags: ["llm", "ai-agent", "software-development"],
    source: "medium",
    mediumUrl:
      "https://medium.com/techtrends-digest/i-built-and-shipped-many-ai-agents-heres-the-uncomfortable-truth-about-agentic-ai-8936ca31c44e",
  },
  {
    slug: "the-ai-tools-that-will-actually-matter-in-2026-from-a-cs-student-building-real-projects",
    title: "The AI Tools That Will Actually Matter in 2026 (From a CS Student Building Real Projects)",
    description:
      "Not every AI tool earns a place in your workflow. As a CS student building production projects, here are the tools I keep coming back to and why they stand out.",
    publishedAt: "2025-12-25T12:50:38Z",
    readingTime: "6 min read",
    categories: ["generative-ai-tools", "software-development", "full-stack"],
    tags: ["generative-ai-tools", "software-development", "full-stack"],
    source: "medium",
    mediumUrl:
      "https://medium.com/@milansoni96946/the-ai-tools-that-will-actually-matter-in-2026-from-a-cs-student-building-real-projects-9738974469d6",
  },
];

export function RecentArticles() {
  const [posts, setPosts] = useState<Article[]>(STATIC_RECENT);

  // Try to upgrade with live data from the user's browser
  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        const res = await fetch(
          "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@milansoni96946",
          { signal: controller.signal },
        );
        if (!res.ok) return;
        const json = await res.json();
        if (json.status === "ok" && json.items?.length) {
          const live: Article[] = json.items.slice(0, 2).map((item: any) => {
            const slug = item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
            return {
              slug,
              title: item.title.replace(/&amp;/g, "&"),
              description: (item.description || "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim().slice(0, 220),
              publishedAt: item.pubDate,
              readingTime: "5 min read",
              categories: item.categories || [],
              tags: item.categories || [],
              source: "medium" as const,
              mediumUrl: item.link.split("?")[0],
            };
          });
          // Local article first, then 2 live Medium articles
          setPosts([STATIC_RECENT[0], ...live]);
        }
      } catch {
        // keep static
      }
    })();
    return () => controller.abort();
  }, []);

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
          {posts.slice(0, 3).map((p, i) => (
            <ArticleCard key={p.slug} article={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
