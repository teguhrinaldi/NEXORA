import { Sparkles, Zap, GitBranch, CircleCheck, Star, Search, FileText } from "lucide-react";

import { ProductFrame } from "@/components/marketing/product-frame";

export function AiStudioMockup() {
  return (
    <ProductFrame>
      <div className="flex flex-col gap-4 p-5">
        <div className="grid grid-cols-4 gap-2">
          {["Chat", "Write", "Summarize", "Rewrite"].map((mode, index) => (
            <div
              key={mode}
              className={`rounded-md border px-2 py-3 text-center text-[10px] ${
                index === 1 ? "border-accent bg-accent/10 text-foreground" : "border-border bg-surface-soft text-muted-foreground"
              }`}
            >
              {mode}
            </div>
          ))}
        </div>
        <div className="rounded-md border border-border bg-surface-soft p-3 text-[11px] text-muted-foreground">
          Draft a launch announcement for our new automation builder…
        </div>
        <div className="rounded-md border border-accent/30 bg-accent/5 p-3 text-[11px] leading-relaxed text-foreground">
          Your workflows just got an editor. Chain triggers, AI actions, and outputs into a workflow that runs
          without you — no code required.
        </div>
        <div className="flex gap-2">
          {["Copy", "Regenerate", "Save"].map((action) => (
            <span key={action} className="rounded-md border border-border bg-surface-soft px-2.5 py-1 text-[10px] text-muted-foreground">
              {action}
            </span>
          ))}
        </div>
      </div>
    </ProductFrame>
  );
}

export function AutomationMockup() {
  const steps = [
    { icon: Zap, label: "New document created", tone: "text-warning border-warning/30 bg-warning/10" },
    { icon: Sparkles, label: "Summarize content", tone: "text-accent border-accent/30 bg-accent/10" },
    { icon: GitBranch, label: "If longer than 500 words", tone: "text-info border-info/30 bg-info/10" },
    { icon: CircleCheck, label: "Save as document", tone: "text-success border-success/30 bg-success/10" },
  ];
  return (
    <ProductFrame>
      <div className="flex flex-col gap-3 p-5">
        {steps.map((step, index) => (
          <div key={step.label} className="flex items-center gap-3">
            <span className={`flex size-8 shrink-0 items-center justify-center rounded-full border ${step.tone}`}>
              <step.icon className="size-3.5" />
            </span>
            <div className="flex-1 rounded-md border border-border bg-surface-soft px-3 py-2 text-[11px] text-foreground">
              {step.label}
            </div>
            {index < steps.length - 1 && <span className="sr-only">then</span>}
          </div>
        ))}
      </div>
    </ProductFrame>
  );
}

export function PromptLibraryMockup() {
  const prompts = [
    { title: "Product launch announcement", uses: "128 uses", favorite: true },
    { title: "Weekly team update", uses: "94 uses", favorite: true },
    { title: "Blog post outline", uses: "112 uses", favorite: false },
  ];
  return (
    <ProductFrame>
      <div className="flex flex-col gap-3 p-5">
        <div className="flex items-center gap-2 rounded-md border border-border bg-surface-soft px-3 py-2">
          <Search className="size-3.5 text-muted-foreground" />
          <span className="text-[11px] text-muted-foreground">Search prompts…</span>
        </div>
        {prompts.map((prompt) => (
          <div key={prompt.title} className="flex items-center justify-between rounded-md border border-border bg-surface-soft px-3 py-2.5">
            <span className="text-[11px] text-foreground">{prompt.title}</span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-muted-foreground">{prompt.uses}</span>
              <Star className={`size-3.5 ${prompt.favorite ? "fill-accent text-accent" : "text-muted-foreground"}`} />
            </div>
          </div>
        ))}
      </div>
    </ProductFrame>
  );
}

export function DocumentWorkspaceMockup() {
  return (
    <ProductFrame>
      <div className="grid grid-cols-[120px_1fr]">
        <div className="hidden flex-col gap-2 border-r border-border p-3 sm:flex">
          {["All", "Drafts", "Marketing", "Shared"].map((folder, index) => (
            <div key={folder} className={`rounded px-2 py-1 text-[10px] ${index === 0 ? "bg-surface-soft text-foreground" : "text-muted-foreground"}`}>
              {folder}
            </div>
          ))}
        </div>
        <div className="p-4">
          <div className="mb-2 flex items-center gap-2">
            <FileText className="size-3.5 text-muted-foreground" />
            <span className="text-[11px] font-medium text-foreground">Q4 Positioning Narrative</span>
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="h-2 w-full rounded bg-surface-soft" />
            <div className="h-2 w-11/12 rounded bg-surface-soft" />
            <div className="h-2 w-4/5 rounded bg-surface-soft" />
            <div className="h-2 w-full rounded bg-surface-soft" />
            <div className="h-2 w-3/4 rounded bg-surface-soft" />
          </div>
          <div className="mt-3 flex gap-2">
            <span className="rounded-md border border-border bg-surface-soft px-2 py-1 text-[10px] text-muted-foreground">Rewrite</span>
            <span className="rounded-md border border-border bg-surface-soft px-2 py-1 text-[10px] text-muted-foreground">Summarize</span>
          </div>
        </div>
      </div>
    </ProductFrame>
  );
}

export function AnalyticsMockup() {
  const bars = [40, 65, 50, 80, 70, 90, 75];
  return (
    <ProductFrame>
      <div className="flex flex-col gap-4 p-5">
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Requests", value: "4,820" },
            { label: "Tokens", value: "1.62M" },
            { label: "Cost", value: "$118.42" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-md border border-border bg-surface-soft p-2.5">
              <p className="text-[9px] text-muted-foreground">{stat.label}</p>
              <p className="text-sm font-semibold text-foreground">{stat.value}</p>
            </div>
          ))}
        </div>
        <div className="flex h-24 items-end gap-2 rounded-md border border-border bg-surface-soft p-3">
          {bars.map((height, index) => (
            <div key={index} className="flex-1 rounded-t bg-accent/70" style={{ height: `${height}%` }} />
          ))}
        </div>
      </div>
    </ProductFrame>
  );
}
