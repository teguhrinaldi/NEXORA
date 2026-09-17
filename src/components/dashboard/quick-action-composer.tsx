"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function QuickActionComposer() {
  const router = useRouter();
  const [value, setValue] = React.useState("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const trimmed = value.trim();
    router.push(trimmed ? `/app/ai-studio?prompt=${encodeURIComponent(trimmed)}` : "/app/ai-studio");
  }

  return (
    <Card>
      <CardContent className="p-4 sm:p-5">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex flex-1 items-center gap-2 rounded-md border border-border bg-surface-soft px-3">
            <Sparkles className="size-4 shrink-0 text-accent" aria-hidden="true" />
            <Input
              value={value}
              onChange={(event) => setValue(event.target.value)}
              placeholder="Ask NEXORA to write, summarize, or brainstorm something…"
              aria-label="Quick AI action"
              className="border-0 bg-transparent px-0 focus-visible:ring-0"
            />
          </div>
          <Button type="submit" className="shrink-0 gap-2">
            Generate
            <ArrowRight className="size-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
