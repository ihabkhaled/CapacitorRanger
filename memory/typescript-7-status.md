# TypeScript 7 status

Current state of the dual-compiler arrangement. The decision and its rationale are
[ADR 0011](../architecture/adrs/0011-typescript-7-toolchain-compatibility.md); this page is the
snapshot and the exit condition.

## Current state — dual compiler, still required

| Role             | Package             | Version                        | Invoked as                                 |
| ---------------- | ------------------- | ------------------------------ | ------------------------------------------ |
| Primary compiler | `typescript7`       | npm alias → `typescript@7.0.2` | `node node_modules/typescript7/bin/tsc -b` |
| Parser compiler  | `typescript`        | `5.9.3`                        | `tsc` (whatever is on `PATH`)              |
| Consumer         | `typescript-eslint` | `8.64.0`                       | peer `typescript: >=4.8.4 <6.1.0`          |

The alias exists because two majors of the same package cannot both be named `typescript`. As a
side effect the primary compiler does not own the `tsc` bin, so it must be invoked by path.

**Verified 2026-07-16:** `typescript-eslint@8.64.0` declares
`peerDependencies.typescript: ">=4.8.4 <6.1.0"`. The upper bound `<6.1.0` excludes major 7, so the
dual arrangement is still necessary. Re-verify with:

```bash
node -e "console.log(require('./node_modules/typescript-eslint/package.json').peerDependencies)"
```

## Which compiler gates what

- `npm run typecheck` → **TS 7.0.2**. This is the verdict that matters.
- `npm run build` → **TS 7.0.2** project build, then `vite build`.
- `npm run typecheck:toolchain` → **TS 5.9.3**. Not redundant: it proves the compiler the linter
  loads in-process also accepts the code, so a type-aware rule cannot be reasoning about a program
  that would not compile.

Both run inside `npm run quality`. `typescript7` is listed in `knip.json` `ignoreDependencies`
because nothing imports it by name.

## The footgun

Bare `npx tsc`, an editor's bundled TypeScript, and any tool that resolves `typescript` from
`node_modules` all get **5.9.3**, not the primary compiler. A file that typechecks in the editor can
still fail `npm run typecheck`. When the two disagree, TS7 is the authority. Always reproduce with
the npm script rather than the bare binary.

## Removal trigger

The arrangement dies the moment `typescript-eslint`'s peer range covers TypeScript 7. That is
watched mechanically, not remembered:

```bash
node scripts/quality/check-toolchain-compatibility.mjs
```

It reads the alias's major from `package.json` and the live peer range from
`node_modules/typescript-eslint/package.json`, then **exits 1 when the range's upper bound no longer
excludes the primary major** — i.e. it fails precisely when the dual setup has become unnecessary,
and its failure message is the removal checklist. It is deliberately outside the `quality` chain:
it is a retirement alarm, run during dependency work, not a per-commit gate.

**When it fires:**

1. Remove the `typescript` 5.x devDependency.
2. Point `typescript` at v7 and delete the `typescript7` alias.
3. Collapse `typecheck` and `typecheck:toolchain` into one script; drop `typecheck:toolchain` from
   `quality` and update the gate table in `context/release-gates.md`.
4. Remove `typescript7` from `knip.json` `ignoreDependencies`.
5. Retire ADR 0011 per its own Supersession clause and update this page.

## Related constraint

`baseUrl` is gone in TS7 (TS5102), so `tsconfig.base.json` is paths-only. That is a permanent TS7
fact, independent of the dual-compiler arrangement — it survives the removal. See
`memory/known-pitfalls.md`.

A fuller reference at `docs/dependencies/typescript-compatibility.md` is the intended home for the
version snapshot; it does not exist yet, so this page is authoritative in the meantime.
