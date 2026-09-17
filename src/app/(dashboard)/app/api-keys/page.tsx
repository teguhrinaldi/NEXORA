import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { ApiKeysWorkspace } from "@/components/api-keys/api-keys-workspace";

export const metadata: Metadata = {
  title: "API Keys",
};

export default function ApiKeysPage() {
  return (
    <>
      <PageHeader title="API Keys" description="Generate and manage keys for programmatic access." />
      <ApiKeysWorkspace />
    </>
  );
}
