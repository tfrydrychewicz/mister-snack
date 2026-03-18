import { createRouter, createWebHashHistory } from 'vue-router'
import { useProfileStore } from '@/stores/profile.store'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
    },
    {
      path: '/onboarding',
      name: 'onboarding',
      component: () => import('../views/OnboardingView.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
    },
    {
      path: '/plan/:id',
      name: 'plan',
      component: () => import('../views/PlanView.vue'),
    },
    {
      path: '/plan/:planId/meal/:mealId',
      name: 'meal-detail',
      component: () => import('../views/MealDetailView.vue'),
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../views/SettingsView.vue'),
    },
  ],
})

router.beforeEach(async (to) => {
  const profileStore = useProfileStore()
  if (profileStore.profile === null && profileStore.isLoading === false) {
    await profileStore.fetchProfile()
  }
  const hasProfile = profileStore.profile !== null && profileStore.profile.onboardingCompleted
  if (to.name === 'onboarding') {
    if (hasProfile) return { name: 'dashboard' }
    return undefined
  }
  if (!hasProfile && to.name !== 'onboarding') {
    return { name: 'onboarding' }
  }
  return undefined
})
