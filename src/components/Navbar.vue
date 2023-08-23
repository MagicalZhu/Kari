<template>
  <nav class="item-center flex justify-end space-x-4">
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
</template>
