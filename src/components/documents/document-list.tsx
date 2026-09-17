"use client";

import * as React from "react";
import { Search, Plus, FileText } from "lucide-react";

import type { Document, DocumentFolder } from "@/types/documents";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EmptyState } from "@/components/ui/empty-state";
import { documentFolders } from "@/data/documents";
import { formatRelativeTime, truncate } from "@/lib/formatters";
import { cn } from "@/lib/utils";

type SortOption = "updated" | "title" | "wordCount";

interface DocumentListProps {
  documents: Document[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onCreate: () => void;
}

export function DocumentList({ documents, activeId, onSelect, onCreate }: DocumentListProps) {
  const [query, setQuery] = React.useState("");
  const [folder, setFolder] = React.useState<DocumentFolder>("all");
  const [sort, setSort] = React.useState<SortOption>("updated");

  const filtered = documents
    .filter((doc) => (folder === "all" ? true : doc.folder === folder))
    .filter((doc) => doc.title.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => {
      if (sort === "title") return a.title.localeCompare(b.title);
      if (sort === "wordCount") return b.wordCount - a.wordCount;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 border-b border-border p-3">
        <Button size="sm" className="flex-1 gap-2" onClick={onCreate}>
          <Plus className="size-3.5" />
          New document
        </Button>
      </div>

      <div className="flex flex-col gap-2 border-b border-border p-3">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search documents…"
            aria-label="Search documents"
            className="pl-8"
          />
        </div>
        <div className="flex gap-2">
          <Select value={folder} onValueChange={(value) => setFolder(value as DocumentFolder)}>
            <SelectTrigger className="flex-1" aria-label="Filter by folder">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {documentFolders.map((f) => (
                <SelectItem key={f.id} value={f.id}>
                  {f.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sort} onValueChange={(value) => setSort(value as SortOption)}>
            <SelectTrigger className="w-32" aria-label="Sort documents">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="updated">Last edited</SelectItem>
              <SelectItem value="title">Title</SelectItem>
              <SelectItem value="wordCount">Word count</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {filtered.length === 0 ? (
          <EmptyState icon={FileText} title="No documents found" description="Try a different search or folder." />
        ) : (
          <ul className="flex flex-col gap-1">
            {filtered.map((doc) => (
              <li key={doc.id}>
                <button
                  type="button"
                  onClick={() => onSelect(doc.id)}
                  className={cn(
                    "flex w-full flex-col items-start gap-1 rounded-md border px-3 py-2.5 text-left transition-colors",
                    doc.id === activeId ? "border-accent/30 bg-accent/10" : "border-transparent hover:bg-surface-soft"
                  )}
                >
                  <span className="w-full truncate text-sm font-medium text-foreground">{doc.title}</span>
                  <span className="w-full truncate text-xs text-muted-foreground">{truncate(doc.content, 50)}</span>
                  <span className="text-[11px] text-muted-foreground/80">
                    {doc.wordCount} words · {formatRelativeTime(doc.updatedAt)}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
