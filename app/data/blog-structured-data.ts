import { site } from "./site";
import { personId, websiteId } from "./structured-data";
import { lastTouched, type Post } from "@/lib/blog";

export const blogId = `${site.url}/#blog`;

export function postUrl(slug: string): string {
  return `${site.url}/blog/${slug}`;
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

/**
 * `BlogPosting` for a single post. `author` and `publisher` are `@id`
 * references into the Person node the homepage already publishes, so search
 * and AI engines read every article as more evidence for one entity rather
 * than as an orphaned document.
 */
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
    author: { "@id": personId },
    publisher: { "@id": personId },
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
    author: { "@id": personId },
    publisher: { "@id": personId },
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
