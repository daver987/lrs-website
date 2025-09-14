import { publicProcedure, router } from '../trpc'
import { z } from 'zod'
import {
  sendQuoteEmail,
  sendTwilioSms,
  createAircallContact,
  formatAddress,
  createQuoteFromForm,
  updateShortLink,
} from '#imports'
import { usePricingEngine, useLinkShortener } from '~/composables'
import { quoteFormReturnSchema, QuoteFormSchema } from '~~/shared/schemas'
import chalk from 'chalk'
import { Prisma } from '@prisma/client'
import { consola } from 'consola'

type QuoteWithRelations = Prisma.QuoteGetPayload<{
  include: {
    user: true
    vehicle: true
    service: true
    trips: {
      include: {
        price: true
        payment: true
        locations: true
      }
    }
  }
}>

export const quoteRouter = router({
  get: publicProcedure
    .input(
      z.object({
        quote_number: z.number().optional().prefault(3000),
      })
    )
    .query(async ({ ctx, input }) => {
      if (input.quote_number === 3000) {
        return { status: 'NO_QUOTE' }
      }
      const quote = await ctx.prisma.quote.findUnique({
        where: { quote_number: input.quote_number },
        select: {
          id: true,
          quote_number: true,
          selected_hours: true,
          selected_passengers: true,
          is_round_trip: true,
          combined_line_items: true,
          quote_total: true,
          quote_subtotal: true,
          quote_tax_total: true,
          user: {
            select: {
              id: true,
              first_name: true,
              last_name: true,
              phone_number: true,
              email_address: true,
              full_name: true,
              stripe_customer_id: true,
            },
          },
          vehicle: {
            select: {
              label: true,
              vehicle_image: true,
              max_luggage: true,
              vehicle_number: true,
              fasttrak_id: true,
            },
          },
          service: {
            select: {
              label: true,
            },
          },
          trips: {
            orderBy: {
              trip_order: 'asc',
            },
            include: {
              price: true,
              payment: true,
              locations: {
                orderBy: {
                  route_order: 'asc',
                },
              },
            },
          },
        },
      })
      consola.info(chalk.blue('[RETURNED_QUOTE]', quote))
      return { status: 'FOUND_QUOTE', quote }
    }),

  getCreatedAt: publicProcedure
    .input(
      z.object({
        quote_number: z.number(),
      })
    )
    .query(async ({ ctx, input }) => {
      const result = await ctx.prisma.quote.findUnique({
        where: {
          quote_number: input.quote_number,
        },
        select: {
          created_at: true,
          is_booked: true,
        },
      })
      consola.info(chalk.blue('[SERVER_RESULT]', result))

      if (result) {
        return {
          created_at: result.created_at,
          is_booked: result.is_booked,
        }
      } else {
        consola.info(chalk.blue('[QUOTE_DOES_NOT_EXIST]'))
        return result
      }
    }),

  getFiltered: publicProcedure
    .input(
      z.object({
        quote_number: z.number(),
      })
    )
    .query(async ({ ctx, input }) => {
      const quoteReturn = await ctx.prisma.quote.findMany({
        where: {
          AND: [
            {
              quote_number: {
                equals: input.quote_number,
              },
            },
            {
              created_at: {
                gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
              },
            },
            {
              is_booked: {
                equals: false,
              },
            },
          ],
        },
        select: {
          quote_number: true,
          selected_hours: true,
          selected_passengers: true,
          is_round_trip: true,
          quote_total: true,
          quote_subtotal: true,
          quote_tax_total: true,
          user: {
            select: {
              id: true,
              first_name: true,
              last_name: true,
              phone_number: true,
              email_address: true,
              full_name: true,
            },
          },
          vehicle: {
            select: {
              label: true,
              vehicle_image: true,
              fasttrak_id: true,
            },
          },
          service: {
            select: {
              label: true,
            },
          },
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
      consola.info(chalk.blue('[QUOTE_RETURN]', quoteReturn))
      return quoteReturn[0]
    }),

  postQuote: publicProcedure
    .input(QuoteFormSchema)
    .output(quoteFormReturnSchema)
    .mutation(async ({ ctx, input }) => {
      const {
        id: user_id,
        first_name,
        last_name,
        email_address,
        phone_number,
        is_round_trip,
        service_number,
        vehicle_number,
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
        stops = [],
      } = input
      const aircallSecret = useRuntimeConfig().AIRCALL_API_TOKEN
      const sendGridKey = useRuntimeConfig().SENDGRID_API_KEY
      const domain = useRuntimeConfig().public.WEBSITE_URL
      const { prisma, twilioClient } = ctx

      const pricingEngine = usePricingEngine(
        vehicle,
        service,
        line_items,
        sales_tax
      )
      pricingEngine.origin.value = origin.place_id
      pricingEngine.destination.value = destination.place_id
      // Map optional waypoints (pricing only for now)
      pricingEngine.waypoints.value = Array.isArray(stops)
        ? stops.map((s: any) => s.place_id)
        : []
      pricingEngine.selectedHours.value = selected_hours!
      pricingEngine.serviceTypeId.value = service_number!
      pricingEngine.vehicleTypeId.value = vehicle_number!

      await pricingEngine.updateDistance()
      pricingEngine.updateBaseRate()
      pricingEngine.updateLineItemsTotal(origin.place_id)

      // Apply GTAA fee automatically for airport pickups (origin is airport)
      const originIsAirport = Array.isArray(origin.types)
        ? origin.types.includes('airport')
        : false
      if (originIsAirport) {
        pricingEngine.setAirportPickupFee(13.27)
      } else {
        pricingEngine.setAirportPickupFee(0)
      }

      const routeData = pricingEngine.routeData.value
      const calculatedLineItems = pricingEngine.detailedLineItems.value
      const calculatedLineItemsTotals =
        pricingEngine.detailedLineItemsWithTotals.value
      const subTotal = parseFloat(pricingEngine.subTotal.value.toFixed(2))
      const taxTotal = parseFloat(pricingEngine.taxTotal.value.toFixed(2))
      const totalAmount = parseFloat(pricingEngine.totalAmount.value.toFixed(2))

      const quotes = {
        selected_hours: selected_hours!,
        selected_passengers: selected_passengers!,
        is_round_trip,
        quote_total: totalAmount,
        quote_subtotal: subTotal,
        quote_tax_total: taxTotal,
        combined_line_items: calculatedLineItemsTotals!,
        pickup_date: pickup_date ?? '',
        pickup_time: pickup_time ?? '',
        return_date: return_date ?? '',
        return_time: return_time ?? '',
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
        salesTaxId: pricingEngine.salesTaxes[0].tax_number,
        vehicleId: pricingEngine.selectedVehicle.value?.vehicle_number,
        serviceId: pricingEngine.selectedService.value?.service_number,
        lineItemsIdOne: pricingEngine.lineItems[0].id,
        lineItemsIdTwo: pricingEngine.lineItems[1].id,
        lineItemsIdThree: pricingEngine.lineItems[2].id,
      }
      const { shortLink, createShortLink } = useLinkShortener(domain)
      const data = await prisma.quote.create({
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
      const quote = quoteFormReturnSchema.parse(data)
      const newObj = JSON.parse(JSON.stringify(quote))
      newObj.combined_line_items = newObj.combined_line_items.filter(
        (item: any) => item.label !== 'Total' && item.label !== 'HST'
      )

      consola.info(chalk.green('[ZAPIER_QUOTE]', JSON.stringify(newObj)))
      const zapier = await $fetch(
        'https://hooks.zapier.com/hooks/catch/11745690/340edjn/',
        {
          method: 'POST',
          body: { newObj },
        }
      )
      consola.info(chalk.red('[ZAPIER]', JSON.stringify(zapier)))
      shortLink.value = createShortLink(quote.quote_number)
      await Promise.all([
        sendQuoteEmail(quote, sendGridKey, shortLink.value),
        createAircallContact(aircallSecret, quote),
        updateShortLink(prisma, quote, shortLink.value),
        sendTwilioSms(twilioClient, first_name, phone_number, shortLink.value),
      ])
      await useStorage().setItem('quote', quote)
      return quote
    }),

  postShortLink: publicProcedure
    .input(
      z.object({
        quote_number: z.number(),
        short_link: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.quote.update({
        where: { quote_number: input.quote_number },
        data: {
          short_link: input.short_link,
        },
      })
    }),
})
