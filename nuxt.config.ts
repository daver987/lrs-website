import '@total-typescript/ts-reset'

export default defineNuxtConfig({
  //@ts-ignore
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
  },
  build: {
    transpile: ['@headlessui/vue', '@googlemaps/js-api-loader'],
  },
  // extends: ['nuxt-seo-kit'],
  modules: [
    '@vueuse/nuxt',
    '@nuxtjs/fontaine',
    '@nuxtjs/robots',
    '@nuxtjs/tailwindcss',
    '@nuxt/image-edge',
    'nuxt-icon',
    'nuxt-vitest',
    '@huntersofbook/naive-ui-nuxt',
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', ['defineStore', 'definePiniaStore']],
      },
    ],
  ],
  nitro: {
    preset: 'vercel',
  },
  css: ['vue-tel-input/dist/vue-tel-input.css'],
  runtimeConfig: {
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    ZAPIER_WEBHOOK_SECRET: process.env.ZAPIER_WEBHOOK_SECRET,
    ZAPIER_WEBHOOK_EMAIL: process.env.ZAPIER_WEBHOOK_EMAIL,
    AIRCALL_API_TOKEN: process.env.AIRCALL_API_TOKEN,
    AIRCALL_API_ID: process.env.AIRCALL_API_ID,
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
    public: {
      GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
      WEBSITE_URL: process.env.WEBSITE_URL,
      siteUrl: 'https://highparklivery.com/',
      siteName: 'Toronto Car Service | High Park Livery',
      siteDescription:
        'A top-rated Toronto car service, High Park Livery provides luxury transportation to and from Toronto Pearson Airport, Billy Bishop Airport, and more.',
      language: 'en-CA',
      titleSeparator: '|',
    },
  },
  typescript: {
    shim: false,
  },
  naiveUI: {
    themeOverrides: {
      common: {
        primaryColor: '#9f6c27',
        primaryColorHover: '#674D32',
      },
    },
  },
})
