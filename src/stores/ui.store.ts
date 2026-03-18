import { defineStore } from 'pinia'
import { ref } from 'vue'

export type ToastVariant = 'success' | 'error' | 'warning' | 'info'

export interface Toast {
  id: string
  message: string
  variant: ToastVariant
  durationMs?: number
}

export const useUiStore = defineStore('ui', () => {
  const isLoading = ref(false)
  const toasts = ref<Toast[]>([])
  const activeModalId = ref<string | null>(null)

  function setLoading(value: boolean): void {
    isLoading.value = value
  }

  function showToast(message: string, variant: ToastVariant = 'info', durationMs = 4000): void {
    const id = crypto.randomUUID()
    toasts.value.push({ id, message, variant, durationMs })
    if (durationMs > 0) {
      setTimeout(() => dismissToast(id), durationMs)
    }
  }

  function dismissToast(id: string): void {
    toasts.value = toasts.value.filter((t) => t.id !== id)
  }

  function openModal(id: string): void {
    activeModalId.value = id
  }

  function closeModal(): void {
    activeModalId.value = null
  }

  return {
    isLoading,
    toasts,
    activeModalId,
    setLoading,
    showToast,
    dismissToast,
    openModal,
    closeModal,
  }
})
