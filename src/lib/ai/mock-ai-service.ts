import type { AiStudioMode, AiStudioRequest, AiStudioResult } from "@/types/ai";
import { AI_RESPONSE_DELAY_MS } from "@/lib/constants";

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function wordCountToTokens(text: string) {
  return Math.round(text.split(/\s+/).length * 1.4);
}

const responseTemplates: Record<AiStudioMode, (prompt: string) => string> = {
  chat: (prompt) =>
    `Here's a direct take on "${truncatePrompt(prompt)}":\n\nThe short answer is that it depends on the constraint you care most about. Start with the outcome you want, work backward to the first concrete step, and keep the scope small enough to finish this week.`,
  write: (prompt) =>
    `${capitalize(truncatePrompt(prompt))}\n\nMost teams treat this as a single decision, but it's really three smaller ones stacked together. Getting the first one right makes the other two nearly automatic — which is why it's worth slowing down at the start rather than the end.`,
  summarize: () =>
    `Key points:\n• The core argument centers on reducing friction between intent and output.\n• Supporting evidence favors a narrower initial scope over a broad rollout.\n• The main open question is how success will be measured after the first month.`,
  rewrite: (prompt) =>
    `Here's a tighter version:\n\n${truncatePrompt(prompt, true)}`,
  brainstorm: () =>
    `A few directions worth exploring:\n\n1. Lead with the outcome, not the mechanism.\n2. Frame it as a before/after rather than a feature list.\n3. Borrow structure from a category people already trust.\n4. Make the smallest version of this shippable in a week.\n5. Ask what would make this obviously unnecessary — then avoid that.`,
  translate: (prompt) =>
    `Translated (preview):\n\n${truncatePrompt(prompt)}\n\n— rendered in the selected target language, preserving tone and formatting.`,
  "generate-image": () =>
    `Image concept generated. A clean, editorial composition with generous negative space, a single focal object slightly off-center, and muted natural lighting — consistent with a calm, premium visual identity.`,
  "analyze-document": () =>
    `Analysis complete.\n\nStructure: three main sections with a clear thesis in the opening paragraph.\nTone: confident, restrained, low use of superlatives.\nGaps: the closing section lacks a concrete next step — consider adding one.`,
};

function truncatePrompt(prompt: string, keepLonger = false) {
  const max = keepLonger ? 220 : 140;
  return prompt.length > max ? `${prompt.slice(0, max).trim()}…` : prompt;
}

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export async function generateAiResponse(request: AiStudioRequest): Promise<AiStudioResult> {
  await wait(AI_RESPONSE_DELAY_MS);

  const template = responseTemplates[request.mode];
  const output = template(request.prompt.trim() || "your request");

  return {
    id: `res-${Date.now()}`,
    request,
    output,
    createdAt: new Date().toISOString(),
    tokensUsed: wordCountToTokens(output) + wordCountToTokens(request.prompt),
  };
}

export async function regenerateAiResponse(request: AiStudioRequest): Promise<AiStudioResult> {
  const result = await generateAiResponse(request);
  return { ...result, output: `${result.output}\n\n(Regenerated variation)` };
}
