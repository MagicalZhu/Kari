<script setup lang="ts">
import { darkTheme, dateZhCN, zhCN } from 'naive-ui'

const getThemeOverrides = computed(() => {
  const primaryTheme = '#000000'
  const lightenTheme = '#403E3EFF'
  return {
    common: {
      primaryColor: primaryTheme,
      primaryColorSuppl: primaryTheme,
      primaryColorHover: lightenTheme,
      primaryColorPressed: lightenTheme,
      borderRadius: '8px',
    },
    LoadingBar: {
      colorLoading: primaryTheme,
    },
  }
})

useHead({
  title: 'Vue Tools',
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
  <NConfigProvider
    :locale="zhCN"
    :date-locale="dateZhCN"
    :theme="isDark ? darkTheme : null"
    :theme-overrides="getThemeOverrides"
  >
    <n-dialog-provider>
      <n-notification-provider>
        <n-message-provider>
          <RouterView />
        </n-message-provider>
      </n-notification-provider>
    </n-dialog-provider>
  </NConfigProvider>
</template>
