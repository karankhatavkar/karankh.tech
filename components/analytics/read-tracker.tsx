"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";

/**
 * Fires once when the end of a post scrolls into view.
 *
 * Page views say a post was opened, which is a much weaker claim than it
 * looks — a search result someone bounces off counts the same as a piece
 * somebody actually read. This separates the two, which is the only way to
 * tell whether the writing is working or just being clicked.
 *
 * Deliberately not a scroll-percentage ladder (25/50/75/100): that is four
 * events per reader against a 50k monthly allowance, to answer a question one
 * event already answers.
 */
export function ReadTracker({ slug }: { slug: string }) {
  const sentinel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;

    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      trackEvent("post_read", { slug });
      // One per page view — disconnecting stops scroll-up-scroll-down from
      // inflating the count.
      observer.disconnect();
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [slug]);

  return <div ref={sentinel} aria-hidden />;
}
