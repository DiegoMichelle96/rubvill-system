# RUBVILL System

Dashboard with tools for accountants.

Stack: Next.js 16.4 (App Router, Turbopack, Cache Components, Partial Prefetching), React 19.3, JavaScript, Tailwind CSS v4.

## Commands

- `npm run dev` start dev server
- `npm run lint` lint
- `npm run build` production build

The dev server may not hot-reload changes to `globals.css`; restart it after editing tokens.

Every change must pass `npm run lint` and `npm run build`.

## Git

- Never commit or push without the user's explicit approval for that specific change. Approval does not carry over to later changes.
- Commit messages: short, simple, and descriptive of what was done.
- Never commit or push to `main`. Before every commit, run `git branch --show-current`; if it is `main`, create a descriptive branch first (`feature/...`, `fix/...`). Push that branch; the user merges.

## Next.js version

This Next.js is newer than your training data. Before using any Next.js API, read the matching guide in `node_modules/next/dist/docs/`. Key differences:

- `cacheComponents` is on: nothing is cached implicitly. Cache with `'use cache'` plus `cacheLife(...)`, invalidate with `cacheTag`/`revalidateTag`/`updateTag`.
- Components that read `cookies()`, `headers()`, `params`, `searchParams`, or uncached data must render inside `<Suspense>`.
- `params` and `searchParams` are Promises; `await` them.
- `proxy.js` replaces `middleware.js`.

## Backend API

The OpenAPI spec is in `docs/openapi.json`. Read it before calling any endpoint. Refresh it from `<API_URL>/api-docs/swagger-ui-init.js` when the backend changes.

## Architecture

The browser never calls the backend directly.

- Client-side requests: client component → `/api/...` route handler → service function → backend.
- Server-side requests: Server Component → service function → backend. Never `fetch` our own `/api` from the server.
- Service functions live in `src/lib/services/<resource>.js`, one file per backend resource, one function per endpoint (`listClients`, `getClient`, `createClient`, ...). They are `server-only` and are the single reusable entry point for backend data, shared by route handlers and Server Components. They strip fields the UI must never receive, such as `password` and `salt`.
- `src/lib/backend.js` is the only module that performs HTTP calls to the backend. It reads `API_URL`, attaches the backend `sessionId` from the session, sends `ngrok-skip-browser-warning`, and turns backend errors into a consistent shape.
- Route handlers live in `src/app/api/<resource>/route.js`, mirroring backend paths (`client`, `invoice`, `user`, `cfdi-job`). They stay one-liners: wrap with `route()` from `src/lib/route.js`, read input with `readId`/`readQuery`/`readJson`/`readForm` and a schema, call a service function. `route()` returns `{ error, fields? }` with the right status for every failure.
- Zod schemas live in `src/lib/schemas.js`. They are isomorphic, so forms reuse them. Validate every input before it reaches the backend; the backend does not validate and leaks database errors as 500s.
- Backend quirks: lists return `{ data, meta }` (`meta`: `total`, `page`, `pageSize`, `totalPages`, `hasPrev`, `hasNext`); "not found" comes back as 500; `401` uses `{ message }`; invoice `total` is a decimal string; `/invoice` ignores `startDate` (reported); `/auth/login` may return `sessionId` as a string or as `{ sessionId, userId, expiresAt }` and `auth.js` accepts both.

## Auth

next-auth v5 (`next-auth@beta`, Auth.js). Read its docs for v5 APIs, not v4.

- Config in `src/auth.js` exports `{ handlers, auth, signIn, signOut }`. Handlers mount at `src/app/api/auth/[...nextauth]/route.js`.
- Credentials provider calls backend `POST /auth/login`. The backend `sessionId` is stored in the encrypted JWT and never exposed to the client session.
- Logout calls backend `POST /auth/logout`, then `signOut()`.
- Protect pages in `proxy.js` and re-check `auth()` in every route handler.
- Env vars live in `.env.local`: `AUTH_SECRET`, `API_URL`.

## Code rules

