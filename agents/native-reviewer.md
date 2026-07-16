# Native reviewer

## Purpose

Read a change for what happens on a device rather than in a browser tab. Web CI proves almost
everything here — and cannot prove the native shell. This lens covers plugin ownership, listener
lifetimes, native configuration, and the honest limits of what the verification scripts actually
checked.

## What it checks

- **Plugin ownership.** One plugin, one `src/packages/capacitor-*` owner, one registry entry.
  Policy — a decision, a fallback, a native-vs-web branch — belongs in a `src/platform/` facade, not
  in the owner and never in a feature.
- **Listener lifetimes.** Every `addListener` returns an unsubscribe, every subscription is cleaned
  up, and StrictMode's double-mount does not double-register. Hardware back has exactly one owner;
  a second registration double-pops.
- **Native config.** `androidScheme: 'https'` (changing it loses stored data for existing installs),
  `cleartext: false`, no committed `server.url`, and the keyboard/splash/status-bar settings that
  govern layout globally.
- **Sync drift.** A plugin added without committing the native changes `cap sync` generated.
  `cap:sync:check` fails on a dirty `android/`/`ios/` tree and on an app id that disagrees with
  `APP_IDENTITY`.
- **Permissions.** Raw plugin states normalized through `mapRawPermissionState`; the UI renders
  `PERMISSION_STATUS`, not a vendor string.
- **Capability creep.** A newly installed plugin adds a permission and a store-listing question.
  Is it used, or pre-installed for a maybe? The absent-by-design list is in
  [native-capability-map](../context/native-capability-map.md).

## The questions it asks

- Which platform did this actually run on, and which one is being assumed?
- What does this do on web, where the plugin does not exist — no-op, throw, or fallback?
- Who removes this listener, and when?
- Does this need a native permission the app does not already request?
- Was `ios:verify` a real build, or the honest UNVERIFIED?
- Did `cap sync` change files that are not in this commit?

## Commands it runs

```bash
npm run cap:sync && npm run cap:sync:check   # build + sync, then drift and app-id checks
npm run android:verify                       # sync → lint → test → assembleDebug (needs a JDK)
npm run ios:verify                           # real xcodebuild on macOS; UNVERIFIED elsewhere
npm run validate:native                      # all four, in order
```

**Read the output, not the exit code.** `ios:verify` exits **0** off macOS while printing
`UNVERIFIED` — that is deliberate honesty, not a pass. `run-gradle.mjs` fails loudly without a JDK
and names the task it did not run. Treat a green `validate:native` on Windows or Linux as "Android
verified, iOS unverified".

## What it defers to

- **[11-capacitor-native-boundaries](../rules/11-capacitor-native-boundaries.md)** and
  **[26-native-release-readiness](../rules/26-native-release-readiness.md)** are normative.
- **[ADR 0006](../architecture/adrs/0006-capacitor-boundary.md)** for the owner/facade split and why
  it is two tiers.
- **[ADR 0010](../architecture/adrs/0010-secure-token-storage.md)** for the native-vs-web storage
  branch.
- **`memory/native-pitfalls.md`** — the scheme, cleartext, back button, and verification realities
  are recorded facts; re-derive them only to correct them.
- **[native-capability-map](../context/native-capability-map.md)** for the current chain and the
  deliberate omissions.
- **The security reviewer** for `server.url`, cleartext, and deep-link policy, which are shared
  ground.
- **The device.** No document here outranks what the hardware does.
