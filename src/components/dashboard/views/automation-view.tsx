import Link from "next/link";
import { CheckCircle2, XCircle, Loader2, Workflow } from "lucide-react";

import { StatCardGrid } from "@/components/dashboard/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { automationStats } from "@/data/dashboard";
import { automations, automationTemplates } from "@/data/automations";
import { formatRelativeTime } from "@/lib/formatters";
import { cn } from "@/lib/utils";

const statusConfig = {
  success: { icon: CheckCircle2, className: "text-success" },
  failed: { icon: XCircle, className: "text-danger" },
  running: { icon: Loader2, className: "text-info animate-spin" },
};

export function AutomationView() {
  const allRuns = automations
    .flatMap((automation) =>
      automation.runs.map((run) => ({ ...run, key: `${automation.id}-${run.id}`, automationName: automation.name }))
    )
    .sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime());

  const failedRuns = allRuns.filter((run) => run.status === "failed");

  return (
    <div className="flex flex-col gap-6">
      <StatCardGrid stats={automationStats} />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="flex flex-col gap-4 lg:col-span-2">
          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Active automations</CardTitle>
              <Link href="/app/automations" className="text-xs font-medium text-accent hover:underline">
                View all
              </Link>
            </CardHeader>
            <CardContent className="flex flex-col divide-y divide-border">
              {automations.map((automation) => (
                <div key={automation.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                  <Workflow className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{automation.name}</p>
                    <p className="text-xs text-muted-foreground">{automation.successRate}% success rate</p>
                  </div>
                  <Badge variant={automation.enabled ? "success" : "outline"} className="shrink-0">
                    {automation.enabled ? "Enabled" : "Paused"}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent runs</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col divide-y divide-border">
              {allRuns.slice(0, 5).map((run) => {
                const config = statusConfig[run.status];
                return (
                  <div key={run.key} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                    <config.icon className={cn("mt-0.5 size-4 shrink-0", config.className)} aria-hidden="true" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm text-foreground">{run.summary}</p>
                      <p className="text-xs text-muted-foreground">
                        {run.automationName} · {formatRelativeTime(run.startedAt)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Failed executions</CardTitle>
            </CardHeader>
            <CardContent>
              {failedRuns.length === 0 ? (
                <p className="text-sm text-muted-foreground">No failed runs this week.</p>
              ) : (
                <ul className="flex flex-col divide-y divide-border">
                  {failedRuns.map((run) => (
                    <li key={run.key} className="py-2.5 first:pt-0 last:pb-0">
                      <p className="text-sm text-foreground">{run.automationName}</p>
                      <p className="text-xs text-danger">{run.summary}</p>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick start templates</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {automationTemplates.slice(0, 2).map((template) => (
                <div key={template.id} className="rounded-md border border-border bg-surface-soft p-3">
                  <p className="text-sm font-medium text-foreground">{template.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{template.description}</p>
                </div>
              ))}
              <Button variant="secondary" asChild size="sm">
                <Link href="/app/automations">Browse all templates</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
