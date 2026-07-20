export type SpineNode = {
  /** Recency index — `01` is *now*. Reads as rank, not chronology: the track
   *  runs newest first, and nodes 04/05 actually overlap in time. */
  index: string;
  /** One-word concept — the mono kicker above the label. */
  kicker: string;
  /** The plain, buyer-legible heading. Capability, never a job title. */
  label: string;
  /** What capability this bought. The only new copy on the track, and the line
   *  that does the converting. */
  claim: string;
  /** The résumé entry, demoted to a footnote. One line per row. */
  evidence: string[];
  /** Concrete technical artifacts. */
  chips: string[];
};

// The spine, newest first. Experience + Education collapse into these five
// stops: capability is the headline, the résumé entry is the footnote.
//
// ⚠️ PLACEHOLDER COPY. Every `claim` is a draft sized to be roughly the right
// length so the layout can be judged — none of it is Karan's voice yet, and
// DESIGN.md is explicit that copy here must not read as an AI-generated
// feature triad. Rewrite before this ships.
export const spine: SpineNode[] = [
  {
    index: "01",
    kicker: "Agents",
    label: "RAG & agents for clients",
    claim:
      "Independent practice: scoping, build, evals, handover — RAG pipelines and agentic systems a client's team can run without me.",
    evidence: ["Independent · Bengaluru", "'25 → now"],
    chips: ["evals", "handover"],
  },
  {
    index: "02",
    // Open: "Research" may overclaim for a taught M.Tech. Alternatives worth a
    // look — "Foundations", "Theory", "Study".
    kicker: "Research",
    label: "M.Tech in AI & ML",
    claim:
      "Formal grounding under the practice — the theory behind the systems, taken while shipping them.",
    evidence: ["M.S. Ramaiah Univ. · Bengaluru", "'25 → present · GPA 9.4"],
    chips: ["deep learning", "NLP"],
  },
  {
    index: "03",
    kicker: "Retrieval",
    label: "RAG in production",
    claim:
      "Shipped retrieval that survived real users: hybrid search, and a rephrasing step that fixed multi-turn context loss through UAT.",
    evidence: ["Software Developer · Amdocs", "Pune · '22–25"],
    chips: ["LangChain", "FAISS", "BM25 hybrid"],
  },
  {
    index: "04",
    kicker: "Pipelines",
    label: "Real-time data pipelines",
    claim:
      "Made streaming data trustworthy at scale — telemetry from 1,000+ industrial sensors, ingested and monitored live.",
    evidence: ["Project Intern · Sisai", "Pune · '21–22"],
    chips: ["InfluxDB", "Z-score detection"],
  },
  {
    index: "05",
    kicker: "Signals",
    label: "Hardware & signals",
    claim:
      "The systems view starts at the physical layer: signals, noise, and why data is messy long before anyone stores it.",
    evidence: ["B.Tech Electronics & Comm.", "MIT-WPU · Pune · '18–22"],
    chips: ["DSP", "signal processing"],
  },
];

export const backgroundTrack = {
  eyebrow: "Background",
  /** Certifications are fundamentals-tier, so they hang off the track rather
   *  than taking a stop of their own. */
  certifications: "Certified · AZ-900 · AI-900 · DP-900",
};
