"use client";

import * as React from "react";

import type { Prompt } from "@/types/prompts";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface UsePromptDialogProps {
  prompt: Prompt | null;
  onOpenChange: (open: boolean) => void;
  onConfirm: (content: string) => void;
}

export function UsePromptDialog({ prompt, onOpenChange, onConfirm }: UsePromptDialogProps) {
  return (
    <Dialog open={!!prompt} onOpenChange={onOpenChange}>
      <DialogContent>
        {prompt && (
          <UsePromptForm
            key={prompt.id}
            prompt={prompt}
            onCancel={() => onOpenChange(false)}
            onConfirm={onConfirm}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

function UsePromptForm({
  prompt,
  onCancel,
  onConfirm,
}: {
  prompt: Prompt;
  onCancel: () => void;
  onConfirm: (content: string) => void;
}) {
  const [values, setValues] = React.useState<Record<string, string>>(() =>
    Object.fromEntries(prompt.variables.map((v) => [v.key, ""]))
  );

  function buildContent() {
    let content = prompt.content;
    for (const variable of prompt.variables) {
      content = content.replaceAll(`{{${variable.key}}}`, values[variable.key] || `[${variable.label}]`);
    }
    return content;
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Use &quot;{prompt.title}&quot;</DialogTitle>
        <DialogDescription>Fill in the variables to prepare this prompt for AI Studio.</DialogDescription>
      </DialogHeader>

      {prompt.variables.length === 0 ? (
        <p className="rounded-md border border-border bg-surface-soft p-3 text-sm text-muted-foreground">
          This prompt has no variables — it will be sent to AI Studio as-is.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {prompt.variables.map((variable) => (
            <FormField key={variable.key} label={variable.label} htmlFor={`var-${variable.key}`}>
              <Input
                id={`var-${variable.key}`}
                placeholder={variable.placeholder}
                value={values[variable.key] ?? ""}
                onChange={(event) => setValues((prev) => ({ ...prev, [variable.key]: event.target.value }))}
              />
            </FormField>
          ))}
        </div>
      )}

      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={() => onConfirm(buildContent())}>Open in AI Studio</Button>
      </DialogFooter>
    </>
  );
}
