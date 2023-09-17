import { acceptHMRUpdate, defineStore } from 'pinia'
import type { GithubRepoItem } from '~/types/base'

export const useGithubStore = defineStore('github', () => {
  const starsData = ref<GithubRepoItem[]>([])
  const languageData = ref<{ [prop: string]: number }>({})

  function setStars(data: GithubRepoItem[]) {
    languageData.value = {}
    starsData.value = data
    data.forEach((item) => {
      const tag = item.language || 'Other'
      if (languageData.value[tag]) {
        let count = languageData.value[tag]
        languageData.value[tag] = ++count
      }
      else {
        languageData.value[tag] = 1
      }
    })
  }

  function clearStars() {
    starsData.value = []
    languageData.value = {}
  }

  return {
    starsData,
    setStars,
    languageData,
    clearStars,
  }
}, {
  persist: true,
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useGithubStore, import.meta.hot))
