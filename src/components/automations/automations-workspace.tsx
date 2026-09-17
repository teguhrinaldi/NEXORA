"use client";

import * as React from "react";
import { Plus, Workflow } from "lucide-react";

import type { Automation } from "@/types/automations";
import type { CreateAutomationValues } from "@/lib/validators";
import { AutomationCard } from "@/components/automations/automation-card";
import { AutomationEditorDialog } from "@/components/automations/automation-editor-dialog";
import { CreateAutomationDialog } from "@/components/automations/create-automation-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { automations as seedAutomations, automationTemplates } from "@/data/automations";

export function AutomationsWorkspace() {
  const [automations, setAutomations] = useLocalStorage<Automation[]>("nexora:automations", seedAutomations);
  const [editorTarget, setEditorTarget] = React.useState<Automation | null>(null);
  const [createOpen, setCreateOpen] = React.useState(false);
  const [deleteTarget, setDeleteTarget] = React.useState<Automation | null>(null);
  const { toast } = useToast();

  function handleToggle(id: string, enabled: boolean) {
    setAutomations((prev) => prev.map((a) => (a.id === id ? { ...a, enabled } : a)));
    toast(enabled ? "Workflow enabled" : "Workflow disabled");
  }

  function handleSave(updated: Automation) {
    setAutomations((prev) =>
      prev.map((a) => (a.id === updated.id ? { ...updated, updatedAt: new Date().toISOString() } : a))
    );
    toast("Workflow saved");
  }

  function handleDuplicate(id: string) {
    const source = automations.find((a) => a.id === id);
    if (!source) return;
    const copy: Automation = {
      ...source,
      id: generateId("auto"),
      name: `${source.name} (copy)`,
      enabled: false,
      runs: [],
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };
    setAutomations((prev) => [copy, ...prev]);
    toast("Workflow duplicated");
  }

  function confirmDelete() {
    if (!deleteTarget) return;
    setAutomations((prev) => prev.filter((a) => a.id !== deleteTarget.id));
    toast("Workflow deleted");
    setDeleteTarget(null);
  }

  function handleCreate(values: CreateAutomationValues) {
    const newAutomation: Automation = {
      id: generateId("auto"),
      name: values.name,
      description: values.description,
      enabled: false,
      successRate: 0,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      nodes: [{ id: generateId("node"), type: "trigger", title: "Choose a trigger", description: "Define what starts this workflow." }],
      runs: [],
    };
    setAutomations((prev) => [newAutomation, ...prev]);
    setEditorTarget(newAutomation);
    toast("Workflow created", { description: "Add steps to complete your automation." });
  }

  function applyTemplate(templateId: string) {
    const template = automationTemplates.find((t) => t.id === templateId);
    if (!template) return;
    const newAutomation: Automation = {
      id: generateId("auto"),
      name: template.name,
      description: template.description,
      enabled: false,
      successRate: 0,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      nodes: template.nodes.map((node) => ({ ...node, id: generateId("node") })),
      runs: [],
    };
    setAutomations((prev) => [newAutomation, ...prev]);
    toast("Workflow created from template", { description: `"${template.name}" was added to your automations.` });
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-end">
        <Button onClick={() => setCreateOpen(true)} className="gap-2">
          <Plus className="size-4" />
          New workflow
        </Button>
      </div>

      {automations.length === 0 ? (
        <EmptyState
          icon={Workflow}
          title="No automations yet"
          description="Create a workflow or start from a template below."
          action={
            <Button onClick={() => setCreateOpen(true)} size="sm" className="gap-2">
              <Plus className="size-4" />
              New workflow
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {automations.map((automation) => (
            <AutomationCard
              key={automation.id}
              automation={automation}
              onToggle={handleToggle}
              onEdit={setEditorTarget}
              onDuplicate={handleDuplicate}
              onDelete={setDeleteTarget}
            />
          ))}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Start from a template</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {automationTemplates.map((template) => (
            <div key={template.id} className="flex flex-col gap-3 rounded-md border border-border bg-surface-soft p-4">
              <div>
                <p className="text-sm font-medium text-foreground">{template.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">{template.description}</p>
              </div>
              <Button size="sm" variant="secondary" onClick={() => applyTemplate(template.id)} className="w-fit">
                Use template
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <AutomationEditorDialog
        automation={editorTarget}
        onOpenChange={(open) => !open && setEditorTarget(null)}
        onSave={handleSave}
      />
      <CreateAutomationDialog open={createOpen} onOpenChange={setCreateOpen} onCreate={handleCreate} />

      <Dialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete workflow?</DialogTitle>
            <DialogDescription>
              &quot;{deleteTarget?.name}&quot; will be permanently deleted along with its execution history.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
