"use client";

import * as React from "react";
import { ChevronsUpDown, Check, Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

const workspaces = [
  { id: "northlight", name: "Northlight", plan: "Pro" },
  { id: "personal", name: "Personal", plan: "Free" },
];

export function WorkspaceSwitcher({ collapsed = false }: { collapsed?: boolean }) {
  const [activeId, setActiveId] = React.useState(workspaces[0].id);
  const { toast } = useToast();
  const active = workspaces.find((w) => w.id === activeId) ?? workspaces[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex items-center gap-2 rounded-md border border-border bg-surface-soft px-2.5 py-2 text-left transition-colors hover:border-border-strong",
            collapsed ? "w-10 justify-center" : "w-full"
          )}
        >
          <span
            className="flex size-6 shrink-0 items-center justify-center rounded-md bg-accent text-[11px] font-bold text-accent-foreground"
            aria-hidden="true"
          >
            {active.name.charAt(0)}
          </span>
          {!collapsed && (
            <>
              <span className="flex-1 truncate text-sm font-medium text-foreground">{active.name}</span>
              <ChevronsUpDown className="size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
            </>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-64">
        <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {workspaces.map((workspace) => (
          <DropdownMenuItem key={workspace.id} onSelect={() => setActiveId(workspace.id)}>
            <span
              className="flex size-5 shrink-0 items-center justify-center rounded bg-surface-raised text-[10px] font-bold text-foreground"
              aria-hidden="true"
            >
              {workspace.name.charAt(0)}
            </span>
            <span className="flex-1 truncate">{workspace.name}</span>
            <span className="text-xs text-muted-foreground">{workspace.plan}</span>
            {workspace.id === activeId && <Check className="size-3.5 text-accent" aria-hidden="true" />}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={() =>
            toast("Workspace creation", { description: "Creating additional workspaces is available on the Team plan." })
          }
        >
          <Plus className="size-3.5" aria-hidden="true" />
          Create workspace
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
