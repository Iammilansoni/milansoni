import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { Search } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { ArticleCard } from "@/components/blog/article-card";
import type { Article } from "@/lib/blog";

/* ─── Static articles (always available, no server function needed) ─── */
const STATIC_ARTICLES: Article[] = [
  {
    slug: "building-multi-agent-ai",
    title: "How I Built a Production-Grade Multi-Agent AI System That Won a National Hackathon — and What It Taught Me About Real-World GenAI",
    description:
      "I built MiningNiti — an AI document intelligence platform for India's coal mining industry — using a multi-agent architecture, RAG-powered chat, and async background processing. Here's every technical and architectural decision that got us there.",
    publishedAt: "2024-03-12T00:00:00Z",
    readingTime: "25 min read",
    categories: ["AI", "GenAI", "Software Engineering"],
    tags: ["LangChain", "FastAPI", "Next.js", "RAG"],
    source: "local",
    coverImage: "/miningniti-dashboard.png",
    relatedProjectSlug: "miningniti",
  },
  {
    slug: "hybrid-rag-pipeline-zero-cost",
    title: "Stop Overpaying for Vector DBs: Building a Production-Ready Hybrid RAG Pipeline for $0/Month",
    description:
      "I replaced Pinecone and Weaviate with pgvector on Supabase's free tier and built a hybrid search pipeline combining BM25 + cosine similarity with Reciprocal Rank Fusion. Here's the architecture, the code, and the gotchas nobody talks about.",
    publishedAt: "2026-06-29T00:00:00Z",
    readingTime: "12 min read",
    categories: ["AI", "RAG", "PostgreSQL"],
    tags: ["pgvector", "Hybrid Search", "RRF", "Supabase"],
    source: "local",
    coverImage: "/Hybrid RAG Pipeline.png",
    relatedProjectSlug: "miningniti",
    badges: [
      { label: "Cost", value: "$0/mo" },
      { label: "Retrieval", value: "92% acc" },
      { label: "Latency", value: "~120ms" },
    ],
  },
  {
    slug: "langgraph-multi-agent-state-machine",
    title: "The State Machine Paradigm: Why I Ditched Linear LLM Chains for LangGraph Multi-Agent Workflows",
    description:
      "LangChain's sequential chains broke down the moment I needed 6 AI agents to collaborate, retry on failure, and share state. LangGraph's state machine model gave me explicit control over agent orchestration.",
    publishedAt: "2026-06-29T00:00:00Z",
    readingTime: "14 min read",
    categories: ["AI", "Agents", "LangGraph"],
    tags: ["LangGraph", "Multi-Agent", "State Machine", "FastAPI"],
    source: "local",
    coverImage: "/LangGraph.png",
    relatedProjectSlug: "miningniti",
    badges: [
      { label: "Agents", value: "6 parallel" },
      { label: "Reliability", value: "98.7%" },
      { label: "Speed", value: "3.2s total" },
    ],
  },
  {
    slug: "rsc-streaming-llms-nextjs",
    title: "RSC + Streaming LLMs: Designing a Zero-Latency AI Dashboard with Next.js Server Actions",
    description:
      "Server Components eliminate the waterfall. Streaming responses eliminate the waiting. Combined, they create AI dashboards that feel instant even when the backend is calling multiple LLM providers.",
    publishedAt: "2026-06-29T00:00:00Z",
    readingTime: "13 min read",
    categories: ["AI", "Next.js", "Performance"],
    tags: ["React Server Components", "Streaming", "Server Actions"],
    source: "local",
    coverImage: "/RSC Streaming.png",
    relatedProjectSlug: "miningniti",
    badges: [
      { label: "TTFB", value: "120ms" },
      { label: "JS Bundle", value: "-40%" },
      { label: "Perceived", value: "<500ms" },
    ],
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
  {
    slug: "vibe-coding-is-dead-i-learned-this-instead-and-it-changed-everything",
    title: "Vibe Coding Is Dead. I Learned This Instead (And It Changed Everything)",
    description:
      'I stopped "vibing" through code and started engineering deliberately. Here is the mindset shift that separated my side projects from production-grade software.',
    publishedAt: "2025-12-25T12:12:21Z",
    readingTime: "5 min read",
    categories: ["web-development", "artificial-intelligence", "software-development"],
    tags: ["web-development", "artificial-intelligence", "software-development"],
    source: "medium",
    mediumUrl:
      "https://medium.com/@milansoni96946/vibe-coding-is-dead-i-learned-this-instead-and-it-changed-everything-16189bb2c5d9",
  },
  {
    slug: "complete-guide-to-building-a-production-ready-travel-booking-website-with-next-js",
    title: "Complete Guide to Building a Production-Ready Travel Booking Website with Next.js",
    description:
      "A comprehensive walkthrough of building a full-stack travel booking platform with Next.js, covering auth, payments, real-time availability, and deployment.",
    publishedAt: "2025-08-03T16:21:37Z",
    readingTime: "10 min read",
    categories: ["nextjs", "full-stack", "react", "web-development"],
    tags: ["nextjs", "full-stack", "react", "web-development"],
    source: "medium",
    mediumUrl:
      "https://medium.com/@milansoni96946/complete-guide-to-building-a-production-ready-travel-booking-website-with-next-js-5851d42f387e",
  },
];

function stripHtml(s: string) {
  return s
    .replace(/<figure[\s\S]*?<\/figure>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

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
  const [posts, setPosts] = useState<Article[]>(STATIC_ARTICLES);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Client-side fetch — runs from the user's browser, no Vercel IP blocking
  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        const res = await fetch(
          "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@milansoni96946",
          { signal: controller.signal },
        );
        if (!res.ok) throw new Error(`RSS fetch failed: ${res.status}`);
        const json = await res.json();
        if (json.status === "ok" && json.items?.length) {
          const live: Article[] = json.items.map((item: any) => {
            const slug = item.title
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)/g, "");
            return {
              slug,
              title: item.title.replace(/&amp;/g, "&"),
              description: stripHtml(item.description || item.content || "").slice(0, 220),
              publishedAt: item.pubDate,
              readingTime: `${Math.max(1, Math.ceil(stripHtml(item.content || "").split(/\s+/).length / 200))} min read`,
              categories: item.categories || [],
              tags: item.categories || [],
              source: "medium" as const,
              mediumUrl: item.link.split("?")[0], // strip tracking params
            };
          });
          // Keep local articles, replace Medium articles with live data
          const localArticles = STATIC_ARTICLES.filter(a => a.source === "local");
          const merged = [...localArticles, ...live];
          merged.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
          setPosts(merged);
        }
        // If fetch fails or returns empty, STATIC_ARTICLES remains
      } catch {
        // silently keep static articles
      } finally {
        setIsLoading(false);
      }
    })();
    return () => controller.abort();
  }, []);

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
              {Array.from({ length: 4 }).map((_, i) => (
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
