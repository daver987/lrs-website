import { z } from 'zod'

export const conversionSchema = z.object({
	utm_medium: z.string(),
	utm_source: z.string(),
	utm_campaign: z.string(),
	utm_term: z.string(),
	gclid: z.string(),
})

export type Conversion = z.infer<typeof conversionSchema>
