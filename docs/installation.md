# Installation

## Requirements

- Node.js 20 or later
- npm 10 or later (the project is set up for npm; other package managers should work but are not the tested path)

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

   The app is available at [http://localhost:3000](http://localhost:3000). The marketing site is served at `/`; the application shell is served under `/app`.

3. Lint the project:

   ```bash
   npm run lint
   ```

4. Type-check the project:

   ```bash
   npx tsc --noEmit
   ```

5. Create a production build:

   ```bash
   npm run build
   ```

6. Run the production build locally:

   ```bash
   npm run start
   ```

No environment variables, API keys, or external services are required to run NEXORA. Every feature works entirely from local data and browser storage.

## Editor setup

The project is written in strict TypeScript with ESLint (via `eslint-config-next`). Most editors will pick up both automatically. There are no additional required extensions, though Tailwind CSS IntelliSense is recommended for editing class names.
