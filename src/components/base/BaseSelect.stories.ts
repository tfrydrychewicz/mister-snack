import type { Meta, StoryObj } from '@storybook/vue3'
import BaseSelect from './BaseSelect.vue'

const meta: Meta<typeof BaseSelect> = {
  component: BaseSelect,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof BaseSelect>

const providerOptions = [
  { value: 'openai', label: 'OpenAI' },
  { value: 'anthropic', label: 'Anthropic' },
  { value: 'google', label: 'Google Gemini' },
  { value: 'ollama', label: 'Ollama (local)' },
]

export const Default: Story = {
  args: {
    label: 'Provider',
    options: providerOptions,
    placeholder: 'Select a provider',
  },
}

export const WithValue: Story = {
  args: {
    label: 'Provider',
    options: providerOptions,
    modelValue: 'openai',
  },
}

export const WithError: Story = {
  args: {
    label: 'Provider',
    options: providerOptions,
    error: 'Please select a provider',
  },
}
