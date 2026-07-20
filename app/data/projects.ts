export type Project = {
  name: string;
  description: string;
  tech: string[];
  href: string;
};

/** A stage in a project's pipeline strip. An array renders as one stage doing
 *  two things at once — the shape is load-bearing, so only use it when the
 *  build really does fan out. */
export type PipelineNode = string | string[];

export type FeaturedProject = {
  name: string;
  eyebrow: string;
  tagline: string;
  summary: string;
  pipeline: { label: string; nodes: PipelineNode[] };
  capabilities: { label: string; detail: string }[];
  tech: string[];
  liveHref: string;
  /** Omitted when the work is a client build and the repo stays private. */
  sourceHref?: string;
  /** Stands in for the source button when there is nothing to link to. */
  sourceNote?: string;
};

// Two builds share the "Featured" slide: the RAG system that carries the pitch,
// and the client build that shows the same method shipped for someone else.
// Both are live and clickable — the whole point of the slide is that a reader
// can go press the thing rather than take the copy's word for it. Keep the
// copy tight: side by side, these cards have half the width they used to.
export const featuredProjects: FeaturedProject[] = [
  {
    name: "EdgarBrief",
    // The slide is already titled "Featured", so the eyebrow only classifies.
    eyebrow: "RAG system",
    tagline: "Grounded retrieval over a corpus of SEC 10-K filings.",
    summary:
      "Ask about SEC filings in plain English. Every answer cites the passage it came from — and says so when the corpus can't support the question.",
    pipeline: {
      label: "Retrieval pipeline",
      nodes: [
        "query",
        // Two retrievers in one stage is the hybrid half of the pitch.
        ["semantic · pgvector", "lexical · full-text"],
        "RRF fusion",
        "cited answer",
      ],
    },
    capabilities: [
      {
        label: "Hybrid retrieval",
        detail: "pgvector semantic search and Postgres full-text, fused with RRF.",
      },
      {
        label: "Grounded by design",
        detail: "Every claim cites a passage. No support, no answer.",
      },
      {
        label: "Structure-aware chunking",
        detail: "Heading-anchored, token-bounded, 10-K tables kept whole.",
      },
    ],
    tech: ["Python", "FastAPI", "PydanticAI", "pgvector", "Gemini"],
    liveHref: "https://edgarbrief.karankh.tech/",
    sourceHref: "https://github.com/karankhatavkar/edgarbrief",
  },
  {
    name: "RFP Bid Manager",
    eyebrow: "Client build",
    tagline: "Construction bids, from RFP upload to a named recommendation.",
    summary:
      "Built for an owner's rep firm running construction bids: reads the RFP, folds scattered contractor questions into one table, then names a vendor.",
    pipeline: {
      label: "Bid pipeline",
      // Linear on purpose — nothing here genuinely fans out, so it stays a
      // straight run rather than borrowing EdgarBrief's stacked stage.
      nodes: ["PDF · Excel · Word", "extraction", "normalized bids", "memo"],
    },
    capabilities: [
      {
        label: "Mixed-format ingest",
        detail: "PDF, Excel and Word in; table-aware text out.",
      },
      {
        label: "Comparable by construction",
        detail:
          "Every vendor's pricing normalized into one shared set of sections.",
      },
      {
        label: "Degrades honestly",
        detail: "Rule-based parsing and scoring keep working when the model can't.",
      },
    ],
    tech: ["Next.js", "Gemini", "FastAPI", "pdfplumber", "ReportLab"],
    liveHref: "https://rfp-bid-manager-karankh.vercel.app/",
    sourceNote: "Client work · private repo",
  },
];

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
