export type HeroStat = {
  value: string;
  label: string;
};

export type ExpertiseSegment = {
  text: string;
  muted: boolean;
};

export const hero = {
  rail: "RAG & Agentic AI Engineer",
  year: "2026",
  greeting: "Hey, I’m Karan.",
  // Second display deck — key terms in full ink, connective words muted.
  expertise: [
    { text: "I build ", muted: true },
    { text: "RAG systems", muted: false },
    { text: " & ", muted: true },
    { text: "AI agents.", muted: false },
  ] satisfies ExpertiseSegment[],
  support:
    "— focused on moving RAG from concept to robust, verifiable production tech.",
  // Honest, content-driven numbers — update as facts change (DESIGN.md).
  stats: [
    { value: "3+", label: "years in ML" },
    { value: "1", label: "RAG in production" },
    { value: "7", label: "open-source projects" },
  ] satisfies HeroStat[],
};
