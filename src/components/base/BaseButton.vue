<script setup lang="ts">
defineProps<{
  label?: string
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  type?: 'button' | 'submit'
}>()
defineEmits<{ click: [] }>()
</script>

<template>
  <button
    type="button"
    class="focus-ring inline-flex items-center justify-center rounded-lg font-medium transition-colors disabled:pointer-events-none disabled:opacity-50"
    :class="[
      variant === 'primary' && 'bg-brand-500 text-white hover:bg-brand-600 active:bg-brand-700',
      variant === 'secondary' &&
        'bg-neutral-200 text-neutral-900 hover:bg-neutral-300 active:bg-neutral-400',
      variant === 'ghost' && 'text-neutral-700 hover:bg-neutral-100 active:bg-neutral-200',
      variant === 'danger' &&
        'bg-danger-500 text-white hover:bg-danger-700 active:bg-danger-700/90',
      !variant && 'bg-brand-500 text-white hover:bg-brand-600',
      size === 'sm' && 'h-8 px-3 text-sm',
      size === 'md' && 'h-10 px-4 text-sm',
      size === 'lg' && 'h-12 px-6 text-base',
      !size && 'h-10 px-4 text-sm',
    ]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot>
      {{ label }}
    </slot>
  </button>
</template>
