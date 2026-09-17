"use client";

import * as React from "react";
import Link from "next/link";
import { History, MessagesSquare, FileText, Workflow, BookMarked } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmptyState } from "@/components/ui/empty-state";
import { conversations } from "@/data/conversations";
import { documents } from "@/data/documents";
import { automations } from "@/data/automations";
import { prompts } from "@/data/prompts";
import { formatRelativeTime } from "@/lib/formatters";

type HistoryType = "all" | "chat" | "document" | "automation" | "prompt";

interface HistoryEntry {
  id: string;
  type: Exclude<HistoryType, "all">;
  title: string;
  detail: string;
  href: string;
  date: string;
}

const typeMeta: Record<Exclude<HistoryType, "all">, { label: string; icon: typeof MessagesSquare }> = {
  chat: { label: "Chat", icon: MessagesSquare },
  document: { label: "Document", icon: FileText },
  automation: { label: "Automation", icon: Workflow },
  prompt: { label: "Prompt", icon: BookMarked },
};

export function HistoryWorkspace() {
  const [filter, setFilter] = React.useState<HistoryType>("all");

  const entries: HistoryEntry[] = React.useMemo(() => {
    const chatEntries: HistoryEntry[] = conversations.map((c) => ({
      id: c.id,
      type: "chat",
      title: c.title,
      detail: c.preview || "No messages yet",
      href: "/app/chat",
      date: c.updatedAt,
    }));
    const docEntries: HistoryEntry[] = documents.map((d) => ({
      id: d.id,
      type: "document",
      title: d.title,
      detail: `Edited by ${d.lastEditedBy}`,
      href: "/app/documents",
      date: d.updatedAt,
    }));
    const automationEntries: HistoryEntry[] = automations.flatMap((a) =>
      a.runs.map((run) => ({
        id: `${a.id}-${run.id}`,
        type: "automation" as const,
        title: a.name,
        detail: run.summary,
        href: "/app/automations",
        date: run.startedAt,
      }))
    );
    const promptEntries: HistoryEntry[] = prompts
      .filter((p) => p.usageCount > 0)
      .map((p) => ({
        id: p.id,
        type: "prompt",
        title: p.title,
        detail: `Used ${p.usageCount} times`,
        href: "/app/prompts",
        date: p.updatedAt,
      }));

    return [...chatEntries, ...docEntries, ...automationEntries, ...promptEntries].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, []);

  const filtered = filter === "all" ? entries : entries.filter((entry) => entry.type === filter);

  return (
    <div className="flex flex-col gap-5">
      <Tabs value={filter} onValueChange={(value) => setFilter(value as HistoryType)}>
        <TabsList className="w-full justify-start overflow-x-auto sm:w-fit">
          <TabsTrigger value="all">All activity</TabsTrigger>
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="document">Documents</TabsTrigger>
          <TabsTrigger value="automation">Automations</TabsTrigger>
          <TabsTrigger value="prompt">Prompts</TabsTrigger>
        </TabsList>
      </Tabs>

      {filtered.length === 0 ? (
        <EmptyState icon={History} title="No activity found" description="Activity for this category will show up here." />
      ) : (
        <Card>
          <CardContent className="flex flex-col divide-y divide-border p-0">
            {filtered.map((entry) => {
              const meta = typeMeta[entry.type];
              return (
                <Link
                  key={`${entry.type}-${entry.id}`}
                  href={entry.href}
                  className="flex items-center gap-3 px-5 py-3 transition-colors hover:bg-surface-soft"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-surface-soft">
                    <meta.icon className="size-3.5 text-muted-foreground" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{entry.title}</p>
                    <p className="truncate text-xs text-muted-foreground">{entry.detail}</p>
                  </div>
                  <Badge variant="outline" className="hidden shrink-0 sm:inline-flex">
                    {meta.label}
                  </Badge>
                  <span className="shrink-0 text-xs text-muted-foreground">{formatRelativeTime(entry.date)}</span>
                </Link>
              );
            })}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
