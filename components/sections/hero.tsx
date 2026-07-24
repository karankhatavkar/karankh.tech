import { ViewTransition } from "react";
import Link from "next/link";
import { hero } from "@/app/data/hero";
import { profile } from "@/app/data/profile";
import { Button } from "@/components/ui/button";
import { TwinChat } from "@/components/twin/twin-chat";

// Hash entries scroll within the deck; "/blog" is a real route, so it gets
// next/link for prefetching (see the nav below).
const navLinks = [
  { label: "Featured", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Writing", href: "/blog" },
  { label: "Contact", href: "#contact" },
];

const railText =
  "font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground [writing-mode:vertical-rl] rotate-180";

// Abstract silhouette standing in for the B&W portrait until the shoot
// (DESIGN.md portrait spec); the photo build replaces this figure wholesale.
function PortraitPlaceholder() {
  return (
    <figure
      aria-hidden
      className="pointer-events-none absolute inset-y-0 right-0 z-0 w-full opacity-30 sm:w-[clamp(320px,42%,620px)] sm:opacity-100"
    >
      <div
        className="absolute inset-0"
        style={{
          background: [
            "radial-gradient(30% 24% at 52% 22%, rgba(10,10,10,0.82), rgba(10,10,10,0) 72%)",
            "radial-gradient(16% 12% at 55% 20%, rgba(255,255,255,0.55), rgba(255,255,255,0) 80%)",
            "radial-gradient(78% 46% at 50% 96%, rgba(10,10,10,0.62), rgba(10,10,10,0) 76%)",
            "radial-gradient(46% 34% at 50% 62%, rgba(10,10,10,0.28), rgba(10,10,10,0) 78%)",
          ].join(", "),
        }}
      />
      <div
        className="absolute inset-0 opacity-50 mix-blend-screen"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.7) 0.8px, transparent 1.2px)",
          backgroundSize: "4px 4px",
        }}
      />
      <figcaption className="absolute right-4 bottom-4 hidden rounded-md border border-dashed bg-background/90 px-2.5 py-1.5 font-mono text-[11px] tracking-wider text-muted-foreground sm:block">
        portrait placeholder — B&amp;W shoot pending
      </figcaption>
    </figure>
  );
}

export function Hero() {
  return (
    <div className="relative flex min-h-svh flex-col overflow-hidden">
      <PortraitPlaceholder />

      <header className="relative z-10 flex items-center justify-between gap-6 py-6 pr-[clamp(24px,4.5vw,56px)] pl-[clamp(64px,7vw,110px)]">
        <span className="text-base font-semibold tracking-tight">
          {profile.name}
        </span>
        <nav
          aria-label="Site"
          className="hidden gap-[clamp(16px,2.6vw,34px)] text-sm text-muted-foreground sm:flex"
        >
          {navLinks.map((link) => {
            const className = "transition-colors hover:text-foreground";

            // Plain <a> for in-page anchors so the CSS smooth-scroll handles
            // them; next/link for the route so it prefetches the static shell.
            return link.href.startsWith("#") ? (
              <a key={link.href} href={link.href} className={className}>
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={className}
                transitionTypes={["nav-forward"]}
                data-track="writing_opened"
              >
                {/* This word is the seed of the page it opens: it travels into
                    the blog header's own mark and stays there. Same name on
                    both ends is the whole mechanism — see `app/globals.css`. */}
                <ViewTransition name="writing-mark">
                  <span>{link.label}</span>
                </ViewTransition>
              </Link>
            );
          })}
        </nav>
        <Button
          size="lg"
          className="rounded-full px-6"
          nativeButton={false}
          // Scrolls to Contact rather than opening mail, so it is the top of
          // the funnel, not a conversion. `source` keeps the two separable.
          render={<a href="#contact" data-track="contact_click" data-track-source="hero" />}
        >
          Book a call ↗
        </Button>
      </header>

      <section
        id="hero"
        aria-label="Introduction"
        className="relative flex flex-1 flex-col justify-center pr-[clamp(24px,4.5vw,56px)] pl-[clamp(64px,7vw,110px)]"
      >
        {/* In slide mode the fixed SlideRail takes over this rail's job for
            the whole deck, so the hero drops its local copy. */}
        <div className="absolute inset-y-0 left-[clamp(18px,2.4vw,34px)] z-10 flex flex-col items-center justify-between py-6 slides:hidden">
          <span className={railText}>{hero.rail}</span>
          <span className="my-4 w-px flex-1 bg-border" aria-hidden />
          <span className={railText}>{hero.year}</span>
        </div>

        <ul className="relative z-10 mb-[clamp(28px,5vh,56px)] flex gap-[clamp(28px,4vw,56px)]">
          {hero.stats.map((stat) => (
            <li key={stat.label}>
              <span className="block text-[clamp(20px,2.3vw,27px)] leading-none font-semibold tracking-tight tabular-nums">
                {stat.value}
              </span>
              <span className="mt-1.5 block text-[13px] leading-snug font-medium text-foreground/70">
                {stat.label}
              </span>
            </li>
          ))}
        </ul>

        <div className="relative z-10">
          <h1 className="font-[520] tracking-[-0.04em]">
            <span className="block text-[clamp(40px,5.8vw,86px)] leading-[1.02]">
              {hero.greeting}
            </span>
            <span className="mt-[0.35em] block text-[clamp(24px,3vw,44px)] leading-[1.15]">
              {hero.expertise.map((segment) => (
                <span
                  key={segment.text}
                  className={segment.muted ? "text-muted-foreground" : undefined}
                >
                  {segment.text}
                </span>
              ))}
            </span>
          </h1>
          <p className="mt-[clamp(16px,2.4vh,26px)] max-w-[44ch] text-[clamp(14px,1.3vw,17px)] text-muted-foreground">
            {hero.support}
          </p>
          {/* The low-commitment ask sits ahead of the high-commitment one: a
              visitor who isn't ready to book a call can still get an answer
              without leaving the page. */}
          <div className="mt-[clamp(20px,3.4vh,32px)]">
            <TwinChat />
          </div>

          <div className="mt-[clamp(20px,3.4vh,32px)]">
            <Button
              size="lg"
              className="rounded-full px-6"
              nativeButton={false}
              render={<a href="#contact" />}
            >
              Book a call ↗
            </Button>
          </div>
        </div>

        <p className="relative z-10 mt-[clamp(36px,8vh,84px)] mb-7 text-[13px] text-muted-foreground">
          Scroll down ↓
        </p>
      </section>
    </div>
  );
}
