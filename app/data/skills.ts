export type SkillGroup = {
  category: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  {
    category: "LLM & GenAI",
    items: [
      "RAG",
      "LangChain",
      "LLMs (Llama, Mistral, GPT-4)",
      "Hugging Face",
      "Ollama",
      "Claude Agent Skills",
      "Prompt & context engineering",
      "Gemini API",
      "Chroma",
      "FAISS",
    ],
  },
  {
    category: "ML & Deep Learning",
    items: [
      "PyTorch",
      "TensorFlow/Keras",
      "Transformers",
      "BERT/BioBERT",
      "CNNs (ResNet)",
      "VAEs",
      "Attention (CBAM, self-attention)",
      "Mixture Density Networks",
      "scikit-learn",
      "XGBoost",
      "Random Forest",
      "SHAP",
      "Signal processing (CWT scalograms, PSD)",
      "NumPy",
      "Pandas",
    ],
  },
  {
    category: "Serving & Infra",
    items: [
      "FastAPI",
      "Streamlit",
      "Docker",
      "Kubernetes",
      "Azure",
      "GitHub Actions",
      "Git",
      "Jupyter",
    ],
  },
  {
    category: "Databases",
    items: [
      "FAISS",
      "Chroma",
      "PostgreSQL",
      "MongoDB",
      "MySQL",
      "InfluxDB (time-series)",
    ],
  },
  {
    category: "Languages",
    items: [
      "Python",
      "JavaScript (React/Node)",
      "TypeScript",
      "SQL",
      "Java",
      "Bash",
    ],
  },
];
