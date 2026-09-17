import { Suspense } from "react";
import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { AiStudioWorkspace } from "@/components/ai/ai-studio-workspace";

export const metadata: Metadata = {
  title: "AI Studio",
};

export default function AiStudioPage() {
  return (
    <>
      <PageHeader title="AI Studio" description="Generate, refine, and save AI output across eight specialized modes." />
      <Suspense fallback={null}>
        <AiStudioWorkspace />
      </Suspense>
    </>
  );
}
