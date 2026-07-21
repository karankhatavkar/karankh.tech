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
    "Built, evaluated, and handed over so your team can run it without me.",
  // Honest, content-driven numbers — update as facts change (DESIGN.md).
  stats: [
    { value: "3+", label: "yrs shipping AI" },
    { value: "9.6", label: "GPA · Master’s in AI" },
  ] satisfies HeroStat[],
};
