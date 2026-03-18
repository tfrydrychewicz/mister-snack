import type { Meta, StoryObj } from '@storybook/vue3'
import StepSummary from './StepSummary.vue'

const meta: Meta<typeof StepSummary> = {
  component: StepSummary,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof StepSummary>

export const Default: Story = {
  args: {
    profile: {
      name: 'Alex',
      age: 32,
      sex: 'male',
      weightKg: 75,
      heightCm: 178,
      activityLevel: 'moderate',
      goals: ['eat_healthier', 'build_muscle'],
      diets: ['none'],
      allergies: ['peanuts'],
      nutritionPreferences: ['high_protein', 'low_sodium'],
      onboardingCompleted: false,
    },
  },
}
