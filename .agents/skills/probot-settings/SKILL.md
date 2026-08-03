---
name: probot-settings
description: >
  Create or update `.github/settings.yml` for the Repository Settings GitHub App /
  Probot Settings app. Research the target repo, preserve existing intent, and apply
  safe defaults. Triggers on: ".github/settings.yml", "repository settings",
  "probot settings", "settings app", "repository-settings app".
---

# Probot Settings

Use this skill when a repository needs a new or updated `.github/settings.yml` managed by the
Repository Settings GitHub App (`repository-settings/app`) or the older Probot Settings docs.

## Step 0 — Determine Scope

Default to the current repository unless the user explicitly names another one.

```bash
gh repo view --json nameWithOwner -q .nameWithOwner
# Fallback:
git remote get-url origin
```

## Step 1 — Gather the Current State

If `.github/settings.yml` already exists, read it first and update it surgically.

If the file does not exist yet, inspect the live repository and current labels:

```bash
REPO=<owner/repo>

gh repo view "$REPO" --json \
  name,nameWithOwner,description,homepageUrl,isPrivate,hasIssuesEnabled,hasWikiEnabled,defaultBranchRef,mergeCommitAllowed,rebaseMergeAllowed,squashMergeAllowed,deleteBranchOnMerge,repositoryTopics

gh label list --repo "$REPO" --json name,color,description --limit 200
```

Only inspect advanced sections when you actually plan to manage them:

- Branch protection: `gh api repos/$REPO/branches/<branch>/protection`
- Environments: `gh api repos/$REPO/environments`
- Teams / collaborators: inspect only for organisation-owned repositories

See `references/sections-and-gotchas.md` for section-level guidance.

## Step 2 — Build the File from Minimal to Specific

Prefer a small, accurate file over a giant aspirational one.

1. Start with `repository:` and preserve the real repo name, description, homepage, visibility,
   default branch, and merge strategy.
2. Add `labels:` next; preserve existing labels unless the user wants a deliberate cleanup.
3. Add `teams`, `collaborators`, `branches`, `environments`, or `milestones` only when the repo
   already uses them or the user explicitly asks for them.
4. Keep comments short and useful; follow the existing file style if one already exists.

Use `references/addono-examples.md` for Addono-flavoured patterns and example repos.

## Step 3 — Encode Important Upstream Rules

- All sections are optional.
- Branch protection is strict: top-level protection keys must be fully specified or set to
  `null`, otherwise updates may not apply.
- Label colours can be bare hex (`CC0000`) or quoted with `#` (`'#CC0000'`).
- Team permissions are only valid for organisation-owned repositories.
- `deployment_branch_policy` uses a simplified schema in this app.
- Inheritance is supported, but only introduce it if the repo or org already follows that model.

## Step 4 — Safety and Review

This app can change powerful repository settings from a pull request. Do not quietly weaken
permissions or protections.

When the file manages access or branch rules:

- preserve or tighten existing protections unless the user requests otherwise
- mention the security implication that merging to the default branch can effectively change
  admin-level settings
- recommend protecting `.github/settings.yml` with CODEOWNERS and required code owner review

See `references/security.md` for the exact caveat and review checklist.

## Step 5 — Finish

After editing:

1. Keep the YAML ordered and readable.
2. Say whether you created a new file or updated an existing one.
3. Note that the file only takes effect if the Repository Settings app is installed for the repo
   or organisation.
