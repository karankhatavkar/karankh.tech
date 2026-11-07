// The site's event vocabulary, and the single place a provider is plugged in.
//
// Why the indirection: Vercel Web Analytics collects **page views on every
// plan, but custom events only on Pro**. On Hobby the calls below are
// harmless no-ops that collect nothing. Keeping the call sites provider-
// agnostic means the expensive part — deciding what is worth measuring and
// instrumenting every touchpoint — is done once and survives whichever
// collector gets picked. Swapping to Umami, PostHog or anything else is
// `deliver()` below, and nothing else in the codebase moves.

declare global {
  interface Window {
    umami?: { track: (event: string, data?: AnalyticsProps) => void };
  }
}

/**
 * Every event the site emits. A closed union rather than free strings so a
 * typo can't quietly create a second, near-identical metric that splits the
 * data — the failure mode that makes analytics untrustworthy six months in.
 */
export type AnalyticsEvent =
  /** The conversion. Someone tried to start a conversation. */
  | "contact_click"
  /** The digital twin got used — evidence for whether it earns its upkeep. */
  | "twin_message_sent"
  /** A project pulled someone through to GitHub. Says what to lead with. */
  | "project_click"
  /** Someone left for a profile (LinkedIn, GitHub, X…). */
  | "profile_click"
  /** The blog was discovered from the deck. */
  | "writing_opened"
  /** A post was read to the end, not just opened. */
  | "post_read";

/**
 * Properties are deliberately low-cardinality — a handful of known values per
 * event, never anything free-form or personal. Two reasons: high-cardinality
 * properties make the reports useless, and anything derived from visitor input
 * (a twin question, say) would turn an analytics store into a place personal
 * data leaks to. The twin event records *that* a message was sent, never what
 * it said.
 */
export type AnalyticsProps = Record<string, string | number | boolean>;

/**
 * The provider. Umami Cloud's free tier collects custom events; Vercel's does
 * not below Pro, which is the whole reason for the split — `<Analytics />` in
 * the root layout keeps page views, and everything below goes to Umami.
 *
 * `window.umami` is absent whenever the script hasn't loaded: no website ID
 * configured (local dev), or a content blocker. Both are normal, and both must
 * cost a data point rather than an error.
 */
function deliver(event: AnalyticsEvent, props?: AnalyticsProps) {
  window.umami?.track(event, props);
}

export function trackEvent(event: AnalyticsEvent, props?: AnalyticsProps) {
  // Never let instrumentation break a page. An analytics failure should cost
  // a data point, not the click the visitor actually made.
  try {
    deliver(event, props);
  } catch {
    // Intentionally silent.
  }
}
