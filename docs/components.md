# Components

## Design-system primitives (`src/components/ui/`)

These are the low-level building blocks — `Button`, `Card`, `Input`, `Textarea`, `Select`, `Dialog`, `Sheet`, `DropdownMenu`, `Tabs`, `Tooltip`, `Avatar`, `Badge`, `Switch`, `Progress`, `Accordion`, `Checkbox`, `RadioGroup`, `Skeleton`, `EmptyState`, `FormField`, and the Sonner-based `Toaster`.

Interactive primitives (dialog, dropdown, tabs, tooltip, select, accordion, switch, checkbox, radio group, avatar, separator) are built on [Radix UI](https://www.radix-ui.com/primitives) for accessible keyboard navigation, focus management, and ARIA semantics out of the box. Styling is applied with Tailwind classes via the `cn()` helper (`src/lib/utils.ts`), which merges `clsx` and `tailwind-merge`.

Variant-based components (`Button`, `Badge`) use `class-variance-authority` to define their `variant` and `size` props — add a new variant by extending the `cva()` call in the component file.

## Feature components

Each product area has its own folder under `src/components/` (`ai/`, `chat/`, `documents/`, `prompts/`, `automations/`, `analytics/`, `billing/`, `team/`, `api-keys/`, `notifications/`, `help/`, `settings/`, `onboarding/`, `auth/`, `history/`, `marketing/`). Within each folder:

- A top-level `*-workspace.tsx` component owns local state (usually backed by `useLocalStorage`) and composes smaller, presentational children.
- Dialogs and forms are separate components (e.g. `prompt-editor-dialog.tsx`, `invite-member-dialog.tsx`) so they can be reused or tested independently.

## Layout components (`src/components/layout/`)

`DashboardShell` composes `Sidebar`, `MobileSidebar`, and `Topbar` into the authenticated app frame. `PageHeader` provides the consistent title/description/actions row used at the top of every `/app/*` page.

## Conventions

- **Server components by default.** Only components that need interactivity, browser APIs, or React state are marked `"use client"`.
- **No inline magic numbers for color or spacing** — use the design tokens (`bg-accent`, `text-muted-foreground`, `rounded-lg`, etc.) rather than arbitrary values, except where a token genuinely doesn't exist (a few marketing mockups use `var(--color-lime)` directly for chart fills, since Recharts requires literal color strings, not Tailwind classes).
- **Every dialog, dropdown, and destructive action has a real result** — a state update, a toast, or both. There are no inert buttons.
- **Accessible by construction** — icon-only buttons carry `aria-label`; form fields are wired to their errors via `aria-describedby` through the shared `FormField` component; all interactive elements are reachable and operable by keyboard.
