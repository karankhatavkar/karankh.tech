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

// One real testimonial is live; add more as they come in. Two content rules to
// keep:
//
// 1. **Attribution or nothing.** This site's pitch is grounded, citable
//    answers. An anonymous "Great to work with — Client" contradicts the
//    argument it sits beside. Real name, real company, ideally a `href` to the
//    public source.
// 2. **Three is the floor for rotating.** The card shows one static quote below
//    three entries and only starts cycling at three or more (see
//    `components/testimonial-card.tsx`). Add two more real ones to turn the
//    rotation on.
export const testimonials: Testimonial[] = [
  {
    quote:
      "I’ve enjoyed working with Karan for 1.5 years, and his dedication and positive attitude amaze me.",
    author: "Edwin Yeong",
    role: "Amdocs",
  },
  // TEMPLATE — copy this block for each new testimonial, fill it in, uncomment
  // it, and delete this note. Keep the array at 3+ real entries to turn the
  // rotation on.
  // {
  //   quote: "Their words, two or three sentences.",
  //   author: "Full Name",
  //   role: "Role · Company",
  //   href: "https://link-to-public-source", // optional, but a linked quote is stronger
  // },
];
