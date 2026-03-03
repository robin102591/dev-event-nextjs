# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

DevEvent — a Next.js 16 (App Router) site for discovering developer events (hackathons, meetups, conferences). Currently uses static data from `lib/constants.ts` with no backend or database. The current branch (`implement-posthog`) is focused on adding PostHog analytics.

## Commands

```
npm run dev       # Start dev server at http://localhost:3000
npm run build     # Production build (also serves as type-check)
npm run start     # Serve production build
npm run lint      # ESLint (eslint-config-next with core-web-vitals + typescript)
```

There is no test framework configured.

## Architecture

- **Framework**: Next.js 16 with React 19 using the App Router (`app/` directory). All components are React Server Components by default; add `"use client"` only when needed.
- **Styling**: Tailwind CSS v4 via `@tailwindcss/postcss`. Custom design tokens (colors, fonts, radii) are defined as CSS variables in `app/globals.css` using `@theme inline`. Custom utilities (`flex-center`, `text-gradient`, `glass`, `card-shadow`) and component styles are also in `globals.css`.
- **UI Components**: shadcn/ui (new-york style) configured via `components.json`. Add components with `npx shadcn add <component>`. UI primitives go in `components/ui/`, app-level components in `components/`.
- **Fonts**: Schibsted Grotesk and Martian Mono loaded via `next/font/google` in `app/layout.tsx`, exposed as CSS variables `--font-schibsted-grotesk` and `--font-martian-mono`.
- **WebGL**: `components/ui/LightRays.tsx` is a client component using the `ogl` library for an animated background effect, rendered in the root layout.
- **Path aliases**: `@/*` maps to the project root (configured in `tsconfig.json`).

## Key Conventions

- `lib/utils.ts` exports `cn()` (clsx + tailwind-merge) — use it for conditional class merging.
- Event data shape: `{ title, slug, image, location, date, time }` — defined in `lib/constants.ts`.
- Static assets live in `public/icons/` and `public/images/`.
- Environment variables are in `.env` (git-ignored). Prefix client-side env vars with `NEXT_PUBLIC_`.
