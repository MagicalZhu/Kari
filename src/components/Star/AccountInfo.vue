<script setup lang="ts">
import type { GithubRepoItem } from '~/types/base'
import { takeTags } from '~/util/db'

const { isLoading } = useLoadingStore()

const { setStars, clearStars } = useGithubStore()
const { setAvatar, setUserName, setToken, clearUser, setUserId } = useUserStore()

const avatar = computed<string>(() => useUserStore().avatar)
const token = computed(() => useUserStore().token)

const { user, client } = useSupabase()
const { getCategory } = useTable(client)
const { setCategory } = useDbStore()

watch(user, async () => {
  if (user.value) {
    const session = await useSupabase().getSession()
    if (session) {
      setAvatar(session?.user.user_metadata.avatar_url)
      setUserName(session?.user.user_metadata.name)
      setUserId(session?.user.id)
      if (session.provider_token)
        setToken(session.provider_token)
    }
    useRouter().push('/')
  }
}, { immediate: true })

async function loginToGithub() {
  isLoading(true)
  await useSupabase().LoginWithGithub()
  isLoading(false)
}

// Account Action
const settings = [
  {
    label: '关注列表',
    key: 'GetStars',
  },
  {
    label: '退出登录',
    key: 'Logout',
  },
]

async function settingSelect(key: string) {
  if (key === 'Logout') {
    isLoading(true)
    await useSupabase().logout()
    clearUser()
    clearStars()
    isLoading(false)
  }
  if (key === 'GetStars') {
    isLoading(true)
    if (token) {
      const data = await useGithub().getStarredList({
        token: token.value,
      })
      setStars(data.data as GithubRepoItem[])
      const categories = await getCategory()
      if (categories)
        setCategory(takeTags(categories))
    }
    isLoading(false)
  }
}
</script>

<template>
  <n-card :bordered="false" size="medium">
    <n-space vertical class="flex items-center justify-center">
      <template v-if="avatar">
        <n-dropdown
          trigger="click"
          :options="settings" hover:cursor-pointer @select="settingSelect"
        >
          <n-button text style="font-size: 24px">
            <n-avatar v-if="avatar" round :src="avatar" :size="48" />
          </n-button>
        </n-dropdown>
      </template>
      <template v-else>
        <n-tooltip placement="bottom" trigger="hover">
          <template #trigger>
            <n-button text style="font-size: 24px" @click="loginToGithub">
              <n-avatar round :size="48" bg-gray-1 />
            </n-button>
          </template>
          <span> 点击登录Github~ </span>
        </n-tooltip>
      </template>
    </n-space>
  </n-card>
</template>
