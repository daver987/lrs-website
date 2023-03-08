<script lang="ts" setup>
definePageMeta({
  title: 'Cart',
  layout: 'store',
})
</script>

<template>
  <div style="min-height: 100dvh" class="flex flex-col justify-between">
    <AppNavigation />
    <ShoppingCart />
    <SubFooter />
  </div>
</template>
