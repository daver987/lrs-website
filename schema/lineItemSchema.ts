import { z } from 'zod'

export const lineItemSchema = z.object({
  id: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
  label: z.string(),
  description: z.null(),
  is_percentage: z.boolean(),
  is_taxable: z.boolean(),
  amount: z.number(),
  is_active: z.boolean(),
  applies_to: z.string().nullable(),
})

export type LineItem = z.infer<typeof lineItemSchema>
