import { acceptHMRUpdate, defineStore } from 'pinia'
import type { OAuthResponse } from '@supabase/supabase-js'

export const useSupabaseStore = defineStore('supabase', () => {
  const loginData = ref({})

  function setLoginData(data: OAuthResponse) {
    loginData.value = data
  }

  return {
    setLoginData,
    loginData,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useSupabaseStore, import.meta.hot))
