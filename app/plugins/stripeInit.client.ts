import { loadStripe } from '@stripe/stripe-js'

export default defineNuxtPlugin(async (_nuxtApp) => {
  const publicKey = useRuntimeConfig().public.STRIPE_PUBLISHABLE_KEY
  const stripeInit = async () => {
    return await loadStripe(publicKey)
  }
  const stripe = await stripeInit()
  return {
    provide: {
      stripe,
    },
  }
})
