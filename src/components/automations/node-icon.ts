import { Zap, Sparkles, GitBranch, CircleCheck, type LucideIcon } from "lucide-react";

import type { AutomationNodeType } from "@/types/automations";

export const nodeTypeMeta: Record<AutomationNodeType, { label: string; icon: LucideIcon; className: string }> = {
  trigger: { label: "Trigger", icon: Zap, className: "text-warning border-warning/30 bg-warning/10" },
  action: { label: "AI Action", icon: Sparkles, className: "text-accent border-accent/30 bg-accent/10" },
  condition: { label: "Condition", icon: GitBranch, className: "text-info border-info/30 bg-info/10" },
  output: { label: "Output", icon: CircleCheck, className: "text-success border-success/30 bg-success/10" },
};
