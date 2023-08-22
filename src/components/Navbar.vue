<script setup lang="ts">
import { isClient } from '@renovamen/utils'
import { toggleDark } from '~/composables/dark'

const navbar = ref<HTMLElement | null>(null)
const isFixed = ref(true)
const isVisible = ref(true)

if (isClient) {
  const { y, directions } = useScroll(document)
  watch(y, () => {
    if (directions.top) {
      if (y.value > 0 && isFixed.value) {
        isVisible.value = true
      }
      else {
        isVisible.value = true
        isFixed.value = true
      }
    }
    else if (directions.bottom) {
      isVisible.value = true
      if (navbar.value && y.value > navbar.value!.offsetHeight)
        isFixed.value = true
    }
  })
}
</script>

<template>
  <header
    ref="navbar"
    class="z-40 h-17 w-full flex items-center justify-end text-base"
    p="x-4 md:x-5"
    :class="[
      isFixed
        && 'fixed -top-17 left-0 transition duration-300 ',
      isVisible && 'translate-y-full',
      !isFixed && !isVisible && 'absolute top-0 left-0',
    ]"
  >
    <nav class="flex space-x-4">
      <router-link to="/posts" :title="$t('theme.nav.Blog')" class="nav-item">
        <div i-carbon:blog />
      </router-link>

      <router-link to="/categories" :title="$t('theme.nav.Category')" class="nav-item">
        <div class="i-carbon:folders saturate-0" />
      </router-link>

      <router-link to="/tags" :title="$t('theme.nav.Tag')" class="nav-item">
        <div i-carbon:tag-group />
      </router-link>

      <router-link to="/projects" :title="$t('theme.nav.Projects')" class="nav-item">
        <div i-carbon:terminal />
      </router-link>
      <a href="https://www.travellings.cn/go.html" :title="$t('theme.nav.Travelling')" class="nav-item">
        <div i-carbon:bus />
      </a>
      <router-link to="/share" :title="$t('theme.nav.Favorite')" class="nav-item">
        <div i-carbon:favorite />
      </router-link>
      <button nav-item @click="toggleDark()">
        <div class="i-lucide:sun dark:i-lucide:moon" />
      </button>

      <slot />
    </nav>
  </header>
</template>
