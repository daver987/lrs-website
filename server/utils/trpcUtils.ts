import { Prisma, PrismaClient } from '@prisma/client'
import type { QuoteFormReturn } from '~~/schema/QuoteFormSchema'

export async function updateShortLink(
  prisma: PrismaClient,
  quote: QuoteFormReturn,
  shortLink: string
) {
  try {
    return await prisma.quote.update({
      where: {
        quote_number: quote.quote_number,
      },
      data: {
        short_link: shortLink,
      },
    })
  } catch (e) {
    console.error('Error Updating Short Link', e)
  }
}

export const createQuoteFromForm = (quotes: {
  selected_hours: number
  selected_passengers: number
  is_round_trip: boolean
  quote_total: number
  quote_subtotal: number
  quote_tax_total: number
  combined_line_items: any
  pickup_date: number
  pickup_time: number
  formatted_pickup_date: string
  formatted_pickup_time: string
  distance_text: string
  duration_text: string
  duration_value: number
  distance_value: number
  service_label: string
  vehicle_label: string
  line_items_list: any
  line_items_subtotal: number
  line_items_tax: number
  line_items_total: number
  originLat: number
  originLng: number
  originName: string
  originFormattedAddress: string
  originFullName: string
  originPlaceId: string
  originTypes: any
  destinationLat: number
  destinationLng: number
  destinationName: string
  destinationFormattedAddress: string
  destinationFullName: string
  destinationPlaceId: string
  destinationTypes: any
  userId: string
  firstName: string
  lastName: string
  fullName: string
  phoneNumber: string
  emailAddress: string
  utm_term: string | undefined
  utm_medium: string | undefined
  utm_source: string | undefined
  utm_campaign: string | undefined
  gclid: string | undefined
  salesTaxId: number
  vehicleId: number | undefined
  serviceId: number | undefined
  lineItemsIdOne: string
  lineItemsIdTwo: string
  lineItemsIdThree: string
}) => {
  return Prisma.validator<Prisma.QuoteCreateInput>()({
    selected_hours: quotes.selected_hours,
    selected_passengers: quotes.selected_passengers,
    is_round_trip: quotes.is_round_trip,
    quote_total: quotes.quote_total,
    quote_subtotal: quotes.quote_subtotal,
    quote_tax_total: quotes.quote_tax_total,
    combined_line_items: quotes.combined_line_items,
    trips: {
      create: [
        {
          pickup_date: quotes.pickup_date,
          pickup_time: quotes.pickup_time,
          formatted_pickup_date: quotes.formatted_pickup_date,
          formatted_pickup_time: quotes.formatted_pickup_time,
          distance_text: quotes.distance_text,
          duration_text: quotes.duration_text,
          duration_value: quotes.duration_value,
          distance_value: quotes.distance_value,
          service_label: quotes.service_label,
          vehicle_label: quotes.vehicle_label,
          is_return: false,
          trip_order: 0,
          locations: {
            create: [
              {
                lat: quotes.originLat,
                lng: quotes.originLng,
                name: quotes.originName,
                formatted_address: quotes.originFormattedAddress,
                full_name: quotes.originFullName,
                place_id: quotes.originPlaceId,
                types: quotes.originTypes,
                is_origin: true,
                route_order: 0,
              },
              {
                lat: quotes.destinationLat,
                lng: quotes.destinationLng,
                name: quotes.destinationName,
                formatted_address: quotes.destinationFormattedAddress,
                full_name: quotes.destinationFullName,
                place_id: quotes.destinationPlaceId,
                types: quotes.destinationTypes,
                is_destination: true,
                route_order: 1,
              },
            ],
          },
          price: {
            create: {
              line_items_list: quotes.line_items_list,
              line_items_subtotal: quotes.line_items_subtotal,
              line_items_tax: quotes.line_items_tax,
              line_items_total: quotes.line_items_total,
            },
          },
        },
      ],
    },
    user: {
      connectOrCreate: {
        where: {
          email_address: quotes.emailAddress,
        },
        create: {
          id: quotes.userId,
          first_name: quotes.firstName,
          last_name: quotes.lastName,
          full_name: quotes.fullName,
          phone_number: quotes.phoneNumber,
          email_address: quotes.emailAddress,
          conversion: {
            create: {
              utm_term: quotes.utm_term,
              utm_medium: quotes.utm_medium,
              utm_source: quotes.utm_source,
              utm_campaign: quotes.utm_campaign,
              gclid: quotes.gclid,
            },
          },
        },
      },
    },
    sales_tax: {
      connect: {
        id: quotes.salesTaxId,
      },
    },
    vehicle: {
      connect: {
        value: quotes.vehicleId,
      },
    },
    service: {
      connect: {
        value: quotes.serviceId,
      },
    },
    line_items: {
      connect: [
        { id: quotes.lineItemsIdOne },
        { id: quotes.lineItemsIdTwo },
        { id: quotes.lineItemsIdThree },
      ],
    },
  })
}
const TripsInclude = Prisma.validator<Prisma.QuoteInclude>()({
  trips: {
    include: {
      locations: true,
    },
  },
  vehicle: true,
  service: true,
  line_items: true,
  sales_tax: true,
  user: {
    include: {
      conversion: true,
    },
  },
})

export type QuotesWithTripsAndUser = Prisma.QuoteGetPayload<{
  include: typeof TripsInclude
}>
