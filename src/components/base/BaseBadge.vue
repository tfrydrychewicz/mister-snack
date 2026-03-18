<script setup lang="ts">
defineProps<{
  label: string
  variant?: 'neutral' | 'brand' | 'danger' | 'warning' | 'info'
}>()
</script>

<template>
  <span
    class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
    :class="[
      variant === 'neutral' && 'bg-neutral-200 text-neutral-800',
      variant === 'brand' && 'bg-brand-100 text-brand-800',
      variant === 'danger' && 'bg-danger-50 text-danger-700',
      variant === 'warning' && 'bg-warning-50 text-warning-700',
      variant === 'info' && 'bg-info-50 text-info-700',
      !variant && 'bg-neutral-200 text-neutral-800',
    ]"
  >
    {{ label }}
  </span>
</template>
