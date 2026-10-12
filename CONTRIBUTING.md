# Contributing to Signal

Thanks for helping. This is a small project with one maintainer, so the rules are short.

## Before you start

1. Get it running locally with the steps in the [README](README.md). If that takes more than ten minutes, open an issue; the setup instructions are the bug.
2. Pick an open issue, or open one describing what you want to change. A one-line issue is fine. It just keeps two people from doing the same work.

## Making changes

- Branch from `main`. Name it after the change: `fix/scout-timeout`, `feat/watchlist`.
- Keep pull requests small. One change per PR is easier to review and safer to deploy, because `main` deploys to production on merge.
- Run `pnpm build` before you push. CI runs the same command and will block the PR if it fails.
- Don't commit `.env.local` or any keys. `.env.example` lists what's needed with no values.

## Pull requests

- Say what changed and why in two or three sentences. Screenshots for anything visual.
- Link the issue.
- The maintainer reviews and merges. Expect a response within a few days.

## Things to know

- **`main` is production.** Every merge deploys to Vercel.
- **v0 also commits to this repo.** The maintainer uses [v0](https://v0.app) for some changes, and it pushes directly. If your branch conflicts with a recent v0 commit, rebase on `main` and ask in the PR if anything looks wrong.
- **Scout is the only part that needs a key.** Everything else runs offline. If Scout says it's unavailable, that's the missing key, not a bug.
- **No financial advice.** Scout's system prompt forbids personalized advice, predictions, and trade instructions. Don't loosen it. Any new feature that touches money, trades, or recommendations should keep the same line.

## Reporting a security issue

Email the maintainer directly instead of opening a public issue.
