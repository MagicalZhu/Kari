<script setup lang="ts">
const name = computed<string>({
  get: () => useUserStore().username,
  set: val => useUserStore().setUserName(val),
})
</script>

<template>
  <div>
    <n-grid cols="1 s:2 m:4 l:4 xl:4 2xl:4" responsive="screen" :x-gap="8" :y-gap="8">
      <n-grid-item span="1">
        <n-card :bordered="false" size="medium">
          <n-space vertical class="flex items-center justify-end">
            <n-button v-if="name">
              {{ name }}
            </n-button>
            <span v-else>
              什么都没有~
            </span>
          </n-space>
        </n-card>
      </n-grid-item>
      <n-grid-item span="2">
        <n-card :bordered="false" size="medium">
          456
        </n-card>
      </n-grid-item>
      <n-grid-item span="1">
        <n-card :bordered="false" size="medium">
          456
        </n-card>
      </n-grid-item>
    </n-grid>
  </div>
</template>
