<script setup lang="ts">
defineProps<{
  width?: string
  height?: string
  rounded?: boolean
}>()
</script>

<template>
  <div
    class="animate-pulse bg-neutral-200"
    :style="{ width: width ?? '100%', height: height ?? '1rem' }"
    :class="{ 'rounded-lg': rounded !== false }"
  />
</template>
