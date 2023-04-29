import { Stripe } from 'stripe'
import { readRawBody, defineEventHandler } from 'h3'
import { stripe } from '~/server/utils/services/stripeInit'
import { z } from 'zod'

export default defineEventHandler(async (event) => {
  const messagingSID = useRuntimeConfig().TWILIO_MESSAGING_SID
  const endpointSecret = useRuntimeConfig().STRIPE_WEBHOOK_SECRET
  const client = event.context.twilioClient

  const rawBody = await readRawBody(event)
  const headers = getRequestHeaders(event)
  const sig = headers['stripe-signature'] as string

  const bodySchema = z.string()
  const body = bodySchema.parse(rawBody)
  console.log('Request Body from stripe', body)

  let stripeEvent

  try {
    stripeEvent = stripe.webhooks.constructEvent(body, sig, endpointSecret)
  } catch (error) {
    console.error('Error when constructing webhook event:', error)
    return {
      statusCode: 400,
    }
  }

  if (stripeEvent.type === 'setup_intent.succeeded') {
    const setupIntent = stripeEvent.data.object as Stripe.SetupIntent
    const paymentMethod = setupIntent.payment_method

    console.log(
      'Setup Intent Created:',
      setupIntent,
      'Stripe payment Method',
      paymentMethod
    )

    const twilioResponse = await client.messages.create({
      body: `Order Booked For: ${paymentMethod}`,
      messagingServiceSid: messagingSID,
      to: '+12894009408',
    })
    console.log('Twilio Response:', twilioResponse)
  }

  if (stripeEvent.type === 'customer.created') {
    const customer = stripeEvent.data.object as Stripe.Customer
    const { name } = customer

    await client.messages.create({
      body: `Customer: ${name} has been created`,
      messagingServiceSid: messagingSID,
      to: '+12894009408',
    })
  }

  return {
    response: JSON.stringify({ response: true }),
  }
})
