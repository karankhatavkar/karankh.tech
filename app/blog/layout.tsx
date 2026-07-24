import { ViewTransition } from "react";
import Link from "next/link";
import { profile } from "@/app/data/profile";

// The blog is the one place the site stops being a deck and becomes a
// document, so it brings its own frame: a reading-width column, a bar back to
// the portfolio, and ordinary continuous scroll. (The deck's scroll-snap is
// scoped to pages containing slides — see `app/globals.css`.)
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex min-h-svh w-full max-w-[72rem] flex-col px-[clamp(24px,7vw,110px)]">
      <header className="flex items-center justify-between gap-6 border-b py-6">
        <Link
          href="/"
          className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground transition-colors hover:text-foreground"
          transitionTypes={["nav-back"]}
        >
          <span aria-hidden>←</span> {profile.name}
        </Link>
        {/* Where the hero nav's "Writing" lands. It carries the same
            view-transition name, so the browser reads the two as one object
            and moves it here instead of swapping one word for another. */}
        <ViewTransition name="writing-mark">
          <Link
            href="/blog"
            className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground transition-colors hover:text-foreground"
          >
            Writing
          </Link>
        </ViewTransition>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="mt-20 flex flex-wrap items-center justify-between gap-3 border-t py-10 font-mono text-xs text-muted-foreground">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <span className="flex items-center gap-5">
          <Link
            href="/blog/feed.xml"
            className="transition-colors hover:text-foreground"
          >
            RSS
          </Link>
          <Link href="/#contact" className="transition-colors hover:text-foreground">
            Get in touch
          </Link>
        </span>
      </footer>
    </div>
  );
}
