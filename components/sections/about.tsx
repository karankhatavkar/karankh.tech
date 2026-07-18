import type { CSSProperties } from "react";
import { ArrowUpRight, Camera, Plus, ScanSearch } from "lucide-react";

import { about } from "@/app/data/about";
import { profile } from "@/app/data/profile";
import { BrandMark } from "@/components/brand-marks";
import { Card, CardContent } from "@/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
} from "@/components/ui/empty";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { cn } from "@/lib/utils";

// Offsite presence. The mark names the platform, so the loud line is the
// handle itself and the platform name rides underneath as a mono caption —
// no element repeats what its neighbour already says.
function Elsewhere() {
  return (
    <div className="mt-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
        Elsewhere
      </p>
      {/* Narrower than the intro paragraph: keeps the trailing arrow tied to
          its row instead of stranded at the column edge. */}
      <div className="-mx-3 mt-3 max-w-[24rem]">
        <ItemGroup>
          {profile.socials.map((social) => {
            const external = social.href.startsWith("http");

            return (
              <Item
                key={social.label}
                size="sm"
                className="group/social"
                render={
                  <a
                    href={social.href}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  />
                }
              >
                <ItemMedia className="self-center">
                  <span
                    // The brand hex rides in as a custom property so the hover
                    // colour stays out of the class strings (and the theme).
                    style={
                      social.brand
                        ? ({ "--brand": social.brand } as CSSProperties)
                        : undefined
                    }
                    className={cn(
                      "flex size-9 items-center justify-center rounded-full bg-background text-foreground/80 ring-1 ring-foreground/10 transition-colors duration-200",
                      social.brand
                        ? "group-hover/social:text-(--brand) group-hover/social:ring-(--brand)/30 group-focus-visible/social:text-(--brand) group-focus-visible/social:ring-(--brand)/30"
                        : "group-hover/social:bg-foreground group-hover/social:text-background group-hover/social:ring-foreground group-focus-visible/social:bg-foreground group-focus-visible/social:text-background group-focus-visible/social:ring-foreground"
                    )}
                  >
                    <BrandMark name={social.label} className="size-[17px]" />
                  </span>
                </ItemMedia>
                <ItemContent className="gap-0.5">
                  <ItemTitle className="text-[13px] font-normal text-foreground/85 transition-colors group-hover/social:text-foreground">
                    {social.handle}
                  </ItemTitle>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    {social.label}
                  </span>
                </ItemContent>
                <ItemActions>
                  <ArrowUpRight
                    className="size-3.5 text-muted-foreground/60 transition-colors group-hover/social:text-foreground"
                    aria-hidden
                  />
                </ItemActions>
              </Item>
            );
          })}
        </ItemGroup>
      </div>
    </div>
  );
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
        <Elsewhere />
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
