<script setup lang="ts">
import BaseBadge from '@/components/base/BaseBadge.vue'
import type { UserProfile } from '@/types/profile'
import type { ActivityLevel, NutritionGoal, DietType } from '@/types/profile'

defineProps<{
  profile: Omit<UserProfile, 'id' | 'createdAt' | 'updatedAt'>
}>()

const activityLabels: Record<ActivityLevel, string> = {
  sedentary: 'Sedentary',
  light: 'Light',
  moderate: 'Moderate',
  active: 'Active',
  very_active: 'Very Active',
}

const goalLabels: Record<NutritionGoal, string> = {
  lose_weight: 'Lose weight',
  maintain_weight: 'Maintain weight',
  build_muscle: 'Build muscle',
  improve_endurance: 'Improve endurance',
  eat_healthier: 'Eat healthier',
}

const dietLabels: Record<DietType, string> = {
  none: 'None',
  vegetarian: 'Vegetarian',
  vegan: 'Vegan',
  pescatarian: 'Pescatarian',
  keto: 'Keto',
  paleo: 'Paleo',
  gluten_free: 'Gluten Free',
  dairy_free: 'Dairy Free',
  low_carb: 'Low Carb',
  mediterranean: 'Mediterranean',
}
</script>

<template>
  <div class="space-y-6">
    <h3 class="text-lg font-semibold">Review your profile</h3>
    <dl class="space-y-4">
      <div>
        <dt class="text-sm font-medium text-neutral-500">Name</dt>
        <dd class="text-neutral-900">
          {{ profile.name }}
        </dd>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <dt class="text-sm font-medium text-neutral-500">Age</dt>
          <dd class="text-neutral-900">
            {{ profile.age }}
          </dd>
        </div>
        <div>
          <dt class="text-sm font-medium text-neutral-500">Sex</dt>
          <dd class="text-neutral-900 capitalize">
            {{ profile.sex }}
          </dd>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <dt class="text-sm font-medium text-neutral-500">Weight</dt>
          <dd class="text-neutral-900">{{ profile.weightKg }} kg</dd>
        </div>
        <div>
          <dt class="text-sm font-medium text-neutral-500">Height</dt>
          <dd class="text-neutral-900">{{ profile.heightCm }} cm</dd>
        </div>
      </div>
      <div>
        <dt class="text-sm font-medium text-neutral-500">Activity level</dt>
        <dd class="text-neutral-900">
          {{ activityLabels[profile.activityLevel] }}
        </dd>
      </div>
      <div>
        <dt class="text-sm font-medium text-neutral-500">Goals</dt>
        <dd class="flex flex-wrap gap-1">
          <BaseBadge v-for="g in profile.goals" :key="g" :label="goalLabels[g]" variant="brand" />
        </dd>
      </div>
      <div v-if="profile.diets.length">
        <dt class="text-sm font-medium text-neutral-500">Diets</dt>
        <dd class="flex flex-wrap gap-1">
          <BaseBadge v-for="d in profile.diets" :key="d" :label="dietLabels[d]" variant="neutral" />
        </dd>
      </div>
      <div v-if="profile.allergies.length">
        <dt class="text-sm font-medium text-neutral-500">Allergies</dt>
        <dd class="flex flex-wrap gap-1">
          <BaseBadge v-for="a in profile.allergies" :key="a" :label="a" variant="danger" />
        </dd>
      </div>
      <div v-if="profile.nutritionPreferences.length">
        <dt class="text-sm font-medium text-neutral-500">Preferences</dt>
        <dd class="flex flex-wrap gap-1">
          <BaseBadge v-for="p in profile.nutritionPreferences" :key="p" :label="p" variant="info" />
        </dd>
      </div>
    </dl>
  </div>
</template>
