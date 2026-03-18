import type { Preview } from '@storybook/vue3'
import { setup } from '@storybook/vue3'
import { createPinia } from 'pinia'
import { createRouter, createWebHashHistory } from 'vue-router'
import '../src/assets/main.css'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', redirect: '/dashboard' },
    { path: '/dashboard', component: { template: '<div>Dashboard</div>' } },
    { path: '/settings', component: { template: '<div>Settings</div>' } },
    { path: '/plan/:id', component: { template: '<div>Plan</div>' } },
  ],
})

setup((app) => {
  app.use(createPinia())
  app.use(router)
})

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#fafafa' },
        { name: 'dark', value: '#171717' },
      ],
    },
  },
}

export default preview
