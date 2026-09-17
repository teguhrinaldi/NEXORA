import Link from "next/link";
import { FileText, Mail } from "lucide-react";

import { StatCardGrid } from "@/components/dashboard/stat-card";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { ListCard } from "@/components/dashboard/list-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { teamStats } from "@/data/dashboard";
import { teamMembers, pendingInvitations, teamActivity } from "@/data/team";
import { documents } from "@/data/documents";
import { initials, formatRelativeTime, formatDate } from "@/lib/formatters";

export function TeamView() {
  return (
    <div className="flex flex-col gap-6">
      <StatCardGrid stats={teamStats} />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ActivityFeed title="Collaboration timeline" items={teamActivity} />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Team members</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {teamMembers.slice(0, 5).map((member) => (
              <div key={member.id} className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback style={{ background: member.avatarColor, color: "#0D0E0C" }}>
                    {initials(member.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{member.name}</p>
                  <p className="truncate text-xs text-muted-foreground capitalize">{member.role}</p>
                </div>
                {member.status === "suspended" && (
                  <Badge variant="warning" className="shrink-0">
                    Suspended
                  </Badge>
                )}
              </div>
            ))}
            <Link href="/app/team" className="mt-1 text-xs font-medium text-accent hover:underline">
              Manage team
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ListCard
          title="Shared documents"
          icon={FileText}
          viewAllHref="/app/documents"
          emptyTitle="No shared documents"
          emptyDescription="Documents shared with the team will appear here."
          items={documents
            .filter((d) => d.folder === "shared")
            .concat(documents.slice(0, 2))
            .slice(0, 4)
            .map((doc) => ({ id: doc.id, title: doc.title, meta: formatDate(doc.updatedAt), href: "/app/documents" }))}
        />

        <Card>
          <CardHeader>
            <CardTitle>Pending invitations</CardTitle>
          </CardHeader>
          <CardContent>
            {pendingInvitations.length === 0 ? (
              <p className="text-sm text-muted-foreground">No pending invitations.</p>
            ) : (
              <ul className="flex flex-col divide-y divide-border">
                {pendingInvitations.map((invite) => (
                  <li key={invite.id} className="flex items-center gap-3 py-2.5">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-surface-soft">
                      <Mail className="size-3.5 text-muted-foreground" aria-hidden="true" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm text-foreground">{invite.email}</p>
                      <p className="text-xs text-muted-foreground">
                        Invited {formatRelativeTime(invite.invitedAt)} · {invite.role}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <Link href="/app/team" className="mt-3 inline-block text-xs font-medium text-accent hover:underline">
              View all invitations
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
