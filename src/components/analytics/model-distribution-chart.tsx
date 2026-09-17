"use client";

import type { ModelUsageShare } from "@/types/analytics";
import { formatNumber } from "@/lib/formatters";

const colors = ["var(--color-lime)", "var(--color-info)", "var(--color-warning)", "var(--color-muted)"];

export function ModelDistributionChart({ data }: { data: ModelUsageShare[] }) {
  return (
    <div className="flex flex-col gap-3">
      {data.map((item, index) => (
        <div key={item.model}>
          <div className="mb-1.5 flex items-center justify-between text-xs">
            <span className="font-medium text-foreground">{item.model}</span>
            <span className="text-muted-foreground">
              {formatNumber(item.requests)} · {item.share}%
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-surface-soft" role="presentation">
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${item.share}%`, backgroundColor: colors[index % colors.length] }}
            />
          </div>
        </div>
      ))}
      <p className="sr-only">
        Model distribution: {data.map((item) => `${item.model}: ${item.share}%`).join(", ")}.
      </p>
    </div>
  );
}
