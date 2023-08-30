<script lang="ts" setup>
import { computed, onMounted, ref, unref } from 'vue'

const {
  menuSetting,
} = usePageSetting()

const settingStore = usePageSettingStore()

const collapsed = ref<boolean>(false)

const { mobileWidth } = unref(menuSetting)

const isMobile = computed<boolean>({
  get: () => settingStore.pageSettings.isMobile,
  set: val => settingStore.setIsMobile(val),
})

// 判断是否触发移动端模式
function checkMobileMode() {
  if (document.body.clientWidth <= mobileWidth)
    isMobile.value = true
  else
    isMobile.value = false

  collapsed.value = false
}

function watchWidth() {
  const Width = document.body.clientWidth
  if (Width <= 950)
    collapsed.value = true
  else collapsed.value = false

  checkMobileMode()
}

onMounted(() => {
  checkMobileMode()
  window.addEventListener('resize', watchWidth)
})
</script>

<template>
  <n-layout class="layout" position="absolute" has-sider>
    <n-layout>
      <n-layout-header position="absolute">
        <Header v-model:collapsed="collapsed" />
      </n-layout-header>

      <n-layout-content
        class="layout-content"
        :class="{ 'layout-default-background': isDark === false }"
      >
        <div
          class="layout-content-main layout-content-main-fix"
        >
          <div class="mt-[2em] pt-0">
            <Main />
          </div>
        </div>
      </n-layout-content>
      <n-back-top :right="100" />
    </n-layout>
  </n-layout>
</template>

<style lang="less" scoped>
  .layout {
    display: flex;
    flex-direction: row;
    flex: auto;

    &-default-background {
      background: #f5f7f9;
    }

    .layout-sider {
      min-height: 100vh;
      box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
      position: relative;
      z-index: 13;
      transition: all 0.2s ease-in-out;
    }

    .layout-sider-fix {
      position: fixed;
      top: 0;
      left: 0;
    }

    .ant-layout {
      overflow: hidden;
    }

    .layout-right-fix {
      overflow-x: hidden;
      padding-left: 200px;
      min-height: 100vh;
      transition: all 0.2s ease-in-out;
    }

    .layout-content {
      flex: auto;
      min-height: 100vh;
    }

    .n-layout-header.n-layout-header--absolute-positioned {
      z-index: 11;
    }

    .n-layout-footer {
      background: none;
    }
  }

  .layout-content-main {
    margin: 0 10px 10px;
    position: relative;
    padding-top: 64px;
  }

  .layout-content-main-fix {
    padding-top: 64px;
  }

  .fluid-header {
    padding-top: 0;
  }

  .noMultiTabs {
    padding-top: 0;
  }
</style>
