<script lang="ts" setup>
const route = useRoute().params.slug[0]
const { decode } = useLinkShortener('https://highparklivery.com')
const quoteNumber = decode(route)

function isValidQuoteNumber(quoteNumber: number) {
  return (
    quoteNumber.toString().length >= 4 && quoteNumber.toString().length <= 5
  )
}

if (isValidQuoteNumber(quoteNumber)) {
  await navigateTo({
    path: '/cart',
    query: {
      quote_number: quoteNumber,
    },
  })
} else {
  await navigateTo('/')
}
</script>

<template>
  <n-grid :cols="1">
    <n-grid-item> ITEM 1</n-grid-item>
    <n-grid-item :span="1">Item 2</n-grid-item>
  </n-grid>
</template>
