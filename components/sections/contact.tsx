import { profile } from "@/app/data/profile";
import { Button } from "@/components/ui/button";

// Closing bookend to the hero's "Hello" — the page's second (and last)
// display-type moment, so the call to action is impossible to miss.
export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="border-t py-24 sm:py-32"
    >
      <p className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground">
        <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden />
        Available for freelance &amp; contract
      </p>
      <h2
        id="contact-heading"
        className="mt-6 text-[clamp(44px,7vw,96px)] leading-[0.95] font-[520] tracking-[-0.04em]"
      >
        Let&rsquo;s talk.
      </h2>
      <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-muted-foreground">
        Tell me about your retrieval problem, agent build, or ML pipeline —
        I&rsquo;ll reply within a day.
      </p>
      <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
        <Button
          size="lg"
          className="rounded-full px-6"
          nativeButton={false}
          render={<a href={`mailto:${profile.email}?subject=Call%20request`} />}
        >
          Book a call ↗
        </Button>
        <a
          href={`mailto:${profile.email}`}
          className="underline-offset-4 hover:underline"
        >
          {profile.email}
        </a>
      </div>
      <ul className="mt-14 flex flex-wrap gap-x-8 gap-y-3 font-mono text-xs uppercase tracking-wider">
        {profile.socials.map((social) => (
          <li key={social.label}>
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {social.label} ↗
            </a>
          </li>
        ))}
        <li>
          <a
            href={profile.resumeHref}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Résumé (PDF)
          </a>
        </li>
      </ul>
    </section>
  );
}
