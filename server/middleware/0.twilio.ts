import twilio, { Twilio } from 'twilio'

let twilioClient: Twilio
declare module 'h3' {
  interface H3EventContext {
    twilioClient: Twilio
  }
}

export default eventHandler((event) => {
  const TWILIO_ACCOUNT_SID = useRuntimeConfig().TWILIO_ACCOUNT_SID
  const TWILIO_AUTH_TOKEN = useRuntimeConfig().TWILIO_AUTH_TOKEN
  if (!twilioClient) {
    twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
  }
  event.context.twilioClient = twilioClient
})
