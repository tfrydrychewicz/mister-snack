<script setup lang="ts">
import type { DietType } from '@/types/profile'

defineProps<{
  modelValue: DietType[]
}>()
defineEmits<{ 'update:modelValue': [value: DietType[]] }>()

const diets: { value: DietType; label: string; description: string }[] = [
  { value: 'none', label: 'None', description: 'No restrictions' },
  {
    value: 'vegetarian',
    label: 'Vegetarian',
    description: 'No meat or fish',
  },
  { value: 'vegan', label: 'Vegan', description: 'No animal products' },
  {
    value: 'pescatarian',
    label: 'Pescatarian',
    description: 'Fish and seafood only',
  },
  { value: 'keto', label: 'Keto', description: 'Low carb, high fat' },
  { value: 'paleo', label: 'Paleo', description: 'Whole foods focus' },
  {
    value: 'gluten_free',
    label: 'Gluten Free',
    description: 'No gluten',
  },
  {
    value: 'dairy_free',
    label: 'Dairy Free',
    description: 'No dairy',
  },
  {
    value: 'low_carb',
    label: 'Low Carb',
    description: 'Reduced carbohydrates',
  },
  {
    value: 'mediterranean',
    label: 'Mediterranean',
    description: 'Mediterranean diet',
  },
]
</script>

<template>
  <div class="space-y-4">
    <h3 class="text-lg font-semibold">Diet preferences</h3>
    <p class="text-sm text-neutral-600">Select any that apply.</p>
    <div class="grid gap-3 sm:grid-cols-2">
      <button
        v-for="opt in diets"
        :key="opt.value"
        type="button"
        class="flex flex-col items-start rounded-xl border-2 p-3 text-left transition-colors"
        :class="
          modelValue.includes(opt.value)
            ? 'border-brand-500 bg-brand-50'
            : 'border-neutral-200 hover:border-neutral-300'
        "
        @click="
          $emit(
            'update:modelValue',
            modelValue.includes(opt.value)
              ? modelValue.filter((d) => d !== opt.value)
              : [...modelValue, opt.value],
          )
        "
      >
        <span class="font-medium text-neutral-900">{{ opt.label }}</span>
        <span class="text-xs text-neutral-600">{{ opt.description }}</span>
      </button>
    </div>
  </div>
</template>
