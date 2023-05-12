<script lang="ts" setup>
definePageMeta({
  title: 'Success',
  name: 'Success',
  layout: 'store',
  colorMode: 'dark',
})
</script>

<template>
  <div
    style="min-height: 100dvh"
    class="flex flex-col justify-between bg-neutral-800"
  >
    <AppNavigation />
    <Summary />
    <SubFooter />
  </div>
</template>
