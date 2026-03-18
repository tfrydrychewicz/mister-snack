import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import type { DietType } from '@/types/profile'
import StepDiets from './StepDiets.vue'

const meta: Meta<typeof StepDiets> = {
  component: StepDiets,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof StepDiets>

export const Default: Story = {
  render: () => ({
    components: { StepDiets },
    setup: () => {
      const value = ref<DietType[]>([])
      return { value }
    },
    template: `<StepDiets v-model="value" />`,
  }),
}
