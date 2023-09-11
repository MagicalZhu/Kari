import { acceptHMRUpdate, defineStore } from 'pinia'
import type { GithubRepoItem } from '~/types/base'

export const useSupabaseStore = defineStore('supabase', () => {
  const starsData = ref<GithubRepoItem[]>([])

  function setStars(data: GithubRepoItem[]) {
    starsData.value = data
  }

  return {
    setStars,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useSupabaseStore, import.meta.hot))
