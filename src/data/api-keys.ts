import type { ApiKey } from "@/types/api-keys";

export const apiKeys: ApiKey[] = [
  {
    id: "key-001",
    name: "Production server",
    maskedKey: "nxr_live_••••••••••••7f2a",
    permission: "full-access",
    createdAt: "2026-06-01T00:00:00.000Z",
    lastUsedAt: "2026-09-15T08:12:00.000Z",
  },
  {
    id: "key-002",
    name: "Analytics export script",
    maskedKey: "nxr_live_••••••••••••c910",
    permission: "read-only",
    createdAt: "2026-07-18T00:00:00.000Z",
    lastUsedAt: "2026-09-10T22:00:00.000Z",
  },
  {
    id: "key-003",
    name: "Staging environment",
    maskedKey: "nxr_test_••••••••••••4b3e",
    permission: "read-write",
    createdAt: "2026-08-05T00:00:00.000Z",
    lastUsedAt: null,
  },
];
