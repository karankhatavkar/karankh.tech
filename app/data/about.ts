export type AboutStat = {
  value: string;
  caption: string;
};

export const about = {
  heading: "About me",
  // The About statement in two speeds: `lead` + `short` are the everyday read;
  // `story` is the origin, tucked behind `storyQuestion` for readers in a hurry.
  lead: "I’m Karan, a RAG and agentic AI engineer. I help teams get unstuck from their own documents.",
  short:
    "I work calm and methodical. I’d rather spend a few days finding the right approach than rush a wrong one into production. And I don’t think AI replaces people. It’s more like a sharp kid that takes you word for word: genuinely useful when you’re clear with it, a liability when you’re not. So I keep a human in the loop and hand over systems a team can actually run. Off the clock, it’s the gym and coffee, in that order.",
  storyQuestion: "Why I got into this",
  story:
    "Useful information gets stuck, and once you notice it you see it everywhere. It’s buried in a policy document no one can find, or it lives only in the head of the one person who actually knows how things work. When they’re out, everyone waits. When they leave, the knowledge goes with them. I grew up around this in India, where a lot still runs on paper and manual sign-offs, but it shows up everywhere, whether that’s a courtroom or a corner shop. That’s what I build against: RAG systems that pull the right answer out of the mess and cite where it came from, and agents that take the slow, manual document work off people’s plates.",
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
