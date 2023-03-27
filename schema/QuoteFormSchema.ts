import { z } from 'zod'
import {
  LineItemSchema,
  SalesTaxSchema,
  ServiceSchema,
  VehicleSchema,
  QuoteSchema,
  TripSchema,
  LocationSchema,
  UserSchema,
} from '~/prisma/generated/zod'

const QuoteSchemaPicked = QuoteSchema.pick({
  quote_number: true,
  selected_hours: true,
  selected_passengers: true,
  is_round_trip: true,
  quote_total: true,
  quote_subtotal: true,
  quote_tax_total: true,
})

const TripSchemaPicked = TripSchema.pick({
  id: true,
  formatted_pickup_date: true,
  formatted_pickup_time: true,
  distance_text: true,
  duration_text: true,
  trip_order: true,
  line_items_list: true,
})

const LocationSchemaPicked = LocationSchema.pick({
  lat: true,
  lng: true,
  full_name: true,
  route_order: true,
})

const TripSchemaPickedExtended = TripSchemaPicked.extend({
  locations: LocationSchemaPicked.array(),
})

const UserSchemaPicked = UserSchema.pick({
  id: true,
  first_name: true,
  last_name: true,
  full_name: true,
  phone_number: true,
  email_address: true,
})

const VehicleSchemaPicked = VehicleSchema.pick({
  label: true,
  vehicle_image: true,
  max_luggage: true,
})
const ServiceSchemaPicked = ServiceSchema.pick({
  label: true,
})

const combinedLineItemsSchema = z.object({
  label: z.string(),
  total: z.number(),
  tax: z.number(),
})

export const quoteFormReturnSchema = QuoteSchemaPicked.extend({
  user: UserSchemaPicked,
  vehicle: VehicleSchemaPicked,
  service: ServiceSchemaPicked,
  combined_line_items: combinedLineItemsSchema.array(),
  trips: TripSchemaPickedExtended.array(),
}).strip()

export type QuoteFormReturn = z.infer<typeof quoteFormReturnSchema>

export const QuoteFormSchema = z.object({
  id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  email_address: z
    .string()
    .email({ message: 'Please enter a valid email' })
    .toLowerCase(),
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
  pickup_date: z.number().nullable(),
  pickup_time: z.number().nullable(),
  return_date: z.number().nullable(),
  return_time: z.number().nullable(),
  selected_hours: z.number().nullable(),
  selected_passengers: z.number().nullable(),
  is_hourly: z.boolean(),
  vehicle_id: z.number().nullable(),
  service_id: z.number().nullable(),
  return_service_id: z.number().nullable(),
  is_round_trip: z.boolean(),
  vehicle: VehicleSchema.array(),
  service: ServiceSchema.array(),
  line_items: LineItemSchema.array(),
  sales_tax: SalesTaxSchema.array(),
})

export type QuoteForm = z.infer<typeof QuoteFormSchema>
