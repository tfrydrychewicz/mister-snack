<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppShell from '@/components/layout/AppShell.vue'
import BaseToast from '@/components/base/BaseToast.vue'
import { useUiStore } from '@/stores/ui.store'
import { storeToRefs } from 'pinia'

const uiStore = useUiStore()
const { toasts } = storeToRefs(uiStore)

const sidebarItems = [
  { name: 'dashboard', path: '/dashboard', label: 'Dashboard' },
  { name: 'settings', path: '/settings', label: 'Settings' },
]
</script>

<template>
  <AppShell :sidebar-items="sidebarItems">
    <div class="p-6">
      <RouterView />
    </div>
  </AppShell>
  <div
    class="fixed bottom-4 right-4 z-50 flex flex-col gap-2"
    role="region"
    aria-label="Notifications"
  >
    <BaseToast
      v-for="t in toasts"
      :key="t.id"
      :message="t.message"
      :variant="t.variant"
      @dismiss="uiStore.dismissToast(t.id)"
    />
  </div>
</template>
