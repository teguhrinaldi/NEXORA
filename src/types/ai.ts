export type AiStudioMode =
  | "chat"
  | "write"
  | "summarize"
  | "rewrite"
  | "brainstorm"
  | "translate"
  | "generate-image"
  | "analyze-document";

export type AiModel = "nexora-core" | "nexora-fast" | "nexora-precise" | "nexora-vision";

export type AiTone = "neutral" | "professional" | "friendly" | "confident" | "playful" | "concise";

export type AiOutputLength = "short" | "medium" | "long";

export type AiLanguage =
  | "english"
  | "spanish"
  | "french"
  | "german"
  | "portuguese"
  | "japanese"
  | "indonesian";

export interface AiStudioRequest {
  mode: AiStudioMode;
  prompt: string;
  model: AiModel;
  tone: AiTone;
  length: AiOutputLength;
  language: AiLanguage;
}

export interface AiStudioResult {
  id: string;
  request: AiStudioRequest;
  output: string;
  createdAt: string;
  tokensUsed: number;
}

export interface ConversationMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
}

export interface Conversation {
  id: string;
  title: string;
  preview: string;
  messages: ConversationMessage[];
  archived: boolean;
  updatedAt: string;
  createdAt: string;
}
