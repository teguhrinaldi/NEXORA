"use client";

import * as React from "react";
import { Send, Copy, RefreshCcw, AlertTriangle, MessagesSquare } from "lucide-react";

import type { Conversation } from "@/types/ai";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { useToast } from "@/hooks/use-toast";
import { formatTime } from "@/lib/formatters";
import { cn } from "@/lib/utils";

interface ChatThreadProps {
  conversation: Conversation | null;
  sending: boolean;
  error: boolean;
  onSend: (content: string) => void;
  onRegenerate: () => void;
  onRetry: () => void;
}

export function ChatThread({ conversation, sending, error, onSend, onRegenerate, onRetry }: ChatThreadProps) {
  const [draft, setDraft] = React.useState("");
  const { toast } = useToast();
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [conversation?.messages.length, sending]);

  async function handleCopy(content: string) {
    try {
      await navigator.clipboard.writeText(content);
      toast("Message copied");
    } catch {
      toast("Couldn't copy message");
    }
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const trimmed = draft.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setDraft("");
  }

  if (!conversation) {
    return (
      <div className="flex h-full items-center justify-center p-6">
        <EmptyState
          icon={MessagesSquare}
          title="No conversation selected"
          description="Choose a conversation from the list or start a new one."
        />
      </div>
    );
  }

  const lastMessage = conversation.messages[conversation.messages.length - 1];
  const canRegenerate = lastMessage?.role === "assistant" && !sending;

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-border px-4 py-3">
        <h3 className="truncate text-sm font-semibold text-foreground">{conversation.title}</h3>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4" aria-live="polite">
        <div className="mx-auto flex max-w-2xl flex-col gap-4">
          {conversation.messages.map((message) => (
            <div key={message.id} className={cn("flex flex-col gap-1", message.role === "user" ? "items-end" : "items-start")}>
              <div
                className={cn(
                  "max-w-[85%] whitespace-pre-line rounded-lg px-4 py-2.5 text-sm leading-relaxed",
                  message.role === "user"
                    ? "bg-accent text-accent-foreground"
                    : "border border-border bg-surface text-foreground"
                )}
              >
                {message.content}
              </div>
              <div className="flex items-center gap-2 px-1 text-[11px] text-muted-foreground">
                {formatTime(message.createdAt)}
                {message.role === "assistant" && (
                  <button
                    type="button"
                    onClick={() => handleCopy(message.content)}
                    className="inline-flex items-center gap-1 hover:text-foreground"
                    aria-label="Copy message"
                  >
                    <Copy className="size-3" />
                  </button>
                )}
              </div>
            </div>
          ))}

          {sending && (
            <div className="flex items-start">
              <div className="flex items-center gap-1.5 rounded-lg border border-border bg-surface px-4 py-3">
                <span className="size-1.5 animate-pulse rounded-full bg-muted-foreground [animation-delay:0ms]" />
                <span className="size-1.5 animate-pulse rounded-full bg-muted-foreground [animation-delay:150ms]" />
                <span className="size-1.5 animate-pulse rounded-full bg-muted-foreground [animation-delay:300ms]" />
              </div>
            </div>
          )}

          {error && (
            <div className="flex items-center gap-3 rounded-lg border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">
              <AlertTriangle className="size-4 shrink-0" />
              <span className="flex-1">NEXORA couldn&apos;t generate a response. Please try again.</span>
              <Button variant="outline" size="sm" onClick={onRetry}>
                Try again
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-border p-3">
        {canRegenerate && (
          <div className="mx-auto mb-2 max-w-2xl">
            <Button variant="ghost" size="sm" onClick={onRegenerate} className="gap-2 text-muted-foreground">
              <RefreshCcw className="size-3.5" />
              Regenerate response
            </Button>
          </div>
        )}
        <form onSubmit={handleSubmit} className="mx-auto flex max-w-2xl items-end gap-2">
          <Textarea
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                handleSubmit(event);
              }
            }}
            placeholder="Message NEXORA…"
            aria-label="Message"
            className="min-h-11 flex-1 resize-none"
            rows={1}
          />
          <Button type="submit" size="icon" disabled={!draft.trim() || sending} aria-label="Send message">
            <Send className="size-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
