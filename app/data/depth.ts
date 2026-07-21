import { skills } from "@/app/data/skills";

// DEPTH — slide 3. The breadth argument: RAG and agents are the focus, but the
// modeling work runs wider, built alongside it rather than before it. Everything
// here is supporting evidence, so the slide stays a scan surface: names and
// stack visible at a glance, detail on demand.
export const depth = {
  heading: "Also built",
  support:
    "A wider sample of the work, built alongside the RAG projects and all public: an agent skill, clinical NER, EEG classification, generative image models, and time-series RUL.",
  projectsLabel: "Projects",
  skillsLabel: "Stack",
};

// The specialism, called out by ink weight inside the full list. Nothing is
// removed: `app/data/skills.ts` stays the single source of what Karan knows,
// and this set only decides what the eye lands on first. Entries are exact
// `skills.ts` strings, which the check below keeps honest — rename an item
// there and you get a build-time complaint instead of a silently un-emphasised
// skill nobody notices for months.
export const coreSkills = new Set([
  "RAG",
  "LangChain",
  "LangGraph",
  "PydanticAI",
  "RAGAS",
  "LLMs (Llama, Mistral, GPT-4)",
  "Hugging Face",
  "Claude Agent Skills",
  "Prompt & context engineering",
  "Gemini API",
  "Chroma",
  "FAISS",
  "pgvector",
  "PyTorch",
  "Transformers",
  "BERT/BioBERT",
  "FastAPI",
  "Docker",
  "PostgreSQL",
  "Python",
]);

if (process.env.NODE_ENV !== "production") {
  const known = new Set(skills.flatMap((group) => group.items));
  const orphans = [...coreSkills].filter((item) => !known.has(item));

  if (orphans.length > 0) {
    throw new Error(
      `coreSkills has entries that no longer exist in skills.ts: ${orphans.join(", ")}`,
    );
  }
}
