"use client";

import * as React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, ArrowLeft } from "lucide-react";

import { forgotPasswordSchema, resetPasswordSchema, type ForgotPasswordValues, type ResetPasswordValues } from "@/lib/validators";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

type Step = "request" | "sent" | "reset" | "done";

export function ForgotPasswordForm() {
  const [step, setStep] = React.useState<Step>("request");
  const [email, setEmail] = React.useState("");
  const { toast } = useToast();

  const requestForm = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const resetForm = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  async function onRequestSubmit(values: ForgotPasswordValues) {
    await new Promise((resolve) => setTimeout(resolve, 800));
    setEmail(values.email);
    setStep("sent");
  }

  async function onResetSubmit() {
    await new Promise((resolve) => setTimeout(resolve, 800));
    toast("Password reset", { description: "You can now sign in with your new password." });
    setStep("done");
  }

  if (step === "sent") {
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <span className="flex size-12 items-center justify-center rounded-full bg-accent/15 text-accent">
          <CheckCircle2 className="size-6" />
        </span>
        <div>
          <h1 className="text-xl font-semibold text-foreground">Check your email</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            We sent a reset link to <span className="text-foreground">{email}</span>.
          </p>
        </div>
        <Button variant="secondary" onClick={() => setStep("reset")} className="mt-2">
          I have a reset code
        </Button>
        <Link href="/login" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-3.5" />
          Back to sign in
        </Link>
      </div>
    );
  }

  if (step === "reset") {
    return (
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Set a new password</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">Choose a new password for your account.</p>
        </div>
        <form onSubmit={resetForm.handleSubmit(onResetSubmit)} className="flex flex-col gap-4" noValidate>
          <FormField label="New password" htmlFor="reset-password" error={resetForm.formState.errors.password?.message} required>
            <Input {...resetForm.register("password")} type="password" autoComplete="new-password" />
          </FormField>
          <FormField
            label="Confirm new password"
            htmlFor="reset-confirm-password"
            error={resetForm.formState.errors.confirmPassword?.message}
            required
          >
            <Input {...resetForm.register("confirmPassword")} type="password" autoComplete="new-password" />
          </FormField>
          <Button type="submit" loading={resetForm.formState.isSubmitting} className="mt-2">
            Reset password
          </Button>
        </form>
      </div>
    );
  }

  if (step === "done") {
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <span className="flex size-12 items-center justify-center rounded-full bg-success/15 text-success">
          <CheckCircle2 className="size-6" />
        </span>
        <div>
          <h1 className="text-xl font-semibold text-foreground">Password reset</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">Your password has been updated successfully.</p>
        </div>
        <Button asChild className="mt-2">
          <Link href="/login">Back to sign in</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Forgot your password?</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">Enter your email and we&apos;ll send you a reset link.</p>
      </div>
      <form onSubmit={requestForm.handleSubmit(onRequestSubmit)} className="flex flex-col gap-4" noValidate>
        <FormField label="Email address" htmlFor="forgot-email" error={requestForm.formState.errors.email?.message} required>
          <Input {...requestForm.register("email")} type="email" autoComplete="email" placeholder="you@company.com" />
        </FormField>
        <Button type="submit" loading={requestForm.formState.isSubmitting} className="mt-2">
          Send reset link
        </Button>
      </form>
      <Link href="/login" className="inline-flex items-center justify-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-3.5" />
        Back to sign in
      </Link>
    </div>
  );
}
