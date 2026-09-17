import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { UsageAnalyticsWorkspace } from "@/components/analytics/usage-analytics-workspace";

export const metadata: Metadata = {
  title: "Usage",
};

export default function UsagePage() {
  return (
    <>
      <PageHeader title="Usage" description="Monitor requests, tokens, and cost across your workspace." />
      <UsageAnalyticsWorkspace />
    </>
  );
}
