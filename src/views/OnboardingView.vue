<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import StepForm from '@/components/forms/StepForm.vue'
import StepWelcome from '@/components/forms/onboarding/StepWelcome.vue'
import StepPersonalInfo from '@/components/forms/onboarding/StepPersonalInfo.vue'
import StepActivityLevel from '@/components/forms/onboarding/StepActivityLevel.vue'
import StepGoals from '@/components/forms/onboarding/StepGoals.vue'
import StepDiets from '@/components/forms/onboarding/StepDiets.vue'
import StepAllergies from '@/components/forms/onboarding/StepAllergies.vue'
import StepPreferences from '@/components/forms/onboarding/StepPreferences.vue'
import StepSummary from '@/components/forms/onboarding/StepSummary.vue'
import { useProfileStore } from '@/stores/profile.store'
import { useUiStore } from '@/stores/ui.store'
import {
  stepPersonalInfoSchema,
  stepActivityLevelSchema,
  stepGoalsSchema,
  stepDietsSchema,
} from '@/types/schemas'
import type { ActivityLevel, DietType, NutritionGoal } from '@/types/profile'

const router = useRouter()
const profileStore = useProfileStore()
const uiStore = useUiStore()

const STEPS = 8
const currentStep = ref(0)

const formData = reactive({
  name: '',
  age: 0,
  sex: 'male' as const,
  weightKg: 0,
  heightCm: 0,
  activityLevel: '' as ActivityLevel | '',
  goals: [] as NutritionGoal[],
  diets: [] as DietType[],
  allergies: [] as string[],
  nutritionPreferences: [] as string[],
})

const stepSchemas = [
  null, // 0: welcome, no validation
  stepPersonalInfoSchema,
  stepActivityLevelSchema,
  stepGoalsSchema,
  stepDietsSchema,
  null, // 4: allergies, optional
  null, // 5: preferences, optional
  null, // 6: summary, no validation
]

const { validate: validateStep } = useForm({
  validationSchema: computed(() => {
    const schema = stepSchemas[currentStep.value]
    return schema ? toTypedSchema(schema) : undefined
  }),
  values: formData,
})

const canGoBack = computed(() => currentStep.value > 0)
const canGoNext = computed(() => currentStep.value < STEPS - 1)
const isLastStep = computed(() => currentStep.value === STEPS - 1)

async function goNext() {
  const schema = stepSchemas[currentStep.value]
  if (schema) {
    const result = await validateStep()
    if (!result.valid) return
  }
  if (currentStep.value < STEPS - 1) {
    currentStep.value++
  }
}

function goBack() {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

async function complete() {
  const profilePayload = {
    name: formData.name,
    age: formData.age,
    sex: formData.sex,
    weightKg: formData.weightKg,
    heightCm: formData.heightCm,
    activityLevel: formData.activityLevel as ActivityLevel,
    goals: formData.goals,
    diets: formData.diets,
    allergies: formData.allergies,
    nutritionPreferences: formData.nutritionPreferences,
    onboardingCompleted: true,
  }
  try {
    await profileStore.saveProfile(profilePayload)
    uiStore.showToast('Profile saved!', 'success')
    router.push('/dashboard')
  } catch {
    uiStore.showToast('Failed to save profile', 'error')
  }
}
</script>

<template>
  <div class="mx-auto max-w-xl py-8">
    <StepForm
      :current-step="currentStep"
      :total-steps="STEPS"
      :can-go-back="canGoBack"
      :can-go-next="canGoNext"
      :is-last-step="isLastStep"
      @back="goBack"
      @next="goNext"
      @complete="complete"
    >
      <StepWelcome v-if="currentStep === 0" />
      <StepPersonalInfo
        v-else-if="currentStep === 1"
        :model-value="{
          name: formData.name,
          age: formData.age,
          sex: formData.sex,
          weightKg: formData.weightKg,
          heightCm: formData.heightCm,
        }"
        @update:model-value="Object.assign(formData, $event)"
      />
      <StepActivityLevel
        v-else-if="currentStep === 2"
        :model-value="formData.activityLevel"
        @update:model-value="formData.activityLevel = $event"
      />
      <StepGoals
        v-else-if="currentStep === 3"
        :model-value="formData.goals"
        @update:model-value="formData.goals = $event"
      />
      <StepDiets
        v-else-if="currentStep === 4"
        :model-value="formData.diets"
        @update:model-value="formData.diets = $event"
      />
      <StepAllergies
        v-else-if="currentStep === 5"
        :model-value="formData.allergies"
        @update:model-value="formData.allergies = $event"
      />
      <StepPreferences
        v-else-if="currentStep === 6"
        :model-value="formData.nutritionPreferences"
        @update:model-value="formData.nutritionPreferences = $event"
      />
      <StepSummary
        v-else-if="currentStep === 7"
        :profile="{
          name: formData.name,
          age: formData.age,
          sex: formData.sex,
          weightKg: formData.weightKg,
          heightCm: formData.heightCm,
          activityLevel: formData.activityLevel as ActivityLevel,
          goals: formData.goals,
          diets: formData.diets,
          allergies: formData.allergies,
          nutritionPreferences: formData.nutritionPreferences,
          onboardingCompleted: false,
        }"
      />
    </StepForm>
  </div>
</template>
