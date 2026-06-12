export type SocialLink = {
  label: string;
  href: string;
};

export type Profile = {
  name: string;
  role: string;
  tagline: string;
  bio: string;
  location: string;
  email: string;
  resumeHref: string;
  socials: SocialLink[];
};

export const profile: Profile = {
  name: "Karan Khatavkar",
  role: "AI/ML Engineer — LLM, NLP & Deep Learning",
  tagline: "Building LLM apps, agents, and ML models for clients.",
  bio: "Builds LLM systems for clients — agents, RAG pipelines, and fine-tuned NLP — backed by a deep-learning background in signals and imaging. Available for freelance and contract work.",
  location: "Pune, India",
  email: "work.karankh@gmail.com",
  resumeHref: "/resume.pdf",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/karan-khatavkar/" },
    { label: "GitHub", href: "https://github.com/karankhatavkar" },
  ],
};
