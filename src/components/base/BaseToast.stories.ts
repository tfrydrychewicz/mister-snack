import type { Meta, StoryObj } from '@storybook/vue3'
import BaseToast from './BaseToast.vue'

const meta: Meta<typeof BaseToast> = {
  component: BaseToast,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof BaseToast>

export const Success: Story = { args: { message: 'Settings saved.', variant: 'success' } }
export const Error: Story = { args: { message: 'Failed to connect.', variant: 'error' } }
export const Warning: Story = { args: { message: 'API key not set.', variant: 'warning' } }
export const Info: Story = { args: { message: 'Checking connection...', variant: 'info' } }
