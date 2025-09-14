import { z } from 'zod'
import { LineItemSchema } from './prismaSchemas'

export const LineItemExtendedSchema = LineItemSchema.extend({
  tax: z.number().optional(),
  total: z.number().optional(),
})
export const LineItemsPartialSchema = LineItemExtendedSchema.pick({
  label: true,
  tax: true,
  total: true,
})
export type LineItemsPartial = z.infer<typeof LineItemsPartialSchema>
export type LineItemExtended = z.infer<typeof LineItemExtendedSchema>
