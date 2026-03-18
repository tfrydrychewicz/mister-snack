<script setup lang="ts">
import BaseTagInput from '@/components/base/BaseTagInput.vue'

defineProps<{
  modelValue: string[]
}>()
defineEmits<{ 'update:modelValue': [value: string[]] }>()

const commonAllergies = ['peanuts', 'tree nuts', 'shellfish', 'dairy', 'eggs', 'gluten', 'soy']
</script>

<template>
  <div class="space-y-4">
    <h3 class="text-lg font-semibold">Allergies</h3>
    <p class="text-sm text-neutral-600">
      List any food allergies. Add from suggestions or type your own.
    </p>
    <BaseTagInput
      :model-value="modelValue"
      :suggestions="commonAllergies"
      placeholder="Type and press Enter"
      @update:model-value="$emit('update:modelValue', $event)"
    />
  </div>
</template>
