# Architecture reviewer

## Purpose

Read a change for structural correctness: does it respect the layers, the ownership registry, and
the file taxonomy — and, where the rules cannot reach, is it in the right place at all? The lint
plugin catches the mechanical half. This lens exists for the other half: a change can satisfy every
rule and still put a use case in a hook or a policy decision in a component.

## What it checks

- **Layer direction.** `app → modules → platform → shared → packages`. A package owner importing
  `@/shared` is the classic reversal.
- **Module boundaries.** Cross-module access through `index.ts` only, and a public surface that is
  minimal rather than convenient.
- **Vendor ownership.** New dependency → registry entry + owner package, built before any consumer.
- **File taxonomy.** Suffix matches responsibility: services hold one use case, gateways export only
  `request*`, mappers stay pure, components hold no hooks.
- **Placement judgement.** Is this shared or is it one module's? Is it platform policy or plugin
  wrapping? Does the abstraction have two real callers, or is it speculative?
- **Deletability.** Could this feature be deleted by removing its folder? If not, something leaked.

## The questions it asks

- What is the smallest layer that could own this? Why is it not there?
- Does this new abstraction have two real callers today, or one and a hypothesis?
- If this vendor were swapped next quarter, how many files change?
- Is this `index.ts` export needed by another module, or is it there for a test?
- Does the change make a module harder to delete than it was before?
- Which existing rule _should_ have caught this and didn't — is the rule the gap?

## Commands it runs

```bash
npm run quality:architecture          # layer direction + module structure, re-derived
npm run quality:package-ownership     # registry completeness + owner-dir existence
npm run quality:circular              # madge: import cycles
npm run quality:exports               # index.ts is a re-export surface only
npm run lint
```

A cycle reported by madge is almost always a boundary the design got wrong, not a technicality —
read it as a finding, not a warning.

## What it defers to

- **ADRs decide.** [0001](../architecture/adrs/0001-module-first-architecture.md) (layers),
  [0004](../architecture/adrs/0004-package-ownership.md) (ownership),
  [0002](../architecture/adrs/0002-ui-only-components.md) / [0003](../architecture/adrs/0003-hook-isolation.md)
  (components and hooks). This lens applies them; it does not relitigate them.
- **Rules are normative** — chiefly
  [01-architecture-and-dependency-direction](../rules/01-architecture-and-dependency-direction.md),
  [02-feature-modules](../rules/02-feature-modules.md), and
  [09-package-ownership](../rules/09-package-ownership.md). When a rule fires, the rule is right by
  default. A rule that is wrong is an ADR conversation and a rule change — never a disable comment.
- **`context/`** for current wiring: [architecture-map](../context/architecture-map.md),
  [module-anatomy](../context/module-anatomy.md), [package-ownership](../context/package-ownership.md).
- **Other lenses** own their domains: security, native, testing, accessibility, performance, and API
  contracts each have their own reviewer.
- **The source** settles any disagreement with the docs.
