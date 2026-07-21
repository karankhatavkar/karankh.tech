"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, MessageSquareQuote } from "lucide-react";

import { testimonials } from "@/app/data/testimonials";
import { Card, CardContent } from "@/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
} from "@/components/ui/empty";
import { cn } from "@/lib/utils";

/** How long a quote holds before the card turns over. */
const DWELL_MS = 4000;

/** Below this, the card shows one quote and does not cycle. A two-item loop
 *  announces its own length within eight seconds and reads as padding. */
const MIN_TO_ROTATE = 3;

// A quiet trust panel that turns over on its own — no controls, nothing for the
// visitor to operate. It scales to any number of entries in
// `app/data/testimonials.ts`: zero renders the pending-content placeholder,
// one or two render statically, three or more cycle.
//
// Built on the shadcn `Card` — the same primitive as the project tiles — so it
// speaks the theme's own surface language (`bg-card`, the shared radius, the
// hairline `ring-foreground/10`, `shadow-xs`) instead of an ad-hoc muted panel.
// An earlier pass hand-rolled the surface and dropped in a serif quote glyph;
// both read as a different design system. The warm cue now is the lucide quote
// mark on the eyebrow — the site's own icon language — and passive dots mark
// position in the set, since the rotation has no controls to read it off.
//
// Quotes move vertically: the outgoing one rises out of frame while the next
// comes up from below, clipped by the wrapper. Every quote stays in the DOM and
// only the visual layer moves — an `aria-live` carousel would talk over a
// screen-reader user every four seconds, whereas a plain stack lets assistive
// tech read all of them at its own pace.
export function TestimonialCard() {
  // `prev` is tracked so the departing quote exits upward while everything else
  // waits below — without it the stack has no sense of direction.
  const [{ active, prev }, setIndices] = useState({ active: 0, prev: -1 });
  const [paused, setPaused] = useState(false);

  const rotates = testimonials.length >= MIN_TO_ROTATE;

  const prefersReducedMotion = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (!rotates || paused || prefersReducedMotion()) return;

    const id = window.setInterval(
      () =>
        setIndices((current) => ({
          active: (current.active + 1) % testimonials.length,
          prev: current.active,
        })),
      DWELL_MS,
    );
    return () => window.clearInterval(id);
  }, [rotates, paused]);

  // Hover and focus hold it still. It is the only pause affordance here — by
  // design there are no controls — so it is worth keeping even though the panel
  // is otherwise inert.
  const hold = (value: boolean) => () => setPaused(value);

  if (testimonials.length === 0) {
    return (
      <Empty className="border border-dashed bg-muted/40 py-10">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <MessageSquareQuote strokeWidth={1.5} aria-hidden />
          </EmptyMedia>
          <EmptyDescription className="font-mono text-[11px] tracking-wider">
            testimonials — pending
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <Card
      onMouseEnter={hold(true)}
      onMouseLeave={hold(false)}
      onFocusCapture={hold(true)}
      onBlurCapture={hold(false)}
    >
      <CardContent>
        <div className="flex items-center justify-between gap-4">
          <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
            <MessageSquareQuote
              className="size-4 shrink-0"
              strokeWidth={1.5}
              aria-hidden
            />
            Testimonials
          </p>
          {/* Passive position dots — the card has no controls by design, but a
              visitor now sees it's a set of several, not a lone quote. */}
          {rotates && (
            <span aria-hidden className="flex items-center gap-1.5">
              {testimonials.map((testimonial, index) => (
                <span
                  key={testimonial.author + index}
                  className={cn(
                    "size-1.5 rounded-full transition-colors duration-500",
                    index === active
                      ? "bg-foreground"
                      : "bg-muted-foreground/30",
                  )}
                />
              ))}
            </span>
          )}
        </div>

        {/* One grid cell holds every quote, so the panel sizes to the tallest
            and never jumps height as it turns. `overflow-hidden` is what makes
            the movement read as scrolling rather than sliding about. */}
        <div className="mt-4 grid overflow-hidden">
          {testimonials.map((testimonial, index) => {
            const shown = index === active;
            const leaving = index === prev;

            return (
              <figure
                key={testimonial.author + index}
                aria-hidden={!shown}
                className={cn(
                  "col-start-1 row-start-1",
                  // Only the two quotes actually changing places animate. The
                  // rest reset below instantly, or they would visibly fly past.
                  shown || leaving
                    ? "transition-[transform,opacity] duration-700 ease-out"
                    : "transition-none",
                  shown && "translate-y-0 opacity-100",
                  leaving && "-translate-y-full opacity-0",
                  !shown && !leaving && "translate-y-full opacity-0",
                )}
              >
                <blockquote className="text-sm leading-relaxed text-pretty">
                  {testimonial.quote}
                </blockquote>
                <figcaption className="mt-4 font-mono text-[11px] leading-relaxed text-muted-foreground">
                  {testimonial.href ? (
                    <a
                      href={testimonial.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-foreground/80 transition-colors hover:text-foreground"
                    >
                      {testimonial.author}
                      <ArrowUpRight className="size-3" aria-hidden />
                    </a>
                  ) : (
                    <span className="text-foreground/80">
                      {testimonial.author}
                    </span>
                  )}
                  <span className="block">{testimonial.role}</span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
