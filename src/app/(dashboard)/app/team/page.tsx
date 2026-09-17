import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { TeamWorkspace } from "@/components/team/team-workspace";

export const metadata: Metadata = {
  title: "Team",
};

export default function TeamPage() {
  return (
    <>
      <PageHeader title="Team" description="Manage members, roles, and shared workspace activity." />
      <TeamWorkspace />
    </>
  );
}
