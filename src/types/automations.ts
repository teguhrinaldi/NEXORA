export type AutomationNodeType = "trigger" | "action" | "condition" | "output";

export interface AutomationNode {
  id: string;
  type: AutomationNodeType;
  title: string;
  description: string;
}

export interface AutomationRun {
  id: string;
  status: "success" | "failed" | "running";
  startedAt: string;
  durationMs: number;
  summary: string;
}

export interface Automation {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  nodes: AutomationNode[];
  runs: AutomationRun[];
  successRate: number;
  updatedAt: string;
  createdAt: string;
}

export interface AutomationTemplate {
  id: string;
  name: string;
  description: string;
  nodes: AutomationNode[];
}
