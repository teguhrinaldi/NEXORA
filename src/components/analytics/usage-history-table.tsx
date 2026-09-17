"use client";

import { Download } from "lucide-react";

import type { UsageHistoryRow } from "@/types/analytics";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatDate, formatNumber } from "@/lib/formatters";
import { useToast } from "@/hooks/use-toast";

export function UsageHistoryTable({ rows }: { rows: UsageHistoryRow[] }) {
  const { toast } = useToast();

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle>Usage history</CardTitle>
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={() => toast("Export started", { description: "Your usage history is being prepared as a CSV file." })}
        >
          <Download className="size-3.5" />
          Export
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
                <th className="pb-2 pr-4 font-medium">Date</th>
                <th className="pb-2 pr-4 font-medium">Workspace</th>
                <th className="pb-2 pr-4 font-medium">Requests</th>
                <th className="pb-2 pr-4 font-medium">Tokens</th>
                <th className="pb-2 font-medium">Cost</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-b border-border last:border-0">
                  <td className="py-2.5 pr-4 text-foreground">{formatDate(row.date)}</td>
                  <td className="py-2.5 pr-4 text-muted-foreground">{row.workspace}</td>
                  <td className="py-2.5 pr-4 text-muted-foreground">{formatNumber(row.requests)}</td>
                  <td className="py-2.5 pr-4 text-muted-foreground">{formatNumber(row.tokens)}</td>
                  <td className="py-2.5 text-muted-foreground">{formatCurrency(row.cost)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
