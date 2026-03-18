import type { Meta, StoryObj } from '@storybook/vue3'
import BaseInput from './BaseInput.vue'

const meta: Meta<typeof BaseInput> = {
  component: BaseInput,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['text', 'number', 'email', 'password'] },
  },
}
export default meta

type Story = StoryObj<typeof BaseInput>

export const Default: Story = {
  args: {
    label: 'Name',
    placeholder: 'Enter your name',
    modelValue: '',
  },
}

export const WithValue: Story = {
  args: {
    label: 'Email',
    modelValue: 'user@example.com',
  },
}

export const WithError: Story = {
  args: {
    label: 'Password',
    type: 'password',
    error: 'Password must be at least 8 characters',
  },
}

export const WithHint: Story = {
  args: {
    label: 'API Key',
    hint: 'Your key is stored securely and never sent to the renderer.',
  },
}

export const Number: Story = {
  args: {
    label: 'Age',
    type: 'number',
    modelValue: 30,
  },
}

export const Multiline: Story = {
  args: {
    label: 'Notes',
    multiline: true,
    rows: 4,
    placeholder: 'Enter notes...',
  },
}
