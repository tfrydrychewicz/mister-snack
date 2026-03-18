import type { StorybookConfig } from '@storybook/vue3-vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)', '../src/**/*.mdx'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-interactions', '@storybook/addon-a11y'],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  async viteFinal(config) {
    config.resolve = config.resolve ?? {}
    config.resolve.alias = {
      ...(config.resolve.alias as Record<string, string>),
      '@': resolve(__dirname, '../src'),
    }
    config.plugins = config.plugins ?? []
    if (
      !config.plugins.some(
        (p) => p && typeof p === 'object' && 'name' in p && p.name === 'vite:vue',
      )
    ) {
      config.plugins.unshift(vue())
    }
    return config
  },
}

export default config
