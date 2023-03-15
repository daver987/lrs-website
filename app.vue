<script setup lang="ts">
import { useUserStore } from './stores/useUserStore'
import { useStorage } from '@vueuse/core'

useHead({
  meta: [
    {
      name: 'naive-ui-style',
    },
  ],
})

const userStore = useUserStore()
const user_id = useStorage('hpl_user_id', userStore.getUserId())

userStore.setUserId(user_id.value)
</script>

<template>
  <NLoadingBarProvider>
    <NMessageProvider>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </NMessageProvider>
  </NLoadingBarProvider>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.3s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

.layout-enter-active,
.layout-leave-active {
  transition: all 0.3s;
}

.layout-enter-from,
.layout-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
