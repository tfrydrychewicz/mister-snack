import type { Meta, StoryObj } from '@storybook/vue3'
import BaseBadge from './BaseBadge.vue'

const meta: Meta<typeof BaseBadge> = {
  component: BaseBadge,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['neutral', 'brand', 'danger', 'warning', 'info'] },
  },
}
export default meta

type Story = StoryObj<typeof BaseBadge>

export const Neutral: Story = { args: { label: 'None', variant: 'neutral' } }
export const Brand: Story = { args: { label: 'Vegan', variant: 'brand' } }
export const Danger: Story = { args: { label: 'Peanut allergy', variant: 'danger' } }
export const Warning: Story = { args: { label: 'Low sodium', variant: 'warning' } }
export const Info: Story = { args: { label: 'High protein', variant: 'info' } }
