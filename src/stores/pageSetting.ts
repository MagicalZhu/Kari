import { acceptHMRUpdate, defineStore } from 'pinia'
import setting from '~/config/pageSetting'

export const usePageSettingStore = defineStore('pageSetting', () => {
  const pageSettings = ref(setting)

  const setIsMobile = (value: boolean): void => {
    pageSettings.value.isMobile = value
  }

  return {
    pageSettings,
    setIsMobile,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(usePageSettingStore, import.meta.hot))
