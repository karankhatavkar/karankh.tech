import { skills } from "@/app/data/skills";

// DEPTH — slide 3. The seniority argument: the RAG specialism sits on top of
// real ML work, it did not replace it. Everything here is supporting evidence,
// so the slide stays a scan surface — names and toolkit visible at a glance,
// detail on demand.
export const depth = {
  heading: "The ML underneath",
  support:
    "Before the retrieval pipelines came three years of models — clinical NLP, medical imaging, EEG and acoustic signals. All six repos below are public and readable. The RAG work stands on this, not beside it.",
  projectsLabel: "Ordered by proximity to the RAG & agent work",
  skillsLabel: "The toolkit",
  // Explains the weighting so the muted half reads as ranking rather than as a
  // rendering accident.
  skillsCaption: "Full weight — what the RAG and agent work actually runs on.",
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
  "LLMs (Llama, Mistral, GPT-4)",
  "Hugging Face",
  "Claude Agent Skills",
  "Prompt & context engineering",
  "Gemini API",
  "Chroma",
  "FAISS",
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
