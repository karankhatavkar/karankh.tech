// Site-level SEO constants — single source for every metadata surface
// (layout metadata, JSON-LD, sitemap, robots).
export const site = {
  url: "https://karankh.tech",
  name: "Karan Khatavkar",
  // ≤60 chars so Google doesn't truncate it in search results.
  title: "Karan Khatavkar — AI/ML Engineer · LLM, RAG & NLP",
  // ~150 chars — full length for the Google SERP snippet.
  description:
    "Karan Khatavkar is an AI/ML engineer building LLM apps, agents, and RAG pipelines with fine-tuned NLP models. Open to freelance and contract work.",
  // ≤125 chars — social cards truncate earlier than search snippets.
  socialDescription:
    "AI/ML engineer building LLM apps, agents, and RAG pipelines. Open to freelance and contract work.",
} as const;
