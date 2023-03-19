import { stripe } from '~/server/services/stripeInit'
import {
  handleCustomerCreated,
  handleSetupIntentSucceeded,
} from '~/server/services/stripeHandlers'

export default defineEventHandler(async (event) => {
  const twilioClient = event.context.twilioClient
  const endpointSecret = useRuntimeConfig().stripeWebhookSecret
  const body = await readRawBody(event)
  const headers = getHeaders(event)
  const sig = headers['stripe-signature'] as string
  const stripeEvent = stripe.webhooks.constructEvent(body!, sig, endpointSecret)

  switch (stripeEvent.type) {
    case 'setup_intent.succeeded':
      await handleSetupIntentSucceeded(stripeEvent.data.object, twilioClient)
      break
    case 'customer.created':
      await handleCustomerCreated(stripeEvent.data.object, twilioClient)
      break
    default:
  }
  return {
    statusCode: 200,
  }
})
