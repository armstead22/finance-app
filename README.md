# Signal

A phone-first stocks, options, and crypto learning app. Users browse markets, practice with paper trades, work through short lessons on options and risk, and ask **Scout**, an AI coach, to explain concepts in plain language. Nothing in the app places real trades or gives personalized financial advice.

Built with Next.js 16, React 19, and the Vercel AI SDK. Packaged for iOS and Android with Capacitor.

> Educational use only. Not financial advice.

## Run it locally

You need Node 22 and pnpm.

```bash
git clone https://github.com/armstead22/finance-app
cd finance-app
pnpm install
pnpm dev
```

Open http://localhost:3000. The whole app runs with no keys. The only feature that needs one is Scout:

```bash
cp .env.example .env.local
# add your AI_GATEWAY_API_KEY
```

Without a key, Scout returns "Scout is unavailable right now" instead of an answer. That's expected.

## Project layout

| Path | What's there |
|---|---|
| `app/page.tsx` | Entry point, renders the app shell |
| `app/api/scout/route.ts` | Scout coach API. Calls `openai/gpt-5.4-mini` through the Vercel AI Gateway |
| `app/privacy`, `app/support`, `app/terms` | Legal and support pages |
| `components/stocks-app.tsx` | The main UI: market tabs, options chain, lessons, paper trading, Scout |
| `components/ui/` | Shared UI primitives |
| `lib/` | Helpers and data |
| `capacitor.config.ts` | iOS and Android packaging |

## Scripts

| Command | Does |
|---|---|
| `pnpm dev` | Dev server |
| `pnpm build` | Production build (CI runs this on every PR) |
| `pnpm start` | Serve the production build |
| `pnpm cap:sync` | Build and sync to the iOS and Android projects |
| `pnpm ios:open` / `pnpm android:open` | Open the native project |

## Deployment

Every merge to `main` deploys to Vercel automatically. Treat `main` as production.

This repo is also linked to a [v0](https://v0.app) project, which can push commits directly. If you're contributing by hand, work on a branch and open a pull request. See [CONTRIBUTING.md](CONTRIBUTING.md).

## Contributing

Issues labeled `good first issue` are the best place to start. Read [CONTRIBUTING.md](CONTRIBUTING.md) for the branch and PR flow.

## License

[MIT](LICENSE)
