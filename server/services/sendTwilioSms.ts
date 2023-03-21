import { Twilio } from 'twilio'

export async function sendTwilioSms(
  twilioClient: Twilio,
  firstName: string,
  phoneNumber: string,
  checkoutLink: string
) {
  const message = `Hi ${firstName} This is High Park Livery. Thank you for requesting a quote. Please use this link to book: ${checkoutLink}.`
  setTimeout(async () => {
    await twilioClient.messages.create({
      body: message,
      messagingServiceSid: 'MG211e359fc267bbde46acacf4a428a03f',
      to: phoneNumber,
    })
  }, 20000)
}
