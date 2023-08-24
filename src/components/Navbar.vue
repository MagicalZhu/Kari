<script setup lang="ts">
const { client } = useSupabase()
const { setLoginData } = useSupabaseStore()

async function signInWithGitHub() {
  const authData = await client.auth.signInWithOAuth({
    provider: 'github',
  })
  setLoginData(authData)
  if (authData.error)
    console.error(authData.error)
}

async function signout() {
  const { error } = await client.auth.signOut()
  if (error)
    console.error(error)
}

function handleSelect(key: string | number) {
  if (String(key) === 'login')
    signInWithGitHub()

  if (String(key) === 'logout')
    signout()
}

const options = [
  {
    label: '用户资料',
    key: 'profile',
  },
  {
    label: '编辑用户资料',
    key: 'editProfile',
  },
  {
    label: '登录',
    key: 'login',
    show: true,
  },
  {
    label: '退出登录',
    key: 'logout',
    show: true,
  },
]
</script>

<template>
  <header class="absolute fixed left-0 left-0 top-0 z-40 h-17 w-full px-4 py-4">
    <nav class="flex items-center justify-end space-x-4">
      <!--
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
    -->
      <n-dropdown :options="options" @select="handleSelect">
        <n-button type="primary" bg-dark-9>
          设置
        </n-button>
      </n-dropdown>
      <slot />
    </nav>
  </header>
</template>
