import type { DailyUsagePoint, ModelUsageShare, RequestCategoryShare, UsageHistoryRow } from "@/types/analytics";

export const dailyUsage: DailyUsagePoint[] = [
  { date: "2026-09-09", requests: 412, tokens: 148000 },
  { date: "2026-09-10", requests: 480, tokens: 162500 },
  { date: "2026-09-11", requests: 395, tokens: 139200 },
  { date: "2026-09-12", requests: 528, tokens: 178300 },
  { date: "2026-09-13", requests: 601, tokens: 205100 },
  { date: "2026-09-14", requests: 573, tokens: 194800 },
  { date: "2026-09-15", requests: 642, tokens: 221400 },
];

export const weeklyUsage: DailyUsagePoint[] = [
  { date: "Week 29", requests: 2840, tokens: 980000 },
  { date: "Week 30", requests: 3120, tokens: 1042000 },
  { date: "Week 31", requests: 2950, tokens: 998000 },
  { date: "Week 32", requests: 3410, tokens: 1150000 },
  { date: "Week 33", requests: 3680, tokens: 1224000 },
  { date: "Week 34", requests: 3890, tokens: 1301000 },
  { date: "Week 35", requests: 4120, tokens: 1389000 },
];

export const modelUsage: ModelUsageShare[] = [
  { model: "Nexora Core", requests: 2140, share: 52 },
  { model: "Nexora Fast", requests: 1180, share: 29 },
  { model: "Nexora Precise", requests: 520, share: 13 },
  { model: "Nexora Vision", requests: 260, share: 6 },
];

export const requestCategories: RequestCategoryShare[] = [
  { category: "Writing", requests: 1620 },
  { category: "Summarization", requests: 980 },
  { category: "Chat", requests: 860 },
  { category: "Automation", requests: 420 },
  { category: "Translation", requests: 220 },
];

export const topPrompts: { title: string; uses: number }[] = [
  { title: "Weekly team update", uses: 94 },
  { title: "Blog post outline", uses: 112 },
  { title: "Meeting notes to action items", uses: 89 },
  { title: "Product launch announcement", uses: 128 },
  { title: "Social caption variations", uses: 76 },
];

export const usageHistory: UsageHistoryRow[] = [
  { id: "u1", date: "2026-09-15", workspace: "Growth", requests: 214, tokens: 74200, cost: 4.82 },
  { id: "u2", date: "2026-09-14", workspace: "Product", requests: 189, tokens: 61800, cost: 4.01 },
  { id: "u3", date: "2026-09-13", workspace: "Growth", requests: 240, tokens: 82500, cost: 5.36 },
  { id: "u4", date: "2026-09-12", workspace: "Support", requests: 96, tokens: 31200, cost: 2.03 },
  { id: "u5", date: "2026-09-11", workspace: "Product", requests: 158, tokens: 52300, cost: 3.4 },
  { id: "u6", date: "2026-09-10", workspace: "Growth", requests: 201, tokens: 68900, cost: 4.48 },
];

export const usageSummary = {
  totalRequests: 4820,
  tokensUsed: 1620400,
  estimatedCost: 118.42,
  usageLimit: 25000,
  creditsRemaining: 20180,
};
