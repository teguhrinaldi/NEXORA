"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import type { DailyUsagePoint } from "@/types/analytics";
import { formatCompactNumber } from "@/lib/formatters";

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number; name: string }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-md border border-border-strong bg-surface-raised px-3 py-2 text-xs shadow-xl">
      <p className="font-medium text-foreground">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} className="text-muted-foreground">
          {entry.name}: <span className="text-foreground">{formatCompactNumber(entry.value)}</span>
        </p>
      ))}
    </div>
  );
}

export function UsageTrendChart({ data }: { data: DailyUsagePoint[] }) {
  return (
    <div>
      <div className="h-64 w-full" role="img" aria-label={`Usage trend chart showing requests from ${data[0]?.date} to ${data[data.length - 1]?.date}`}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="requestsFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-lime)" stopOpacity={0.35} />
                <stop offset="95%" stopColor="var(--color-lime)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--color-muted)", fontSize: 11 }}
              tickFormatter={(value: string) => value.slice(5)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--color-muted)", fontSize: 11 }}
              tickFormatter={(value: number) => formatCompactNumber(value)}
              width={40}
            />
            <Tooltip content={<ChartTooltip />} cursor={{ stroke: "var(--color-border-strong)" }} />
            <Area
              type="monotone"
              dataKey="requests"
              name="Requests"
              stroke="var(--color-lime)"
              strokeWidth={2}
              fill="url(#requestsFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <p className="sr-only">
        Daily request counts: {data.map((point) => `${point.date}: ${point.requests} requests`).join(", ")}.
      </p>
    </div>
  );
}
