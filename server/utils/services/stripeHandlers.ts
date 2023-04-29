import type { Twilio } from 'twilio'

export async function handleSetupIntentSucceeded(
  setupIntent: any,
  twilioClient: Twilio,
  messagingSid: string
): Promise<void> {
  const { customer, metadata } = setupIntent
  await twilioClient.messages.create({
    body: `Order Booked For: ${customer} Quote Number: ${metadata.quote_number}`,
    messagingServiceSid: messagingSid,
    to: '+12894009408',
  })
}

export async function handleCustomerCreated(
  customer: any,
  twilioClient: Twilio,
  messagingSid: string
): Promise<void> {
  const { metadata } = customer
  await twilioClient.messages.create({
    body: `A New Customer Was Created: ${metadata.full_name} Quote Number: ${metadata.quote_number}`,
    messagingServiceSid: messagingSid,
    to: '+12894009408',
  })
}
