import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import StepAllergies from './StepAllergies.vue'

const meta: Meta<typeof StepAllergies> = {
  component: StepAllergies,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof StepAllergies>

export const Default: Story = {
  render: () => ({
    components: { StepAllergies },
    setup: () => {
      const value = ref<string[]>([])
      return { value }
    },
    template: `<StepAllergies v-model="value" />`,
  }),
}
