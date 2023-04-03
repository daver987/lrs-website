export async function handleSetupIntentSucceeded(
  sessionIntent: any,
  twilioClient: any
): Promise<void> {
  const { customer, metadata } = sessionIntent
  await twilioClient.messages.create({
    body: `Order Booked For: ${customer} Quote Number: ${metadata.quote_number}`,
    messagingServiceSid: 'MG211e359fc267bbde46acacf4a428a03f',
    to: '+12894009408',
  })
}

export async function handleCustomerCreated(
  customer: any,
  twilioClient: any
): Promise<void> {
  const { metadata } = customer
  await twilioClient.messages.create({
    body: `A New Customer Was Created: ${metadata.full_name} Quote Number: ${metadata.quote_number}`,
    messagingServiceSid: 'MG211e359fc267bbde46acacf4a428a03f',
    to: '+12894009408',
  })
}
