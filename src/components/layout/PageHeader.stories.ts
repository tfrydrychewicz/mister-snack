import type { Meta, StoryObj } from '@storybook/vue3'
import PageHeader from './PageHeader.vue'
import BaseButton from '@/components/base/BaseButton.vue'

const meta: Meta<typeof PageHeader> = {
  component: PageHeader,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof PageHeader>

export const Default: Story = {
  args: { title: 'Settings', subtitle: 'Configure AI provider and API key' },
}

export const WithActions: Story = {
  render: () => ({
    components: { PageHeader, BaseButton },
    template: `
      <PageHeader title="Dashboard" subtitle="Manage your meal plans">
        <template #actions>
          <BaseButton label="New plan" variant="primary" />
        </template>
      </PageHeader>
    `,
  }),
}
