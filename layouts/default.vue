<script lang="ts" setup>
import { navigation } from '~/data/navigation'

const appConfig = useAppConfig()

useHead({
  meta: [
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: appConfig.brand.seo.title },
    { property: 'og:description', content: appConfig.brand.seo.description },
    { property: 'og:image', content: appConfig.brand.seo.ogImage },
    { property: 'og:url', content: appConfig.brand.domain },
    { name: 'twitter:card', content: appConfig.brand.seo.twitterImage },
    { name: 'twitter:title', content: appConfig.brand.seo.title },
    { name: 'twitter:description', content: appConfig.brand.seo.description },
    { name: 'twitter:image', content: appConfig.brand.seo.twitterImage },
  ],
})
const footerData = {
  companyName: appConfig.brand.name,
  companyEmail: appConfig.brand.contact.email,
  companyPhone: appConfig.brand.contact.phoneE164,
  companyPhoneDisplay: appConfig.brand.contact.phoneDisplay,
  companyLogo: appConfig.brand.assets.logo.light,
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
