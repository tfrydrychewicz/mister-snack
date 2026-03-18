<script setup lang="ts">
defineProps<{
  title?: string
}>()
</script>

<template>
  <header
    class="flex h-12 shrink-0 items-center border-b border-neutral-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80"
    style="-webkit-app-region: drag; user-select: none"
  >
    <!-- Reserve space for macOS traffic lights (hiddenInset); they render in this area -->
    <div class="w-[78px] shrink-0" />
    <div class="flex flex-1 items-center px-4">
      <h1 class="text-sm font-semibold text-neutral-700">
        {{ title ?? 'Mister Snack' }}
      </h1>
    </div>
  </header>
</template>
