import Stripe from 'stripe'
import type { H3Event } from 'h3'

export function stripeInit(event: H3Event) {
  const { STRIPE_SECRET_KEY } = useRuntimeConfig(event)
  return new Stripe(STRIPE_SECRET_KEY)
}
