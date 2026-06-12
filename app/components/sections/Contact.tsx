import { profile } from "@/app/data/profile";
import { Section } from "@/app/components/ui/Section";

export function Contact() {
  return (
    <Section id="contact" title="Contact">
      <p className="max-w-2xl text-lg leading-relaxed text-zinc-300">
        Open to freelance and contract work in LLM, NLP, and ML. Reach out and
        let&apos;s talk.
      </p>
      <ul className="mt-6 space-y-2 text-sm">
        <li>
          <a
            href={`mailto:${profile.email}`}
            className="text-zinc-200 underline-offset-4 hover:underline"
          >
            {profile.email}
          </a>
        </li>
        {profile.socials.map((social) => (
          <li key={social.label}>
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-200 underline-offset-4 hover:underline"
            >
              {social.label}
            </a>
          </li>
        ))}
        <li>
          <a
            href={profile.resumeHref}
            className="text-zinc-200 underline-offset-4 hover:underline"
          >
            Download résumé (PDF)
          </a>
        </li>
      </ul>
    </Section>
  );
}
