import { hero } from "@/app/data/hero";

export type Slide = {
  /** Matches the `id` of the section inside the slide, so `#projects` and
   *  the rail's tick point at the same place. */
  id: string;
  /** What the rail reads while this slide holds the screen. */
  label: string;
};

// The deck, in order. Slide one keeps the hero's positioning line — the rail
// starts as Karan's title and hands off to section names as you move down.
// This list is the single source of order for both the page and the rail.
export const slides: Slide[] = [
  { id: "hero", label: hero.rail },
  { id: "about", label: "About me" },
  { id: "skills", label: "Skills & stack" },
  { id: "projects", label: "Projects" },
  { id: "more-projects", label: "More projects" },
  { id: "experience", label: "Experience" },
  // Education and certifications ride together: neither fills a screen on its
  // own, and as one credentials slide they stop the deck going thin near the
  // end. Both keep their own ids, so `#certifications` still resolves.
  { id: "education", label: "Education & certifications" },
  { id: "contact", label: "Contact" },
];
