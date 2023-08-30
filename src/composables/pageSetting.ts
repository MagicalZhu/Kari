import { computed } from 'vue'

export function usePageSetting() {
  const pageStore = usePageSettingStore().pageSettings
  const isMobile = computed(() => pageStore.isMobile)
  const menuSetting = computed(() => pageStore.menuSetting)

  return {
    isMobile,
    menuSetting,
  }
}
