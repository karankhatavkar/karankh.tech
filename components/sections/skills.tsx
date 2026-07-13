import { skills } from "@/app/data/skills";
import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/sections/section";

export function Skills() {
  return (
    <Section id="skills" title="Skills & Stack">
      <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
        {skills.map((group) => (
          <div key={group.category}>
            <h3 className="mb-3 text-sm font-medium">{group.category}</h3>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li key={item}>
                  <Badge variant="secondary">{item}</Badge>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
