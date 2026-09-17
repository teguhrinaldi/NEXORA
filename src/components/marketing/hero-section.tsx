import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HeroPreview } from "@/components/marketing/hero-preview";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-16 sm:px-6 sm:pt-24" id="product">
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <Badge variant="accent" className="mb-5">
          Now with Automations
        </Badge>
        <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Your intelligent workspace.
        </h1>
        <p className="mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
          Create, organize, and automate your work with a beautifully structured AI workspace built for modern teams.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button size="lg" asChild className="gap-2">
            <Link href="/register">
              Start exploring
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/app/overview">View workspace</Link>
          </Button>
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-5xl">
        <HeroPreview />
      </div>
    </section>
  );
}
