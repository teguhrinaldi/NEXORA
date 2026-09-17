"use client";

import * as React from "react";
import { UserPlus, Mail, X, Users } from "lucide-react";

import type { TeamMember, PendingInvitation, TeamRole } from "@/types/team";
import type { InviteMemberValues } from "@/lib/validators";
import { InviteMemberDialog } from "@/components/team/invite-member-dialog";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { EmptyState } from "@/components/ui/empty-state";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useToast } from "@/hooks/use-toast";
import { teamMembers as seedMembers, pendingInvitations as seedInvitations, teamActivity } from "@/data/team";
import { documents } from "@/data/documents";
import { prompts } from "@/data/prompts";
import { initials } from "@/lib/formatters";
import { generateId } from "@/lib/id";

export function TeamWorkspace() {
  const [members, setMembers] = useLocalStorage<TeamMember[]>("nexora:team-members", seedMembers);
  const [invitations, setInvitations] = useLocalStorage<PendingInvitation[]>("nexora:team-invitations", seedInvitations);
  const [inviteOpen, setInviteOpen] = React.useState(false);
  const [removeTarget, setRemoveTarget] = React.useState<TeamMember | null>(null);
  const { toast } = useToast();

  function handleInvite(values: InviteMemberValues) {
    const invitation: PendingInvitation = {
      id: generateId("inv"),
      email: values.email,
      role: values.role,
      invitedAt: new Date().toISOString(),
      invitedBy: "Maya Chen",
    };
    setInvitations((prev) => [invitation, ...prev]);
    toast("Invitation sent", { description: `${values.email} was invited as ${values.role}.` });
  }

  function handleRevoke(id: string) {
    setInvitations((prev) => prev.filter((invite) => invite.id !== id));
    toast("Invitation revoked");
  }

  function handleRoleChange(id: string, role: TeamRole) {
    setMembers((prev) => prev.map((member) => (member.id === id ? { ...member, role } : member)));
    toast("Role updated");
  }

  function confirmRemove() {
    if (!removeTarget) return;
    setMembers((prev) => prev.filter((member) => member.id !== removeTarget.id));
    toast("Member removed", { description: `${removeTarget.name} no longer has access to this workspace.` });
    setRemoveTarget(null);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-end">
        <Button onClick={() => setInviteOpen(true)} className="gap-2">
          <UserPlus className="size-4" />
          Invite member
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Members ({members.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {members.length === 0 ? (
            <EmptyState icon={Users} title="No members yet" description="Invite teammates to start collaborating." className="border-0" />
          ) : (
            <ul className="flex flex-col divide-y divide-border">
              {members.map((member) => (
                <li key={member.id} className="flex flex-wrap items-center gap-3 px-5 py-3">
                  <Avatar>
                    <AvatarFallback style={{ background: member.avatarColor, color: "#0D0E0C" }}>
                      {initials(member.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{member.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{member.email}</p>
                  </div>
                  {member.status === "suspended" && <Badge variant="warning">Suspended</Badge>}
                  <Select
                    value={member.role}
                    onValueChange={(value) => handleRoleChange(member.id, value as TeamRole)}
                    disabled={member.role === "owner"}
                  >
                    <SelectTrigger className="w-32" aria-label={`Role for ${member.name}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="owner" disabled>
                        Owner
                      </SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="editor">Editor</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    disabled={member.role === "owner"}
                    onClick={() => setRemoveTarget(member)}
                    aria-label={`Remove ${member.name}`}
                  >
                    <X className="size-4" />
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pending invitations ({invitations.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {invitations.length === 0 ? (
            <EmptyState icon={Mail} title="No pending invitations" description="Invitations you send will appear here until accepted." className="border-0" />
          ) : (
            <ul className="flex flex-col divide-y divide-border">
              {invitations.map((invite) => (
                <li key={invite.id} className="flex items-center gap-3 px-5 py-3">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-surface-soft">
                    <Mail className="size-3.5 text-muted-foreground" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm text-foreground">{invite.email}</p>
                    <p className="text-xs text-muted-foreground">Invited as {invite.role} by {invite.invitedBy}</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleRevoke(invite.id)}>
                    Revoke
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Shared documents</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-col divide-y divide-border">
              {documents.slice(0, 4).map((doc) => (
                <li key={doc.id} className="py-2 text-sm text-foreground first:pt-0 last:pb-0">
                  {doc.title}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Shared prompts</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-col divide-y divide-border">
              {prompts.slice(0, 4).map((prompt) => (
                <li key={prompt.id} className="py-2 text-sm text-foreground first:pt-0 last:pb-0">
                  {prompt.title}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <ActivityFeed title="Team activity" items={teamActivity} />

      <InviteMemberDialog open={inviteOpen} onOpenChange={setInviteOpen} onInvite={handleInvite} />

      <Dialog open={!!removeTarget} onOpenChange={(open) => !open && setRemoveTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove {removeTarget?.name}?</DialogTitle>
            <DialogDescription>
              They will immediately lose access to this workspace, including all shared documents and prompts.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRemoveTarget(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmRemove}>
              Remove member
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
