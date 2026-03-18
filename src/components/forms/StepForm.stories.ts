import type { Meta, StoryObj } from '@storybook/vue3'
import StepForm from './StepForm.vue'

const meta: Meta<typeof StepForm> = {
  component: StepForm,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof StepForm>

export const Default: Story = {
  args: {
    currentStep: 1,
    totalSteps: 8,
    canGoBack: true,
    canGoNext: true,
    isLastStep: false,
  },
  render: (args) => ({
    components: { StepForm },
    setup: () => ({ args }),
    template: `
      <StepForm v-bind="args">
        <p class="text-neutral-600">Step content goes here.</p>
      </StepForm>
    `,
  }),
}

export const FirstStep: Story = {
  args: {
    currentStep: 0,
    totalSteps: 8,
    canGoBack: false,
    canGoNext: true,
    isLastStep: false,
  },
  render: (args) => ({
    components: { StepForm },
    setup: () => ({ args }),
    template: `
      <StepForm v-bind="args">
        <p>Welcome step — no back button.</p>
      </StepForm>
    `,
  }),
}

export const LastStep: Story = {
  args: {
    currentStep: 7,
    totalSteps: 8,
    canGoBack: true,
    canGoNext: false,
    isLastStep: true,
  },
  render: (args) => ({
    components: { StepForm },
    setup: () => ({ args }),
    template: `
      <StepForm v-bind="args">
        <p>Review and complete.</p>
      </StepForm>
    `,
  }),
}
