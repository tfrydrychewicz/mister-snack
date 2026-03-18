<script setup lang="ts">
defineProps<{
  modelValue?: string[]
  suggestions?: string[]
  placeholder?: string
  label?: string
  error?: string
}>()
defineEmits<{ 'update:modelValue': [value: string[]] }>()
</script>

<template>
  <div class="flex flex-col gap-1">
    <label v-if="label" class="text-sm font-medium text-neutral-700">
      {{ label }}
    </label>
    <div
      class="focus-ring flex min-h-10 flex-wrap items-center gap-2 rounded-lg border border-neutral-300 bg-white px-3 py-2"
      :class="{ 'border-danger-500': !!error }"
    >
      <span
        v-for="tag in modelValue ?? []"
        :key="tag"
        class="inline-flex items-center gap-1 rounded-md bg-neutral-200 px-2 py-0.5 text-sm"
      >
        {{ tag }}
        <button
          type="button"
          class="text-neutral-500 hover:text-neutral-700"
          aria-label="Remove"
          @click="
            $emit(
              'update:modelValue',
              (modelValue ?? []).filter((t) => t !== tag),
            )
          "
        >
          ×
        </button>
      </span>
      <input
        type="text"
        :placeholder="placeholder"
        class="min-w-24 flex-1 border-0 bg-transparent p-0 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-0"
        @keydown.enter.prevent="
          (e) => {
            const val = (e.target as HTMLInputElement).value.trim()
            if (val && !(modelValue ?? []).includes(val)) {
              $emit('update:modelValue', [...(modelValue ?? []), val])
              ;(e.target as HTMLInputElement).value = ''
            }
          }
        "
      />
    </div>
    <div v-if="suggestions?.length" class="flex flex-wrap gap-1">
      <button
        v-for="s in suggestions"
        :key="s"
        type="button"
        class="rounded bg-neutral-100 px-2 py-1 text-xs text-neutral-600 hover:bg-neutral-200"
        :disabled="(modelValue ?? []).includes(s)"
        @click="
          !(modelValue ?? []).includes(s) && $emit('update:modelValue', [...(modelValue ?? []), s])
        "
      >
        + {{ s }}
      </button>
    </div>
    <p v-if="error" class="text-sm text-danger-500">
      {{ error }}
    </p>
  </div>
</template>
