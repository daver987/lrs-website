<script lang="ts" setup>
definePageMeta({
  title: 'Cart',
  layout: 'store',
})
</script>

<template>
  <div class="min-h-screen dark:bg-grey-900">
    <AppNavigation />
    <ShoppingCart />
    <SubFooter />
  </div>
</template>
