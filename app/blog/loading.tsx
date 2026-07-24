// The reading room with the ink not yet dry.
//
// Deliberately not a spinner: the header has already arrived (it lives in the
// layout, and the nav word has just landed in it), so what's missing is the
// type on the page — and that's what this stands in for. Bars sit exactly
// where the headline, the standfirst, and the post rows will be, so the swap
// to real content is a change of substance, not of layout.
//
// Worth knowing: every blog route is statically prerendered and prefetched on
// hover, so this rarely gets to show. It is here for the cold path — a first
// visit on a slow connection, where the alternative is a white screen.

function Bar({ className }: { className: string }) {
  return <div className={`rounded-full bg-muted ${className}`} />;
}

function PostRowSkeleton() {
  return (
    <li className="grid gap-2 border-b py-9 sm:grid-cols-[minmax(140px,190px)_1fr] sm:gap-10">
      <Bar className="h-3 w-28 sm:mt-1.5" />
      <div className="min-w-0">
        <Bar className="h-5 w-[min(100%,32ch)]" />
        <Bar className="mt-4 h-3 w-[min(100%,52ch)]" />
        <Bar className="mt-2 h-3 w-[min(100%,38ch)]" />
        <Bar className="mt-5 h-2.5 w-40" />
      </div>
    </li>
  );
}

export default function BlogLoading() {
  return (
    <div>
      <div
        // The whole skeleton breathes as one object rather than each bar
        // pulsing on its own, which would read as a dozen separate loaders.
        className="motion-safe:animate-[ink-settling_2.4s_ease-in-out_infinite]"
        aria-hidden
      >
        <div className="py-16 sm:py-24">
          <Bar className="h-[clamp(34px,5.5vw,60px)] w-[min(100%,14ch)]" />
          <Bar className="mt-4 h-[clamp(34px,5.5vw,60px)] w-[min(100%,8ch)]" />
          <Bar className="mt-8 h-4 w-[min(100%,54ch)]" />
          <Bar className="mt-3 h-4 w-[min(100%,44ch)]" />
        </div>
        <ul className="border-t">
          <PostRowSkeleton />
          <PostRowSkeleton />
          <PostRowSkeleton />
        </ul>
      </div>
      {/* Screen readers get the state in words; the bars are decorative. */}
      <p className="sr-only" role="status">
        Loading writing
      </p>
    </div>
  );
}
