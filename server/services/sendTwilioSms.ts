import { Twilio } from 'twilio'
const messagingSid = useRuntimeConfig().TWILIO_STRIPE_RESPONSE_SERVICE
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
      messagingServiceSid: messagingSid,
      to: phoneNumber,
    })
  }, 10000)
}
