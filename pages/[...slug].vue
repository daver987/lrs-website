<script setup lang="ts">
const route = useRoute().params.slug[0]
const { decode } = useLinkShortener('https://highparklivery.com')
const quoteNumber = decode(route)
await navigateTo({
  path: '/cart',
  query: {
    quote_number: quoteNumber,
  },
})
</script>

<template>
  <n-grid :cols="1">
    <n-grid-item> ITEM 1</n-grid-item>
    <n-grid-item :span="1">Item 2 </n-grid-item>
  </n-grid>
</template>
