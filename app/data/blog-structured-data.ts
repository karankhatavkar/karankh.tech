import { site } from "./site";
import { profile } from "./profile";
import { personId, websiteId } from "./structured-data";
import { lastTouched, type Post } from "@/lib/blog";

export const blogId = `${site.url}/#blog`;

export function postUrl(slug: string): string {
  return `${site.url}/blog/${slug}`;
}

/**
 * A blog post's `author`/`publisher` and the homepage's `Person` node live in
 * separate documents, so a per-page structured-data parser (Google's Rich
 * Results Test included) never crosses pages to resolve a bare `@id`
 * reference the way Google's own Knowledge Graph does over time. Keeping the
 * `@id` is still what ties every post back to the *same* entity; inlining
 * `name`/`url` alongside it just makes this document self-sufficient too,
 * rather than dropping the reference and describing a second, unlinked
 * Karan.
 */
function personRef() {
  return { "@id": personId, name: profile.name, url: site.url };
}

/**
 * Posts are authored with a plain `YYYY-MM-DD` date (no time-of-day is
 * tracked). A bare date is valid ISO 8601, but Google's structured-data
 * parser wants a full datetime with a timezone offset and flags anything
 * short of that as invalid — so pin the unknown time-of-day to midnight UTC
 * rather than emit a date it can't parse. Same convention the RSS feed's
 * `rfc822()` helper already uses on the same underlying strings.
 */
function toIsoDateTime(date: string): string {
  return `${date}T00:00:00Z`;
}

/** `BlogPosting` for a single post. */
export function blogPostingSchema(post: Post) {
  const url = postUrl(post.slug);

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#post`,
    url,
    mainEntityOfPage: url,
    headline: post.title,
    description: post.description,
    datePublished: toIsoDateTime(post.date),
    dateModified: toIsoDateTime(lastTouched(post)),
    author: personRef(),
    publisher: personRef(),
    isPartOf: { "@id": blogId },
    image: `${url}/opengraph-image`,
    keywords: post.tags.join(", "),
    inLanguage: "en",
  };
}

/** The index page's node — ties the collection to the site and the author. */
export function blogSchema(posts: Post[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": blogId,
    url: `${site.url}/blog`,
    name: `Writing — ${site.name}`,
    description:
      "Field notes on building RAG systems, AI agents, and AI workflows that survive production.",
    author: personRef(),
    publisher: personRef(),
    isPartOf: { "@id": websiteId },
    inLanguage: "en",
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      "@id": `${postUrl(post.slug)}#post`,
      url: postUrl(post.slug),
      headline: post.title,
      datePublished: toIsoDateTime(post.date),
    })),
  };
}
