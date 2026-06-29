import { useState, useCallback, type ReactNode } from "react";
import { Check, Copy } from "lucide-react";

const LANGUAGE_LABELS: Record<string, string> = {
  ts: "TypeScript",
  tsx: "TypeScript",
  js: "JavaScript",
  jsx: "JavaScript",
  py: "Python",
  python: "Python",
  sql: "SQL",
  css: "CSS",
  html: "HTML",
  json: "JSON",
  yaml: "YAML",
  bash: "Bash",
  sh: "Shell",
  dockerfile: "Dockerfile",
  go: "Go",
  rs: "Rust",
  java: "Java",
  cpp: "C++",
  c: "C",
};

const FILENAME_HINTS: Record<string, string> = {
  ts: "page.tsx",
  tsx: "page.tsx",
  js: "index.js",
  py: "agent.py",
  sql: "schema.sql",
  bash: "terminal",
  sh: "terminal",
  dockerfile: "Dockerfile",
  yaml: "config.yaml",
  json: "config.json",
};

export function CodeBlock({
  children,
  className,
  ...props
}: {
  children: ReactNode;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const language = className?.replace("language-", "") || "text";
  const label = FILENAME_HINTS[language] || LANGUAGE_LABELS[language] || language.toUpperCase();

  const handleCopy = useCallback(() => {
    const text = typeof children === "string" ? children : "";
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [children]);

  return (
    <div className="relative group my-8 rounded-xl border border-hairline overflow-hidden bg-[#0d0d12]">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-hairline/50 bg-secondary/30">
        <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
          {label}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-green-400" />
              <span className="text-green-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span className="opacity-0 group-hover:opacity-100 transition-opacity">Copy</span>
            </>
          )}
        </button>
      </div>
      {/* Code content */}
      <pre className="p-4 overflow-x-auto text-sm leading-relaxed m-0 border-0 bg-transparent">
        <code className={className} {...props}>
          {children}
        </code>
      </pre>
    </div>
  );
}
