"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { sidebarNav, settingsNavItem, type NavItem } from "@/config/navigation";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function SidebarLink({ item, collapsed, onNavigate }: { item: NavItem; collapsed: boolean; onNavigate?: () => void }) {
  const pathname = usePathname();
  const active = isActive(pathname, item.href);

  const link = (
    <Link
      href={item.href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
        collapsed && "justify-center px-2",
        active
          ? "bg-accent text-accent-foreground"
          : "text-muted-foreground hover:bg-surface-soft hover:text-foreground"
      )}
    >
      <item.icon className="size-4 shrink-0" aria-hidden="true" />
      {!collapsed && <span className="truncate">{item.label}</span>}
      {!collapsed && item.badge && (
        <span className="ml-auto rounded-full bg-accent/20 px-1.5 py-0.5 text-[10px] font-semibold text-accent">
          {item.badge}
        </span>
      )}
    </Link>
  );

  if (!collapsed) return link;

  return (
    <Tooltip>
      <TooltipTrigger asChild>{link}</TooltipTrigger>
      <TooltipContent side="right">{item.label}</TooltipContent>
    </Tooltip>
  );
}

export function SidebarNavigation({ collapsed = false, onNavigate }: { collapsed?: boolean; onNavigate?: () => void }) {
  return (
    <nav className="flex flex-1 flex-col gap-6 overflow-y-auto px-3 py-4" aria-label="Primary">
      {sidebarNav.map((group) => (
        <div key={group.label} className="flex flex-col gap-1">
          {!collapsed && (
            <h3 className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">
              {group.label}
            </h3>
          )}
          {group.items.map((item) => (
            <SidebarLink key={item.href} item={item} collapsed={collapsed} onNavigate={onNavigate} />
          ))}
        </div>
      ))}

      <div className="mt-auto flex flex-col gap-1 border-t border-border pt-3">
        <SidebarLink item={settingsNavItem} collapsed={collapsed} onNavigate={onNavigate} />
      </div>
    </nav>
  );
}
