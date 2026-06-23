export type Project = {
  name: string;
  description: string;
  tech: string[];
  href: string;
};

export type FeaturedProject = {
  name: string;
  eyebrow: string;
  tagline: string;
  summary: string;
  capabilities: { label: string; detail: string }[];
  tech: string[];
  liveHref: string;
  sourceHref: string;
};

// The flagship RAG build — given featured treatment above the projects grid.
export const featuredProject: FeaturedProject = {
  name: "EdgarBrief",
  eyebrow: "Featured · RAG system",
  tagline: "Grounded retrieval over a corpus of SEC 10-K filings.",
  summary:
    "An analyst-facing assistant for querying SEC filings in plain English. Every answer is generated only from retrieved passages and cites the filing it came from — and when the corpus can't support a question, it says so instead of guessing.",
  capabilities: [
    {
      label: "Hybrid retrieval",
      detail:
        "pgvector semantic search and Postgres full-text search, fused with Reciprocal Rank Fusion.",
    },
    {
      label: "Grounded by design",
      detail:
        "Every claim cites a retrieved passage; the system refuses when the corpus can't support an answer.",
    },
    {
      label: "Structure-aware chunking",
      detail:
        "Heading-anchored and token-bounded, with atomic handling for 10-K financial tables.",
    },
    {
      label: "Typed agent",
      detail:
        "PydanticAI orchestration with bounded retrieval tools, streamed to the browser.",
    },
  ],
  tech: ["Python", "FastAPI", "PydanticAI", "pgvector", "Gemini", "Supabase"],
  liveHref: "https://edgarbrief.karankh.tech/",
  sourceHref: "https://github.com/karankhatavkar/edgarbrief",
};

// Lead with LLM/agent work, per spec.
export const projects: Project[] = [
  {
    name: "Founder's Court",
    description:
      "Claude Agent Skill that judges a startup idea across five stages, returns one verdict (~25% pass rate).",
    tech: ["Claude", "Agent Skills"],
    href: "https://github.com/karankhatavkar/founders-court",
  },
  {
    name: "BioBERT Medical NER",
    description:
      "Fine-tuned BioBERT for token-level clinical NER on MACCROBAT 2018 (~40 entity types, 78 BIO tags).",
    tech: ["PyTorch", "Hugging Face"],
    href: "https://github.com/karankhatavkar/biobert-medical-ner",
  },
  {
    name: "Alzheimer's Detection from EEG",
    description:
      "EEG → time-frequency scalograms; CNNs w/ CBAM, SE, self-attention vs PSD-feature trees (AD/CN/FTD); saliency + SHAP.",
    tech: ["CNN", "Attention", "SHAP"],
    href: "https://github.com/karankhatavkar/alzheimer-eeg-classification",
  },
  {
    name: "VAE Image Restoration",
    description:
      "Variational autoencoders for inpainting on MNIST/COCO/CelebA; scored with PSNR & SSIM.",
    tech: ["VAE", "CNN"],
    href: "https://github.com/karankhatavkar/variational-autoencoders-image-restoration",
  },
  {
    name: "Acoustic RUL",
    description:
      "Digital-twin simulator for run-to-failure audio; predicts recoil-spring RUL via XGBoost, 2D CNN, 1D CNN.",
    tech: ["Digital Twin", "CNN"],
    href: "https://github.com/karankhatavkar/ak47-acoustic-rul",
  },
  {
    name: "Predictive Maintenance",
    description:
      "RUL on NASA bearings & PHM tool wear, validated on unseen machines/failure modes.",
    tech: ["PyTorch", "CNN-LSTM", "TCN"],
    href: "https://github.com/karankhatavkar/predictive-maintenance-bearing-tool-wear",
  },
];
