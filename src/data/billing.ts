import type { Invoice, PaymentMethod, Plan } from "@/types/billing";

export const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    billingCycle: "month",
    description: "Explore NEXORA with a small monthly credit allowance.",
    creditLimit: 500,
    features: ["500 AI credits / month", "1 workspace", "Prompt library access", "Community support"],
  },
  {
    id: "starter",
    name: "Starter",
    price: 19,
    billingCycle: "month",
    description: "For individuals building momentum with AI-assisted work.",
    creditLimit: 5000,
    features: ["5,000 AI credits / month", "3 workspaces", "Automation builder", "Email support"],
  },
  {
    id: "pro",
    name: "Pro",
    price: 49,
    billingCycle: "month",
    description: "For power users who create, automate, and analyze daily.",
    creditLimit: 25000,
    features: [
      "25,000 AI credits / month",
      "Unlimited workspaces",
      "Advanced analytics",
      "Priority support",
      "API access",
    ],
    highlighted: true,
  },
  {
    id: "team",
    name: "Team",
    price: 99,
    billingCycle: "month",
    description: "For teams collaborating across documents, prompts, and workflows.",
    creditLimit: 100000,
    features: [
      "100,000 shared AI credits / month",
      "Unlimited members",
      "Team roles & permissions",
      "Shared prompt & document libraries",
      "Dedicated support",
    ],
  },
];

export const currentPlan = {
  planId: "pro" as const,
  billingCycle: "month" as const,
  renewsOn: "2026-10-01T00:00:00.000Z",
  creditsUsed: 20180,
  creditsTotal: 25000,
};

export const invoices: Invoice[] = [
  { id: "inv-2026-09", number: "INV-2026-0912", amount: 49, status: "paid", issuedAt: "2026-09-01T00:00:00.000Z", planName: "Pro" },
  { id: "inv-2026-08", number: "INV-2026-0811", amount: 49, status: "paid", issuedAt: "2026-08-01T00:00:00.000Z", planName: "Pro" },
  { id: "inv-2026-07", number: "INV-2026-0710", amount: 49, status: "paid", issuedAt: "2026-07-01T00:00:00.000Z", planName: "Pro" },
  { id: "inv-2026-06", number: "INV-2026-0609", amount: 19, status: "paid", issuedAt: "2026-06-01T00:00:00.000Z", planName: "Starter" },
];

export const paymentMethods: PaymentMethod[] = [
  { id: "pm-001", brand: "Visa", last4: "4242", expiresAt: "2028-04-01", isDefault: true },
];
