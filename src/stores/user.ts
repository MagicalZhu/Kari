import { acceptHMRUpdate, defineStore } from 'pinia'

import { ACCESS_TOKEN } from '~/config/storeType'

import { storage } from '~/util/Storage'

export interface IUserState {
  token: string
  username: string
  avatar: string
}

export const useUserStore = defineStore('user', () => {
  const token = ref(storage.get(ACCESS_TOKEN, ''))
  const username = ref('')
  const avatar = ref('')

  const setToken = (tokenStr: string) => {
    token.value = tokenStr
  }

  const setAvatar = (avatarStr: string) => {
    avatar.value = avatarStr
  }

  const setUserName = (name: string) => {
    username.value = name
  }

  return {
    token,
    username,
    avatar,
    setToken,
    setAvatar,
    setUserName,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
