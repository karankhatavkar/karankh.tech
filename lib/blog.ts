import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

// The blog's content layer: one MDX file per post, frontmatter as the single
// source of truth. Everything downstream — the index, the post page's
// metadata, the sitemap, the RSS feed, the share card — reads from here, so
// publishing a post is exactly one file and one commit.
//
// This module only ever runs at build time. Every route that calls it is
// prerendered (`generateStaticParams` + `dynamicParams = false` on the post
// page, `force-static` on the feed), so `fs` is never touched by a request in
// production and the content directory never has to ship to the server.

const POSTS_DIR = path.join(process.cwd(), "content/blog");

export type Post = {
  slug: string;
  title: string;
  /** Doubles as the meta description and the index card's summary. */
  description: string;
  /** Publication date, `YYYY-MM-DD`. */
  date: string;
  /** Last substantive edit. Drives sitemap `lastmod`; absent means unedited. */
  updated?: string;
  tags: string[];
  readingMinutes: number;
};

/**
 * YAML parses an unquoted `2026-08-02` into a Date at UTC midnight, but a
 * quoted one stays a string. Normalise both to `YYYY-MM-DD` — slicing the ISO
 * string keeps the date the author typed instead of letting the local timezone
 * shift it a day backwards.
 */
function normaliseDate(value: unknown, slug: string, field: string): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}/.test(value)) {
    return value.slice(0, 10);
  }
  throw new Error(
    `content/blog/${slug}.mdx: "${field}" must be a YYYY-MM-DD date, got ${JSON.stringify(value)}`
  );
}

function requireString(value: unknown, slug: string, field: string): string {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(
      `content/blog/${slug}.mdx: frontmatter is missing a non-empty "${field}"`
    );
  }
  return value.trim();
}

/** ~200 wpm is the usual reading-speed estimate for prose. */
function readingMinutes(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function parse(slug: string): Post {
  const raw = fs.readFileSync(path.join(POSTS_DIR, `${slug}.mdx`), "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: requireString(data.title, slug, "title"),
    description: requireString(data.description, slug, "description"),
    date: normaliseDate(data.date, slug, "date"),
    updated:
      data.updated === undefined
        ? undefined
        : normaliseDate(data.updated, slug, "updated"),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    readingMinutes: readingMinutes(content),
  };
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".mdx"))
    // A leading underscore marks a draft: it stays in the repo but is invisible
    // to the router, the sitemap, and the feed.
    .filter((file) => !file.startsWith("_"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

/** Newest first — the order the index and the feed both want. */
export function getAllPosts(): Post[] {
  return getPostSlugs()
    .map(parse)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): Post | undefined {
  return getPostSlugs().includes(slug) ? parse(slug) : undefined;
}

/** The date a post was last meaningfully touched — what `lastmod` should say. */
export function lastTouched(post: Post): string {
  return post.updated ?? post.date;
}

export function formatPostDate(date: string): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
