import { router, publicProcedure } from '../trpc'
import { z } from 'zod'
import { QuoteFormSchema } from '~/schema/QuoteFormSchema'
import { formatAddress } from '~/utils/formatAddress'
import { usePricingEngine } from '~/composables/usePricingEngine'
import { useFormatDateTime } from '~/composables/useFormatDateTime'
import { sendQuoteEmail } from '~/server/services/sendGridEmail'
import { createAircallContact } from '~/server/services/createAircallContact'
import { sendTwilioSms } from '~/server/services/sendTwilioSms'
import {
  createQuoteFromForm,
  QuotesWithTripsAndUser,
  updateShortLink,
} from '~/server/utils/trpcUtils'
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
    .input(QuoteFormSchema)
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
      } = input
      const aircallSecret = useRuntimeConfig().AIRCALL_API_TOKEN
      const sendGridKey = useRuntimeConfig().SENDGRID_API_KEY
      const domain = useRuntimeConfig().public.WEBSITE_URL
      const prisma = ctx.prisma
      const twilioClient = ctx.twilioClient

      const pricingEngine = usePricingEngine(
        vehicle,
        service,
        line_items,
        sales_tax
      )
      pricingEngine.origin.value = origin.place_id
      pricingEngine.destination.value = destination.place_id
      pricingEngine.selectedHours.value = selected_hours!
      pricingEngine.serviceTypeId.value = service_id!
      pricingEngine.vehicleTypeId.value = vehicle_id!

      await pricingEngine.updateDistance()
      pricingEngine.updateBaseRate()
      pricingEngine.updateLineItemsTotal(origin.place_id)

      const routeData = pricingEngine.routeData.value
      const calculatedLineItems = pricingEngine.detailedLineItems.value
      const calculatedLineItemsTotals =
        pricingEngine.detailedLineItemsWithTotals.value
      const subTotal = parseFloat(pricingEngine.subTotal.value.toFixed(2))
      const taxTotal = parseFloat(pricingEngine.taxTotal.value.toFixed(2))
      const totalAmount = parseFloat(pricingEngine.totalAmount.value.toFixed(2))

      const formattedPickupDate = useFormatDateTime().formattedDate(
        pickup_date!
      )
      const formattedPickupTime = useFormatDateTime().formattedTime(
        pickup_time!
      )

      const quotes = {
        selected_hours: selected_hours!,
        selected_passengers: selected_passengers!,
        is_round_trip: is_round_trip,
        quote_total: totalAmount,
        quote_subtotal: subTotal,
        quote_tax_total: taxTotal,
        combined_line_items: calculatedLineItemsTotals!,
        pickup_date: pickup_date!,
        pickup_time: pickup_time!,
        formatted_pickup_date: formattedPickupDate,
        formatted_pickup_time: formattedPickupTime,
        distance_text: routeData?.routes[0].legs[0].distance.text!,
        duration_text: routeData?.routes[0].legs[0].duration.text!,
        duration_value: routeData?.routes[0].legs[0].distance.value!,
        distance_value: routeData?.routes[0].legs[0].duration.value!,
        service_label: pricingEngine.selectedService.value?.label!,
        vehicle_label: pricingEngine.selectedVehicle.value?.label!,
        line_items_list: calculatedLineItems!,
        line_items_subtotal: subTotal,
        line_items_tax: taxTotal,
        line_items_total: totalAmount,
        originLat: routeData?.routes[0].legs[0].start_location.lat!,
        originLng: routeData?.routes[0].legs[0].start_location.lng!,
        originName: origin.name,
        originFormattedAddress: origin.formatted_address,
        originFullName: formatAddress(origin.name, origin.formatted_address),
        originPlaceId: origin.place_id,
        originTypes: origin.types,
        destinationLat: routeData?.routes[0].legs[0].end_location.lat!,
        destinationLng: routeData?.routes[0].legs[0].end_location.lng!,
        destinationName: destination.name,
        destinationFormattedAddress: destination.formatted_address,
        destinationFullName: formatAddress(
          destination.name,
          destination.formatted_address
        ),
        destinationPlaceId: destination.place_id,
        destinationTypes: destination.types,
        userId: user_id,
        firstName: first_name,
        lastName: last_name,
        fullName: `${first_name} ${last_name}`,
        phoneNumber: phone_number,
        emailAddress: email_address,
        utm_term: conversion.utm_term,
        utm_medium: conversion.utm_medium,
        utm_source: conversion.utm_source,
        utm_campaign: conversion.utm_campaign,
        gclid: conversion.gclid,
        salesTaxId: pricingEngine.salesTaxes[0].id,
        vehicleId: pricingEngine.selectedVehicle.value?.value,
        serviceId: pricingEngine.selectedService.value?.value,
        lineItemsIdOne: pricingEngine.lineItems[0].id,
        lineItemsIdTwo: pricingEngine.lineItems[1].id,
        lineItemsIdThree: pricingEngine.lineItems[2].id,
      }
      const { shortLink, createShortLink } = useLinkShortener(domain)
      const quote: QuotesWithTripsAndUser = await prisma.quote.create({
        data: createQuoteFromForm(quotes),
        include: {
          user: {
            include: {
              conversion: true,
            },
          },
          vehicle: true,
          service: true,
          line_items: true,
          sales_tax: true,
          trips: {
            include: {
              locations: true,
            },
          },
        },
      })
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
