<script setup lang="ts">
defineProps<{
  items: Array<{ name: string; path: string; label: string }>
  currentPath?: string
}>()
</script>

<template>
  <aside
    class="flex w-56 flex-col border-r border-neutral-200 bg-white"
    style="-webkit-app-region: no-drag; app-region: no-drag"
  >
    <div class="flex h-14 items-center px-4">
      <span class="text-lg font-bold text-brand-600">Mister Snack</span>
    </div>
    <nav class="flex-1 space-y-0.5 px-2 py-4">
      <router-link
        v-for="item in items"
        :key="item.name"
        :to="item.path"
        class="block rounded-lg px-3 py-2 text-sm font-medium transition-colors"
        :class="
          currentPath === item.path
            ? 'bg-brand-50 text-brand-700'
            : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
        "
      >
        {{ item.label }}
      </router-link>
    </nav>
  </aside>
</template>
