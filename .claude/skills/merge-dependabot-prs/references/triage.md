# Triage — Trivial vs Non-Trivial Failures

## Decision Flowchart

```
CI failure on Dependabot PR?
│
├─ Is the failure in a job unrelated to the dependency change?
│   → NON-TRIVIAL. Don't fix unrelated breakage.
│
├─ Is the failing test/build clearly caused by the new package version?
│   │
│   ├─ Does the fix require ≤ 5 lines across ≤ 3 files?
│   │   AND is the change purely mechanical (rename, type cast, config key)?
│   │   → TRIVIAL ✓
│   │
│   ├─ Does the fix require understanding library internals?
│   │   → NON-TRIVIAL ✗
│   │
│   ├─ Does the fix require a hacky workaround (monkey-patch, type assertion to `any`, etc.)?
│   │   → NON-TRIVIAL ✗ (even if small)
│   │
│   ├─ Does the fix touch core application logic (not just imports or config)?
│   │   → NON-TRIVIAL ✗
│   │
│   └─ Is the fix a major version migration (e.g. webpack 4→5, React 17→18)?
│       → NON-TRIVIAL ✗
│
└─ CI is still running / pending?
    → Wait up to 20 minutes. If still pending, treat as non-trivial and note "CI timeout".
```

## Trivial Examples

| Situation | Fix |
|-----------|-----|
| Package renamed an export | Update the import path |
| Function gained a required parameter with an obvious default | Add the parameter |
| Config key renamed in new version | Rename the key |
| Type narrowed (e.g. `string \| null` → `string`) with a clear non-null path | Add null guard |
| Test mock needs updating for the new API shape | Update the mock |

## Non-Trivial Examples

| Situation | Why |
|-----------|-----|
| Webpack 4 → 5 migration | Config overhaul, new module federation API |
| React 17 → 18 concurrent mode | Subtle rendering behaviour changes in tests |
| ORM major version (e.g. TypeORM 0.2 → 0.3) | Query builder API breaking changes |
| Jest 27 → 29 | Module resolution changes, timer mock API |
| Any fix that requires `// @ts-ignore` or `as any` | Hacky workaround |
| Fix > 20 lines or touching > 5 files | Scope too large |

## Safety Rules

Before applying any fix:

1. **Read the PR diff** to understand what changed in the dependency.
2. **Read the failing test/build output** to understand the exact error.
3. **Apply only the minimal change** — do not refactor, optimise, or clean up while fixing.
4. **Do not suppress linting or type errors** to make CI pass.
5. **Do not add the dependency to an ignore list** (e.g. Renovate `ignoreDeps`, Dependabot `ignore`) — that hides the problem.
