import { stripe } from '~/server/services/stripeInit'
import {
  handleCustomerCreated,
  handleSetupIntentSucceeded,
} from '~/server/services/stripeHandlers'

export default defineEventHandler(async (event) => {
  const messagingSid = useRuntimeConfig().TWILIO_MESSAGING_SID
  const twilioClient = event.context.twilioClient
  const endpointSecret = useRuntimeConfig().STRIPE_WEBHOOK_SECRET
  const body = await readRawBody(event)
  const headers = getHeaders(event)
  const sig = headers['stripe-signature'] as string
  const stripeEvent = stripe.webhooks.constructEvent(body!, sig, endpointSecret)

  switch (stripeEvent.type) {
    case 'setup_intent.succeeded':
      await handleSetupIntentSucceeded(
        stripeEvent.data.object,
        twilioClient,
        messagingSid
      )
      break
    case 'customer.created':
      await handleCustomerCreated(
        stripeEvent.data.object,
        twilioClient,
        messagingSid
      )
      break
    default:
  }
  return {
    statusCode: 200,
  }
})
