import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    environmentOptions: {
      nuxt: {
        // Nuxt specific options
        domEnvironment: 'happy-dom', // 'happy-dom' (default) or 'jsdom'
      },
    },
  },
})
