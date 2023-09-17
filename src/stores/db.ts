import { acceptHMRUpdate, defineStore } from 'pinia'

import type { Category } from '~/types/base'

export const useDbStore = defineStore('db', () => {
  const category = ref<Category[]>([])

  const setCategory = (data: Category[]) => {
    category.value = data
  }
  return {
    category,
    setCategory,
  }
}, {
  persist: true,
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useDbStore, import.meta.hot))
