import type { Meta, StoryObj } from '@storybook/vue3'
import { createRouter, createWebHashHistory } from 'vue-router'
import AppSidebar from './AppSidebar.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/dashboard', name: 'dashboard' },
    { path: '/plan/1', name: 'plan' },
    { path: '/settings', name: 'settings' },
  ],
})

const sidebarItems = [
  { name: 'dashboard', path: '/dashboard', label: 'Dashboard' },
  { name: 'plan', path: '/plan/1', label: 'Plan' },
  { name: 'settings', path: '/settings', label: 'Settings' },
]

const meta: Meta<typeof AppSidebar> = {
  component: AppSidebar,
  tags: ['autodocs'],
  decorators: [
    (story) => ({
      components: { story },
      setup: () => ({ router }),
      template: '<Story />',
    }),
  ],
}
export default meta

type Story = StoryObj<typeof AppSidebar>

export const Default: Story = {
  args: { items: sidebarItems, currentPath: '/dashboard' },
}
