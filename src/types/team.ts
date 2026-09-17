export type TeamRole = "owner" | "admin" | "editor" | "viewer";

export type MemberStatus = "active" | "invited" | "suspended";

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: TeamRole;
  status: MemberStatus;
  avatarColor: string;
  joinedAt: string;
}

export interface PendingInvitation {
  id: string;
  email: string;
  role: TeamRole;
  invitedAt: string;
  invitedBy: string;
}

export interface ActivityEvent {
  id: string;
  actor: string;
  action: string;
  target: string;
  createdAt: string;
}
