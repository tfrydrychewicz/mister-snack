import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import StepActivityLevel from './StepActivityLevel.vue'

const meta: Meta<typeof StepActivityLevel> = {
  component: StepActivityLevel,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof StepActivityLevel>

export const Default: Story = {
  render: () => ({
    components: { StepActivityLevel },
    setup: () => {
      const value = ref('' as const)
      return { value }
    },
    template: `<StepActivityLevel v-model="value" />`,
  }),
}
