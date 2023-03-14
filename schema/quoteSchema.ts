import { z } from 'zod'

export const quoteSchema = z.object({
  user_id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  email_address: z.string(),
  phone_number: z.string(),
  origin: z
    .object({
      formatted_address: z.string(),
      name: z.string(),
      place_id: z.string(),
      types: z.array(z.string()),
    })
    .strip(),
  destination: z
    .object({
      formatted_address: z.string(),
      name: z.string(),
      place_id: z.string(),
      types: z.array(z.string()),
    })
    .strip(),
  pickup_date: z.number(),
  pickup_time: z.number(),
  return_date: z.number().nullable(),
  return_time: z.number().nullable(),
  service_id: z.number(),
  vehicle_id: z.number(),
  selected_hours: z.number().nullable(),
  selected_passengers: z.number(),
  is_hourly: z.boolean(),
  is_round_trip: z.boolean(),
  conversion: z.object({}),
  vehicle: z.any(),
  service: z.any(),
  line_items: z.any(),
  sales_tax: z.any(),
})

export type Quote = z.infer<typeof quoteSchema>
