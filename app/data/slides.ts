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
  // The two shipped builds lead: they are the live, clickable proof, so they
  // land before any claim the site makes about itself (FLOW.md — "evidence
  // before claims"). About follows as the method behind them.
  { id: "projects", label: "Featured" },
  // Depth absorbs Skills + More projects: the six supporting repos and the
  // toolkit are one argument (the ML the RAG work stands on), not two slides.
  { id: "depth", label: "Depth" },
  // About absorbs the spine: Experience + Education fold into its track, so
  // three near-identical date-stamped slides became part of one. It sits below
  // Depth now that Depth exists — evidence before biography (FLOW.md).
  { id: "about", label: "About me" },
  { id: "contact", label: "Contact" },
];
