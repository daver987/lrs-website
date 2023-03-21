import { Stripe, StripeEvent } from 'stripe'
import { getHeaders, readRawBody, defineEventHandler } from 'h3'
import twilio, { Twilio } from 'twilio'

const runtimeConfig = useRuntimeConfig()
const stripe = new Stripe(runtimeConfig.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
})
const TWILIO_ACCOUNT_SID = runtimeConfig.TWILIO_ACCOUNT_SID
const TWILIO_AUTH_TOKEN = runtimeConfig.TWILIO_AUTH_TOKEN
const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

interface StripeResponse {
  [key: string]: any
}

export default defineEventHandler(async (event) => {
  const endpointSecret = runtimeConfig.stripeWebhookSecret
  const body = await readRawBody(event)
  const headers = getHeaders(event)
  const sig = headers['stripe-signature'] as string

  let stripeEvent: StripeEvent
  try {
    stripeEvent = stripe.webhooks.constructEvent(body, sig, endpointSecret)
  } catch (error) {
    console.error('Error when constructing webhook event:', error)
    return {
      statusCode: 400,
    }
  }

  if (stripeEvent.type === 'checkout.session.completed') {
    const checkoutSession = stripeEvent.data.object as Stripe.Checkout.Session
    const { customer_email: email } = checkoutSession

    console.log(checkoutSession)

    await client.messages.create({
      body: `Order Booked For: ${email}`,
      messagingServiceSid: 'MG9b5c0af877bac1ebc7504e98a8022456',
      to: '+12894009408',
    })
  }

  if (stripeEvent.type === 'customer.created') {
    const customer = stripeEvent.data.object as Stripe.Customer
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
