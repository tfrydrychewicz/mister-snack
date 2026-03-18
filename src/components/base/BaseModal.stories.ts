import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import BaseModal from './BaseModal.vue'
import BaseButton from './BaseButton.vue'

const meta: Meta<typeof BaseModal> = {
  component: BaseModal,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof BaseModal>

export const Default: Story = {
  render: () => ({
    components: { BaseModal, BaseButton },
    setup: () => {
      const open = ref(true)
      return { open }
    },
    template: `
      <div>
        <BaseButton label="Open modal" @click="open = true" />
        <BaseModal :open="open" title="Confirm" @close="open = false">
          <p>Modal content goes here.</p>
          <template #footer>
            <BaseButton label="Close" @click="open = false" />
          </template>
        </BaseModal>
      </div>
    `,
  }),
}
