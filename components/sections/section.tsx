import { cn } from "@/lib/utils";

type SectionProps = {
  id: string;
  title: string;
  children: React.ReactNode;
  /**
   * `label` — mono index in a sticky left column; the page default.
   * `display` — About's large heading stacked above full-width content, for a
   * section whose content wants the whole frame rather than the right column.
   */
  variant?: "label" | "display";
};

// Two-column editorial grid: a sticky mono label in the left column indexes
// the section, continuing the hero's vertical-rail language down the page.
//
// In slide mode the surrounding Slide centres this on a screen of its own, so
// the section drops the rhythm padding and the divider it needs on the
// continuous page — the screen change is the separation.
export function Section({
  id,
  title,
  children,
  variant = "label",
}: SectionProps) {
  const display = variant === "display";

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn(
        "grid gap-6 border-t py-16 sm:gap-10 sm:py-20 slides:border-t-0 slides:py-0",
        // Display stays one column at every width, so the heading keeps sitting
        // above the content instead of moving beside it at `sm`.
        !display && "sm:grid-cols-[minmax(140px,200px)_1fr]",
      )}
    >
      <h2
        id={`${id}-heading`}
        className={cn(
          display
            ? // Deliberately the same ramp as About's heading, so the two lead
              // slides read as one typographic system rather than two.
              "text-[clamp(32px,4vw,48px)] leading-[1.05] font-[520] tracking-[-0.04em]"
            : // Only a label in its own column sticks; a heading above the
              // content scrolls with it, as a heading in flow should.
              "font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground sm:sticky sm:top-10 sm:self-start",
        )}
      >
        {title}
      </h2>
      <div className="min-w-0">{children}</div>
    </section>
  );
}
