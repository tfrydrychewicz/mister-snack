# Feature: User Onboarding

> **Status**: Approved
> **Author**: Phase 2 implementation
> **Date**: 2025-03-18

---

## Purpose

The onboarding flow collects the user's nutritional profile (demographics, activity level, goals, diets, allergies, preferences) so the meal planning engine can generate personalised recommendations. Without a completed profile, the app cannot produce relevant meal plans. Onboarding is a one-time wizard; users without a profile are redirected to it.

---

## User Journey

1. User opens the app. If no profile exists, they are redirected to `/onboarding`.
2. User sees StepWelcome — greeting and brief app introduction. Clicks "Get started".
3. StepPersonalInfo — enters name, age, sex, weight, height. Validates and continues.
4. StepActivityLevel — selects one of: sedentary, light, moderate, active, very_active via card group.
5. StepGoals — multi-select at least one goal (lose_weight, maintain_weight, build_muscle, etc.).
6. StepDiets — selects diet type(s), e.g. vegan, gluten_free, none. Optional.
7. StepAllergies — tag input with common suggestions (peanuts, shellfish, dairy, etc.).
8. StepPreferences — tag input for nutrition preferences (low_sodium, high_protein, etc.).
9. StepSummary — reviews all entered data. Can go back to edit or click "Complete" to save.
10. On completion, profile is saved with `onboardingCompleted: true`, user is redirected to Dashboard.

---

## Data Model Changes

Uses existing `UserProfile` from `src/types/profile.ts`. No schema changes.

Profile creation: service generates `id` (uuid), `createdAt`, `updatedAt` (ISO strings).

---

## Component Breakdown

| Component         | Type     | Storybook story? | Notes                                 |
| ----------------- | -------- | ---------------- | ------------------------------------- |
| StepForm          | New      | Yes              | Wizard container, step indicator, nav |
| StepWelcome       | New      | Yes              | Intro text, "Get started" CTA         |
| StepPersonalInfo  | New      | Yes              | Uses BaseInput, BaseSelect            |
| StepActivityLevel | New      | Yes              | Card group selector                   |
| StepGoals         | New      | Yes              | Multi-select using BaseBadge/cards    |
| StepDiets         | New      | Yes              | Selector with descriptions            |
| StepAllergies     | New      | Yes              | BaseTagInput + suggestions            |
| StepPreferences   | New      | Yes              | BaseTagInput                          |
| StepSummary       | New      | Yes              | Read-only review layout               |
| OnboardingView    | Modified | —                | Composes steps, uses profile.store    |
| BaseInput         | Reuse    | —                | Text, number, select                  |
| BaseSelect        | Reuse    | —                | Sex selector                          |
| BaseTagInput      | Reuse    | —                | Allergies, preferences                |
| BaseButton        | Reuse    | —                | Next, Back, Complete                  |
| BaseCard          | Reuse    | —                | Activity level cards                  |

---

## IPC Changes

| Channel        | Direction       | Payload       | Response              |
| -------------- | --------------- | ------------- | --------------------- |
| `profile:get`  | renderer → main | —             | `UserProfile \| null` |
| `profile:save` | renderer → main | `UserProfile` | `void`                |

---

## Store Changes

New `profile.store.ts`: fetches profile via IPC, caches, exposes `profile`, `fetchProfile()`, `saveProfile()`, `hasProfile` computed. Used by OnboardingView and route guard.

---

## Composables

`useOnboardingSteps` (optional): manages current step index, step list, next/back navigation. Could live in OnboardingView or be extracted if reused.

---

## Route Guard

- Before each route (except onboarding), check if profile exists and `onboardingCompleted === true`.
- If not: redirect to `/onboarding`.
- Onboarding route: if profile exists and completed, redirect to `/dashboard` (allow re-entry for editing in Phase 8).

---

## Validation

Each step validated with Zod via VeeValidate `toTypedSchema`. Schemas in `src/types/schemas.ts` (extend with step-specific partial schemas as needed). `userProfileSchema` defines full validation.

---

## Acceptance Criteria

- [ ] No profile → redirect to onboarding
- [ ] Completed onboarding → redirect to dashboard
- [ ] All steps validate before advancing
- [ ] StepSummary shows all data; user can go back
- [ ] On completion, profile persisted with onboardingCompleted: true
- [ ] Route guard prevents access to dashboard/plan/settings without profile
