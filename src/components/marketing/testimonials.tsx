const testimonials = [
  {
    quote: "NEXORA replaced four separate tools. Our team drafts, reviews, and ships in one place now.",
    name: "Priya Nair",
    role: "Head of Product, Northlight Studio",
  },
  {
    quote: "The automation builder alone paid for itself in the first week. Reports that took hours now run themselves.",
    name: "Theo Park",
    role: "Operations Lead, Fieldstone",
  },
  {
    quote: "It's the first AI tool that actually feels considered. Nothing about it feels bolted on.",
    name: "Diego Alvarez",
    role: "Design Director, Anchor Collective",
  },
];

export function Testimonials() {
  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Trusted by teams that ship</h2>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {testimonials.map((testimonial) => (
            <figure key={testimonial.name} className="flex flex-col justify-between rounded-lg border border-border bg-surface p-6">
              <blockquote className="text-sm leading-relaxed text-foreground">&quot;{testimonial.quote}&quot;</blockquote>
              <figcaption className="mt-6">
                <p className="text-sm font-medium text-foreground">{testimonial.name}</p>
                <p className="text-xs text-muted-foreground">{testimonial.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
