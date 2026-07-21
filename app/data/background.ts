export type SpineNode = {
  /** The loud anchor: the start year, sized as the biggest thing on the card so
   *  position along the track reads as *time*, not rank. `01…05` is gone — a
   *  numbered marker read as "item N of a list", which is exactly the flow the
   *  track failed to convey. */
  year: string;
  /** Precise span under the year — `Jan 2025 – Now`. Small mono; the year does
   *  the scanning, this does the detail. */
  range: string;
  /** The single live stop. Badges as `NOW` with a pulse, and anchors the whole
   *  track's "you are here" so the rest reads as steps back from it. Nodes 01/02
   *  and 04/05 overlap in real time; only the headline present activity is now. */
  now?: boolean;
  /** One-word concept — the mono kicker beside the year. */
  kicker: string;
  /** The plain, buyer-legible heading. Capability, never a job title. */
  label: string;
  /** What capability this bought. The only new copy on the track, and the line
   *  that does the converting. */
  claim: string;
  /** The résumé entry, demoted to a footnote — role · org · place. */
  place: string;
  /** Concrete technical artifacts. */
  chips: string[];
};

// The spine, newest first, now on a dated axis: the start year leads each stop
// and the track header labels the direction (Now → Earlier). Experience +
// Education collapse into these five stops: capability is the headline, the
// résumé entry is the footnote.
//
// ⚠️ PLACEHOLDER COPY. Every `claim` is a draft sized to be roughly the right
// length so the layout can be judged — none of it is Karan's voice yet, and
// DESIGN.md is explicit that copy here must not read as an AI-generated
// feature triad. Rewrite before this ships.
export const spine: SpineNode[] = [
  {
    year: "2025",
    range: "Jan 2025 – Now",
    now: true,
    kicker: "Agents",
    label: "RAG & agents for clients",
    claim:
      "Independent practice: scoping, build, evals, handover — RAG pipelines and agentic systems a client's team can run without me.",
    place: "Independent · Bengaluru",
    chips: ["evals", "handover"],
  },
  {
    year: "2025",
    range: "Jan 2025 – Present",
    // Open: "Research" may overclaim for a taught M.Tech. Alternatives worth a
    // look — "Foundations", "Theory", "Study".
    kicker: "Research",
    label: "M.Tech in AI & ML",
    claim:
      "Formal grounding under the practice — the theory behind the systems, taken while shipping them.",
    place: "M.S. Ramaiah Univ. · GPA 9.4",
    chips: ["deep learning", "NLP"],
  },
  {
    year: "2022",
    range: "Aug 2022 – Jan 2025",
    kicker: "Retrieval",
    label: "RAG in production",
    claim:
      "Shipped retrieval that survived real users: hybrid search, and a rephrasing step that fixed multi-turn context loss through UAT.",
    place: "Software Developer · Amdocs · Pune",
    chips: ["LangChain", "FAISS", "BM25 hybrid"],
  },
  {
    year: "2021",
    range: "2021 – 2022",
    kicker: "Pipelines",
    label: "Real-time data pipelines",
    claim:
      "Made streaming data trustworthy at scale — telemetry from 1,000+ industrial sensors, ingested and monitored live.",
    place: "Project Intern · Sisai · Pune",
    chips: ["InfluxDB", "Z-score detection"],
  },
  {
    year: "2018",
    range: "2018 – 2022",
    kicker: "Signals",
    label: "Hardware & signals",
    claim:
      "The systems view starts at the physical layer: signals, noise, and why data is messy long before anyone stores it.",
    place: "B.Tech ECE · MIT-WPU · Pune",
    chips: ["DSP", "signal processing"],
  },
];

export const backgroundTrack = {
  eyebrow: "Background",
  /** Certifications are fundamentals-tier, so they hang off the track rather
   *  than taking a stop of their own. */
  certifications: "Certified · AZ-900 · AI-900 · DP-900",
};
