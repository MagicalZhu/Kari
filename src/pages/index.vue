<script setup lang="ts">
defineOptions({
  name: 'IndexPage',
})
</script>

<template>
  <div class="mt-[6em] flex flex-col items-center justify-start">
    <n-grid :x-gap="16" :y-gap="16" :cols="9">
      <n-grid-item :offset="2" :span="1">
        <n-card size="medium" hoverable items-center justify-center>
          <n-avatar round :size="48">
            Pacos
          </n-avatar>
          <div flex items-center justify-center>
            Pacos
          </div>
        </n-card>
      </n-grid-item>
      <n-grid-item :span="3">
        <n-input placeholder="Search Repo ..." size="large" class="h-[2.5em] flex items-center justify-center align-middle">
          <template #prefix>
            <div class="i-carbon:search" />
          </template>
        </n-input>
      </n-grid-item>
      <n-grid-item :span="2">
        <div class="green" />
      </n-grid-item>

      <n-grid-item :offset="2" :span="1">
        <n-card size="huge" hoverable>
          <n-descriptions label-placement="left" :column="1">
            <template #header>
              <h1 class="text-[15px] font-black font-sans">
                OverView
              </h1>
            </template>
            <n-descriptions-item>
              <template #label>
                <span class="ml-4 font-medium">
                  Vue
                </span>
              </template>
              <span ml-1 text-base text-gray-4>56</span>
            </n-descriptions-item>
          </n-descriptions>
        </n-card>
      </n-grid-item>
      <n-grid-item :span="3">
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
        <div>123</div>
      </n-grid-item>
      <n-grid-item :span="2" />
    </n-grid>
  </div>
</template>

<style scoped>
.light-green {
  height: 108px;
  background-color: rgba(0, 128, 0, 0.12);
}
.green {
  height: 108px;
  background-color: rgba(0, 128, 0, 0.24);
}
</style>
