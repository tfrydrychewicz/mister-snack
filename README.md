# Mister Snack

> AI-powered nutrition assistant — desktop app that learns your profile and generates personalised meal plans.

Cross-platform Electron app built with Vue 3, TypeScript, and the Vercel AI SDK. Supports OpenAI, Anthropic, Google Gemini, and Ollama for meal planning and photo analysis.

---

## Features

- **User Onboarding** — Collect nutrition profile (demographics, activity level, goals, diets, allergies, preferences) in a guided multi-step wizard
- **AI Meal Planning** _(planned)_ — Generate personalised daily meal plans for selected date ranges
- **Meal Photo Analysis** _(planned)_ — Photograph a meal to have it analysed and attached to your plan
- **Plan Customisation** _(planned)_ — Swap meals and ingredients with AI-suggested alternatives
- **Flexible AI Backend** — Use OpenAI, Anthropic, Google Gemini, or local Ollama; API keys stored securely

---

## Tech Stack

| Layer       | Technology                                        |
| ----------- | ------------------------------------------------- |
| Runtime     | Electron                                          |
| UI          | Vue 3, Tailwind CSS                               |
| State       | Pinia, Vue Router                                 |
| Forms       | VeeValidate, Zod                                  |
| AI          | Vercel AI SDK (OpenAI, Anthropic, Google, Ollama) |
| Persistence | electron-store (encrypted)                        |
| Testing     | Vitest, Playwright                                |
| Components  | Storybook                                         |

---

## Prerequisites

- **Node.js** 18+ (20 recommended)
- **npm** 10+

---

## Getting Started

### Quick setup

```bash
git clone https://github.com/tfrydrychewicz/mister-snack.git
cd mister-snack
./scripts/setup.sh
```

The setup script checks Node.js, installs dependencies, downloads Playwright browsers, and runs a quick verification.

### Manual setup

```bash
npm ci
npm exec playwright install --with-deps chromium
```

### Run the app

```bash
npm run dev
```

---

## Scripts

| Command             | Description                                                  |
| ------------------- | ------------------------------------------------------------ |
| `npm run dev`       | Start the app in development mode                            |
| `npm run build`     | Build for production                                         |
| `npm run storybook` | Run Storybook (component workshop) on port 6006              |
| `npm run test:unit` | Run unit tests                                               |
| `npm run test:e2e`  | Run E2E tests (Playwright)                                   |
| `npm run ci`        | Full CI pipeline (format, lint, typecheck, test, build, E2E) |

---

## Project Structure

```
mister-snack/
├── electron/           # Main process (IPC, services, AI providers)
├── src/                 # Renderer (Vue app, components, stores, views)
│   ├── components/      # base/, forms/, layout/
│   ├── views/           # OnboardingView, DashboardView, PlanView, etc.
│   └── stores/          # profile, settings, ui
├── features/            # Feature design documents
├── tests/               # Unit and E2E tests
├── scripts/setup.sh    # Fresh environment setup
└── DESIGN.md           # Full architecture and implementation plan
```

See [STRUCTURE.md](STRUCTURE.md) for a detailed file map.

---

## Development

- **Components** — Add Storybook stories for new UI components (see `.cursor/rules/vue-storybook-components.mdc`)
- **Features** — Create a design doc in `features/<name>.md` before implementation (see [features/FEATURE_TEMPLATE.md](features/FEATURE_TEMPLATE.md))
- **Tests** — Unit tests for services and stores; E2E for critical flows

---

## License

MIT
