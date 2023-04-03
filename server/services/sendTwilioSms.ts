import { Twilio } from 'twilio'
const messagingSid = useRuntimeConfig().TWILIO_MESSAGING_SID
export async function sendTwilioSms(
  twilioClient: Twilio,
  firstName: string,
  phoneNumber: string,
  checkoutLink: string
) {
  const message = `${firstName}, your luxury ride quote is in your email! 🚘 Book with High Park Livery now: ${checkoutLink}. Experience our top-notch service!`
  setTimeout(async () => {
    await twilioClient.messages.create({
      body: message,
      messagingServiceSid: messagingSid,
      to: phoneNumber,
    })
  }, 10000)
}
