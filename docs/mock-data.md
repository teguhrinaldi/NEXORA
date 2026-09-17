# Mock data

Every dataset in NEXORA is centralized under `src/data/`, one file per domain, each fully typed against a corresponding file in `src/types/`. Nothing is hardcoded inline in a page or component.

| File | Contents |
| --- | --- |
| `data/prompts.ts` | Prompt library entries and categories |
| `data/documents.ts` | Documents and folders |
| `data/conversations.ts` | Chat conversations and messages |
| `data/automations.ts` | Automations, their steps, run history, and templates |
| `data/analytics.ts` | Usage analytics: daily/weekly series, model distribution, top prompts, usage history |
| `data/billing.ts` | Plans, current subscription, invoices, payment methods |
| `data/team.ts` | Team members, pending invitations, team activity |
| `data/notifications.ts` | Notifications |
| `data/help.ts` | Help articles and categories |
| `data/api-keys.ts` | API keys |
| `data/dashboard.ts` | Dashboard variant metadata and per-variant stat cards |
| `data/onboarding.ts` | Onboarding goals, workspace types, and tool options |
| `data/faq.ts` | Marketing FAQ entries |

## Editing data

Each file exports plain, typed arrays or objects — edit them directly:

```ts
// src/data/prompts.ts
export const prompts: Prompt[] = [
  {
    id: "prm-001",
    title: "Product launch announcement",
    // ...
  },
];
```

Adding a new item just means adding a new object to the array with a unique `id`. TypeScript will flag any missing or mistyped fields against the corresponding type in `src/types/`.

## Runtime data vs. seed data

The exported arrays in `src/data/` are **seed data** — the values the app starts with. Several workspaces (Documents, Prompts, Automations, Team, API Keys, Chat, Notifications) layer `useLocalStorage` on top of this seed data, so user actions (creating, editing, deleting) persist to the browser's `localStorage` for the duration of that browser's session, while the original seed file is never mutated. Clearing site data resets the app back to the seed data. See [State management](state-management.md) for details.
