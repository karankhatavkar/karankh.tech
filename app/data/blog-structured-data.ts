import { site } from "./site";
import { personId, websiteId } from "./structured-data";
import { lastTouched, type Post } from "@/lib/blog";

export const blogId = `${site.url}/#blog`;

export function postUrl(slug: string): string {
  return `${site.url}/blog/${slug}`;
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
    // Dates are authored as plain YYYY-MM-DD; schema.org wants ISO 8601, and
    // a bare date is valid ISO 8601.
    datePublished: post.date,
    dateModified: lastTouched(post),
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
      datePublished: post.date,
    })),
  };
}
