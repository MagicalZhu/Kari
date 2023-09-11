<script lang="ts" setup>
import { IconsMap } from '~/config/icons'

const { isLoading } = useLoadingStore()
const { setAvatar, setUserName, setToken, clearUser } = useUserStore()

const username = computed(() => useUserStore().username)
const token = computed(() => useUserStore().token)

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

const CogIcon = IconsMap.Cog

// 图标列表
// const iconList = [
//   {
//     icon: IconsMap.Settings,
//     tips: '搜索',
//     eventObject: {
//       click: () => {
//         console.error(123)
//       },
//     },
//   },
// ]

const settings = computed(() => {
  return [
    {
      label: '个人设置',
      key: 'Personal-Setting',
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

// 头像下拉菜单
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
  if (key === 'Personal-Setting') {
    isLoading(true)
    if (token) {
      const data = await useGithub().getStarredList({
        token: token.value,
      })
      console.error(data)
    }
    isLoading(false)
  }
}
</script>

<template>
  <div class="h-16 py-4">
    <div class="flex items-center justify-end space-x-4">
      <!-- 个人中心 -->
      <div>
        <n-dropdown
          trigger="click"
          :options="settings" hover:cursor-pointer @select="settingSelect"
        >
          <n-button text style="font-size: 24px">
            <n-avatar v-if="username" round class="mr-[2em]">
              {{ username }}
            </n-avatar>
            <n-icon v-else size="22" class="mr-[2em]">
              <component :is="CogIcon" />
            </n-icon>
          </n-button>
        </n-dropdown>
      </div>
    </div>
  </div>
</template>
