# Agent Guidelines

Guidance for AI agents and contributors working on this site.

## Tooling

This project uses [Bun](https://bun.com) as the package manager. Use `bun install`, `bun run build`, etc. Do not use npm; the `package-lock.json` has been removed in favor of `bun.lock`.

Dependency installs have a 3-day cooldown (`minimumReleaseAge` in `bunfig.toml`), so brand-new package versions are held back until they have been public for at least 3 days. To force a newer version sooner, add the package to `minimumReleaseAgeExcludes` in `bunfig.toml`.

## Voice and tone

Write in a real, human voice. Keep copy direct, plain, and conversational, the way Josh would actually talk. Avoid stiff, corporate, or marketing-speak phrasing.

## Punctuation

- **Never use em dashes (—).** Rewrite the sentence instead. Use a period, comma, colon, or parentheses depending on what reads naturally.
- Avoid en dashes (–) in prose for the same reason; use plain words like "to" for ranges.
- Prefer short, clear sentences over long ones stitched together with dashes.

When in doubt, read the sentence out loud. If it doesn't sound like something a person would say, rewrite it.
