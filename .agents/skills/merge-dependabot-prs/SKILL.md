---
name: merge-dependabot-prs
description: >
  Merge Dependabot PRs intelligently: auto-detect the target repo, merge all green PRs,
  fix trivial breaking changes, and report non-trivial blockers in a summary table.
  Triggers on: "merge dependabot PRs", "clean up dependabot", "handle dependabot backlog".
---

# Merge Dependabot PRs

Automate the Dependabot PR backlog: merge everything that's green, fix trivial failures, and surface a clear report of what needs human attention.

## Step 0 — Determine Scope

**Default:** target the current repository.

```bash
# Detect the repo you're working in
gh repo view --json nameWithOwner -q .nameWithOwner
# or fallback:
git remote get-url origin
```

**If the user's prompt explicitly names a different scope, use that instead:**

| Scope | Example prompt | Command |
|-------|---------------|---------|
| Single repo | "in `org/repo`" | `gh pr list --repo org/repo ...` |
| All repos for a user | "all my repos" | `gh repo list <user> --json nameWithOwner` |
| All repos in an org | "all repos in the Acme org" | `gh repo list <org> --json nameWithOwner` |

> ⚠️ Multi-repo scope must be **explicitly requested**. Never expand scope beyond the current repo unless the user clearly asks for it.

See `references/scope.md` for edge cases and disambiguation rules.

## Step 1 — List Dependabot PRs

```bash
gh pr list --repo <owner/repo> \
  --author app/dependabot \
  --json number,title,headRefName,statusCheckRollup,mergeable,baseRefName \
  --state open
```

Separate PRs into:
- **Green**: all required checks passed, mergeable
- **Failing / pending**: one or more checks failed or still running
- **Blocked**: merge conflicts or branch protection issues

## Step 2 — Merge Green PRs

For each green PR, merge in order (oldest first to reduce rebase churn):

```bash
gh pr merge <number> --repo <owner/repo> --merge
```

If the merge is blocked by branch protection (e.g. requires admin), use:

```bash
gh pr merge <number> --repo <owner/repo> --merge --admin
```

After merging, trigger Dependabot to rebase the remaining open PRs:

```bash
gh pr comment <number> --repo <owner/repo> --body "@dependabot rebase"
```

Wait for Dependabot to finish rebasing (poll `gh pr view` until `headRefOid` changes or
the PR is no longer in a rebasing state), then re-check CI before merging the next one.

**You are only done with Step 2 when all PRs that were green at the start have been merged.**

See `references/merging.md` for retry logic, conflict handling, and rate limits.

## Step 3 — Triage Failing PRs

For each PR that is not green, assess whether the failure is **trivial** or **non-trivial**.

See `references/triage.md` for the full decision guide. Quick summary:

**Trivial** (fix it, commit, wait for green, merge):
- Renamed export / import path that changed in the new version
- Simple type signature change (add a required field, narrow a type)
- Config key renamed (1–5 line change, no logic change)
- Single straightforward API replacement

**Non-trivial** (add to blocker table, skip):
- Requires understanding library internals
- Hacky workarounds or monkey-patching
- Multi-file refactor touching core logic
- Test failures that aren't obviously related to the dependency change
- CI failures in unrelated jobs (don't fix unrelated breakage)

### Making Trivial Fixes

1. Check out the Dependabot branch locally
2. Apply the minimal fix (don't refactor unrelated code)
3. Commit with: `fix: resolve <package> breaking change for vX.Y.Z`
4. Push; wait for CI to go green
5. Merge using Step 2 logic

## Step 4 — Final Report

At the end, output a summary:

```
## Dependabot PR Summary

### ✅ Merged (N PRs)
- #123 bump lodash from 4.17.20 to 4.17.21
- #124 bump @types/node from 18.0.0 to 20.0.0 (trivial fix applied)

### ❌ Blocked (N PRs)

| PR | Package | Reason | Severity |
|----|---------|--------|----------|
| #125 | webpack 4→5 | Major version, requires config migration | High |
| #126 | react 17→18 | Concurrent mode breaking changes in tests | Medium |
```

See `references/reporting.md` for table format details.
