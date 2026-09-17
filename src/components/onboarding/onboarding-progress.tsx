import { cn } from "@/lib/utils";

export function OnboardingProgress({ step, totalSteps }: { step: number; totalSteps: number }) {
  return (
    <div className="mb-8 flex items-center gap-2" role="progressbar" aria-valuenow={step + 1} aria-valuemin={1} aria-valuemax={totalSteps}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <span
          key={index}
          className={cn("h-1.5 flex-1 rounded-full transition-colors", index <= step ? "bg-accent" : "bg-surface-soft")}
        />
      ))}
    </div>
  );
}
