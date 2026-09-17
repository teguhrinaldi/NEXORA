import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ChevronRight } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";

export interface ListCardItem {
  id: string;
  title: string;
  meta: string;
  href: string;
}

interface ListCardProps {
  title: string;
  items: ListCardItem[];
  icon: LucideIcon;
  emptyTitle: string;
  emptyDescription: string;
  viewAllHref?: string;
}

export function ListCard({ title, items, icon: Icon, emptyTitle, emptyDescription, viewAllHref }: ListCardProps) {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle>{title}</CardTitle>
        {viewAllHref && items.length > 0 && (
          <Link href={viewAllHref} className="text-xs font-medium text-accent hover:underline">
            View all
          </Link>
        )}
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <EmptyState icon={Icon} title={emptyTitle} description={emptyDescription} />
        ) : (
          <ul className="flex flex-col divide-y divide-border">
            {items.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 py-2.5 text-sm transition-colors hover:text-accent first:pt-0 last:pb-0"
                >
                  <Icon className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                  <span className="min-w-0 flex-1 truncate text-foreground">{item.title}</span>
                  <span className="shrink-0 text-xs text-muted-foreground">{item.meta}</span>
                  <ChevronRight className="size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
