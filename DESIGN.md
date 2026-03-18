# Mister Snack — Full Application Design

## Overview

Mister Snack is an AI-powered nutrition assistant desktop application. It learns about the user through an onboarding flow, then generates personalised daily meal plans for selected time ranges. The user can interact with plans — swap meals and ingredients — and can photograph a meal to have it analysed and attached to the corresponding plan slot.

---

## Tech Stack

| Layer              | Technology                                  | Purpose                                      |
| ------------------ | ------------------------------------------- | -------------------------------------------- |
| Runtime            | **Electron**                                | Cross-platform desktop shell                 |
| Frontend build     | **Vite**                                    | Fast dev server & bundler                    |
| UI framework       | **Vue 3** (Composition API)                 | Reactive component model                     |
| Styling            | **Tailwind CSS**                            | Utility-first design system                  |
| Component workshop | **Storybook**                               | Isolated UI development & documentation      |
| Language           | **TypeScript**                              | Type safety across renderer and main process |
| State management   | **Pinia**                                   | Modular, typed Vue store                     |
| Routing            | **Vue Router**                              | Single-page navigation within renderer       |
| Forms & validation | **VeeValidate + Zod**                       | Schema-driven form validation                |
| Local persistence  | **electron-store**                          | Encrypted JSON storage on disk               |
| AI abstraction     | **Vercel AI SDK** (`ai` package)            | Unified interface across all providers       |
| AI providers       | OpenAI · Anthropic · Google Gemini · Ollama | User-selectable; any vision-capable model    |
| Testing — unit     | **Vitest + Vue Test Utils**                 | Component & logic tests                      |
| Testing — E2E      | **Playwright**                              | Full app integration tests                   |
| IPC typing         | Custom preload + typed channels             | Type-safe main ↔ renderer bridge             |

---

## Architecture

### Process Model

```
┌─────────────────────────────────┐
│         Renderer Process        │
│  Vue 3 · Pinia · Vue Router     │
│  Tailwind CSS · Storybook       │
└──────────────┬──────────────────┘
               │ contextBridge (typed IPC)
┌──────────────▼──────────────────┐
│         Preload Script          │
│  Exposes typed window.api       │
└──────────────┬──────────────────┘
               │ ipcMain handlers
┌──────────────▼──────────────────┐
│          Main Process           │
│  electron-store · Vercel AI SDK │
│  AI provider client (pluggable) │
│  Meal planner service           │
│  Image analysis service         │
└─────────────────────────────────┘
```

### Directory Structure

```
mister-snack/
├── electron/                    # Main process
│   ├── main.ts                  # App entry — BrowserWindow bootstrap
│   ├── preload.ts               # contextBridge API surface
│   ├── ipc/                     # IPC handler modules
│   │   ├── profile.ipc.ts
│   │   ├── meal-plan.ipc.ts
│   │   ├── image-analysis.ipc.ts
│   │   └── settings.ipc.ts
│   └── services/                # Business logic (main process)
│       ├── profile.service.ts
│       ├── meal-plan.service.ts
│       ├── image-analysis.service.ts
│       ├── settings.service.ts
│       └── ai/
│           ├── ai-client.ts         # Factory — resolves provider from settings
│           ├── providers/
│           │   ├── openai.provider.ts
│           │   ├── anthropic.provider.ts
│           │   ├── google.provider.ts
│           │   └── ollama.provider.ts
│           └── ai-provider.interface.ts
├── src/                         # Renderer process
│   ├── main.ts                  # Vue app bootstrap
│   ├── App.vue
│   ├── router/                  # Vue Router routes
│   ├── stores/                  # Pinia stores
│   │   ├── profile.store.ts
│   │   ├── meal-plan.store.ts
│   │   ├── settings.store.ts
│   │   └── ui.store.ts
│   ├── views/                   # Route-level page components
│   │   ├── OnboardingView.vue
│   │   ├── DashboardView.vue
│   │   ├── PlanView.vue
│   │   ├── MealDetailView.vue
│   │   └── SettingsView.vue
│   ├── components/              # Dumb, reusable UI components
│   │   ├── base/                # Atoms: Button, Input, Badge, Card…
│   │   ├── forms/               # Molecules: StepForm, TagInput…
│   │   ├── meal/                # Meal-specific: MealCard, IngredientList…
│   │   └── layout/              # Shell, Sidebar, PageHeader…
│   ├── composables/             # Shared Vue composables
│   ├── types/                   # Shared TypeScript types/interfaces
│   └── assets/
├── features/                    # Feature design documents (MD files)
├── stories/                     # Storybook stories (co-located or here)
├── tests/
│   ├── unit/
│   └── e2e/
├── .cursor/rules/               # Cursor AI rules
├── electron-builder.config.ts
├── vite.config.ts
└── DESIGN.md
```

