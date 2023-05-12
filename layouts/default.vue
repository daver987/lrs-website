<script lang="ts" setup>
import { navigation } from '~/data/navigation'

useHead({
  meta: [
    { property: 'og:type', content: 'website' },
    {
      property: 'og:title',
      content:
        'High Park Livery - Premium Black Car Service in Greater Toronto',
    },
    {
      property: 'og:description',
      content:
        'High Park Livery offers top-quality black car services in the Greater Toronto Area. Book a ride for airport transfers, corporate travel, or special events.',
    },
    { property: 'og:image', content: 'images/HPL-Logo-White.png' },
    { property: 'og:url', content: 'https://highparklivery.com' },
    { name: 'twitter:card', content: 'images/HPL-Logo-White.png' },
    {
      name: 'twitter:title',
      content: 'High Park Livery - Black Car Service in Greater Toronto Area',
    },
    {
      name: 'twitter:description',
      content:
        'High Park Livery offers premium black car services in the Greater Toronto Area. Experience luxury transportation for airport transfers, special events, and more.',
    },
    { name: 'twitter:image', content: 'images/HPL-Logo-White.png' },
  ],
})
const footerData = {
  companyName: 'High Park Livery',
  companyEmail: 'info@highparklivery.com',
  companyPhone: '+16473609631',
  companyLogo: '/images/HPL-Logo-White.png',
}
</script>

<template>
  <div class="dark:bg-neutral-800">
    <slot />
    <AppFooter :company-data="footerData" :navigation="navigation">
      <template #footer-cta>
        <FooterCta />
      </template>
      <template #email-input>
        <EmailInput />
      </template>
      <template #sub-footer>
        <SubFooter />
      </template>
    </AppFooter>
  </div>
</template>
