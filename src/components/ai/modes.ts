import type { LucideIcon } from "lucide-react";
import {
  MessagesSquare,
  PenLine,
  FileStack,
  RefreshCcw,
  Sparkles,
  Languages,
  ImagePlus,
  ScanSearch,
} from "lucide-react";

import type { AiStudioMode } from "@/types/ai";

export interface ModeMeta {
  id: AiStudioMode;
  label: string;
  description: string;
  icon: LucideIcon;
  placeholder: string;
}

export const aiStudioModes: ModeMeta[] = [
  { id: "chat", label: "Chat", description: "Ask a question or explore an idea", icon: MessagesSquare, placeholder: "Ask NEXORA anything…" },
  { id: "write", label: "Write", description: "Draft something new from a brief", icon: PenLine, placeholder: "Describe what you want to write…" },
  { id: "summarize", label: "Summarize", description: "Condense long text into key points", icon: FileStack, placeholder: "Paste the text you want summarized…" },
  { id: "rewrite", label: "Rewrite", description: "Improve clarity, tone, or length", icon: RefreshCcw, placeholder: "Paste the text you want rewritten…" },
  { id: "brainstorm", label: "Brainstorm", description: "Generate multiple directions at once", icon: Sparkles, placeholder: "What are you trying to figure out?" },
  { id: "translate", label: "Translate", description: "Translate text into another language", icon: Languages, placeholder: "Paste the text you want translated…" },
  { id: "generate-image", label: "Generate Image", description: "Describe a visual concept", icon: ImagePlus, placeholder: "Describe the image you want to generate…" },
  { id: "analyze-document", label: "Analyze Document", description: "Get structured insight from a document", icon: ScanSearch, placeholder: "Paste or attach the document to analyze…" },
];

export const toneOptions = [
  { id: "neutral", label: "Neutral" },
  { id: "professional", label: "Professional" },
  { id: "friendly", label: "Friendly" },
  { id: "confident", label: "Confident" },
  { id: "playful", label: "Playful" },
  { id: "concise", label: "Concise" },
] as const;

export const lengthOptions = [
  { id: "short", label: "Short" },
  { id: "medium", label: "Medium" },
  { id: "long", label: "Long" },
] as const;

export const languageOptions = [
  { id: "english", label: "English" },
  { id: "spanish", label: "Spanish" },
  { id: "french", label: "French" },
  { id: "german", label: "German" },
  { id: "portuguese", label: "Portuguese" },
  { id: "japanese", label: "Japanese" },
  { id: "indonesian", label: "Indonesian" },
] as const;

export const modelOptions = [
  { id: "nexora-core", label: "Nexora Core", description: "Balanced quality and speed" },
  { id: "nexora-fast", label: "Nexora Fast", description: "Optimized for quick iterations" },
  { id: "nexora-precise", label: "Nexora Precise", description: "Best for detailed, structured output" },
  { id: "nexora-vision", label: "Nexora Vision", description: "Understands images and documents" },
] as const;
