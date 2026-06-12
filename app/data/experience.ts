export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  highlights: string[];
};

export const experience: Experience[] = [
  {
    company: "Amdocs Development Centre",
    role: "Software Developer",
    period: "Aug 2022 – Jan 2025",
    location: "Pune",
    highlights: [
      "Built a LangChain RAG pipeline for technical-support queries; dynamic chunking cut token usage and improved accuracy on internal docs.",
      "Fixed multi-turn context loss with a question-rephrasing step (rewrites follow-ups from history before FAISS retrieval); held up through UAT.",
      "Built a dashboard to trace retrieval failures and tune BM25 hybrid-search weights, cutting hallucinated answers.",
    ],
  },
  {
    company: "Sisai Technologies Pvt. Ltd.",
    role: "Project Intern",
    period: "Mar–Jun 2021 & Oct 2021–May 2022",
    location: "Pune",
    highlights: [
      "InfluxDB pipeline ingesting real-time telemetry from 1,000+ industrial sensors.",
      "Automated sensor-fault detection with Z-score anomaly detection.",
      "React dashboard with role-based access for operational data and sensor health.",
    ],
  },
];
