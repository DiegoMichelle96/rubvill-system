# RUBVILL System

Dashboard with tools for accountants.

Stack: Next.js 16.4 (App Router, Turbopack, Cache Components, Partial Prefetching), React 19.3, JavaScript, Tailwind CSS v4.

## Commands

- `npm run dev` start dev server
- `npm run lint` lint
- `npm run build` production build

Every change must pass `npm run lint` and `npm run build`.

## Next.js version

This Next.js is newer than your training data. Before using any Next.js API, read the matching guide in `node_modules/next/dist/docs/`. Key differences:

- `cacheComponents` is on: nothing is cached implicitly. Cache with `'use cache'` plus `cacheLife(...)`, invalidate with `cacheTag`/`revalidateTag`/`updateTag`.
- Components that read `cookies()`, `headers()`, `params`, `searchParams`, or uncached data must render inside `<Suspense>`.
- `params` and `searchParams` are Promises; `await` them.
- `proxy.js` replaces `middleware.js`.

## Code rules

- JavaScript only. Never add TypeScript, `.ts` files, or JSDoc types.
- No comments of any kind in code.
- Write the least code that fully solves the problem without sacrificing correctness, readability, accessibility, or performance. No dead code, unused props, speculative options, or wrappers that add nothing.
- Server Components by default. Put `'use client'` only on the smallest leaf that needs state, effects, event handlers, or browser APIs. Pass server content into client components as `children`.
- Fetch data in Server Components. Never fetch in `useEffect`. Mutate with Server Functions (`'use server'`) through `<form action>` and `useActionState`, then revalidate.
- Derive values during render instead of syncing state with effects. Do not add `useMemo`/`useCallback` without a measured need.
- `async`/`await` only, no `.then` chains. Early returns over nested conditionals.
- Modules holding secrets or calling private APIs start with `import 'server-only'`. Only `NEXT_PUBLIC_` env vars reach the client.
- Money: never do arithmetic on floats. Work in integer cents and format with `Intl.NumberFormat`. Dates and numbers always go through helpers in `src/lib/format.js`.

## Components

- Before creating a component, search `src/components/` for one to reuse or extend with a prop or variant. Never duplicate.
- One component per file, PascalCase filename, named export. Next.js route files (`page.js`, `layout.js`, `loading.js`, `error.js`, ...) use default exports.
- Function declarations for components. Destructure props in the signature with defaults.
- Primitives accept `className` and spread `...props` onto their root element so they stay composable.
- Variants are plain object maps keyed by prop value, merged with `cn` from `@/lib/cn`.
- Styling is Tailwind utilities only. Design tokens live in `@theme` in `src/app/globals.css`; use token classes (`bg-background`, `text-foreground`) instead of raw hex values.
- Accessible by default: semantic elements, labels for every input, visible focus states.

Canonical primitive:

```js
import { cn } from "@/lib/cn";

const variants = {
  primary: "bg-foreground text-background hover:opacity-90",
  ghost: "hover:bg-foreground/5",
};

export function Button({ variant = "primary", className, ...props }) {
  return (
    <button
      className={cn("rounded-md px-4 py-2 text-sm font-medium transition disabled:opacity-50", variants[variant], className)}
      {...props}
    />
  );
}
```

## Structure

```
src/
  app/                  routes only; route-specific pieces in colocated _components/
  components/ui/        generic primitives (Button, Input, Card, Table, Modal)
  components/<feature>/ domain components shared across routes
  lib/                  utilities, formatting, API clients, server functions
  hooks/                custom client hooks
```

- Folders: kebab-case. Utilities and hooks: camelCase (`useDebounce.js`).
- A component used by one route lives in that route's `_components/`. Move it to `src/components/` once a second route needs it.
- Import with the `@/` alias, never long relative paths.
