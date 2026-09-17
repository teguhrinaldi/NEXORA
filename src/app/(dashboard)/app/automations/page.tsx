import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { AutomationsWorkspace } from "@/components/automations/automations-workspace";

export const metadata: Metadata = {
  title: "Automations",
};

export default function AutomationsPage() {
  return (
    <>
      <PageHeader title="Automations" description="Build AI-powered workflows from triggers to outputs." />
      <AutomationsWorkspace />
    </>
  );
}
