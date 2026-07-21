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
} as const;
