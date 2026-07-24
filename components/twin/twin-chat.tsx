"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
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

// Twin-voice lines for the two guard responses (rate limit / daily budget cap).
// Copy pending Karan's approval.
const LIMIT_MESSAGE =
  "You're going quick — give me a few seconds and ask again.";
const RESTING_MESSAGE =
  "My twin's done for the day. Email me at work.karankh@gmail.com and you'll get the real me.";

export function TwinChat() {
  const [barValue, setBarValue] = React.useState("");
  const [dockedValue, setDockedValue] = React.useState("");
  const [messages, setMessages] = React.useState<TwinMessage[]>([]);
  const [thinking, setThinking] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [launch, setLaunch] = React.useState<TwinLaunch | null>(null);

  const barRef = React.useRef<HTMLDivElement>(null);
  const abortRef = React.useRef<AbortController | null>(null);
  /** Latest messages, read synchronously when composing a request so send()
   *  needn't re-create on every keystroke. */
  const messagesRef = React.useRef<TwinMessage[]>([]);

  React.useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  React.useEffect(() => {
    return () => abortRef.current?.abort();
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

  const appendDelta = React.useCallback((id: string, delta: string) => {
    setMessages((current) =>
      current.map((m) => (m.id === id ? { ...m, text: m.text + delta } : m))
    );
  }, []);

  /** Adds a finished twin message (a guard line or the offline fallback). No
   *  `live` flag, so the widget reveals it at reading pace. */
  const finish = React.useCallback(
    (id: string, text: string, sources?: TwinMessage["sources"]) => {
      setThinking(false);
      setMessages((current) => [...current, { id, role: "twin", text, sources }]);
    },
    []
  );

  /** When the live model can't be reached, answer from the curated page content
   *  instead of leaving the visitor hanging. */
  const finishWithFallback = React.useCallback(
    (history: TwinMessage[], id: string) => {
      const lastUser = [...history].reverse().find((m) => m.role === "user");
      const answer = findTwinAnswer(lastUser?.text ?? "");
      finish(id, answer.reply, answer.sources);
    },
    [finish]
  );

  const streamReply = React.useCallback(
    async (history: TwinMessage[], id: string) => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      let res: Response;
      try {
        res = await fetch("/api/chat", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            messages: history.map((m) => ({ role: m.role, text: m.text })),
          }),
          signal: controller.signal,
        });
      } catch {
        finishWithFallback(history, id);
        return;
      }

      const contentType = res.headers.get("content-type") ?? "";
      if (!res.ok || !res.body || !contentType.includes("text/event-stream")) {
        if (res.status === 429) return finish(id, LIMIT_MESSAGE);
        if (res.status === 503) return finish(id, RESTING_MESSAGE);
        return finishWithFallback(history, id);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let started = false;

      try {
        for (;;) {
          const { value, done } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });

          // SSE frames are separated by a blank line; keep the trailing partial.
          const frames = buffer.split("\n\n");
          buffer = frames.pop() ?? "";
          for (const frame of frames) {
            const line = frame.trim();
            if (!line.startsWith("data:")) continue;
            let event: { delta?: string; done?: boolean; error?: string };
            try {
              event = JSON.parse(line.slice(5).trim());
            } catch {
              continue;
            }
            if (event.delta) {
              if (!started) {
                // Swap the thinking dots for a live bubble on the first token.
                started = true;
                setThinking(false);
                setMessages((current) => [
                  ...current,
                  { id, role: "twin", text: event.delta ?? "", live: true },
                ]);
              } else {
                appendDelta(id, event.delta);
              }
            }
          }
        }
      } catch {
        // Aborted (new question / unmount) or the connection dropped mid-stream.
      }

      if (!started) finishWithFallback(history, id);
    },
    [appendDelta, finish, finishWithFallback]
  );

  const send = React.useCallback(
    (raw: string) => {
      const text = raw.trim().slice(0, twin.maxLength);
      if (!text) return;

      const stamp = Date.now();
      const history: TwinMessage[] = [
        ...messagesRef.current,
        { id: `q-${stamp}`, role: "user", text },
      ];
      // Turn number only — never the question itself. What a visitor asks is
      // their input, and an analytics store is the wrong place for it.
      trackEvent("twin_message_sent", { turn: history.length });
      setMessages(history);
      setThinking(true);
      void streamReply(history, `a-${stamp}`);
    },
    [streamReply]
  );

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
