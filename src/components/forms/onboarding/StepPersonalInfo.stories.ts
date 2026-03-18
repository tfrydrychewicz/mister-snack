import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import StepPersonalInfo from './StepPersonalInfo.vue'

const meta: Meta<typeof StepPersonalInfo> = {
  component: StepPersonalInfo,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof StepPersonalInfo>

export const Default: Story = {
  render: () => ({
    components: { StepPersonalInfo },
    setup: () => {
      const data = ref({
        name: '',
        age: 0,
        sex: 'male' as const,
        weightKg: 0,
        heightCm: 0,
      })
      return { data }
    },
    template: `
      <StepPersonalInfo v-model="data" />
    `,
  }),
}
