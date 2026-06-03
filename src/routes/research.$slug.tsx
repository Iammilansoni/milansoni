import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css"; // We will add a dark style later or rely on this
import { ArrowLeft, Loader2 } from "lucide-react";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/research/$slug")({
  head: () => ({
    meta: [
      { title: "Research Article | Milan Soni" },
      { name: "description", content: "In-depth research and technical insights by Milan Soni on AI and software engineering." },
    ],
  }),
  component: BlogPost,
});

function BlogPost() {
  const { slug } = Route.useParams();
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`/research/${slug}.md`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.text();
      })
      .then((text) => {
        setContent(text);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-aurora-1" />
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <h1 className="font-display text-4xl">Article not found</h1>
        <Link to="/research" className="mt-6 text-aurora-1 hover:underline">← Back to research</Link>
      </div>
    );
  }

  return (
    <article className="relative min-h-screen pb-32">
      <div className="aurora-bg opacity-20" />
      <div className="relative mx-auto max-w-3xl px-6 pt-32">
        <Link to="/research" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Research
        </Link>
        
        <Reveal>
          <div className="mt-16 prose prose-invert prose-lg prose-headings:font-display prose-headings:font-normal prose-a:text-aurora-1 hover:prose-a:text-aurora-2 prose-pre:border prose-pre:border-hairline prose-pre:bg-secondary/50 max-w-none">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
            >
              {content}
            </ReactMarkdown>
          </div>
        </Reveal>
      </div>
    </article>
  );
}
