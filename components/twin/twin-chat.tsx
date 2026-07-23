"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { findTwinAnswer, twin } from "@/app/data/twin";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { Button } from "@/components/ui/button";
import { TwinComposer } from "@/components/twin/twin-composer";
import {
  measurePanel,
  TwinWidget,
  type TwinLaunch,
  type TwinMessage,
} from "@/components/twin/twin-widget";

const PLACEHOLDER_MS = 3600;
const THINKING_MS = 550;

export function TwinChat() {
  const [barValue, setBarValue] = React.useState("");
  const [dockedValue, setDockedValue] = React.useState("");
  const [messages, setMessages] = React.useState<TwinMessage[]>([]);
  const [thinking, setThinking] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [launch, setLaunch] = React.useState<TwinLaunch | null>(null);

  const barRef = React.useRef<HTMLDivElement>(null);
  const replyTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    return () => {
      if (replyTimer.current) clearTimeout(replyTimer.current);
    };
  }, []);

  /** The pill keeps its place in the layout while the panel is up, so it can
   *  be re-measured after a resize and the panel still has somewhere true to
   *  fly back to. */
  const readLaunch = React.useCallback((): TwinLaunch | null => {
    const rect = barRef.current?.getBoundingClientRect();
    if (!rect) return null;
    return {
      origin: {
        left: rect.left,
        bottom: rect.bottom,
        width: rect.width,
        height: rect.height,
      },
      panel: measurePanel(),
    };
  }, []);

  React.useEffect(() => {
    if (!open) return;
    const onResize = () => setLaunch(readLaunch());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [open, readLaunch]);

  const send = React.useCallback((raw: string) => {
    const text = raw.trim().slice(0, twin.maxLength);
    if (!text) return;

    const stamp = Date.now();
    setMessages((current) => [
      ...current,
      { id: `q-${stamp}`, role: "user", text },
    ]);
    setThinking(true);

    if (replyTimer.current) clearTimeout(replyTimer.current);
    replyTimer.current = setTimeout(() => {
      const answer = findTwinAnswer(text);
      setThinking(false);
      setMessages((current) => [
        ...current,
        {
          id: `a-${stamp}`,
          role: "twin",
          text: answer.reply,
          sources: answer.sources,
        },
      ]);
    }, THINKING_MS);
  }, []);

  /** Sending from the hero takes the pill's rectangle with it — that is what
   *  the panel unfurls from. */
  const sendFromBar = React.useCallback(
    (text: string) => {
      setLaunch(readLaunch());
      send(text);
      setBarValue("");
      setOpen(true);
    },
    [readLaunch, send]
  );

  return (
    <>
      <TwinBar
        ref={barRef}
        value={barValue}
        onValueChange={setBarValue}
        onSubmit={() => sendFromBar(barValue)}
        onQuickPrompt={sendFromBar}
        handedOff={open}
      />

      <TwinWidget
        open={open}
        launch={launch}
        messages={messages}
        thinking={thinking}
        onOpenChange={setOpen}
      >
        <TwinComposer
          variant="docked"
          value={dockedValue}
          onValueChange={setDockedValue}
          placeholder={twin.composerPlaceholder}
          autoFocus
          onSubmit={() => {
            send(dockedValue);
            setDockedValue("");
          }}
        />
      </TwinWidget>
    </>
  );
}

type TwinBarProps = {
  value: string;
  onValueChange: (value: string) => void;
  onSubmit: () => void;
  onQuickPrompt: (prompt: string) => void;
  /** True while the panel holds the pill's spot, so the bar steps aside
   *  instead of sitting under its own copy. */
  handedOff: boolean;
  ref: React.Ref<HTMLDivElement>;
};

function TwinBar({
  value,
  onValueChange,
  onSubmit,
  onQuickPrompt,
  handedOff,
  ref,
}: TwinBarProps) {
  return (
    <div className="max-w-[min(560px,100%)]">
      <div className="flex items-center gap-2.5">
        <span className="font-mono text-[11px] tracking-[0.28em] text-muted-foreground uppercase">
          {twin.eyebrow}
        </span>
        <span className="flex items-center gap-1.5">
          <span aria-hidden className="size-1.5 rounded-full bg-emerald-500" />
          <span className="font-mono text-[11px] tracking-[0.12em] text-muted-foreground">
            {twin.status}
          </span>
        </span>
      </div>

      {/* Above the bar, because they answer "what am I allowed to ask?" before
          the empty field can make the visitor invent a question. One click
          sends. Narrow screens scroll them sideways rather than stacking three
          full-width rows into the fold. */}
      <div className="-mx-1 mt-3 flex gap-2 overflow-x-auto px-1 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:flex-wrap sm:overflow-x-visible sm:pb-0 [&::-webkit-scrollbar]:hidden">
        {twin.quickPrompts.map((prompt) => (
          <Button
            key={prompt}
            variant="outline"
            size="sm"
            onClick={() => onQuickPrompt(prompt)}
            className="h-8 shrink-0 rounded-lg border-border px-3 text-[13px] font-normal text-muted-foreground shadow-none hover:border-foreground/25 hover:text-foreground"
          >
            {prompt}
          </Button>
        ))}
      </div>

      <div
        className={cn(
          "mt-2.5 transition-opacity duration-200",
          handedOff && "pointer-events-none opacity-0"
        )}
      >
        <TwinComposer
          ref={ref}
          variant="bar"
          value={value}
          onValueChange={onValueChange}
          onSubmit={onSubmit}
          placeholderNode={<RollingPlaceholder paused={value.length > 0} />}
        />
      </div>

      <p className="mt-2.5 pl-1 font-mono text-[11px] text-muted-foreground">
        {twin.disclaimer}
      </p>
    </div>
  );
}

/** Samples roll rather than cut, so an empty field reads as one field showing
 *  several questions instead of text flickering in place. */
function RollingPlaceholder({ paused }: { paused: boolean }) {
  const [index, setIndex] = React.useState(0);
  const reduced = useReducedMotion();

  React.useEffect(() => {
    if (paused || reduced) return;
    const id = setInterval(() => {
      setIndex((current) => (current + 1) % twin.placeholders.length);
    }, PLACEHOLDER_MS);
    return () => clearInterval(id);
  }, [paused, reduced]);

  return (
    <span className="flex h-6 items-center overflow-hidden">
      <span key={index} className={reduced ? undefined : "animate-twin-roll"}>
        {twin.placeholders[index]}
      </span>
    </span>
  );
}
