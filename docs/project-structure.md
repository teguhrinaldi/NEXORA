# Project structure

```text
src/
  app/
    (marketing)/          Public site: homepage, pricing
    (auth)/                Login, register, forgot/reset password
    (onboarding)/           Post-signup setup flow
    (dashboard)/app/        The authenticated application (all /app/* routes)
    layout.tsx              Root layout: fonts, metadata, global providers
    globals.css              Design tokens and base styles
  components/
    ui/                    Design-system primitives (Button, Card, Dialog, Select, …)
    layout/                App shell: sidebar, topbar, page header, dashboard shell
    navigation/             Command palette
    marketing/               Homepage and pricing page sections
    dashboard/               Stat cards, activity feed, dashboard variant views
    ai/                     AI Studio composer, response panel, history, mode config
    chat/                    Conversation list and chat thread
    prompts/                Prompt cards, editor, "use in Studio" flow
    documents/               Document list and editor
    automations/             Workflow canvas, node cards, templates
    analytics/                Usage charts and history table
    billing/                  Plan cards
    team/                     Invite dialog
    api-keys/                 Key creation dialog
    notifications/             Notification list
    help/                      Help center
    settings/                  Settings forms (profile, workspace, security, notifications)
    onboarding/                Onboarding steps and progress indicator
    auth/                      Login, register, forgot-password forms
    history/                   Unified activity timeline
  data/                    Centralized mock data, one file per domain
  types/                   Shared TypeScript types, one file per domain
  lib/
    ai/mock-ai-service.ts   The local AI response generator (see State management)
    utils.ts                 `cn()` class-merging helper
    formatters.ts             Date, number, and currency formatting
    validators.ts              Zod schemas for every form in the app
    constants.ts                App-wide constants
    id.ts                       Local ID generation for created records
  hooks/                   `use-toast`, `use-mobile`, `use-local-storage`, `use-command-palette`
  config/                  `site.ts` (brand/metadata) and `navigation.ts` (sidebar, settings, marketing nav)
docs/                      This documentation
```

## Route groups

The `app/` directory uses four route groups, each with its own layout, so the marketing site, auth screens, onboarding flow, and application shell never share chrome:

- `(marketing)` — public homepage and `/pricing`, wrapped in `MarketingNavbar` / `MarketingFooter`.
- `(auth)` — `/login`, `/register`, `/forgot-password`, wrapped in a centered split layout.
- `(onboarding)` — `/onboarding`, wrapped in a minimal branded layout.
- `(dashboard)/app` — every `/app/*` route, wrapped in `DashboardShell` (sidebar + topbar).

Route groups (the parenthesized folder names) do not appear in the URL — `(dashboard)/app/overview/page.tsx` serves `/app/overview`.

## Naming conventions

- Components: `PascalCase` (`DashboardShell`, `PromptCard`).
- Files: `kebab-case` (`dashboard-shell.tsx`, `prompt-card.tsx`).
- Hooks: `camelCase` starting with `use` (`useLocalStorage`).
- Types: singular, `PascalCase` (`Prompt`, not `Prompts`).
- Route folders: `kebab-case`, matching the URL segment (`ai-studio`, `api-keys`).
