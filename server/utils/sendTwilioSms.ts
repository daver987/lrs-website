import { Twilio } from 'twilio'
import { consola } from 'consola'

export async function sendTwilioSms(
  twilioClient: Twilio,
  firstName: string,
  phoneNumber: string,
  checkoutLink: string
) {
  const messagingSid = useRuntimeConfig().TWILIO_MESSAGING_SID
  const brand = useAppConfig().brand
  const message = `${firstName}, your luxury ride quote is in your email! 🚘 Book with ${brand.name} now: ${checkoutLink}. Experience our top-notch service!`
  if (!messagingSid || !twilioClient) {
    consola.warn('[sendTwilioSms] Mock send:', {
      to: phoneNumber,
      checkoutLink,
    })
    return
  }
  setTimeout(async () => {
    try {
      await twilioClient.messages.create({
        body: message,
        messagingServiceSid: messagingSid,
        to: phoneNumber,
      })
    } catch (e) {
      consola.error('[sendTwilioSms] Twilio error:', e)
    }
  }, 10_000)
}
