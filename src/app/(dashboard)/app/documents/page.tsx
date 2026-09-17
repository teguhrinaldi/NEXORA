import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { DocumentsWorkspace } from "@/components/documents/documents-workspace";

export const metadata: Metadata = {
  title: "Documents",
};

export default function DocumentsPage() {
  return (
    <>
      <PageHeader title="Documents" description="Draft, edit, and refine your workspace's written content." />
      <DocumentsWorkspace />
    </>
  );
}
