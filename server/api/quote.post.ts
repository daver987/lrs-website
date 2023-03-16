import { usePricingEngine } from '~/composables/usePricingEngine'
import { createAircallContact } from './services/createAircallContact'
import { sendBookingConfirmationEmail } from './services/sendGridEmail'
import { formatAddress } from '~/utils/formatAddress'
import { computed } from 'vue'
import { useLinkShortener } from '~/composables/useLinkShortener'
import { format } from 'date-fns'
import { SummarySchema } from '~/schema/summarySchema'
import _ from 'lodash'
import {
  ConversionPartialSchema,
  LineItemSchema,
  QuotePartialSchema,
  SalesTaxSchema,
  ServiceSchema,
  VehicleSchema,
} from '~/prisma/generated/zod'
import { PrismaClient } from '@prisma/client'
import { Twilio } from 'twilio'
import { summaryUser } from '~/schema/summarySchema'

const aircallSecret = useRuntimeConfig().AIRCALL_API_TOKEN
const sendGridKey = useRuntimeConfig().SENDGRID_API_KEY

async function createQuote(quotes: any, prisma: PrismaClient) {
  try {
    const newQuote = await prisma.quote.create(quotes)
    return SummarySchema.parse(newQuote)
  } catch (e) {
    console.error('Error creating quote:', e)
    throw e
  }
}

async function sendConfirmationEmail(
  quote: any,
  sendGridKey: string,
  shortLink: string
) {
  try {
    await sendBookingConfirmationEmail(quote, sendGridKey, shortLink)
  } catch (e) {
    console.error('Error sending confirmation email:', e)
    throw e
  }
}

async function createContact(aircallSecret: string, quote: any) {
  try {
    await createAircallContact(aircallSecret, quote)
  } catch (e) {
    console.error('Error creating Aircall contact:', e)
    throw e
  }
}

async function updateShortLink(
  prisma: PrismaClient,
  quote: any,
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

const { shortLink, createShortLink } = useLinkShortener('highparklivery.com')

async function sentTwilioSms(
  twilioClient: Twilio,
  firstName: string,
  phoneNumber: string,
  checkoutLink: string
) {
  const message = `Hi ${firstName} This is High Park Livery. Thank you for requesting a quote. Please use this link to book: ${checkoutLink}.`
  setTimeout(async () => {
    await twilioClient.messages.create({
      body: message,
      messagingServiceSid: 'MG211e359fc267bbde46acacf4a428a03f',
      to: phoneNumber,
    })
  }, 10000)
}
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
    const conversionData = ConversionPartialSchema.parse(data.conversion)
    const quoteData = QuotePartialSchema.parse(data)
    const user = summaryUser.parse(data)

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
    //calculate the price using the usePricingEngine composable
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

    //calculate trip values
    const isRoundTrip = ref(is_round_trip)
    const quoteTotal = isRoundTrip.value
      ? totalAmount.value + returnTotalAmount.value
      : totalAmount.value
    const quoteSubtotal = isRoundTrip.value
      ? totalAmount.value + returnSubTotal.value
      : subTotal.value
    const quoteTaxTotal = isRoundTrip.value
      ? totalAmount.value + returnTaxTotal.value
      : taxTotal.value

    //format date times
    const formattedPickupDate = format(new Date(pickup_date), 'MMMM dd, yyyy')
    const formattedPickupTime = format(new Date(pickup_time), 'hh:mm a')
    const formattedReturnDate = format(new Date(return_date), 'MMMM dd, yyyy')
    const formattedReturnTime = format(new Date(return_time), 'hh:mm a')
    const returnServiceType = returnServiceTypeLabel.value
    const routeData = pricingEngine.routeData.value

    //Data for the prisma query
    const quotes = {
      data: {
        selected_hours: _.toNumber(selected_hours),
        selected_passengers: selected_passengers,
        is_round_trip: is_round_trip,
        quote_total: quoteTotal,
        quote_subtotal: quoteSubtotal,
        quote_tax_total: quoteTaxTotal,
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

    const quote = await createQuote(quotes, prisma)
    shortLink.value = createShortLink(quote.quote_number)
    await sendConfirmationEmail(quote, sendGridKey, shortLink.value)
    await createContact(aircallSecret, quote)
    await updateShortLink(prisma, quote, shortLink.value)
    await sentTwilioSms(twilioClient, first_name, phone_number, shortLink.value)
    return {
      quote: quote,
    }
  } catch (e) {
    console.error(e)
  }
})
