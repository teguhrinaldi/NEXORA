export type DashboardVariant = "overview" | "creator" | "team" | "automation" | "analytics";

export interface DashboardVariantMeta {
  id: DashboardVariant;
  label: string;
  description: string;
}

export interface StatCard {
  id: string;
  label: string;
  value: string;
  change?: string;
  trend?: "up" | "down" | "flat";
  hint?: string;
}

export interface ActivityItem {
  id: string;
  actor: string;
  action: string;
  target: string;
  createdAt: string;
}
