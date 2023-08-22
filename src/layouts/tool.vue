<!--
  layout for about index
-->
<template>
  <main class="text-c slide-enter min-h-full flex flex-col px-4 pb-3 pt-5em">
    <div class="mb-6 flex-1">
      <Navbar>
        <slot name="navbar" />
      </Navbar>
      <RouterView />
    </div>
  </main>
</template>
