import type { LucideIcon } from "lucide-react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

interface SelectableCardProps {
  label: string;
  description?: string;
  icon?: LucideIcon;
  selected: boolean;
  onSelect: () => void;
  multiSelect?: boolean;
}

export function SelectableCard({ label, description, icon: Icon, selected, onSelect, multiSelect }: SelectableCardProps) {
  return (
    <button
      type="button"
      role={multiSelect ? "checkbox" : "radio"}
      aria-checked={selected}
      onClick={onSelect}
      className={cn(
        "flex w-full items-start gap-3 rounded-md border p-4 text-left transition-colors",
        selected ? "border-accent bg-accent/10" : "border-border bg-surface-soft hover:border-border-strong"
      )}
    >
      {Icon && (
        <span
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-md",
            selected ? "bg-accent/20 text-accent" : "bg-surface-raised text-muted-foreground"
          )}
        >
          <Icon className="size-4" aria-hidden="true" />
        </span>
      )}
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-foreground">{label}</p>
        {description && <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>}
      </div>
      <span
        className={cn(
          "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border",
          selected ? "border-accent bg-accent text-accent-foreground" : "border-border-strong"
        )}
        aria-hidden="true"
      >
        {selected && <Check className="size-3" strokeWidth={3} />}
      </span>
    </button>
  );
}
