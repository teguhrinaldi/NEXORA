import type { Metadata } from "next";

import { HeroSection } from "@/components/marketing/hero-section";
import { FeatureGrid } from "@/components/marketing/feature-grid";
import { FeatureShowcase } from "@/components/marketing/feature-showcase";
import {
  AiStudioMockup,
  AutomationMockup,
  PromptLibraryMockup,
  DocumentWorkspaceMockup,
  AnalyticsMockup,
} from "@/components/marketing/feature-mockups";
import { Testimonials } from "@/components/marketing/testimonials";
import { PricingPreview } from "@/components/marketing/pricing-preview";
import { FaqSection } from "@/components/marketing/faq-section";
import { FinalCta } from "@/components/marketing/final-cta";

export const metadata: Metadata = {
  title: "NEXORA — Your intelligent workspace",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeatureGrid />

      <FeatureShowcase
        id="ai-studio"
        eyebrow="AI Studio"
        title="Eight ways to create, one composer"
        description="Switch between chat, writing, summarizing, brainstorming, and more without losing your place. Every mode shares the same polished workspace."
        bullets={[
          "Model, tone, length, and language controls for every request",
          "Copy, regenerate, export, or save output as a document or prompt",
          "Session history keeps every draft within reach",
        ]}
      >
        <AiStudioMockup />
      </FeatureShowcase>

      <FeatureShowcase
        id="automations"
        eyebrow="Automations"
        title="Workflows that run themselves"
        description="Chain triggers, AI actions, conditions, and outputs into a workflow that runs on a schedule or an event — no code required."
        bullets={[
          "Visual step editor with trigger, action, condition, and output nodes",
          "Execution history with success and failure detail",
          "Start from a template or build from scratch",
        ]}
        reverse
      >
        <AutomationMockup />
      </FeatureShowcase>

      <FeatureShowcase
        eyebrow="Prompt Library"
        title="Your best prompts, always within reach"
        description="Save prompts with reusable variables, organize them by category, and drop them straight into AI Studio."
        bullets={[
          "Favorites and recently used for fast access",
          "Reusable variables for consistent, repeatable output",
          "Shared libraries for your whole team",
        ]}
      >
        <PromptLibraryMockup />
      </FeatureShowcase>

      <FeatureShowcase
        eyebrow="Documents"
        title="Write with AI built into the editor"
        description="Draft, rewrite, and summarize without leaving the page. Every document keeps a clear version history."
        bullets={[
          "AI actions for rewrite, summarize, and continue writing",
          "Word count and last-edited metadata at a glance",
          "Organize documents into folders you control",
        ]}
        reverse
      >
        <DocumentWorkspaceMockup />
      </FeatureShowcase>

      <FeatureShowcase
        eyebrow="Usage Analytics"
        title="Understand exactly how you use AI"
        description="Track requests, tokens, and cost across your workspace with clear, accessible charts."
        bullets={[
          "Daily and weekly usage trends",
          "Model distribution and top prompts",
          "Exportable usage history",
        ]}
      >
        <AnalyticsMockup />
      </FeatureShowcase>

      <Testimonials />
      <PricingPreview />
      <FaqSection />
      <FinalCta />
    </>
  );
}
