import type { QuoteFormReturn } from '~/schema/QuoteFormSchema'
import sgMail from '@sendgrid/mail'
import { parseTimeString, parseDateTime } from '~/utils'

export async function sendQuoteEmail(
  newQuote: QuoteFormReturn,
  apiKey: string,
  shortLink: string
): Promise<void> {
  try {
    const quote = newQuote
    console.log('Parsed Quote in Send Email:', quote)
    console.log('Email Short link:', shortLink)
    if (!apiKey) {
      throw new Error('SendGrid API key not provided')
    }
    sgMail.setApiKey(apiKey)

    const brand = useAppConfig().brand
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
            service_label: quote.service.label,
            return_service_label: quote.is_round_trip
              ? quote.service.label
              : '',
            is_round_trip: quote.is_round_trip,
            pickup_date: quote.trips[0].pickup_date,
            pickup_time: quote.trips[0].pickup_time,
            return_date: quote.is_round_trip ? quote.trips[1].pickup_date : '',
            return_time: quote.is_round_trip ? quote.trips[1].pickup_time : '',
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
        email: brand.contact.email,
        name: brand.name,
      },
      reply_to: {
        email: brand.contact.email,
        name: brand.name,
      },
      subject: `${brand.name} Invites you to Complete Your Booking`,
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
  quoteForConfirmation: QuoteFormReturn,
  key: string
): Promise<void> {
  try {
    const quote = quoteForConfirmation
    console.log('Parsed Quote in Send Email:', quote)
    if (!key) {
      throw new Error('SendGrid API key not provided')
    }
    sgMail.setApiKey(key)

    const tripDuration = parseTimeString(quote.trips[0].duration_text!)
    console.log('Trip Duration:', tripDuration)

    const startTime = parseDateTime(
      quote.trips[0].pickup_date!,
      quote.trips[0].pickup_time!
    )
    console.log('Combine Date and Time', startTime)
    const webUrl = useRuntimeConfig().public.WEBSITE_URL
    const brand = useAppConfig().brand
    const eventData = {
      start: startTime,
      duration: tripDuration,
      title: `${brand.name} Booking!`,
      description: `Booking for ${quote.user.first_name} ${quote.user.last_name}`,
      location: quote.trips[0].locations[0].full_name!,
      url: webUrl,
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
          subject: `${brand.name} Booking Confirmation ${brand.orderPrefix}-${quote.quote_number}`,
          dynamic_template_data: {
            first_name: quote.user.first_name,
            last_name: quote.user.last_name,
            email_address: quote.user.email_address,
            phone_number: quote.user.phone_number,
            total_price: quote.quote_total,
            vehicle_label: quote.vehicle.label,
            service_label: quote.service.label,
            return_service_label: quote.is_round_trip
              ? quote.service.label
              : '',
            is_round_trip: quote.is_round_trip,
            pickup_date: quote.trips[0].pickup_date,
            pickup_time: quote.trips[0].pickup_time,
            return_date: quote.is_round_trip ? quote.trips[1].pickup_date : '',
            return_time: quote.is_round_trip ? quote.trips[1].pickup_time : '',
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
        email: brand.contact.email,
        name: brand.name,
      },
      reply_to: {
        email: brand.contact.email,
        name: brand.name,
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
