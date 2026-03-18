import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import type { NutritionGoal } from '@/types/profile'
import StepGoals from './StepGoals.vue'

const meta: Meta<typeof StepGoals> = {
  component: StepGoals,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof StepGoals>

export const Default: Story = {
  render: () => ({
    components: { StepGoals },
    setup: () => {
      const value = ref<NutritionGoal[]>([])
      return { value }
    },
    template: `<StepGoals v-model="value" />`,
  }),
}
