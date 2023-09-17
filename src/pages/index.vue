<script setup lang="ts">
import { IconsMap } from '~/config/icons'
import { Star } from '~/components/Star'
</script>

<template>
  <div>
    <n-grid cols="1 s:2 m:5 l:5 xl:5 2xl:5" responsive="screen" :x-gap="16" :y-gap="8" px-2.5em>
      <n-grid-item span="1">
        <n-space vertical>
          <Star.AccountInfo />
          <Star.RepoLangInfo />
        </n-space>
      </n-grid-item>
      <n-grid-item span="3">
        <n-card :bordered="false" size="medium">
          <!-- Search  -->
          <n-input placeholder="搜索" size="large" mb-1.5em>
            <template #suffix>
              <n-icon :component="IconsMap.Search" />
            </template>
          </n-input>
          <!-- Repos -->
          <Star.RepoInfo />
        </n-card>
      </n-grid-item>
      <n-grid-item span="1">
        <n-card :bordered="false" size="medium">
          <n-space vertical>
            <Star.TagsInfo />
          </n-space>
        </n-card>
      </n-grid-item>
    </n-grid>
  </div>
</template>
