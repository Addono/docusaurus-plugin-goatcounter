# Merging — Step-by-Step with Retry Logic

## Merge Order

Process PRs **oldest first** (by creation date). This minimises rebase conflicts because
Dependabot reuses the same branch name for the same dependency — if two PRs bump the same
package, merging the older one first causes Dependabot to close the newer duplicate.

## Standard Merge Flow

```bash
# 1. Verify the PR is still open and green
gh pr view <number> --repo <owner/repo> --json state,mergeable,statusCheckRollup

# 2. Merge
gh pr merge <number> --repo <owner/repo> --merge

# 3. If blocked by branch protection (e.g. required reviewers, status checks not satisfied)
gh pr merge <number> --repo <owner/repo> --merge --admin
```

## After Each Merge — Trigger Rebase

After merging any PR, the remaining open PRs may be out of date. Trigger Dependabot to
rebase them:

```bash
for pr_number in <list of remaining open PR numbers>; do
  gh pr comment "$pr_number" --repo <owner/repo> --body "@dependabot rebase"
done
```

Wait for each rebase to complete before merging the next PR. Poll with:

```bash
# Check if the PR head has updated (Dependabot will push a new commit)
gh pr view <number> --repo <owner/repo> --json headRefOid,statusCheckRollup
```

Retry interval: 30 seconds. Maximum wait: 10 minutes per PR.

## Handling Auto-Merge

If the repo has auto-merge enabled and the PR already has `autoMergeRequest` set,
you can skip the explicit merge step — Dependabot will merge it automatically once
CI passes.

## Rate Limits

GitHub allows up to 30 `@dependabot rebase` comments per hour. If you have > 30 PRs,
batch the rebase triggers and wait between batches.

## Merge Conflict Resolution

If a PR has merge conflicts **and** is otherwise green:

1. Comment `@dependabot rebase` and wait.
2. If Dependabot cannot rebase (e.g. conflicting lockfile), check whether the conflict
   is trivial (lockfile only) or non-trivial (source code conflict).
3. Lockfile-only conflicts: resolve by regenerating the lockfile locally, then push.
4. Source-code conflicts: treat as non-trivial, add to the blocker table.
