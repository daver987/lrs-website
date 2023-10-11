<script lang="ts" setup>
definePageMeta({
  title: 'Cart',
  layout: 'default',
  colorMode: 'dark',
})
</script>

<template>
  <div class="bg-background-dark" style="min-height: 100dvh">
    <AppNavigation />
    <ShoppingCart />
    <SubFooter />
  </div>
</template>
