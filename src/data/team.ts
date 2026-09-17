import type { ActivityEvent, PendingInvitation, TeamMember } from "@/types/team";

export const teamMembers: TeamMember[] = [
  { id: "tm-001", name: "Maya Chen", email: "maya@northlight.co", role: "owner", status: "active", avatarColor: "#C8F36A", joinedAt: "2026-01-10T00:00:00.000Z" },
  { id: "tm-002", name: "Theo Park", email: "theo@northlight.co", role: "admin", status: "active", avatarColor: "#91B8E8", joinedAt: "2026-02-14T00:00:00.000Z" },
  { id: "tm-003", name: "Priya Nair", email: "priya@northlight.co", role: "editor", status: "active", avatarColor: "#E6C477", joinedAt: "2026-03-22T00:00:00.000Z" },
  { id: "tm-004", name: "Diego Alvarez", email: "diego@northlight.co", role: "editor", status: "active", avatarColor: "#9BD98B", joinedAt: "2026-04-30T00:00:00.000Z" },
  { id: "tm-005", name: "Sofia Reyes", email: "sofia@northlight.co", role: "viewer", status: "suspended", avatarColor: "#E18B8B", joinedAt: "2026-05-18T00:00:00.000Z" },
];

export const pendingInvitations: PendingInvitation[] = [
  { id: "inv-001", email: "jordan@northlight.co", role: "editor", invitedAt: "2026-09-12T00:00:00.000Z", invitedBy: "Maya Chen" },
  { id: "inv-002", email: "lena@northlight.co", role: "viewer", invitedAt: "2026-09-14T00:00:00.000Z", invitedBy: "Theo Park" },
];

export const teamActivity: ActivityEvent[] = [
  { id: "ta-001", actor: "Theo Park", action: "enabled automation", target: "Weekly usage digest", createdAt: "2026-09-15T14:00:00.000Z" },
  { id: "ta-002", actor: "Priya Nair", action: "created document", target: "Customer Interview — Northwind", createdAt: "2026-09-10T08:15:00.000Z" },
  { id: "ta-003", actor: "Diego Alvarez", action: "updated prompt", target: "Shared Brand Voice Guide", createdAt: "2026-08-28T09:00:00.000Z" },
  { id: "ta-004", actor: "Maya Chen", action: "invited", target: "jordan@northlight.co", createdAt: "2026-09-12T00:00:00.000Z" },
  { id: "ta-005", actor: "Theo Park", action: "published document", target: "Automation Builder — Spec v2", createdAt: "2026-09-12T16:45:00.000Z" },
];
