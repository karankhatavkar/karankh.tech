export type Testimonial = {
  quote: string;
  /** Attribution is not optional in practice — see the note below. */
  author: string;
  /** "Role · Company". */
  role: string;
  /** Link to the public source (LinkedIn recommendation, Upwork review…).
   *  Optional, but a linked quote is worth several unlinked ones. */
  href?: string;
};

// ⚠️ PLACEHOLDER CONTENT — none of these are real. They are deliberately
// written to *look* unfinished so they cannot ship by accident, while running
// at roughly the length of a real testimonial so the card's typography and
// rotation can be judged. Replace wholesale; do not "tidy" them into
// realistic-sounding quotes with invented names.
//
// Two content rules worth keeping when the real ones land:
//
// 1. **Attribution or nothing.** This site's pitch is grounded, citable
//    answers. An anonymous "Great to work with — Client" contradicts the
//    argument it sits beside. Real name, real company, ideally a `href` to the
//    public source.
// 2. **Three is the floor for rotating.** A two-item loop announces its own
//    length within eight seconds and reads as padding. The card falls back to a
//    single static quote below three — see `components/testimonial-card.tsx`.
export const testimonials: Testimonial[] = [
  {
    quote:
      "Placeholder quote, sized to match a real testimonial — long enough to run two or three lines in the card so the rotation and the type can be judged before the real ones arrive.",
    author: "Attribution pending",
    role: "Role · Company",
  },
  {
    quote:
      "Second placeholder, deliberately a different length from the first so the card can be checked for height jump as it cycles between quotes.",
    author: "Attribution pending",
    role: "Role · Company",
  },
  {
    quote:
      "Third placeholder. Rotation only switches on at three or more, so this entry is what makes the cycling behaviour visible at all.",
    author: "Attribution pending",
    role: "Role · Company",
  },
];
