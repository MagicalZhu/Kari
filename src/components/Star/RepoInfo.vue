<script setup lang="ts">
import type { SelectOption, SelectRenderTag } from 'naive-ui'
import { NTag } from 'naive-ui'
import { IconsMap } from '~/config/icons'
import { getChildrenLevelOptions, getParentLevelOptions } from '~/util/db'

const cardData = computed(() => useGithubStore().starsData)

const parentData = computed(() => {
  return getParentLevelOptions(useDbStore().category)
})

const childrenData = ref<SelectOption[]>([])

const model = ref({
  parent: null,
  children: [],
  comment: '',
})

watch(
  () => model.value.parent,
  (parentId) => {
    if (parentId)
      childrenData.value = getChildrenLevelOptions(useDbStore().category, parentId)
  },
)

const showModal = ref(false)
const githubId = ref('')

function editStarItem(githubIdStr:string) {
  model.value = {
    parent: null,
    children: [],
    comment: '',
  }
  githubId.value = githubIdStr
  showModal.value = true
}

function saveToDb() {
  const { parent, children, comment } = model.value
  if (!parent && children)
    return false
  if
}

const renderTag: SelectRenderTag = ({ option, handleClose }) => {
  return h(
    NTag,
    {
      // type: option.type as 'success' | 'warning' | 'error',
      bordered: false,
      closable: true,
      onMousedown: (e: FocusEvent) => {
        e.preventDefault()
      },
      onClose: (e: MouseEvent) => {
        e.stopPropagation()
        handleClose()
      },
      class: 'rounded-lg',
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
            <n-icon :size="12">
              <component :is="IconsMap.ExternalLink" />
            </n-icon>
          </template>
          {{ item.name }}
        </n-button>
      </template>
      <template #header-extra>
        <n-button text style="font-size: 24px" @click="editStarItem(item.github_id)">
          <template #icon>
            <component :is="IconsMap.PenSquare" :size="14" text-gray-3 hover:text-gray-7 />
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
      <n-form
        :model="model"
        label-placement="left"
        label-width="auto"
        require-mark-placement="right-hanging"
      >
        <!-- parent tag -->
        <n-form-item label="一级标签" path="parent">
          <n-select
            v-model:value="model.parent"
            filterable
            clearable
            placeholder="这是一级标签 ..."
            :options="parentData"
          >
            <template #arrow>
              <component :is="IconsMap.ChevronsUpDown" :size="6" />
            </template>
          </n-select>
        </n-form-item>

        <!-- children tag -->
        <n-form-item v-if="model.parent" label="二级标签" path="children">
          <n-select
            v-model:value="model.children"
            tag
            multiple
            filterable
            :max-tag-count="3"
            :render-tag="renderTag"
            placeholder="这是二级标签 ..."
            :options="childrenData"
          >
            <template #arrow>
              <component :is="IconsMap.ChevronsUpDown" :size="6" />
            </template>
          </n-select>
        </n-form-item>
        <n-form-item label="备注" path="comment">
          <n-input
            v-model:value="model.comment"
            placeholder="说点什么吧 ..."
            maxlength="30"
            type="textarea"
            show-count
            :autosize="{
              minRows: 1,
              maxRows: 2,
            }"
          />
        </n-form-item>
        <div flex justify-end>
          <n-button type="primary" @click="saveToDb">
            保存
          </n-button>
        </div>
      </n-form>
    </n-card>
  </n-modal>
</template>
