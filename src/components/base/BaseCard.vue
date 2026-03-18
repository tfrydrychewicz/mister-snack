<script setup lang="ts">
defineProps<{
  title?: string
}>()
</script>

<template>
  <div class="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-card">
    <div v-if="title || $slots.header" class="border-b border-neutral-200 px-4 py-3">
      <slot name="header">
        <h3 v-if="title" class="text-base font-semibold text-neutral-900">
          {{ title }}
        </h3>
      </slot>
    </div>
    <div class="p-4">
      <slot />
    </div>
    <div v-if="$slots.footer" class="border-t border-neutral-200 px-4 py-3">
      <slot name="footer" />
    </div>
  </div>
</template>
