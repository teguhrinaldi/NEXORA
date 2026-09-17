"use client";

import * as React from "react";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";

import type { Automation } from "@/types/automations";
import { WorkflowCanvas } from "@/components/automations/workflow-canvas";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { formatRelativeTime } from "@/lib/formatters";
import { cn } from "@/lib/utils";

interface AutomationEditorDialogProps {
  automation: Automation | null;
  onOpenChange: (open: boolean) => void;
  onSave: (automation: Automation) => void;
}

const statusConfig = {
  success: { icon: CheckCircle2, className: "text-success" },
  failed: { icon: XCircle, className: "text-danger" },
  running: { icon: Loader2, className: "text-info animate-spin" },
};

export function AutomationEditorDialog({ automation, onOpenChange, onSave }: AutomationEditorDialogProps) {
  return (
    <Dialog open={!!automation} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        {automation && (
          <AutomationEditorForm
            key={automation.id}
            initialAutomation={automation}
            onCancel={() => onOpenChange(false)}
            onSave={(updated) => {
              onSave(updated);
              onOpenChange(false);
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

function AutomationEditorForm({
  initialAutomation,
  onCancel,
  onSave,
}: {
  initialAutomation: Automation;
  onCancel: () => void;
  onSave: (automation: Automation) => void;
}) {
  const [draft, setDraft] = React.useState(initialAutomation);

  return (
    <>
      <DialogHeader>
        <DialogTitle>Edit workflow</DialogTitle>
        <DialogDescription>Adjust the name, steps, and review recent runs.</DialogDescription>
      </DialogHeader>

      <Tabs defaultValue="workflow">
        <TabsList>
          <TabsTrigger value="workflow">Workflow</TabsTrigger>
          <TabsTrigger value="history">Execution history</TabsTrigger>
        </TabsList>

        <TabsContent value="workflow" className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="automation-name">Name</Label>
              <Input
                id="automation-name"
                value={draft.name}
                onChange={(event) => setDraft({ ...draft, name: event.target.value })}
              />
            </div>
            <div className="flex items-center justify-between gap-2 rounded-md border border-border px-3 py-2">
              <Label htmlFor="automation-enabled" className="text-sm">
                Enabled
              </Label>
              <Switch
                id="automation-enabled"
                checked={draft.enabled}
                onCheckedChange={(checked) => setDraft({ ...draft, enabled: checked })}
              />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="automation-description">Description</Label>
            <Textarea
              id="automation-description"
              value={draft.description}
              onChange={(event) => setDraft({ ...draft, description: event.target.value })}
              className="min-h-16"
            />
          </div>

          <div className="max-h-80 overflow-y-auto pr-1">
            <WorkflowCanvas automation={draft} onChange={setDraft} />
          </div>
        </TabsContent>

        <TabsContent value="history">
          {draft.runs.length === 0 ? (
            <p className="text-sm text-muted-foreground">No runs recorded yet.</p>
          ) : (
            <ul className="flex flex-col divide-y divide-border">
              {draft.runs.map((run) => {
                const config = statusConfig[run.status];
                return (
                  <li key={run.id} className="flex items-start gap-3 py-3 first:pt-0">
                    <config.icon className={cn("mt-0.5 size-4 shrink-0", config.className)} aria-hidden="true" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-foreground">{run.summary}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatRelativeTime(run.startedAt)} · {(run.durationMs / 1000).toFixed(1)}s
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </TabsContent>
      </Tabs>

      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={() => onSave(draft)}>Save workflow</Button>
      </DialogFooter>
    </>
  );
}
