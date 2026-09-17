import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";

import type { StatCard as StatCardType } from "@/types/dashboard";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const trendConfig = {
  up: { icon: ArrowUpRight, className: "text-success" },
  down: { icon: ArrowDownRight, className: "text-danger" },
  flat: { icon: Minus, className: "text-muted-foreground" },
};

export function StatCard({ stat }: { stat: StatCardType }) {
  const trend = stat.trend ? trendConfig[stat.trend] : null;

  return (
    <Card>
      <CardContent className="p-5">
        <p className="text-xs font-medium text-muted-foreground">{stat.label}</p>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-2xl font-semibold tracking-tight text-foreground">{stat.value}</span>
          {stat.hint && <span className="text-xs text-muted-foreground">{stat.hint}</span>}
        </div>
        {stat.change && trend && (
          <div className={cn("mt-2 flex items-center gap-1 text-xs font-medium", trend.className)}>
            <trend.icon className="size-3.5" aria-hidden="true" />
            <span>{stat.change}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function StatCardGrid({ stats }: { stats: StatCardType[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.id} stat={stat} />
      ))}
    </div>
  );
}
