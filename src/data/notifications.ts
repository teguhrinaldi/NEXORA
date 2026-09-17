import type { AppNotification } from "@/types/notifications";

export const notifications: AppNotification[] = [
  {
    id: "ntf-001",
    category: "automation",
    title: "Automation completed",
    description: "\"Document → Social recap\" generated a new caption from Q4 Positioning Narrative.",
    read: false,
    createdAt: "2026-09-15T09:00:00.000Z",
  },
  {
    id: "ntf-002",
    category: "team",
    title: "New team member joined",
    description: "Diego Alvarez accepted their invitation to Northlight workspace.",
    read: false,
    createdAt: "2026-09-14T11:30:00.000Z",
  },
  {
    id: "ntf-003",
    category: "billing",
    title: "Invoice paid",
    description: "Your September invoice for $49.00 was paid successfully.",
    read: true,
    createdAt: "2026-09-01T00:05:00.000Z",
  },
  {
    id: "ntf-004",
    category: "product",
    title: "New AI Studio mode available",
    description: "Analyze Document mode is now available in your workspace.",
    read: true,
    createdAt: "2026-08-27T10:00:00.000Z",
  },
  {
    id: "ntf-005",
    category: "security",
    title: "New sign-in detected",
    description: "A new sign-in from Windows · Chrome was detected on your account.",
    read: false,
    createdAt: "2026-09-13T20:15:00.000Z",
  },
  {
    id: "ntf-006",
    category: "automation",
    title: "Automation failed",
    description: "\"Support reply drafts\" failed to run due to missing customer context.",
    read: true,
    createdAt: "2026-08-17T10:00:00.000Z",
  },
];
