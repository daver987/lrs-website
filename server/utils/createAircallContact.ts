import type { QuoteFormReturn } from '~~/shared/schemas'
import { consola } from 'consola'

export const createAircallContact = async (
  aircallSecret: string,
  contact: QuoteFormReturn
): Promise<void> => {
  try {
    if (!aircallSecret) {
      consola.warn('[createAircallContact] No secret, mocking create')
      return
    }
    const headers = new Headers({
      Authorization: `Basic ${aircallSecret}`,
      'Content-Type': 'application/json',
    })

    const body = {
      first_name: contact.user.first_name,
      last_name: contact.user.last_name,
      information: contact.user.id,
      phone_numbers: [
        {
          label: 'Phone Number',
          value: contact.user.phone_number,
        },
      ],
      emails: [
        {
          label: 'Email Address',
          value: contact.user.email_address,
        },
      ],
    }

    const options: RequestInit = {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    }

    const response = await fetch('https://api.aircall.io/v1/contacts', options)
    if (response.ok) {
      const data = await response.json()
      consola.info('[AIRCALL] This is the returned aircall services', data)
    } else {
      consola.error(
        `[AIRCALL] Error creating Aircall contact: ${response.statusText}`
      )
    }
  } catch (error) {
    consola.error('[AIRCALL] Error in createAircallContact:', error)
  }
}
