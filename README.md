# DevPilot AI

A monorepo starter for an AI assisted repository workspace.

## Stack

- Frontend: React, Vite, TypeScript, Tailwind CSS, shadcn/ui conventions, Lucide React, React Router, Monaco Editor, TanStack Query
- API: Hono and TypeScript on Cloudflare Workers
- Data and jobs: Cloudflare D1, R2, and Queues
- Integrations: OpenAI or Claude APIs, GitHub API
- Tests: Vitest and React Testing Library

## Getting started

Install pnpm, then run `pnpm install` and `pnpm dev`. The web app runs on port 5173; Wrangler serves the API locally.

Most feature modules are placeholders ready for implementation. Add UI primitives with the shadcn CLI as the app's component patterns settle.
