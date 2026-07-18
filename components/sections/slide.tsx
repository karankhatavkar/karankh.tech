import { cn } from "@/lib/utils";

type SlideProps = {
  /** The `id` of the section this slide holds — matches an entry in
   *  `app/data/slides.ts` so the rail can track which slide is on screen. */
  id: string;
  children: React.ReactNode;
  /** Hero and other full-bleed compositions bring their own edge insets;
   *  every other slide takes the shared page frame. */
  bleed?: boolean;
  className?: string;
};

// One screen of the deck. Below the `slides` breakpoint this is an ordinary
// block and the page scrolls continuously; at laptop size it claims a full
// viewport and becomes a scroll-snap target (rules in `app/globals.css`).
// `min-h` rather than `h` on purpose: a slide with more content than fits
// grows instead of clipping it out of reach.
export function Slide({ id, children, bleed = false, className }: SlideProps) {
  return (
    <div
      data-slide
      data-slide-id={id}
      className={cn(
        "relative flex w-full flex-col justify-center slides:min-h-svh",
        !bleed && "px-[clamp(64px,7vw,110px)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
