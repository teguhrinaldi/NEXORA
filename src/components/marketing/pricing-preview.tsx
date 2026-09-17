import Link from "next/link";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { plans } from "@/data/billing";
import { formatCurrency } from "@/lib/formatters";
import { cn } from "@/lib/utils";

export function PricingPreview() {
  return (
    <section className="px-4 py-20 sm:px-6" id="pricing">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Simple, transparent pricing</h2>
          <p className="mt-3 text-muted-foreground">Start free. Upgrade as your workspace grows.</p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                "relative flex flex-col rounded-lg border border-border bg-surface p-6",
                plan.highlighted && "border-accent/50 shadow-[0_0_0_1px_var(--color-lime)]"
              )}
            >
              {plan.highlighted && (
                <Badge variant="accent" className="absolute -top-2.5 left-6">
                  Most popular
                </Badge>
              )}
              <h3 className="text-sm font-semibold text-foreground">{plan.name}</h3>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl font-semibold text-foreground">{formatCurrency(plan.price)}</span>
                <span className="text-xs text-muted-foreground">/{plan.billingCycle}</span>
              </div>
              <ul className="mt-5 flex flex-1 flex-col gap-2.5">
                {plan.features.slice(0, 4).map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-foreground">
                    <Check className="mt-0.5 size-3.5 shrink-0 text-accent" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button variant={plan.highlighted ? "primary" : "secondary"} asChild className="mt-6">
                <Link href="/register">Get started</Link>
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/pricing" className="text-sm font-medium text-accent hover:underline">
            Compare all plan details →
          </Link>
        </div>
      </div>
    </section>
  );
}
