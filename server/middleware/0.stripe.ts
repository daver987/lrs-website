import Stripe from 'stripe'

let stripe: Stripe
declare module 'h3' {
  interface H3EventContext {
    stripe: Stripe
  }
}

export default eventHandler((event) => {
  const STRIPE_SECRET_KEY = useRuntimeConfig().STRIPE_SECRET_KEY
  if (!stripe) {
    stripe = new Stripe(STRIPE_SECRET_KEY, {
      apiVersion: '2022-11-15',
    })
  }
  event.context.stripe = stripe
})
