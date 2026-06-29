import { createServerFn } from "@tanstack/react-start";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { fetchMediumPosts } from "./medium.functions";

export type Article = {
  slug: string;
  title: string;
  description: string;
  content?: string;
  coverImage?: string;
  publishedAt: string;
  readingTime: string;
  categories: string[];
  tags: string[];
  source: 'local' | 'medium';
  mediumUrl?: string;
  relatedProjectSlug?: string;
  badges?: { label: string; value: string }[];
};

// Ensure path works on server side
const CONTENT_DIR = path.join(process.cwd(), "src/content/blog");

export const getLocalPosts = createServerFn({ method: "GET" }).handler(
  async (): Promise<Article[]> => {
    try {
      if (!fs.existsSync(CONTENT_DIR)) {
        return [];
      }
      const files = fs.readdirSync(CONTENT_DIR);
      const markdownFiles = files.filter((fn) => fn.endsWith(".md") || fn.endsWith(".mdx"));

      const posts: Article[] = markdownFiles.map((fileName) => {
        const slug = fileName.replace(/\.mdx?$/, "");
        const filePath = path.join(CONTENT_DIR, fileName);
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const { data, content } = matter(fileContent);
        
        const stats = readingTime(content);

        return {
          slug,
          title: data.title || slug,
          description: data.description || "",
          content,
          coverImage: data.coverImage,
          publishedAt: data.publishedAt || new Date().toISOString(),
          readingTime: stats.text,
          categories: data.categories || [],
          tags: data.tags || [],
          source: 'local',
          relatedProjectSlug: data.relatedProjectSlug,
        };
      });

      return posts;
    } catch (e) {
      console.error("Error reading local posts", e);
      return [];
    }
  }
);

export const getPostBySlug = createServerFn({ method: "GET" })
  .handler(async ({ data: slug }: { data: string }): Promise<Article | null> => {
    // Check local posts first
    const localPosts = await getLocalPosts({});
    const localPost = localPosts.find((p) => p.slug === slug);
    if (localPost) return localPost;

    // If not found locally, maybe it's a medium post.
    // We fetch medium posts and try to match the slug
    const mediumPostsRaw = await fetchMediumPosts({});
    const mediumPost = mediumPostsRaw.find((p) => {
      // create a crude slug from medium title or use part of url
      const mSlug = p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      return mSlug === slug;
    });

    if (mediumPost) {
      const stats = readingTime(mediumPost.description || "");
      const mSlug = mediumPost.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      return {
        slug: mSlug,
        title: mediumPost.title,
        description: mediumPost.description,
        content: `> This article was originally published on Medium.\n\n${mediumPost.description}\n\n[Read the full article on Medium](${mediumPost.link})`,
        publishedAt: mediumPost.pubDate,
        readingTime: stats.text,
        categories: mediumPost.categories || [],
        tags: mediumPost.categories || [],
        source: 'medium',
        mediumUrl: mediumPost.link,
      };
    }

    return null;
  });

export const getAllPosts = createServerFn({ method: "GET" }).handler(
  async (): Promise<Article[]> => {
    const localPosts = await getLocalPosts({});
    const mediumPostsRaw = await fetchMediumPosts({});

    const mediumPosts: Article[] = mediumPostsRaw.map((p) => {
      const slug = p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      const stats = readingTime(p.description || "");
      return {
        slug,
        title: p.title,
        description: p.description,
        publishedAt: p.pubDate,
        readingTime: stats.text, // medium desc reading time is short, but we don't have full body
        categories: p.categories || [],
        tags: p.categories || [],
        source: 'medium',
        mediumUrl: p.link,
      };
    });

    const allPosts = [...localPosts, ...mediumPosts];

    // Sort by date descending
    allPosts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

    return allPosts;
  }
);
