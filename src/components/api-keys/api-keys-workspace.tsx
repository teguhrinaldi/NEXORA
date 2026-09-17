"use client";

import * as React from "react";
import { Plus, KeyRound, ShieldCheck } from "lucide-react";

import type { ApiKey } from "@/types/api-keys";
import type { CreateApiKeyValues } from "@/lib/validators";
import { CreateApiKeyDialog } from "@/components/api-keys/create-api-key-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useToast } from "@/hooks/use-toast";
import { generateId } from "@/lib/id";
import { apiKeys as seedApiKeys } from "@/data/api-keys";
import { formatDate, formatRelativeTime } from "@/lib/formatters";

const permissionLabel = { "read-only": "Read only", "read-write": "Read & write", "full-access": "Full access" } as const;

export function ApiKeysWorkspace() {
  const [keys, setKeys] = useLocalStorage<ApiKey[]>("nexora:api-keys", seedApiKeys);
  const [createOpen, setCreateOpen] = React.useState(false);
  const [revokeTarget, setRevokeTarget] = React.useState<ApiKey | null>(null);
  const { toast } = useToast();

  function handleCreate(values: CreateApiKeyValues, fullKey: string) {
    const newKey: ApiKey = {
      id: generateId("key"),
      name: values.name,
      maskedKey: `${fullKey.slice(0, 12)}••••••••••••${fullKey.slice(-4)}`,
      permission: values.permission,
      createdAt: new Date().toISOString(),
      lastUsedAt: null,
    };
    setKeys((prev) => [newKey, ...prev]);
  }

  function confirmRevoke() {
    if (!revokeTarget) return;
    setKeys((prev) => prev.filter((key) => key.id !== revokeTarget.id));
    toast("API key revoked", { description: `"${revokeTarget.name}" can no longer access the API.` });
    setRevokeTarget(null);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start gap-3 rounded-md border border-info/30 bg-info/10 p-4 text-sm text-info">
        <ShieldCheck className="mt-0.5 size-4 shrink-0" />
        <p>
          API keys grant programmatic access to your workspace. This interface is ready for backend integration — keys
          generated here are for demonstration purposes only.
        </p>
      </div>

      <div className="flex justify-end">
        <Button onClick={() => setCreateOpen(true)} className="gap-2">
          <Plus className="size-4" />
          Create key
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>API keys ({keys.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {keys.length === 0 ? (
            <EmptyState
              icon={KeyRound}
              title="No API keys yet"
              description="Create your first key to start integrating with the NEXORA API."
              className="border-0"
            />
          ) : (
            <ul className="flex flex-col divide-y divide-border">
              {keys.map((key) => (
                <li key={key.id} className="flex flex-wrap items-center gap-3 px-5 py-3">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-surface-soft">
                    <KeyRound className="size-3.5 text-muted-foreground" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{key.name}</p>
                    <code className="text-xs text-muted-foreground">{key.maskedKey}</code>
                  </div>
                  <Badge variant="outline">{permissionLabel[key.permission]}</Badge>
                  <span className="hidden shrink-0 text-xs text-muted-foreground sm:inline">
                    {key.lastUsedAt ? `Used ${formatRelativeTime(key.lastUsedAt)}` : "Never used"}
                  </span>
                  <span className="hidden shrink-0 text-xs text-muted-foreground md:inline">
                    Created {formatDate(key.createdAt)}
                  </span>
                  <Button variant="outline" size="sm" onClick={() => setRevokeTarget(key)}>
                    Revoke
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      <CreateApiKeyDialog open={createOpen} onOpenChange={setCreateOpen} onCreate={handleCreate} />

      <Dialog open={!!revokeTarget} onOpenChange={(open) => !open && setRevokeTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Revoke &quot;{revokeTarget?.name}&quot;?</DialogTitle>
            <DialogDescription>
              Any application using this key will immediately lose access. This cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRevokeTarget(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmRevoke}>
              Revoke key
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
