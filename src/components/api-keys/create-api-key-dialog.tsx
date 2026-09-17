"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Copy, ShieldAlert } from "lucide-react";

import { createApiKeySchema, type CreateApiKeyValues } from "@/lib/validators";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface CreateApiKeyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (values: CreateApiKeyValues, fullKey: string) => void;
}

function generateKey() {
  const random = Array.from({ length: 24 }, () => Math.floor(Math.random() * 36).toString(36)).join("");
  return `nxr_live_${random}`;
}

export function CreateApiKeyDialog({ open, onOpenChange, onCreate }: CreateApiKeyDialogProps) {
  const [createdKey, setCreatedKey] = React.useState<string | null>(null);
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateApiKeyValues>({
    resolver: zodResolver(createApiKeySchema),
    defaultValues: { name: "", permission: "read-only" },
  });

  function onSubmit(values: CreateApiKeyValues) {
    const key = generateKey();
    setCreatedKey(key);
    onCreate(values, key);
  }

  function handleClose(nextOpen: boolean) {
    if (!nextOpen) {
      setCreatedKey(null);
      reset();
    }
    onOpenChange(nextOpen);
  }

  async function copyKey() {
    if (!createdKey) return;
    try {
      await navigator.clipboard.writeText(createdKey);
      toast("API key copied");
    } catch {
      toast("Couldn't copy key");
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        {createdKey ? (
          <>
            <DialogHeader>
              <DialogTitle>Key created</DialogTitle>
              <DialogDescription>Copy this key now — you won&apos;t be able to see it again.</DialogDescription>
            </DialogHeader>
            <div className="flex items-center gap-2 rounded-md border border-border bg-surface-soft px-3 py-2.5">
              <code className="flex-1 truncate text-xs text-foreground">{createdKey}</code>
              <Button variant="ghost" size="icon-sm" onClick={copyKey} aria-label="Copy API key">
                <Copy className="size-3.5" />
              </Button>
            </div>
            <div className="flex items-start gap-2 rounded-md border border-warning/30 bg-warning/10 p-3 text-xs text-warning">
              <ShieldAlert className="mt-0.5 size-3.5 shrink-0" />
              Treat this key like a password. Anyone with access can use it to call the NEXORA API on your behalf.
            </div>
            <DialogFooter>
              <Button onClick={() => handleClose(false)}>Done</Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Create API key</DialogTitle>
              <DialogDescription>Generate a new key for programmatic access to your workspace.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <FormField label="Key name" htmlFor="api-key-name" error={errors.name?.message} required>
                <Input {...register("name")} placeholder="e.g. Production server" />
              </FormField>
              <FormField label="Permission" htmlFor="api-key-permission" error={errors.permission?.message} required>
                <Select
                  value={watch("permission")}
                  onValueChange={(value) => setValue("permission", value as CreateApiKeyValues["permission"])}
                >
                  <SelectTrigger id="api-key-permission">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="read-only">Read only</SelectItem>
                    <SelectItem value="read-write">Read and write</SelectItem>
                    <SelectItem value="full-access">Full access</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => handleClose(false)}>
                  Cancel
                </Button>
                <Button type="submit" loading={isSubmitting}>
                  Generate key
                </Button>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
