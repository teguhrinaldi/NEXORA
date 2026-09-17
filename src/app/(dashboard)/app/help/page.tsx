import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { HelpWorkspace } from "@/components/help/help-workspace";

export const metadata: Metadata = {
  title: "Help Center",
};

export default function HelpPage() {
  return (
    <>
      <PageHeader title="Help Center" description="Find answers, guides, and support for NEXORA." />
      <HelpWorkspace />
    </>
  );
}
