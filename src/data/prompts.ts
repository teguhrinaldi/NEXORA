import type { Prompt, PromptCategory } from "@/types/prompts";

export const promptCategories: { id: PromptCategory; label: string }[] = [
  { id: "marketing", label: "Marketing" },
  { id: "writing", label: "Writing" },
  { id: "productivity", label: "Productivity" },
  { id: "research", label: "Research" },
  { id: "product", label: "Product" },
  { id: "customer-support", label: "Customer Support" },
  { id: "strategy", label: "Strategy" },
  { id: "personal", label: "Personal" },
];

export const prompts: Prompt[] = [
  {
    id: "prm-001",
    title: "Product launch announcement",
    description: "Draft a crisp, confident announcement for a new feature or product launch.",
    category: "marketing",
    content:
      "Write a launch announcement for {{product_name}}. Audience: {{audience}}. Highlight the core benefit in the first sentence, then explain what changed and why it matters.",
    variables: [
      { key: "product_name", label: "Product name", placeholder: "e.g. NEXORA Automations" },
      { key: "audience", label: "Audience", placeholder: "e.g. existing customers" },
    ],
    favorite: true,
    usageCount: 128,
    updatedAt: "2026-09-02T10:00:00.000Z",
    createdAt: "2026-06-11T10:00:00.000Z",
  },
  {
    id: "prm-002",
    title: "Weekly team update",
    description: "Summarize progress, blockers, and next steps for a status update.",
    category: "productivity",
    content:
      "Write a weekly update for the {{team_name}} team. Include: what shipped, what's in progress, and blockers. Keep it under 150 words.",
    variables: [{ key: "team_name", label: "Team name", placeholder: "e.g. Growth" }],
    favorite: true,
    usageCount: 94,
    updatedAt: "2026-09-08T10:00:00.000Z",
    createdAt: "2026-05-20T10:00:00.000Z",
  },
  {
    id: "prm-003",
    title: "Competitive research brief",
    description: "Generate a structured competitor comparison for a given market.",
    category: "research",
    content:
      "Research {{competitor}} and summarize their positioning, pricing model, and key differentiators relative to {{our_product}}.",
    variables: [
      { key: "competitor", label: "Competitor", placeholder: "e.g. Acme AI" },
      { key: "our_product", label: "Our product", placeholder: "e.g. NEXORA" },
    ],
    favorite: false,
    usageCount: 41,
    updatedAt: "2026-08-29T10:00:00.000Z",
    createdAt: "2026-07-02T10:00:00.000Z",
  },
  {
    id: "prm-004",
    title: "Customer reply — refund request",
    description: "Empathetic, policy-aware response template for refund requests.",
    category: "customer-support",
    content:
      "Write a support reply to a customer requesting a refund for {{reason}}. Be empathetic, reference the policy, and offer a clear next step.",
    variables: [{ key: "reason", label: "Reason given", placeholder: "e.g. billed twice" }],
    favorite: false,
    usageCount: 67,
    updatedAt: "2026-08-15T10:00:00.000Z",
    createdAt: "2026-04-18T10:00:00.000Z",
  },
  {
    id: "prm-005",
    title: "Feature spec outline",
    description: "Turn a rough idea into a structured product spec skeleton.",
    category: "product",
    content:
      "Draft a feature spec outline for {{feature}}. Include: problem statement, goals, non-goals, proposed solution, and open questions.",
    variables: [{ key: "feature", label: "Feature", placeholder: "e.g. saved views" }],
    favorite: true,
    usageCount: 55,
    updatedAt: "2026-09-10T10:00:00.000Z",
    createdAt: "2026-07-25T10:00:00.000Z",
  },
  {
    id: "prm-006",
    title: "Quarterly strategy summary",
    description: "Condense a strategy doc into an executive-ready summary.",
    category: "strategy",
    content:
      "Summarize the {{quarter}} strategy for {{initiative}} in three sections: context, bets, and success metrics.",
    variables: [
      { key: "quarter", label: "Quarter", placeholder: "e.g. Q4 2026" },
      { key: "initiative", label: "Initiative", placeholder: "e.g. expansion" },
    ],
    favorite: false,
    usageCount: 23,
    updatedAt: "2026-08-02T10:00:00.000Z",
    createdAt: "2026-06-30T10:00:00.000Z",
  },
  {
    id: "prm-007",
    title: "Blog post outline",
    description: "Structure a long-form article around a core thesis.",
    category: "writing",
    content:
      "Create an outline for a blog post about {{topic}}. Target reader: {{reader}}. Include a hook, three main sections, and a closing takeaway.",
    variables: [
      { key: "topic", label: "Topic", placeholder: "e.g. AI-assisted writing" },
      { key: "reader", label: "Reader", placeholder: "e.g. product managers" },
    ],
    favorite: true,
    usageCount: 112,
    updatedAt: "2026-09-12T10:00:00.000Z",
    createdAt: "2026-03-14T10:00:00.000Z",
  },
  {
    id: "prm-008",
    title: "Daily focus planner",
    description: "Turn a task list into a prioritized, time-boxed plan.",
    category: "personal",
    content:
      "Given this list of tasks: {{tasks}}, organize them into a prioritized plan for today with realistic time blocks.",
    variables: [{ key: "tasks", label: "Tasks", placeholder: "paste your task list" }],
    favorite: false,
    usageCount: 38,
    updatedAt: "2026-09-05T10:00:00.000Z",
    createdAt: "2026-08-01T10:00:00.000Z",
  },
  {
    id: "prm-009",
    title: "Social caption variations",
    description: "Generate multiple tone variations for a single social post.",
    category: "marketing",
    content:
      "Write three variations of a social caption for {{content}} — one confident, one playful, one concise. Keep each under 220 characters.",
    variables: [{ key: "content", label: "Content", placeholder: "e.g. a new case study" }],
    favorite: false,
    usageCount: 76,
    updatedAt: "2026-08-20T10:00:00.000Z",
    createdAt: "2026-05-05T10:00:00.000Z",
  },
  {
    id: "prm-010",
    title: "Meeting notes to action items",
    description: "Convert raw meeting notes into a clean list of owners and deadlines.",
    category: "productivity",
    content:
      "Convert these meeting notes into action items with an owner and due date where mentioned: {{notes}}",
    variables: [{ key: "notes", label: "Meeting notes", placeholder: "paste raw notes" }],
    favorite: true,
    usageCount: 89,
    updatedAt: "2026-09-14T10:00:00.000Z",
    createdAt: "2026-04-02T10:00:00.000Z",
  },
];
