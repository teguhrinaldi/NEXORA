import type { LucideIcon } from "lucide-react";
import { PenLine, Search, FolderOpen, Workflow, Users2 } from "lucide-react";

export interface OnboardingGoal {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
}

export const onboardingGoals: OnboardingGoal[] = [
  { id: "create", label: "Create content", description: "Write, draft, and publish faster", icon: PenLine },
  { id: "research", label: "Research", description: "Gather and synthesize information", icon: Search },
  { id: "manage", label: "Manage documents", description: "Organize your team's knowledge", icon: FolderOpen },
  { id: "automate", label: "Automate work", description: "Build AI-powered workflows", icon: Workflow },
  { id: "collaborate", label: "Collaborate with team", description: "Work together in one workspace", icon: Users2 },
];

export interface WorkspaceType {
  id: string;
  label: string;
  description: string;
}

export const workspaceTypes: WorkspaceType[] = [
  { id: "solo", label: "Just me", description: "A personal workspace for individual work" },
  { id: "startup", label: "Startup team", description: "A small, fast-moving team" },
  { id: "agency", label: "Agency", description: "Managing work across multiple clients" },
  { id: "enterprise", label: "Enterprise", description: "A larger organization with structured teams" },
];

export interface PreferredTool {
  id: string;
  label: string;
}

export const preferredTools: PreferredTool[] = [
  { id: "ai-studio", label: "AI Studio" },
  { id: "chat", label: "Chat" },
  { id: "documents", label: "Documents" },
  { id: "prompts", label: "Prompt Library" },
  { id: "automations", label: "Automations" },
  { id: "analytics", label: "Usage Analytics" },
];
