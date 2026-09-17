import type { Conversation } from "@/types/ai";

export const conversations: Conversation[] = [
  {
    id: "conv-001",
    title: "Launch email subject lines",
    preview: "Can you give me ten subject line options for...",
    archived: false,
    updatedAt: "2026-09-15T18:20:00.000Z",
    createdAt: "2026-09-15T18:10:00.000Z",
    messages: [
      {
        id: "m1",
        role: "user",
        content: "Can you give me ten subject line options for our automation builder launch email?",
        createdAt: "2026-09-15T18:10:00.000Z",
      },
      {
        id: "m2",
        role: "assistant",
        content:
          "Here are ten options, grouped by angle:\n\nDirect benefit\n1. Automate the busywork, not the thinking\n2. Your workflows just got an editor\n\nCuriosity\n3. We rebuilt automations from scratch\n4. One workspace, fewer tools\n\nUrgency\n5. Automations are live in your workspace today\n\nSocial proof\n6. Teams are cutting report time by half\n\nPlain and confident\n7. Introducing Automations\n8. Build a workflow in under two minutes\n9. From trigger to output, without the tool-switching\n10. The workspace now runs itself, a little",
        createdAt: "2026-09-15T18:10:45.000Z",
      },
      {
        id: "m3",
        role: "user",
        content: "I like 2 and 8. Combine them into one.",
        createdAt: "2026-09-15T18:18:00.000Z",
      },
      {
        id: "m4",
        role: "assistant",
        content: "\"Your workflows just got an editor — build one in under two minutes.\"",
        createdAt: "2026-09-15T18:18:20.000Z",
      },
    ],
  },
  {
    id: "conv-002",
    title: "Weekly report summary",
    preview: "Summarize this week's usage report into three bullets",
    archived: false,
    updatedAt: "2026-09-14T09:05:00.000Z",
    createdAt: "2026-09-14T09:00:00.000Z",
    messages: [
      {
        id: "m1",
        role: "user",
        content: "Summarize this week's usage report into three bullets for leadership.",
        createdAt: "2026-09-14T09:00:00.000Z",
      },
      {
        id: "m2",
        role: "assistant",
        content:
          "• Requests grew 18% week-over-week, driven mostly by AI Studio's Rewrite mode.\n• Token cost per request dropped 6% after the new prompt caching pass.\n• Two workspaces are approaching their monthly limit and are strong upgrade candidates.",
        createdAt: "2026-09-14T09:00:40.000Z",
      },
    ],
  },
  {
    id: "conv-003",
    title: "Competitor tone comparison",
    preview: "How does our tone differ from typical AI tool copy?",
    archived: false,
    updatedAt: "2026-09-11T12:00:00.000Z",
    createdAt: "2026-09-11T11:50:00.000Z",
    messages: [
      {
        id: "m1",
        role: "user",
        content: "How does our tone differ from typical AI tool copy?",
        createdAt: "2026-09-11T11:50:00.000Z",
      },
      {
        id: "m2",
        role: "assistant",
        content:
          "Most AI tool copy leans on scale and speed — \"instant,\" \"unlimited,\" \"10x.\" Yours leans on clarity and restraint, describing outcomes rather than capability. That's a deliberate contrast worth protecting as the product grows.",
        createdAt: "2026-09-11T11:50:30.000Z",
      },
    ],
  },
  {
    id: "conv-004",
    title: "Archived: Old naming brainstorm",
    preview: "What are some alternative names for the automation builder?",
    archived: true,
    updatedAt: "2026-07-02T10:00:00.000Z",
    createdAt: "2026-07-02T09:45:00.000Z",
    messages: [
      {
        id: "m1",
        role: "user",
        content: "What are some alternative names for the automation builder?",
        createdAt: "2026-07-02T09:45:00.000Z",
      },
      {
        id: "m2",
        role: "assistant",
        content: "A few directions: Flows, Pathways, Circuits, Relay, Sequence Studio.",
        createdAt: "2026-07-02T09:45:25.000Z",
      },
    ],
  },
];
