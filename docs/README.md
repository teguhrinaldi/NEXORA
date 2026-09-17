# NEXORA Documentation

Welcome to the NEXORA documentation. NEXORA is a premium AI workspace SaaS template — a complete frontend product built with Next.js 16, TypeScript, Tailwind CSS, and a small set of well-established libraries (Framer Motion, Radix UI, React Hook Form, Zod, Recharts).

This documentation is organized so you can find what you need quickly, whether you're setting the project up for the first time, customizing the brand, or preparing to connect a real backend.

## Contents

- [Installation](installation.md) — requirements and getting the project running locally.
- [Project structure](project-structure.md) — what every top-level folder is responsible for.
- [Customization](customization.md) — renaming the brand, editing navigation, and adjusting dashboard variants.
- [Theming](theming.md) — the color, typography, and spacing token system, and how to change them.
- [Components](components.md) — how the component library is organized and the conventions it follows.
- [Mock data](mock-data.md) — where every dataset lives and how to edit or extend it.
- [State management](state-management.md) — how local state, `localStorage`, and the mock AI service work together.
- [Deployment](deployment.md) — building and deploying the app.
- [Troubleshooting](troubleshooting.md) — common issues and how to resolve them.
- [Changelog](changelog.md) — release history.

## What NEXORA is — and isn't

NEXORA is a **frontend product**. Every interaction — generating AI output, saving a document, inviting a teammate, creating an automation — works against local TypeScript data and browser state (React state and `localStorage`), not a live server. This makes the entire product explorable out of the box, with no setup beyond `npm install`.

It is intentionally **not** wired to a real backend, database, authentication provider, payment processor, or AI provider. The codebase is structured so that connecting each of these later is a matter of replacing a small number of service functions — see [State management](state-management.md) for exactly where.
