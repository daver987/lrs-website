import { Stripe } from 'stripe'
import { getHeaders, readRawBody, defineEventHandler } from 'h3'
import twilio from 'twilio'

const stripe = new Stripe(useRuntimeConfig().STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
})
const TWILIO_ACCOUNT_SID = useRuntimeConfig().TWILIO_ACCOUNT_SID
const TWILIO_AUTH_TOKEN = useRuntimeConfig().TWILIO_AUTH_TOKEN
const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

export default defineEventHandler(async (event) => {
  const endpointSecret = useRuntimeConfig().stripeWebhookSecret
  const body = (await readRawBody(event)) as unknown as StripeResponse
  const headers = getHeaders(event)
  const sig = headers['stripe-signature'] as string
  // @ts-ignore
  const stripeEvent = stripe.webhooks.constructEvent(body, sig, endpointSecret)
  // @ts-ignore
  if (stripeEvent.type === 'checkout.session.completed') {
    const checkoutSession = stripeEvent.data.object
    // @ts-ignore
    const { email } = checkoutSession
    console.log(checkoutSession)
    await client.messages.create({
      body: `Order Booked For: ${email}`,
      messagingServiceSid: 'MG9b5c0af877bac1ebc7504e98a8022456',
      to: '+12894009408',
    })
  }
  if (stripeEvent.type === 'customer.created') {
    const customer = stripeEvent.data.object
    // @ts-ignore
    const { name } = customer
    await client.messages.create({
      body: `Customer: ${name} has been created`,
      messagingServiceSid: 'MG9b5c0af877bac1ebc7504e98a8022456',
      to: '+12894009408',
    })
  }

  return {
    statusCode: 200,
  }
})
