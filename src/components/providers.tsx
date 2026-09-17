"use client";

import * as React from "react";

import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { CommandPaletteProvider } from "@/hooks/use-command-palette";
import { CommandPalette } from "@/components/navigation/command-palette";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <TooltipProvider delayDuration={200}>
        <CommandPaletteProvider>
          {children}
          <CommandPalette />
          <Toaster />
        </CommandPaletteProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}
