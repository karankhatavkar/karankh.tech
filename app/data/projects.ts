export type Project = {
  name: string;
  description: string;
  tech: string[];
  href: string;
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
  {
    name: "Customer Churn ANN",
    description:
      "Feedforward net (~86%) predicting bank churn, served via Streamlit.",
    tech: ["ANN", "Streamlit"],
    href: "https://github.com/karankhatavkar/customer-churn-ann",
  },
];
