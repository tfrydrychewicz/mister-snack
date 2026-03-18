import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import StepPreferences from './StepPreferences.vue'

const meta: Meta<typeof StepPreferences> = {
  component: StepPreferences,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof StepPreferences>

export const Default: Story = {
  render: () => ({
    components: { StepPreferences },
    setup: () => {
      const value = ref<string[]>([])
      return { value }
    },
    template: `<StepPreferences v-model="value" />`,
  }),
}
