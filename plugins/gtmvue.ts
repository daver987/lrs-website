import { createGtm } from '@gtm-support/vue-gtm'
import { useRuntimeConfig } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  const gtmId = useRuntimeConfig().public.GTM_ID
  const isEnabled = useRuntimeConfig().public.TAG_MANAGER_ENABLED === 'true'
  const router = useRouter()
  nuxtApp.vueApp.use(
    createGtm({
      id: gtmId, // Your GTM single container ID, array of container ids ['GTM-xxxxxx', 'GTM-yyyyyy'] or array of objects [{id: 'GTM-xxxxxx', queryParams: { gtm_auth: 'abc123', gtm_preview: 'env-4', gtm_cookies_win: 'x'}}, {id: 'GTM-yyyyyy', queryParams: {gtm_auth: 'abc234', gtm_preview: 'env-5', gtm_cookies_win: 'x'}}], // Your GTM single container ID or array of container ids ['GTM-xxxxxx', 'GTM-yyyyyy']
      // queryParams: {
      //   // Add URL query string when loading gtm.js with GTM ID (required when using custom environments)
      //   gtm_auth: 'AB7cDEf3GHIjkl-MnOP8qr',
      //   gtm_preview: 'env-4',
      //   gtm_cookies_win: 'x',
      // },
      defer: false,
      // compatibility: false, // Will add `async` and `defer` to the script tag to not block requests for old browsers that do not support `async`
      // nonce: '2726c7f26c', // Will add `nonce` to the script tag
      enabled: isEnabled, // defaults to true. Plugin can be disabled by setting this to false for Ex: enabled: !!GDPR_Cookie (optional)
      debug: false, // Whether display console logs debugs (optional)
      loadScript: true, // Whether to load the GTM Script (Helpful if you are including GTM manually, but need the dataLayer functionality in your components) (optional)
      vueRouter: router, // Pass the router instance to automatically sync with router (optional)
      // ignoredViews: ['homepage'], // Don't trigger events for specified router names (optional)
      trackOnNextTick: false, // Whether call trackView in Vue.nextTick
    })
  )
})
