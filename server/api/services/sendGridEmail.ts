interface EmailRequestBody {
  from: {
    email: string
  }
  mailSettings: {
    bypassListManagement: {
      enable: boolean
    }
    footer: {
      enable: boolean
    }
    sandboxMode: {
      enable: boolean
    }
  }
  personalizations: {
    to: {
      email: string
    }[]
    dynamicTemplateData: {
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
      return_date: string
      return_time: string
      quote_number: string
      origin_full_name: string
      destination_full_name: string
      vehicle_image: string
      visibility: string
    }
  }[]
  subject: string
  template_id: string
  trackingSettings: {
    clickTracking: {
      enable: boolean
      enableText: boolean
    }
    openTracking: {
      enable: boolean
      substitutionTag: string
    }
  }
}

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

export async function sendBookingConfirmationEmail(
  newQuote: EmailData,
  sendGridApiKey: string
): Promise<void> {
  const apiKey = sendGridApiKey
  const url = 'https://api.sendgrid.com/v3/mail/send'

  if (!apiKey) {
    throw new Error('SendGrid API key not provided')
  }
  const total_price = newQuote.trips[0].line_items_total
  const return_total_price =
    newQuote.trips[0].line_items_total + newQuote.trips[0].line_items_total

  const emailRequestBody: EmailRequestBody = {
    from: {
      email: 'info@highparklivery.com',
    },
    subject: 'High Park Livery Invites you to Complete Your Booking',
    personalizations: [
      {
        to: [
          {
            email: newQuote.email_address,
          },
        ],
        dynamicTemplateData: {
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
          origin_full_name: newQuote.trips[0].origin_full_name,
          destination_full_name: newQuote.trips[0].destination_full_name,
          vehicle_image: newQuote.vehicle.vehicle_image,
          visibility: newQuote.is_round_trip
            ? 'visibility: visible;'
            : 'visibility: hidden;',
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

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(emailRequestBody),
  })

  if (!response.ok) {
    throw new Error('Failed to send email')
  }
}
