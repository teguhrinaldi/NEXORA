import type { Automation, AutomationTemplate } from "@/types/automations";

export const automations: Automation[] = [
  {
    id: "auto-001",
    name: "Document → Social recap",
    description: "Summarizes new documents and drafts a social caption automatically.",
    enabled: true,
    successRate: 96,
    updatedAt: "2026-09-14T10:00:00.000Z",
    createdAt: "2026-07-01T10:00:00.000Z",
    nodes: [
      { id: "n1", type: "trigger", title: "New document created", description: "Fires when a document is added to Marketing" },
      { id: "n2", type: "action", title: "Summarize content", description: "Condense the document into a 3-sentence summary" },
      { id: "n3", type: "action", title: "Generate social caption", description: "Draft a caption in the brand voice" },
      { id: "n4", type: "output", title: "Save result", description: "Store the caption as a draft document" },
    ],
    runs: [
      { id: "r1", status: "success", startedAt: "2026-09-15T09:00:00.000Z", durationMs: 3200, summary: "Generated caption for \"Q4 Positioning Narrative\"" },
      { id: "r2", status: "success", startedAt: "2026-09-13T14:00:00.000Z", durationMs: 2800, summary: "Generated caption for \"Pricing Page Copy Revision\"" },
      { id: "r3", status: "failed", startedAt: "2026-09-10T11:00:00.000Z", durationMs: 1400, summary: "Document exceeded length limit" },
    ],
  },
  {
    id: "auto-002",
    name: "Weekly usage digest",
    description: "Compiles usage analytics into a summary sent to the team channel every Monday.",
    enabled: true,
    successRate: 100,
    updatedAt: "2026-09-08T08:00:00.000Z",
    createdAt: "2026-05-15T08:00:00.000Z",
    nodes: [
      { id: "n1", type: "trigger", title: "Every Monday at 9:00 AM", description: "Scheduled weekly trigger" },
      { id: "n2", type: "action", title: "Compile usage data", description: "Pull the last 7 days of usage analytics" },
      { id: "n3", type: "condition", title: "If usage > 80% of limit", description: "Branch when a workspace nears its credit limit" },
      { id: "n4", type: "output", title: "Post digest", description: "Send formatted summary to the team" },
    ],
    runs: [
      { id: "r1", status: "success", startedAt: "2026-09-08T09:00:00.000Z", durationMs: 4100, summary: "Digest sent to 3 workspaces" },
      { id: "r2", status: "success", startedAt: "2026-09-01T09:00:00.000Z", durationMs: 3900, summary: "Digest sent to 3 workspaces" },
    ],
  },
  {
    id: "auto-003",
    name: "Support reply drafts",
    description: "Drafts a first-pass reply for incoming support prompts tagged \"refund\".",
    enabled: false,
    successRate: 88,
    updatedAt: "2026-08-20T13:00:00.000Z",
    createdAt: "2026-08-01T13:00:00.000Z",
    nodes: [
      { id: "n1", type: "trigger", title: "Prompt tagged \"refund\"", description: "Fires when a support prompt is used" },
      { id: "n2", type: "action", title: "Draft reply", description: "Generate an empathetic first-pass response" },
      { id: "n3", type: "output", title: "Save to drafts", description: "Store for human review before sending" },
    ],
    runs: [
      { id: "r1", status: "success", startedAt: "2026-08-19T10:00:00.000Z", durationMs: 2100, summary: "Draft created for ticket #4021" },
      { id: "r2", status: "failed", startedAt: "2026-08-17T10:00:00.000Z", durationMs: 900, summary: "Missing customer context" },
    ],
  },
];

export const automationTemplates: AutomationTemplate[] = [
  {
    id: "tpl-001",
    name: "Summarize and share",
    description: "Summarize any new document and post the summary to your team.",
    nodes: [
      { id: "t1", type: "trigger", title: "New document created", description: "Choose a folder to watch" },
      { id: "t2", type: "action", title: "Summarize content", description: "Condense to key points" },
      { id: "t3", type: "output", title: "Post to team", description: "Share the summary" },
    ],
  },
  {
    id: "tpl-002",
    name: "Prompt → Document pipeline",
    description: "Run a saved prompt on a schedule and save the output as a new document.",
    nodes: [
      { id: "t1", type: "trigger", title: "On a schedule", description: "Choose frequency" },
      { id: "t2", type: "action", title: "Run saved prompt", description: "Select a prompt from your library" },
      { id: "t3", type: "output", title: "Save as document", description: "Store the generated output" },
    ],
  },
  {
    id: "tpl-003",
    name: "Conditional escalation",
    description: "Check a condition before triggering a follow-up AI action.",
    nodes: [
      { id: "t1", type: "trigger", title: "New chat message", description: "Watch a conversation" },
      { id: "t2", type: "condition", title: "If sentiment is negative", description: "Branch on tone analysis" },
      { id: "t3", type: "action", title: "Draft escalation note", description: "Summarize for a human reviewer" },
      { id: "t4", type: "output", title: "Notify workspace", description: "Send an in-app notification" },
    ],
  },
];
