<script setup lang="ts">
import BaseTagInput from '@/components/base/BaseTagInput.vue'

defineProps<{
  modelValue: string[]
}>()
defineEmits<{ 'update:modelValue': [value: string[]] }>()

const commonPrefs = [
  'low_sodium',
  'high_protein',
  'high_fiber',
  'low_sugar',
  'organic',
  'quick_meals',
]
</script>

<template>
  <div class="space-y-4">
    <h3 class="text-lg font-semibold">Nutrition preferences</h3>
    <p class="text-sm text-neutral-600">
      Any dietary preferences or habits. Add from suggestions or type your own.
    </p>
    <BaseTagInput
      :model-value="modelValue"
      :suggestions="commonPrefs"
      placeholder="Type and press Enter"
      @update:model-value="$emit('update:modelValue', $event)"
    />
  </div>
</template>
