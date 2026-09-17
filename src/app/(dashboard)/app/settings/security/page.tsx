import type { Metadata } from "next";

import { SecurityForm } from "@/components/settings/security-form";

export const metadata: Metadata = {
  title: "Security Settings",
};

export default function SecuritySettingsPage() {
  return <SecurityForm />;
}
