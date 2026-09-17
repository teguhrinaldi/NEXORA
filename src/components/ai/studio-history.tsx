"use client";

import { History, Trash2 } from "lucide-react";

import type { AiStudioResult } from "@/types/ai";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { aiStudioModes } from "@/components/ai/modes";
import { formatRelativeTime, truncate } from "@/lib/formatters";
import { cn } from "@/lib/utils";

interface StudioHistoryProps {
  history: AiStudioResult[];
  activeId?: string;
  onSelect: (result: AiStudioResult) => void;
  onClear: () => void;
}

export function StudioHistory({ history, activeId, onSelect, onClear }: StudioHistoryProps) {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle>Session history</CardTitle>
        {history.length > 0 && (
          <Button variant="ghost" size="icon-sm" onClick={onClear} aria-label="Clear history">
            <Trash2 className="size-3.5" />
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {history.length === 0 ? (
          <EmptyState
            icon={History}
            title="No history yet"
            description="Your generated outputs from this session will appear here."
          />
        ) : (
          <ul className="flex flex-col gap-1">
            {history.map((result) => {
              const mode = aiStudioModes.find((m) => m.id === result.request.mode);
              return (
                <li key={result.id}>
                  <button
                    type="button"
                    onClick={() => onSelect(result)}
                    className={cn(
                      "flex w-full flex-col items-start gap-1 rounded-md px-3 py-2 text-left transition-colors",
                      result.id === activeId ? "bg-accent/10 border border-accent/30" : "hover:bg-surface-soft border border-transparent"
                    )}
                  >
                    <div className="flex w-full items-center gap-2">
                      {mode && <mode.icon className="size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />}
                      <span className="truncate text-xs font-medium text-foreground">
                        {truncate(result.request.prompt || "Untitled request", 40)}
                      </span>
                    </div>
                    <span className="text-[11px] text-muted-foreground">{formatRelativeTime(result.createdAt)}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
