import { z } from 'zod'

export const serviceSchema = z.array(
  z.object({
    value: z.number(),
    created_at: z.date(),
    updated_at: z.date(),
    label: z.string(),
    is_active: z.boolean(),
    limo_anywhere_id: z.number(),
  })
)

export type Service = z.infer<typeof serviceSchema>
