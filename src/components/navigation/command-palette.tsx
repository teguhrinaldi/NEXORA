"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { Search, FileText, Sparkles, Settings, CreditCard, Plus } from "lucide-react";

import { useCommandPalette } from "@/hooks/use-command-palette";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { sidebarNav, settingsNavItem } from "@/config/navigation";
import { cn } from "@/lib/utils";

interface RecentAction {
  label: string;
  href: string;
}

export function CommandPalette() {
  const { open, setOpen } = useCommandPalette();
  const router = useRouter();
  const [recent, setRecent] = useLocalStorage<RecentAction[]>("nexora:recent-actions", []);

  const runAction = React.useCallback(
    (href: string, label: string) => {
      setOpen(false);
      router.push(href);
      setRecent((prev) => {
        const next = [{ href, label }, ...prev.filter((item) => item.href !== href)];
        return next.slice(0, 5);
      });
    },
    [router, setOpen, setRecent]
  );

  React.useEffect(() => {
    if (!open) return;
    function onEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, [open, setOpen]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center bg-black/60 backdrop-blur-sm px-4 pt-[12vh] animate-fade-in"
      onClick={() => setOpen(false)}
      role="presentation"
    >
      <Command
        label="Command palette"
        className="w-full max-w-xl overflow-hidden rounded-lg border border-border-strong bg-surface-raised shadow-2xl animate-rise-in"
        onClick={(event) => event.stopPropagation()}
        shouldFilter
      >
        <div className="flex items-center gap-2 border-b border-border px-4">
          <Search className="size-4 text-muted-foreground" aria-hidden="true" />
          <Command.Input
            autoFocus
            placeholder="Search actions, pages, and content…"
            className="h-12 w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
          <kbd className="hidden sm:inline-block rounded border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground">
            Esc
          </kbd>
        </div>
        <Command.List className="max-h-80 overflow-y-auto p-2">
          <Command.Empty className="py-8 text-center text-sm text-muted-foreground">
            No results found.
          </Command.Empty>

          {recent.length > 0 && (
            <Command.Group heading="Recent" className="px-2 py-1 text-xs font-medium text-muted-foreground">
              {recent.map((item) => (
                <Command.Item
                  key={item.href}
                  value={`recent-${item.label}`}
                  onSelect={() => runAction(item.href, item.label)}
                  className={cn(
                    "flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm text-foreground",
                    "data-[selected=true]:bg-surface-soft"
                  )}
                >
                  <FileText className="size-4 text-muted-foreground" aria-hidden="true" />
                  {item.label}
                </Command.Item>
              ))}
            </Command.Group>
          )}

          <Command.Group heading="Quick actions" className="px-2 py-1 text-xs font-medium text-muted-foreground">
            <Command.Item
              value="new ai studio"
              onSelect={() => runAction("/app/ai-studio", "New AI Studio session")}
              className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm text-foreground data-[selected=true]:bg-surface-soft"
            >
              <Sparkles className="size-4 text-accent" aria-hidden="true" />
              New AI Studio session
            </Command.Item>
            <Command.Item
              value="new document"
              onSelect={() => runAction("/app/documents", "Create a new document")}
              className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm text-foreground data-[selected=true]:bg-surface-soft"
            >
              <Plus className="size-4 text-accent" aria-hidden="true" />
              Create a new document
            </Command.Item>
            <Command.Item
              value="billing"
              onSelect={() => runAction("/app/billing", "Go to Billing")}
              className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm text-foreground data-[selected=true]:bg-surface-soft"
            >
              <CreditCard className="size-4 text-accent" aria-hidden="true" />
              Go to Billing
            </Command.Item>
            <Command.Item
              value="settings"
              onSelect={() => runAction("/app/settings", "Open Settings")}
              className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm text-foreground data-[selected=true]:bg-surface-soft"
            >
              <Settings className="size-4 text-accent" aria-hidden="true" />
              Open Settings
            </Command.Item>
          </Command.Group>

          {sidebarNav.map((group) => (
            <Command.Group
              key={group.label}
              heading={group.label}
              className="px-2 py-1 text-xs font-medium text-muted-foreground"
            >
              {group.items.map((item) => (
                <Command.Item
                  key={item.href}
                  value={item.label}
                  onSelect={() => runAction(item.href, item.label)}
                  className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm text-foreground data-[selected=true]:bg-surface-soft"
                >
                  <item.icon className="size-4 text-muted-foreground" aria-hidden="true" />
                  {item.label}
                </Command.Item>
              ))}
            </Command.Group>
          ))}

          <Command.Group heading="Settings" className="px-2 py-1 text-xs font-medium text-muted-foreground">
            <Command.Item
              value={settingsNavItem.label}
              onSelect={() => runAction(settingsNavItem.href, settingsNavItem.label)}
              className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm text-foreground data-[selected=true]:bg-surface-soft"
            >
              <settingsNavItem.icon className="size-4 text-muted-foreground" aria-hidden="true" />
              {settingsNavItem.label}
            </Command.Item>
          </Command.Group>
        </Command.List>
      </Command>
    </div>
  );
}
