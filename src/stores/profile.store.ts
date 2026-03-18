import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { UserProfile } from '@/types/profile'

export const useProfileStore = defineStore('profile', () => {
  const profile = ref<UserProfile | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const hasProfile = computed(() => profile.value !== null && profile.value.onboardingCompleted)

  async function fetchProfile(): Promise<void> {
    isLoading.value = true
    error.value = null
    try {
      profile.value = await window.api.profile.get()
    } catch (err) {
      error.value = err instanceof Error ? err.message : String(err)
    } finally {
      isLoading.value = false
    }
  }

  async function saveProfile(
    data: Omit<UserProfile, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<void> {
    isLoading.value = true
    error.value = null
    const now = new Date().toISOString()
    const full: UserProfile = {
      ...data,
      id: profile.value?.id ?? crypto.randomUUID(),
      createdAt: profile.value?.createdAt ?? now,
      updatedAt: now,
    }
    try {
      await window.api.profile.save(full)
      profile.value = full
    } catch (err) {
      error.value = err instanceof Error ? err.message : String(err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  return {
    profile,
    isLoading,
    error,
    hasProfile,
    fetchProfile,
    saveProfile,
  }
})
