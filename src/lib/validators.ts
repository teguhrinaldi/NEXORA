import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});
export type LoginValues = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    name: z.string().min(2, "Enter your full name"),
    email: z.string().min(1, "Email is required").email("Enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export type RegisterValues = z.infer<typeof registerSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email address"),
});
export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

export const profileSchema = z.object({
  name: z.string().min(2, "Enter your full name"),
  email: z.string().min(1, "Email is required").email("Enter a valid email address"),
  role: z.string().optional(),
  timezone: z.string().min(1, "Select a timezone"),
  language: z.string().min(1, "Select a language"),
});
export type ProfileValues = z.infer<typeof profileSchema>;

export const workspaceSchema = z.object({
  workspaceName: z.string().min(2, "Workspace name is required"),
  workspaceUrl: z
    .string()
    .min(2, "Workspace URL is required")
    .regex(/^[a-z0-9-]+$/, "Use lowercase letters, numbers, and hyphens only"),
  description: z.string().max(280, "Keep it under 280 characters").optional(),
});
export type WorkspaceValues = z.infer<typeof workspaceSchema>;

export const securitySchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export type SecurityValues = z.infer<typeof securitySchema>;

export const inviteMemberSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email address"),
  role: z.enum(["admin", "editor", "viewer"]),
});
export type InviteMemberValues = z.infer<typeof inviteMemberSchema>;

export const createPromptSchema = z.object({
  title: z.string().min(2, "Title is required"),
  description: z.string().min(2, "Description is required"),
  category: z.enum([
    "marketing",
    "writing",
    "productivity",
    "research",
    "product",
    "customer-support",
    "strategy",
    "personal",
  ]),
  content: z.string().min(10, "Prompt content should be at least 10 characters"),
});
export type CreatePromptValues = z.infer<typeof createPromptSchema>;

export const createApiKeySchema = z.object({
  name: z.string().min(2, "Name is required"),
  permission: z.enum(["read-only", "read-write", "full-access"]),
});
export type CreateApiKeyValues = z.infer<typeof createApiKeySchema>;

export const createAutomationSchema = z.object({
  name: z.string().min(2, "Workflow name is required"),
  description: z.string().min(2, "Description is required"),
});
export type CreateAutomationValues = z.infer<typeof createAutomationSchema>;
