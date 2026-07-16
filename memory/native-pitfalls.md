# Native pitfalls

Android and iOS realities this repository already accounts for. The capability wiring is
`context/native-capability-map.md`; this page is what bites.

## `androidScheme` must stay `https`

`capacitor.config.ts` sets `server.androidScheme: 'https'`. Changing it to `http` silently
downgrades the WebView origin: `localStorage` and `sessionStorage` are keyed by origin, so a scheme
change **loses stored data** for every existing install, and secure-context APIs stop working.
This is a one-way door on a shipped app — treat the scheme as permanent.

## `server.url` must never be committed

A live-reload `server.url` in `capacitor.config.ts` makes the installed app load its JavaScript from
a remote origin. Committed to a release, that is a production app running someone else's code — the
single worst native misconfiguration available here. Use it locally, never commit it. Nothing but
review catches this today, which is why it is written down.

## Cleartext is disabled

`server.cleartext: false`, so plaintext HTTP is refused on device. An API base URL of
`http://localhost:3000` works in a browser and fails on Android. Use mock mode or an HTTPS endpoint
when running on a device.

## Keyboard resize policy is config, not code

`plugins.Keyboard.resize: 'native'` with `resizeOnFullScreen: true` in `capacitor.config.ts`.
Changing the resize mode changes layout behavior on every screen at once — content jumping when the
keyboard opens is almost always this setting, not the form. Note the `@capacitor/keyboard` owner
exists but nothing calls it yet: the config is live regardless of whether JavaScript ever touches
the plugin.

## Splash and status bar are owned by platform startup

`src/platform/lifecycle/native-chrome.facade.ts` is the only caller of `hideSplashScreen()` and
`applyStatusBarAppearance()`, driven by `use-appearance-sync.hook.ts` once the theme resolves. The
config agrees: `launchShowDuration: 0`, `launchAutoHide: true`, `StatusBar.overlaysWebView: false`.
Hiding the splash anywhere else produces a flash of unstyled app before the theme is known.

## Hardware back has exactly one owner

`src/platform/back-button/back-button.facade.ts` — go back while history exists, otherwise
`exitApp()`. It is registered once by `use-app-lifecycle.hook.ts` and unsubscribed on unmount. A
second `App.addListener('backButton', …)` anywhere produces a double-pop that is maddening to debug
because each handler is individually correct. `architecture/require-native-listener-cleanup` and
`architecture/no-floating-native-listeners` enforce the cleanup half.

## iOS verification is UNVERIFIED off macOS — by design

`npm run ios:verify` (`scripts/native/verify-ios-environment.mjs`) checks the project exists, then:

- **On macOS with Xcode** — runs a real `xcodebuild` against the `App` scheme.
- **Anywhere else** — prints `iOS build verification UNVERIFIED on this platform (<platform>)` and
  exits **0**.

Exiting 0 is deliberate. The script cannot compile iOS off macOS, so it says so rather than faking a
pass; CI runs iOS on a macOS job. Do not "fix" this by exiting 1 (it would break every non-macOS
contributor) or by asserting success. An honest UNVERIFIED is worth more than a green tick that
proves nothing.

## Android verification needs a JDK on PATH

`scripts/native/run-gradle.mjs` probes `java -version` first and, if it fails, prints that a JDK
(17+) is required, that `JAVA_HOME` must be set, and — importantly — **names the Gradle task it did
not run**. It does not fall through to a confusing Gradle stack trace. `android:verify` chains
`cap:sync` → `lint` → `test` → `assembleDebug`; the runner picks `gradlew.bat` on Windows and
`./gradlew` elsewhere.

## `cap sync` drift is a gate, not a habit

`npm run cap:sync:check` (`scripts/native/check-capacitor-sync.mjs`) fails when `android/` or
`ios/` is missing, when the native app id disagrees with `APP_IDENTITY.appId`
(`com.capacitorranger.app`), or when `git status --porcelain -- android ios` is non-empty after a
sync. That last check is the useful one: it means a plugin was added without committing the native
changes it generated. CI runs `cap:sync` immediately before it.

## Rebranding touches more than a string

`APP_IDENTITY` in `src/shared/config/app-identity.constants.ts` is the canonical identity, and
`capacitor.config.ts` derives from it — but the generated `android/` and `ios/` projects already
contain the old id in `build.gradle` and `project.pbxproj`. Changing the constant without
regenerating or editing the native projects fails `cap:sync:check` with a mismatch. That failure is
the feature.
