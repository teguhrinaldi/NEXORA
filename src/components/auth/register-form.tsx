"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";

import { registerSchema, type RegisterValues } from "@/lib/validators";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export function RegisterForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  async function onSubmit() {
    await new Promise((resolve) => setTimeout(resolve, 900));
    toast("Account created", { description: "Let's set up your workspace." });
    router.push("/onboarding");
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Create your account</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">Start your intelligent workspace in minutes.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
        <FormField label="Full name" htmlFor="register-name" error={errors.name?.message} required>
          <Input {...register("name")} autoComplete="name" placeholder="Jordan Lee" />
        </FormField>

        <FormField label="Email address" htmlFor="register-email" error={errors.email?.message} required>
          <Input {...register("email")} type="email" autoComplete="email" placeholder="you@company.com" />
        </FormField>

        <FormField label="Password" htmlFor="register-password" error={errors.password?.message} hint="At least 8 characters" required>
          <div className="relative">
            <Input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </FormField>

        <FormField label="Confirm password" htmlFor="register-confirm-password" error={errors.confirmPassword?.message} required>
          <Input {...register("confirmPassword")} type={showPassword ? "text" : "password"} autoComplete="new-password" />
        </FormField>

        <Button type="submit" loading={isSubmitting} className="mt-2">
          Create account
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-accent hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
