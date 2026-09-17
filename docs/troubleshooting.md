# Troubleshooting

**`npm install` fails or hangs.**
Confirm you're on Node 20+ (`node -v`) and npm 10+ (`npm -v`). Delete `node_modules` and `package-lock.json` and reinstall if a previous install was interrupted.

**Styles look unstyled or broken after pulling changes.**
Stop the dev server, delete the `.next` cache folder, and restart (`rm -rf .next && npm run dev`). Tailwind v4's CSS-first config occasionally needs a clean rebuild after editing `globals.css`.

**My data disappeared after I edited `src/data/*.ts`.**
Workspaces that use `useLocalStorage` (Documents, Prompts, Automations, Team, API Keys, Chat, Notifications) only read the seed data from `src/data/` the *first* time, for a given browser, before anything is stored under that `localStorage` key. If you've already interacted with a workspace, your browser has its own copy in `localStorage` and won't see new seed entries until you clear that key (open your browser's dev tools → Application → Local Storage → remove the relevant `nexora:*` key) or use a private/incognito window.

**Theme toggle doesn't seem to apply on first load.**
This is expected `next-themes` behavior: the theme is applied via a script that runs before hydration to avoid a flash, but the very first paint in some browsers can briefly show the default. This resolves itself within a frame and does not indicate a bug.

**A dialog or dropdown doesn't close on Escape.**
All dialogs, sheets, dropdowns, and the command palette in NEXORA are built on Radix UI primitives (or replicate their behavior), which handle Escape-to-close and focus return automatically. If you've wrapped one of these in additional markup, make sure you haven't captured the `keydown` event elsewhere and called `stopPropagation()` on it.

**TypeScript errors after adding a new mock data entry.**
Check the entry against its type in `src/types/`. The most common issue is a `category`, `role`, `status`, or similar union field with a value that isn't one of the type's allowed literals — TypeScript's error message will list the valid options.

**Build fails with a lint or type error.**
Run `npm run lint` and `npx tsc --noEmit` locally to see the full error before building — `npm run build` runs both and will exit on the first failure.
