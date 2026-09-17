import type { HelpArticle, HelpCategory } from "@/types/help";

export const helpCategories: { id: HelpCategory; label: string }[] = [
  { id: "getting-started", label: "Getting started" },
  { id: "ai-studio", label: "AI Studio" },
  { id: "automations", label: "Automations" },
  { id: "billing", label: "Billing" },
  { id: "team", label: "Team" },
  { id: "account", label: "Account" },
];

export const helpArticles: HelpArticle[] = [
  {
    id: "help-001",
    title: "Getting started with NEXORA",
    category: "getting-started",
    summary: "A quick tour of the workspace, sidebar, and command palette.",
    content:
      "NEXORA is organized around a single sidebar with three groups: Workspace, Management, and Support. Use the command palette (Ctrl/⌘ K) to jump anywhere instantly. Start in AI Studio to generate your first output, then save it as a document or prompt.",
    popular: true,
  },
  {
    id: "help-002",
    title: "Choosing the right AI Studio mode",
    category: "ai-studio",
    summary: "When to use Write, Rewrite, Summarize, and other modes.",
    content:
      "Write is best for starting from a blank page. Rewrite and Summarize work on existing text you paste in. Brainstorm generates multiple directions at once. Analyze Document is built for longer source material you want structured insight from.",
    popular: true,
  },
  {
    id: "help-003",
    title: "Building your first automation",
    category: "automations",
    summary: "Understand triggers, actions, conditions, and outputs.",
    content:
      "Every automation starts with a trigger — an event like a new document or a schedule. From there, chain one or more actions, optionally branch with a condition, and finish with an output such as saving a document or posting a notification.",
    popular: true,
  },
  {
    id: "help-004",
    title: "Understanding your usage and credits",
    category: "billing",
    summary: "How credits are calculated and what happens at your limit.",
    content:
      "Every AI Studio, Chat, or Automation action consumes credits based on tokens processed. You can monitor usage in real time from the Usage page. Approaching your limit triggers an in-app notification before requests are affected.",
    popular: false,
  },
  {
    id: "help-005",
    title: "Managing team roles and permissions",
    category: "team",
    summary: "The difference between Owner, Admin, Editor, and Viewer.",
    content:
      "Owners manage billing and can remove any member. Admins manage members and workspace settings. Editors can create and edit documents, prompts, and automations. Viewers have read-only access across the workspace.",
    popular: false,
  },
  {
    id: "help-006",
    title: "Changing your password and security settings",
    category: "account",
    summary: "Update credentials and review active sessions.",
    content:
      "Visit Settings → Security to update your password, review recent sign-ins, and manage two-factor preferences. Changes take effect immediately across all active sessions.",
    popular: false,
  },
  {
    id: "help-007",
    title: "Inviting teammates to your workspace",
    category: "team",
    summary: "Send invitations and set an initial role.",
    content:
      "From Team, select Invite member, enter an email address, and choose a starting role. Invitations remain pending until accepted and can be revoked at any time.",
    popular: false,
  },
  {
    id: "help-008",
    title: "Exporting AI Studio output",
    category: "ai-studio",
    summary: "Save results as documents or copy them directly.",
    content:
      "Every AI Studio result includes actions to copy, regenerate, save as a document, or save as a reusable prompt. Saved documents appear immediately in your Documents workspace.",
    popular: true,
  },
];
