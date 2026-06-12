import { certifications } from "@/app/data/certifications";
import { Section } from "@/app/components/ui/Section";

export function Certifications() {
  return (
    <Section id="certifications" title="Certifications">
      <ul className="space-y-2">
        {certifications.map((cert) => (
          <li
            key={cert.code}
            className="flex items-baseline gap-3 text-sm text-zinc-300"
          >
            <span className="font-mono text-xs text-zinc-500">{cert.code}</span>
            <span>{cert.name}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
