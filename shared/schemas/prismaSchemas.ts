import { z } from 'zod'

// Minimal Zod schemas aligned with Prisma models used in the app.
// These are intentionally lean: only fields referenced elsewhere are included.

export const ConversionPartialSchema = z.object({
  utm_medium: z.string().optional(),
  utm_source: z.string().optional(),
  utm_campaign: z.string().optional(),
  utm_term: z.string().optional(),
  gclid: z.string().optional(),
})

export const UserSchema = z.object({
  id: z.string(),
  first_name: z.string().nullable().optional(),
  last_name: z.string().nullable().optional(),
  full_name: z.string().nullable().optional(),
  phone_number: z.string().nullable().optional(),
  email_address: z.string().email().nullable().optional(),
})

export const VehicleSchema = z.object({
  vehicle_number: z.number().optional(),
  label: z.string(),
  vehicle_image: z.string().nullable().optional(),
  max_luggage: z.number().nullable().optional(),
  max_passengers: z.number().nullable().optional(),
  per_km: z.number().nullable().optional(),
  per_hour: z.number().nullable().optional(),
  min_hours: z.number().nullable().optional(),
  min_distance: z.number().nullable().optional(),
  min_rate: z.number().nullable().optional(),
  fasttrak_id: z.any().optional(),
})

export const ServiceSchema = z.object({
  label: z.string(),
  is_hourly: z.boolean().nullable().optional(),
})

export const SalesTaxSchema = z.object({
  tax_name: z.string(),
  amount: z.number(),
  is_active: z.boolean().nullable().optional(),
})

export const LineItemSchema = z.object({
  label: z.string().optional().default(''),
  description: z.string().nullable().optional(),
  is_percentage: z.boolean().optional().default(false),
  is_taxable: z.boolean().optional().default(false),
  amount: z.number().optional().default(0),
  is_active: z.boolean().optional().default(true),
  applies_to: z.string().nullable().optional(),
})

export const LocationSchema = z.object({
  lat: z.number(),
  lng: z.number(),
  full_name: z.string(),
  route_order: z.number().nullable().optional(),
})

export const TripSchema = z.object({
  id: z.string(),
  trip_order: z.number().nullable().optional(),
  pickup_date: z.string().nullable().optional(),
  pickup_time: z.string().nullable().optional(),
  distance_text: z.string().nullable().optional(),
  duration_text: z.string().nullable().optional(),
  formatted_pickup_date: z.string().nullable().optional(),
  formatted_pickup_time: z.string().nullable().optional(),
  line_items_tax: z.number().nullable().optional(),
  line_items_subtotal: z.number().nullable().optional(),
  line_items_total: z.number().nullable().optional(),
  service_label: z.string().nullable().optional(),
  locations: LocationSchema.array().optional(),
  line_items_list: LineItemSchema.array().optional(),
})

export const QuoteSchema = z.object({
  quote_number: z.number(),
  selected_hours: z.number().nullable().optional(),
  selected_passengers: z.number().nullable().optional(),
  is_round_trip: z.boolean(),
  is_booked: z.boolean().nullable().optional(),
  quote_total: z.number().nullable().optional(),
  quote_subtotal: z.number().nullable().optional(),
  quote_tax_total: z.number().nullable().optional(),
  combined_line_items: z
    .array(
      z.object({
        label: z.string(),
        total: z.number(),
        tax: z.number(),
      })
    )
    .nullable()
    .optional(),
})

export type User = z.infer<typeof UserSchema>
export type Vehicle = z.infer<typeof VehicleSchema>
export type Service = z.infer<typeof ServiceSchema>
export type SalesTax = z.infer<typeof SalesTaxSchema>
export type LineItem = z.infer<typeof LineItemSchema>
export type Location = z.infer<typeof LocationSchema>
export type Trip = z.infer<typeof TripSchema>
export type Quote = z.infer<typeof QuoteSchema>
