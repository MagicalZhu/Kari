<script setup lang="ts">
import type { GlobalThemeOverrides } from 'naive-ui'
import { darkTheme } from 'naive-ui'

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#000',
    primaryColorPressed: '#000',
    baseColor: '#fff',
    primaryColorHover: '#1F1F1FFF',
    primaryColorSuppl: '#202020FF',
    borderRadius: '8px',
  },
  Input: {
    borderFocus: '1px solid #000',
    borderHover: '1px solid #000',
    boxShadowFocus: '0',
  },
  Button: {
    color: '#000',
    colorFocus: '#000',
  },
  Dropdown: {
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
