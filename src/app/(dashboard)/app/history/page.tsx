import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { HistoryWorkspace } from "@/components/history/history-workspace";

export const metadata: Metadata = {
  title: "History",
};

export default function HistoryPage() {
  return (
    <>
      <PageHeader title="History" description="A unified timeline of activity across your workspace." />
      <HistoryWorkspace />
    </>
  );
}
