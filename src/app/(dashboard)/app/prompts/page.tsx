import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { PromptsWorkspace } from "@/components/prompts/prompts-workspace";

export const metadata: Metadata = {
  title: "Prompt Library",
};

export default function PromptsPage() {
  return (
    <>
      <PageHeader title="Prompt Library" description="Save, organize, and reuse your best-performing prompts." />
      <PromptsWorkspace />
    </>
  );
}
