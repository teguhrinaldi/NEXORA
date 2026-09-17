import type { DashboardVariantMeta, StatCard } from "@/types/dashboard";

export const dashboardVariants: DashboardVariantMeta[] = [
  { id: "overview", label: "Overview", description: "General workspace summary" },
  { id: "creator", label: "Creator", description: "For content creators and marketers" },
  { id: "team", label: "Team", description: "For teams and organizations" },
  { id: "automation", label: "Automation", description: "For AI workflow builders" },
  { id: "analytics", label: "Analytics", description: "Usage and performance monitoring" },
];

export const overviewStats: StatCard[] = [
  { id: "s1", label: "AI requests this week", value: "3,631", change: "+12.4%", trend: "up" },
  { id: "s2", label: "Documents created", value: "18", change: "+3", trend: "up" },
  { id: "s3", label: "Active automations", value: "2", trend: "flat" },
  { id: "s4", label: "Credits remaining", value: "20,180", hint: "of 25,000" },
];

export const creatorStats: StatCard[] = [
  { id: "s1", label: "Drafts in progress", value: "6", trend: "flat" },
  { id: "s2", label: "Published this month", value: "14", change: "+4", trend: "up" },
  { id: "s3", label: "Avg. writing session", value: "22 min", trend: "down", change: "-3 min" },
  { id: "s4", label: "Saved templates", value: "9", trend: "flat" },
];

export const teamStats: StatCard[] = [
  { id: "s1", label: "Active members", value: "5", trend: "flat" },
  { id: "s2", label: "Shared documents", value: "24", change: "+6", trend: "up" },
  { id: "s3", label: "Pending invitations", value: "2", trend: "flat" },
  { id: "s4", label: "Team credit usage", value: "80.7%", trend: "up", change: "+5.2%" },
];

export const automationStats: StatCard[] = [
  { id: "s1", label: "Active workflows", value: "2", trend: "flat" },
  { id: "s2", label: "Runs this week", value: "47", change: "+9", trend: "up" },
  { id: "s3", label: "Success rate", value: "94.2%", trend: "up", change: "+1.1%" },
  { id: "s4", label: "Failed runs", value: "3", trend: "down", change: "-2" },
];

export const analyticsStats: StatCard[] = [
  { id: "s1", label: "Total AI requests", value: "4,820", change: "+15.3%", trend: "up" },
  { id: "s2", label: "Tokens used", value: "1.62M", change: "+8.7%", trend: "up" },
  { id: "s3", label: "Estimated cost", value: "$118.42", trend: "flat" },
  { id: "s4", label: "Top model", value: "Nexora Core", hint: "52% of requests" },
];
