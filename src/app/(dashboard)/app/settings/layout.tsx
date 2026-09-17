import { PageHeader } from "@/components/layout/page-header";
import { SettingsNav } from "@/components/settings/settings-nav";

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageHeader title="Settings" description="Manage your account, workspace, and preferences." />
      <SettingsNav />
      <div className="max-w-2xl pt-6">{children}</div>
    </>
  );
}
