import { hero } from "@/app/data/hero";
import { profile } from "@/app/data/profile";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
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

      <header className="relative z-10 flex items-center justify-between gap-6 px-[clamp(24px,4.5vw,56px)] py-6">
        <span className="text-base font-semibold tracking-tight">
          {profile.name}
        </span>
        <nav
          aria-label="Site"
          className="hidden gap-[clamp(16px,2.6vw,34px)] text-sm text-muted-foreground sm:flex"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="border-b border-foreground pb-0.5 text-sm font-medium whitespace-nowrap"
        >
          Book a call ↗
        </a>
      </header>

      <section
        id="hero"
        aria-label="Introduction"
        className="relative flex flex-1 flex-col justify-center pr-[clamp(24px,4.5vw,56px)] pl-[clamp(64px,7vw,110px)]"
      >
        <div className="absolute inset-y-0 left-[clamp(18px,2.4vw,34px)] z-10 flex flex-col items-center justify-between py-6">
          <span className={railText}>{hero.rail}</span>
          <span className="my-4 w-px flex-1 bg-border" aria-hidden />
          <span className={railText}>{hero.year}</span>
        </div>

        <ul className="relative z-10 mb-[clamp(28px,5vh,56px)] flex gap-[clamp(28px,4vw,56px)]">
          {hero.stats.map((stat) => (
            <li key={stat.label}>
              <span className="block text-[clamp(22px,2.6vw,32px)] leading-[1.1] font-semibold tracking-tight tabular-nums">
                {stat.value}
              </span>
              <span className="mt-1 block text-[12.5px] text-muted-foreground">
                {stat.label}
              </span>
            </li>
          ))}
        </ul>

        <div className="relative z-10">
          <h1 className="sr-only">
            {profile.name} — {hero.rail}
          </h1>
          <p
            aria-hidden
            className="text-[clamp(88px,15vw,210px)] leading-[0.88] font-[520] tracking-[-0.05em]"
          >
            {hero.greeting}
          </p>
          <p className="mt-[clamp(16px,2.4vh,26px)] ml-1.5 max-w-[40ch] text-[clamp(14px,1.3vw,17px)] text-muted-foreground">
            — <b className="font-semibold text-foreground">{hero.introLead}</b>{" "}
            {hero.introRest}
          </p>
        </div>

        <p className="relative z-10 mt-[clamp(36px,8vh,84px)] mb-7 ml-1.5 text-[13px] text-muted-foreground">
          Scroll down ↓
        </p>
      </section>
    </div>
  );
}
