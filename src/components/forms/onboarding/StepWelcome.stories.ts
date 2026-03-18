import type { Meta, StoryObj } from '@storybook/vue3'
import StepWelcome from './StepWelcome.vue'

const meta: Meta<typeof StepWelcome> = {
  component: StepWelcome,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof StepWelcome>
export const Default: Story = {}
