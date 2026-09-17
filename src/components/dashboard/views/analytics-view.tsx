import { StatCardGrid } from "@/components/dashboard/stat-card";
import { UsageTrendChart } from "@/components/analytics/usage-trend-chart";
import { ModelDistributionChart } from "@/components/analytics/model-distribution-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { analyticsStats } from "@/data/dashboard";
import { dailyUsage, modelUsage, topPrompts } from "@/data/analytics";
import { formatNumber } from "@/lib/formatters";

export function AnalyticsView() {
  return (
    <div className="flex flex-col gap-6">
      <StatCardGrid stats={analyticsStats} />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Usage trend — last 7 days</CardTitle>
          </CardHeader>
          <CardContent>
            <UsageTrendChart data={dailyUsage} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Model distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ModelDistributionChart data={modelUsage} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top prompts</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-col divide-y divide-border">
            {topPrompts.map((prompt, index) => (
              <li key={prompt.title} className="flex items-center gap-3 py-2.5 text-sm first:pt-0 last:pb-0">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-surface-soft text-[11px] font-semibold text-muted-foreground">
                  {index + 1}
                </span>
                <span className="min-w-0 flex-1 truncate text-foreground">{prompt.title}</span>
                <span className="shrink-0 text-xs text-muted-foreground">{formatNumber(prompt.uses)} uses</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