### Data Model

```typescript
// User profile — persisted via electron-store
interface UserProfile {
  id: string
  name: string
  age: number
  sex: 'male' | 'female' | 'other'
  weightKg: number
  heightCm: number
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active'
  goals: NutritionGoal[] // e.g. 'lose_weight', 'build_muscle'
  diets: DietType[] // e.g. 'vegan', 'keto', 'gluten_free'
  allergies: string[] // e.g. 'peanuts', 'shellfish'
  nutritionPreferences: string[] // e.g. 'low_sodium', 'high_protein'
  onboardingCompleted: boolean
}

// A single meal within a daily plan
interface Meal {
  id: string
  slot: 'breakfast' | 'lunch' | 'dinner' | 'snack'
  name: string
  description: string
  ingredients: Ingredient[]
  macros: Macros
  photoPath?: string // local path after user attaches photo
  photoAnalysis?: PhotoAnalysis
}

interface Ingredient {
  name: string
  quantity: string
  unit: string
  macros: Macros
}

interface Macros {
  kcal: number
  proteinG: number
  carbsG: number
  fatG: number
}

// One day in the plan
interface DayPlan {
  date: string // ISO date string
  meals: Meal[]
  totalMacros: Macros
}

// Full plan for a selected period
interface MealPlan {
  id: string
  createdAt: string
  periodStart: string
  periodEnd: string
  days: DayPlan[]
}

interface PhotoAnalysis {
  summary: string
  estimatedMacros: Macros
  notes: string
}

// AI provider configuration — persisted via electron-store
// API keys are stored encrypted; never sent to the renderer
type AIProviderName = 'openai' | 'anthropic' | 'google' | 'ollama'

interface AISettings {
  provider: AIProviderName
  model: string // e.g. 'gpt-4o', 'claude-3-5-sonnet-latest'
  apiKey?: string // not required for Ollama (local)
  ollamaBaseUrl?: string // only for Ollama; defaults to http://localhost:11434
}

// Available models per provider (used to populate the settings UI)
const PROVIDER_MODELS: Record<AIProviderName, string[]> = {
  openai: ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo'],
  anthropic: ['claude-3-5-sonnet-latest', 'claude-3-5-haiku-latest', 'claude-3-opus-latest'],
  google: ['gemini-2.0-flash', 'gemini-2.0-pro'],
  ollama: [], // populated dynamically by querying the local Ollama instance
}
```

### IPC Channel Contract

All channels are typed via a shared `IpcChannels` interface exposed through `window.api` in the renderer.

```
profile:get              → UserProfile | null
profile:save             → void
meal-plan:generate       → MealPlan
meal-plan:get            → MealPlan[]
meal-plan:update         → MealPlan
meal:replace             → Meal
meal:analyze-photo       → PhotoAnalysis
settings:get             → AISettings
settings:save            → void
settings:test-connection → { ok: boolean; error?: string }
settings:list-models     → string[]   // for Ollama: queries local instance
```

> **Security note**: the renderer never receives raw API keys. `settings:get` returns the `AISettings` object with the `apiKey` field replaced by a boolean `hasApiKey: boolean`. Keys are only read in the main process when constructing provider clients.

---

## Feature Design Process

Every new feature must have a design document in `features/<feature-name>.md` before implementation begins. See `.cursor/rules/` for enforced guidance.

