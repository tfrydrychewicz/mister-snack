import type { Meta, StoryObj } from '@storybook/vue3'
import AppShell from './AppShell.vue'

const meta: Meta<typeof AppShell> = {
  component: AppShell,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof AppShell>

const items = [
  { name: 'dashboard', path: '/dashboard', label: 'Dashboard' },
  { name: 'settings', path: '/settings', label: 'Settings' },
]

export const Default: Story = {
  args: { sidebarItems: items },
  render: (args) => ({
    components: { AppShell },
    setup: () => ({ args }),
    template: `
      <AppShell v-bind="args">
        <div class="p-6">
          <h2 class="text-xl font-semibold">Main content area</h2>
          <p class="mt-2 text-neutral-600">Page content goes here.</p>
        </div>
      </AppShell>
    `,
  }),
}
