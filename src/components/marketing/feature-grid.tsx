import { Sparkles, Workflow, BookMarked, FileText, BarChart3, Users2 } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI Studio",
    description: "Eight specialized modes for writing, summarizing, brainstorming, and more — all in one composer.",
  },
  {
    icon: Workflow,
    title: "Automation builder",
    description: "Chain triggers, AI actions, and outputs into workflows that run without you.",
  },
  {
    icon: BookMarked,
    title: "Prompt library",
    description: "Save, organize, and reuse the prompts that consistently produce great results.",
  },
  {
    icon: FileText,
    title: "Document workspace",
    description: "Draft and refine long-form content with AI actions built directly into the editor.",
  },
  {
    icon: BarChart3,
    title: "Usage analytics",
    description: "Understand exactly how your workspace uses AI — requests, tokens, and cost.",
  },
  {
    icon: Users2,
    title: "Team collaboration",
    description: "Shared documents, prompts, and roles built for teams working together.",
  },
];

export function FeatureGrid() {
  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Everything your workspace needs
          </h2>
          <p className="mt-3 text-muted-foreground">
            NEXORA brings creation, organization, and automation into one structured product.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="rounded-lg border border-border bg-surface p-6">
              <span className="flex size-10 items-center justify-center rounded-md bg-accent/15 text-accent">
                <feature.icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-foreground">{feature.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
