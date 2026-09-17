import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatRelativeTime } from "@/lib/formatters";
import { EmptyState } from "@/components/ui/empty-state";
import { Activity } from "lucide-react";

interface ActivityFeedItem {
  id: string;
  actor: string;
  action: string;
  target: string;
  createdAt: string;
}

export function ActivityFeed({ title, items }: { title: string; items: ActivityFeedItem[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {items.length === 0 ? (
          <EmptyState icon={Activity} title="No recent activity" description="Activity from your workspace will appear here." />
        ) : (
          items.map((item) => (
            <div key={item.id} className="flex items-start gap-3 text-sm">
              <span
                className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-surface-soft text-[11px] font-semibold text-foreground"
                aria-hidden="true"
              >
                {item.actor.charAt(0)}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-foreground">
                  <span className="font-medium">{item.actor}</span> {item.action}{" "}
                  <span className="font-medium">{item.target}</span>
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">{formatRelativeTime(item.createdAt)}</p>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
