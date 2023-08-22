<template>
  <main class="text-c min-h-full flex flex-col px-4 pb-3 pt-24">
    <div class="mb-6 flex-1">
      <Navbar>
        <slot name="navbar" />
      </Navbar>
      <slot />
    </div>
  </main>
</template>
