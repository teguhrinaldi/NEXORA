import type { Metadata } from "next";

import { PricingTable } from "@/components/marketing/pricing-table";
import { FaqSection } from "@/components/marketing/faq-section";
import { FinalCta } from "@/components/marketing/final-cta";

export const metadata: Metadata = {
  title: "Pricing",
};

export default function PricingPage() {
  return (
    <>
      <section className="px-4 pb-4 pt-16 sm:px-6 sm:pt-24">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">Simple, transparent pricing</h1>
          <p className="mt-4 text-muted-foreground">
            Start free and upgrade as your workspace grows. No hidden fees, cancel anytime.
          </p>
        </div>
      </section>
      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <PricingTable />
        </div>
      </section>
      <FaqSection />
      <FinalCta />
    </>
  );
}
