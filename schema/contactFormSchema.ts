import { z } from 'zod'

export const ContactFormSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email_address: z.email(),
  phone_number: z.string(),
  subject: z.string(),
  message: z.string(),
})

export type ContactForm = z.infer<typeof ContactFormSchema>
