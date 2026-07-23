"use client";

import * as React from "react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { XIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { twin, type TwinSource } from "@/app/data/twin";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { Button } from "@/components/ui/button";
import { Bubble, BubbleContent } from "@/components/ui/bubble";
import {
  DialogDescription,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { Message, MessageContent } from "@/components/ui/message";
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller";

export type TwinMessage = {
  id: string;
  role: "user" | "twin";
  text: string;
  sources?: readonly TwinSource[];
  /** True for answers streaming live from the backend — their `text` grows as
   *  tokens arrive, so it's rendered as-is. Answers without this flag are the
   *  offline fallback (full text at once) and get the reading-pace reveal. */
  live?: boolean;
};

/** The pill's rectangle at the moment of send, plus the size the panel will
 *  come to rest at. Both are computed by the caller so the flight vars are
 *  correct on the very first render — measuring the panel after it mounts
 *  reads it back mid-flight and lands it in the wrong place. */
export type TwinLaunch = {
  origin: { left: number; bottom: number; width: number; height: number };
  panel: { width: number; height: number };
};

/** The one definition of the panel's resting size. It lives here rather than
 *  in a Tailwind class because the flight arithmetic needs the same numbers,
 *  and two sources would drift. */
export function measurePanel(): TwinLaunch["panel"] {
  return {
    width: Math.min(680, window.innerWidth - 32),
    // The 128px floor is what keeps the close button clear of the viewport
    // edge on short screens — it hangs above the panel, so the panel can
    // never own the full height.
    height: Math.min(680, window.innerHeight - 128),
  };
}

type TwinWidgetProps = {
  open: boolean;
  launch: TwinLaunch | null;
  messages: TwinMessage[];
  thinking: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
};

export function TwinWidget({
  open,
  launch,
  messages,
  thinking,
  onOpenChange,
  children,
}: TwinWidgetProps) {
  const style = React.useMemo(() => {
    if (!launch) return undefined;
    const { origin, panel } = launch;
    // The panel centres itself with `translate(-50%, -50%)`, and that -50%
    // resolves against its own width — which is mid-animation at the start of
    // the flight. So the horizontal offset has to be taken against the pill's
    // width, not the panel's, or the panel starts 60px off the pill. Height
    // never animates, so the vertical offset uses the resting box.
    const startLeft = (window.innerWidth - origin.width) / 2;
    const restBottom = (window.innerHeight + panel.height) / 2;
    return {
      "--twin-panel-w": `${panel.width}px`,
      "--twin-panel-h": `${panel.height}px`,
      "--twin-fly-x": `${origin.left - startLeft}px`,
      "--twin-fly-y": `${origin.bottom - restBottom}px`,
      "--twin-fly-w": `${origin.width}px`,
      "--twin-fly-h": `${origin.height}px`,
    } as React.CSSProperties;
  }, [launch]);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogPrimitive.Backdrop
          data-twin-backdrop=""
          className="fixed inset-0 z-50 bg-foreground/12 supports-backdrop-filter:backdrop-blur-[2px]"
        />
        <DialogPrimitive.Popup
          data-twin-panel=""
          style={style}
          className="fixed top-1/2 left-1/2 z-50 outline-none"
        >
          {/* "Cross above the widget", literally: clear of the panel's top
              edge, so the conversation surface stays an unbroken rectangle. */}
          <DialogPrimitive.Close
            data-twin-fade=""
            render={
              <Button
                variant="ghost"
                size="icon-sm"
                // Carries its own ground: it floats over whatever the page
                // happens to have at that spot, which is often dark.
                className="absolute -top-11 right-0 rounded-full bg-background text-muted-foreground ring-1 ring-border hover:bg-background hover:text-foreground"
              />
            }
          >
            <XIcon />
            <span className="sr-only">Close chat</span>
          </DialogPrimitive.Close>

          <div
            data-twin-surface=""
            className="flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-background"
          >
            <header className="flex shrink-0 items-center justify-between gap-4 border-b px-5 py-4">
              <DialogTitle className="flex items-center gap-2.5 text-[15px]">
                <span
                  aria-hidden
                  className="size-1.5 rounded-full bg-emerald-500"
                />
                {twin.panelTitle}
              </DialogTitle>
              <span className="font-mono text-[10px] tracking-[0.24em] text-muted-foreground uppercase">
                Beta
              </span>
            </header>
            <DialogDescription className="sr-only">
              {twin.panelDescription}
            </DialogDescription>

            <div data-twin-fade="late" className="flex min-h-0 flex-1 flex-col">
              <MessageScrollerProvider autoScroll defaultScrollPosition="end">
                <MessageScroller className="min-h-0 flex-1">
                  <MessageScrollerViewport className="px-5">
                    {/* Stacked from the bottom. Anchoring the newest message
                        to the top instead leaves a two-line exchange floating
                        in an empty panel. */}
                    <MessageScrollerContent className="justify-end gap-5 py-6">
                      {messages.map((message) => (
                        <MessageScrollerItem
                          key={message.id}
                          messageId={message.id}
                        >
                          <TwinBubble
                            message={message}
                            onNavigate={() => onOpenChange(false)}
                          />
                        </MessageScrollerItem>
                      ))}
                      {thinking ? (
                        <MessageScrollerItem messageId="thinking">
                          <ThinkingBubble />
                        </MessageScrollerItem>
                      ) : null}
                    </MessageScrollerContent>
                  </MessageScrollerViewport>
                  <MessageScrollerButton className="rounded-full" />
                </MessageScroller>
              </MessageScrollerProvider>

              <div className="shrink-0 px-4 pb-4">{children}</div>
            </div>
          </div>
        </DialogPrimitive.Popup>
      </DialogPortal>
    </DialogPrimitive.Root>
  );
}

