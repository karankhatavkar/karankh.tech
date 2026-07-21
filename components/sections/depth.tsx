import { coreSkills, depth } from "@/app/data/depth";
import { projects } from "@/app/data/projects";
import { skills } from "@/app/data/skills";
import { Section } from "@/components/sections/section";

// The repo index. Names and stack stay visible so the column reads as a list
// of work at a glance; the description costs a hover, because six paragraphs
// open at once would bury the ranking this list exists to show.
//
// The reveal is CSS only — a `0fr → 1fr` grid row, no state, no client
// boundary. Below `slides:` (phones, short windows) every description is
// simply open: there is no hover there, and content behind an interaction
// that cannot happen is content that does not exist.
function RepoIndex() {
  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
        {depth.projectsLabel}
      </p>
      <ul className="mt-4 divide-y border-y">
        {projects.map((project, index) => (
          <li key={project.name} className="group">
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block py-3.5 outline-none focus-visible:ring-3 focus-visible:ring-ring/50 slides:py-[clamp(10px,1.6vh,16px)]"
            >
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span
                  className="font-mono text-[11px] tabular-nums text-muted-foreground/50"
                  aria-hidden
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-[clamp(15px,1.15vw,18px)] font-[520] tracking-[-0.02em]">
                  {project.name}
                </span>
                <span
                  aria-hidden
                  className="text-xs text-muted-foreground/60 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
                >
                  ↗
                </span>
                <span className="ml-auto font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  {project.tech.join(" · ")}
                </span>
              </div>
              <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-out slides:grid-rows-[0fr] slides:group-hover:grid-rows-[1fr] slides:group-focus-within:grid-rows-[1fr] motion-reduce:transition-none">
                <div className="overflow-hidden">
                  <p className="max-w-[54ch] pt-1.5 pl-[calc(2ch+1rem)] text-[13px] leading-relaxed text-justify text-muted-foreground">
                    {project.description}
                  </p>
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

// The full stack, nothing dropped, but ranked. Within each category the RAG and
// agent tools are pulled to the front and set in full ink; the rest follow in
// muted grey, so a client scanning for "has he touched Postgres" still finds it
// while the specialism reads first. Running type, not ~50 badges: at this count
// a badge grid is a wall, and order plus weight is what ranks it.
function Toolkit() {
  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
        {depth.skillsLabel}
      </p>
      <dl className="mt-6 grid gap-5 slides:mt-[clamp(14px,2.2vh,24px)] slides:gap-[clamp(10px,1.8vh,18px)]">
        {skills.map((group) => {
          // Core (RAG/agent) items first, the rest after — a stable partition,
          // so ink weight and reading order say the same thing.
          const ordered = [
            ...group.items.filter((item) => coreSkills.has(item)),
            ...group.items.filter((item) => !coreSkills.has(item)),
          ];

          return (
            <div key={group.category}>
              <dt className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground/70">
                {group.category}
              </dt>
              <dd className="mt-2 text-[15px] leading-relaxed">
                {ordered.map((item, index) => (
                  <span key={item}>
                    {index > 0 && (
                      // Light, but not lighter than the muted items themselves:
                      // below this the separators vanish between two full-ink
                      // skills and the run reads as one long phrase.
                      <span className="text-muted-foreground/55" aria-hidden>
                        {" · "}
                      </span>
                    )}
                    <span
                      className={
                        coreSkills.has(item)
                          ? "text-foreground"
                          : "text-muted-foreground/65"
                      }
                    >
                      {item}
                    </span>
                  </span>
                ))}
              </dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}

// Slide 3 (Jul 21, 2026) — the DEPTH merge from FLOW.md phase 2. Replaces the
// old standalone Skills and "More projects" slides: the six ML repos and the
// stack are one argument, not two, so they share a screen.
export function Depth() {
  return (
    <Section id="depth" title={depth.heading} variant="display">
      <p className="max-w-[68ch] text-[clamp(15px,1.05vw,17px)] leading-relaxed text-justify text-muted-foreground">
        {depth.support}
      </p>
      {/* The index takes the wider half: its rows carry a name, a stack line
          and a revealed sentence, where the toolkit is set solid and holds up
          in a narrower measure. */}
      <div className="mt-10 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 slides:mt-[clamp(20px,4vh,44px)]">
        <RepoIndex />
        <Toolkit />
      </div>
    </Section>
  );
}
