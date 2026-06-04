import { createServerFn } from "@tanstack/react-start";

export type MediumPost = {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  categories: string[];
};

// Static fallback — always shown if live fetch fails (Vercel blocks Medium/rss2json IPs)
const STATIC_POSTS: MediumPost[] = [
  {
    title: "I Built & Shipped 10+ AI Agents. Here Is the Uncomfortable Truth About the Hype.",
    link: "https://medium.com/techtrends-digest/i-built-and-shipped-many-ai-agents-heres-the-uncomfortable-truth-about-agentic-ai-8936ca31c44e",
    pubDate: "2025-12-30 10:36:53",
    description:
      "After shipping over 10 AI agents in production, I have hard-earned lessons about what the hype gets wrong. Here is what actually matters when building real-world AI systems.",
    categories: ["llm", "ai-agent", "software-development", "artificalintelligence", "startups"],
  },
  {
    title: "The AI Tools That Will Actually Matter in 2026 (From a CS Student Building Real Projects)",
    link: "https://medium.com/@milansoni96946/the-ai-tools-that-will-actually-matter-in-2026-from-a-cs-student-building-real-projects-9738974469d6",
    pubDate: "2025-12-25 12:50:38",
    description:
      "Not every AI tool earns a place in your workflow. As a CS student building production projects, here are the tools I keep coming back to and why they stand out.",
    categories: ["generative-ai-tools", "software-development", "full-stack", "mern-stack"],
  },
  {
    title: "Vibe Coding Is Dead. I Learned This Instead (And It Changed Everything)",
    link: "https://medium.com/@milansoni96946/vibe-coding-is-dead-i-learned-this-instead-and-it-changed-everything-16189bb2c5d9",
    pubDate: "2025-12-25 12:12:21",
    description:
      "I stopped \"vibing\" through code and started engineering deliberately. Here is the mindset shift that separated my side projects from production-grade software.",
    categories: ["web-development", "artificial-intelligence", "software-development", "generative-ai-tools"],
  },
  {
    title: "Complete Guide to Building a Production-Ready Travel Booking Website with Next.js",
    link: "https://medium.com/@milansoni96946/complete-guide-to-building-a-production-ready-travel-booking-website-with-next-js-5851d42f387e",
    pubDate: "2025-08-03 16:21:37",
    description:
      "A comprehensive walkthrough of building a full-stack travel booking platform with Next.js, covering auth, payments, real-time availability, and deployment.",
    categories: ["nextjs", "full-stack", "react", "web-development"],
  },
];

function stripHtml(s: string | undefined | null) {
  if (!s) return "";
  return s
    .replace(/<figure[\s\S]*?<\/figure>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export const fetchMediumPosts = createServerFn({ method: "GET" }).handler(
  async (): Promise<MediumPost[]> => {
    const url =
      "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@milansoni96946";
    try {
      const res = await fetch(url, {
        headers: { "User-Agent": "Mozilla/5.0 (compatible; MilanSoniSite/1.0)" },
        signal: AbortSignal.timeout(5000), // 5 second timeout
      });
      if (!res.ok) {
        console.error(`Medium RSS fetch failed: ${res.status} ${res.statusText}`);
        return STATIC_POSTS;
      }

      const json = await res.json();
      if (json.status !== "ok" || !json.items || json.items.length === 0) {
        return STATIC_POSTS;
      }

      return json.items.slice(0, 9).map((item: any) => ({
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
        description: stripHtml(item.description || item.content).slice(0, 220),
        categories: item.categories || [],
      }));
    } catch (e) {
      console.error("fetchMediumPosts error, falling back to static posts:", e);
      return STATIC_POSTS;
    }
  },
);
