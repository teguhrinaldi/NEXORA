import type { Metadata } from "next";

import { ProfileForm } from "@/components/settings/profile-form";
import { PreferencesCard } from "@/components/settings/preferences-card";

export const metadata: Metadata = {
  title: "Profile Settings",
};

export default function ProfileSettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <ProfileForm />
      <PreferencesCard />
    </div>
  );
}
