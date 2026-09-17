import { Sparkles, FileText, Workflow, TrendingUp } from "lucide-react";

import { ProductFrame } from "@/components/marketing/product-frame";

const stats = [
  { label: "AI requests this week", value: "3,631", change: "+12.4%" },
  { label: "Documents created", value: "18", change: "+3" },
  { label: "Active automations", value: "2", change: "stable" },
  { label: "Credits remaining", value: "20,180", change: "of 25,000" },
];

export function HeroPreview() {
  return (
    <ProductFrame>
      <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr]">
        <div className="hidden flex-col gap-4 border-r border-border bg-surface px-4 py-5 sm:flex">
          <div className="flex items-center gap-2">
            <span className="flex size-6 items-center justify-center rounded-md bg-accent text-[11px] font-bold text-accent-foreground">
              N
            </span>
            <span className="text-xs font-semibold text-foreground">NEXORA</span>
          </div>
          <div className="flex flex-col gap-1">
            {["Overview", "AI Studio", "Chat", "Documents", "Automations"].map((item, index) => (
              <div
                key={item}
                className={`rounded-md px-2.5 py-1.5 text-[11px] ${
                  index === 0 ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground"
                }`}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground">Good to see you, Maya.</p>
              <p className="text-xs text-muted-foreground">Here&apos;s what&apos;s happening today.</p>
            </div>
            <span className="hidden items-center gap-1.5 rounded-md border border-border bg-surface-soft px-2.5 py-1 text-[11px] text-muted-foreground sm:flex">
              <Sparkles className="size-3 text-accent" />
              Ask NEXORA anything…
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-md border border-border bg-surface-soft p-3">
                <p className="text-[10px] text-muted-foreground">{stat.label}</p>
                <p className="mt-1 text-base font-semibold text-foreground">{stat.value}</p>
                <p className="mt-0.5 text-[10px] text-success">{stat.change}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-md border border-border bg-surface-soft p-3">
              <p className="mb-2 flex items-center gap-1.5 text-[11px] font-medium text-foreground">
                <FileText className="size-3 text-muted-foreground" />
                Recent documents
              </p>
              <div className="flex flex-col gap-1.5">
                {["Q4 Positioning Narrative", "Automation Builder — Spec v2"].map((doc) => (
                  <div key={doc} className="truncate rounded bg-surface-raised px-2 py-1.5 text-[10px] text-muted-foreground">
                    {doc}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-md border border-border bg-surface-soft p-3">
              <p className="mb-2 flex items-center gap-1.5 text-[11px] font-medium text-foreground">
                <Workflow className="size-3 text-muted-foreground" />
                Active automations
              </p>
              <div className="flex flex-col gap-1.5">
                {["Document → Social recap", "Weekly usage digest"].map((flow) => (
                  <div key={flow} className="flex items-center justify-between rounded bg-surface-raised px-2 py-1.5 text-[10px] text-muted-foreground">
                    {flow}
                    <TrendingUp className="size-3 text-success" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProductFrame>
  );
}
