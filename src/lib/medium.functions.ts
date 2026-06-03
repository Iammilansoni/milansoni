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
    const url = "https://medium.com/feed/@milansoni96946";
    try {
      const res = await fetch(url, {
        headers: { "User-Agent": "Mozilla/5.0 (compatible; MilanSoniSite/1.0)" },
      });
      if (!res.ok) return [];
      const xml = await res.text();
      const items = xml.split("<item>").slice(1).map((chunk) => {
        const item = "<item>" + chunk.split("</item>")[0] + "</item>";
        const title = pick("title", item);
        const link = pick("link", item);
        const pubDate = pick("pubDate", item);
        const descRaw = pick("content:encoded", item) || pick("description", item);
        const description = stripHtml(descRaw).slice(0, 220);
        const cats = Array.from(item.matchAll(/<category><!\[CDATA\[([\s\S]*?)\]\]><\/category>/g)).map((m) => m[1]);
        return { title, link, pubDate, description, categories: cats };
      });
      return items.slice(0, 9);
    } catch {
      return [];
    }
  },
);
