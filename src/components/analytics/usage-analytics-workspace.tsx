"use client";

import * as React from "react";

import { StatCardGrid } from "@/components/dashboard/stat-card";
import { UsageTrendChart } from "@/components/analytics/usage-trend-chart";
import { ModelDistributionChart } from "@/components/analytics/model-distribution-chart";
import { UsageHistoryTable } from "@/components/analytics/usage-history-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  dailyUsage,
  weeklyUsage,
  modelUsage,
  requestCategories,
  topPrompts,
  usageHistory,
  usageSummary,
} from "@/data/analytics";
import { formatCompactNumber, formatCurrency, formatNumber, formatPercent } from "@/lib/formatters";
import type { StatCard as StatCardType } from "@/types/dashboard";

export function UsageAnalyticsWorkspace() {
  const [range, setRange] = React.useState<"daily" | "weekly">("daily");
  const [period, setPeriod] = React.useState("7d");
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timeout);
  }, []);

  const stats: StatCardType[] = [
    { id: "s1", label: "Total AI requests", value: formatNumber(usageSummary.totalRequests), change: "+15.3%", trend: "up" },
    { id: "s2", label: "Tokens used", value: formatCompactNumber(usageSummary.tokensUsed), change: "+8.7%", trend: "up" },
    { id: "s3", label: "Estimated cost", value: formatCurrency(usageSummary.estimatedCost) },
    {
      id: "s4",
      label: "Credits remaining",
      value: formatNumber(usageSummary.creditsRemaining),
      hint: `of ${formatNumber(usageSummary.usageLimit)}`,
    },
  ];

  const usagePercent = Math.round(((usageSummary.usageLimit - usageSummary.creditsRemaining) / usageSummary.usageLimit) * 100);

  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
        <Skeleton className="h-72" />
        <Skeleton className="h-56" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <StatCardGrid stats={stats} />

      <Card>
        <CardHeader>
          <CardTitle>Monthly limit usage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{formatPercent(usagePercent)} used</span>
            <span>
              {formatNumber(usageSummary.usageLimit - usageSummary.creditsRemaining)} / {formatNumber(usageSummary.usageLimit)}{" "}
              credits
            </span>
          </div>
          <Progress value={usagePercent} className="mt-2" />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle>Usage trend</CardTitle>
            <Tabs value={range} onValueChange={(value) => setRange(value as "daily" | "weekly")}>
              <TabsList>
                <TabsTrigger value="daily">Daily</TabsTrigger>
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <UsageTrendChart data={range === "daily" ? dailyUsage : weeklyUsage} />
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

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Request categories</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {requestCategories.map((category) => {
              const max = Math.max(...requestCategories.map((c) => c.requests));
              return (
                <div key={category.category}>
                  <div className="mb-1.5 flex items-center justify-between text-xs">
                    <span className="font-medium text-foreground">{category.category}</span>
                    <span className="text-muted-foreground">{formatNumber(category.requests)}</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-surface-soft">
                    <div
                      className="h-full rounded-full bg-info"
                      style={{ width: `${(category.requests / max) * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

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

      <div className="flex justify-end">
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-40" aria-label="Filter usage history by period">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <UsageHistoryTable rows={usageHistory} />
    </div>
  );
}
