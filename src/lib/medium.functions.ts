import { createServerFn } from "@tanstack/react-start";

export type MediumPost = {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  categories: string[];
};

function stripHtml(s: string) {
  return s
    .replace(/<figure[\s\S]*?<\/figure>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function pick(tag: string, xml: string) {
  const m = xml.match(new RegExp(`<${tag}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>|<${tag}>([\\s\\S]*?)<\\/${tag}>`));
  return (m?.[1] ?? m?.[2] ?? "").trim();
}

export const fetchMediumPosts = createServerFn({ method: "GET" }).handler(
  async (): Promise<MediumPost[]> => {
    const url = "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@milansoni96946";
    try {
      const res = await fetch(url);
      if (!res.ok) {
        console.error(`Medium RSS fetch failed via rss2json: ${res.status} ${res.statusText}`);
        return [];
      }
      
      const json = await res.json();
      if (json.status !== "ok" || !json.items) {
        return [];
      }

      return json.items.slice(0, 9).map((item: any) => ({
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
        description: stripHtml(item.description || item.content).slice(0, 220),
        categories: item.categories || [],
      }));
    } catch (e) {
      console.error("fetchMediumPosts error:", e);
      return [];
    }
  },
);
