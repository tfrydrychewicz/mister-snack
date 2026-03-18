import type { Meta, StoryObj } from '@storybook/vue3'
import BaseButton from './BaseButton.vue'

const meta: Meta<typeof BaseButton> = {
  component: BaseButton,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'ghost', 'danger'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
}
export default meta

type Story = StoryObj<typeof BaseButton>

export const Primary: Story = {
  args: { label: 'Save', variant: 'primary' },
}

export const Secondary: Story = {
  args: { label: 'Cancel', variant: 'secondary' },
}

export const Ghost: Story = {
  args: { label: 'Skip', variant: 'ghost' },
}

export const Danger: Story = {
  args: { label: 'Delete', variant: 'danger' },
}

export const Small: Story = {
  args: { label: 'Small', size: 'sm', variant: 'primary' },
}

export const Large: Story = {
  args: { label: 'Large Button', size: 'lg', variant: 'primary' },
}

export const Disabled: Story = {
  args: { label: 'Disabled', disabled: true, variant: 'primary' },
}
