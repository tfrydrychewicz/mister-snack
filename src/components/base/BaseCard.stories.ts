import type { Meta, StoryObj } from '@storybook/vue3'
import BaseCard from './BaseCard.vue'
import BaseButton from './BaseButton.vue'

const meta: Meta<typeof BaseCard> = {
  component: BaseCard,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof BaseCard>

export const Default: Story = {
  args: {
    title: 'Card Title',
  },
  render: (args) => ({
    components: { BaseCard, BaseButton },
    setup: () => ({ args }),
    template: `
      <BaseCard v-bind="args">
        <p class="text-neutral-600">Card body content goes here.</p>
      </BaseCard>
    `,
  }),
}

export const WithFooter: Story = {
  render: () => ({
    components: { BaseCard, BaseButton },
    template: `
      <BaseCard title="Settings">
        <p class="text-neutral-600">Configure your preferences.</p>
        <template #footer>
          <div class="flex justify-end gap-2">
            <BaseButton label="Cancel" variant="ghost" />
            <BaseButton label="Save" variant="primary" />
          </div>
        </template>
      </BaseCard>
    `,
  }),
}
