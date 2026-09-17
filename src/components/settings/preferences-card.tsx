"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useToast } from "@/hooks/use-toast";

export function PreferencesCard() {
  const { theme, setTheme } = useTheme();
  const [compactMode, setCompactMode] = useLocalStorage("nexora:compact-mode", false);
  const [reducedMotion, setReducedMotion] = useLocalStorage("nexora:reduced-motion", false);
  const { toast } = useToast();

  React.useEffect(() => {
    document.documentElement.dataset.reducedMotion = reducedMotion ? "true" : "false";
  }, [reducedMotion]);

  React.useEffect(() => {
    document.documentElement.dataset.compact = compactMode ? "true" : "false";
  }, [compactMode]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Preferences</CardTitle>
        <CardDescription>Control appearance and interaction settings for your account.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <Label htmlFor="appearance-select">Appearance</Label>
            <p className="text-xs text-muted-foreground">Choose how NEXORA looks on this device.</p>
          </div>
          <Select
            value={theme}
            onValueChange={(value) => {
              setTheme(value);
              toast("Appearance updated");
            }}
          >
            <SelectTrigger id="appearance-select" className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="light">Light</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div>
            <Label htmlFor="compact-mode">Compact mode</Label>
            <p className="text-xs text-muted-foreground">Reduce spacing to fit more on screen.</p>
          </div>
          <Switch id="compact-mode" checked={compactMode} onCheckedChange={setCompactMode} />
        </div>

        <div className="flex items-center justify-between gap-4">
          <div>
            <Label htmlFor="reduced-motion">Reduced motion</Label>
            <p className="text-xs text-muted-foreground">Minimize animations and transitions.</p>
          </div>
          <Switch id="reduced-motion" checked={reducedMotion} onCheckedChange={setReducedMotion} />
        </div>
      </CardContent>
    </Card>
  );
}
