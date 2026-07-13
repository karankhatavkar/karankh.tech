import { certifications } from "@/app/data/certifications";
import { Section } from "@/components/sections/section";

export function Certifications() {
  return (
    <Section id="certifications" title="Certifications">
      <ul className="space-y-2">
        {certifications.map((cert) => (
          <li key={cert.code} className="flex items-baseline gap-3 text-sm">
            <span className="font-mono text-xs text-muted-foreground">
              {cert.code}
            </span>
            <span>{cert.name}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
