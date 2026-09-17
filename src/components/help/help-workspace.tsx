"use client";

import * as React from "react";
import { Search, LifeBuoy, Mail, HelpCircle } from "lucide-react";

import type { HelpArticle, HelpCategory } from "@/types/help";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { helpArticles, helpCategories } from "@/data/help";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export function HelpWorkspace() {
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState<HelpCategory | "all">("all");
  const [activeArticle, setActiveArticle] = React.useState<HelpArticle | null>(null);
  const { toast } = useToast();

  const filtered = helpArticles
    .filter((article) => (category === "all" ? true : article.category === category))
    .filter(
      (article) =>
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.summary.toLowerCase().includes(query.toLowerCase())
    );

  const popular = helpArticles.filter((article) => article.popular);

  return (
    <div className="flex flex-col gap-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search help articles…"
          aria-label="Search help articles"
          className="h-12 pl-10 text-base"
        />
      </div>

      {!query && (
        <div>
          <h3 className="mb-3 text-sm font-semibold text-foreground">Popular articles</h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {popular.slice(0, 3).map((article) => (
              <button
                key={article.id}
                type="button"
                onClick={() => setActiveArticle(article)}
                className="rounded-md border border-border bg-surface-soft p-4 text-left transition-colors hover:border-accent/40"
              >
                <p className="text-sm font-medium text-foreground">{article.title}</p>
                <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{article.summary}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <Button variant={category === "all" ? "secondary" : "outline"} size="sm" onClick={() => setCategory("all")}>
          All
        </Button>
        {helpCategories.map((cat) => (
          <Button
            key={cat.id}
            variant={category === cat.id ? "secondary" : "outline"}
            size="sm"
            onClick={() => setCategory(cat.id)}
          >
            {cat.label}
          </Button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={HelpCircle}
          title="No articles found"
          description="Try a different search term, or contact support for help."
          action={
            <Button
              size="sm"
              className="gap-2"
              onClick={() => toast("Support request sent", { description: "Our team will follow up by email shortly." })}
            >
              <Mail className="size-4" />
              Contact support
            </Button>
          }
        />
      ) : (
        <Card>
          <CardContent className="flex flex-col divide-y divide-border p-0">
            {filtered.map((article) => (
              <button
                key={article.id}
                type="button"
                onClick={() => setActiveArticle(article)}
                className={cn("flex items-start justify-between gap-3 px-5 py-4 text-left transition-colors hover:bg-surface-soft")}
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground">{article.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{article.summary}</p>
                </div>
                <Badge variant="outline" className="hidden shrink-0 sm:inline-flex">
                  {helpCategories.find((c) => c.id === article.category)?.label}
                </Badge>
              </button>
            ))}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Still need help?</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-surface-soft">
              <LifeBuoy className="size-4 text-accent" aria-hidden="true" />
            </span>
            <p className="text-sm text-muted-foreground">Our support team typically responds within a few hours.</p>
          </div>
          <Button
            variant="secondary"
            className="gap-2"
            onClick={() => toast("Support request sent", { description: "Our team will follow up by email shortly." })}
          >
            <Mail className="size-4" />
            Contact support
          </Button>
        </CardContent>
      </Card>

      <Dialog open={!!activeArticle} onOpenChange={(open) => !open && setActiveArticle(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{activeArticle?.title}</DialogTitle>
            <DialogDescription>{activeArticle?.summary}</DialogDescription>
          </DialogHeader>
          <p className="text-sm leading-relaxed text-foreground">{activeArticle?.content}</p>
        </DialogContent>
      </Dialog>
    </div>
  );
}
