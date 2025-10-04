import type { QuoteFormReturn } from '~~/shared/schemas'
import sgMail, { type MailDataRequired } from '@sendgrid/mail'
import { parseTimeString, parseDateTime } from '~~/shared/utils'
import { consola } from 'consola'
import { useAppConfig, useRuntimeConfig } from '#imports'
import { useIcsCal } from '~~/server/utils/useIcsCal'

export async function sendQuoteEmail(
  newQuote: QuoteFormReturn,
  apiKey: string,
  shortLink: string
): Promise<void> {
  try {
    consola.info('Parsed Quote in Send Email:', newQuote)
    consola.info('Email Short link:', shortLink)
    if (!apiKey) {
      consola.warn('[sendQuoteEmail] No API key, mocking send:', {
        to: newQuote.user.email_address,
        shortLink,
      })
      return
    }
    sgMail.setApiKey(apiKey)

    const { brand } = useAppConfig()
    const msg: MailDataRequired = {
      personalizations: [
        {
          to: [
            {
              email: newQuote.user.email_address,
            },
          ],
          dynamicTemplateData: {
            first_name: newQuote.user.first_name ?? '',
            last_name: newQuote.user.last_name ?? '',
            email_address: newQuote.user.email_address ?? '',
            phone_number: newQuote.user.phone_number ?? '',
            total_price: newQuote.quote_total ?? 0,
            vehicle_label: newQuote.vehicle?.label ?? '',
            service_label: newQuote.service?.label ?? '',
            return_service_label: newQuote.is_round_trip
              ? (newQuote.service?.label ?? '')
              : '',
            is_round_trip: Boolean(newQuote.is_round_trip),
            pickup_date: newQuote.trips?.[0]?.pickup_date ?? '',
            pickup_time: newQuote.trips?.[0]?.pickup_time ?? '',
            return_date: newQuote.is_round_trip
              ? (newQuote.trips?.[1]?.pickup_date ?? '')
              : '',
            return_time: newQuote.is_round_trip
              ? (newQuote.trips?.[1]?.pickup_time ?? '')
              : '',
            quote_number: newQuote.quote_number?.toString() ?? '',
            origin_full_name:
              newQuote.trips?.[0]?.locations?.[0]?.full_name ?? '',
            destination_full_name:
              newQuote.trips?.[0]?.locations?.[1]?.full_name ?? '',
            return_origin_full_name: newQuote.is_round_trip
              ? (newQuote.trips?.[1]?.locations?.[0]?.full_name ?? '')
              : '',
            return_destination_full_name: newQuote.is_round_trip
              ? (newQuote.trips?.[1]?.locations?.[1]?.full_name ?? '')
              : '',
            vehicle_image: newQuote.vehicle?.vehicle_image ?? '',
            short_link: shortLink ?? '',
          },
        },
      ],
      from: {
        email: brand.contact.email,
        name: brand.name,
      },
      replyTo: {
        email: brand.contact.email,
        name: brand.name,
      },
      subject: `${brand.name} Invites you to Complete Your Booking`,
      templateId: 'd-2ce85a8f9e8447ce8e5f43a4c5a45b6e',
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
    const response = await sgMail.send(msg)
    consola.info('[sendQuoteEmail] sent', response?.[0]?.statusCode)
  } catch (e) {
    consola.error('Error Sending Email', e)
  }
}

export async function createConfirmationEmail(
  quoteForConfirmation: QuoteFormReturn,
  key: string
): Promise<void> {
  try {
    consola.info('Parsed Quote in Send Email:', quoteForConfirmation)
    if (!key) {
      consola.warn('[createConfirmationEmail] No API key, mocking send')
      return
    }
    sgMail.setApiKey(key)

    const tripDuration = parseTimeString(
      quoteForConfirmation.trips?.[0]?.duration_text ?? ''
    )
    consola.info('Trip Duration:', tripDuration)

    const startTime = parseDateTime(
      quoteForConfirmation.trips?.[0]?.pickup_date ?? '',
      quoteForConfirmation.trips?.[0]?.pickup_time ?? ''
    )
    consola.info('Combine Date and Time', startTime)
    const webUrl = useRuntimeConfig().public.WEBSITE_URL
    const { brand } = useAppConfig()
    const eventData = {
      start: startTime,
      duration: tripDuration,
      title: `${brand.name} Booking!`,
      description: `Booking for ${quoteForConfirmation.user.first_name} ${quoteForConfirmation.user.last_name}`,
      location:
        quoteForConfirmation.trips?.[0]?.locations?.[0]?.full_name ?? '',
      url: webUrl,
      geo: {
        lat: quoteForConfirmation.trips?.[0]?.locations?.[0]?.lat ?? 0,
        lon: quoteForConfirmation.trips?.[0]?.locations?.[0]?.lng ?? 0,
      },
    }
    consola.info('Event Data:', eventData)
    const createCalendar = useIcsCal()
    const base64Ics = await createCalendar.createIcsFile(eventData)
    consola.info('Calendar file:', base64Ics)

    const msg: MailDataRequired = {
      personalizations: [
        {
          to: [
            {
              email: quoteForConfirmation.user.email_address,
            },
          ],
          subject: `${brand.name} Booking Confirmation ${brand.orderPrefix}-${quoteForConfirmation.quote_number}`,
          dynamicTemplateData: {
            first_name: quoteForConfirmation.user.first_name,
            last_name: quoteForConfirmation.user.last_name,
            email_address: quoteForConfirmation.user.email_address,
            phone_number: quoteForConfirmation.user.phone_number,
            total_price: quoteForConfirmation.quote_total,
            vehicle_label: quoteForConfirmation.vehicle.label,
            service_label: quoteForConfirmation.service.label,
            return_service_label: quoteForConfirmation.is_round_trip
              ? quoteForConfirmation.service.label
              : '',
            is_round_trip: quoteForConfirmation.is_round_trip,
            pickup_date: quoteForConfirmation.trips?.[0]?.pickup_date ?? '',
            pickup_time: quoteForConfirmation.trips?.[0]?.pickup_time ?? '',
            return_date: quoteForConfirmation.is_round_trip
              ? (quoteForConfirmation.trips?.[1]?.pickup_date ?? '')
              : '',
            return_time: quoteForConfirmation.is_round_trip
              ? (quoteForConfirmation.trips?.[1]?.pickup_time ?? '')
              : '',
            quote_number: quoteForConfirmation.quote_number.toString(),
            origin_full_name:
              quoteForConfirmation.trips?.[0]?.locations?.[0]?.full_name ?? '',
            destination_full_name:
              quoteForConfirmation.trips?.[0]?.locations?.[1]?.full_name ?? '',
            return_origin_full_name: quoteForConfirmation.is_round_trip
              ? (quoteForConfirmation.trips?.[1]?.locations?.[0]?.full_name ??
                '')
              : '',
            return_destination_full_name: quoteForConfirmation.is_round_trip
              ? (quoteForConfirmation.trips?.[1]?.locations?.[1]?.full_name ??
                '')
              : '',
            vehicle_image: quoteForConfirmation.vehicle?.vehicle_image ?? '',
          },
        },
      ],
      from: {
        email: brand.contact.email,
        name: brand.name,
      },
      replyTo: {
        email: brand.contact.email,
        name: brand.name,
      },
      templateId: 'd-5e5528da9e3e4feab95da93eea0fbacd',
      attachments: [
        {
          content: base64Ics,
          type: 'text/calendar',
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
    consola.info('Email sent successfully', response)
  } catch (e) {
    consola.error('Error Sending Email', e)
  }
}
