import { profile } from "@/app/data/profile";
import { Section } from "@/components/sections/section";

export function About() {
  return (
    <Section id="about" title="About">
      <p className="max-w-[52ch] text-[clamp(20px,2.2vw,28px)] leading-snug text-pretty">
        {profile.bio}
      </p>
      <p className="mt-8 flex items-center gap-2.5 font-mono text-xs uppercase tracking-wider text-muted-foreground">
        <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden />
        Based in {profile.location} · Available for freelance &amp; contract
        work
      </p>
    </Section>
  );
}
