import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { NotificationsWorkspace } from "@/components/notifications/notifications-workspace";

export const metadata: Metadata = {
  title: "Notifications",
};

export default function NotificationsPage() {
  return (
    <>
      <PageHeader title="Notifications" description="Stay on top of activity across your workspace." />
      <NotificationsWorkspace />
    </>
  );
}
