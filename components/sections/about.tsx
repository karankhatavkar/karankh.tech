import { ArrowRight } from "lucide-react";

import { about } from "@/app/data/about";
import { backgroundTrack } from "@/app/data/background";
import { profile } from "@/app/data/profile";
import { AboutStatement } from "@/components/about-statement";
import { FindMe } from "@/components/find-me";
import { SpineTrack } from "@/components/spine-track";
import { TestimonialCard } from "@/components/testimonial-card";

// Track-led About (rebuilt Jul 20, 2026): the statement sits at the top, the
// five-stop spine takes the middle as an auto-drifting horizontal track, and
// the contact surface closes it out. Experience and Education fold in here —
// they no longer have slides of their own.
//
// This replaced the three-column bento. The stat card, portrait slot,
// open-source tile and working-style points came out to make room; their copy
// is still in `app/data/about.ts` and needs a new home (Contact, or DEPTH).
export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="flex flex-col border-t py-16 sm:py-20 slides:border-t-0 slides:py-0"
    >
      <h2
        id="about-heading"
        className="text-[clamp(32px,4vw,48px)] leading-[1.05] font-[520] tracking-[-0.04em]"
      >
        {about.heading}
      </h2>

      {/* The testimonial belongs beside the intro, not the heading, so the
          heading stays full width and the panel centres against the paragraph +
          availability block. A `1fr | 26rem` grid keeps the panel pinned to the
          right edge (aligned with the full-width Background track below) while
          the justified text column fills everything to its left. The gap between
          them is the fixed grid gap, so it no longer balloons with the viewport
          the way `justify-between` did — the text widens, not the empty space. */}
      <div className="mt-6 flex flex-col gap-8 lg:grid lg:grid-cols-[minmax(0,1fr)_26rem] lg:items-center lg:gap-12">
        <div className="min-w-0">
          <AboutStatement />
          {/* The availability line moves under the intro now that the
              testimonial card holds the right-hand column. Contact carries the
              same statement, so this is a second instance, not the only one. */}
          <p className="mt-8 flex items-start gap-2.5 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            <span
              className="mt-1 size-1.5 shrink-0 rounded-full bg-emerald-500"
              aria-hidden
            />
            Based in {profile.location} · Available for freelance &amp; contract
            work
          </p>
        </div>
        <div className="w-full">
          <TestimonialCard />
        </div>
      </div>

      <div className="mt-10 slides:mt-[clamp(20px,4vh,44px)]">
        {/* Eyebrow and direction cue share one row so the track follows right
            after the label — no empty header band between them. `Earlier →`
            says the track runs back in time toward the right; the newest stop
            (the NOW-badged card) sits at the left. */}
        <div className="flex items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
          <p>{backgroundTrack.eyebrow}</p>
          <span aria-hidden className="flex items-center gap-1.5">
            Earlier
            <ArrowRight className="size-3" strokeWidth={1.75} />
          </span>
        </div>
        <div className="mt-4">
          <SpineTrack />
        </div>
      </div>

      <div className="mt-10 slides:mt-[clamp(20px,4vh,44px)]">
        <FindMe />
      </div>
    </section>
  );
}
