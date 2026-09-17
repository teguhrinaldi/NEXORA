import { cn } from "@/lib/utils";

export function ProductFrame({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-xl border border-border-strong bg-surface shadow-2xl", className)}>
      <div className="flex items-center gap-1.5 border-b border-border bg-surface-soft px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-danger/60" />
        <span className="size-2.5 rounded-full bg-warning/60" />
        <span className="size-2.5 rounded-full bg-success/60" />
        <span className="ml-3 truncate rounded-sm bg-surface-raised px-3 py-0.5 text-[10px] text-muted-foreground">
          nexora.app
        </span>
      </div>
      {children}
    </div>
  );
}
