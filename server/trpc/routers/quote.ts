import { router, publicProcedure } from '../trpc'
import { z } from 'zod'
import {
  SalesTaxSchema,
  LineItemSchema,
  ServiceSchema,
  VehicleSchema,
} from '~/prisma/generated/zod'
import { formatAddress } from '~/utils/formatAddress'
import { usePricingEngine } from '~/composables/usePricingEngine'
import { combineLineItems, combineTwoLineItems } from '~/utils/combineLineItems'
import { computed, ref } from 'vue'
import { formatDate } from '~/utils/formatDate'
import { sendQuoteEmail } from '~/server/trpc/services/sendGridEmail'
import { createAircallContact } from '~/server/trpc/services/createAircallContact'
import { sendTwilioSms } from '~/server/trpc/services/sendTwilioSms'
import {
  createQuote,
  updateShortLink,
} from '~/server/trpc/routers/utils/updateShortLink'
import { useLinkShortener } from '~/composables/useLinkShortener'

export const quoteRouter = router({
  get: publicProcedure
    .input(
      z.object({
        quote_number: z.number(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.quote.findUnique({
        where: { quote_number: input.quote_number },
        include: {
          service: true,
          vehicle: true,
          user: true,
          sales_tax: true,
          trips: {
            orderBy: {
              trip_order: 'asc',
            },
            include: {
              locations: {
                orderBy: {
                  route_order: 'asc',
                },
              },
            },
          },
        },
      })
    }),

  postShortLink: publicProcedure
    .input(
      z.object({
        quote_number: z.number(),
        short_link: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.quote.update({
        where: { quote_number: input.quote_number },
        data: {
          short_link: input.short_link,
        },
      })
    }),

  postQuote: publicProcedure
    .input(
      z.object({
        id: z.string(),
        first_name: z.string(),
        last_name: z.string(),
        email_address: z.string(),
        phone_number: z.string(),
        conversion: z.object({
          utm_medium: z.string().optional(),
          utm_source: z.string().optional(),
          utm_campaign: z.string().optional(),
          utm_term: z.string().optional(),
          gclid: z.string().optional(),
        }),
        origin: z.object({
          formatted_address: z.string(),
          name: z.string(),
          place_id: z.string(),
          types: z.array(z.string()),
        }),
        destination: z.object({
          formatted_address: z.string(),
          name: z.string(),
          place_id: z.string(),
          types: z.array(z.string()),
        }),
        pickup_date: z.number(),
        pickup_time: z.number(),
        return_date: z.number().nullable(),
        return_time: z.number().nullable(),
        selected_hours: z.number().nullable(),
        selected_passengers: z.number(),
        is_hourly: z.boolean(),
        vehicle_id: z.number(),
        service_id: z.number(),
        is_round_trip: z.boolean(),
        vehicle: VehicleSchema.array(),
        service: ServiceSchema.array(),
        line_items: LineItemSchema.array(),
        sales_tax: SalesTaxSchema.array(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const {
        id: user_id,
        first_name,
        last_name,
        email_address,
        phone_number,
        is_round_trip,
        service_id,
        vehicle_id,
        selected_hours,
        selected_passengers,
        service,
        vehicle,
        line_items,
        sales_tax,
        conversion,
        origin,
        destination,
        pickup_date,
        pickup_time,
        return_date,
        return_time,
      } = input
      const aircallSecret = useRuntimeConfig().AIRCALL_API_TOKEN
      const sendGridKey = useRuntimeConfig().SENDGRID_API_KEY
      const domain = useRuntimeConfig().public.WEBSITE_URL
      const prisma = ctx.prisma
      const twilioClient = ctx.twilioClient
      const returnServiceTypeLabel = computed(() =>
        is_round_trip && service_id === 2
          ? 'From Airport'
          : is_round_trip && service_id === 3
          ? 'To Airport'
          : service[0].label
      )
      const pricingEngine = usePricingEngine(
        vehicle,
        service,
        line_items,
        sales_tax
      )
      // Set pricing engine state
      pricingEngine.origin.value = origin.place_id
      pricingEngine.destination.value = destination.place_id
      if (typeof vehicle_id === 'number') {
        pricingEngine.vehicleTypeId.value = vehicle_id
      }
      if (service_id != null) {
        pricingEngine.serviceTypeId.value = service_id
      }

      pricingEngine.selectedHours.value = selected_hours!

      // Wait for the distance to be set before updating other values
      await pricingEngine.updateDistance()
      pricingEngine.updateBaseRate()

      //Calculate line items
      const lineItemsList = pricingEngine.updateLineItemsTotal(origin.place_id)
      const { lineItemDetails, taxTotal, subTotal, totalAmount } = lineItemsList
      const updatedLineItemDetails = combineLineItems(lineItemDetails)
      //Calculate return pricing
      const returnLineItemsList = pricingEngine.updateLineItemsTotal(
        destination.place_id
      )
      const {
        lineItemDetails: returnLineItemsDetails,
        taxTotal: returnTaxTotal,
        subTotal: returnSubTotal,
        totalAmount: returnTotalAmount,
      } = returnLineItemsList
      const updatedReturnLineItemDetails = combineLineItems(
        returnLineItemsDetails
      )

      const combinedLineItems = combineTwoLineItems(
        updatedLineItemDetails,
        updatedReturnLineItemDetails
      )
      console.log(combinedLineItems, 'Combined Line Items;')

      const routeData = pricingEngine.routeData.value
      //calculate trip values
      const isRoundTrip = ref(is_round_trip)
      const quoteTotal = isRoundTrip.value
        ? combinedLineItems
        : updatedLineItemDetails
      const quoteSubtotal = isRoundTrip.value
        ? subTotal.value + returnSubTotal.value
        : subTotal.value
      const quoteTaxTotal = isRoundTrip.value
        ? taxTotal.value + returnTaxTotal.value
        : taxTotal.value
      const formattedPickupDate = formatDate(new Date(pickup_date), {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
      })
      const formattedPickupTime = formatDate(new Date(pickup_time), {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      })
      const formattedReturnDate = formatDate(new Date(return_date as number), {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
      })
      const formattedReturnTime = formatDate(new Date(return_time as number), {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      })
      const quotes = {
        data: {
          selected_hours: selected_hours,
          selected_passengers: selected_passengers,
          is_round_trip: is_round_trip,
          quote_total: 9,
          quote_subtotal: parseFloat(quoteSubtotal.toFixed(2)),
          quote_tax_total: parseFloat(quoteTaxTotal.toFixed(2)),
          combined_line_items: quoteTotal,
          trips: is_round_trip
            ? {
                create: [
                  {
                    // First trip
                    pickup_date: pickup_date,
                    pickup_time: pickup_time,
                    formatted_pickup_date: formattedPickupDate,
                    formatted_pickup_time: formattedPickupTime,
                    distance_text: routeData?.routes[0].legs[0].distance.text,
                    duration_text: routeData?.routes[0].legs[0].duration.text,
                    duration_value: routeData?.routes[0].legs[0].distance.value,
                    distance_value: routeData?.routes[0].legs[0].duration.value,
                    service_label: pricingEngine.selectedService.value?.label,
                    vehicle_label: pricingEngine.selectedVehicle.value?.label,
                    line_items_list: updatedLineItemDetails,
                    line_items_subtotal: parseFloat(subTotal.value.toFixed(2)),
                    line_items_tax: parseFloat(taxTotal.value.toFixed(2)),
                    line_items_total: parseFloat(totalAmount.value.toFixed(2)),
                    is_return: false,
                    trip_order: 0,
                    locations: {
                      create: [
                        {
                          lat: routeData?.routes[0].legs[0].start_location.lat,
                          lng: routeData?.routes[0].legs[0].start_location.lng,
                          name: origin.name,
                          formatted_address: origin.formatted_address,
                          full_name: formatAddress(
                            origin.name,
                            origin.formatted_address
                          ),
                          place_id: origin.place_id,
                          types: origin.types,
                          is_origin: true,
                          route_order: 0,
                        },
                        {
                          lat: routeData?.routes[0].legs[0].end_location.lat,
                          lng: routeData?.routes[0].legs[0].end_location.lng,
                          name: destination.name,
                          formatted_address: destination.formatted_address,
                          full_name: formatAddress(
                            destination.name,
                            destination.formatted_address
                          ),
                          place_id: destination.place_id,
                          types: destination.types,
                          is_destination: true,
                          route_order: 1,
                        },
                      ],
                    },
                  },
                  {
                    // Second trip
                    pickup_date: return_date,
                    pickup_time: return_time,
                    formatted_pickup_date: formattedReturnDate,
                    formatted_pickup_time: formattedReturnTime,
                    distance_text: routeData?.routes[0].legs[0].distance.text,
                    duration_text: routeData?.routes[0].legs[0].duration.text,
                    duration_value: routeData?.routes[0].legs[0].distance.value,
                    distance_value: routeData?.routes[0].legs[0].duration.value,
                    service_label: returnServiceTypeLabel,
                    vehicle_label: pricingEngine.selectedVehicle.value?.label,
                    line_items_list: updatedReturnLineItemDetails,
                    line_items_subtotal: parseFloat(subTotal.value.toFixed(2)),
                    line_items_tax: parseFloat(taxTotal.value.toFixed(2)),
                    line_items_total: parseFloat(totalAmount.value.toFixed(2)),
                    is_return: true,
                    trip_order: 1,
                    locations: {
                      create: [
                        {
                          lat: routeData?.routes[0].legs[0].start_location.lat,
                          lng: routeData?.routes[0].legs[0].start_location.lng,
                          name: origin.name,
                          formatted_address: origin.formatted_address,
                          full_name: formatAddress(
                            origin.name,
                            origin.formatted_address
                          ),
                          place_id: origin.place_id,
                          types: origin.types,
                          is_origin: true,
                          route_order: 1,
                        },
                        {
                          lat: routeData?.routes[0].legs[0].end_location.lat,
                          lng: routeData?.routes[0].legs[0].end_location.lng,
                          name: destination.name,
                          formatted_address: destination.formatted_address,
                          full_name: formatAddress(
                            destination.name,
                            destination.formatted_address
                          ),
                          place_id: destination.place_id,
                          types: destination.types,
                          is_destination: true,
                          route_order: 0,
                        },
                      ],
                    },
                  },
                ],
              }
            : {
                create: [
                  {
                    // First trip
                    pickup_date: pickup_date,
                    pickup_time: pickup_time,
                    formatted_pickup_date: formattedPickupDate,
                    formatted_pickup_time: formattedPickupTime,
                    distance_text: routeData?.routes[0].legs[0].distance.text,
                    duration_text: routeData?.routes[0].legs[0].duration.text,
                    duration_value: routeData?.routes[0].legs[0].distance.value,
                    distance_value: routeData?.routes[0].legs[0].duration.value,
                    service_label: pricingEngine.selectedService.value?.label,
                    vehicle_label: pricingEngine.selectedVehicle.value?.label,
                    line_items_list: updatedLineItemDetails,
                    line_items_subtotal: parseFloat(subTotal.value.toFixed(2)),
                    line_items_tax: parseFloat(taxTotal.value.toFixed(2)),
                    line_items_total: parseFloat(totalAmount.value.toFixed(2)),
                    is_return: false,
                    trip_order: 0,
                    locations: {
                      create: [
                        {
                          lat: routeData?.routes[0].legs[0].start_location.lat,
                          lng: routeData?.routes[0].legs[0].start_location.lng,
                          name: origin.name,
                          formatted_address: origin.formatted_address,
                          full_name: formatAddress(
                            origin.name,
                            origin.formatted_address
                          ),
                          place_id: origin.place_id,
                          types: origin.types,
                          is_origin: true,
                          route_order: 0,
                        },
                        {
                          lat: routeData?.routes[0].legs[0].end_location.lat,
                          lng: routeData?.routes[0].legs[0].end_location.lng,
                          name: destination.name,
                          formatted_address: destination.formatted_address,
                          full_name: formatAddress(
                            destination.name,
                            destination.formatted_address
                          ),
                          place_id: destination.place_id,
                          types: destination.types,
                          is_destination: true,
                          route_order: 1,
                        },
                      ],
                    },
                  },
                ],
              },
          user: {
            connectOrCreate: {
              where: { email_address: email_address },
              create: {
                id: user_id,
                first_name: first_name,
                last_name: last_name,
                full_name: `${first_name} ${last_name}`,
                phone_number: phone_number,
                email_address: email_address,
                conversion: {
                  create: {
                    utm_term: conversion.utm_term,
                    utm_medium: conversion.utm_medium,
                    utm_source: conversion.utm_source,
                    utm_campaign: conversion.utm_campaign,
                    gclid: conversion.gclid,
                  },
                },
              },
            },
          },
          sales_tax: {
            connect: { id: 1 },
          },
          vehicle: {
            connect: { value: pricingEngine.selectedVehicle.value?.value },
          },
          service: {
            connect: { value: pricingEngine.selectedService.value?.value },
          },
          line_items: {
            connect: [
              { id: pricingEngine.lineItems[0].id },
              { id: pricingEngine.lineItems[1].id },
              { id: pricingEngine.lineItems[2].id },
            ],
          },
        },
        include: {
          sales_tax: true,
          vehicle: true,
          service: true,
          trips: {
            orderBy: {
              trip_order: 'asc',
            },
            include: {
              locations: {
                orderBy: {
                  route_order: 'asc',
                },
              },
            },
          },
          user: {
            include: {
              conversion: true,
            },
          },
        },
      }
      const { shortLink, createShortLink } = useLinkShortener(domain)
      const quote = await createQuote(quotes, prisma)
      shortLink.value = createShortLink(quote.quote_number)
      await Promise.all([
        sendQuoteEmail(quote, sendGridKey, shortLink.value),
        createAircallContact(aircallSecret, quote),
        updateShortLink(prisma, quote, shortLink.value),
        sendTwilioSms(twilioClient, first_name, phone_number, shortLink.value),
      ])
      return quote
    }),
})
