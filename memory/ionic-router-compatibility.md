# Ionic router compatibility

Why `react-router` is pinned to the v5 line while the rest of the stack is current, and what it
would take to move.

## The pin

```json
"react-router": "5.3.4",
"react-router-dom": "5.3.4",
"@ionic/react-router": "8.8.14",
"@types/react-router": "5.1.20",
"@types/react-router-dom": "5.3.3"
```

React Router is on v7 upstream. This repository is on 5.3.4 — not from neglect, and not a choice
that can be made independently.

## The reason: `@ionic/react-router` integrates with v5

`@ionic/react-router` is Ionic's routing integration, and it is built against the **React Router v5
integration contract**. That contract is not "a router with routes"; it is a specific set of
v5 internals:

- `IonReactRouter` wraps v5's `BrowserRouter` and hands Ionic the v5 `history` object directly —
  the mutable, imperative `history@4` API with `push`/`replace`/`listen`.
- `IonRouterOutlet` needs v5's `<Route>` semantics — in-order matching, `render`/`component` props,
  and the ability to keep a matched page **mounted** while another animates in. Ionic's page
  transitions and back-navigation stack depend on that retention.
- `useIonRouter` (`canGoBack`, `goBack`, `push(path, direction, animation)`) is a facade over the
  same v5 history.

The whole surface is used by `src/packages/router`, which re-exports `IonReactRouter` from
`@ionic/react-router`, `IonRouterOutlet`/`useIonRouter` from `@ionic/react`, and `Route`/`Redirect`
from `react-router-dom`. It is one coupled decision, which is why the router owner exists at all.

## What v7 would break

React Router v6 rewrote the model, and v7 continues it. The breakages are structural, not cosmetic:

- **No mutable `history` object.** v6+ owns navigation internally and exposes `useNavigate`.
  `IonReactRouter` has nothing to hand Ionic.
- **`<Route>` no longer takes `render` or `component`,** and matching became ranked rather than
  in-order — so `src/app/router/app-router.routes.tsx`, which maps every definition to a
  `render={() => <GuardedRoute … />}` and relies on the catch-all being registered last, does not
  translate.
- **Routes unmount on navigate,** so Ionic's page-transition stack has nothing to animate between.
  Screens would swap without transitions, and the hardware-back stack would be wrong.
- `Redirect` became `Navigate`; `useIonRouter` would need a different implementation underneath.

Upgrading React Router alone therefore does not produce a working app with degraded animations — it
produces a broken router. The dependency that must move first is `@ionic/react-router`.

## Blast radius today

Small, and deliberately so. `architecture/no-direct-ionic-import-outside-owner` and the ownership
registry keep every router import inside `src/packages/router`; feature code imports
`@/packages/router` and `useAppNavigation`. When Ionic ships a v6+/v7 integration, the migration is
scoped to the router owner plus `app-router.routes.tsx` — not to every screen.

## When to revisit

- **Trigger:** `@ionic/react-router` publishes a version whose peer range accepts React Router v6+,
  or Ionic replaces the integration outright.
- **Do not:** force a v7 install with `overrides`. Unlike the ESLint peer overrides in
  `memory/known-pitfalls.md` — which satisfy a stale range for plugins that already work — this
  peer is enforced for a real reason. The integration reads router internals; a satisfied range
  would just move the failure to runtime.
- **Check with:** `npm info @ionic/react-router peerDependencies` and the Ionic release notes.
  `npm run deps:check` (`ncu`) reports the drift but cannot know why it is intentional.

Until then the pin stays, and it stays documented — a version this far behind upstream must be able
to explain itself, or someone will helpfully "fix" it.
