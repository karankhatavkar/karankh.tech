import type { MetadataRoute } from "next";
import { site } from "@/app/data/site";

// Everything is public — including AI crawlers (GPTBot, ClaudeBot,
// PerplexityBot, …): being citable in AI answers is part of the SEO strategy.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
