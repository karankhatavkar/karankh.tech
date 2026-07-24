import type { CSSProperties } from "react";

import { profile } from "@/app/data/profile";
import { BrandMark } from "@/components/brand-marks";
import {
  Item,
  ItemContent,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { cn } from "@/lib/utils";

// Offsite presence. The mark names the platform, so the loud line is the
// handle itself — no element repeats what its neighbour already says.
//
// Shared by About and Contact so both close on the same handles in the same
// format. Laid out as a wrapping row rather than a stacked column.
export function FindMe() {
  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
        Find me
      </p>
      <div className="-mx-3 mt-2">
        <ItemGroup className="flex-row flex-wrap gap-x-1 gap-y-0">
          {profile.socials.map((social) => {
            const external = social.href.startsWith("http");

            return (
              <Item
                key={social.label}
                size="sm"
                className="group/social w-auto"
                render={
                  <a
                    href={social.href}
                    data-track={
                      // The mailto entry is a contact attempt, not a profile
                      // visit — counting it as the latter would understate the
                      // only metric that matters.
                      external ? "profile_click" : "contact_click"
                    }
                    data-track-source={external ? undefined : "find_me"}
                    data-track-label={external ? social.label : undefined}
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
                      "flex size-8 items-center justify-center rounded-full bg-background text-foreground/80 ring-1 ring-foreground/10 transition-colors duration-200",
                      social.brand
                        ? "group-hover/social:text-(--brand) group-hover/social:ring-(--brand)/30 group-focus-visible/social:text-(--brand) group-focus-visible/social:ring-(--brand)/30"
                        : "group-hover/social:bg-foreground group-hover/social:text-background group-hover/social:ring-foreground group-focus-visible/social:bg-foreground group-focus-visible/social:text-background group-focus-visible/social:ring-foreground",
                    )}
                  >
                    <BrandMark name={social.label} className="size-[15px]" />
                  </span>
                </ItemMedia>
                <ItemContent className="gap-0">
                  <ItemTitle className="text-[13px] font-normal text-foreground/85 transition-colors group-hover/social:text-foreground">
                    {social.handle}
                  </ItemTitle>
                </ItemContent>
              </Item>
            );
          })}
        </ItemGroup>
      </div>
    </div>
  );
}
