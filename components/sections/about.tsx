import { profile } from "@/app/data/profile";
import { Section } from "@/components/sections/section";

export function About() {
  return (
    <Section id="about" title="About">
      <p className="max-w-3xl text-lg leading-relaxed">{profile.bio}</p>
      <p className="mt-6 font-mono text-sm text-muted-foreground">
        Based in {profile.location} · Available for freelance &amp; contract work
      </p>
    </Section>
  );
}
