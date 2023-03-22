import { SummarySchema } from '~/schema/summarySchema'
import { QuotesWithTripsAndUser } from '~/server/utils/trpcUtils'
import { useIcsCal } from '~/server/services/icsHelper'
import {
  combineDateAndTime,
  convertDurationToHoursAndMinutes,
} from '~/utils/convertDurationToHoursAndMinutes'
import sgMail from '@sendgrid/mail'

export async function sendQuoteEmail(
  newQuote: QuotesWithTripsAndUser,
  apiKey: string,
  shortLink: string
): Promise<void> {
  const url = 'https://api.sendgrid.com/v3/mail/send'
  try {
    const quote = SummarySchema.parse(newQuote)
    console.log('Parsed Quote in Send Email:', quote)
    console.log('Email Short link:', shortLink)
    if (!apiKey) {
      throw new Error('SendGrid API key not provided')
    }
    sgMail.setApiKey(apiKey)

    const msg = {
      personalizations: [
        {
          to: [
            {
              email: quote.user.email_address,
            },
          ],
          dynamic_template_data: {
            first_name: quote.user.first_name,
            last_name: quote.user.last_name,
            email_address: quote.user.email_address,
            phone_number: quote.user.phone_number,
            total_price: quote.quote_total,
            vehicle_label: quote.vehicle.label,
            service_label: quote.trips[0].service_label,
            return_service_label: quote.is_round_trip
              ? quote.trips[1].service_label
              : '',
            is_round_trip: quote.is_round_trip,
            pickup_date: quote.trips[0].formatted_pickup_date,
            pickup_time: quote.trips[0].formatted_pickup_time,
            return_date: quote.is_round_trip
              ? quote.trips[1].formatted_pickup_date
              : '',
            return_time: quote.is_round_trip
              ? quote.trips[1].formatted_pickup_time
              : '',
            quote_number: quote.quote_number.toString(),
            origin_full_name: quote.trips[0].locations[0].full_name,
            destination_full_name: quote.trips[0].locations[1].full_name,
            return_origin_full_name: quote.is_round_trip
              ? quote.trips[1].locations[0].full_name
              : '',
            return_destination_full_name: quote.is_round_trip
              ? quote.trips[1].locations[1].full_name
              : '',
            vehicle_image: quote.vehicle.vehicle_image,
            short_link: shortLink,
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
      template_id: 'd-2ce85a8f9e8447ce8e5f43a4c5a45b6e',
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
    //@ts-ignore
    const response = await sgMail.send(msg)
    console.log(response)
  } catch (e) {
    console.error('Error Sending Email', e)
  }
}

export async function createConfirmationEmail(
  quoteForConfirmation: QuotesWithTripsAndUser,
  key: string
): Promise<void> {
  const url = 'https://api.sendgrid.com/v3/mail/send'
  try {
    const quote = SummarySchema.parse(quoteForConfirmation)
    console.log('Parsed Quote in Send Email:', quote)
    if (!key) {
      throw new Error('SendGrid API key not provided')
    }
    sgMail.setApiKey(key)
    const tripDuration = convertDurationToHoursAndMinutes(
      quote.trips[0].duration_value
    )
    const startTime = combineDateAndTime(
      quote.trips[0].pickup_date!,
      quote.trips[0].pickup_time!
    )
    const eventData = {
      start: startTime,
      duration: tripDuration,
      title: 'High Park Livery Booking!',
      description: `Booking for ${quote.user.first_name} ${quote.user.last_name}`,
      location: quote.trips[0].locations[0].full_name!,
      url: 'https://highparklivey.com',
      geo: {
        lat: quote.trips[0].locations[0].lat,
        lon: quote.trips[0].locations[0].lng,
      },
    }
    console.log('Event Data:', eventData)
    const createCalendar = useIcsCal()
    const base64Ics = await createCalendar.createIcsFile(eventData)
    console.log('Calendar file:', base64Ics)

    const msg = {
      personalizations: [
        {
          to: [
            {
              email: quote.user.email_address,
            },
          ],
          subject: `High Park Livery Booking Confirmation HPL-${quote.quote_number}`,
          dynamic_template_data: {
            first_name: quote.user.first_name,
            last_name: quote.user.last_name,
            email_address: quote.user.email_address,
            phone_number: quote.user.phone_number,
            total_price: quote.quote_total,
            vehicle_label: quote.vehicle.label,
            service_label: quote.trips[0].service_label,
            return_service_label: quote.is_round_trip
              ? quote.trips[1].service_label
              : '',
            is_round_trip: quote.is_round_trip,
            pickup_date: quote.trips[0].formatted_pickup_date,
            pickup_time: quote.trips[0].formatted_pickup_time,
            return_date: quote.is_round_trip
              ? quote.trips[1].formatted_pickup_date
              : '',
            return_time: quote.is_round_trip
              ? quote.trips[1].formatted_pickup_time
              : '',
            quote_number: quote.quote_number.toString(),
            origin_full_name: quote.trips[0].locations[0].full_name,
            destination_full_name: quote.trips[0].locations[1].full_name,
            return_origin_full_name: quote.is_round_trip
              ? quote.trips[1].locations[0].full_name
              : '',
            return_destination_full_name: quote.is_round_trip
              ? quote.trips[1].locations[1].full_name
              : '',
            vehicle_image: quote.vehicle.vehicle_image,
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
      templateId: 'd-5e5528da9e3e4feab95da93eea0fbacd',
      attachments: [
        {
          content: base64Ics,
          type: 'application/ics',
          filename: 'event.ics',
          disposition: 'attachment',
        },
      ],
      trackingSettings: {
        clickTracking: {
          enable: false,
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
    const response = await sgMail.send(msg)
    console.log('Email sent successfully', response)
  } catch (e) {
    console.error('Error Sending Email', e)
  }
}
