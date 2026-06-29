# AGENTS.md

## What is this

Personal portfolio site for Milan Soni. Built with **TanStack Start** (file-based routing + SSR), **React 19**, **Vite 7**, **Tailwind CSS v4**, and **shadcn/ui** (new-york style). Deployed to **Vercel**.

## Key commands

| Command | What |
|---|---|
| `bun dev` | Vite dev server |
| `bun build` | Production build (Vite) |
| `bun lint` | ESLint |
| `bun format` | Prettier |
| `bun build:dev` | Development-mode build |

## Architecture

- **TanStack Start** — not Next.js. File-based routes in `src/routes/`. `__root.tsx` is the app shell.
- **Vite 7** with TanStack Start plugin, Nitro server, and Tailwind CSS v4 plugin.
- **Path alias**: `@/*` → `./src/*` (defined in `tsconfig.json`).
- **Server entry**: `src/server.ts` (Nitro handler), `src/start.ts` (TanStack Start middleware).
- **Client data**: `src/lib/site.ts` — all projects, experience, tech stack, and nav config live here.
- **shadcn/ui** components in `src/components/ui/`. New-york style, lucide icons, CSS variables enabled.
- **Tailwind CSS v4** — configured via `@theme inline` in `src/styles.css`, not `tailwind.config.ts`. Custom aurora palette, glassmorphism tokens.
- **routeTree.gen.ts** is auto-generated — never edit by hand.

## Routing (TanStack Router file-based)

| Pattern | URL | Notes |
|---|---|---|
| `index.tsx` | `/` | Home |
| `about.tsx` | `/about` | |
| `work.index.tsx` | `/work` | Project listing |
| `work.$slug.tsx` | `/work/:slug` | Individual project |
| `blog.index.tsx` | `/blog` | |
| `blog.$slug.tsx` | `/blog/:slug` | |
| `research.tsx` | `/research` | Publications |
| `lab.tsx` | `/lab` | AI Lab |
| `contact.tsx` | `/contact` | |

DYNAMIC params use bare `$` (no curly braces). Optional segments use `{-$param}`. Splat uses `$.tsx` + `_splat`.

## Code style

- Prettier: 100 chars, double quotes, semicolons, trailing commas.
- ESLint: TypeScript + React Hooks + Prettier. `no-restricted-imports` blocks `server-only` (use `*.server.ts` suffix or `@tanstack/react-start/server-only` instead).
- `cn()` utility from `@/lib/utils` for merging Tailwind classes.
- Lazy-load below-fold components with `React.lazy` + `Suspense` (see `src/routes/index.tsx`).
- Framer Motion for page transitions and animations.

## Env vars

- `.env` at project root (gitignored — never commit secrets).
- Server-only secrets: use `*.server.ts` files or `process.env` inside server functions.
- Client-visible config: prefix with `VITE_` (`import.meta.env.VITE_*`).
- The `.env` currently has `GEMINI_API_KEY` — this is used by the AI chat component.

## Gotchas

- **No `src/pages/` or `app/` directory** — this is TanStack Start, not Next.js.
- **No `server-only` package** — ESLint will error. Use `.server.ts` suffix or TanStack's server-only marker.
- **Tailwind CSS v4** uses `@theme inline` in CSS, not a JS config file.
- **Nitro** is the server runtime (not Node.js Express). The `vercel.json` sets `NITRO_PRESET=vercel`.
- **bun.lock** is the lockfile — prefer `bun install` over `npm install`.
- **`routeTree.gen.ts`** must not be manually edited.
