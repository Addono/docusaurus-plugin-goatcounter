# Security and Review

The upstream app warns that anyone who can push config changes to the default branch can
effectively change admin-level repository settings through `.github/settings.yml`.

## Review Checklist

When the file changes permissions, collaborators, teams, environments, or branch protection:

1. Check whether the change broadens access or weakens protections.
2. Preserve existing safeguards unless the user explicitly asks to change them.
3. Recommend CODEOWNERS coverage for `.github/settings.yml`.
4. Recommend required code owner review on the default branch when this file manages sensitive
   settings.

## CODEOWNERS Pattern

Use a repo-appropriate owner rather than inventing a team:

```text
.github/settings.yml @<org-or-user>/<team-or-owner>
```

If the repository is personal rather than org-owned, use the relevant admin user instead of a
team.
