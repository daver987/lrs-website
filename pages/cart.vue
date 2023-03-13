<script lang="ts" setup>
definePageMeta({
  title: 'Cart',
  layout: 'default',
})
</script>

<template>
  <div style="min-height: 100dvh" class="bg-background-dark">
    <AppNavigation />
    <ShoppingCart />
    <SubFooter />
  </div>
</template>
