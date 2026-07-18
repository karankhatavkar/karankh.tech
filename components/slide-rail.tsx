"use client";

import { useEffect, useState } from "react";
import { hero } from "@/app/data/hero";
import { slides } from "@/app/data/slides";
import { cn } from "@/lib/utils";

const railText =
  "font-mono text-[11px] uppercase tracking-[0.28em] [writing-mode:vertical-rl] rotate-180";

// The hero's vertical rail, promoted to the spine of the deck: it holds the
// current slide's name at the top, the year at the bottom, and between them
// the hero's hairline broken into one segment per slide — inked on the one
// you're standing on. Quantised scrolling hides how much page is left, so the
// rail is where that information goes; it is also the deck's only navigation
// once the hero's header scrolls away.
//
// Slide mode only (`slides:` variant). On phones the page is a plain scroll,
// there is no slide to be on, and the hero renders its own rail instead.
export function SlideRail() {
  const [activeId, setActiveId] = useState(slides[0].id);

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-slide-id]");

    // A slide is "active" once it crosses the middle of the viewport, which
    // is the same thing the eye uses and needs no scroll maths.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-slide-id");
            if (id) setActiveId(id);
          }
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const active = slides.find((slide) => slide.id === activeId) ?? slides[0];

  return (
    <nav
      aria-label="Slides"
      className="fixed inset-y-0 left-[clamp(18px,2.4vw,34px)] z-40 hidden flex-col items-center justify-between py-6 slides:flex"
    >
      <span
        key={active.id}
        className={cn(railText, "text-muted-foreground motion-safe:animate-in motion-safe:fade-in")}
      >
        {active.label}
      </span>

      <ol className="my-4 flex w-4 flex-1 flex-col items-center gap-2">
        {slides.map((slide) => {
          const isActive = slide.id === active.id;
          return (
            <li key={slide.id} className="flex w-full flex-1 justify-center">
              <a
                href={`#${slide.id}`}
                aria-current={isActive ? "true" : undefined}
                className="group flex w-full justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
              >
                <span className="sr-only">{slide.label}</span>
                <span
                  aria-hidden
                  className={cn(
                    "w-px rounded-full transition-colors group-hover:bg-foreground group-focus-visible:bg-foreground",
                    isActive ? "bg-foreground" : "bg-border",
                  )}
                />
              </a>
            </li>
          );
        })}
      </ol>

      <span className={cn(railText, "text-muted-foreground")}>{hero.year}</span>
    </nav>
  );
}
