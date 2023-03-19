// twilioHelper.ts
import { Twilio } from 'twilio'

export async function sendTwilioMessage(
  client: Twilio,
  messageBody: string
): Promise<void> {
  await client.messages.create({
    body: messageBody,
    messagingServiceSid: 'MG211e359fc267bbde46acacf4a428a03f',
    to: '+12894009408',
  })
}
