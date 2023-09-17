import { acceptHMRUpdate, defineStore } from 'pinia'

import { ACCESS_TOKEN } from '~/config/storeType'

import { storage } from '~/util/Storage'

export const useUserStore = defineStore('user', () => {
  const token = ref(storage.get(ACCESS_TOKEN, ''))
  const username = ref('')
  const avatar = ref('')
  const userId = ref('')

  const setToken = (tokenStr: string) => {
    token.value = tokenStr
  }

  const setAvatar = (avatarStr: string) => {
    avatar.value = avatarStr
  }

  const setUserName = (name: string) => {
    username.value = name
  }

  const setUserId = (id: string) => {
    userId.value = id
  }

  const clearUser = () => {
    setToken('')
    setAvatar('')
    setUserName('')
    setUserId('')
  }

  const hasLogin = computed(() => {
    if (username.value && username.value !== '')
      return true
    return false
  })

  return {
    token,
    username,
    avatar,
    userId,
    setToken,
    setAvatar,
    setUserName,
    setUserId,
    clearUser,
    hasLogin,
  }
}, {
  persist: true,
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
