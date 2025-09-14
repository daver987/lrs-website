<script setup lang="ts">
definePageMeta({
  layout: 'default',
  colorMode: 'dark',
})

const appConfig = useAppConfig()
useHead({
  title: `Contact ${appConfig.brand.name} - Your Toronto Black Car Service Provider`,
  meta: [
    {
      name: 'description',
      content: `Get in touch with ${appConfig.brand.name}, the leading black car service in the Greater Toronto Area. Reach out for inquiries, support, and booking assistance.`,
    },
  ],
})

const headerInfo = {
  aboveHeading: 'GET IN TOUCH',
  heading: 'CONTACT US',
  body: "Your chauffeur is just a phone call away! Don't hesitate to contact us or get an online quote for rates and availability.",
  image: '/images/toronto-5.jpg',
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
  </div>
</template>
