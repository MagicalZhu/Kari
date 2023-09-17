<script setup lang="ts">
import { MockData } from '~/config/data'

const pattern = ref('')
const showIrrelevantNodes = ref(false)
</script>

<template>
  <div>
    <span class="flex items-center justify-start font-bold">标签</span>
  </div>
  <div>
    <n-tree
      :accordion="true"
      :show-irrelevant-nodes="showIrrelevantNodes"
      :pattern="pattern"
      :data="MockData.TagsData"
      block-line
    />
  </div>
</template>
