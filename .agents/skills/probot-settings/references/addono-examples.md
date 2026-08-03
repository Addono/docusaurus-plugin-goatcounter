# Addono Examples

These examples were found via GitHub code search for `org:Addono filename:settings.yml path:.github`.

## Representative Repositories

| Repo | URL | Highlights |
|------|-----|------------|
| `Addono/skills` | https://github.com/Addono/skills/blob/main/.github/settings.yml | `main`, descriptive metadata, topics, squash + rebase allowed, merge commits disabled, branch cleanup and security toggles enabled, curated labels with descriptions. |
| `Addono/homelab-infra` | https://github.com/Addono/homelab-infra/blob/main/.github/settings.yml | Private repo, long topics list, same modern merge strategy, richer domain-specific labels, security toggles enabled. |
| `Addono/docker-bull-monitor` | https://github.com/Addono/docker-bull-monitor/blob/main/.github/settings.yml | Compact public-repo setup, topics, merge commits disabled, branch cleanup enabled, minimal labels. |
| `Addono/website` | https://github.com/Addono/website/blob/main/.github/settings.yml | Very small file: repository basics plus a tiny label set. Good reference for a minimal public repo. |
| `Addono/Addono` | https://github.com/Addono/Addono/blob/main/.github/settings.yml | Personal-account style repo with a simple `repository` block and lightweight labels. |
| `Addono/HathiTrust-downloader` | https://github.com/Addono/HathiTrust-downloader/blob/master/.github/settings.yml | Older example that still uses `master`. Good reminder not to auto-convert older repos to `main`. |

## Observed Conventions

- Most Addono examples begin with `repository:` and then `labels:`.
- The `repository:` block usually mirrors live repo settings instead of being a generic template.
- Newer repos often use:
  - `allow_squash_merge: true`
  - `allow_rebase_merge: true`
  - `allow_merge_commit: false`
  - `delete_branch_on_merge: true`
- Labels are tailored to the repo domain instead of using a single universal catalogue.

## Practical Takeaway

When creating or updating `.github/settings.yml` for an Addono repository:

1. preserve the repo's real branch name and merge strategy
2. keep the file small unless the repo truly needs advanced sections
3. use labels that reflect the repo's domain and workflows
