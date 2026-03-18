<script setup lang="ts">
import BaseInput from '@/components/base/BaseInput.vue'
import BaseSelect from '@/components/base/BaseSelect.vue'
import type { UserProfile } from '@/types/profile'

defineProps<{
  modelValue: Pick<UserProfile, 'name' | 'age' | 'sex' | 'weightKg' | 'heightCm'>
}>()
defineEmits<{
  'update:modelValue': [value: Pick<UserProfile, 'name' | 'age' | 'sex' | 'weightKg' | 'heightCm'>]
}>()
</script>

<template>
  <div class="space-y-4">
    <h3 class="text-lg font-semibold">About you</h3>
    <BaseInput
      :model-value="modelValue.name"
      label="Name"
      placeholder="Your name"
      @update:model-value="$emit('update:modelValue', { ...modelValue, name: $event as string })"
    />
    <BaseInput
      :model-value="modelValue.age"
      type="number"
      label="Age"
      placeholder="25"
      @update:model-value="
        $emit('update:modelValue', {
          ...modelValue,
          age: typeof $event === 'number' ? $event : Number($event),
        })
      "
    />
    <BaseSelect
      :model-value="modelValue.sex"
      label="Sex"
      :options="[
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'other', label: 'Other' },
      ]"
      @update:model-value="
        $emit('update:modelValue', {
          ...modelValue,
          sex: $event as 'male' | 'female' | 'other',
        })
      "
    />
    <div class="grid grid-cols-2 gap-4">
      <BaseInput
        :model-value="modelValue.weightKg"
        type="number"
        label="Weight (kg)"
        placeholder="70"
        @update:model-value="
          $emit('update:modelValue', {
            ...modelValue,
            weightKg: typeof $event === 'number' ? $event : Number($event) || 0,
          })
        "
      />
      <BaseInput
        :model-value="modelValue.heightCm"
        type="number"
        label="Height (cm)"
        placeholder="170"
        @update:model-value="
          $emit('update:modelValue', {
            ...modelValue,
            heightCm: typeof $event === 'number' ? $event : Number($event) || 0,
          })
        "
      />
    </div>
  </div>
</template>
