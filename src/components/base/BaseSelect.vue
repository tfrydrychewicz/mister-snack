<script setup lang="ts">
defineProps<{
  modelValue?: string | string[]
  options: Array<{ value: string; label: string }>
  label?: string
  placeholder?: string
  disabled?: boolean
  multiple?: boolean
  error?: string
}>()
defineEmits<{ 'update:modelValue': [value: string | string[]] }>()
</script>

<template>
  <div class="flex flex-col gap-1">
    <label v-if="label" class="text-sm font-medium text-neutral-700">
      {{ label }}
    </label>
    <select
      :value="modelValue"
      :disabled="disabled"
      :multiple="multiple"
      class="focus-ring h-10 w-full rounded-lg border border-neutral-300 bg-white px-3 text-neutral-900 disabled:bg-neutral-100 disabled:text-neutral-500"
      :class="{ 'border-danger-500': !!error }"
      @change="
        $emit(
          'update:modelValue',
          multiple
            ? Array.from(($event.target as HTMLSelectElement).selectedOptions, (o) => o.value)
            : ($event.target as HTMLSelectElement).value,
        )
      "
    >
      <option v-if="placeholder" value="" disabled>
        {{ placeholder }}
      </option>
      <option v-for="opt in options" :key="opt.value" :value="opt.value">
        {{ opt.label }}
      </option>
    </select>
    <p v-if="error" class="text-sm text-danger-500">
      {{ error }}
    </p>
  </div>
</template>
