"use client";

import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { SidebarNavigation } from "@/components/layout/sidebar-nav";
import { WorkspaceSwitcher } from "@/components/layout/workspace-switcher";

export function MobileSidebar() {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open navigation menu">
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex w-72 flex-col p-0">
        <VisuallyHidden>
          <SheetTitle>Navigation</SheetTitle>
        </VisuallyHidden>
        <div className="flex items-center gap-2 px-4 py-4">
          <Link href="/app/overview" className="flex items-center gap-2" onClick={() => setOpen(false)}>
            <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-accent text-sm font-bold text-accent-foreground">
              N
            </span>
            <span className="text-base font-semibold tracking-tight text-foreground">NEXORA</span>
          </Link>
        </div>
        <div className="px-3">
          <WorkspaceSwitcher />
        </div>
        <SidebarNavigation onNavigate={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}
