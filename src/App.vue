<script setup lang="ts">
import type { GlobalThemeOverrides } from 'naive-ui'
import { darkTheme } from 'naive-ui'

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#FF0000',
  },
  Button: {
    textColor: '#FF0000',
  },
}
useHead({
  title: 'Vitesse',
  meta: [
    { name: 'naive-ui-style' },
    { name: 'description', content: 'Opinionated Vite Starter Template' },
    {
      name: 'theme-color',
      content: () => isDark.value ? '#00aba9' : '#ffffff',
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: () => preferredDark.value ? '/favicon-dark.svg' : '/favicon.svg',
    },
  ],
})
</script>

<template>
  <n-config-provider
    :theme="isDark ? darkTheme : null"
    :theme-overrides="themeOverrides"
    h-full
    w-full
  >
    <RouterView />
  </n-config-provider>
</template>
