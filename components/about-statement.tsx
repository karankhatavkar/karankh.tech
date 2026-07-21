"use client";

import { useState } from "react";
import { ArrowLeft, ChevronDown } from "lucide-react";

import { about } from "@/app/data/about";
import { cn } from "@/lib/utils";

// The About statement in two speeds. `lead` + `short` are the everyday read;
// `story` is the origin, kept behind a question so a reader in a hurry can skip
// it. Opening collapses the short paragraph, which lifts the question up to sit
// just under the heading while the story expands in beneath it; the back arrow
// reverses it. Both halves animate as `1fr <-> 0fr` grid rows, the same reveal
// DEPTH's repo index uses.
export function AboutStatement() {
  const [open, setOpen] = useState(false);

  const paragraph =
    "text-[clamp(15px,1.05vw,17px)] leading-relaxed text-justify hyphens-auto text-muted-foreground";

  return (
    <div>
      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none",
          open ? "grid-rows-[0fr]" : "grid-rows-[1fr]",
        )}
      >
        <div className="overflow-hidden">
          <p className={paragraph}>
            <span className="text-foreground">{about.lead}</span>{" "}
            {about.short}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="about-story"
        className="group mt-5 inline-flex items-center gap-2 text-left text-[14px] font-medium text-foreground/90 outline-none transition-colors hover:text-foreground focus-visible:text-foreground"
      >
        {open && (
          <ArrowLeft
            className="size-4 text-muted-foreground transition-transform duration-200 group-hover:-translate-x-0.5 motion-reduce:transition-none"
            strokeWidth={1.75}
            aria-hidden
          />
        )}
        <span className="underline-offset-4 group-hover:underline">
          {about.storyQuestion}
        </span>
        {!open && (
          <ChevronDown
            className="size-4 text-muted-foreground transition-transform duration-200 group-hover:translate-y-0.5 motion-reduce:transition-none"
            strokeWidth={1.75}
            aria-hidden
          />
        )}
      </button>

      <div
        id="about-story"
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <p className={cn(paragraph, "pt-5")}>{about.story}</p>
        </div>
      </div>
    </div>
  );
}
