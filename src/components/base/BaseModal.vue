<script setup lang="ts">
defineProps<{
  open: boolean
  title?: string
}>()
defineEmits<{ close: [] }>()
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="open"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="title ? 'modal-title' : undefined"
        @click.self="$emit('close')"
      >
        <div class="fixed inset-0 bg-neutral-900/50" aria-hidden="true" />
        <div
          class="relative max-h-[90vh] w-full max-w-lg overflow-auto rounded-xl bg-white shadow-xl"
          @click.stop
        >
          <div
            v-if="title"
            class="flex items-center justify-between border-b border-neutral-200 px-4 py-3"
          >
            <h2 id="modal-title" class="text-lg font-semibold">
              {{ title }}
            </h2>
            <button
              type="button"
              class="text-neutral-400 hover:text-neutral-600"
              aria-label="Close"
              @click="$emit('close')"
            >
              ×
            </button>
          </div>
          <div class="p-4">
            <slot />
          </div>
          <div v-if="$slots.footer" class="border-t border-neutral-200 px-4 py-3">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-active .relative,
.modal-leave-active .relative {
  transition: transform 0.2s ease;
}
.modal-enter-from .relative,
.modal-leave-to .relative {
  transform: scale(0.95);
}
</style>
