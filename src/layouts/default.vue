<template>
  <n-space justify="center" mx-auto h-full w-full>
    <n-layout item-center>
      <!-- Header -->
      <n-layout-header class="absolute fixed left-0 left-0 top-0 z-40 h-17 w-full px-4 py-8">
        <Navbar />
      </n-layout-header>

      <RouterView />
    </n-layout>
  </n-space>
</template>
