import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { BillingWorkspace } from "@/components/billing/billing-workspace";

export const metadata: Metadata = {
  title: "Billing",
};

export default function BillingPage() {
  return (
    <>
      <PageHeader title="Billing" description="Manage your plan, payment method, and invoices." />
      <BillingWorkspace />
    </>
  );
}
