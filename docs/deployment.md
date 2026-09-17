# Deployment

NEXORA is a standard Next.js 16 App Router project and deploys anywhere Next.js does.

## Build

```bash
npm run build
```

This produces an optimized production build. Every route in NEXORA renders as static content (no server-side data fetching is required, since the app runs entirely on local data and browser state), so the build output is fast to serve from any static-capable host or Node server.

## Run

```bash
npm run start
```

Serves the production build on port 3000 by default (override with `PORT=xxxx npm run start`).

## Hosting options

- **Vercel** — zero-configuration; connect the repository and Vercel will detect the Next.js project automatically.
- **Any Node host** (Render, Railway, Fly.io, a VPS) — run `npm run build` then `npm run start` behind your process manager of choice.
- **Static export** — if you don't plan to add server-rendered routes later, `next build` output can also be adapted for static hosting, since no route currently depends on server-side rendering at request time.

## Environment variables

None are required. If you connect a real backend (see [State management → Future integration points](state-management.md#future-integration-points)), add your API base URL, auth provider keys, and similar secrets as environment variables at that point, following your host's standard mechanism (e.g. a `.env.local` file for local development, and your host's dashboard for production).

## Custom domains and metadata

Update `src/config/site.ts` (`url`, `ogImage`) before deploying to production so Open Graph and canonical metadata point at your real domain.
