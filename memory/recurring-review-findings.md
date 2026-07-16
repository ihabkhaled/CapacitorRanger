# Recurring review findings

The violations this architecture keeps catching. Every one is a habit from a normal React codebase
that a rule here rejects. Each entry: what shows up, why it is wrong _here_, and where it belongs.

## Interfaces and types in component files

**Shows up as:** `interface ButtonProps { … }` at the top of `button.component.tsx`.
**Belongs in:** the sibling `*.types.ts`. `props.types.ts` next to `props.component.tsx`.
**Why:** the component folder is a contract — types, constants, component, barrel. A type declared
inline cannot be imported without importing the component, so the contract and the rendering become
one unit.
**Caught by:** `architecture/no-interfaces-outside-interface-files`,
`architecture/no-types-outside-type-files`.

## Hooks in components

**Shows up as:** `useState`, `useTranslation`, or `useQuery` inside a `*.component.tsx`.
**Belongs in:** a `*.hook.ts` returning a finished view model; the container calls it and spreads
the result.
**Why:** a component that calls a hook needs a provider tree to render, so its test needs a rig, so
it stops getting tested. This is the single most common finding.
**Caught by:** `architecture/no-hooks-in-components`,
`architecture/no-built-in-hooks-outside-hook-files`.

## Raw vendor imports

**Shows up as:** `import axios from 'axios'` in a service; `import { IonButton } from '@ionic/react'`
in a feature component; `import dayjs from 'dayjs'` in a mapper.
**Belongs in:** the owner. `@/packages/http`, `@/packages/ionic` (or a `src/shared/ui` primitive),
`@/packages/date`.
**Why:** every direct edge is a line in the next migration's diff
([ADR 0004](../architecture/adrs/0004-package-ownership.md)).
**Caught by:** the six ownership rules and `npm run quality:package-ownership`.
**Note:** an unregistered vendor reports differently — "no registered owner … Register an owner
before using it". That is a design decision request, not a lint nit.

## Inline literals that belong in a constants file

**Shows up as:** `queryKey: ['health']`; `httpClient.get('/health')`; `history.push('/home')`;
`getSecureValue('auth-token')`; `data-testid="submit"`; `trackEvent('login_success')`.
**Belongs in:** `queries/*.keys.ts`, `constants/*-api.constants.ts`, `APP_PATHS` +
`routes/*.paths.ts`, `STORAGE_KEYS`, `TEST_IDS`, `constants/*-analytics.constants.ts`.
**Why:** a typo'd literal fails at runtime, in one place, silently. A typo'd constant fails at
compile time, everywhere.
**Caught by:** `architecture/no-inline-query-keys`, `no-inline-api-endpoints`, `no-inline-routes`,
`no-inline-storage-keys`, `no-inline-test-ids`, `no-inline-event-names`.

## Raw user-visible text

**Shows up as:** `<IonButton>Save</IonButton>`, or a `placeholder="Email"`.
**Belongs in:** `I18N_KEYS`, translated in the hook, passed down as a prop.
**Why:** `ar` is a shipped locale, not a plan. `npm run quality:locales` fails on a key present in
one catalog and not the other.
**Caught by:** `architecture/no-raw-i18n-text`.

## Rendering a raw error

**Shows up as:** `{error.message}`, or `catch (e) { setError(String(e)) }`.
**Belongs in:** the `AppError` → i18n-key pipeline (`context/error-flow.md`).
**Why:** it leaks backend internals, cannot be translated, and every call site invents its own
fallback string.
**Caught by:** `architecture/no-unsafe-error-display`.

## Server state copied into a store

**Shows up as:** a `user` field on the session store, or an `isLoading` flag beside a query.
**Belongs in:** TanStack Query (`use-current-user-query.hook.ts`). The session store holds status
only.
**Why:** two sources of truth, one silently stale — and a persisted store writes server data to
disk.
**Caught by:** `architecture/no-server-state-in-client-store`.

## Cross-module deep imports

**Shows up as:** `import { loginUser } from '@/modules/auth/services/login.service'`.
**Belongs in:** the module's `index.ts`, if it should be public at all. Usually it should not — ask
what the caller actually needs first.
**Why:** a deep import makes another module's internals load-bearing, and refactoring it becomes a
cross-module change.
**Caught by:** `architecture/no-cross-module-deep-imports` and `npm run quality:architecture`.

## React leaking into pure layers

**Shows up as:** `useTranslation()` in a service; a `ReactNode` in a mapper's return type.
**Belongs in:** the hook. Services and gateways return data; hooks turn data into view models.
**Why:** a React import makes a use case untestable without a renderer, for no gain.
**Caught by:** `architecture/no-react-in-services`, `no-react-in-gateways`, `no-react-in-pure-layers`.

## Undocumented eslint-disable

**Shows up as:** `// eslint-disable-next-line` with no reason.
**Belongs in:** a documented exception with an ID and a justification — the codebase has exactly
one, in `logger.factory.ts`, because the logger package is the single `console` owner.
**Why:** a disable comment is an architecture exception. It needs the reason attached, or the next
reader cannot tell a deliberate carve-out from a shortcut.
**Caught by:** `architecture/no-undocumented-eslint-disable`, `unicorn/no-abusive-eslint-disable`.
