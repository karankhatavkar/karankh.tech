import { profile } from "@/app/data/profile";
import { Section } from "@/components/sections/section";

export function Contact() {
  return (
    <Section id="contact" title="Contact">
      <p className="max-w-2xl text-lg leading-relaxed">
        Open to freelance and contract work in LLM, NLP, and ML. Reach out and
        let&apos;s talk.
      </p>
      <ul className="mt-6 space-y-2 text-sm">
        <li>
          <a
            href={`mailto:${profile.email}`}
            className="underline-offset-4 hover:underline"
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
              className="underline-offset-4 hover:underline"
            >
              {social.label}
            </a>
          </li>
        ))}
        <li>
          <a
            href={profile.resumeHref}
            className="underline-offset-4 hover:underline"
          >
            Download résumé (PDF)
          </a>
        </li>
      </ul>
    </Section>
  );
}
