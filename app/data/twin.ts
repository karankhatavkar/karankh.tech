/** A section of this page an answer can point back at. The twin only ever
 *  cites places the visitor can go read for themselves — that is the whole
 *  honesty contract of the launch build (DESIGN.md, "Twin message bar"). */
export type TwinSource = {
  label: string;
  /** Anchor on this page; matches an `id` in `app/data/slides.ts`. */
  href: string;
};

export type TwinAnswer = {
  id: string;
  /** Lowercase keywords scored against the question. Most hits wins. */
  match: string[];
  reply: string;
  sources: TwinSource[];
};

const FEATURED: TwinSource = { label: "Featured", href: "#projects" };
const DEPTH: TwinSource = { label: "Depth", href: "#depth" };
const ABOUT: TwinSource = { label: "About me", href: "#about" };
const CONTACT: TwinSource = { label: "Contact", href: "#contact" };

export const twin = {
  /** Sits above the bar as a mono eyebrow. */
  eyebrow: "Ask my twin",
  status: "online",
  /** Keeps the beta honest: it's now a live model (Gemini), and it can be
   *  wrong — say so plainly. Copy pending Karan's approval. */
  disclaimer:
    "beta · you're chatting with Karan's AI twin — it can be wrong, so double-check anything that matters",
  /** Hard cap. The input stops accepting characters here. */
  maxLength: 200,
  /** Cycled in the empty bar. Deliberately not the quick prompts — between
   *  them the two lists show six different things worth asking. */
  placeholders: [
    "Ask about my RAG work…",
    "How do you evaluate retrieval?",
    "What's in your stack?",
    "How do you chunk documents?",
  ],
  /** One click sends these, exactly as written. Short enough that all three
   *  hold one line next to the pill. */
  quickPrompts: [
    "How do you stay grounded?",
    "What have you shipped?",
    "What do you do now?",
  ],
  panelTitle: "Karan's twin",
  panelDescription:
    "A chat about Karan's RAG and agent work, answered from this page's content.",
  composerPlaceholder: "Ask a follow-up…",
  // One word, because it sits under every answer. It also happens to be the
  // honest one: these are the passages the reply was written from.
  sourcesLabel: "Sources",
} as const;

export const twinAnswers: TwinAnswer[] = [
  {
    id: "grounding",
    match: ["ground", "grounded", "hallucin", "cite", "citation", "source", "accurate", "trust"],
    reply:
      "Every answer has to trace back to a chunk that retrieval actually returned. I wire the pipeline so the model can only speak from what came back, and when nothing relevant comes back it says so instead of filling the gap. That last part is the bit most demos quietly skip.",
    sources: [ABOUT, FEATURED],
  },
  {
    id: "shipped",
    match: ["ship", "shipped", "built", "build", "project", "work", "portfolio", "made"],
    reply:
      "A RAG system running in production and an agentic SaaS I built myself. The featured one is further down this page with its retrieval pipeline broken out, and the supporting ML work sits under Depth. Three and a bit years of it now.",
    sources: [FEATURED, DEPTH],
  },
  {
    id: "availability",
    match: ["what do you do", "current", "role", "job", "available", "availability", "hire", "hiring", "freelance", "contract", "free", "work with", "rate"],
    reply:
      "I'm an AI Research Engineer, working on RAG systems, agents, and evaluation. To get in touch, email me.",
    sources: [CONTACT],
  },
  {
    id: "evaluation",
    match: ["eval", "evals", "evaluate", "evaluation", "measure", "metric", "test", "benchmark", "quality"],
    reply:
      "I measure retrieval and generation separately. Retrieval gets judged on whether the right chunk came back at all; generation gets judged against the text that came back. Score them together and you can't tell which half is broken.",
    sources: [ABOUT, FEATURED],
  },
  {
    id: "chunking",
    match: ["chunk", "chunking", "split", "embed", "embedding", "index", "retriev", "vector", "search"],
    reply:
      "Chunking is where most RAG quality is won or lost. I split on the document's own structure rather than a fixed token count, so a retrieved passage is one whole thought instead of half of two. Then I check what retrieval returns before touching the prompt.",
    sources: [ABOUT, FEATURED],
  },
  {
    id: "stack",
    match: ["stack", "tool", "tools", "tech", "framework", "language", "model", "llm", "python", "use"],
    reply:
      "Python for the pipeline, whichever vector store suits the shape of the data, and evals wired in from day one rather than bolted on once it's already wrong. I pick the model late, because it's the cheapest piece to swap later.",
    sources: [ABOUT, DEPTH],
  },
  {
    id: "agents",
    match: ["agent", "agents", "agentic", "tool use", "workflow", "automation", "autonomous"],
    reply:
      "I keep agents on a short leash: narrow tools, explicit stopping conditions, and a log of what it did that a human can read afterwards. Most of what people want from an agent turns out to be a well-retrieved answer plus two tool calls.",
    sources: [FEATURED, DEPTH],
  },
  {
    id: "background",
    match: ["background", "study", "studied", "degree", "master", "masters", "education", "gpa", "experience", "years"],
    reply:
      "I'm an AI research engineer now, with a master's in AI at 9.6 GPA and three-plus years shipping AI work, starting with sensor data and moving into RAG and agents. The academic half is why I reach for evaluation first; the shipping half is why I don't stop there.",
    sources: [ABOUT, DEPTH],
  },
];

/** Shown when nothing scores. It hands off rather than inventing an answer. */
export const twinFallback: Omit<TwinAnswer, "match"> = {
  id: "fallback",
  reply:
    "That one's outside what I can answer from this page. Ask Karan directly and you'll get a real answer instead of a guess.",
  sources: [CONTACT],
};

/** Crude on purpose: the launch build is curated Q&A, and a keyword score is
 *  honest about that in a way a fuzzy similarity number would not be. */
export function findTwinAnswer(question: string): Omit<TwinAnswer, "match"> {
  const q = question.toLowerCase();
  let best: TwinAnswer | null = null;
  let bestScore = 0;

  for (const answer of twinAnswers) {
    const score = answer.match.reduce(
      (total, keyword) => (q.includes(keyword) ? total + 1 : total),
      0
    );
    if (score > bestScore) {
      best = answer;
      bestScore = score;
    }
  }

  return best ?? twinFallback;
}
