import Link from "next/link";

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <header className="border-b border-border px-6 py-4">
        <Link href="/" className="flex w-fit items-center gap-2">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-accent text-sm font-bold text-accent-foreground">
            N
          </span>
          <span className="text-base font-semibold tracking-tight text-foreground">NEXORA</span>
        </Link>
      </header>
      <main className="flex flex-1 items-center justify-center px-4 py-10">
        <div className="w-full max-w-xl">{children}</div>
      </main>
    </div>
  );
}
