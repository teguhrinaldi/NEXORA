"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight, ArrowLeft, CheckCircle2, Mail, X } from "lucide-react";

import { OnboardingProgress } from "@/components/onboarding/onboarding-progress";
import { SelectableCard } from "@/components/onboarding/selectable-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { onboardingGoals, workspaceTypes, preferredTools } from "@/data/onboarding";
import { useToast } from "@/hooks/use-toast";

const TOTAL_STEPS = 5;

export function OnboardingFlow() {
  const [step, setStep] = React.useState(0);
  const [goal, setGoal] = React.useState<string | null>(null);
  const [workspaceType, setWorkspaceType] = React.useState<string | null>(null);
  const [tools, setTools] = React.useState<string[]>([]);
  const [inviteEmails, setInviteEmails] = React.useState<string[]>([]);
  const [inviteDraft, setInviteDraft] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const router = useRouter();
  const { toast } = useToast();

  function toggleTool(id: string) {
    setTools((prev) => (prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]));
  }

  function addInvite() {
    const trimmed = inviteDraft.trim();
    if (trimmed && !inviteEmails.includes(trimmed)) {
      setInviteEmails((prev) => [...prev, trimmed]);
    }
    setInviteDraft("");
  }

  async function finishSetup() {
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast("Workspace ready", { description: "Welcome to NEXORA." });
    router.push("/app/overview");
  }

  const canContinue = step === 1 ? !!goal : step === 2 ? !!workspaceType : true;

  return (
    <div>
      <OnboardingProgress step={step} totalSteps={TOTAL_STEPS} />

      {step === 0 && (
        <div className="flex flex-col items-center gap-5 text-center">
          <span className="flex size-14 items-center justify-center rounded-full bg-accent/15 text-accent">
            <Sparkles className="size-7" />
          </span>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">Welcome to NEXORA</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Let&apos;s set up your workspace. This will only take a minute.
            </p>
          </div>
          <Button onClick={() => setStep(1)} className="mt-2 gap-2">
            Get started
            <ArrowRight className="size-4" />
          </Button>
        </div>
      )}

      {step === 1 && (
        <div className="flex flex-col gap-5">
          <div>
            <h2 className="text-xl font-semibold text-foreground">What&apos;s your primary goal?</h2>
            <p className="mt-1 text-sm text-muted-foreground">This helps us tailor your workspace.</p>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2" role="radiogroup" aria-label="Primary goal">
            {onboardingGoals.map((item) => (
              <SelectableCard
                key={item.id}
                label={item.label}
                description={item.description}
                icon={item.icon}
                selected={goal === item.id}
                onSelect={() => setGoal(item.id)}
              />
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col gap-5">
          <div>
            <h2 className="text-xl font-semibold text-foreground">What type of workspace is this?</h2>
            <p className="mt-1 text-sm text-muted-foreground">We&apos;ll configure defaults that fit your team size.</p>
          </div>
          <div className="flex flex-col gap-3" role="radiogroup" aria-label="Workspace type">
            {workspaceTypes.map((item) => (
              <SelectableCard
                key={item.id}
                label={item.label}
                description={item.description}
                selected={workspaceType === item.id}
                onSelect={() => setWorkspaceType(item.id)}
              />
            ))}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col gap-5">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Which tools will you use most?</h2>
            <p className="mt-1 text-sm text-muted-foreground">Select as many as you&apos;d like. You can change this anytime.</p>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2" role="group" aria-label="Preferred tools">
            {preferredTools.map((item) => (
              <SelectableCard
                key={item.id}
                label={item.label}
                selected={tools.includes(item.id)}
                onSelect={() => toggleTool(item.id)}
                multiSelect
              />
            ))}
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="flex flex-col gap-5">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Invite your team</h2>
            <p className="mt-1 text-sm text-muted-foreground">Optional — you can always invite teammates later.</p>
          </div>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
              <Input
                value={inviteDraft}
                onChange={(event) => setInviteDraft(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    addInvite();
                  }
                }}
                placeholder="teammate@company.com"
                aria-label="Teammate email"
                className="pl-9"
              />
            </div>
            <Button type="button" variant="secondary" onClick={addInvite}>
              Add
            </Button>
          </div>
          {inviteEmails.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {inviteEmails.map((email) => (
                <Badge key={email} variant="outline" className="gap-1.5">
                  {email}
                  <button
                    type="button"
                    onClick={() => setInviteEmails((prev) => prev.filter((e) => e !== email))}
                    aria-label={`Remove ${email}`}
                  >
                    <X className="size-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>
      )}

      {step === 5 && (
        <div className="flex flex-col items-center gap-5 text-center">
          <span className="flex size-14 items-center justify-center rounded-full bg-success/15 text-success">
            <CheckCircle2 className="size-7" />
          </span>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">You&apos;re all set</h1>
            <p className="mt-2 text-sm text-muted-foreground">Your workspace has been configured and is ready to use.</p>
          </div>
          <Button onClick={finishSetup} loading={submitting} className="mt-2 gap-2">
            Enter workspace
            <ArrowRight className="size-4" />
          </Button>
        </div>
      )}

      {step > 0 && step < 5 && (
        <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
          <Button variant="ghost" onClick={() => setStep((s) => s - 1)} className="gap-2">
            <ArrowLeft className="size-4" />
            Back
          </Button>
          <div className="flex items-center gap-2">
            {step === 4 && (
              <Button variant="ghost" onClick={() => setStep(5)}>
                Skip
              </Button>
            )}
            <Button onClick={() => setStep((s) => s + 1)} disabled={!canContinue} className="gap-2">
              Continue
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
