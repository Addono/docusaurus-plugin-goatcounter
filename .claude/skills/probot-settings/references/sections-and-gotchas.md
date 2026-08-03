# Sections and Gotchas

## Usual Baseline

For most repositories, start with just:

- `repository`
- `labels`

Only add more sections when the repo already manages them or the user asks for them.

## Section Guide

| Section | Use it for | Notes / gotchas |
|---------|------------|-----------------|
| `repository` | Core repo metadata and feature toggles | Mirrors GitHub's update-repository API closely. Addono examples also use `allow_update_branch`, `delete_branch_on_merge`, `enable_automated_security_fixes`, and `enable_vulnerability_alerts`. |
| `labels` | Issue / PR labels | Prefer preserving current labels, colours, and descriptions. Quote colours only when using a leading `#`. |
| `branches` | Branch protection | The most error-prone section. Every top-level protection key must be filled or set to `null`, otherwise the app may skip applying protection changes. |
| `teams` | Team permissions | Only valid on org-owned repositories. Do not invent team names; inspect first. |
| `collaborators` | Direct user access | Treat as sensitive. Avoid broadening access unless requested. |
| `environments` | Deployment environment rules | `deployment_branch_policy` uses a simplified schema in this app. Reviewer entries require numeric IDs. |
| `milestones` | Pre-created milestones | Usually optional and less common than the sections above. |

## Useful Inspection Commands

```bash
REPO=<owner/repo>
BRANCH=$(gh repo view "$REPO" --json defaultBranchRef -q .defaultBranchRef.name)

# Repository metadata and topics
gh repo view "$REPO" --json \
  name,description,homepageUrl,isPrivate,hasIssuesEnabled,hasWikiEnabled,defaultBranchRef,mergeCommitAllowed,rebaseMergeAllowed,squashMergeAllowed,deleteBranchOnMerge,repositoryTopics

# Labels
gh label list --repo "$REPO" --json name,color,description --limit 200

# Branch protection (404 means "not protected")
gh api repos/"$REPO"/branches/"$BRANCH"/protection

# Environments
gh api repos/"$REPO"/environments
```

## Addono-Oriented Defaults Seen in Practice

From the Addono examples gathered for this skill:

- start with `repository:` and `labels:`
- preserve the actual default branch; newer repos often use `main`, but older repos may still use
  `master`
- newer repos commonly allow squash and rebase merges, disable merge commits, and delete branches
  on merge
- label sets are repo-specific rather than copied wholesale between repositories

See `addono-examples.md` for concrete examples and links.
