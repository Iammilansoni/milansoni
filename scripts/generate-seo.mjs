/**
 * Generates sitemap.xml and rss.xml from the content that actually exists,
 * at build time.
 *
 * The point is that publishing is a one-step operation: drop a new markdown
 * file into src/content/blog/ and the next deploy adds it to the sitemap with
 * a correct <lastmod>, adds it to the RSS feed, and pings nothing that needs a
 * human. The previous sitemap was hand-maintained, which means it was wrong
 * the moment anything new shipped — and a stale sitemap is worse than none,
 * because it teaches crawlers your URLs are unreliable.
 *
 * Run automatically via the `build` script.
 */
import { readFileSync, readdirSync, writeFileSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const ORIGIN = "https://milansoni.vercel.app";
const AUTHOR = "Milan Soni";

const esc = (s = "") =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/* ── Blog posts ─────────────────────────────────────────────────────────── */
const blogDir = join(root, "src/content/blog");
const posts = readdirSync(blogDir)
  .filter((f) => f.endsWith(".md"))
  .map((f) => {
    const full = join(blogDir, f);
    const { data } = matter(readFileSync(full, "utf-8"));
    return {
      slug: f.replace(/\.md$/, ""),
      title: data.title ?? f,
      description: data.description ?? "",
      publishedAt: data.publishedAt ? new Date(data.publishedAt) : statSync(full).mtime,
      // File mtime is the honest "last modified" — frontmatter dates say when
      // it was first published, not when it last changed.
      lastmod: statSync(full).mtime,
      categories: data.categories ?? [],
    };
  })
  .sort((a, b) => b.publishedAt - a.publishedAt);

/* ── Project case studies (slugs read straight from the source of truth) ── */
const siteTs = readFileSync(join(root, "src/lib/site.ts"), "utf-8");
const projectSlugs = [...siteTs.matchAll(/^\s{4}slug:\s*"([^"]+)"/gm)].map((m) => m[1]);

/* ── Sitemap ────────────────────────────────────────────────────────────── */
const staticRoutes = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/work", priority: "0.9", changefreq: "monthly" },
  { path: "/blog", priority: "0.9", changefreq: "weekly" },
  { path: "/about", priority: "0.8", changefreq: "monthly" },
  { path: "/experience", priority: "0.7", changefreq: "monthly" },
  { path: "/contact", priority: "0.6", changefreq: "yearly" },
];

const today = new Date().toISOString().slice(0, 10);
const iso = (d) => new Date(d).toISOString().slice(0, 10);

const urls = [
  ...staticRoutes.map(
    (r) => `  <url>
    <loc>${ORIGIN}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  ),
  ...projectSlugs.map(
    (s) => `  <url>
    <loc>${ORIGIN}/work/${s}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
  ),
  ...posts.map(
    (p) => `  <url>
    <loc>${ORIGIN}/blog/${p.slug}</loc>
    <lastmod>${iso(p.lastmod)}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
  ),
];

writeFileSync(
  join(root, "public/sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`
);

/* ── RSS ────────────────────────────────────────────────────────────────── */
const items = posts
  .map(
    (p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${ORIGIN}/blog/${p.slug}</link>
      <guid isPermaLink="true">${ORIGIN}/blog/${p.slug}</guid>
      <description>${esc(p.description)}</description>
      <pubDate>${new Date(p.publishedAt).toUTCString()}</pubDate>
      <dc:creator>${esc(AUTHOR)}</dc:creator>
${(p.categories || []).map((c) => `      <category>${esc(c)}</category>`).join("\n")}
    </item>`
  )
  .join("\n");

writeFileSync(
  join(root, "public/rss.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Milan Soni — AI Engineering Notes</title>
    <link>${ORIGIN}/blog</link>
    <description>Architecture decisions, trade-offs, and measured results from building production RAG pipelines and multi-agent LLM systems.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${ORIGIN}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`
);

console.log(
  `[seo] sitemap: ${urls.length} urls (${posts.length} posts, ${projectSlugs.length} projects) · rss: ${posts.length} items`
);
