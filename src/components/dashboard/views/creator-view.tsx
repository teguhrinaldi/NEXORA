import Link from "next/link";
import { PenLine, Sparkles, RefreshCcw, Languages, FileText, BookMarked } from "lucide-react";

import { StatCardGrid } from "@/components/dashboard/stat-card";
import { ListCard } from "@/components/dashboard/list-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { creatorStats } from "@/data/dashboard";
import { documents } from "@/data/documents";
import { prompts, promptCategories } from "@/data/prompts";
import { formatRelativeTime } from "@/lib/formatters";

const shortcuts = [
  { label: "Write", icon: PenLine, mode: "write" },
  { label: "Brainstorm", icon: Sparkles, mode: "brainstorm" },
  { label: "Rewrite", icon: RefreshCcw, mode: "rewrite" },
  { label: "Translate", icon: Languages, mode: "translate" },
];

export function CreatorView() {
  const drafts = documents.filter((d) => d.folder === "drafts" || d.folder === "marketing").slice(0, 4);
  const categoryCounts = promptCategories.map((category) => ({
    ...category,
    count: prompts.filter((p) => p.category === category.id).length,
  }));

  return (
    <div className="flex flex-col gap-6">
      <StatCardGrid stats={creatorStats} />

      <Card>
        <CardHeader>
          <CardTitle>Start creating</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {shortcuts.map((shortcut) => (
            <Link
              key={shortcut.mode}
              href={`/app/ai-studio?mode=${shortcut.mode}`}
              className="flex flex-col items-center gap-2 rounded-md border border-border bg-surface-soft px-3 py-4 text-center transition-colors hover:border-accent/40 hover:bg-surface-raised"
            >
              <shortcut.icon className="size-5 text-accent" aria-hidden="true" />
              <span className="text-xs font-medium text-foreground">{shortcut.label}</span>
            </Link>
          ))}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ListCard
            title="Recent drafts"
            icon={FileText}
            viewAllHref="/app/documents"
            emptyTitle="No drafts yet"
            emptyDescription="Start writing in AI Studio to create your first draft."
            items={drafts.map((doc) => ({
              id: doc.id,
              title: doc.title,
              meta: formatRelativeTime(doc.updatedAt),
              href: "/app/documents",
            }))}
          />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Prompt collections</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {categoryCounts.map((category) => (
              <Link key={category.id} href="/app/prompts">
                <Badge variant="outline" className="hover:border-accent/50 hover:text-accent">
                  {category.label} · {category.count}
                </Badge>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ListCard
          title="Saved templates"
          icon={BookMarked}
          viewAllHref="/app/prompts"
          emptyTitle="No saved templates"
          emptyDescription="Favorite a prompt to save it as a template."
          items={prompts
            .filter((p) => p.favorite)
            .map((p) => ({ id: p.id, title: p.title, meta: promptCategories.find((c) => c.id === p.category)?.label ?? "", href: "/app/prompts" }))}
        />
        <Card>
          <CardHeader>
            <CardTitle>Publishing workflow</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {["Draft", "Review", "Approved", "Published"].map((stage, index) => (
              <div key={stage} className="flex items-center gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-surface-soft text-[11px] font-semibold text-muted-foreground">
                  {index + 1}
                </span>
                <span className="text-sm text-foreground">{stage}</span>
                <span className="ml-auto text-xs text-muted-foreground">
                  {index === 0 ? "6 items" : index === 1 ? "3 items" : index === 2 ? "1 item" : "14 items"}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
