export type HelpCategory =
  | "getting-started"
  | "ai-studio"
  | "automations"
  | "billing"
  | "team"
  | "account";

export interface HelpArticle {
  id: string;
  title: string;
  category: HelpCategory;
  summary: string;
  content: string;
  popular: boolean;
}
