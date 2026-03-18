<script setup lang="ts">
import type { ActivityLevel } from '@/types/profile'

defineProps<{
  modelValue: ActivityLevel | ''
}>()
defineEmits<{ 'update:modelValue': [value: ActivityLevel] }>()

const levels: { value: ActivityLevel; label: string; description: string }[] = [
  { value: 'sedentary', label: 'Sedentary', description: 'Little or no exercise' },
  {
    value: 'light',
    label: 'Light',
    description: 'Light exercise 1–3 days/week',
  },
  {
    value: 'moderate',
    label: 'Moderate',
    description: 'Moderate exercise 3–5 days/week',
  },
  {
    value: 'active',
    label: 'Active',
    description: 'Hard exercise 6–7 days/week',
  },
  {
    value: 'very_active',
    label: 'Very Active',
    description: 'Very hard exercise, physical job',
  },
]
</script>

<template>
  <div class="space-y-4">
    <h3 class="text-lg font-semibold">Activity level</h3>
    <div class="grid gap-3">
      <button
        v-for="opt in levels"
        :key="opt.value"
        type="button"
        class="flex flex-col items-start rounded-xl border-2 p-4 text-left transition-colors"
        :class="
          modelValue === opt.value
            ? 'border-brand-500 bg-brand-50'
            : 'border-neutral-200 hover:border-neutral-300'
        "
        @click="$emit('update:modelValue', opt.value)"
      >
        <span class="font-medium text-neutral-900">{{ opt.label }}</span>
        <span class="text-sm text-neutral-600">{{ opt.description }}</span>
      </button>
    </div>
  </div>
</template>
