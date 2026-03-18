<script setup lang="ts">
import type { NutritionGoal } from '@/types/profile'

defineProps<{
  modelValue: NutritionGoal[]
}>()
defineEmits<{ 'update:modelValue': [value: NutritionGoal[]] }>()

const goals: { value: NutritionGoal; label: string }[] = [
  { value: 'lose_weight', label: 'Lose weight' },
  { value: 'maintain_weight', label: 'Maintain weight' },
  { value: 'build_muscle', label: 'Build muscle' },
  { value: 'improve_endurance', label: 'Improve endurance' },
  { value: 'eat_healthier', label: 'Eat healthier' },
]
</script>

<template>
  <div class="space-y-4">
    <h3 class="text-lg font-semibold">Nutrition goals</h3>
    <p class="text-sm text-neutral-600">Select at least one goal.</p>
    <div class="flex flex-wrap gap-2">
      <button
        v-for="opt in goals"
        :key="opt.value"
        type="button"
        class="rounded-lg border-2 px-4 py-2 text-sm font-medium transition-colors"
        :class="
          modelValue.includes(opt.value)
            ? 'border-brand-500 bg-brand-50 text-brand-700'
            : 'border-neutral-200 text-neutral-600 hover:border-neutral-300'
        "
        @click="
          $emit(
            'update:modelValue',
            modelValue.includes(opt.value)
              ? modelValue.filter((g) => g !== opt.value)
              : [...modelValue, opt.value],
          )
        "
      >
        {{ opt.label }}
      </button>
    </div>
  </div>
</template>
