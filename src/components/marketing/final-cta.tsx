import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function FinalCta() {
  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto flex max-w-4xl flex-col items-center rounded-2xl border border-border bg-surface px-6 py-16 text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Work beyond ordinary.
        </h2>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Start exploring NEXORA today — no credit card required.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button size="lg" asChild className="gap-2">
            <Link href="/register">
              Start exploring
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/pricing">View pricing</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