---

## Implementation Plan

### Phase 0 — Project Scaffolding

- [x] Initialise Electron + Vite + Vue 3 project using `electron-vite` scaffold
- [x] Configure TypeScript (strict mode) for both main and renderer processes
- [x] Install and configure Tailwind CSS with a base design token config (colours, spacing, typography)
- [x] Install and configure Storybook with `@storybook/vue3-vite` builder
- [x] Install Pinia and Vue Router; wire into the Vue app entry point
- [x] Install VeeValidate and Zod; create shared schema utilities
- [x] Install electron-store; create a typed `StorageService` wrapper
- [x] Install Vercel AI SDK (`ai`) and provider packages (`@ai-sdk/openai`, `@ai-sdk/anthropic`, `@ai-sdk/google`, `ollama-ai-provider`)
- [x] Install Vitest and Vue Test Utils; create initial test runner config
- [x] Install Playwright for E2E; create basic smoke test
- [x] Set up ESLint + Prettier with Vue and TypeScript rules
- [x] Create `.cursor/rules/` and add project cursor rules
- [x] Create the `features/` directory with a `FEATURE_TEMPLATE.md`

### Phase 1 — Core Infrastructure

- [x] Implement `main.ts` (main process): create `BrowserWindow`, handle app lifecycle
- [x] Implement `preload.ts`: expose typed `window.api` via `contextBridge`
- [x] Define all IPC channel names in a shared `ipc-channels.ts` constants file
- [x] Implement `StorageService` wrapping `electron-store` with typed get/set/delete
- [x] Implement `settings.service.ts`: CRUD for `AISettings`, API key stored encrypted, never exposed to renderer
- [x] Implement `settings.ipc.ts`: register `settings:get`, `settings:save`, `settings:test-connection`, `settings:list-models` handlers
- [x] Implement `ai-provider.interface.ts`: define `AIProvider` interface with `chat()` and `vision()` method signatures
- [x] Implement provider adapters — `openai.provider.ts`, `anthropic.provider.ts`, `google.provider.ts`, `ollama.provider.ts` — each wrapping the corresponding Vercel AI SDK provider
- [x] Implement `ai-client.ts` factory: reads `AISettings` from `StorageService`, instantiates and returns the correct provider adapter
- [x] Implement Vue Router with named routes: `onboarding`, `dashboard`, `plan`, `meal-detail`, `settings`
- [x] Implement `settings.store.ts` (renderer): fetch AI settings, expose `hasApiKey`, expose provider/model for display; never hold raw API key
- [x] Implement `ui.store.ts`: loading states, toast notifications, modal control
- [x] Build base UI component set (with Storybook stories for each):
  - [x] `BaseButton` — variants: primary, secondary, ghost, danger; sizes: sm, md, lg
  - [x] `BaseInput` — text, number, textarea; with label, error, hint slots
  - [x] `BaseSelect` — single and multi-select
  - [x] `BaseTagInput` — for allergies, preferences
  - [x] `BaseBadge` — for diet tags, goal labels
  - [x] `BaseCard` — container with header/body/footer slots
  - [x] `BaseModal` — accessible dialog with backdrop
  - [x] `BaseToast` — notification system
  - [x] `BaseSpinner` / `BaseSkeletonLoader`
  - [x] `PageHeader` — title + optional actions slot
  - [x] `AppSidebar` — navigation links
  - [x] `AppShell` — root layout composing sidebar + content area

### Phase 2 — User Onboarding

- [ ] Design `features/onboarding.md` with full flow specification
- [ ] Implement `profile.service.ts` (main process): CRUD operations on `UserProfile` via `StorageService`
- [ ] Implement `profile.ipc.ts`: register `profile:get` and `profile:save` handlers
- [ ] Implement `profile.store.ts` (renderer): fetch, cache and mutate profile via IPC
- [ ] Build `OnboardingView.vue` as a multi-step wizard using `StepForm` component
- [ ] Build onboarding step components (each with Storybook story):
  - [ ] `StepWelcome` — greeting, app introduction
  - [ ] `StepPersonalInfo` — name, age, sex, weight, height
  - [ ] `StepActivityLevel` — visual selector card group
  - [ ] `StepGoals` — multi-select goal picker
  - [ ] `StepDiets` — diet type selector with descriptions
  - [ ] `StepAllergies` — tag input with common allergy suggestions
  - [ ] `StepPreferences` — nutrition preferences tag input
  - [ ] `StepSummary` — review all data before saving
