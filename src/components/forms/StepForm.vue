<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue'

defineProps<{
  currentStep: number
  totalSteps: number
  canGoBack?: boolean
  canGoNext?: boolean
  isLastStep?: boolean
  nextLabel?: string
  backLabel?: string
}>()
defineEmits<{ back: []; next: []; complete: [] }>()
</script>

<template>
  <div class="flex flex-col">
    <div class="mb-8 flex gap-2">
      <button
        v-for="i in totalSteps"
        :key="i"
        type="button"
        class="h-2 flex-1 rounded-full transition-colors"
        :class="
          i - 1 === currentStep
            ? 'bg-brand-500'
            : i - 1 < currentStep
              ? 'bg-brand-300'
              : 'bg-neutral-200'
        "
        aria-label="Step {{ i }}"
      />
    </div>
    <div class="flex-1">
      <slot />
    </div>
    <div class="mt-8 flex justify-between gap-4">
      <BaseButton
        v-if="canGoBack"
        :label="backLabel ?? 'Back'"
        variant="ghost"
        @click="$emit('back')"
      />
      <div v-else />
      <BaseButton v-if="isLastStep" label="Complete" variant="primary" @click="$emit('complete')" />
      <BaseButton
        v-else-if="canGoNext"
        :label="nextLabel ?? 'Next'"
        variant="primary"
        @click="$emit('next')"
      />
    </div>
  </div>
</template>
