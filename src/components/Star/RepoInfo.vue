<script setup lang="ts">
import type { SelectRenderTag } from 'naive-ui'
import { NTag } from 'naive-ui'
import { IconsMap } from '~/config/icons'
import { MockData } from '~/config/data'

const cardData = computed(() => useGithubStore().starsData)

const showModal = ref(false)

function editStarItem() {
  showModal.value = true
}

const renderTag: SelectRenderTag = ({ option, handleClose }) => {
  return h(
    NTag,
    {
      type: option.type as 'success' | 'warning' | 'error',
      closable: true,
      onMousedown: (e: FocusEvent) => {
        e.preventDefault()
      },
      onClose: (e: MouseEvent) => {
        e.stopPropagation()
        handleClose()
      },
    },
    { default: () => option.label },
  )
}
</script>

<template>
  <n-scrollbar style="max-height: 80vh" trigger="none" px-1.5em>
    <n-card
      v-for="item in cardData" :key="item.github_id"
      hoverable
      mb-4
      size="small"
    >
      <template #header>
        <n-button
          text
          tag="a"
          :href="item.html_url"
          target="_blank"
          type="primary"
          icon-placement="right"
        >
          <template #icon>
            <n-icon>
              <component :is="IconsMap.ExternalLink" />
            </n-icon>
          </template>
          {{ item.name }}
        </n-button>
      </template>
      <template #header-extra>
        <n-button text style="font-size: 24px" @click="editStarItem">
          <template #icon>
            <component :is="IconsMap.PenSquare" :size="18" text-gray-3 hover:text-gray-5 />
          </template>
        </n-button>
      </template>
      <span text-slate-4>
        <n-ellipsis :line-clamp="2" :tooltip="false">
          {{ item.description }}
        </n-ellipsis>
      </span>
      <template #footer>
        <n-space flex justify-between border-t border-dashed pt-1.5em text-xs>
          <div class="flex gap-4">
            <span class="flex gap-1">
              <component :is="IconsMap.Star" :size="14" />
              {{ item.stargazers_count }}
            </span>

            <span class="flex gap-1">
              <component :is="IconsMap.GitFork" :size="14" />
              {{ item.forks_count }}
            </span>

            <span class="flex gap-1">
              <component :is="IconsMap.Eye" :size="14" />
              {{ item.watchers_count }}
            </span>
          </div>
        </n-space>
      </template>
    </n-card>
  </n-scrollbar>
  <n-modal v-model:show="showModal" transform-origin="center">
    <n-card
      style="width: 600px"
      title="Edit Tag"
      :bordered="false"
      role="dialog"
      aria-modal="true"
    >
      <div flex items-center>
        <span w-4em>Tag :</span>
        <n-select
          multiple
          filterable
          tag
          max-tag-count="responsive"
          :render-tag="renderTag"
          placeholder="选择标签  🏷"
          :options="MockData.songs"
        >
          <template #arrow>
            <component :is="IconsMap.ChevronsUpDown" :size="6" />
          </template>
        </n-select>
      </div>
    </n-card>
  </n-modal>
</template>
