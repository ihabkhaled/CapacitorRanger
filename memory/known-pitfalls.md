# Known pitfalls

Things that cost real time while building this repository. Each one is a fact plus the workaround
that is already in the code — so nobody pays for it twice.

## 1. npm 12 cannot be installed on Node 24.14.1

npm 12 declares `engines.node: ^22.22.2 || ^24.15.0 || >=26`. The installed Node is **24.14.1**,
which falls into the gap _below_ `^24.15.0` — so npm 12 is uninstallable here despite Node 24 being
current. `package.json` therefore declares `engines.npm: ">=10"` (the toolchain runs on npm 10.7.0),
not `>=12`. Do not "fix" the engine range to match a newer npm without first checking `node -v`
against npm's own range. `.nvmrc` pins the Node major to `24`.

## 2. `eslint-plugin-react` with `version: 'detect'` crashes on ESLint 10

The plugin's version-detection path calls `context.getFilename()`, which ESLint 10 removed. The
result is a crash during linting, not a graceful warning. `eslint.config.mjs` pins the version
explicitly instead:

```js
settings: { react: { version: '19.2' } },
```

Keep that literal in sync with the installed `react` version by hand — nothing checks it, because
the thing that would check it is the code that crashes.

## 3. `eslint-plugin-react` and `eslint-plugin-jsx-a11y` declare ESLint ≤9 peers

Both plugins work with ESLint 10 but have not updated their `peerDependencies`, so a plain install
fails on peer resolution. `package.json` carries a scoped `overrides` block that re-points only
their `eslint` peer at the installed version:

```json
"overrides": {
  "eslint-plugin-jsx-a11y": { "eslint": "$eslint" },
  "eslint-plugin-react": { "eslint": "$eslint" }
}
```

This override is cosmetic — it satisfies a stale range for plugins that already work. Do not
generalize the trick to a peer that is enforced for a real reason (see
`memory/typescript-7-status.md`).

## 4. TypeScript 7 removed `baseUrl` (TS5102)

Setting `baseUrl` in any tsconfig now raises **TS5102**. `tsconfig.base.json` declares `paths`
without it — `"@/*": ["./src/*"]`, resolved relative to the config file — and
`vite-tsconfig-paths` handles resolution at build and test time. Copying a `baseUrl` line in from
an older project breaks `npm run typecheck` immediately.

## 5. `@sentry/capacitor@4.2.0` pins `@sentry/react` to an exact version

Its peer is exact `10.60.0` — not a caret range. Bumping `@sentry/react` alone breaks the install,
and the two must move together. Both are owned by `src/packages/error-reporting`, which is also
what makes the coordinated bump a one-directory change.

## 6. Ionic 8 exposes overlays as hooks, not controllers

There is no importable `toastController` / `alertController` singleton to call from a service. Ionic
8 exports `useIonToast` and `useIonAlert`. Consequently the toast and alert owners are **hooks** —
`src/shared/ui/toast/use-app-toast.hook.ts` and `src/shared/ui/alert/use-confirm-alert.hook.ts` —
and they inherit hook call rules: a service cannot raise a toast directly. Surface the failure as an
`AppError` and let a hook present it.

## 7. `exactOptionalPropertyTypes` forces conditional prop spreads

`exactOptionalPropertyTypes: true` makes `{ color: undefined }` incompatible with `color?: string`.
Forwarding an optional prop into an Ionic component therefore needs a spread, not a pass-through:

```ts
await presentToast({
  message,
  duration,
  position: 'bottom',
  ...(color === undefined ? {} : { color }),
});
```

The same shape appears in `use-confirm-alert.hook.ts`, `axios-config.helper.ts`, and
`createPersistedAppStore`. It looks like ceremony; it is the compiler refusing to pretend that
"absent" and "explicitly undefined" are the same thing.

## 8. In jsdom, Ionic boolean props are DOM properties, not attributes

Ionic's custom elements reflect booleans onto the element object, so `toHaveAttribute('disabled')`
fails while the control genuinely is disabled. Assert with `toHaveProperty` instead:

```ts
expect(button).toHaveProperty('disabled', true); // works
expect(button).toHaveAttribute('color', 'danger'); // strings still reflect as attributes
```

Ionic's custom events do not fire from `userEvent` either — use
`tests/setup/ionic-events.helper.ts` (`fireIonInput`, `fireIonBlur`, `fireIonChange`).

## 9. `eslint-plugin-security` rejects nested-quantifier regexes

`security/detect-unsafe-regex` flags patterns whose quantifiers nest (`(a+)+`) because they are
ReDoS-prone — and it flags them even when the input is trusted. The fix is not a disable comment; it
is a linear parser. `scripts/quality/validate-filenames.mjs` splits on `.` and `-` and validates
each segment, and `environment.schema.ts` validates a reverse-domain app id with
`value.split('.').every(...)` rather than one nested pattern. Linear scans are also easier to read.
