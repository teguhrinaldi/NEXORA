"use client";

import * as React from "react";
import { Bell, CheckCheck, Workflow, Users, CreditCard, Sparkles, ShieldAlert } from "lucide-react";

import type { AppNotification, NotificationCategory } from "@/types/notifications";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmptyState } from "@/components/ui/empty-state";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { notifications as seedNotifications } from "@/data/notifications";
import { formatRelativeTime } from "@/lib/formatters";
import { cn } from "@/lib/utils";

const categoryIcon: Record<NotificationCategory, typeof Bell> = {
  product: Sparkles,
  billing: CreditCard,
  team: Users,
  automation: Workflow,
  security: ShieldAlert,
};

type FilterValue = "all" | "unread" | NotificationCategory;

export function NotificationsWorkspace() {
  const [notifications, setNotifications] = useLocalStorage<AppNotification[]>("nexora:notifications", seedNotifications);
  const [filter, setFilter] = React.useState<FilterValue>("all");

  const filtered = notifications.filter((n) => {
    if (filter === "all") return true;
    if (filter === "unread") return !n.read;
    return n.category === filter;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  function markRead(id: string) {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Tabs value={filter} onValueChange={(value) => setFilter(value as FilterValue)}>
          <TabsList className="w-full justify-start overflow-x-auto sm:w-fit">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread{unreadCount > 0 ? ` (${unreadCount})` : ""}</TabsTrigger>
            <TabsTrigger value="automation">Automation</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
        </Tabs>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={markAllRead} className="gap-2">
            <CheckCheck className="size-3.5" />
            Mark all as read
          </Button>
        )}
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={Bell} title="No notifications" description="You're all caught up. New notifications will appear here." />
      ) : (
        <Card>
          <CardContent className="flex flex-col divide-y divide-border p-0" aria-live="polite">
            {filtered.map((notification) => {
              const Icon = categoryIcon[notification.category];
              return (
                <button
                  key={notification.id}
                  type="button"
                  onClick={() => markRead(notification.id)}
                  className={cn(
                    "flex w-full items-start gap-3 px-5 py-4 text-left transition-colors hover:bg-surface-soft",
                    !notification.read && "bg-accent/5"
                  )}
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-surface-soft">
                    <Icon className="size-4 text-muted-foreground" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-medium text-foreground">{notification.title}</p>
                      {!notification.read && <span className="size-1.5 shrink-0 rounded-full bg-accent" aria-label="Unread" />}
                    </div>
                    <p className="mt-0.5 text-sm text-muted-foreground">{notification.description}</p>
                    <p className="mt-1 text-xs text-muted-foreground/80">{formatRelativeTime(notification.createdAt)}</p>
                  </div>
                </button>
              );
            })}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
