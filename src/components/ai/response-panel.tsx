"use client";

import { Copy, RefreshCcw, Download, FileText, BookMarked, Sparkles } from "lucide-react";

import type { AiStudioResult } from "@/types/ai";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { useToast } from "@/hooks/use-toast";
import { formatNumber, formatTime } from "@/lib/formatters";

interface ResponsePanelProps {
  result: AiStudioResult | null;
  loading: boolean;
  onRegenerate: () => void;
  onSaveDocument: () => void;
  onSavePrompt: () => void;
}

export function ResponsePanel({ result, loading, onRegenerate, onSaveDocument, onSavePrompt }: ResponsePanelProps) {
  const { toast } = useToast();

  async function handleCopy() {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result.output);
      toast("Copied to clipboard");
    } catch {
      toast("Couldn't copy", { description: "Your browser blocked clipboard access." });
    }
  }

  function handleExport() {
    if (!result) return;
    const blob = new Blob([result.output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "nexora-output.txt";
    link.click();
    URL.revokeObjectURL(url);
    toast("Export ready", { description: "Downloaded as a .txt file." });
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="flex flex-col gap-3 p-5">
          <div className="flex items-center gap-2 text-xs text-muted-foreground" aria-live="polite">
            <Sparkles className="size-3.5 animate-pulse text-accent" />
            Generating response…
          </div>
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-2/3" />
        </CardContent>
      </Card>
    );
  }

  if (!result) {
    return (
      <Card>
        <CardContent className="p-0">
          <EmptyState
            icon={Sparkles}
            title="Nothing generated yet"
            description="Choose a capability, describe what you need, and NEXORA will draft a response here."
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="flex flex-col gap-4 p-5">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span aria-live="polite">Generated at {formatTime(result.createdAt)}</span>
          <span>{formatNumber(result.tokensUsed)} tokens</span>
        </div>
        <div className="whitespace-pre-line rounded-md border border-border bg-surface-soft p-4 text-sm leading-relaxed text-foreground">
          {result.output}
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={handleCopy} className="gap-2">
            <Copy className="size-3.5" />
            Copy
          </Button>
          <Button variant="outline" size="sm" onClick={onRegenerate} className="gap-2">
            <RefreshCcw className="size-3.5" />
            Regenerate
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport} className="gap-2">
            <Download className="size-3.5" />
            Export
          </Button>
          <Button variant="secondary" size="sm" onClick={onSaveDocument} className="gap-2">
            <FileText className="size-3.5" />
            Save to Documents
          </Button>
          <Button variant="secondary" size="sm" onClick={onSavePrompt} className="gap-2">
            <BookMarked className="size-3.5" />
            Save as Prompt
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
