import { cn } from "@/lib/utils";

interface FeatureShowcaseProps {
  id?: string;
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  reverse?: boolean;
  children: React.ReactNode;
}

export function FeatureShowcase({ id, eyebrow, title, description, bullets, reverse, children }: FeatureShowcaseProps) {
  return (
    <section id={id} className="px-4 py-16 sm:px-6">
      <div
        className={cn(
          "mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16",
          reverse && "lg:[&>*:first-child]:order-2"
        )}
      >
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-accent">{eyebrow}</span>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{title}</h2>
          <p className="mt-4 text-muted-foreground">{description}</p>
          <ul className="mt-6 flex flex-col gap-3">
            {bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-2.5 text-sm text-foreground">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                {bullet}
              </li>
            ))}
          </ul>
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}
