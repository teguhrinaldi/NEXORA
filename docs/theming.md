# Theming

NEXORA uses Tailwind CSS v4's CSS-first configuration. There is no `tailwind.config.js` — every token is defined as a CSS custom property in `src/app/globals.css` and exposed to Tailwind through an `@theme` block.

## Color tokens

Raw brand colors are defined once in `:root`:

```css
:root {
  --color-obsidian: #0d0e0c;
  --color-surface: #151713;
  --color-ivory: #f2f0e8;
  --color-lime: #c8f36a;
  /* … */
}
```

Semantic tokens (the ones components actually use) reference the raw colors:

```css
:root {
  --background: var(--color-obsidian);
  --foreground: var(--color-ivory);
  --accent: var(--color-lime);
  /* … */
}
```

To change the accent color, edit `--color-lime` (and `--accent` / `--color-accent` for light mode) — every component that uses `bg-accent`, `text-accent`, or `border-accent` updates automatically.

## Dark and light mode

NEXORA is dark-first. Light mode overrides the semantic tokens under `[data-theme="light"]`:

```css
[data-theme="light"] {
  --background: #f5f5f0;
  --foreground: #171914;
  /* … */
}
```

Theme switching is handled by `next-themes` (`src/components/theme-provider.tsx`), which toggles the `data-theme` attribute on `<html>`. The toggle itself lives in **Settings → Profile → Preferences** (`src/components/settings/preferences-card.tsx`).

## Typography

The primary typeface is Plus Jakarta Sans, loaded via `next/font/google` in `src/app/layout.tsx` and exposed as the `--font-jakarta` variable, which feeds the `--font-sans` token used throughout the app. To change the typeface, swap the `next/font/google` import and update the CSS variable name consistently in both files.

## Spacing and radii

Border radius tokens (`--radius-sm` through `--radius-xl`) are defined in `globals.css` and mapped into Tailwind's `rounded-*` utilities via the `@theme` block. Spacing itself uses Tailwind's default scale — there is no custom spacing scale to maintain.

## Motion and reduced motion

Two custom keyframe-based utilities, `animate-fade-in` and `animate-rise-in`, are defined in the `@theme` block and used for dialogs, dropdowns, and the command palette.

Reduced motion is supported at two levels:

1. `@media (prefers-reduced-motion: reduce)` in `globals.css` shortens all animation and transition durations globally.
2. A manual **Reduced motion** toggle in Settings → Profile sets `data-reduced-motion="true"` on `<html>` (via `src/components/settings/preferences-card.tsx`), which the same stylesheet rule also respects — so users who want less motion don't have to change their OS setting.

## Compact mode

The **Compact mode** toggle (same Preferences card) sets `data-compact="true"` on `<html>`, which a small set of rules in `globals.css` uses to tighten padding across the app.
