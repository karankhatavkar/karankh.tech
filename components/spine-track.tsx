"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { spine } from "@/app/data/background";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/** How long a stop holds the track before it drifts on. */
const DWELL_MS = 4200;

/** Fallback idle delay for browsers without `scrollend`. Deliberately longer
 *  than a trackpad's momentum tail — too short and it fires mid-flick, settles,
 *  and then the remaining momentum drags the track off the stop again. */
const SETTLE_IDLE_MS = 260;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** How close to an edge counts as "meant to be at the edge". */
const EDGE_SNAP_PX = 90;

// Tidy up the two edges; leave the track exactly where it was let go otherwise.
//
// Snapping to the nearest card start — the job CSS scroll-snap used to do — is
// the wrong model for this geometry. A card is ~330px wide but the entire scroll
// range is only ~190px, so every card start past the first clamps to `max` and
// the stop list collapses to [0, max, max, max, max]. "Nearest" then means
// anything under half the range slams back to 0; and because that correction is
// itself a smooth animation that `scrollend` can fire against, the track could
// be pulled backwards out of a position it was still travelling to. That is the
// intermittent jump.
//
// Only the start genuinely needs to be exact: resting even 30px in clips the
// first card against the frame inset, the line the heading and every section
// label align to. The end is tidied for symmetry. Everything between is a
// legitimate place to stop reading, so it is left alone.
//
// Blocking state is read off the element's own dataset rather than from refs.
// The React Compiler forbids a hook closure from reading a ref that is mutated
// elsewhere, and the `scrollend` listener below lives in an effect — so the
// DOM, which both sides can see, is the shared channel.
function alignToNearestStop(el: HTMLElement | null) {
  if (!el) return;

  // Never fight a drag in progress, and never second-guess the drift, which
  // positions itself.
  if (el.dataset.dragging === "true" || el.dataset.drifting === "true") return;

  const max = Math.max(el.scrollWidth - el.clientWidth, 0);
  if (max <= 0) return;

  const left = el.scrollLeft;
  let target: number | null = null;
  if (left < EDGE_SNAP_PX) target = 0;
  else if (left > max - EDGE_SNAP_PX) target = max;

  // Mid-track: wherever it was left is where it stays.
  if (target === null) return;

  // Already there. Bailing here is also what stops the scroll below from
  // re-triggering this through its own `scrollend`.
  if (Math.abs(target - left) < 1) return;

  el.scrollTo({
    left: target,
    behavior: prefersReducedMotion() ? "auto" : "smooth",
  });
}

