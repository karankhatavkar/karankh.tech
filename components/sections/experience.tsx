import { experience } from "@/app/data/experience";
import { Section } from "@/components/sections/section";

export function Experience() {
  return (
    <Section id="experience" title="Experience">
      <div className="divide-y">
        {experience.map((job) => (
          <article
            key={job.company}
            className="grid gap-x-8 gap-y-2 py-8 first:pt-0 last:pb-0 sm:grid-cols-[150px_1fr]"
          >
            <div className="font-mono text-xs leading-relaxed text-muted-foreground">
              <p>{job.period}</p>
              <p>{job.location}</p>
            </div>
            <div className="min-w-0">
              <h3 className="text-lg font-medium">{job.company}</h3>
              <p className="mt-0.5 text-sm text-muted-foreground">{job.role}</p>
              <ul className="mt-4 space-y-2">
                {job.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="relative pl-5 text-sm leading-relaxed before:absolute before:left-0 before:text-muted-foreground/60 before:content-['—']"
                  >
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
