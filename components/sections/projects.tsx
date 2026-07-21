import { featuredProjects, type FeaturedProject } from "@/app/data/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Section } from "@/components/sections/section";

// Each featured build gets the same strip, so the two cards read as one
// system: inputs on the left, the thing you can trust on the right. The last
// node is filled rather than outlined because it is the output — the payoff
// the rest of the row exists to produce.
function Pipeline({ pipeline }: { pipeline: FeaturedProject["pipeline"] }) {
  return (
    <div className="mt-6 rounded-lg border bg-muted/50 p-4 slides:mt-[clamp(14px,2.2vh,24px)]">
      <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {pipeline.label}
      </p>
      <div className="flex min-h-[3.25rem] flex-wrap items-center gap-1.5 font-mono text-xs">
        {pipeline.nodes.map((node, index) => {
          const last = index === pipeline.nodes.length - 1;

          return (
            // Index keys are safe here: the list is static config, never
            // reordered or filtered at runtime.
            <div key={index} className="flex items-stretch gap-1.5">
              {index > 0 && (
                <span
                  className="flex items-center text-muted-foreground/60"
                  aria-hidden
                >
                  →
                </span>
              )}
              {Array.isArray(node) ? (
                // A stage doing two things at once, stacked so the parallelism
                // is visible rather than described.
                <span className="inline-flex flex-col justify-center gap-1 rounded-md border bg-background px-2.5 py-1.5">
                  {node.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </span>
              ) : (
                <Badge
                  variant={last ? "default" : "outline"}
                  className="font-mono"
                >
                  {node}
                </Badge>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// `flex flex-col` + `mt-auto` on the footer keeps both cards' buttons on the
// same baseline when the two summaries run to different heights.
function FeaturedProjectCard({ project }: { project: FeaturedProject }) {
  return (
    // On a short laptop the deck is height-bound, not width-bound, so the card
    // rhythm tightens with the viewport to keep both footers above the fold.
    <Card className="flex flex-col sm:[--card-spacing:--spacing(7)] slides:[--card-spacing:--spacing(6)]">
      <CardHeader>
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          {project.eyebrow}
        </p>
        <CardTitle className="mt-4 text-2xl font-semibold tracking-tight">
          {project.name}
        </CardTitle>
        <CardDescription>{project.tagline}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-relaxed text-justify text-muted-foreground">
          {project.summary}
        </p>

        <Pipeline pipeline={project.pipeline} />

        <dl className="mt-6 grid gap-y-4 slides:mt-[clamp(14px,2.2vh,24px)] slides:gap-y-3">
          {project.capabilities.map((capability) => (
            <div key={capability.label}>
              <dt className="text-sm font-medium">{capability.label}</dt>
              <dd className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                {capability.detail}
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-7 font-mono text-xs uppercase tracking-wider text-muted-foreground slides:mt-[clamp(16px,2.6vh,28px)]">
          {project.tech.join(" · ")}
        </p>
      </CardContent>
      <CardFooter className="mt-auto items-center gap-3 border-t">
        <Button
          nativeButton={false}
          render={
            <a
              href={project.liveHref}
              target="_blank"
              rel="noopener noreferrer"
            />
          }
        >
          <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden />
          Open demo
        </Button>
        {project.sourceHref ? (
          <Button
            variant="outline"
            nativeButton={false}
            render={
              <a
                href={project.sourceHref}
                target="_blank"
                rel="noopener noreferrer"
              />
            }
          >
            Source
          </Button>
        ) : (
          // Saying why there is no repo beats leaving a hole where the other
          // card has a button — a private repo is itself a signal.
          project.sourceNote && (
            <span className="font-mono text-xs text-muted-foreground">
              {project.sourceNote}
            </span>
          )
        )}
      </CardFooter>
    </Card>
  );
}

// The featured slide is the site's only live, clickable proof, so it takes the
// display heading and the full frame rather than the narrower right column.
// Two cards side by side: the RAG build that carries the pitch, and the agentic
// SaaS that shows the same method shipped as a product. They stack below `lg`,
// where half a column would squeeze the pipeline strips into unreadable wrapping.
export function Projects() {
  return (
    <Section id="projects" title="Featured" variant="display">
      <div className="grid items-stretch gap-6 lg:grid-cols-2">
        {featuredProjects.map((project) => (
          <FeaturedProjectCard key={project.name} project={project} />
        ))}
      </div>
    </Section>
  );
}

// `MoreProjects` lived here until Jul 21, 2026. The six repos it listed now
// render as the index inside `components/sections/depth.tsx`, ranked by
// proximity to the RAG work rather than left in a flat list.
