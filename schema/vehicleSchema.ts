import { z } from 'zod'

export const vehicleSchema = z.object({
  value: z.number(),
  created_at: z.date(),
  updated_at: z.date(),
  max_passengers: z.number(),
  max_luggage: z.number(),
  per_km: z.number(),
  per_hour: z.number(),
  min_hours: z.number(),
  min_distance: z.number(),
  min_rate: z.number(),
  is_active: z.boolean(),
  label: z.string(),
  vehicle_image: z.string(),
})

export type Vehicle = z.infer<typeof vehicleSchema>
