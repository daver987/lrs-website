<script setup lang="ts">
definePageMeta({
  title: 'Contact High Park Livery - Your Toronto Black Car Service Provider',
  description:
    'Get in touch with High Park Livery, the leading black car service in the Greater Toronto Area. Reach out for inquiries, support, and booking assistance.',
  layout: 'default',
  colorMode: 'dark',
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
