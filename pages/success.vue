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
    class="flex flex-col justify-between bg-neutral-800"
    style="min-height: 100dvh"
  >
    <AppNavigation />
    <Summary />
    <SubFooter />
  </div>
</template>
