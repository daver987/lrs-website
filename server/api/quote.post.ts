import { usePricingEngine } from '~/composables/usePricingEngine'
import { createAircallContact } from './services/createAircallContact'
import { sendBookingConfirmationEmail } from './services/sendGridEmail'
import { formatAddress } from '~/utils/formatAddress'
import { computed } from 'vue'
import { SummarySchema } from '~/schema/summarySchema'
import type { Summary } from '~/schema/summarySchema'
import _ from 'lodash'
import {
  VehicleSchema,
  LineItemSchema,
  SalesTaxSchema,
  ConversionPartialSchema,
  ServiceSchema,
  QuotePartialSchema,
  UserPartialSchema,
} from '~/prisma/generated/zod'
import {
  useFormattedDate,
  useFormattedTime,
} from '~/composables/useFormattedDateTime'

const aircallSecret = useRuntimeConfig().AIRCALL_API_TOKEN

export default defineEventHandler(async (event) => {
  try {
    const prisma = event.context.prisma
    const twilioClient = event.context.twilioClient
    const data = await readBody(event)
    const {
      origin,
      destination,
      return_date,
      return_time,
      pickup_date,
      pickup_time,
    } = data
    const vehicle = VehicleSchema.array().parse(data.vehicle)
    const line_items = LineItemSchema.array().parse(data.line_items)
    const sales_tax = SalesTaxSchema.array().parse(data.sales_tax)
    const service = ServiceSchema.array().parse(data.service)
    const conversionData = ConversionPartialSchema.strip().parse(
      data.conversion
    )
    const quoteData = QuotePartialSchema.strip().parse(data)
    const user = UserPartialSchema.strip().parse(data)

    const {
      user_id,
      selected_hours,
      is_round_trip,
      selected_passengers,
      service_id,
      vehicle_id,
    } = quoteData

    const { first_name, last_name, email_address, phone_number } = user

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

    //format date times
    const formattedPickupDate = useFormattedDate(pickup_date)
    const formattedPickupTime = useFormattedTime(pickup_time)
    const formattedReturnDate = useFormattedDate(return_date)
    const formattedReturnTime = useFormattedTime(return_time)
    const returnServiceType = returnServiceTypeLabel.value
    const routeData = pricingEngine.routeData.value

    const quotes = {
      data: {
        selected_hours: _.toNumber(selected_hours),
        selected_passengers: selected_passengers,
        is_round_trip: is_round_trip,
        quote_total: is_round_trip
          ? totalAmount.value + returnTotalAmount.value
          : totalAmount.value,
        quote_subtotal: is_round_trip
          ? totalAmount.value + returnSubTotal.value
          : subTotal.value,
        quote_tax_total: is_round_trip
          ? totalAmount.value + returnTaxTotal.value
          : taxTotal.value,
        trips: is_round_trip
          ? {
              create: [
                {
                  // First trip
                  pickup_date: _.toNumber(data.pickup_date),
                  pickup_time: _.toNumber(data.pickup_time),
                  formatted_pickup_date: formattedPickupDate,
                  formatted_pickup_time: formattedPickupTime,
                  distance_text: routeData?.routes[0].legs[0].distance.text,
                  duration_text: routeData?.routes[0].legs[0].duration.text,
                  duration_value: routeData?.routes[0].legs[0].distance.value,
                  distance_value: routeData?.routes[0].legs[0].duration.value,
                  service_label: pricingEngine.selectedService.value?.label,
                  vehicle_label: pricingEngine.selectedVehicle.value?.label,
                  line_items_list: lineItemDetails,
                  line_items_subtotal: subTotal.value,
                  line_items_tax: taxTotal.value,
                  line_items_total: totalAmount.value,
                  is_return: false,
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
                      },
                    ],
                  },
                },
                {
                  // Second trip
                  pickup_date: _.toNumber(data.return_date),
                  pickup_time: _.toNumber(data.return_time),
                  formatted_pickup_date: formattedReturnDate,
                  formatted_pickup_time: formattedReturnTime,
                  distance_text: routeData?.routes[0].legs[0].distance.text,
                  duration_text: routeData?.routes[0].legs[0].duration.text,
                  duration_value: routeData?.routes[0].legs[0].distance.value,
                  distance_value: routeData?.routes[0].legs[0].duration.value,
                  service_label: returnServiceType,
                  vehicle_label: pricingEngine.selectedVehicle.value?.label,
                  line_items_list: returnLineItemsDetails,
                  line_items_subtotal: returnSubTotal.value,
                  line_items_tax: returnTaxTotal.value,
                  line_items_total: returnTotalAmount.value,
                  is_return: false,
                  locations: {
                    create: [
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
                        is_origin: true,
                      },
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
                        is_destination: true,
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
                  pickup_date: _.toNumber(data.pickup_date),
                  pickup_time: _.toNumber(data.pickup_time),
                  formatted_pickup_date: formattedPickupDate,
                  formatted_pickup_time: formattedPickupTime,
                  distance_text: routeData?.routes[0].legs[0].distance.text,
                  duration_text: routeData?.routes[0].legs[0].duration.text,
                  duration_value: routeData?.routes[0].legs[0].distance.value,
                  distance_value: routeData?.routes[0].legs[0].duration.value,
                  service_label: pricingEngine.selectedService.value?.label,
                  vehicle_label: pricingEngine.selectedVehicle.value?.label,
                  line_items_list: lineItemDetails,
                  line_items_subtotal: subTotal.value,
                  line_items_tax: taxTotal.value,
                  line_items_total: totalAmount.value,
                  is_return: false,
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
                      },
                    ],
                  },
                },
              ],
            },
        user: {
          connectOrCreate: {
            where: { email_address: email_address as string },
            create: {
              id: user_id,
              first_name: first_name,
              last_name: last_name,
              phone_number: phone_number,
              email_address: email_address,
              conversion: {
                create: {
                  utm_term: conversionData.utm_term,
                  utm_medium: conversionData.utm_medium,
                  utm_source: conversionData.utm_source,
                  utm_campaign: conversionData.utm_campaign,
                  gclid: conversionData.gclid,
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
          include: {
            locations: true,
          },
        },
        user: {
          include: {
            conversion: true,
          },
        },
      },
    }
    //@ts-ignore
    const newQuote = await prisma.quote.create(quotes)
    const quote = newQuote

    const sendGridKey = useRuntimeConfig().SENDGRID_API_KEY
    await sendBookingConfirmationEmail(newQuote, sendGridKey)
    await createAircallContact(aircallSecret, quote)
    const checkoutLink = `https://highparklivery.com/checkout?quote_number=${quote.quote_number}`
    const message = `Hi ${first_name} This is High Park Livery. Thank you for requesting a quote. Please use this link to book: ${checkoutLink}.`

    setTimeout(async () => {
      await twilioClient.messages.create({
        body: message,
        messagingServiceSid: 'MG211e359fc267bbde46acacf4a428a03f',
        to: phone_number as string,
      })
    }, 10000)
    console.log('SS Returned from prisma', newQuote)
    return {
      quote: SummarySchema.parse(newQuote),
    }
  } catch (e) {
    console.error(e)
  }
})
