"use client";

import * as React from "react";
import { Sparkles, Save, Files, Trash2, History, FileText, Loader2 } from "lucide-react";

import type { Document } from "@/types/documents";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { generateAiResponse } from "@/lib/ai/mock-ai-service";
import { formatDate, formatRelativeTime } from "@/lib/formatters";
import { useToast } from "@/hooks/use-toast";

interface DocumentEditorProps {
  document: Document | null;
  onChange: (document: Document) => void;
  onDuplicate: (document: Document) => void;
  onDelete: (document: Document) => void;
}

const aiActions = [
  { id: "rewrite", label: "Rewrite", mode: "rewrite" as const },
  { id: "summarize", label: "Summarize", mode: "summarize" as const },
  { id: "continue", label: "Continue writing", mode: "write" as const },
  { id: "tone", label: "Change tone", mode: "rewrite" as const },
];

export function DocumentEditor({ document, onChange, onDuplicate, onDelete }: DocumentEditorProps) {
  const [aiLoading, setAiLoading] = React.useState<string | null>(null);
  const [historyOpen, setHistoryOpen] = React.useState(false);
  const { toast } = useToast();

  if (!document) {
    return (
      <div className="flex h-full items-center justify-center p-6">
        <EmptyState icon={FileText} title="No document selected" description="Choose a document from the list or create a new one." />
      </div>
    );
  }

  function updateContent(content: string) {
    if (!document) return;
    onChange({
      ...document,
      content,
      wordCount: content.trim() ? content.trim().split(/\s+/).length : 0,
      updatedAt: new Date().toISOString(),
    });
  }

  function updateTitle(title: string) {
    if (!document) return;
    onChange({ ...document, title, updatedAt: new Date().toISOString() });
  }

  async function runAiAction(actionId: string, mode: "rewrite" | "summarize" | "write") {
    if (!document) return;
    setAiLoading(actionId);
    try {
      const result = await generateAiResponse({
        mode,
        prompt: document.content || document.title,
        model: "nexora-core",
        tone: "professional",
        length: "medium",
        language: "english",
      });
      const nextContent = mode === "write" ? `${document.content}\n\n${result.output}` : result.output;
      updateContent(nextContent);
      toast("Document updated", { description: "AI action applied successfully." });
    } finally {
      setAiLoading(null);
    }
  }

  function handleSave() {
    toast("Document saved");
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between">
        <Input
          value={document.title}
          onChange={(event) => updateTitle(event.target.value)}
          aria-label="Document title"
          className="border-0 bg-transparent px-0 text-base font-semibold focus-visible:ring-0"
        />
        <div className="flex shrink-0 items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="sm" className="gap-2" disabled={!!aiLoading}>
                {aiLoading ? <Loader2 className="size-3.5 animate-spin" /> : <Sparkles className="size-3.5" />}
                AI actions
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {aiActions.map((action) => (
                <DropdownMenuItem key={action.id} onSelect={() => runAiAction(action.id, action.mode)}>
                  {action.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="icon-sm" onClick={() => setHistoryOpen(true)} aria-label="Version history">
            <History className="size-3.5" />
          </Button>
          <Button variant="outline" size="icon-sm" onClick={() => onDuplicate(document)} aria-label="Duplicate document">
            <Files className="size-3.5" />
          </Button>
          <Button variant="outline" size="icon-sm" onClick={() => onDelete(document)} aria-label="Delete document">
            <Trash2 className="size-3.5" />
          </Button>
          <Button size="sm" onClick={handleSave} className="gap-2">
            <Save className="size-3.5" />
            Save
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-3 border-b border-border px-4 py-2 text-xs text-muted-foreground">
        <span>{document.wordCount} words</span>
        <span>·</span>
        <span>Edited by {document.lastEditedBy}</span>
        <span>·</span>
        <span>{formatRelativeTime(document.updatedAt)}</span>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <Textarea
          value={document.content}
          onChange={(event) => updateContent(event.target.value)}
          aria-label="Document content"
          className="min-h-full resize-none border-0 bg-transparent px-0 text-sm leading-relaxed focus-visible:ring-0"
          placeholder="Start writing…"
        />
      </div>

      <Dialog open={historyOpen} onOpenChange={setHistoryOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Version history</DialogTitle>
            <DialogDescription>Previous versions of &quot;{document.title}&quot;.</DialogDescription>
          </DialogHeader>
          <ul className="flex flex-col divide-y divide-border">
            {document.history.map((version) => (
              <li key={version.id} className="flex items-center justify-between py-2.5 text-sm">
                <div>
                  <p className="text-foreground">{version.label}</p>
                  <p className="text-xs text-muted-foreground">by {version.editedBy}</p>
                </div>
                <span className="text-xs text-muted-foreground">{formatDate(version.editedAt)}</span>
              </li>
            ))}
          </ul>
        </DialogContent>
      </Dialog>
    </div>
  );
}
