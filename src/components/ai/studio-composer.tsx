"use client";

import * as React from "react";
import { Paperclip, X, Sparkles } from "lucide-react";

import type { AiStudioRequest } from "@/types/ai";
import { aiStudioModes, toneOptions, lengthOptions, languageOptions, modelOptions } from "@/components/ai/modes";
import { ModeSelector } from "@/components/ai/mode-selector";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface StudioComposerProps {
  request: AiStudioRequest;
  onRequestChange: (request: AiStudioRequest) => void;
  onGenerate: () => void;
  loading: boolean;
}

export function StudioComposer({ request, onRequestChange, onGenerate, loading }: StudioComposerProps) {
  const [attachment, setAttachment] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const activeMode = aiStudioModes.find((mode) => mode.id === request.mode) ?? aiStudioModes[0];

  function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      setAttachment(file.name);
      toast("Attachment added", { description: `${file.name} will be used as context for this request.` });
    }
    event.target.value = "";
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    onGenerate();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <Label className="mb-2 block">Capability</Label>
        <ModeSelector value={request.mode} onChange={(mode) => onRequestChange({ ...request, mode })} />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="studio-prompt">Prompt</Label>
        <Textarea
          id="studio-prompt"
          value={request.prompt}
          onChange={(event) => onRequestChange({ ...request, prompt: event.target.value })}
          placeholder={activeMode.placeholder}
          className="min-h-40"
        />
        {attachment && (
          <div className="flex w-fit items-center gap-2 rounded-md border border-border bg-surface-soft px-2.5 py-1.5 text-xs text-foreground">
            <Paperclip className="size-3.5 text-muted-foreground" aria-hidden="true" />
            {attachment}
            <button
              type="button"
              onClick={() => setAttachment(null)}
              aria-label={`Remove attachment ${attachment}`}
              className="text-muted-foreground hover:text-danger"
            >
              <X className="size-3.5" />
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="studio-model">Model</Label>
          <Select value={request.model} onValueChange={(value) => onRequestChange({ ...request, model: value as AiStudioRequest["model"] })}>
            <SelectTrigger id="studio-model">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {modelOptions.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="studio-tone">Tone</Label>
          <Select value={request.tone} onValueChange={(value) => onRequestChange({ ...request, tone: value as AiStudioRequest["tone"] })}>
            <SelectTrigger id="studio-tone">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {toneOptions.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="studio-length">Length</Label>
          <Select value={request.length} onValueChange={(value) => onRequestChange({ ...request, length: value as AiStudioRequest["length"] })}>
            <SelectTrigger id="studio-length">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {lengthOptions.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="studio-language">Language</Label>
          <Select value={request.language} onValueChange={(value) => onRequestChange({ ...request, language: value as AiStudioRequest["language"] })}>
            <SelectTrigger id="studio-language">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {languageOptions.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-border pt-4">
        <div>
          <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileSelect} />
          <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} className="gap-2">
            <Paperclip className="size-3.5" />
            Attach
          </Button>
        </div>
        <Button type="submit" loading={loading} disabled={!request.prompt.trim() || loading} className="gap-2">
          <Sparkles className="size-4" />
          Generate
        </Button>
      </div>
    </form>
  );
}
