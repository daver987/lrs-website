import { z } from 'zod'
import {
  QuoteSchema,
  VehicleSchema,
  TripSchema,
  UserSchema,
  SalesTaxSchema,
  LocationSchema,
  ConversionPartialSchema,
} from '~/schema/prismaSchemas'

const summaryLineItemsList = z.object({
  label: z.string(),
  tax: z.number(),
  total: z.number(),
})
const summaryConversion = ConversionPartialSchema.pick({
  utm_medium: true,
  utm_source: true,
  utm_campaign: true,
  utm_term: true,
  gclid: true,
})
const summaryVehicle = VehicleSchema.pick({ label: true, vehicle_image: true })
export const summaryUser = UserSchema.pick({
  email_address: true,
  first_name: true,
  last_name: true,
  full_name: true,
  phone_number: true,
  id: true,
})
const summaryUserExtended = summaryUser.extend({
  conversion: summaryConversion,
})
const summaryLocations = LocationSchema.pick({
  full_name: true,
  lat: true,
  lng: true,
}).required()
const summaryTrips = TripSchema.pick({
  id: true,
  trip_order: true,
  formatted_pickup_date: true,
  formatted_pickup_time: true,
  line_items_tax: true,
  line_items_subtotal: true,
  line_items_total: true,
  service_label: true,
  duration_text: true,
  pickup_date: true,
  pickup_time: true,
}).required()

const TripForStripeSchema = TripSchema.pick({
  id: true,
})

const summaryTripsExtended = summaryTrips.extend({
  locations: summaryLocations.array(),
  line_items_list: summaryLineItemsList.array(),
})
const summarySalesTax = SalesTaxSchema.pick({ tax_name: true })
const summaryQuote = QuoteSchema.pick({
  is_round_trip: true,
  is_booked: true,
  quote_number: true,
  selected_hours: true,
  selected_passengers: true,
  quote_total: true,
  quote_subtotal: true,
  quote_tax_total: true,
  combined_line_items: true,
})

const QuoteForStripe = QuoteSchema.pick({
  quote_number: true,
})
const QuoteForStripeExtended = QuoteForStripe.extend({
  tripId: TripForStripeSchema,
})
export const SummarySchema = summaryQuote.extend({
  trips: summaryTripsExtended.array(),
  vehicle: summaryVehicle,
  sales_tax: summarySalesTax,
  user: summaryUserExtended,
})

export type Summary = z.infer<typeof SummarySchema>
export type QuoteForStrip = z.infer<typeof QuoteForStripeExtended>
