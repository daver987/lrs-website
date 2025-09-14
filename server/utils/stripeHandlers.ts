import type { Twilio } from 'twilio'
import type { Stripe } from 'stripe'

export async function handleSetupIntentSucceeded(
  setupIntent: any,
  twilioClient: Twilio,
  messagingSid: string
): Promise<void> {
  const { customer, metadata } = setupIntent
  await twilioClient.messages.create({
    body: `Order Booked For: ${customer} Quote Number: ${metadata.quote_number}`,
    messagingServiceSid: messagingSid,
    to: '+14375188078',
  })
}

export async function handleCustomerCreated(
  customer: Stripe.Customer,
  twilioClient: Twilio,
  messagingSid: string
): Promise<void> {
  const { metadata } = customer
  await twilioClient.messages.create({
    body: `A New Customer Was Created: ${metadata.full_name} Quote Number: ${metadata.quote_number}`,
    messagingServiceSid: messagingSid,
    to: '+14375188078',
  })
}
