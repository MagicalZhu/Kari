<script setup lang="ts">
import { displayTags } from '~/util/db'

const pattern = ref('')
const showIrrelevantNodes = ref(false)

const { category } = useDbStore()

const treeData = computed(() => {
  return displayTags(category)
})
</script>

<template>
  <div>
    <span class="flex items-center justify-start font-bold">标签</span>
  </div>
  <div>
    <n-tree
      :accordion="true"
      :expand-on-click="true"
      :show-irrelevant-nodes="showIrrelevantNodes"
      :pattern="pattern"
      :data="treeData"
      block-line
    />
  </div>
</template>
