# Project Structure

Lightweight map of the Mister Snack codebase. Verify against the filesystem when precision matters.

---

## Root & Config

| File | Responsibility |
|------|----------------|
| `package.json` | Dependencies, scripts, app metadata. Main entry: `out/main/index.js`. |
| `index.html` | Renderer HTML entry; loads `src/main.ts`. |
| `electron.vite.config.ts` | Electron-Vite build: main, preload, renderer entry points; `@` alias to `src/`. |
| `tsconfig.json` | Project references only; delegates to tsconfig.node.json and tsconfig.web.json. |
| `tsconfig.node.json` | TypeScript for main process + electron config. Includes `electron/**`, `src/types/**`. |
| `tsconfig.web.json` | TypeScript for renderer. Includes `src/**`. |
| `tailwind.config.ts` | Tailwind theme (brand, neutral palettes); content paths for src + Storybook. |
| `postcss.config.cjs` | PostCSS pipeline: Tailwind + Autoprefixer. |
| `eslint.config.mjs` | ESLint 9 flat config; Vue + TypeScript rules. |
| `.prettierrc.json` | Prettier formatting (single quotes, no semicolons). |
| `vitest.config.ts` | Unit test runner; jsdom, `@` alias, coverage for stores/services. |
| `playwright.config.ts` | E2E test runner; tests in `tests/e2e/`. |

**Generated / do not edit manually:** `package-lock.json`, `tsconfig.*.tsbuildinfo`, `out/`, `node_modules/`.

---

## Design & Rules

| File | Responsibility |
|------|----------------|
| `DESIGN.md` | Source of truth for architecture, tech stack, data model, implementation phases. |
| `my-design.md` | Original design brief (reference). |
| `features/FEATURE_TEMPLATE.md` | Template for new feature design docs; required before implementation. |
| `.cursor/rules/design-spec.mdc` | Always apply: follow DESIGN.md; on conflicts, stop and ask before proceeding. |
| `.cursor/rules/feature-design-first.mdc` | Always apply: design doc in `features/` before coding; reusability primary. |
| `.cursor/rules/structure-md.mdc` | Always apply: maintain STRUCTURE.md; reconcile vs filesystem. |
| `.cursor/rules/test-with-code.mdc` | Always apply: add/update unit tests when adding/modifying services or stores. |
| `.cursor/rules/vue-storybook-components.mdc` | For `src/components/**/*.vue`: dumb components, Storybook stories required. |
| `.cursor/rules/views-are-composers.mdc` | Views use stores/IPC; components and composables must not. |
| `.cursor/rules/ipc-typed-boundaries.mdc` | For electron/ipc, preload: typed channels, Zod validation, no any. |
| `.cursor/rules/main-process-trust.mdc` | AI, file I/O, persistence, API keys only in main process. |
| `.cursor/rules/ai-provider-abstraction.mdc` | For electron/services: no direct provider imports; use ai-client factory. |
| `.cursor/rules/no-any.mdc` | For **/*.ts, **/*.vue: avoid any; prefer type imports and explicit return types. |

---

## Electron (Main Process)

| File | Responsibility |
|------|----------------|
| `electron/main.ts` | App entry; creates BrowserWindow, loads preload + renderer. |
| `electron/preload.ts` | Exposes typed `window.api` via contextBridge. IPC handlers added in Phase 1. |
| `electron/services/storage.service.ts` | Typed wrapper over electron-store for `userProfile`, `mealPlans`, `aiSettings`. |

**Placeholder dirs (Phase 1+):** `electron/ipc/`, `electron/services/ai/`, `electron/services/ai/providers/`.

---

## Renderer: Entry & Layout

| File | Responsibility |
|------|----------------|
| `src/main.ts` | Vue app bootstrap; mounts App with Pinia + Vue Router. |
| `src/App.vue` | Root component; renders `<RouterView />`. |
| `src/assets/main.css` | Tailwind directives; base typography and component utilities. |

---

## Renderer: Routing & State

| File | Responsibility |
|------|----------------|
| `src/router/index.ts` | Vue Router; hash history. Routes: onboarding, dashboard, plan, meal-detail, settings. |
| `src/stores/ui.store.ts` | Pinia store: loading, toasts, modal state. |

---

## Renderer: Types & Schemas

| File | Responsibility |
|------|----------------|
| `src/types/index.ts` | Barrel re-export of profile, meal, ai types. |
| `src/types/profile.ts` | UserProfile, ActivityLevel, NutritionGoal, DietType. |
| `src/types/meal.ts` | Meal, DayPlan, MealPlan, Ingredient, Macros, PhotoAnalysis. |
| `src/types/ai.ts` | AISettings, AIProviderName, PROVIDER_MODELS, PROVIDER_LABELS. |
| `src/types/schemas.ts` | Zod schemas for validation; used by VeeValidate in forms. |

**Note:** `src/types/` is imported by both renderer (tsconfig.web) and main process (tsconfig.node) as shared types.

---

## Renderer: Views

| File | Responsibility |
|------|----------------|
| `src/views/OnboardingView.vue` | Multi-step onboarding wizard (Phase 2). |
| `src/views/DashboardView.vue` | Plan list, period picker, generate button (Phase 3). |
| `src/views/PlanView.vue` | Day columns, meal cards for a plan (Phase 3). |
| `src/views/MealDetailView.vue` | Ingredient list, macros, photo attachment (Phase 3–4). |
| `src/views/SettingsView.vue` | AI provider/model configuration (Phase 6). |

**Placeholder dirs:** `src/components/` (base, forms, meal, layout) — Phase 1 base components.

---

## Storybook

| File | Responsibility |
|------|----------------|
| `.storybook/main.ts` | Storybook config; Vue3-Vite, `@` alias, addons (essentials, interactions, a11y). |
| `.storybook/preview.ts` | Global setup: Pinia, Tailwind import. |

---

## Tests

| File | Responsibility |
|------|----------------|
| `tests/unit/ui-store.spec.ts` | Unit tests for ui.store (loading, toasts, modal). |
| `tests/e2e/smoke.spec.ts` | Placeholder E2E; full flows in Phase 7. |

---

## Key Relationships

- **Main process** → `StorageService` is the only persistence layer; all data flows through it.
- **Renderer** → No direct IPC; all IPC goes through `window.api` (preload).
- **Types** → `src/types/` is the single source of truth for shared interfaces; used by both processes.
- **Forms** → VeeValidate + Zod (`src/types/schemas.ts`); views use `useForm` + `toTypedSchema`.
