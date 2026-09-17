"use client";

import * as React from "react";
import Link from "next/link";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { plans } from "@/data/billing";
import { formatCurrency } from "@/lib/formatters";
import { cn } from "@/lib/utils";

export function PricingTable() {
  const [cycle, setCycle] = React.useState<"month" | "year">("month");

  return (
    <div>
      <div className="flex justify-center">
        <Tabs value={cycle} onValueChange={(value) => setCycle(value as "month" | "year")}>
          <TabsList>
            <TabsTrigger value="month">Monthly</TabsTrigger>
            <TabsTrigger value="year">Yearly — save 20%</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {plans.map((plan) => {
          const price = cycle === "year" ? Math.round(plan.price * 12 * 0.8) : plan.price;
          return (
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
              <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl font-semibold text-foreground">{formatCurrency(price)}</span>
                <span className="text-xs text-muted-foreground">/{cycle === "year" ? "year" : "month"}</span>
              </div>
              <ul className="mt-5 flex flex-1 flex-col gap-2.5">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-foreground">
                    <Check className="mt-0.5 size-3.5 shrink-0 text-accent" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button variant={plan.highlighted ? "primary" : "secondary"} asChild className="mt-6">
                <Link href="/register">{plan.price === 0 ? "Start for free" : "Get started"}</Link>
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
