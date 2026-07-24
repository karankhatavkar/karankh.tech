import { site } from "@/app/data/site";
import { profile } from "@/app/data/profile";
import { getAllPosts, lastTouched } from "@/lib/blog";

// Prerendered at build time rather than served per request. Route handlers are
// dynamic by default, which would mean reading `content/` from the filesystem
// inside a serverless function — files that aren't traced into the bundle.
// `force-static` keeps the feed a build artefact, like the sitemap.
export const dynamic = "force-static";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** RSS requires RFC 822 dates; posts carry a bare YYYY-MM-DD. */
function rfc822(date: string): string {
  return new Date(`${date}T00:00:00Z`).toUTCString();
}

export function GET() {
  const posts = getAllPosts();
  const feedUrl = `${site.url}/blog/feed.xml`;

  const items = posts
    .map((post) => {
      const url = `${site.url}/blog/${post.slug}`;
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${rfc822(post.date)}</pubDate>
      <dc:creator>${escapeXml(profile.name)}</dc:creator>
${post.tags.map((tag) => `      <category>${escapeXml(tag)}</category>`).join("\n")}
    </item>`;
    })
    .join("\n");

  const lastBuild = posts.length > 0 ? rfc822(lastTouched(posts[0])) : undefined;

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(`Writing — ${site.name}`)}</title>
    <link>${site.url}/blog</link>
    <description>${escapeXml("Field notes on building RAG systems, AI agents, and AI workflows that survive production.")}</description>
    <language>en</language>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
${lastBuild ? `    <lastBuildDate>${lastBuild}</lastBuildDate>` : ""}
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
