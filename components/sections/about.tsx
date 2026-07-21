import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";

import { about } from "@/app/data/about";
import { backgroundTrack } from "@/app/data/background";
import { profile } from "@/app/data/profile";
import { BrandMark } from "@/components/brand-marks";
import { SpineTrack } from "@/components/spine-track";
import { TestimonialCard } from "@/components/testimonial-card";
import {
  Item,
  ItemContent,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { cn } from "@/lib/utils";

// Offsite presence. The mark names the platform, so the loud line is the
// handle itself — no element repeats what its neighbour already says.
//
// Laid out as a wrapping row rather than the original stacked column: track-led
// About spends its height on the track, so the handles run along the closing
// strip instead of down the text column.
function Elsewhere() {
  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
        Elsewhere
      </p>
      <div className="-mx-3 mt-2">
        <ItemGroup className="flex-row flex-wrap gap-x-1 gap-y-0">
          {profile.socials.map((social) => {
            const external = social.href.startsWith("http");

            return (
              <Item
                key={social.label}
                size="sm"
                className="group/social w-auto"
                render={
                  <a
                    href={social.href}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  />
                }
              >
                <ItemMedia className="self-center">
                  <span
                    // The brand hex rides in as a custom property so the hover
                    // colour stays out of the class strings (and the theme).
                    style={
                      social.brand
                        ? ({ "--brand": social.brand } as CSSProperties)
                        : undefined
                    }
                    className={cn(
                      "flex size-8 items-center justify-center rounded-full bg-background text-foreground/80 ring-1 ring-foreground/10 transition-colors duration-200",
                      social.brand
                        ? "group-hover/social:text-(--brand) group-hover/social:ring-(--brand)/30 group-focus-visible/social:text-(--brand) group-focus-visible/social:ring-(--brand)/30"
                        : "group-hover/social:bg-foreground group-hover/social:text-background group-hover/social:ring-foreground group-focus-visible/social:bg-foreground group-focus-visible/social:text-background group-focus-visible/social:ring-foreground",
                    )}
                  >
                    <BrandMark name={social.label} className="size-[15px]" />
                  </span>
                </ItemMedia>
                <ItemContent className="gap-0">
                  <ItemTitle className="text-[13px] font-normal text-foreground/85 transition-colors group-hover/social:text-foreground">
                    {social.handle}
                  </ItemTitle>
                </ItemContent>
              </Item>
            );
          })}
        </ItemGroup>
      </div>
    </div>
  );
}

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

      {/* The testimonial belongs beside the intro, not the heading. Lifting the
          heading to full width lets the panel centre against the paragraph +
          availability block; with the heading still in the column, `items-start`
          pinned the panel up at the heading, floating above the text it sits
          next to. Still no `justify-between` — on a wide frame it threw the
          panel against the right edge with a strip of dead space between; the
          two stay adjacent and the frame's trailing space reads as the same
          ragged right the paragraph already has. */}
      <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-14">
        <div className="min-w-0">
          <p className="max-w-[52ch] text-[clamp(15px,1.05vw,17px)] leading-relaxed text-muted-foreground">
            {about.intro}
          </p>
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
        <div className="w-full shrink-0 lg:w-[24rem]">
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

      <div className="mt-10 flex flex-wrap items-end justify-between gap-x-10 gap-y-6 slides:mt-[clamp(20px,4vh,44px)]">
        <Elsewhere />
        <p className="font-mono text-xs text-muted-foreground/70">
          {backgroundTrack.certifications}
        </p>
      </div>
    </section>
  );
}
