"use client";

import { useEffect } from "react";
import {
  trackEvent,
  type AnalyticsEvent,
  type AnalyticsProps,
} from "@/lib/analytics";

/**
 * One delegated listener for the whole site.
 *
 * The alternative — a client component per tracked link — would push a client
 * boundary into Hero, Contact, Projects and FindMe, which are all server
 * components today. That would ship their markup twice (HTML plus the RSC
 * payload) to instrument a click. This way the sections stay on the server and
 * opt in declaratively:
 *
 *   <a data-track="resume_download">
 *   <a data-track="project_click" data-track-label="EdgarBrief">
 *
 * `data-track-*` attributes past the first become event properties. Keep it to
 * two — that is the ceiling on Vercel Pro, and more than two low-cardinality
 * dimensions is rarely readable anyway.
 */
export function EventTracking() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const el = (event.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-track]"
      );
      const name = el?.dataset.track as AnalyticsEvent | undefined;
      if (!name) return;

      const props: AnalyticsProps = {};
      for (const [key, value] of Object.entries(el!.dataset)) {
        if (key === "track" || !key.startsWith("track") || !value) continue;
        // "trackLabel" -> "label"
        const prop = key.slice(5);
        props[prop.charAt(0).toLowerCase() + prop.slice(1)] = value;
      }

      trackEvent(name, Object.keys(props).length > 0 ? props : undefined);
    }

    // Capture phase: some of these links navigate away, and the handler needs
    // to run before the click reaches anything that might stop propagation.
    document.addEventListener("click", onClick, { capture: true });
    return () =>
      document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
