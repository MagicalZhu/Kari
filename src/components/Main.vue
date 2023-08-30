<template>
  <RouterView>
    <template #default="{ Component, route }">
      <Transition
        mode="out-in"
        appear
        name="zoom-fade"
      >
        <component :is="Component" :key="route.fullPath" />
      </Transition>
    </template>
  </RouterView>
</template>
