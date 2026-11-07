export type AboutStat = {
  value: string;
  caption: string;
};

export const about = {
  heading: "About me",
  // The About statement in two speeds: `lead` + `short` are the everyday read;
  // `story` is the origin, tucked behind `storyQuestion` for readers in a hurry.
  lead: "I’m Karan, an AI research engineer. I build RAG systems and agents that get the right answer out of messy data.",
  short:
    "I work calm and methodical. I’d rather spend a few days finding the right approach than rush a wrong one into production. And I don’t think AI replaces people. It’s more like a sharp kid that takes you word for word: genuinely useful when you’re clear with it, a liability when you’re not. So I keep a human in the loop and build systems people can actually check. Off the clock, it’s the gym and coffee, in that order.",
  storyQuestion: "Why I got into this",
  story:
    "I started in electronics. At Vegapod I led the electronics team on a student hyperloop, and at Sisai I worked on pipelines pulling live data off more than a thousand industrial sensors. Both taught me the same thing: collecting data is the easy part. Getting a useful answer out of it is the hard part. Later I saw the same problem everywhere else. Useful information is buried in a policy document no one can find, or it lives only in the head of the one person who actually knows how things work. When they’re out, everyone waits. When they leave, the knowledge goes with them. I grew up around this in India, where a lot still runs on paper and manual sign-offs. That’s what I work on now: RAG systems that pull the right answer out of the mess and cite where it came from, and agents that take the slow, manual document work off people’s plates.",
  // A standard, not a marketing metric — keep it verifiable (DESIGN.md:
  // honest, content-driven numbers).
  stat: {
    value: "100%",
    caption:
      "of answers grounded in retrieved, citable sources — the bar every system I ship has to clear.",
  } satisfies AboutStat,
  points: [
    "3+ years in ML across NLP, imaging, and signals, from real-time sensor data to RAG pipelines and AI agents that hold up in production.",
    "I work end to end: research, build, evals, deployment. Small iterations, honest trade-offs, and results I can show the evidence for.",
  ],
  openSource: {
    eyebrow: "Open source",
    note: "7 projects on GitHub — pipelines, agents, and experiments in the open.",
    href: "https://github.com/karankhatavkar",
  },
};
