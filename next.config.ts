import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // Lets the MDX loader claim .md/.mdx. Posts live in `content/blog/` rather
  // than `app/`, so this doesn't turn any markdown into a route by itself —
  // `app/blog/[slug]` imports them explicitly.
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  experimental: {
    // Powers the home → /blog route transition (rules in `app/globals.css`).
    // Where the browser lacks the View Transitions API the navigation simply
    // happens without animating — nothing to fall back to.
    viewTransition: true,
  },
  async rewrites() {
    // In dev, proxy /api/* to the local Python twin (uvicorn on :8000) so the
    // browser can talk to it same-origin. In production Vercel serves the
    // api/*.py functions directly, so no rewrite is needed there.
    if (process.env.NODE_ENV !== "development") return [];
    return [
      {
        source: "/api/:path*",
        destination: "http://127.0.0.1:8000/api/:path*",
      },
    ];
  },
};

const withMDX = createMDX({
  options: {
    // Plugins are named as strings, not imported functions. Turbopack is the
    // default bundler as of Next 16 and hands plugin config to Rust, which
    // can't receive JS functions — imported plugins fail there. Options must
    // stay serializable for the same reason.
    //
    // remark-frontmatter only teaches the parser to *recognise* the YAML block
    // so it isn't rendered as body text; `lib/blog.ts` is what reads it.
    remarkPlugins: ["remark-frontmatter", "remark-gfm"],
    // Heading ids, so sections can be deep-linked.
    rehypePlugins: ["rehype-slug"],
  },
});

export default withMDX(nextConfig);
