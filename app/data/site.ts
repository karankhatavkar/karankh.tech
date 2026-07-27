// Site-level SEO constants — single source for every metadata surface
// (layout metadata, JSON-LD, sitemap, robots).
export const site = {
  url: "https://karankh.tech",
  name: "Karan Khatavkar",
  // ≤60 chars so Google doesn't truncate it in search results.
  title: "Karan Khatavkar · RAG & Agentic AI Engineer",
  // ~150 chars — full length for the Google SERP snippet.
  description:
    "Karan Khatavkar is a RAG and agentic AI engineer building RAG systems, AI agents, and AI workflows for clients. Open to freelance and contract work.",
  // ≤125 chars — social cards truncate earlier than search snippets.
  socialDescription:
    "RAG & agentic AI engineer building RAG systems, AI agents, and AI workflows for clients. Open to freelance and contract work.",
  /**
   * Last substantive change to the homepage's *content*, as `YYYY-MM-DD`.
   * Bump it by hand when you edit copy, projects, or experience.
   *
   * It's a constant rather than `new Date()` on purpose: a build-time date
   * tells Google the page changed on every deploy, including deploys that only
   * touched a blog post or a CSS file. Google only honours `lastmod` while it
   * stays accurate, and a feed that cries wolf gets the signal ignored
   * site-wide — including for posts, where it actually matters.
   */
  homeUpdated: "2026-07-27",
  /** Attribution on every X/Twitter card. */
  twitterHandle: "@KhatavkarKaran",
} as const;
