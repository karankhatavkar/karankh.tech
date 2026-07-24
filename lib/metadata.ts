import type { Metadata } from "next";
import { profile } from "@/app/data/profile";
import { site } from "@/app/data/site";

type SocialCardInput = {
  title: string;
  description: string;
  /** Route-relative, e.g. `/blog`. `metadataBase` makes it absolute. */
  url: string;
  /** Present for articles; omitted for ordinary pages. */
  article?: {
    publishedTime: string;
    modifiedTime: string;
    tags: string[];
  };
};

/**
 * Builds a page's `openGraph` + `twitter` metadata.
 *
 * Next **replaces** these objects when a route defines them — it does not merge
 * them with the root layout's. A page that sets only `{ title, description }`
 * therefore silently drops `siteName`, `locale`, the `@creator` handle, and
 * `summary_large_image`, which downgrades its share preview to a small
 * thumbnail. Routing every page's card through here keeps those attached.
 */
export function socialCard({
  title,
  description,
  url,
  article,
}: SocialCardInput): Pick<Metadata, "openGraph" | "twitter"> {
  return {
    openGraph: {
      type: article ? "article" : "website",
      url,
      siteName: site.name,
      locale: "en_US",
      title,
      description,
      ...(article && {
        publishedTime: article.publishedTime,
        modifiedTime: article.modifiedTime,
        authors: [profile.name],
        tags: article.tags,
      }),
    },
    twitter: {
      card: "summary_large_image",
      creator: site.twitterHandle,
      title,
      description,
    },
  };
}
