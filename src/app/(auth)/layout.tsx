import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-dvh grid-cols-1 lg:grid-cols-2">
      <div className="flex flex-col justify-between p-8 lg:p-12">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-accent text-sm font-bold text-accent-foreground">
            N
          </span>
          <span className="text-base font-semibold tracking-tight text-foreground">NEXORA</span>
        </Link>

        <div className="mx-auto w-full max-w-sm py-12">{children}</div>

        <p className="text-center text-xs text-muted-foreground lg:text-left">
          © {new Date().getFullYear()} NEXORA. All rights reserved.
        </p>
      </div>

      <div className="relative hidden overflow-hidden border-l border-border bg-surface lg:flex lg:flex-col lg:justify-center lg:p-16">
        <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: "radial-gradient(var(--color-border-strong) 1px, transparent 1px)", backgroundSize: "24px 24px" }} aria-hidden="true" />
        <div className="relative flex flex-col gap-6">
          <span className="flex size-12 items-center justify-center rounded-lg bg-accent/15 text-accent">
            <Sparkles className="size-6" aria-hidden="true" />
          </span>
          <blockquote className="text-2xl font-medium leading-snug tracking-tight text-foreground">
            &quot;NEXORA replaced four separate tools. Our team drafts, reviews, and ships in one place now.&quot;
          </blockquote>
          <div>
            <p className="text-sm font-medium text-foreground">Priya Nair</p>
            <p className="text-sm text-muted-foreground">Head of Product, Northlight Studio</p>
          </div>
        </div>
      </div>
    </div>
  );
}
