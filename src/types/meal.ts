export type MealSlot = 'breakfast' | 'lunch' | 'dinner' | 'snack'

export interface Macros {
  kcal: number
  proteinG: number
  carbsG: number
  fatG: number
}

export interface Ingredient {
  name: string
  quantity: string
  unit: string
  macros: Macros
}

export interface PhotoAnalysis {
  summary: string
  estimatedMacros: Macros
  notes: string
  analyzedAt: string
}

export interface Meal {
  id: string
  slot: MealSlot
  name: string
  description: string
  ingredients: Ingredient[]
  macros: Macros
  photoPath?: string
  photoAnalysis?: PhotoAnalysis
}

export interface DayPlan {
  date: string
  meals: Meal[]
  totalMacros: Macros
}

export interface MealPlan {
  id: string
  createdAt: string
  periodStart: string
  periodEnd: string
  days: DayPlan[]
}
