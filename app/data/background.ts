export type SpineNode = {
  /** The loud anchor: the start year, sized as the biggest thing on the card so
   *  position along the track reads as *time*, not rank. `01…05` is gone — a
   *  numbered marker read as "item N of a list", which is exactly the flow the
   *  track failed to convey. */
  year: string;
  /** Precise span under the year — `April 2026 – Now`. Small mono; the year does
   *  the scanning, this does the detail. */
  range: string;
  /** The single live stop. Badges as `NOW` with a pulse, and anchors the whole
   *  track's "you are here" so the rest reads as steps back from it. The Master's
   *  runs alongside the current role, and Sisai overlaps the MIT-WPU degree;
   *  only the headline present activity (the current role) badges as NOW. */
  now?: boolean;
  /** One-word concept — the mono kicker beside the year. */
  kicker: string;
  /** The plain, buyer-legible heading. Capability, never a job title. */
  label: string;
  /** What capability this bought, in Karan's own voice. The line that converts. */
  claim: string;
  /** The résumé entry, demoted to a footnote — role · org · place. */
  place: string;
  /** Concrete technical artifacts (and, on the Amdocs stop, the Azure certs). */
  chips: string[];
};

// The spine, newest first, on a dated axis: the start year leads each stop and
// the track header labels the direction (Now → Earlier). Experience + Education
// collapse into these five stops: capability is the headline, the résumé entry
// is the footnote. The timing chains MIT-WPU → Amdocs → Master's → current role,
// with Sisai and the Master's overlapping their neighbours.
export const spine: SpineNode[] = [
  {
    year: "2026",
    range: "Oct 2026 – Now",
    now: true,
    kicker: "Research",
    label: "AI Research Engineer",
    claim:
      "Full-time on RAG systems and AI agents: researching what works, building it, and wiring in evals that show whether it actually does.",
    place: "AI Research Engineer · Pune",
    chips: ["RAG", "AI agents", "LangGraph", "evals", "agent guardrails"],
  },
  {
    year: "2025",
    range: "Jan 2025 – Present",
    kicker: "Foundations",
    label: "Master’s in AI",
    claim:
      "Going under the hood of the models: architecture, how they actually work, and how to modify them. Deep learning and data science, studied while I ship.",
    place: "M.S. Ramaiah Univ. · GPA 9.6",
    chips: ["LLM architecture", "Transformers", "deep learning", "data science"],
  },
  {
    year: "2022",
    range: "July 2022 – Jan 2025",
    kicker: "Retrieval",
    label: "RAG in production",
    claim:
      "Shipped RAG that held up with real users: hybrid search plus a query-rephrasing step that fixed multi-turn context loss.",
    place: "Software Developer · Amdocs · Pune",
    chips: ["RAG", "LangChain", "FAISS", "BM25 hybrid", "AZ-900", "AI-900", "DP-900"],
  },
  {
    year: "2022",
    range: "Jan 2022 – June 2022",
    kicker: "Pipelines",
    label: "Real-time data pipelines",
    claim:
      "Made streaming sensor data trustworthy: telemetry from 1,000+ industrial sensors, ingested and monitored live.",
    place: "Project Intern · Sisai · Pune",
    chips: ["IIoT", "InfluxDB", "Z-score detection"],
  },
  {
    year: "2018",
    range: "Aug 2018 – July 2022",
    kicker: "Signals",
    label: "Hardware & signals",
    claim:
      "Led the electronics team at Vegapod, a student hyperloop project, on control systems.",
    place: "B.Tech ECE · MIT-WPU · Pune",
    chips: ["hyperloop", "control systems", "DSP"],
  },
];

export const backgroundTrack = {
  eyebrow: "Background",
};
