import { FileText, BookMarked, Workflow, TrendingUp } from "lucide-react";

import { StatCardGrid } from "@/components/dashboard/stat-card";
import { QuickActionComposer } from "@/components/dashboard/quick-action-composer";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { ListCard } from "@/components/dashboard/list-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { overviewStats } from "@/data/dashboard";
import { documents } from "@/data/documents";
import { prompts } from "@/data/prompts";
import { automations } from "@/data/automations";
import { teamActivity } from "@/data/team";
import { formatDate } from "@/lib/formatters";

export function OverviewView() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground">Good to see you, Maya.</h3>
        <p className="mt-1 text-sm text-muted-foreground">Here&apos;s what&apos;s happening across your workspace today.</p>
      </div>

      <QuickActionComposer />

      <StatCardGrid stats={overviewStats} />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ActivityFeed title="Recent activity" items={teamActivity.slice(0, 4)} />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Productivity summary</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Monthly credit usage</span>
                <span>80.7%</span>
              </div>
              <Progress value={80.7} className="mt-2" />
            </div>
            <div className="flex items-center gap-2 rounded-md border border-border bg-surface-soft px-3 py-2 text-xs text-muted-foreground">
              <TrendingUp className="size-4 shrink-0 text-success" aria-hidden="true" />
              Output volume is up 12.4% compared to last week.
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <ListCard
          title="Recent documents"
          icon={FileText}
          viewAllHref="/app/documents"
          emptyTitle="No documents yet"
          emptyDescription="Documents you create will show up here."
          items={documents.slice(0, 4).map((doc) => ({
            id: doc.id,
            title: doc.title,
            meta: formatDate(doc.updatedAt),
            href: "/app/documents",
          }))}
        />
        <ListCard
          title="Saved prompts"
          icon={BookMarked}
          viewAllHref="/app/prompts"
          emptyTitle="No saved prompts"
          emptyDescription="Prompts you favorite will show up here."
          items={prompts
            .filter((p) => p.favorite)
            .slice(0, 4)
            .map((prompt) => ({
              id: prompt.id,
              title: prompt.title,
              meta: `${prompt.usageCount} uses`,
              href: "/app/prompts",
            }))}
        />
        <ListCard
          title="Active automations"
          icon={Workflow}
          viewAllHref="/app/automations"
          emptyTitle="No active automations"
          emptyDescription="Enable a workflow to see it here."
          items={automations
            .filter((a) => a.enabled)
            .map((automation) => ({
              id: automation.id,
              title: automation.name,
              meta: `${automation.successRate}% success`,
              href: "/app/automations",
            }))}
        />
      </div>
    </div>
  );
}
