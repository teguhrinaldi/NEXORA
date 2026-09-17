export type ApiKeyPermission = "read-only" | "read-write" | "full-access";

export interface ApiKey {
  id: string;
  name: string;
  maskedKey: string;
  permission: ApiKeyPermission;
  createdAt: string;
  lastUsedAt: string | null;
}