- JavaScript only. Never add TypeScript, `.ts` files, or JSDoc types.
- No comments of any kind in code.
- Write the least code that fully solves the problem without sacrificing correctness, readability, accessibility, or performance. No dead code, unused props, speculative options, or wrappers that add nothing.
- Server Components by default. Put `'use client'` only on the smallest leaf that needs state, effects, event handlers, or browser APIs. Pass server content into client components as `children`.
- Prefer loading initial data in Server Components through `src/lib`. Never fetch in `useEffect` for initial data; client-side reads and mutations call `/api` routes.
- Derive values during render instead of syncing state with effects. Do not add `useMemo`/`useCallback` without a measured need.
- `async`/`await` only, no `.then` chains. Early returns over nested conditionals.
- Modules holding secrets or calling private APIs start with `import 'server-only'`. Only `NEXT_PUBLIC_` env vars reach the client.
- Money: amounts arrive as decimal strings; format them directly with `formatMoney`. Never do float arithmetic; convert to integer cents if math is needed. Dates and numbers always go through helpers in `src/lib/format.js` (Mexico City time zone).

## Components

- Before creating a component, search `src/components/` for one to reuse or extend with a prop or variant. Never duplicate.
- One component per file, PascalCase filename, named export. Next.js route files (`page.js`, `layout.js`, `loading.js`, `error.js`, ...) use default exports.
- Function declarations for components. Destructure props in the signature with defaults.
- Primitives accept `className` and spread `...props` onto their root element so they stay composable.
- Variants are plain object maps keyed by prop value, merged with `cn` from `@/lib/cn`.
- Styling is Tailwind utilities only. Design tokens live in `@theme` in `src/app/globals.css`; use token classes (`bg-background`, `text-foreground`) instead of raw hex values.
- Accessible by default: semantic elements, labels for every input, visible focus states.

See `src/components/ui/Button.js` for the canonical primitive (`buttonClass()` styles links as buttons).

## UI

- UI text is Spanish; code, identifiers and file names are English. Route folders are Spanish URLs (`clientes`, `facturas`, `descargas`, `usuarios`).
- Dashboard pages live in `src/app/(dashboard)/`, which provides the sidebar shell and `error.js`. `proxy.js` sends anyone without a session to `/login`.
- Theme: `next-themes` toggles the `dark` class. Colors are CSS variables in `:root` and `.dark` exposed as tokens (`bg-surface`, `text-muted`, `border-border`, `bg-primary`, `bg-sidebar`, `brand-*`). Never hardcode a color that has a token.
- Every page is a synchronous component that renders its static header immediately and puts data inside `<Suspense fallback={<ContentSkeleton />}>` with an async child that receives the `params`/`searchParams` promises. Never `await` data at the top of a page: it blocks client navigation (Next dev reports "uncached data during prerendering or a navigation"). `loading.js` does not cover client navigation between sibling pages.
- List content components: `await searchParams`, parse with `parseSearchParams(schema, params)`, call a service, render `FilterForm` (a GET form, no client JS), `Table` and `Pagination`. Filters and pages live in the URL.
- Mutations are client components: `FormDialog` / `ConfirmButton` / `useSubmit`, call `api()` from `src/lib/api.js`, then `router.refresh()`. Show field errors from `fields`.
- Enums and Spanish labels live in `src/lib/labels.js`. Client components never import `schemas.js` (keeps zod out of the browser bundle).
- Pages with running SAT jobs use `AutoRefresh`.
- Charts follow the dataviz skill: load it before writing chart code. Reuse `ColumnChart` and `StatTile`.
- Logos: `public/images/logo.png` (light backgrounds) and `logo-white.png` (dark or brand backgrounds) via the `Logo` component.

## Structure

```
src/
  app/                  routes only; route-specific pieces in colocated _components/
  components/ui/        generic primitives (Button, Input, Select, Field, Card, Badge, Table, Pagination, Modal, FormDialog, ConfirmButton, FilterForm, ColumnChart, StatTile, ...)
  components/layout/    sidebar, top bar, navigation
  components/common/    API-aware shared pieces (DeleteButton)
  components/<feature>/ domain components shared across routes
  lib/                  utilities, formatting, backend.js, route.js, schemas.js
  lib/services/         server-only backend functions per resource
  hooks/                custom client hooks
```

- Folders: kebab-case. Utilities and hooks: camelCase (`useDebounce.js`).
- A component used by one route lives in that route's `_components/`. Move it to `src/components/` once a second route needs it.
- Import with the `@/` alias, never long relative paths.
