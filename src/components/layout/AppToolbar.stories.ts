import type { Meta, StoryObj } from '@storybook/vue3'
import AppToolbar from './AppToolbar.vue'

const meta: Meta<typeof AppToolbar> = {
  component: AppToolbar,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof AppToolbar>

export const Default: Story = {}
export const CustomTitle: Story = {
  args: { title: 'Settings' },
}
