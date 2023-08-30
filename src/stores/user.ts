import { acceptHMRUpdate, defineStore } from 'pinia'

import { ACCESS_TOKEN, CURRENT_USER } from '~/config/storeType'

import { storage } from '~/util/Storage'

export interface UserInfoType {
  name: string
  email: string
}

export interface IUserState {
  token: string
  username: string
  welcome: string
  avatar: string
  permissions: any[]
  info: UserInfoType
}

export const useUserStore = defineStore('user', () => {
  const token = ref(storage.get(ACCESS_TOKEN, ''))
  const username = ref('')
  const welcome = ref('')
  const avatar = ref('')
  const permissions = ref([])
  const info = ref(storage.get(CURRENT_USER, {}))

  const setToken = (tokenStr: string) => {
    token.value = tokenStr
  }

  const setAvatar = (avatarStr: string) => {
    avatar.value = avatarStr
  }

  const setPermissions = (permissionsBuf: []) => {
    permissions.value = permissionsBuf
  }

  const setUserInfo = (userInfo: UserInfoType) => {
    info.value = userInfo
  }

  return {
    token,
    username,
    welcome,
    avatar,
    permissions,
    info,
    setToken,
    setAvatar,
    setPermissions,
    setUserInfo,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore as any, import.meta.hot))
