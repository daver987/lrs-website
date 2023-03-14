import {
  QuotePartialSchema,
  ServicePartialSchema,
  TripPartialSchema,
  UserPartialSchema,
  VehiclePartialSchema,
} from '~/prisma/generated/zod'

export async function sendBookingConfirmationEmail(
  newQuote: any,
  apiKey: string
): Promise<void> {
  const url = 'https://api.sendgrid.com/v3/mail/send'
  try {
    const trips = TripPartialSchema.strip().array().parse(newQuote.trips)
    const user = UserPartialSchema.strip().parse(newQuote.user)
    const vehicle = VehiclePartialSchema.strip().parse(newQuote.vehicle)
    const service = ServicePartialSchema.strip().parse(newQuote.service)
    const quote = QuotePartialSchema.strip().parse(newQuote)

    if (!apiKey) {
      throw new Error('SendGrid API key not provided')
    }
    const total_price = trips[0].line_items_total!
    const return_total_price = trips[0].line_items_total! * 2

    const msg = {
      personalizations: [
        {
          to: [
            {
              email: user.email_address,
            },
          ],
          dynamic_template_data: {
            first_name: user.first_name,
            last_name: user.last_name,
            email_address: user.email_address,
            phone_number: user.phone_number,
            total_fare: total_price.toFixed(2),
            round_trip_total: return_total_price.toFixed(2),
            vehicle_label: vehicle.label,
            service_label: service.label,
            is_round_trip: quote.is_round_trip,
            pickup_date: quote.formatted_pickup_date,
            pickup_time: quote.formatted_pickup_time,
            return_date: quote.formatted_return_date,
            return_time: quote.formatted_return_time,
            //@ts-ignore
            quote_number: quote.quote_number.toString(),
            origin_full_name: trips[0].origin_full_name as string,
            destination_full_name: trips[0].destination_full_name as string,
            vehicle_image: vehicle.vehicle_image,
            visibility: 'visibility: hidden;',
          },
        },
      ],
      from: {
        email: 'info@highparklivery.com',
        name: 'High Park Livery',
      },
      reply_to: {
        email: 'info@highparklivery.com',
        name: 'High Park Livery',
      },
      subject: 'High Park Livery Invites you to Complete Your Booking',
      template_id: 'd-a84d49d56c0c4666b6442473fcccf297',
      ipPoolName: 'transactional email',
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
        subscriptionTracking: {
          enable: false,
        },
      },
    }
    const response = await $fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: msg,
    })
    console.log(response)
  } catch (e) {
    console.error(e)
  }
}
