export interface DailyUsagePoint {
  date: string;
  requests: number;
  tokens: number;
}

export interface ModelUsageShare {
  model: string;
  requests: number;
  share: number;
}

export interface RequestCategoryShare {
  category: string;
  requests: number;
}

export interface UsageHistoryRow {
  id: string;
  date: string;
  workspace: string;
  requests: number;
  tokens: number;
  cost: number;
}
