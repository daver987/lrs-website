<script setup lang="ts">
definePageMeta({
  title: 'Contact Us',
  layout: 'default',
  colorMode: 'dark',
})
useHead({
  title: 'High Park Livery | Contact Us',
})

const headerInfo = {
  aboveHeading: 'GET IN TOUCH',
  heading: 'CONTACT US',
  body: "Your chauffeur is just a phone call away! Don't hesitate to contact us or get an online quote for rates and availability.",
  image:
    'background-image: url("https://imagedelivery.net/9mQjskQ9vgwm3kCilycqww/aaaa6d7c-0342-48e8-f2ea-66707d09ea00/4200")',
}
</script>

<template>
  <div>
    <AppHeader
      :aboveHeading="headerInfo.aboveHeading"
      :body="headerInfo.body"
      :heading="headerInfo.heading"
      :image="headerInfo.image"
    />
    <BaseSection class="-mt-20 pt-0">
      <ContactForm />
    </BaseSection>
    <Notification :show="false" />
    <AppFooter />
  </div>
</template>
