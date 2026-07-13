export type HeroStat = {
  value: string;
  label: string;
};

export const hero = {
  rail: "RAG & Agentic AI Engineer",
  year: "2026",
  greeting: "Hello",
  introLead: "It's Karan.",
  introRest: "I build RAG systems and AI agents that hold up in production.",
  // Honest, content-driven numbers — update as facts change (DESIGN.md).
  stats: [
    { value: "3+", label: "years in ML" },
    { value: "1", label: "RAG in production" },
    { value: "7", label: "open-source projects" },
  ] satisfies HeroStat[],
};