- [ ] Validate each step with Zod schemas via VeeValidate
- [ ] On completion, save profile and redirect to `DashboardView`
- [ ] Guard routes: redirect unauthenticated (no profile) users to onboarding

### Phase 3 — Meal Planning Engine

- [ ] Design `features/meal-planning.md` with AI prompt strategy and plan structure
- [ ] Implement `meal-plan.service.ts` (main process):
  - [ ] Build structured prompt from `UserProfile` + requested period (provider-agnostic)
  - [ ] Use `ai-client.ts` factory to obtain the active provider at request time
  - [ ] Parse and validate AI response into `MealPlan` type (Zod schema)
  - [ ] Persist generated plan via `StorageService`
  - [ ] Implement `getMealPlans()` and `updateMealPlan()` methods
- [ ] Implement `meal-plan.ipc.ts`: register `meal-plan:generate`, `meal-plan:get`, `meal-plan:update`
- [ ] Implement `meal-plan.store.ts` (renderer): manage plan list, active plan, loading state
- [ ] Build `DashboardView.vue`:
  - [ ] `PlanPeriodPicker` component — date range selector
  - [ ] `GeneratePlanButton` — triggers generation with loading state
  - [ ] `PlanSummaryCard` — shows existing plans, links to `PlanView`
- [ ] Build `PlanView.vue`:
  - [ ] `DayColumn` — lists meals for a given day
  - [ ] `MealCard` — displays meal name, macros, photo thumbnail; action buttons
  - [ ] `MacrosSummaryBar` — daily total macros visualisation
- [ ] Build `MealDetailView.vue`:
  - [ ] `IngredientList` — editable list of ingredients
  - [ ] `MacrosBreakdown` — donut chart or bar breakdown
  - [ ] `PhotoAttachment` — photo display and upload trigger

### Phase 4 — Meal Photo Analysis

- [ ] Design `features/photo-analysis.md` with vision prompt strategy and UX flow
- [ ] Implement `image-analysis.service.ts` (main process):
  - [ ] Accept local image path, read as base64
  - [ ] Use `ai-client.ts` factory to obtain the active provider; call its `vision()` method with meal context (slot, plan day)
  - [ ] Guard: if the configured model does not support vision, return a user-friendly error via IPC
  - [ ] Parse response into `PhotoAnalysis` type
  - [ ] Attach analysis and photo path to the relevant `Meal` object and persist
- [ ] Implement `image-analysis.ipc.ts`: register `meal:analyze-photo` handler
- [ ] Add Electron native file-open dialog trigger for image selection
- [ ] Build `PhotoUploadButton` component — triggers dialog, shows preview, triggers analysis
- [ ] Display `PhotoAnalysis` result within `MealDetailView`
- [ ] Show estimated macros from photo alongside planned macros for comparison

### Phase 5 — Plan Modification

- [ ] Design `features/plan-modification.md` with replacement logic and UX
- [ ] Implement `meal:replace` IPC handler in `meal-plan.service.ts`:
  - [ ] Accept meal ID + optional ingredient to replace + user constraints
  - [ ] Use `ai-client.ts` factory; prompt for a single replacement that respects profile
  - [ ] Patch the persisted plan and return updated `Meal`
- [ ] Build `ReplaceMealModal` component:
  - [ ] Optional reason field (e.g. "I don't have salmon")
  - [ ] Shows AI-suggested replacement with macros
  - [ ] Confirm / cancel actions
- [ ] Build `ReplaceIngredientModal` component — same pattern, ingredient scope
- [ ] Integrate replace actions into `MealCard` and `IngredientList` components
- [ ] Update `meal-plan.store.ts` to patch plan reactively after replacement

