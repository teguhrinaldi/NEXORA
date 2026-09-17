"use client";

import * as React from "react";
import { Search, Plus, Archive, ArchiveRestore, Pencil, Trash2, MoreVertical } from "lucide-react";

import type { Conversation } from "@/types/ai";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EmptyState } from "@/components/ui/empty-state";
import { formatRelativeTime, truncate } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import { MessagesSquare } from "lucide-react";

interface ConversationListProps {
  conversations: Conversation[];
  activeId: string | null;
  showArchived: boolean;
  onToggleArchived: (value: boolean) => void;
  onSelect: (id: string) => void;
  onNew: () => void;
  onRename: (id: string) => void;
  onArchive: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ConversationList({
  conversations,
  activeId,
  showArchived,
  onToggleArchived,
  onSelect,
  onNew,
  onRename,
  onArchive,
  onDelete,
}: ConversationListProps) {
  const [query, setQuery] = React.useState("");

  const filtered = conversations.filter(
    (conversation) =>
      conversation.archived === showArchived &&
      (conversation.title.toLowerCase().includes(query.toLowerCase()) ||
        conversation.preview.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 border-b border-border p-3">
        <Button size="sm" className="flex-1 gap-2" onClick={onNew}>
          <Plus className="size-3.5" />
          New conversation
        </Button>
      </div>

      <div className="border-b border-border p-3">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search conversations…"
            aria-label="Search conversations"
            className="pl-8"
          />
        </div>
        <div className="mt-2 flex gap-1">
          <Button
            size="sm"
            variant={!showArchived ? "secondary" : "ghost"}
            onClick={() => onToggleArchived(false)}
            className="flex-1 text-xs"
          >
            Active
          </Button>
          <Button
            size="sm"
            variant={showArchived ? "secondary" : "ghost"}
            onClick={() => onToggleArchived(true)}
            className="flex-1 text-xs"
          >
            Archived
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {filtered.length === 0 ? (
          <EmptyState
            icon={MessagesSquare}
            title={showArchived ? "No archived conversations" : "No conversations found"}
            description={showArchived ? "Conversations you archive will appear here." : "Start a new conversation to begin."}
          />
        ) : (
          <ul className="flex flex-col gap-1">
            {filtered.map((conversation) => (
              <li key={conversation.id} className="group relative">
                <button
                  type="button"
                  onClick={() => onSelect(conversation.id)}
                  className={cn(
                    "flex w-full flex-col items-start gap-0.5 rounded-md px-3 py-2.5 pr-8 text-left transition-colors",
                    conversation.id === activeId ? "bg-accent/10 border border-accent/30" : "border border-transparent hover:bg-surface-soft"
                  )}
                >
                  <span className="w-full truncate text-sm font-medium text-foreground">{conversation.title}</span>
                  <span className="w-full truncate text-xs text-muted-foreground">{truncate(conversation.preview, 46)}</span>
                  <span className="text-[11px] text-muted-foreground/80">{formatRelativeTime(conversation.updatedAt)}</span>
                </button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="absolute right-1.5 top-1.5 opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
                      aria-label={`More actions for ${conversation.title}`}
                    >
                      <MoreVertical className="size-3.5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onSelect={() => onRename(conversation.id)}>
                      <Pencil className="size-3.5" />
                      Rename
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => onArchive(conversation.id)}>
                      {conversation.archived ? <ArchiveRestore className="size-3.5" /> : <Archive className="size-3.5" />}
                      {conversation.archived ? "Unarchive" : "Archive"}
                    </DropdownMenuItem>
                    <DropdownMenuItem destructive onSelect={() => onDelete(conversation.id)}>
                      <Trash2 className="size-3.5" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
