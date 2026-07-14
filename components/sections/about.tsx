import { ArrowUpRight, Camera, Plus, ScanSearch } from "lucide-react";

import { about } from "@/app/data/about";
import { profile } from "@/app/data/profile";
import { Card, CardContent } from "@/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
} from "@/components/ui/empty";

// The @handle is the last path segment of the profile URL, so new entries in
// profile.socials need no extra field here.
function socialHandle(href: string) {
  return new URL(href).pathname.split("/").filter(Boolean).pop() ?? href;
}

// Portrait slot (DESIGN.md portrait spec); the B&W shoot replaces this tile
// with the real photo wholesale.
function PortraitTile() {
  return (
    <Empty className="aspect-[4/5] max-h-[540px] border border-dashed bg-muted/40">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Camera strokeWidth={1.5} aria-hidden />
        </EmptyMedia>
        <EmptyDescription className="font-mono text-[11px] tracking-wider">
          portrait — B&amp;W shoot pending
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}

// Bento composition after the hero: statement, the grounding standard as the
// anchor stat, portrait slot, and open-source proof with working-style notes.
export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="grid gap-10 border-t py-16 sm:grid-cols-2 sm:py-20 lg:grid-cols-[1.1fr_0.85fr_1fr] lg:gap-12 xl:gap-16"
    >
      <div className="flex flex-col sm:col-span-2 lg:col-span-1">
        <h2
          id="about-heading"
          className="text-[clamp(32px,4vw,48px)] leading-[1.05] font-[520] tracking-[-0.04em]"
        >
          {about.heading}
        </h2>
        <p className="mt-6 max-w-[46ch] text-[clamp(15px,1.05vw,17px)] leading-relaxed text-muted-foreground">
          {about.intro}
        </p>
        <p className="mt-10 flex items-start gap-2.5 font-mono text-xs uppercase tracking-wider text-muted-foreground">
          <span
            className="mt-1 size-1.5 shrink-0 rounded-full bg-emerald-500"
            aria-hidden
          />
          Based in {profile.location} · Available for freelance &amp; contract
          work
        </p>
        <ul className="mt-6 flex flex-col gap-2.5 font-mono text-xs tracking-wider">
          {profile.socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <span className="uppercase">{social.label}</span>{" "}
                <span className="text-foreground/70">
                  @{socialHandle(social.href)}
                </span>{" "}
                ↗
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-5">
        <Card>
          <CardContent className="flex flex-col gap-10">
            <span className="flex size-11 items-center justify-center rounded-full bg-background ring-1 ring-foreground/10">
              <ScanSearch className="size-5" strokeWidth={1.5} aria-hidden />
            </span>
            <div>
              <p className="text-[clamp(40px,4.2vw,56px)] leading-none font-semibold tracking-[-0.03em] tabular-nums">
                {about.stat.value}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {about.stat.caption}
              </p>
            </div>
          </CardContent>
        </Card>
        <PortraitTile />
      </div>

      <div className="flex flex-col gap-8">
        <Card
          size="sm"
          className="group/tile relative transition-colors hover:bg-muted/40"
        >
          <CardContent className="flex flex-col gap-8">
            <div className="flex items-start justify-between">
              <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                {about.openSource.eyebrow}
              </span>
              <ArrowUpRight
                className="size-4 text-muted-foreground transition-colors group-hover/tile:text-foreground"
                aria-hidden
              />
            </div>
            <p className="text-sm leading-relaxed">
              <a
                href={about.openSource.href}
                target="_blank"
                rel="noopener noreferrer"
                className="after:absolute after:inset-0"
              >
                {about.openSource.note}
              </a>
            </p>
          </CardContent>
        </Card>
        <ul className="flex flex-col gap-6">
          {about.points.map((point) => (
            <li key={point} className="flex gap-3.5">
              <span
                className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-foreground text-background"
                aria-hidden
              >
                <Plus className="size-3" strokeWidth={2.5} />
              </span>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {point}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
