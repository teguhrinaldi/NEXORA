import { Suspense } from "react";
import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { DashboardViewSwitcher } from "@/components/dashboard/dashboard-view-switcher";

export const metadata: Metadata = {
  title: "Overview",
};

export default function OverviewPage() {
  return (
    <>
      <PageHeader
        title="Overview"
        description="A summary of your workspace, tailored to how you work."
      />
      <Suspense fallback={null}>
        <DashboardViewSwitcher />
      </Suspense>
    </>
  );
}
