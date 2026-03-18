import type { Meta, StoryObj } from '@storybook/vue3'
import BaseSpinner from './BaseSpinner.vue'

const meta: Meta<typeof BaseSpinner> = {
  component: BaseSpinner,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof BaseSpinner>

export const Default: Story = {}
export const Small: Story = { args: { size: 'sm' } }
export const Large: Story = { args: { size: 'lg' } }
