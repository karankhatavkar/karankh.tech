import { profile } from "@/app/data/profile";
import { FindMe } from "@/components/find-me";
import { Button } from "@/components/ui/button";

// Closing bookend to the hero's "Hello" — the page's second (and last)
// display-type moment, so the call to action is impossible to miss.
export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="border-t py-24 sm:py-32 slides:border-t-0 slides:py-0"
    >
      <p className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground">
        <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden />
        Based in Pune
      </p>
      <h2
        id="contact-heading"
        className="mt-6 text-[clamp(44px,7vw,96px)] leading-[0.95] font-[520] tracking-[-0.04em]"
      >
        Get in touch.
      </h2>
      <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-muted-foreground">
        For work, research, or questions about anything on this site, email
        is the fastest way to reach me.
      </p>
      <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
        <Button
          size="lg"
          className="rounded-full px-6"
          nativeButton={false}
          render={
            <a
              href={`mailto:${profile.email}`}
              data-track="contact_click"
              data-track-source="contact_cta"
            />
          }
        >
          Email me ↗
        </Button>
        <a
          href={`mailto:${profile.email}`}
          className="underline-offset-4 hover:underline"
          data-track="contact_click"
          data-track-source="email"
        >
          {profile.email}
        </a>
      </div>
      {/* Same handles-with-logos block as About, so the page closes on one
          consistent "find me" format. */}
      <div className="mt-14">
        <FindMe />
      </div>
    </section>
  );
}
