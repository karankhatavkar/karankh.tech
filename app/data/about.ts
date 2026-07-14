export type AboutStat = {
  value: string;
  caption: string;
};

export const about = {
  heading: "About me",
  intro:
    "I turn messy, unstructured data into LLM systems clients can trust — RAG pipelines that cite their sources, and agents that do real work with them. Most of my time goes into the unglamorous parts: chunking, retrieval quality, and evals. That’s where the difference between a demo and a product lives.",
  // A standard, not a marketing metric — keep it verifiable (DESIGN.md:
  // honest, content-driven numbers).
  stat: {
    value: "100%",
    caption:
      "of answers grounded in retrieved, citable sources — the bar every system I ship has to clear.",
  } satisfies AboutStat,
  points: [
    "3+ years in ML across NLP, imaging, and signals — now focused on RAG pipelines and AI agents that hold up in production.",
    "I work with clients end to end: scoping, build, evals, deployment. Small iterations, honest trade-offs, and a handover your team can run.",
  ],
  openSource: {
    eyebrow: "Open source",
    note: "7 projects on GitHub — pipelines, agents, and experiments in the open.",
    href: "https://github.com/karankhatavkar",
  },
};
