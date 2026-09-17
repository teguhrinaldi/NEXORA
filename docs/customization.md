# Customization

## Brand name and metadata

Edit `src/config/site.ts`. This single file controls the product name, tagline, description, URL, and social metadata used across `<title>` tags, Open Graph tags, and the marketing footer.

```ts
export const siteConfig = {
  name: "NEXORA",
  tagline: "Your intelligent workspace.",
  description: "…",
  url: "https://nexora.app",
  // ...
};
```

The name "NEXORA" also appears directly in a handful of layout components (`Sidebar`, `MarketingNavbar`, `MarketingFooter`, the auth layout) as the wordmark next to the logo badge — search for `NEXORA` across `src/components` if you want to rename the product everywhere at once.

## Navigation

Edit `src/config/navigation.ts`:

- `sidebarNav` — the three sidebar groups (Workspace, Management, Support) and their items. Each item is `{ label, href, icon }`, where `icon` is any `lucide-react` icon component.
- `settingsNav` — the tabs shown across every `/app/settings/*` page.
- `marketingNav` — the links shown in the public site header.

Adding a new sidebar item automatically adds it to the command palette (`components/navigation/command-palette.tsx`), which reads from the same `sidebarNav` config.

## Dashboard variants

The five dashboard variants (Overview, Creator, Team, Automation, Analytics) are defined in `src/data/dashboard.ts` (`dashboardVariants`, plus a stats array per variant) and rendered by `src/components/dashboard/dashboard-view-switcher.tsx`, which maps each variant id to a view component in `src/components/dashboard/views/`.

To add a new variant:

1. Add its metadata to `dashboardVariants` in `src/data/dashboard.ts`.
2. Create a new view component in `src/components/dashboard/views/`.
3. Register it in the `viewComponents` map in `dashboard-view-switcher.tsx`.

## Sidebar behavior

`src/components/layout/sidebar.tsx` and `src/components/layout/dashboard-shell.tsx` control the collapse behavior (persisted to `localStorage` under `nexora:sidebar-collapsed`) and the responsive breakpoint at which the sidebar becomes a mobile drawer (the `md` breakpoint, 768px).

## Content

Marketing copy lives directly in the section components under `src/components/marketing/`. Each section (hero, feature grid, feature showcases, testimonials, pricing preview, FAQ, final CTA) is a separate, independently editable component composed in `src/app/(marketing)/page.tsx`.
