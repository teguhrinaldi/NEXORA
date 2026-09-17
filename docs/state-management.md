# State management

NEXORA has no backend, so "state management" means: where does data live between renders, and between page visits, within a single browser?

## Local component state

Most UI state (which dialog is open, which tab is active, form field values) is plain React `useState`, scoped to the component that needs it.

## Persisted state: `useLocalStorage`

`src/hooks/use-local-storage.ts` is a small hook with the same signature as `useState`, backed by the browser's `localStorage`:

```ts
const [documents, setDocuments] = useLocalStorage<Document[]>("nexora:documents", seedDocuments);
```

- On mount, it reads the given key from `localStorage`; if nothing is stored yet, it falls back to the seed value you pass in (this is why the initial server-rendered HTML and the first client render always match — the stored value is only applied after mount, avoiding a hydration mismatch).
- Every call to the setter persists the new value back to `localStorage` under that key.

This is used for every workspace that needs to "remember" user edits across navigation: documents, prompts, automations, conversations, team members, API keys, notifications, sidebar collapse state, and user preferences (theme, compact mode, reduced motion).

Because the key is a plain string (e.g. `"nexora:documents"`), any two components that use the same key share the same persisted data — this is how, for example, saving an AI Studio result "to Documents" makes it show up on the Documents page: both read and write the `nexora:documents` key.

## The mock AI service

`src/lib/ai/mock-ai-service.ts` exports `generateAiResponse()` and `regenerateAiResponse()`, both `async` functions that simulate a network delay (`AI_RESPONSE_DELAY_MS` in `src/lib/constants.ts`) and return a realistic, mode-aware response built from a small template per AI Studio mode.

This is the **one function you need to replace** to connect a real AI provider. Its signature is intentionally minimal:

```ts
async function generateAiResponse(request: AiStudioRequest): Promise<AiStudioResult>
```

Every caller (AI Studio, Chat, the Documents AI actions menu) already awaits this function and handles its loading and result states, so swapping the implementation for a real API call requires no changes anywhere else.

## Other local service functions

Several workspace components define local handler functions that stand in for what would be API calls — creating a document, inviting a team member, generating an API key, switching a billing plan, and so on. Each one:

1. Updates local state (via `useLocalStorage` or `useState`).
2. Shows a toast confirming what happened (via `sonner`, wrapped by `src/hooks/use-toast.ts`).

These functions live directly inside their workspace component (e.g. `handleInvite` in `team-workspace.tsx`) rather than behind a shared abstraction, since each one's "backend equivalent" will eventually be a distinct API endpoint specific to that feature.

## Future integration points

The codebase is structured so each of these can be added without a rewrite:

- **Authentication.** The forms in `src/components/auth/` (`login-form.tsx`, `register-form.tsx`, `forgot-password-form.tsx`) already validate input and handle loading/error/success states — replace their `onSubmit` bodies with real calls to your auth provider and redirect on success as they do now. The onboarding flow (`src/components/onboarding/onboarding-flow.tsx`) assumes it runs immediately after registration.
- **Database / persistence.** Everywhere `useLocalStorage` is used today, swap it for data fetched from your API (e.g. with a data-fetching library of your choice) and mutations that call real endpoints instead of writing to `localStorage`.
- **AI provider.** Replace the implementation of `generateAiResponse()` in `src/lib/ai/mock-ai-service.ts`, described above, with a real API call. Keep the same `AiStudioRequest` → `Promise<AiStudioResult>` shape and nothing else needs to change.
- **Payments.** `src/components/billing/billing-workspace.tsx` and `src/data/billing.ts` model plans, the current subscription, invoices, and payment methods. Introducing a real payment provider means replacing the plan-switch and cancellation handlers with calls to that provider's API/webhooks and populating `invoices` from real billing records.
- **API calls in general.** Every workspace component's local handlers (see above) are the seams to convert to API calls — each already has its own loading state, success toast, and error handling shape in place.

## Global providers

`src/components/providers.tsx` composes the app-wide providers: theme (`next-themes`), tooltip delay group (Radix `TooltipProvider`), the command palette context (`CommandPaletteProvider`), and the toast renderer (`Toaster`). This is mounted once in the root layout.
