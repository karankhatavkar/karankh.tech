import type { MetadataRoute } from "next";
import { site } from "@/app/data/site";
import { getAllPosts, lastTouched } from "@/lib/blog";

// Regenerated on every build, so publishing a post is one commit: the file
// lands, the build runs, the post appears here. Nothing to copy by hand.
export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  return [
    {
      url: site.url,
      lastModified: site.homeUpdated,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${site.url}/blog`,
      // The index genuinely changes whenever its newest post does.
      lastModified: posts.length > 0 ? lastTouched(posts[0]) : site.homeUpdated,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: `${site.url}/blog/${post.slug}`,
      lastModified: lastTouched(post),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
