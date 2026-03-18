<script setup lang="ts">
defineProps<{
  message: string
  variant?: 'success' | 'error' | 'warning' | 'info'
}>()
defineEmits<{ dismiss: [] }>()
</script>

<template>
  <div
    role="alert"
    class="flex items-center gap-3 rounded-lg border px-4 py-3 shadow-lg"
    :class="[
      variant === 'success' && 'border-brand-200 bg-brand-50 text-brand-800',
      variant === 'error' && 'border-danger-200 bg-danger-50 text-danger-800',
      variant === 'warning' && 'border-warning-200 bg-warning-50 text-warning-800',
      variant === 'info' && 'border-info-200 bg-info-50 text-info-800',
      !variant && 'border-neutral-200 bg-white text-neutral-800',
    ]"
  >
    <span class="flex-1 text-sm">{{ message }}</span>
    <button
      type="button"
      class="text-current opacity-70 hover:opacity-100"
      aria-label="Dismiss"
      @click="$emit('dismiss')"
    >
      ×
    </button>
  </div>
</template>
