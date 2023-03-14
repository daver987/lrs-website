import { z } from 'zod'

export const salesTaxSchema = z.array(
	z.object({
		id: z.number(),
		region: z.string(),
		amount: z.number(),
		is_active: z.boolean(),
		tax_name: z.string(),
	})
)

export type SalesTax = z.infer<typeof salesTaxSchema>
