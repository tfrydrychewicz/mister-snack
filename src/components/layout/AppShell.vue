<script setup lang="ts">
import { useRoute } from 'vue-router'
import AppSidebar from './AppSidebar.vue'
import AppToolbar from './AppToolbar.vue'

defineProps<{
  sidebarItems?: Array<{ name: string; path: string; label: string }>
  toolbarTitle?: string
}>()

const route = useRoute()
</script>

<template>
  <div class="flex h-screen flex-col overflow-hidden bg-neutral-50">
    <AppToolbar :title="toolbarTitle" />
    <div class="flex flex-1 overflow-hidden">
      <AppSidebar v-if="sidebarItems?.length" :items="sidebarItems" :current-path="route.path" />
      <main class="flex-1 overflow-auto">
        <slot />
      </main>
    </div>
  </div>
</template>
