import type { Metadata } from "next";

import { WorkspaceForm } from "@/components/settings/workspace-form";
import { DangerZoneCard } from "@/components/settings/danger-zone-card";

export const metadata: Metadata = {
  title: "Workspace Settings",
};

export default function WorkspaceSettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <WorkspaceForm />
      <DangerZoneCard />
    </div>
  );
}
