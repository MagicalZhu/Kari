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
    const UserIcon = IconsMap.User
    // const message = useMessage()
    const dialog = useDialog()

    const { name } = useUserStore()?.info || {}

    const state = reactive({
      username: name ?? 'Pacos',
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
        key: 1,
      },
      {
        label: '退出登录',
        key: 2,
      },
    ]

    // 头像下拉菜单
    const avatarSelect = (key: number) => {
      switch (key) {
        case 1:
          break
        case 2:
          doLogout()
          break
      }
    }

    return {
      UserIcon,
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
  <div class="layout-header">
    <!-- 顶部菜单 -->
    <div class="layout-header-left">
      <div class="logo">
        <h2 class="title">
          Pacos
        </h2>
      </div>
    </div>
    <div class="layout-header-right">
      <div
        v-for="(item, index) in iconList"
        :key="index"
        class="layout-header-trigger layout-header-trigger-min"
      >
        <n-tooltip placement="bottom">
          <template #trigger>
            <n-icon size="22">
              <component :is="item.icon" v-on="item.eventObject || {}" />
            </n-icon>
          </template>
          <span>{{ item.tips }}</span>
        </n-tooltip>
      </div>
      <!-- 个人中心 -->
      <div class="layout-header-trigger layout-header-trigger-min">
        <n-dropdown trigger="hover" :options="avatarOptions">
          <div class="avatar">
            <n-avatar round>
              {{ username }}
            </n-avatar>
          </div>
        </n-dropdown>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .layout-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    height: 64px;
    box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
    transition: all 0.2s ease-in-out;
    width: 100%;
    z-index: 11;

    &-left {
      display: flex;
      align-items: center;

      .logo {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 64px;
        line-height: 64px;
        overflow: hidden;
        white-space: nowrap;
        padding-left: 10px;

        .title {
          margin-bottom: 0;
        }
      }

    }

    &-right {
      display: flex;
      align-items: center;
      margin-right: 20px;

      .avatar {
        display: flex;
        align-items: center;
        height: 64px;
      }

      > * {
        cursor: pointer;
      }
    }

    &-trigger {
      display: inline-block;
      width: 64px;
      height: 64px;
      text-align: center;
      cursor: pointer;
      transition: all 0.2s ease-in-out;

      .n-icon {
        display: flex;
        align-items: center;
        height: 64px;
        line-height: 64px;
      }

      &:hover {
        background: hsla(0, 0%, 100%, 0.08);
      }
    }
    &-trigger-min {
      width: auto;
      padding: 0 12px;
    }
  }
</style>
