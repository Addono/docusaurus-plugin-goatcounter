# Scope — Determining the Target Repository

## Default Behaviour

Unless the user's prompt explicitly states otherwise, **target the repository you are currently
working in**. Detect it with:

```bash
# Preferred: uses the GitHub CLI's authenticated context
gh repo view --json nameWithOwner -q .nameWithOwner

# Fallback: parse the remote URL
git remote get-url origin
# e.g. https://github.com/Addono/skills.git  →  Addono/skills
#      git@github.com:Addono/skills.git        →  Addono/skills
```

## Explicit Single Repo

If the user names a specific repo in their prompt (e.g. "in `Addono/my-other-repo`"),
use that repo instead of the current one.

```bash
gh pr list --repo Addono/my-other-repo --author app/dependabot --state open
```

## All Repos for a GitHub User

The user must say something like "all my repos" or "all repos for user `<handle>`".

```bash
gh repo list <username> --json nameWithOwner --limit 100 -q '.[].nameWithOwner'
```

Process each repo in turn. Skip archived or disabled repos:

```bash
gh repo list <username> --json nameWithOwner,isArchived,isDisabled \
  --limit 100 -q '.[] | select(.isArchived == false and .isDisabled == false) | .nameWithOwner'
```

## All Repos in an Organisation

The user must explicitly say "all repos in the `<Org>` org" or "across the `<Org>` organisation".

```bash
gh repo list <org> --json nameWithOwner,isArchived --limit 200 \
  -q '.[] | select(.isArchived == false) | .nameWithOwner'
```

## Disambiguation Rules

| Scenario | Action |
|----------|--------|
| Prompt is ambiguous ("my repos") | Ask the user to confirm scope before proceeding |
| No `git remote` or `gh` available | Ask the user to specify the repo explicitly |
| User says "everything" | Ask — never assume org-wide scope |
| Repo is archived | Skip silently |
| Repo has no Dependabot PRs | Skip, note in final report |
