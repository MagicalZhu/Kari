<script setup lang="ts">
import type { GithubRepoItem } from '~/types/base'
import { IconsMap } from '~/config/icons'

const { isLoading } = useLoadingStore()
const { setAvatar, setUserName, setToken, clearUser } = useUserStore()

const avatar = computed<string>(() => useUserStore().avatar)
const token = computed(() => useUserStore().token)

const { setStars, starsData } = useSupabaseStore()

const { user } = useSupabase()

watch(user, async () => {
  if (user.value) {
    const session = await useSupabase().getSession()
    if (session) {
      setAvatar(session?.user.user_metadata.avatar_url)
      setUserName(session?.user.user_metadata.name)
      if (session.provider_token)
        setToken(session.provider_token)
    }
    useRouter().push('/')
  }
}, { immediate: true })

const settings = [
  {
    label: '获取Stars',
    key: 'GetStars',
  },
  {
    label: '退出登录',
    key: 'Logout',
  },
]

async function loginToGithub() {
  isLoading(true)
  await useSupabase().LoginWithGithub()
  isLoading(false)
}

async function settingSelect(key: string) {
  if (key === 'Logout') {
    isLoading(true)
    await useSupabase().logout()
    clearUser()
    isLoading(false)
  }
  if (key === 'GetStars') {
    isLoading(true)
    if (token) {
      const data = await useGithub().getStarredList({
        token: token.value,
      })
      console.error(data)
      setStars(data.data as GithubRepoItem[])
    }
    isLoading(false)
  }
}
</script>

<template>
  <div>
    <n-grid cols="1 s:2 m:5 l:5 xl:5 2xl:5" responsive="screen" :x-gap="16" :y-gap="8" px-2.5em>
      <n-grid-item span="1">
        <n-card :bordered="false" size="medium">
          <n-space vertical class="flex items-center justify-end">
            <template v-if="avatar">
              <n-dropdown
                trigger="click"
                :options="settings" hover:cursor-pointer @select="settingSelect"
              >
                <n-button text style="font-size: 24px">
                  <n-avatar v-if="avatar" round :src="avatar" :size="48" />
                </n-button>
              </n-dropdown>
            </template>
            <template v-else>
              <n-tooltip placement="bottom" trigger="hover">
                <template #trigger>
                  <n-button text style="font-size: 24px" @click="loginToGithub">
                    <n-avatar round :size="48" bg-gray-1 />
                  </n-button>
                </template>
                <span> 点击登录Github~ </span>
              </n-tooltip>
            </template>
          </n-space>
        </n-card>
      </n-grid-item>
      <n-grid-item span="3">
        <n-card :bordered="false" size="medium">
          <n-scrollbar style="max-height: 80vh" trigger="none">
            <n-card
              v-for="item in starsData" :key="item.github_id"
              hoverable
              mb-4
              size="small"
            >
              <template #header>
                <n-button
                  text
                  tag="a"
                  :href="item.html_url"
                  target="_blank"
                  type="primary"
                  icon-placement="right"
                >
                  <template #icon>
                    <n-icon>
                      <component :is="IconsMap.ExternalLink" />
                    </n-icon>
                  </template>
                  {{ item.name }}
                </n-button>
              </template>
              <span text-slate-4>
                <n-ellipsis :line-clamp="2" :tooltip="false">
                  {{ item.description }}
                </n-ellipsis>
              </span>
              <n-divider dashed />
              <template #footer>
                <n-space flex justify-between pt-2 text-xs>
                  <div class="flex gap-4">
                    <span class="flex gap-1">
                      <component :is="IconsMap.Star" :size="14" />
                      {{ item.stargazers_count }}
                    </span>

                    <span class="flex gap-1">
                      <component :is="IconsMap.GitFork" :size="14" />
                      {{ item.forks_count }}
                    </span>

                    <span class="flex gap-1">
                      <component :is="IconsMap.Eye" :size="14" />
                      {{ item.watchers_count }}
                    </span>
                  </div>
                </n-space>
              </template>
            </n-card>
          </n-scrollbar>
        </n-card>
      </n-grid-item>
      <n-grid-item span="1">
        <n-card :bordered="false" size="medium">
          456
        </n-card>
      </n-grid-item>
    </n-grid>
  </div>
</template>