function TwinBubble({
  message,
  onNavigate,
}: {
  message: TwinMessage;
  onNavigate: () => void;
}) {
  const isUser = message.role === "user";

  return (
    <Message align={isUser ? "end" : "start"}>
      <MessageContent>
        <Bubble
          variant={isUser ? "default" : "muted"}
          align={isUser ? "end" : "start"}
        >
          <BubbleContent
            className={cn(
              "px-4 py-2.5 text-[15px]",
              isUser ? "rounded-2xl rounded-br-md" : "rounded-2xl rounded-bl-md"
            )}
          >
            {isUser || message.live ? (
              message.text
            ) : (
              <StreamedText text={message.text} />
            )}
          </BubbleContent>
        </Bubble>

        {/* An answer that can't say where it came from isn't finished. Each
            chip is the section of this page the reply was written from, so a
            sceptical reader can go and check it. */}
        {message.sources?.length ? (
          <div className="flex flex-wrap items-center gap-1.5 pt-0.5 pl-1">
            <span className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
              {twin.sourcesLabel}
            </span>
            {message.sources.map((source) => (
              <Button
                key={source.href}
                size="xs"
                variant="outline"
                nativeButton={false}
                onClick={onNavigate}
                className="h-6 rounded-full px-2.5 font-mono text-[10px] tracking-[0.12em] uppercase"
                render={<a href={source.href} />}
              >
                {source.label}
              </Button>
            ))}
          </div>
        ) : null}
      </MessageContent>
    </Message>
  );
}

function ThinkingBubble() {
  return (
    <Message align="start">
      <MessageContent>
        <Bubble variant="muted">
          <BubbleContent className="rounded-2xl rounded-bl-md px-4 py-3.5">
            <span className="sr-only">Thinking</span>
            <span aria-hidden className="flex items-center gap-1">
              {[0, 1, 2].map((index) => (
                <span
                  key={index}
                  className="size-1.5 animate-twin-think rounded-full bg-muted-foreground/60"
                  style={{ animationDelay: `${index * 140}ms` }}
                />
              ))}
            </span>
          </BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
  );
}

/** Reveals a full reply at reading pace. Used only for the offline fallback
 *  (curated page answers), where the whole string arrives at once — live
 *  backend answers stream their own text and skip this. */
function StreamedText({ text }: { text: string }) {
  const reduced = useReducedMotion();
  const [shown, setShown] = React.useState(0);

  React.useEffect(() => {
    if (reduced || shown >= text.length) return;
    const id = setTimeout(() => {
      setShown((value) => Math.min(text.length, value + 3));
    }, 16);
    return () => clearTimeout(id);
  }, [shown, text, reduced]);

  return <>{reduced ? text : text.slice(0, shown)}</>;
}
