<script setup lang="ts">
const languageData = computed(() => useGithubStore().languageData)
</script>

<template>
  <n-scrollbar style="max-height: 80vh" trigger="none">
    <n-card :bordered="false" size="medium">
      <n-space vertical>
        <template v-if="languageData && Object.keys(languageData).length > 0">
          <span font-bold>Language</span>
          <ul>
            <li v-for="(value, key, index) in languageData" :key="index" pb-2>
              <span pl-1.5em font-600>{{ key }}</span>
              <span float-right pr-1.5em text-slate-4>{{ value }}</span>
            </li>
          </ul>
        </template>
      </n-space>
    </n-card>
  </n-scrollbar>
</template>
