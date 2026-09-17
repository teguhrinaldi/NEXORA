export type PromptCategory =
  | "marketing"
  | "writing"
  | "productivity"
  | "research"
  | "product"
  | "customer-support"
  | "strategy"
  | "personal";

export interface PromptVariable {
  key: string;
  label: string;
  placeholder: string;
}

export interface Prompt {
  id: string;
  title: string;
  description: string;
  category: PromptCategory;
  content: string;
  variables: PromptVariable[];
  favorite: boolean;
  usageCount: number;
  updatedAt: string;
  createdAt: string;
}
