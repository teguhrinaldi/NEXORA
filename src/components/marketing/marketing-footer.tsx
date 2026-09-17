import Link from "next/link";

const footerLinks = {
  Product: [
    { label: "AI Studio", href: "/#ai-studio" },
    { label: "Automations", href: "/#automations" },
    { label: "Pricing", href: "/pricing" },
  ],
  Company: [
    { label: "About", href: "/#" },
    { label: "Careers", href: "/#" },
    { label: "Blog", href: "/#" },
  ],
  Resources: [
    { label: "Help Center", href: "/app/help" },
    { label: "Documentation", href: "/#" },
    { label: "Status", href: "/#" },
  ],
  Legal: [
    { label: "Privacy", href: "/#" },
    { label: "Terms", href: "/#" },
  ],
};

export function MarketingFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-accent text-sm font-bold text-accent-foreground">
                N
              </span>
              <span className="text-base font-semibold tracking-tight text-foreground">NEXORA</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">Your intelligent workspace.</p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</h3>
              <ul className="mt-3 flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} NEXORA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
