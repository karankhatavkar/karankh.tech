"use client";

import * as React from "react";

/** Tracks `prefers-reduced-motion`. Starts `false` so the server render and
 *  the first client render agree; the subscription corrects it before paint. */
export function useReducedMotion() {
  return React.useSyncExternalStore(
    (onChange) => {
      const query = window.matchMedia("(prefers-reduced-motion: reduce)");
      query.addEventListener("change", onChange);
      return () => query.removeEventListener("change", onChange);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );
}
