"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Plus, Search, BookMarked } from "lucide-react";

import type { Prompt } from "@/types/prompts";
import type { CreatePromptValues } from "@/lib/validators";
import { PromptCard } from "@/components/prompts/prompt-card";
import { PromptEditorDialog } from "@/components/prompts/prompt-editor-dialog";
import { UsePromptDialog } from "@/components/prompts/use-prompt-dialog";
import { Input } from "@/components/ui/input";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useToast } from "@/hooks/use-toast";
import { generateId } from "@/lib/id";
import { prompts as seedPrompts, promptCategories } from "@/data/prompts";

type FilterTab = "all" | "favorites" | "recent";

export function PromptsWorkspace() {
  const [prompts, setPrompts] = useLocalStorage<Prompt[]>("nexora:prompts", seedPrompts);
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState<string>("all");
  const [tab, setTab] = React.useState<FilterTab>("all");
  const [editorOpen, setEditorOpen] = React.useState(false);
  const [editingPrompt, setEditingPrompt] = React.useState<Prompt | null>(null);
  const [usePrompt, setUsePrompt] = React.useState<Prompt | null>(null);
  const [deleteTarget, setDeleteTarget] = React.useState<Prompt | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  const filtered = prompts
    .filter((prompt) => (category === "all" ? true : prompt.category === category))
    .filter((prompt) => (tab === "favorites" ? prompt.favorite : true))
    .filter(
      (prompt) =>
        prompt.title.toLowerCase().includes(query.toLowerCase()) ||
        prompt.description.toLowerCase().includes(query.toLowerCase())
    )
    .sort((a, b) =>
      tab === "recent"
        ? new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        : b.usageCount - a.usageCount
    );

  function handleCreate() {
    setEditingPrompt(null);
    setEditorOpen(true);
  }

  function handleEdit(prompt: Prompt) {
    setEditingPrompt(prompt);
    setEditorOpen(true);
  }

  function handleSave(values: CreatePromptValues) {
    if (editingPrompt) {
      setPrompts((prev) =>
        prev.map((p) => (p.id === editingPrompt.id ? { ...p, ...values, updatedAt: new Date().toISOString() } : p))
      );
      toast("Prompt updated");
    } else {
      const newPrompt: Prompt = {
        id: generateId("prm"),
        ...values,
        variables: [],
        favorite: false,
        usageCount: 0,
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      };
      setPrompts((prev) => [newPrompt, ...prev]);
      toast("Prompt created");
    }
  }

  function toggleFavorite(id: string) {
    setPrompts((prev) => prev.map((p) => (p.id === id ? { ...p, favorite: !p.favorite } : p)));
  }

  function duplicate(id: string) {
    const source = prompts.find((p) => p.id === id);
    if (!source) return;
    const copy: Prompt = {
      ...source,
      id: generateId("prm"),
      title: `${source.title} (copy)`,
      favorite: false,
      usageCount: 0,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };
    setPrompts((prev) => [copy, ...prev]);
    toast("Prompt duplicated");
  }

  function confirmDelete() {
    if (!deleteTarget) return;
    setPrompts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
    toast("Prompt deleted");
    setDeleteTarget(null);
  }

  function handleUseConfirm(content: string) {
    router.push(`/app/ai-studio?prompt=${encodeURIComponent(content)}`);
    setUsePrompt(null);
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Tabs value={tab} onValueChange={(value) => setTab(value as FilterTab)}>
          <TabsList>
            <TabsTrigger value="all">All prompts</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="recent">Recently used</TabsTrigger>
          </TabsList>
        </Tabs>
        <Button onClick={handleCreate} className="gap-2">
          <Plus className="size-4" />
          New prompt
        </Button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search prompts…"
            aria-label="Search prompts"
            className="pl-9"
          />
        </div>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="sm:w-52" aria-label="Filter by category">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {promptCategories.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={BookMarked}
          title="No prompts found"
          description="Try a different search or create a new prompt for your library."
          action={
            <Button onClick={handleCreate} size="sm" className="gap-2">
              <Plus className="size-4" />
              New prompt
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((prompt) => (
            <PromptCard
              key={prompt.id}
              prompt={prompt}
              onOpen={handleEdit}
              onToggleFavorite={toggleFavorite}
              onDuplicate={duplicate}
              onDelete={setDeleteTarget}
              onUseInStudio={setUsePrompt}
            />
          ))}
        </div>
      )}

      <PromptEditorDialog open={editorOpen} onOpenChange={setEditorOpen} prompt={editingPrompt} onSave={handleSave} />
      <UsePromptDialog prompt={usePrompt} onOpenChange={(open) => !open && setUsePrompt(null)} onConfirm={handleUseConfirm} />

      <Dialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete prompt?</DialogTitle>
            <DialogDescription>
              &quot;{deleteTarget?.title}&quot; will be permanently removed from your library.
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
