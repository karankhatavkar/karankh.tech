"use client";

import * as React from "react";
import { ArrowUpIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { twin } from "@/app/data/twin";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupTextarea,
} from "@/components/ui/input-group";

/** The counter stays out of the way until the cap is actually in reach. A
 *  number that sits there from character one reads as a warning about a limit
 *  nobody was going to hit. */
const COUNTER_FROM = 160;

type TwinComposerProps = {
  /** `bar` is the hero pill; `docked` is the same control at the foot of the
   *  panel, where it may grow to a few lines. */
  variant: "bar" | "docked";
  value: string;
  onValueChange: (value: string) => void;
  onSubmit: () => void;
  /** Rendered over an empty `bar` and cycled by the caller. */
  placeholderNode?: React.ReactNode;
  placeholder?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
};

export function TwinComposer({
  variant,
  value,
  onValueChange,
  onSubmit,
  placeholderNode,
  placeholder,
  disabled,
  autoFocus,
  className,
  ref,
}: TwinComposerProps) {
  const isBar = variant === "bar";
  const remaining = twin.maxLength - value.length;
  const canSend = value.trim().length > 0 && !disabled;
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  // The docked composer grows with the message and stops at three lines, so a
  // long question is visible without the panel's conversation shrinking away.
  React.useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 96)}px`;
  }, [value]);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (canSend) onSubmit();
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (canSend) onSubmit();
    }
  }

  const controlProps = {
    value,
    disabled,
    autoFocus,
    maxLength: twin.maxLength,
    "aria-label": twin.panelDescription,
    onKeyDown: handleKeyDown,
    onChange: (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => onValueChange(event.target.value.slice(0, twin.maxLength)),
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("relative w-full", className)}
      ref={ref as React.Ref<HTMLFormElement>}
    >
      <InputGroup
        className={cn(
          "h-13 items-center border-border bg-background pr-1.5 pl-1 shadow-none transition-colors",
          // A 3px ring reads as heavy next to display type this large, so
          // focus inks the hairline instead. Full contrast, not a tint — this
          // is the only thing marking the field as focused.
          "has-[[data-slot=input-group-control]:focus-visible]:ring-0",
          "has-[[data-slot=input-group-control]:focus-visible]:border-foreground",
          isBar ? "rounded-full" : "h-auto min-h-13 rounded-2xl"
        )}
      >
        {isBar ? (
          <InputGroupInput
            {...controlProps}
            placeholder=""
            className="h-11 px-4 text-[15px] md:text-[15px]"
          />
        ) : (
          <InputGroupTextarea
            {...controlProps}
            ref={textareaRef}
            rows={1}
            placeholder={placeholder}
            className="max-h-24 min-h-11 px-4 py-3 text-[15px] leading-6 md:text-[15px]"
          />
        )}

        {/* Sits over the real (empty) placeholder so the sample can roll
            instead of hard-cutting. Hidden from the a11y tree; the control
            carries a stable aria-label. */}
        {isBar && !value && placeholderNode ? (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-5 flex items-center overflow-hidden text-[15px] text-muted-foreground"
          >
            {placeholderNode}
          </span>
        ) : null}

        <InputGroupAddon align="inline-end" className="gap-2">
          {remaining <= twin.maxLength - COUNTER_FROM ? (
            <span
              aria-live="polite"
              className={cn(
                "font-mono text-[11px] tabular-nums",
                remaining === 0 ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {remaining}
            </span>
          ) : null}
          <Button
            type="submit"
            size="icon"
            disabled={!canSend}
            className="size-10 shrink-0 rounded-full"
          >
            <ArrowUpIcon className="size-4.5" />
            <span className="sr-only">Send question</span>
          </Button>
        </InputGroupAddon>
      </InputGroup>
    </form>
  );
}
