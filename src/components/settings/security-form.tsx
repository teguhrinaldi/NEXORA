"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Monitor, Smartphone } from "lucide-react";

import { securitySchema, type SecurityValues } from "@/lib/validators";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const sessions = [
  { id: "s1", device: "Windows · Chrome", location: "New York, US", current: true, icon: Monitor },
  { id: "s2", device: "iPhone · NEXORA app", location: "New York, US", current: false, icon: Smartphone },
];

export function SecurityForm() {
  const [showPasswords, setShowPasswords] = React.useState(false);
  const [twoFactor, setTwoFactor] = React.useState(false);
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SecurityValues>({
    resolver: zodResolver(securitySchema),
    defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
  });

  function onSubmit() {
    toast("Password updated", { description: "Use your new password next time you sign in." });
    reset();
  }

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Password</CardTitle>
          <CardDescription>Update your account password.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <FormField label="Current password" htmlFor="current-password" error={errors.currentPassword?.message} required>
              <div className="relative">
                <Input {...register("currentPassword")} type={showPasswords ? "text" : "password"} className="pr-10" />
                <button
                  type="button"
                  onClick={() => setShowPasswords((prev) => !prev)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={showPasswords ? "Hide passwords" : "Show passwords"}
                >
                  {showPasswords ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </FormField>
            <FormField label="New password" htmlFor="new-password" error={errors.newPassword?.message} required>
              <Input {...register("newPassword")} type={showPasswords ? "text" : "password"} />
            </FormField>
            <FormField label="Confirm new password" htmlFor="confirm-password" error={errors.confirmPassword?.message} required>
              <Input {...register("confirmPassword")} type={showPasswords ? "text" : "password"} />
            </FormField>
            <div>
              <Button type="submit" loading={isSubmitting}>
                Update password
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Two-factor authentication</CardTitle>
          <CardDescription>Add an extra layer of security to your account.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <Label htmlFor="two-factor">Require a verification code at sign-in</Label>
          <Switch
            id="two-factor"
            checked={twoFactor}
            onCheckedChange={(checked) => {
              setTwoFactor(checked);
              toast(checked ? "Two-factor authentication enabled" : "Two-factor authentication disabled");
            }}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Active sessions</CardTitle>
          <CardDescription>Devices currently signed in to your account.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col divide-y divide-border p-0">
          {sessions.map((session) => (
            <div key={session.id} className="flex items-center gap-3 px-5 py-3 first:pt-0 last:pb-0">
              <session.icon className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
              <div className="min-w-0 flex-1">
                <p className="text-sm text-foreground">
                  {session.device} {session.current && <span className="text-xs text-accent">(this device)</span>}
                </p>
                <p className="text-xs text-muted-foreground">{session.location}</p>
              </div>
              {!session.current && (
                <Button variant="outline" size="sm" onClick={() => toast("Session revoked")}>
                  Revoke
                </Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
