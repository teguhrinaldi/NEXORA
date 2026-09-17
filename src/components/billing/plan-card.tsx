import { Check } from "lucide-react";

import type { Plan, PlanId } from "@/types/billing";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/formatters";
import { cn } from "@/lib/utils";

interface PlanCardProps {
  plan: Plan;
  currentPlanId: PlanId;
  onSelect: (plan: Plan) => void;
}

export function PlanCard({ plan, currentPlanId, onSelect }: PlanCardProps) {
  const isCurrent = plan.id === currentPlanId;

  return (
    <Card className={cn("relative flex flex-col", plan.highlighted && "border-accent/50 shadow-[0_0_0_1px_var(--color-lime)]")}>
      {plan.highlighted && (
        <Badge variant="accent" className="absolute -top-2.5 left-5">
          Most popular
        </Badge>
      )}
      <CardContent className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <h3 className="text-sm font-semibold text-foreground">{plan.name}</h3>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-2xl font-semibold text-foreground">{formatCurrency(plan.price)}</span>
            <span className="text-xs text-muted-foreground">/{plan.billingCycle}</span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
        </div>

        <ul className="flex flex-1 flex-col gap-2">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm text-foreground">
              <Check className="mt-0.5 size-3.5 shrink-0 text-accent" aria-hidden="true" />
              {feature}
            </li>
          ))}
        </ul>

        <Button
          variant={isCurrent ? "outline" : plan.highlighted ? "primary" : "secondary"}
          disabled={isCurrent}
          onClick={() => onSelect(plan)}
        >
          {isCurrent ? "Current plan" : "Switch plan"}
        </Button>
      </CardContent>
    </Card>
  );
}
