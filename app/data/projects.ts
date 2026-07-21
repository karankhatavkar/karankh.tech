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
  /** Omitted when the repo stays private. */
  sourceHref?: string;
  /** Stands in for the source button when there is nothing to link to. */
  sourceNote?: string;
};

// Two builds share the "Featured" slide: the RAG system that carries the pitch,
// and the agentic SaaS that shows the same method shipped as a product.
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
      "Ask about SEC filings in plain language. Every answer cites the passage it came from, and it tells you when the filings can't answer the question.",
    pipeline: {
      label: "Retrieval pipeline",
      nodes: [
        "query",
        // Two retrievers in one stage is the hybrid half of the pitch.
        ["semantic", "lexical"],
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
        detail:
          "Every claim cites a passage. When the filings don't back it up, it says so instead of guessing.",
      },
      {
        label: "Structure-aware chunking",
        detail: "Heading-anchored, token-bounded, 10-K tables kept whole.",
      },
    ],
    tech: ["Python", "FastAPI", "LangGraph", "PydanticAI", "pgvector", "RAGAS", "Gemini"],
    liveHref: "https://edgarbrief.karankh.tech/",
    sourceHref: "https://github.com/karankhatavkar/edgarbrief",
  },
  {
    name: "RFP Bid Manager",
    eyebrow: "Agentic SaaS",
    tagline: "Construction bids, from RFP upload to a named recommendation.",
    summary:
      "An agent for owner's reps running construction bids. It reads the RFP, pulls scattered contractor questions into one table, and recommends a vendor.",
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
    tech: ["Next.js", "FastAPI", "LangGraph", "Gemini", "pdfplumber", "ReportLab"],
    liveHref: "https://rfp-bid-manager-karankh.vercel.app/",
    sourceNote: "Private repo",
  },
];

// The supporting repos, rendered as DEPTH's index. Order is load-bearing and
// runs most-to-least adjacent to the RAG/agent work — agent build, then
// transformers/NLP, then attention and interpretability, then the generative
// and time-series work. The slide numbers these 01–06, so reordering here
// silently re-ranks them on the page.
export const projects: Project[] = [
  {
    name: "Founder's Court",
    description:
      "A Claude Agent Skill that runs a startup idea through five stages and stops at the first one it fails. Each stage scores out of 10, nothing under 7 passes, and about a quarter of ideas clear it. One verdict, a full case report, no coaching.",
    tech: ["Claude", "Agent Skills"],
    href: "https://github.com/karankhatavkar/founders-court",
  },
  {
    name: "BioBERT Medical NER",
    description:
      "Fine-tunes BioBERT for token-level clinical NER on the MACCROBAT2018 case reports: about 40 entity types across 78 BIO tags, scored on entity-level F1. Runs on Apple Silicon (MPS) out of the box.",
    tech: ["PyTorch", "Hugging Face"],
    href: "https://github.com/karankhatavkar/biobert-medical-ner",
  },
  {
    name: "Alzheimer's Detection from EEG",
    description:
      "Detects Alzheimer's, FTD, and MCI from EEG two ways: time-frequency spectrograms classified by attention CNNs (CBAM, SE, self-attention), and PSD features run through Random Forest and XGBoost. Saliency maps and SHAP explain both. A methods comparison, not a benchmark.",
    tech: ["CNN", "Attention", "XGBoost", "SHAP"],
    href: "https://github.com/karankhatavkar/alzheimer-eeg-classification",
  },
  {
    name: "VAE Image Restoration",
    description:
      "Convolutional VAEs on three datasets. MNIST for generative modeling with a walkable 2D latent space; COCO and CelebA for polygon-mask inpainting, scored with PSNR and SSIM.",
    tech: ["TensorFlow", "VAE", "CNN"],
    href: "https://github.com/karankhatavkar/variational-autoencoders-image-restoration",
  },
  {
    name: "Predictive Maintenance",
    description:
      "Remaining-useful-life on NASA IMS bearings and PHM 2010 tool wear, always tested on a machine the model never saw in training. Traditional ML (Random Forest, XGBoost) and deep nets (CNN-LSTM, TCN, wavelet-CNN) compared under that leave-one-out constraint.",
    tech: ["PyTorch", "XGBoost", "CNN-LSTM", "TCN"],
    href: "https://github.com/karankhatavkar/predictive-maintenance-bearing-tool-wear",
  },
  {
    name: "Acoustic RUL",
    description:
      "Predicts the remaining life of an AK-47 recoil spring from gunshot audio: as the spring fatigues, the gap between muzzle blast and bolt closure stretches. A digital-twin simulator turns a handful of seed recordings into thousands of run-to-failure trajectories, then XGBoost, a 2D CNN on scalograms, and a 1D CNN on raw audio each predict RUL.",
    tech: ["Digital Twin", "XGBoost", "CNN"],
    href: "https://github.com/karankhatavkar/ak47-acoustic-rul",
  },
];
