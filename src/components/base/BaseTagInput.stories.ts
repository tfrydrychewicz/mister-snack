import type { Meta, StoryObj } from '@storybook/vue3'
import BaseTagInput from './BaseTagInput.vue'

const meta: Meta<typeof BaseTagInput> = {
  component: BaseTagInput,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof BaseTagInput>

const allergySuggestions = ['peanuts', 'shellfish', 'dairy', 'gluten', 'soy']

export const Default: Story = {
  args: {
    label: 'Allergies',
    placeholder: 'Type and press Enter',
    suggestions: allergySuggestions,
  },
}

export const WithTags: Story = {
  args: {
    label: 'Allergies',
    modelValue: ['peanuts', 'shellfish'],
    suggestions: allergySuggestions,
  },
}
