import { profile } from "@/app/data/profile";
import { Section } from "@/app/components/ui/Section";

export function About() {
  return (
    <Section id="about" title="About">
      <p className="max-w-3xl text-lg leading-relaxed text-zinc-300">
        {profile.bio}
      </p>
      <p className="mt-6 font-mono text-sm text-zinc-500">
        Based in {profile.location} · Available for freelance &amp; contract work
      </p>
    </Section>
  );
}
