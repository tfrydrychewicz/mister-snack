import type { Meta, StoryObj } from '@storybook/vue3'
import BaseSkeletonLoader from './BaseSkeletonLoader.vue'

const meta: Meta<typeof BaseSkeletonLoader> = {
  component: BaseSkeletonLoader,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof BaseSkeletonLoader>

export const Default: Story = {}
export const Custom: Story = {
  args: { width: '200px', height: '2rem' },
}
