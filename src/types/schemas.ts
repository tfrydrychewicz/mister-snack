import { z } from 'zod'

// ── Primitive schemas ────────────────────────────────────────────────────────

export const macrosSchema = z.object({
  kcal: z.number().nonnegative(),
  proteinG: z.number().nonnegative(),
  carbsG: z.number().nonnegative(),
  fatG: z.number().nonnegative(),
})

// ── Profile schemas ──────────────────────────────────────────────────────────

export const activityLevelSchema = z.enum([
  'sedentary',
  'light',
  'moderate',
  'active',
  'very_active',
])

export const nutritionGoalSchema = z.enum([
  'lose_weight',
  'maintain_weight',
  'build_muscle',
  'improve_endurance',
  'eat_healthier',
])

export const dietTypeSchema = z.enum([
  'none',
  'vegetarian',
  'vegan',
  'pescatarian',
  'keto',
  'paleo',
  'gluten_free',
  'dairy_free',
  'low_carb',
  'mediterranean',
])

export const userProfileSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, 'Name is required'),
  age: z.number().int().min(1).max(120),
  sex: z.enum(['male', 'female', 'other']),
  weightKg: z.number().positive(),
  heightCm: z.number().positive(),
  activityLevel: activityLevelSchema,
  goals: z.array(nutritionGoalSchema).min(1, 'Select at least one goal'),
  diets: z.array(dietTypeSchema),
  allergies: z.array(z.string()),
  nutritionPreferences: z.array(z.string()),
  onboardingCompleted: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
})

// ── Meal schemas ─────────────────────────────────────────────────────────────

export const mealSlotSchema = z.enum(['breakfast', 'lunch', 'dinner', 'snack'])

export const ingredientSchema = z.object({
  name: z.string().min(1),
  quantity: z.string().min(1),
  unit: z.string(),
  macros: macrosSchema,
})

export const photoAnalysisSchema = z.object({
  summary: z.string(),
  estimatedMacros: macrosSchema,
  notes: z.string(),
  analyzedAt: z.string().datetime(),
})

export const mealSchema = z.object({
  id: z.string().uuid(),
  slot: mealSlotSchema,
  name: z.string().min(1),
  description: z.string(),
  ingredients: z.array(ingredientSchema),
  macros: macrosSchema,
  photoPath: z.string().optional(),
  photoAnalysis: photoAnalysisSchema.optional(),
})

export const dayPlanSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  meals: z.array(mealSchema),
  totalMacros: macrosSchema,
})

export const mealPlanSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.string().datetime(),
  periodStart: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  periodEnd: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  days: z.array(dayPlanSchema),
})

// ── AI settings schema ───────────────────────────────────────────────────────

export const aiProviderNameSchema = z.enum(['openai', 'anthropic', 'google', 'ollama'])

export const aiSettingsSchema = z.object({
  provider: aiProviderNameSchema,
  model: z.string().min(1),
  apiKey: z.string().optional(),
  ollamaBaseUrl: z.string().url().optional(),
})

// ── Inferred types (convenience re-exports for use in forms) ─────────────────

export type UserProfileFormData = z.infer<typeof userProfileSchema>
export type AISettingsFormData = z.infer<typeof aiSettingsSchema>
