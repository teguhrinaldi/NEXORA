"use client";

import * as React from "react";
import { Pencil, Trash2 } from "lucide-react";

import type { AutomationNode } from "@/types/automations";
import { nodeTypeMeta } from "@/components/automations/node-icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface WorkflowNodeCardProps {
  node: AutomationNode;
  index: number;
  onChange: (node: AutomationNode) => void;
  onRemove: () => void;
  removable: boolean;
}

export function WorkflowNodeCard({ node, index, onChange, onRemove, removable }: WorkflowNodeCardProps) {
  const [editing, setEditing] = React.useState(false);
  const meta = nodeTypeMeta[node.type];

  return (
    <div className="relative flex gap-4">
      <div className="flex flex-col items-center">
        <span
          className={cn("flex size-9 shrink-0 items-center justify-center rounded-full border", meta.className)}
          aria-hidden="true"
        >
          <meta.icon className="size-4" />
        </span>
        <span className="mt-1 w-px flex-1 bg-border" />
      </div>

      <div className="flex-1 rounded-lg border border-border bg-surface p-4 mb-6">
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Step {index + 1} · {meta.label}
            </span>
            {!editing ? (
              <h4 className="mt-0.5 text-sm font-semibold text-foreground">{node.title}</h4>
            ) : null}
          </div>
          <div className="flex shrink-0 gap-1">
            <Button variant="ghost" size="icon-sm" onClick={() => setEditing((prev) => !prev)} aria-label={editing ? "Done editing step" : "Edit step"}>
              <Pencil className="size-3.5" />
            </Button>
            {removable && (
              <Button variant="ghost" size="icon-sm" onClick={onRemove} aria-label="Remove step">
                <Trash2 className="size-3.5" />
              </Button>
            )}
          </div>
        </div>

        {editing ? (
          <div className="mt-3 flex flex-col gap-2">
            <Input
              value={node.title}
              onChange={(event) => onChange({ ...node, title: event.target.value })}
              aria-label="Step title"
            />
            <Textarea
              value={node.description}
              onChange={(event) => onChange({ ...node, description: event.target.value })}
              aria-label="Step description"
              className="min-h-16"
            />
          </div>
        ) : (
          <p className="mt-1.5 text-sm text-muted-foreground">{node.description}</p>
        )}
      </div>
    </div>
  );
}
