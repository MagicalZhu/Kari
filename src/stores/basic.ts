import { acceptHMRUpdate, defineStore } from 'pinia'

export const useLoadingStore = defineStore('loading', () => {
  const showLoading = ref(false)

  function isLoading(show: boolean) {
    showLoading.value = show
  }

  return {
    showLoading,
    isLoading,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useLoadingStore, import.meta.hot))