// The spine as a horizontal track: five stops read newest-first, drifting on
// their own so the flow is shown rather than described.
//
// Direction is deliberate and runs *against* the reading order — the arrows
// point left, back toward `01 · NOW`. The track reads "everything led here"
// rather than "here is my journey forward", which is the whole reason the
// order was reversed in the first place (FLOW.md — evidence before biography).
//
// Motion rules: the drift makes exactly one pass and stops. That is what keeps
// it WCAG 2.2.2-safe without a pause control — there is no indefinitely moving
// content to stop. It also pauses on hover and focus, yields permanently the
// moment the visitor scrolls or drags, never runs off-screen, and is disabled
// outright under `prefers-reduced-motion`.
export function SpineTrack() {
  const frameRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLOListElement>(null);
  const activeRef = useRef(0);
  // Mirrored in a ref as well as state: `handleScroll` would otherwise close
  // over a stale `drifting`, and a wheel event plus the scroll it causes can
  // land in the same frame — before React has re-rendered with the new value.
  const driftingRef = useRef(true);
  const [active, setActive] = useState(0);
  const [drifting, setDrifting] = useState(true);
  const [onScreen, setOnScreen] = useState(false);
  const [progress, setProgress] = useState({ ratio: 1, offset: 0 });

  // Only drift while the track is actually on screen, so a visitor arriving at
  // the slide finds it at `01` rather than at whatever stop a background timer
  // left it on.
  //
  // Observe the static wrapper, never the scroller: the `<ol>` is a horizontal
  // scroll container whose content overflows its box, and measuring an
  // intersection ratio against it is unreliable.
  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setOnScreen(entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Measure how much of the track is in view, for the progress rail. Driven by
  // callbacks rather than a direct call, which is what keeps the initial
  // measurement out of the effect body.
  //
  // The ResizeObserver alone is not enough: it fires on the scroller's own box,
  // and that box does not change when the web fonts land and reflow the cards —
  // only `scrollWidth` does. Measured too early the rail reads a full bar
  // ("nothing to scroll"), the exact opposite of what it exists to say. So the
  // font load gets its own re-measure.
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const measure = () =>
      setProgress({
        ratio: el.clientWidth / el.scrollWidth,
        offset: el.scrollLeft / Math.max(el.scrollWidth - el.clientWidth, 1),
      });

    const observer = new ResizeObserver(measure);
    observer.observe(el);

    let live = true;
    document.fonts?.ready.then(() => {
      if (live) measure();
    });

    return () => {
      live = false;
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!drifting || !onScreen || prefersReducedMotion()) return;

    const id = window.setInterval(() => {
      const next = activeRef.current + 1;
      // One pass, then it rests on the last stop and stays there.
      //
      // The ref must be cleared alongside the state. It guards `settle()` and
      // the highlight-follows-scroll branch, so leaving it set here would mean
      // that once the drift finished on its own, the state read "not drifting"
      // while the ref still read "drifting" — silently disabling both for the
      // rest of the page's life.
      if (next >= spine.length) {
        driftingRef.current = false;
        setDrifting(false);
        return;
      }
      activeRef.current = next;
      setActive(next);
    }, DWELL_MS);

    return () => window.clearInterval(id);
  }, [drifting, onScreen]);

  // Drive the scroller from `active`, moving only as far as it has to.
  //
  // Aligning each stop to the left edge is wrong here: at laptop width several
  // cards are already in frame, so most stops would have nowhere to scroll to
  // and the track would clamp — the highlight advancing while the cards sat
  // still. Scrolling to "nearest" keeps the drift small and self-clamping, and
  // still pulls off-screen stops into view.
  useEffect(() => {
    const el = scrollerRef.current;
    const card = el?.querySelector<HTMLElement>(`[data-stop="${active}"]`);
    if (!el || !card) return;

    const cardLeft = card.offsetLeft - el.offsetLeft;
    const cardRight = cardLeft + card.offsetWidth;
    const viewLeft = el.scrollLeft;
    const viewRight = viewLeft + el.clientWidth;

    let left = viewLeft;
    if (cardRight > viewRight) left = cardRight - el.clientWidth;
    else if (cardLeft < viewLeft) left = cardLeft;

    // Never scroll past the card's own left edge. On a phone the frame inset
    // leaves barely more width than one card, so right-aligning a stop can push
    // its left edge out of frame and clip the copy.
    left = Math.min(left, cardLeft);

    if (left === viewLeft) return;

    el.scrollTo({ left, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  }, [active]);

  // Once the visitor takes the wheel, the track stops fighting them for it.
  const surrender = () => {
    driftingRef.current = false;
    setDrifting(false);
  };

  // Settle to the nearest stop once scrolling stops.
  //
  // This is the job CSS scroll-snap used to do, done in JS because it can clamp.
  // `x mandatory` put snap points at every card start, but the last three sat
  // past the end of the scroll range, so reaching the end snapped violently
  // back to the only reachable point. Clamping each target into [0, max] gives
  // the crisp alignment without the unreachable points.
  //
  // Without it the track rests wherever the pointer was released — and a stop
  // resting even 30px in clips the first card against the frame inset, which is
  // the same line the heading and every section label align to.
  const settleTimer = useRef<number | null>(null);

  const settle = () => alignToNearestStop(scrollerRef.current);

  // `scrollend` is the right signal: it fires exactly once, after momentum has
  // finished, so the settle can never land mid-flick and get dragged back off
  // the stop. That race is what made the alignment intermittent — a fast flick
  // settled correctly, a slow decaying one did not.
  const hasScrollEnd =
    typeof window !== "undefined" && "onscrollend" in window;

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el || !hasScrollEnd) return;

    const onScrollEnd = () => alignToNearestStop(el);

    el.addEventListener("scrollend", onScrollEnd);
    return () => el.removeEventListener("scrollend", onScrollEnd);
  }, [hasScrollEnd]);

  // Debounced fallback, used only where `scrollend` is unavailable.
  const scheduleSettle = () => {
    if (hasScrollEnd) return;
    if (settleTimer.current) window.clearTimeout(settleTimer.current);
    settleTimer.current = window.setTimeout(settle, SETTLE_IDLE_MS);
  };

  useEffect(
    () => () => {
      if (settleTimer.current) window.clearTimeout(settleTimer.current);
    },
    [],
  );

  // Drag-to-scroll, for mice.
  //
  // A mouse wheel only emits vertical delta, so without this a mouse user has
  // no way to move a horizontal track at all — trackpads work, mice do not, and
  // shift+wheel is not discoverable. Translating vertical wheel into horizontal
  // scroll is the other obvious fix and is deliberately *not* used here: it
  // would trap the page's vertical scroll whenever the cursor crossed the
  // track, which is exactly the scroll hijacking DESIGN.md rules out.
  //
  // Mouse only. Touch and pen keep native scrolling with its momentum, which is
  // better than anything reimplemented here.
  const dragRef = useRef<{ x: number; left: number } | null>(null);
  const [dragging, setDragging] = useState(false);

  const onPointerDown = (event: React.PointerEvent<HTMLOListElement>) => {
    surrender();
    if (event.pointerType !== "mouse") return;

    const el = scrollerRef.current;
    if (!el) return;

    // Stops the drag turning into a text selection across the cards.
    event.preventDefault();
    dragRef.current = { x: event.clientX, left: el.scrollLeft };
    setDragging(true);
    el.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLOListElement>) => {
    const el = scrollerRef.current;
    const start = dragRef.current;
    if (!el || !start) return;

    el.scrollLeft = start.left - (event.clientX - start.x);
  };

  const endDrag = (event: React.PointerEvent<HTMLOListElement>) => {
    const el = scrollerRef.current;
    if (dragRef.current && el?.hasPointerCapture(event.pointerId)) {
      el.releasePointerCapture(event.pointerId);
    }
    dragRef.current = null;
    setDragging(false);
    // Cleared by hand because `settle` reads it straight back and React has not
    // re-rendered yet — the attribute would still say "true" and block the very
    // alignment this release is meant to trigger.
    if (el) el.dataset.dragging = "false";
    // Align as soon as the grip is released, rather than waiting out the
    // scroll-idle timer.
    settle();
  };

  const handleScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;

    const max = Math.max(el.scrollWidth - el.clientWidth, 1);
    setProgress({ ratio: el.clientWidth / el.scrollWidth, offset: el.scrollLeft / max });

    // The drift positions itself; nothing to correct while it is running.
    if (driftingRef.current) return;

    // Realign once the scrolling stops. Debounced, so it waits out momentum
    // rather than yanking mid-flick.
    scheduleSettle();
  };

  const scrolled = progress.offset > 0.02;

  return (
    <div
      ref={frameRef}
      // Reflects the drift state in the DOM so the behaviour is inspectable
      // without a visible control to read it off.
      data-drifting={drifting}
      className="group/track relative"
      onMouseEnter={surrender}
      onFocusCapture={surrender}
    >
      <ol
        ref={scrollerRef}
        tabIndex={0}
        aria-label="Background — scroll for earlier stops"
        // Both flags live on the scroller itself: `alignToNearestStop` reads
        // them from here, which is how the settle logic stays out of refs.
        data-dragging={dragging}
        data-drifting={drifting}
        data-active={active}
        onScroll={handleScroll}
        onWheel={surrender}
        onTouchStart={surrender}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        // If capture is lost, `pointerup` never arrives here — and a `dragRef`
        // left set blocks `settle()` for good.
        onLostPointerCapture={endDrag}
        // No scroll-snap, deliberately. `x mandatory` put snap points at every
        // card start, but the last three sat past the end of the scroll range —
        // so reaching the end forced a snap back to the only reachable point
        // (card 02) and the track could never rest on the final stop. With ~1.6
        // card-widths of travel, snapping was fighting the reader for a settle
        // the drift already does programmatically.
        //
        // The native bar is hidden in favour of the progress rail below, so the
        // scroller takes focus itself — that is what keeps it reachable by
        // keyboard once its scrollbar is gone.
        // `overscroll-x-contain` matters too: without it a horizontal flick
        // chains to the browser's back gesture and leaves the site.
        className={cn(
          "flex overflow-x-auto overscroll-x-contain rounded-sm outline-none [-ms-overflow-style:none] [scrollbar-width:none] focus-visible:ring-2 focus-visible:ring-ring/60 [&::-webkit-scrollbar]:hidden",
          // The grab cursor is the only affordance saying "this drags".
          dragging ? "cursor-grabbing select-none" : "cursor-grab",
        )}
      >
        {spine.map((node, index) => (
          <li
            key={node.index}
            data-stop={index}
            className="flex shrink-0 items-stretch"
          >
            <article
              // Every stop reads at full ink. There is no active/inactive
              // dimming: the track is one continuous thing to read across, not
              // a carousel with a selected item.
              //
              // Wide enough that the five stops overflow the frame with room to
              // travel — any narrower and they nearly all fit, and a track with
              // nowhere to go is just a row.
              className="flex w-[clamp(252px,23vw,330px)] flex-col border-t pt-5"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                {node.index} · {node.kicker}
              </p>
              <h3 className="mt-2 text-base font-medium tracking-tight text-balance">
                {node.label}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                {node.claim}
              </p>
              <div className="mt-auto pt-4 font-mono text-[11px] leading-relaxed text-muted-foreground">
                {node.evidence.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {node.chips.map((chip) => (
                  <Badge key={chip} variant="outline" className="font-mono">
                    {chip}
                  </Badge>
                ))}
              </div>
            </article>

            {/* Arrowheads point back down the track, toward `01 · NOW`.
                The spacer carries the same `border-t` as the cards, so the
                hairline runs unbroken across all five stops and the arrows sit
                on one continuous rule. Without it the rule breaks at every gap
                and the arrows read as loose marks rather than a flow. */}
            {index < spine.length - 1 && (
              <span
                aria-hidden
                className="flex w-10 shrink-0 items-center justify-center self-start border-t pt-[11px] text-muted-foreground sm:w-14"
              >
                <ArrowLeft className="size-4" strokeWidth={2} />
              </span>
            )}
          </li>
        ))}
      </ol>

      {/* The scroll affordance: a hairline whose lit segment is both "there is
          more track than fits" and "here is where you are on it". The hint
          beside it retires itself once the visitor has taken the point. */}
      <div className="mt-5 flex items-center gap-4">
        <div className="relative h-px flex-1 bg-border" aria-hidden>
          <span
            className="absolute inset-y-0 bg-foreground/70 transition-[left] duration-500"
            style={{
              width: `${Math.min(progress.ratio, 1) * 100}%`,
              left: `${progress.offset * (1 - Math.min(progress.ratio, 1)) * 100}%`,
            }}
          />
        </div>
        <span
          aria-hidden
          className={cn(
            "flex shrink-0 items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground transition-opacity duration-500",
            scrolled && "opacity-0",
          )}
        >
          Scroll
          <ArrowRight className="size-3" strokeWidth={1.75} />
        </span>
      </div>
    </div>
  );
}
