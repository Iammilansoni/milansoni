import { useServerFn } from "@tanstack/react-start";
import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { ArrowLeft, ArrowUpRight, Share2, Twitter, Linkedin, Link as LinkIcon, Check } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/reveal";
import { getPostBySlug } from "@/lib/blog";
import { ReadingProgress } from "@/components/blog/reading-progress";
import { SITE, PROJECTS } from "@/lib/site";
import "highlight.js/styles/atom-one-dark.css";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params, context }) => {
    // This is optional if we use queries, but good for SSR
  },
  head: ({ params }) => {
    // Ideally we would return dynamic meta here, but TanStack Router's head 
    // is tricky with async data in this setup without router context integration.
    // For this implementation, we will use a generic one or render <Meta> in the component if supported.
    return {
      meta: [
        { title: `Article | Milan Soni` },
      ]
    }
  },
  component: ArticlePage,
});

function ArticlePage() {
  const { slug } = Route.useParams();
  const getPost = useServerFn(getPostBySlug);
  
  const { data: article, isLoading } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => getPost({ data: slug } as any),
    staleTime: 1000 * 60 * 30, // 30 mins
  });

  const [copied, setCopied] = useState(false);
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return <div className="min-h-screen pt-32 flex justify-center"><div className="w-10 h-10 border-4 border-aurora border-t-transparent rounded-full animate-spin"></div></div>;
  }

  if (!article) {
    throw notFound();
  }

  const isMedium = article.source === 'medium';
  const relatedProject = article.relatedProjectSlug ? PROJECTS.find(p => p.slug === article.relatedProjectSlug) : null;

  return (
    <>
      <ReadingProgress />
      
      {/* Schema Markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            image: article.coverImage ? `https://milansoni.vercel.app${article.coverImage}` : undefined,
            datePublished: article.publishedAt,
            author: [{
              "@type": "Person",
              name: "Milan Soni",
              url: "https://milansoni.vercel.app/"
            }]
          })
        }}
      />

      <div className="relative min-h-screen pb-32">
        <div className="aurora-bg opacity-30" />
        
        <article className="relative mx-auto max-w-3xl px-6 pt-32">
          <Reveal>
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10 font-mono uppercase tracking-wider">
              <ArrowLeft className="w-4 h-4" /> Back to Articles
            </Link>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-hairline/50 pb-8">
              <div>
                <div className="inline-flex items-center gap-3 text-xs font-mono text-muted-foreground glass px-4 py-2 rounded-full mb-6 border-hairline shadow-elevated">
                  <span>{new Date(article.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                  <span className="w-1 h-1 rounded-full bg-aurora-1" />
                  <span>{article.readingTime}</span>
                  {isMedium && (
                    <>
                      <span className="w-1 h-1 rounded-full bg-aurora-2" />
                      <span className="inline-flex items-center gap-1 text-aurora uppercase tracking-wider font-semibold">
                        Medium
                      </span>
                    </>
                  )}
                </div>

                <h1 className="font-display text-4xl md:text-5xl lg:text-[4rem] leading-[1.1] mb-8 tracking-tight">
                  {article.title}
                </h1>
                
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full overflow-hidden border border-hairline p-0.5 glass">
                    <img src="/ms-logo.png" alt={SITE.name} className="w-full h-full rounded-full object-cover bg-background" />
                  </div>
                  <div>
                    <div className="text-foreground font-medium">{SITE.name}</div>
                    <div className="text-xs text-muted-foreground font-mono">Software Engineer & GenAI Dev</div>
                  </div>
                </div>
              </div>

              {/* Share Buttons */}
              <div className="flex md:flex-col gap-3">
                <a 
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent('https://milansoni.vercel.app/blog/' + article.slug)}`}
                  target="_blank" rel="noreferrer"
                  className="w-10 h-10 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-aurora hover:border-aurora/50 transition-colors"
                  aria-label="Share on Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a 
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent('https://milansoni.vercel.app/blog/' + article.slug)}&title=${encodeURIComponent(article.title)}`}
                  target="_blank" rel="noreferrer"
                  className="w-10 h-10 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-aurora hover:border-aurora/50 transition-colors"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <button 
                  onClick={handleCopyLink}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-aurora hover:border-aurora/50 transition-colors"
                  aria-label="Copy Link"
                >
                  {copied ? <Check className="w-4 h-4 text-green-400" /> : <LinkIcon className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {article.coverImage && (
              <div className="relative mb-16">
                <div className="absolute inset-0 bg-linear-to-tr from-aurora-1 to-aurora-2 blur-3xl opacity-20 transform scale-95 translate-y-4 rounded-full" />
                <div className="relative w-full h-64 md:h-[450px] rounded-3xl overflow-hidden border border-hairline/60 shadow-elevated">
                  <div className="absolute inset-0 bg-background/10 mix-blend-overlay z-10 pointer-events-none" />
                  <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover" />
                </div>
              </div>
            )}
            
            {isMedium && article.mediumUrl && (
              <div className="mb-16 p-8 glass rounded-3xl border-aurora-2/30 border shadow-glow relative overflow-hidden">
                <div className="absolute top-0 right-0 p-32 bg-aurora-2 opacity-10 blur-3xl rounded-full mix-blend-screen pointer-events-none" />
                <h3 className="text-2xl font-display mb-3">This is a Medium Story</h3>
                <p className="text-muted-foreground text-sm mb-8 max-w-lg">
                  This article is natively hosted on Medium. You can read a preview here, or head over to the original publication for the full experience and comments.
                </p>
                <a href={article.mediumUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-full font-medium hover:scale-105 transition-transform">
                  Read Full Article on Medium <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            )}

            <div className="prose prose-invert prose-lg max-w-none 
              prose-headings:font-display prose-headings:font-normal prose-headings:tracking-tight 
              prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:border-b prose-h2:border-hairline/50 prose-h2:pb-4
              prose-h3:text-2xl prose-h3:mt-10 prose-h3:text-aurora-2
              prose-a:text-aurora-1 hover:prose-a:text-aurora-2 prose-a:transition-colors prose-a:underline-offset-4
              prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6
              prose-strong:text-foreground prose-strong:font-medium
              prose-ul:text-muted-foreground prose-ol:text-muted-foreground
              prose-li:marker:text-aurora-1
              prose-blockquote:border-l-2 prose-blockquote:border-aurora-2 prose-blockquote:bg-aurora-2/5 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:text-foreground prose-blockquote:not-italic
              prose-code:text-aurora-3 prose-code:bg-secondary/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-mono prose-code:text-[0.9em] prose-code:before:content-none prose-code:after:content-none
              prose-pre:bg-[#0d0d12] prose-pre:border prose-pre:border-hairline prose-pre:shadow-xl prose-pre:rounded-xl prose-pre:my-8
              prose-img:rounded-2xl prose-img:border prose-img:border-hairline/50 prose-img:shadow-lg
              prose-th:text-foreground prose-th:border-hairline prose-td:border-hairline
            ">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
              >
                {article.content || ""}
              </ReactMarkdown>
            </div>
            
            <div className="mt-12 pt-8 border-t border-hairline flex flex-wrap gap-2">
              <span className="text-sm font-mono text-muted-foreground mr-4 flex items-center">Tags:</span>
              {article.tags.map(tag => (
                <span key={tag} className="text-xs font-mono uppercase tracking-wider text-muted-foreground border border-hairline rounded-full px-3 py-1 bg-secondary/50">
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>
        </article>

        {relatedProject && (
          <div className="max-w-3xl mx-auto px-6 mt-24">
            <Reveal>
              <h3 className="text-xs font-mono uppercase tracking-widest text-aurora-2 mb-6 flex items-center gap-4">
                <span>Featured Project</span>
                <span className="h-px bg-hairline/50 grow" />
              </h3>
              <Link to="/work/$slug" params={{ slug: relatedProject.slug }} className="block glass rounded-3xl p-8 hover:bg-secondary/40 transition-colors group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-24 bg-aurora-1 opacity-5 blur-3xl rounded-full group-hover:opacity-10 transition-opacity" />
                <div className="flex justify-between items-start relative z-10">
                  <div className="max-w-xl">
                    <h4 className="font-display text-3xl group-hover:text-aurora-1 transition-colors">{relatedProject.name}</h4>
                    <p className="text-muted-foreground mt-3 text-sm leading-relaxed">{relatedProject.blurb}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full border border-hairline flex items-center justify-center bg-background group-hover:scale-110 group-hover:border-aurora-1/50 transition-all shrink-0">
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-aurora-1 transition-colors" />
                  </div>
                </div>
              </Link>
            </Reveal>
          </div>
        )}
      </div>
    </>
  );
}
