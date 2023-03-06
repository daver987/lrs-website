import sgMail from '@sendgrid/mail'

interface EmailData {
  first_name: string
  last_name: string
  email_address: string
  phone_number: string
  round_trip_total: string
  total_fare: string
  vehicle_label: string
  service_label: string
  is_round_trip: boolean
  pickup_date: string
  pickup_time: string
  return_date: string | undefined
  return_time: string | undefined
  quote_number: number
  origin_formatted_address: string
  destination_formatted_address: string
  vehicle_image: { vehicle_image: string }
  visibility: string
}

export const sendEmail = async (
  zapierSecret: string,
  newQuote: any
): Promise<void> => {
  const total_price = newQuote.trips[0].line_items_total
  const return_total_price =
    newQuote.trips[0].line_items_total + newQuote.trips[0].line_items_total
  const body: EmailData = {
    first_name: newQuote.user.first_name,
    last_name: newQuote.user.last_name,
    email_address: newQuote.user.email_address,
    phone_number: newQuote.user.phone_number,
    total_fare: total_price.toFixed(2),
    round_trip_total: return_total_price.toFixed(2),
    vehicle_label: newQuote.vehicle.label,
    service_label: newQuote.service.label,
    is_round_trip: newQuote.is_round_trip,
    pickup_date: newQuote.formatted_pickup_date,
    pickup_time: newQuote.formatted_pickup_time,
    return_date: newQuote.formatted_return_date,
    return_time: newQuote.formatted_return_time,
    quote_number: newQuote.quote_number,
    origin_formatted_address: newQuote.trips[0].origin_full_name,
    destination_formatted_address: newQuote.trips[0].destination_full_name,
    vehicle_image: newQuote.vehicle.vehicle_image,
    visibility: newQuote.is_round_trip
      ? 'visibility: visible;'
      : 'visibility: hidden;',
  }

  const response = await fetch(zapierSecret, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (response.ok) {
    const data = await response.json()
    console.log('This is the returned email data', data)
  } else {
    console.error(`Error sending email: ${response.statusText}`)
  }
}

export async function sendQuoteEmail(body: any, apiKey: string) {
  sgMail.setApiKey(apiKey)
  const msg = {
    from: {
      email: 'info@highparklivery.com',
    },
    subject: 'High Park Livery Invites you to Complete Your Booking',
    personalizations: [
      {
        to: [
          {
            email: body.email_address,
          },
        ],
        dynamicTemplateData: {
          first_name: body.first_name,
          last_name: body.last_name,
          email_address: body.email_address,
          phone_number: body.phone_number,
          total: body.total_fare,
          is_round_trip: body.is_round_trip,
          round_trip_total: body.round_trip_total,
          vehicle_label: body.vehicle_label,
          service_label: body.service_label,
          pickup_date: body.pickup_date,
          pickup_time: body.pickup_time,
          return_date: body.return_date,
          return_time: body.return_time,
          quote_number: body.quote_number,
          origin_formatted_address: body.origin_formatted_address,
          destination_formatted_address: body.destination_formatted_address,
          vehicle_image: body.vehicle_image,
          visibility: body.visibility,
        },
      },
    ],
    template_id: 'd-a84d49d56c0c4666b6442473fcccf297',
    mailSettings: {
      bypassListManagement: {
        enable: false,
      },
      footer: {
        enable: false,
      },
      sandboxMode: {
        enable: false,
      },
    },
    trackingSettings: {
      clickTracking: {
        enable: true,
        enableText: false,
      },
      openTracking: {
        enable: true,
        substitutionTag: '%open-track%',
      },
    },
  }

  try {
    await sgMail.send(msg)
    console.log('Quote email sent successfully.')
  } catch (error) {
    console.error('Error sending quote email:', error)
  }
}
