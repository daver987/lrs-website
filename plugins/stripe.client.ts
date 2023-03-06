import { loadStripe } from '@stripe/stripe-js'
export default defineNuxtPlugin((nuxtApp) => {
  const STRIPE_PUBLISHABLE_KEY = useRuntimeConfig().STRIPE_PUBLISHABLE_KEY
  const stripe = loadStripe(STRIPE_PUBLISHABLE_KEY)
  return {
    provide: {
      stripe,
    },
  }
})
