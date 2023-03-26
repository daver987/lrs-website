import type { QuoteFormReturn } from '~~/schema/QuoteFormSchema'

export const createAircallContact = async (
  aircallSecret: string,
  contact: QuoteFormReturn
): Promise<void> => {
  try {
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
      console.log('This is the returned aircall data', data)
    } else {
      console.error(`Error creating Aircall contact: ${response.statusText}`)
    }
  } catch (error) {
    console.error('Error in createAircallContact:', error)
  }
}
