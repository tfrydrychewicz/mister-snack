import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useUiStore } from '../../src/stores/ui.store'

describe('useUiStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('starts with loading false', () => {
    const store = useUiStore()
    expect(store.isLoading).toBe(false)
  })

  it('setLoading toggles isLoading', () => {
    const store = useUiStore()
    store.setLoading(true)
    expect(store.isLoading).toBe(true)
    store.setLoading(false)
    expect(store.isLoading).toBe(false)
  })

  it('showToast adds a toast', () => {
    const store = useUiStore()
    store.showToast('Hello', 'success', 0)
    expect(store.toasts).toHaveLength(1)
    expect(store.toasts[0].message).toBe('Hello')
    expect(store.toasts[0].variant).toBe('success')
  })

  it('dismissToast removes the correct toast', () => {
    const store = useUiStore()
    store.showToast('First', 'info', 0)
    store.showToast('Second', 'info', 0)
    const idToRemove = store.toasts[0].id
    store.dismissToast(idToRemove)
    expect(store.toasts).toHaveLength(1)
    expect(store.toasts[0].message).toBe('Second')
  })

  it('openModal and closeModal control activeModalId', () => {
    const store = useUiStore()
    store.openModal('confirm-delete')
    expect(store.activeModalId).toBe('confirm-delete')
    store.closeModal()
    expect(store.activeModalId).toBeNull()
  })
})
