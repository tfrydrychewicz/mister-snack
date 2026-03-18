<script setup lang="ts">
defineProps<{
  modelValue?: string | number
  type?: 'text' | 'number' | 'email' | 'password'
  label?: string
  error?: string
  hint?: string
  placeholder?: string
  disabled?: boolean
  multiline?: boolean
  rows?: number
}>()
defineEmits<{ 'update:modelValue': [value: string | number] }>()
</script>

<template>
  <div class="flex flex-col gap-1">
    <label v-if="label" class="text-sm font-medium text-neutral-700">
      {{ label }}
    </label>
    <textarea
      v-if="multiline"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :rows="rows ?? 3"
      class="focus-ring w-full rounded-lg border border-neutral-300 px-3 py-2 text-neutral-900 placeholder-neutral-400 disabled:bg-neutral-100 disabled:text-neutral-500"
      :class="{ 'border-danger-500': !!error }"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    />
    <input
      v-else
      :value="modelValue"
      :type="type ?? 'text'"
      :placeholder="placeholder"
      :disabled="disabled"
      class="focus-ring h-10 w-full rounded-lg border border-neutral-300 px-3 text-neutral-900 placeholder-neutral-400 disabled:bg-neutral-100 disabled:text-neutral-500"
      :class="{ 'border-danger-500': !!error }"
      @input="
        $emit(
          'update:modelValue',
          type === 'number'
            ? Number(($event.target as HTMLInputElement).value)
            : ($event.target as HTMLInputElement).value,
        )
      "
    />
    <p v-if="error" class="text-sm text-danger-500">
      {{ error }}
    </p>
    <p v-else-if="hint" class="text-sm text-neutral-500">
      {{ hint }}
    </p>
  </div>
</template>
