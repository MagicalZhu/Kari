<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { useDialog } from 'naive-ui'
import { IconsMap } from '~/config/icons'

export default defineComponent({
  name: 'PageHeader',
  props: {
    collapsed: {
      type: Boolean,
    },
    inverted: {
      type: Boolean,
    },
  },
  setup() {
    const { isLoading } = useLoadingStore()
    const { setAvatar, setUserName, username } = useUserStore()
    const CogIcon = IconsMap.Cog
    // const message = useMessage()
    const dialog = useDialog()

    const state = reactive({
      username: username ?? 'Pacos',
    })

    // 退出登录
    const doLogout = () => {
      dialog.info({
        title: '提示',
        content: '您确定要退出登录吗',
        positiveText: '确定',
        negativeText: '取消',
        onPositiveClick: () => {
          // userStore.logout().then(() => {
          //   message.success('成功退出登录')
          //   // 移除标签页
          //   localStorage.removeItem(TABS_ROUTES)
          //   router
          //     .replace({
          //       name: 'Login',
          //       query: {
          //         redirect: route.fullPath,
          //       },
          //     })
          //     .finally(() => location.reload())
          // })
        },
        onNegativeClick: () => {},
      })
    }

    // 图标列表
    const iconList = [
      {
        icon: IconsMap.Settings,
        tips: '搜索',
        eventObject: {
          click: () => {
            console.error(123)
          },
        },
      },
    ]
    const avatarOptions = [
      {
        label: '个人设置',
        key: 'Personal-Setting',
        show: true,
      },
      {
        label: '登录',
        key: 'Login',
        show: !username,
      },
      {
        label: '退出登录',
        key: 'Logout',
        show: !!username,
      },
    ]

    // 头像下拉菜单
    const avatarSelect = async (key: string) => {
      if (key === 'Login') {
        isLoading(true)
        await useSupabase().LoginWithGithub()
        isLoading(false)
      }

      if (key === 'Logout') {
        isLoading(true)
        await useSupabase().logout()
        isLoading(false)
      }
      if (key === 'Personal-Setting') {
        isLoading(true)
        const session = await useSupabase().getSession()
        console.error(session)
        if (session && session.provider_token) {
          const data = await useGithub().getStarredList({
            token: session.provider_token,
          })
          console.error(data)
        }
        setAvatar(session?.user.user_metadata.avatar_url)
        setUserName(session?.user.user_metadata.name)
        isLoading(false)
      }
    }

    return {
      CogIcon,
      ...toRefs(state),
      iconList,
      doLogout,
      avatarOptions,
      avatarSelect,
    }
  },
})
</script>

<template>
  <div class="h-16 py-4">
    <div class="flex items-center justify-end space-x-4">
      <!-- 个人中心 -->
      <div>
        <n-dropdown trigger="click" :options="avatarOptions" hover:cursor-pointer @select="avatarSelect">
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
