import { createFileRoute } from "@tanstack/react-router";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/llms")({
  head: () => ({
    meta: [
      { name: "description", content: "Machine-readable profile for AI agents — Milan Soni's full portfolio data." },
      { property: "og:title", content: "LLM Profile — Milan Soni" },
      { property: "og:description", content: "AI-readable profile for ChatGPT, Claude, Gemini, and other AI agents." },
    ],
  }),
  component: LlmsPage,
});

function LlmsPage() {
  return (
    <div className="relative mx-auto max-w-3xl px-6 py-24">
      <div className="aurora-bg" />
      <div className="relative">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          AI Agent Profile
        </p>
        <h1 className="mt-3 font-display text-4xl text-aurora">
          llms.txt
        </h1>
        <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
          This page provides a machine-readable profile for AI agents.
          Paste the direct link below into ChatGPT, Claude, Gemini, or Cursor
          and ask it to read the file:
        </p>

        <div className="mt-6 rounded-xl border border-hairline bg-secondary/50 p-4">
          <p className="font-mono text-xs text-muted-foreground mb-2">Direct link for AI agents:</p>
          <code className="block break-all text-sm text-aurora-1">
            https://milansoni.vercel.app/llms.txt
          </code>
          <p className="mt-2 font-mono text-xs text-muted-foreground mb-2">Full version (with detailed content):</p>
          <code className="block break-all text-sm text-aurora-1">
            https://milansoni.vercel.app/llms-full.txt
          </code>
        </div>

        <div className="mt-8 rounded-xl border border-hairline bg-secondary/30 p-5">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3">
            How to use
          </p>
          <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
            <li>
              Copy the direct link above
            </li>
            <li>
              Paste it into ChatGPT, Claude, Gemini, or Cursor
            </li>
            <li>
              Ask: <span className="text-foreground font-medium">"Read this file and tell me about this person"</span>
            </li>
          </ol>
          <p className="mt-4 text-xs text-muted-foreground/60">
            Or ask the AI: <span className="font-mono text-foreground/80">"Fetch https://milansoni.vercel.app/llms.txt and summarize it"</span>
          </p>
        </div>

        <div className="mt-10">
          <h2 className="font-display text-xl text-aurora mb-4">Quick Profile</h2>
          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="flex gap-2">
              <span className="text-foreground font-medium w-24 shrink-0">Name</span>
              <span>{SITE.name}</span>
            </div>
            <div className="flex gap-2">
              <span className="text-foreground font-medium w-24 shrink-0">Role</span>
              <span>AI Engineer & Full Stack Developer</span>
            </div>
            <div className="flex gap-2">
              <span className="text-foreground font-medium w-24 shrink-0">Focus</span>
              <span>RAG pipelines, multi-agent AI systems, scalable enterprise platforms</span>
            </div>
            <div className="flex gap-2">
              <span className="text-foreground font-medium w-24 shrink-0">Award</span>
              <span>SIH 2023 National Winner (Coal India & CMPDI)</span>
            </div>
            <div className="flex gap-2">
              <span className="text-foreground font-medium w-24 shrink-0">Email</span>
              <a href={`mailto:${SITE.email}`} className="text-aurora-1 hover:underline">{SITE.email}</a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-hairline">
          <p className="text-xs text-muted-foreground/50">
            This page follows the{" "}
            <a
              href="https://llmstxt.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground/70"
            >
              llms.txt
            </a>{" "}
            convention for making website content accessible to AI agents.
          </p>
        </div>
      </div>
    </div>
  );
}
