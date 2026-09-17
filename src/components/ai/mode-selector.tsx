"use client";

import { aiStudioModes } from "@/components/ai/modes";
import type { AiStudioMode } from "@/types/ai";
import { cn } from "@/lib/utils";

interface ModeSelectorProps {
  value: AiStudioMode;
  onChange: (mode: AiStudioMode) => void;
}

export function ModeSelector({ value, onChange }: ModeSelectorProps) {
  return (
    <div
      role="radiogroup"
      aria-label="AI Studio mode"
      className="grid grid-cols-2 gap-2 sm:grid-cols-4"
    >
      {aiStudioModes.map((mode) => {
        const active = mode.id === value;
        return (
          <button
            key={mode.id}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(mode.id)}
            className={cn(
              "flex flex-col items-start gap-2 rounded-md border px-3 py-3 text-left transition-colors",
              active
                ? "border-accent bg-accent/10"
                : "border-border bg-surface-soft hover:border-border-strong"
            )}
          >
            <mode.icon className={cn("size-4", active ? "text-accent" : "text-muted-foreground")} aria-hidden="true" />
            <span className={cn("text-xs font-medium", active ? "text-foreground" : "text-foreground/90")}>
              {mode.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
