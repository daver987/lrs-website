import twilio from 'twilio'

const TWILIO_ACCOUNT_SID = useRuntimeConfig().TWILIO_ACCOUNT_SID
const TWILIO_AUTH_TOKEN = useRuntimeConfig().TWILIO_AUTH_TOKEN
export const twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
