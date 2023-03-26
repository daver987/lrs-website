<script lang="ts" setup>
definePageMeta({
  title: 'Success',
  name: 'Success',
  layout: 'store',
  colorMode: 'dark',
  middleware: ['quote-check'],
})
</script>

<template>
  <div style="min-height: 100dvh" class="flex flex-col justify-between">
    <AppNavigation />
    <Summary />
    <SubFooter />
  </div>
</template>
