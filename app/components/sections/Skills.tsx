import { skills } from "@/app/data/skills";
import { Section } from "@/app/components/ui/Section";

export function Skills() {
  return (
    <Section id="skills" title="Skills & Stack">
      <div className="grid gap-8 sm:grid-cols-2">
        {skills.map((group) => (
          <div key={group.category}>
            <h3 className="mb-3 text-base font-medium text-zinc-100">
              {group.category}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded border border-white/10 px-2.5 py-1 text-sm text-zinc-400"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
