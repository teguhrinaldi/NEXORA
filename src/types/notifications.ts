export type NotificationCategory = "product" | "billing" | "team" | "automation" | "security";

export interface AppNotification {
  id: string;
  category: NotificationCategory;
  title: string;
  description: string;
  read: boolean;
  createdAt: string;
}
