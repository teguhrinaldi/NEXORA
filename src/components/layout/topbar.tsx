"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Bell, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { MobileSidebar } from "@/components/layout/mobile-sidebar";
import { useCommandPalette } from "@/hooks/use-command-palette";
import { sidebarNav, settingsNav, settingsNavItem } from "@/config/navigation";
import { notifications } from "@/data/notifications";

function usePageTitle() {
  const pathname = usePathname();
  const allItems = sidebarNav.flatMap((g) => g.items);

  const settingsMatch = settingsNav.find((item) => pathname.startsWith(item.href));
  if (settingsMatch) return `Settings — ${settingsMatch.label}`;
  if (pathname.startsWith(settingsNavItem.href)) return settingsNavItem.label;

  const match = allItems.find((item) => pathname.startsWith(item.href));
  if (match) return match.label;

  return "Workspace";
}

export function Topbar() {
  const { setOpen } = useCommandPalette();
  const title = usePageTitle();
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/95 px-4 backdrop-blur-sm md:px-6">
      <MobileSidebar />

      <h1 className="truncate text-sm font-semibold text-foreground md:text-base">{title}</h1>

      <div className="ml-auto flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setOpen(true)}
          className="hidden gap-2 text-muted-foreground sm:inline-flex"
        >
          <Search className="size-3.5" />
          Search
          <kbd className="ml-2 rounded border border-border px-1.5 py-0.5 text-[10px]">Ctrl K</kbd>
        </Button>
        <Button variant="ghost" size="icon" onClick={() => setOpen(true)} className="sm:hidden" aria-label="Search">
          <Search className="size-4" />
        </Button>

        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/app/usage"
              className="hidden items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-accent/40 hover:text-accent lg:inline-flex"
            >
              <Sparkles className="size-3.5 text-accent" />
              20,180 credits left
            </Link>
          </TooltipTrigger>
          <TooltipContent>80.7% of your monthly limit used</TooltipContent>
        </Tooltip>

        <Button variant="ghost" size="icon" asChild aria-label={`Notifications, ${unreadCount} unread`}>
          <Link href="/app/notifications" className="relative">
            <Bell className="size-4" />
            {unreadCount > 0 && (
              <span className="absolute right-1.5 top-1.5 flex size-2 rounded-full bg-accent" aria-hidden="true" />
            )}
          </Link>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="ml-1 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
              aria-label="Account menu"
            >
              <Avatar>
                <AvatarFallback style={{ background: "var(--color-lime)", color: "var(--color-lime-ink)" }}>
                  MC
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground">Maya Chen</span>
                <span className="text-xs font-normal text-muted-foreground">maya@northlight.co</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/app/settings/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/app/settings/workspace">Workspace settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/app/billing">Billing</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/login">Sign out</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
