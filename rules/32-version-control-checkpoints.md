# 32 — Version-control checkpoints

> Authority: normative. This workflow is enforced by local hooks and review; commit scope remains a
> human judgement.

## Mandatory

- MUST commit each coherent behavior, documentation, or test batch separately with a conventional
  commit message.
- MUST run a focused deterministic gate that proves the batch before committing it.
- MUST push `main` after each green coherent commit so publication never accumulates into one final
  high-risk operation.
- MUST stage files intentionally and inspect the staged diff before each commit.

## Forbidden

- NEVER commit a known-red `main`.
- NEVER bypass commit, commit-message, or pre-push hooks.
- NEVER mix unrelated documentation, design, runtime, and test changes in one commit merely because
  they were developed in the same session.
- NEVER defer all publication to a final mega-commit when coherent green checkpoints are available.

## Enforcement

`.husky/pre-commit`, `.husky/commit-msg`, and `.husky/pre-push` mechanically enforce formatting,
linting, conventional messages, type safety, architecture, and tests. Coherent staging and prompt
publication are reviewed manually because Git cannot infer intent.

## Definition of done

- [ ] The staged diff describes one concern and its proof.
- [ ] Its focused deterministic gate passed immediately before the commit.
- [ ] The conventional commit was created without bypassing hooks and pushed to `main`.

## Related

[30 — Release gates](30-release-gates.md) · [31 — Review checklist](31-review-checklist.md) ·
[Release gate map](../context/release-gates.md)
