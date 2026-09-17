"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";

import type { AiStudioMode, AiStudioRequest, AiStudioResult } from "@/types/ai";
import type { Document } from "@/types/documents";
import type { Prompt } from "@/types/prompts";
import { StudioComposer } from "@/components/ai/studio-composer";
import { ResponsePanel } from "@/components/ai/response-panel";
import { StudioHistory } from "@/components/ai/studio-history";
import { generateAiResponse, regenerateAiResponse } from "@/lib/ai/mock-ai-service";
import { generateId } from "@/lib/id";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useToast } from "@/hooks/use-toast";
import { documents as seedDocuments } from "@/data/documents";
import { prompts as seedPrompts } from "@/data/prompts";

function isMode(value: string | null): value is AiStudioMode {
  return Boolean(
    value &&
      ["chat", "write", "summarize", "rewrite", "brainstorm", "translate", "generate-image", "analyze-document"].includes(value)
  );
}

const defaultRequest: AiStudioRequest = {
  mode: "write",
  prompt: "",
  model: "nexora-core",
  tone: "professional",
  length: "medium",
  language: "english",
};

export function AiStudioWorkspace() {
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const [request, setRequest] = React.useState<AiStudioRequest>(() => ({
    ...defaultRequest,
    mode: isMode(searchParams.get("mode")) ? (searchParams.get("mode") as AiStudioMode) : defaultRequest.mode,
    prompt: searchParams.get("prompt") ?? "",
  }));
  const [loading, setLoading] = React.useState(false);
  const [history, setHistory] = React.useState<AiStudioResult[]>([]);
  const [activeResult, setActiveResult] = React.useState<AiStudioResult | null>(null);

  const [, setDocuments] = useLocalStorage<Document[]>("nexora:documents", seedDocuments);
  const [, setPrompts] = useLocalStorage<Prompt[]>("nexora:prompts", seedPrompts);

  async function handleGenerate() {
    if (!request.prompt.trim()) return;
    setLoading(true);
    try {
      const result = await generateAiResponse(request);
      setHistory((prev) => [result, ...prev]);
      setActiveResult(result);
    } finally {
      setLoading(false);
    }
  }

  async function handleRegenerate() {
    if (!activeResult) return;
    setLoading(true);
    try {
      const result = await regenerateAiResponse(activeResult.request);
      setHistory((prev) => [result, ...prev]);
      setActiveResult(result);
    } finally {
      setLoading(false);
    }
  }

  function handleSaveDocument() {
    if (!activeResult) return;
    const newDocument: Document = {
      id: generateId("doc"),
      title: activeResult.request.prompt.slice(0, 60) || "Untitled AI Studio output",
      content: activeResult.output,
      folder: "drafts",
      wordCount: activeResult.output.split(/\s+/).length,
      lastEditedBy: "Maya Chen",
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      history: [{ id: "v1", label: "Created from AI Studio", editedAt: new Date().toISOString(), editedBy: "Maya Chen" }],
    };
    setDocuments((prev) => [newDocument, ...prev]);
    toast("Saved to Documents", { description: `"${newDocument.title}" was added to your drafts.` });
  }

  function handleSavePrompt() {
    if (!activeResult) return;
    const newPrompt: Prompt = {
      id: generateId("prm"),
      title: activeResult.request.prompt.slice(0, 60) || "Untitled prompt",
      description: "Saved from an AI Studio session.",
      category: "personal",
      content: activeResult.request.prompt,
      variables: [],
      favorite: false,
      usageCount: 0,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };
    setPrompts((prev) => [newPrompt, ...prev]);
    toast("Saved as Prompt", { description: `"${newPrompt.title}" was added to your prompt library.` });
  }

  function handleClearHistory() {
    setHistory([]);
    setActiveResult(null);
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
      <div className="flex flex-col gap-6">
        <div className="rounded-lg border border-border bg-surface p-5">
          <StudioComposer request={request} onRequestChange={setRequest} onGenerate={handleGenerate} loading={loading} />
        </div>
        <ResponsePanel
          result={activeResult}
          loading={loading}
          onRegenerate={handleRegenerate}
          onSaveDocument={handleSaveDocument}
          onSavePrompt={handleSavePrompt}
        />
      </div>
      <StudioHistory history={history} activeId={activeResult?.id} onSelect={setActiveResult} onClear={handleClearHistory} />
    </div>
  );
}
