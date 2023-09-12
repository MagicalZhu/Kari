<script setup lang="ts">
import type { GithubRepoItem } from '~/types/base'

const { isLoading } = useLoadingStore()
const { setAvatar, setUserName, setToken, clearUser } = useUserStore()

const username = computed(() => useUserStore().username)
const avatar = computed<string>(() => useUserStore().avatar)
const token = computed(() => useUserStore().token)

const { setStars } = useSupabaseStore()

const hasLogin = computed(() => {
  if (username.value && username.value !== '')
    return true
  return false
})

const { user } = useSupabase()

watch(user, async () => {
  if (user.value) {
    const session = await useSupabase().getSession()
    if (session) {
      setAvatar(session?.user.user_metadata.avatar_url)
      setUserName(session?.user.user_metadata.name)
      if (session.provider_token)
        setToken(session.provider_token)
    }
    useRouter().push('/')
  }
}, { immediate: true })

const settings = computed(() => {
  return [
    {
      label: '获取Stars',
      key: 'GetStars',
      show: true,
    },
    {
      label: '登录',
      key: 'Login',
      show: !hasLogin.value,
    },
    {
      label: '退出登录',
      key: 'Logout',
      show: hasLogin.value,
    },
  ]
})

async function settingSelect(key: string) {
  if (key === 'Login') {
    isLoading(true)
    await useSupabase().LoginWithGithub()
    isLoading(false)
  }

  if (key === 'Logout') {
    isLoading(true)
    await useSupabase().logout()
    clearUser()
    isLoading(false)
  }
  if (key === 'GetStars') {
    isLoading(true)
    if (token) {
      const data = await useGithub().getStarredList({
        token: token.value,
      })
      console.error(data)
      setStars(data as GithubRepoItem[])
    }
    isLoading(false)
  }
}
</script>

<template>
  <div>
    <n-grid cols="1 s:2 m:5 l:5 xl:5 2xl:5" responsive="screen" :x-gap="8" :y-gap="8">
      <n-grid-item span="1">
        <n-card :bordered="false" size="medium">
          <n-space vertical class="flex items-center justify-end">
            <n-dropdown
              trigger="click"
              :options="settings" hover:cursor-pointer @select="settingSelect"
            >
              <n-button text style="font-size: 24px">
                <template v-if="avatar">
                  <n-avatar v-if="avatar" round :src="avatar" :size="48" />
                </template>
                <n-avatar v-else round :size="48" />
              </n-button>
            </n-dropdown>
          </n-space>
        </n-card>
      </n-grid-item>
      <n-grid-item span="3">
        <n-card :bordered="false" size="medium">
          456
        </n-card>
      </n-grid-item>
      <n-grid-item span="1">
        <n-card :bordered="false" size="medium">
          456
        </n-card>
      </n-grid-item>
    </n-grid>
  </div>
</template>
