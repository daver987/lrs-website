<script setup lang="ts">
const route = useRoute().params.slug[0]
const { decode } = useLinkShortener('https://highparklivery.com')
const quoteNumber = decode(route)

// Add a function to check if the decoded quote number is valid.
function isValidQuoteNumber(quoteNumber: number) {
  // Check the validity of the quote number. This could involve checking
  // the length, format, or any other relevant criteria for your application.
  // Here's an example of checking the length:
  return quoteNumber.toString().length >= 4 && quoteNumber.toString().length <= 5
}

if (isValidQuoteNumber(quoteNumber)) {
  await navigateTo({
    path: '/cart',
    query: {
      quote_number: quoteNumber,
    },
  })
} else {
  // Redirect to another page if the quote number is not valid, e.g., homepage or an error page.
  await navigateTo('/')
}
</script>


<template>
  <n-grid :cols="1">
    <n-grid-item> ITEM 1</n-grid-item>
    <n-grid-item :span="1">Item 2 </n-grid-item>
  </n-grid>
</template>
