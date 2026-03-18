export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active'

export type NutritionGoal =
  | 'lose_weight'
  | 'maintain_weight'
  | 'build_muscle'
  | 'improve_endurance'
  | 'eat_healthier'

export type DietType =
  | 'none'
  | 'vegetarian'
  | 'vegan'
  | 'pescatarian'
  | 'keto'
  | 'paleo'
  | 'gluten_free'
  | 'dairy_free'
  | 'low_carb'
  | 'mediterranean'

export interface UserProfile {
  id: string
  name: string
  age: number
  sex: 'male' | 'female' | 'other'
  weightKg: number
  heightCm: number
  activityLevel: ActivityLevel
  goals: NutritionGoal[]
  diets: DietType[]
  allergies: string[]
  nutritionPreferences: string[]
  onboardingCompleted: boolean
  createdAt: string
  updatedAt: string
}
