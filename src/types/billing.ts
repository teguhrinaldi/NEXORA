export type PlanId = "free" | "starter" | "pro" | "team";

export interface Plan {
  id: PlanId;
  name: string;
  price: number;
  billingCycle: "month" | "year";
  description: string;
  creditLimit: number;
  features: string[];
  highlighted?: boolean;
}

export interface Invoice {
  id: string;
  number: string;
  amount: number;
  status: "paid" | "pending" | "failed";
  issuedAt: string;
  planName: string;
}

export interface PaymentMethod {
  id: string;
  brand: string;
  last4: string;
  expiresAt: string;
  isDefault: boolean;
}
