# Reporting — Final Summary Format

## Summary Structure

Output the summary in Markdown so it renders nicely in GitHub comments, PR descriptions,
and most terminal outputs.

## Template

```markdown
## Dependabot PR Summary for `<owner/repo>`

### ✅ Merged (<N> PRs)

| PR | Title | Notes |
|----|-------|-------|
| #N | bump lodash from 4.17.20 to 4.17.21 | |
| #N | bump @types/node from 18.0.0 to 20.0.0 | trivial fix applied: updated import path |

### ❌ Blocked (<N> PRs)

| PR | Package | Version | Failure Reason | Severity |
|----|---------|---------|---------------|----------|
| #N | webpack | 4.x → 5.x | Major version migration, config overhaul needed | High |
| #N | react | 17 → 18 | Concurrent mode test failures in 3 test files | Medium |
| #N | jest | 27 → 29 | Module resolution changes, 12 test suites failing | Medium |

### ℹ️ Skipped (<N> PRs)

| PR | Reason |
|----|--------|
| #N | Already merged |
| #N | CI still pending after 20 min timeout |
```

## Severity Levels

| Severity | Meaning |
|----------|---------|
| **High** | Major version with widespread breaking changes; likely needs a dedicated PR/issue |
| **Medium** | Breaking changes in a moderate number of places; could be fixed in a focused session |
| **Low** | Minor issue (e.g. one failing test, obvious fix but outside trivial threshold) |

## Multi-Repo Reports

When processing multiple repos, produce one summary per repo, then a **grand total** at the end:

```markdown
## Grand Total

- ✅ Merged: N PRs across M repos
- ❌ Blocked: N PRs across M repos
- ℹ️ Skipped: N PRs
```
