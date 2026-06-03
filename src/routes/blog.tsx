import { useServerFn } from "@tanstack/react-start";
import { createFileRoute as createRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { fetchMediumPosts } from "@/lib/medium.functions";
import { SITE } from "@/lib/site";

export const Route = createRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Writing | AI & Software Engineering Blog | Milan Soni" },
      { name: "description", content: "Read essays and notes from Milan Soni on AI engineering, RAG, full-stack development, and building production-ready systems." },
      { property: "og:title", content: "Writing | AI & Software Engineering Blog | Milan Soni" },
      { property: "og:description", content: "Read essays and notes from Milan Soni on AI engineering, RAG, full-stack development, and building production-ready systems." },
      { property: "og:url", content: "https://milan-soni-portfolio.vercel.app/blog" },
    ],
    links: [{ rel: "canonical", href: "https://milan-soni-portfolio.vercel.app/blog" }],
  }),
  component: BlogPage,
});

function BlogPage() {
  const getPosts = useServerFn(fetchMediumPosts);
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["medium-posts"],
    queryFn: () => getPosts({}),
    staleTime: 1000 * 60 * 30,
  });

  return (
    <div className="relative">
      <div className="aurora-bg opacity-50" />
      <div className="relative mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Writing</p>
              <h1 className="mt-4 font-display text-5xl md:text-7xl">From the <span className="text-aurora">notebook.</span></h1>
            </div>
            <a href={SITE.socials.medium} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm rounded-full border border-hairline px-4 py-2 hover:bg-secondary transition">
              Follow on Medium <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>

        <div className="mt-16">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="glass rounded-2xl p-6 h-56 animate-pulse" />
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="glass rounded-2xl p-10 text-center">
              <p className="text-muted-foreground">
                Couldn't reach Medium right now. You can browse posts directly on{" "}
                <a href={SITE.socials.medium} target="_blank" rel="noreferrer" className="text-aurora hover:underline">
                  medium.com/@milansoni96946
                </a>
                .
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {posts.map((p, i) => (
                <Reveal key={p.link} delay={Math.min(i * 0.04, 0.3)}>
                  <a href={p.link} target="_blank" rel="noreferrer" className="group block glass rounded-2xl p-6 h-full hover:bg-secondary/60 transition">
                    <p className="text-xs font-mono text-muted-foreground">
                      {p.pubDate ? new Date(p.pubDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Medium"}
                    </p>
                    <h2 className="mt-3 font-display text-xl leading-snug group-hover:text-aurora transition">{p.title}</h2>
                    <p className="mt-3 text-sm text-muted-foreground line-clamp-3">{p.description}</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {p.categories.slice(0, 3).map((c) => (
                        <span key={c} className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground border border-hairline rounded-full px-2 py-0.5">{c}</span>
                      ))}
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
