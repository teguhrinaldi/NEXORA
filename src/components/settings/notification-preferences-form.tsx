"use client";

import * as React from "react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

interface PreferenceRow {
  id: string;
  label: string;
  description: string;
  email: boolean;
  push: boolean;
}

const initialRows: PreferenceRow[] = [
  { id: "product", label: "Product updates", description: "New features and improvements", email: true, push: false },
  { id: "automation", label: "Automation results", description: "When a workflow completes or fails", email: true, push: true },
  { id: "team", label: "Team activity", description: "Invitations, role changes, and member updates", email: true, push: true },
  { id: "billing", label: "Billing", description: "Invoices and payment updates", email: true, push: false },
  { id: "security", label: "Security alerts", description: "New sign-ins and account changes", email: true, push: true },
];

export function NotificationPreferencesForm() {
  const [rows, setRows] = React.useState(initialRows);
  const { toast } = useToast();

  function toggle(id: string, channel: "email" | "push") {
    setRows((prev) => prev.map((row) => (row.id === id ? { ...row, [channel]: !row[channel] } : row)));
    toast("Notification preferences updated");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification preferences</CardTitle>
        <CardDescription>Choose how you want to be notified for each category.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-[1fr_auto_auto] items-center gap-y-4 text-sm">
          <span />
          <span className="pl-4 text-xs font-medium text-muted-foreground">Email</span>
          <span className="pl-4 text-xs font-medium text-muted-foreground">Push</span>

          {rows.map((row, index) => (
            <React.Fragment key={row.id}>
              {index > 0 && <Separator className="col-span-3 my-1" />}
              <div>
                <Label htmlFor={`${row.id}-email`}>{row.label}</Label>
                <p className="text-xs text-muted-foreground">{row.description}</p>
              </div>
              <div className="pl-4">
                <Switch id={`${row.id}-email`} checked={row.email} onCheckedChange={() => toggle(row.id, "email")} />
              </div>
              <div className="pl-4">
                <Switch id={`${row.id}-push`} checked={row.push} onCheckedChange={() => toggle(row.id, "push")} />
              </div>
            </React.Fragment>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
