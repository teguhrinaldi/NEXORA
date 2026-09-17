"use client";

import * as React from "react";
import { CreditCard, Download, FileX2 } from "lucide-react";

import type { Plan, PlanId } from "@/types/billing";
import { PlanCard } from "@/components/billing/plan-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EmptyState } from "@/components/ui/empty-state";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { plans, currentPlan as seedCurrentPlan, invoices, paymentMethods } from "@/data/billing";
import { formatCurrency, formatDate, formatNumber, formatPercent } from "@/lib/formatters";
import { useToast } from "@/hooks/use-toast";

export function BillingWorkspace() {
  const [planId, setPlanId] = React.useState<PlanId>(seedCurrentPlan.planId);
  const [billingEmail, setBillingEmail] = React.useState("billing@northlight.co");
  const [switchTarget, setSwitchTarget] = React.useState<Plan | null>(null);
  const [cancelOpen, setCancelOpen] = React.useState(false);
  const { toast } = useToast();

  const plan = plans.find((p) => p.id === planId) ?? plans[0];
  const usagePercent = Math.round((seedCurrentPlan.creditsUsed / seedCurrentPlan.creditsTotal) * 100);

  function confirmSwitch() {
    if (!switchTarget) return;
    setPlanId(switchTarget.id);
    toast("Plan updated", { description: `You're now on the ${switchTarget.name} plan.` });
    setSwitchTarget(null);
  }

  function confirmCancel() {
    setPlanId("free");
    toast("Subscription canceled", { description: "You'll retain Pro features until the end of your billing period." });
    setCancelOpen(false);
  }

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle>Current plan</CardTitle>
          <Badge variant="accent">{plan.name}</Badge>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                {formatCurrency(plan.price)} / {plan.billingCycle} · Renews {formatDate(seedCurrentPlan.renewsOn)}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setCancelOpen(true)}>
                Cancel subscription
              </Button>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Credit usage</span>
              <span>
                {formatNumber(seedCurrentPlan.creditsUsed)} / {formatNumber(seedCurrentPlan.creditsTotal)} ({formatPercent(usagePercent)})
              </span>
            </div>
            <Progress value={usagePercent} className="mt-2" />
          </div>
        </CardContent>
      </Card>

      <div>
        <h3 className="mb-3 text-sm font-semibold text-foreground">Compare plans</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {plans.map((p) => (
            <PlanCard key={p.id} plan={p} currentPlanId={planId} onSelect={setSwitchTarget} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Payment method</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {paymentMethods.map((method) => (
              <div key={method.id} className="flex items-center gap-3 rounded-md border border-border bg-surface-soft p-3">
                <CreditCard className="size-5 text-muted-foreground" aria-hidden="true" />
                <div className="flex-1">
                  <p className="text-sm text-foreground">
                    {method.brand} •••• {method.last4}
                  </p>
                  <p className="text-xs text-muted-foreground">Expires {method.expiresAt}</p>
                </div>
                {method.isDefault && <Badge variant="outline">Default</Badge>}
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              className="w-fit"
              onClick={() => toast("Payment method", { description: "Updating your card requires a connected payment provider." })}
            >
              Update payment method
            </Button>

            <div className="flex flex-col gap-1.5 border-t border-border pt-4">
              <Label htmlFor="billing-email">Billing email</Label>
              <Input id="billing-email" value={billingEmail} onChange={(event) => setBillingEmail(event.target.value)} type="email" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle>Invoice history</CardTitle>
          </CardHeader>
          <CardContent>
            {invoices.length === 0 ? (
              <EmptyState icon={FileX2} title="No invoices yet" description="Your invoices will appear here after your first billing cycle." />
            ) : (
              <ul className="flex flex-col divide-y divide-border">
                {invoices.map((invoice) => (
                  <li key={invoice.id} className="flex items-center gap-3 py-2.5 text-sm">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-foreground">{invoice.number}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(invoice.issuedAt)} · {invoice.planName}</p>
                    </div>
                    <Badge variant={invoice.status === "paid" ? "success" : invoice.status === "pending" ? "warning" : "danger"}>
                      {invoice.status}
                    </Badge>
                    <span className="shrink-0 text-muted-foreground">{formatCurrency(invoice.amount)}</span>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label={`Download invoice ${invoice.number}`}
                      onClick={() => toast("Invoice downloaded", { description: `${invoice.number}.pdf` })}
                    >
                      <Download className="size-3.5" />
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog open={!!switchTarget} onOpenChange={(open) => !open && setSwitchTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Switch to {switchTarget?.name}?</DialogTitle>
            <DialogDescription>
              Your plan will change to {switchTarget?.name} at {switchTarget ? formatCurrency(switchTarget.price) : ""}/
              {switchTarget?.billingCycle}. The change takes effect immediately.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSwitchTarget(null)}>
              Cancel
            </Button>
            <Button onClick={confirmSwitch}>Confirm switch</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={cancelOpen} onOpenChange={setCancelOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel your subscription?</DialogTitle>
            <DialogDescription>
              You&apos;ll move to the Free plan at the end of your current billing period. You can resubscribe anytime.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCancelOpen(false)}>
              Keep subscription
            </Button>
            <Button variant="destructive" onClick={confirmCancel}>
              Cancel subscription
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