### Phase 6 — Settings & AI Provider Configuration

- [ ] Design `features/ai-provider-settings.md` with provider/model UX and security considerations
- [ ] Add `SettingsView.vue` to the router and sidebar navigation
- [ ] Build settings UI components (each with Storybook story):
  - [ ] `ProviderSelector` — card-based selector for OpenAI / Anthropic / Google / Ollama
  - [ ] `ModelSelector` — dropdown populated from `PROVIDER_MODELS` or `settings:list-models` (Ollama)
  - [ ] `ApiKeyInput` — masked input; shows only whether a key is saved, never the value
  - [ ] `OllamaUrlInput` — base URL field, shown only when Ollama is selected
  - [ ] `ConnectionTestButton` — calls `settings:test-connection`, shows success/error inline
- [ ] On save, call `settings:save` IPC and update `settings.store.ts`
- [ ] Guard meal-plan generation and photo analysis: if no valid AI configuration exists, redirect user to Settings with an explanatory message
- [ ] Handle mid-session provider changes gracefully: new requests always pick up the latest settings via the `ai-client.ts` factory

### Phase 7 — Testing & Quality

- [ ] Write unit tests for all `*.service.ts` files (main process business logic)
- [ ] Write unit tests for `settings.service.ts`: verify API key encryption, provider resolution, and `test-connection` logic
- [ ] Write unit tests for the `ai/` provider adapters using mocked Vercel AI SDK responses
- [ ] Write unit tests for all Pinia stores
- [ ] Write component tests for all non-trivial components using Vue Test Utils
- [ ] Achieve ≥ 80% line coverage on services and stores
- [ ] Write E2E tests with Playwright:
  - [ ] Onboarding happy path
  - [ ] Settings — configure provider, save API key, run connection test
  - [ ] Plan generation and display
  - [ ] Meal replacement flow
  - [ ] Photo attachment flow
  - [ ] Guard redirect when no AI provider is configured
- [ ] Review and complete Storybook coverage for all components in `src/components/`
- [ ] Run accessibility audit (axe-core Storybook addon) on all stories

### Phase 8 — Polish & Release Prep

- [ ] Implement app auto-update via `electron-updater`
- [ ] Add onboarding re-entry flow ("Edit my profile") in settings
- [ ] Add plan history view — browse and restore past plans
- [ ] Add export feature — export plan as PDF or markdown
- [ ] Implement error boundary at view level with user-friendly fallback UI
- [ ] Add empty states for all list views (no plans yet, no meals, etc.)
- [ ] Ensure all user-facing strings are ready for i18n extraction (`vue-i18n`)
- [ ] Configure `electron-builder` for macOS, Windows, and Linux targets
- [ ] Final performance review — bundle size, startup time, IPC round-trip latency

---

## Engineering Principles

1. **Dumb components**: All components in `src/components/` are purely presentational. They receive data via props and emit events. They have no direct Pinia or IPC dependencies.
2. **Views are composers**: `src/views/` components are the only layer that connects stores and IPC to the component tree.
3. **Storybook parity**: Every component in `src/components/` has at least one story. Stories must cover default state and all meaningful variants.
4. **Design before build**: Every feature starts as a markdown document in `features/`. Implementation does not begin until the design is approved.
5. **Typed IPC**: The preload bridge and IPC handlers share a single `IpcChannels` type definition. No `any` on IPC boundaries.
6. **Main process is the trust boundary**: All AI API calls, file I/O, and data persistence happen in the main process. The renderer only sends and receives plain serialisable objects.
7. **Zod at every boundary**: AI responses and IPC payloads are validated with Zod before being used.
8. **Provider-agnostic AI layer**: No service or IPC handler imports a provider SDK directly. All AI calls go through the `ai-client.ts` factory, which resolves the active provider from persisted settings at call time. Adding a new provider means implementing `AIProvider` and registering it in the factory — nothing else changes.
9. **API keys never leave the main process**: The renderer only knows whether a key exists (`hasApiKey: boolean`). Keys are stored encrypted and only read in the main process when constructing provider clients.
