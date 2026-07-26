# Design system map

Use this page to choose UI primitives without searching the source tree. Every cross-feature control
is exported from `@/shared/ui`; feature screens compose these instead of recreating local controls.

## Import surface

```ts
import {
  AppButton,
  AppCard,
  AppInput,
  AppPasswordInput,
  AppSelect,
  FormField,
  PageShell,
  StatusView,
} from '@/shared/ui';
```

| Need                | Primitive             | Contract                                                      |
| ------------------- | --------------------- | ------------------------------------------------------------- |
| Routed screen       | `PageShell`           | Native toolbar, safe responsive width, optional banner/action |
| Action              | `AppButton`           | Three tones, loading/disabled state, 44px target              |
| Surface             | `AppCard`             | Three visual tones; shared radius, elevation, and dark mode   |
| Text field          | `AppInput`            | Normalized string event, outline chrome, error state          |
| Secret field        | `AppPasswordInput`    | Caller-owned reveal state and translated labels               |
| Dropdown            | `AppSelect`           | String options, normalized Ionic event, popover interface     |
| Custom field        | `FormField`           | Label, hint, and alerting error around a custom control       |
| Empty/error/offline | `StatusView` wrappers | Shared icon, semantics, copy, and action spacing              |
| Large collection    | `VirtualizedList`     | Stable contract through the Virtuoso owner                    |

## Composition rules

- Components receive translated copy and prepared callbacks; hooks own state and translation.
- Use `PageShell` once per route and `AppCard` for meaningful groups, not every nested element.
- Feature utilities may arrange layout but must not redefine control radius, focus, or validation.
- `src/app/styles/app.css` owns Ionic tokens, light/dark surfaces, responsive width, reduced motion,
  and visible focus.
- Verify changed screens in mobile, desktop, dark, and RTL after their unit tests pass.

`src/modules/ui-workbench` is the living catalogue. Add a primitive there when its states need a
human-visible example and keep tests under `src/shared/ui/<name>`.

Related: [module anatomy](./module-anatomy.md), [test strategy](./test-strategy-map.md),
[component skill](../skills/component.md), [accessibility rule](../rules/19-accessibility.md).
