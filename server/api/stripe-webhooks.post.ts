import { stripe } from '~/server/trpc/services/stripeInit'
import { twilioClient } from '~/server/trpc/services/twilioInit'

export default defineEventHandler(async (event) => {
  const endpointSecret = useRuntimeConfig().stripeWebhookSecret
  const body = await readRawBody(event)
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
    await twilioClient.messages.create({
      body: `Order Booked For: ${email}`,
      messagingServiceSid: 'MG9b5c0af877bac1ebc7504e98a8022456',
      to: '+16473609631',
    })
  }
  if (stripeEvent.type === 'customer.created') {
    const customer = stripeEvent.data.object
    // @ts-ignore
    const { name } = customer
    await twilioClient.messages.create({
      body: `Customer: ${name} has been created`,
      messagingServiceSid: 'MG9b5c0af877bac1ebc7504e98a8022456',
      to: '+12894009408',
    })
  }

  return {
    statusCode: 200,
  }
})
