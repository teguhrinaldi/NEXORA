"use client";

import { Star, Pencil, Trash2, Sparkles, Files } from "lucide-react";

import type { Prompt } from "@/types/prompts";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { promptCategories } from "@/data/prompts";
import { formatRelativeTime } from "@/lib/formatters";

interface PromptCardProps {
  prompt: Prompt;
  onOpen: (prompt: Prompt) => void;
  onToggleFavorite: (id: string) => void;
  onDuplicate: (id: string) => void;
  onDelete: (prompt: Prompt) => void;
  onUseInStudio: (prompt: Prompt) => void;
}

export function PromptCard({ prompt, onOpen, onToggleFavorite, onDuplicate, onDelete, onUseInStudio }: PromptCardProps) {
  const category = promptCategories.find((c) => c.id === prompt.category);

  return (
    <Card className="flex h-full flex-col transition-colors hover:border-border-strong">
      <CardContent className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <button
            type="button"
            onClick={() => onOpen(prompt)}
            className="text-left text-sm font-semibold text-foreground hover:text-accent"
          >
            {prompt.title}
          </button>
          <button
            type="button"
            onClick={() => onToggleFavorite(prompt.id)}
            aria-pressed={prompt.favorite}
            aria-label={prompt.favorite ? "Remove from favorites" : "Add to favorites"}
            className="shrink-0 text-muted-foreground transition-colors hover:text-accent"
          >
            <Star className={prompt.favorite ? "size-4 fill-accent text-accent" : "size-4"} />
          </button>
        </div>

        <p className="line-clamp-2 flex-1 text-sm text-muted-foreground">{prompt.description}</p>

        <div className="flex flex-wrap items-center gap-2">
          {category && <Badge variant="outline">{category.label}</Badge>}
          <span className="text-xs text-muted-foreground">{prompt.usageCount} uses</span>
          <span className="text-xs text-muted-foreground">· {formatRelativeTime(prompt.updatedAt)}</span>
        </div>

        <div className="mt-1 flex flex-wrap gap-2 border-t border-border pt-3">
          <Button size="sm" variant="secondary" onClick={() => onUseInStudio(prompt)} className="gap-1.5">
            <Sparkles className="size-3.5" />
            Use in Studio
          </Button>
          <Button size="sm" variant="outline" onClick={() => onOpen(prompt)} className="gap-1.5">
            <Pencil className="size-3.5" />
            Edit
          </Button>
          <Button size="sm" variant="outline" onClick={() => onDuplicate(prompt.id)} aria-label="Duplicate prompt">
            <Files className="size-3.5" />
          </Button>
          <Button size="sm" variant="outline" onClick={() => onDelete(prompt)} aria-label="Delete prompt">
            <Trash2 className="size-3.5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

