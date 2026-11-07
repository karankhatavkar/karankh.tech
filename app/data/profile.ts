export type SocialLink = {
  /** Also keys the brand mark in components/brand-marks.tsx. */
  label: string;
  /** Shown verbatim in About — no URL parsing at render time. */
  handle: string;
  href: string;
  /**
   * Official brand color, revealed on hover (About). Null means "no color to
   * reveal": GitHub and X are black brands, so their chip inverts to
   * light-on-ink instead — which is their official lockup anyway — and email
   * isn't a brand at all. Brand hexes live here, never in the theme tokens.
   */
  brand: string | null;
};

export type Profile = {
  name: string;
  role: string;
  tagline: string;
  bio: string;
  location: string;
  email: string;
  socials: SocialLink[];
};

const email = "work.karankh@gmail.com";

export const profile: Profile = {
  name: "Karan Khatavkar",
  role: "AI Research Engineer",
  tagline: "Building RAG systems and AI agents that hold up in production.",
  bio: "AI Research Engineer in Pune building RAG systems and AI agents, with a background in electronics and ML across NLP, imaging, and sensor data.",
  location: "Pune, India",
  email,
  socials: [
    {
      label: "LinkedIn",
      handle: "@karan-khatavkar",
      href: "https://www.linkedin.com/in/karan-khatavkar/",
      brand: "#0A66C2",
    },
    {
      label: "GitHub",
      handle: "@karankhatavkar",
      href: "https://github.com/karankhatavkar",
      brand: null,
    },
    {
      label: "X",
      handle: "@KhatavkarKaran",
      href: "https://x.com/KhatavkarKaran",
      brand: null,
    },
    {
      // The chip ring picks up this flat pink; the mark itself reveals the
      // full brand gradient (see components/brand-marks.tsx).
      label: "Instagram",
      handle: "@dev_brew",
      href: "https://www.instagram.com/dev_brew/",
      brand: "#D62976",
    },
    {
      label: "Email",
      handle: email,
      href: `mailto:${email}`,
      brand: null,
    },
  ],
};
