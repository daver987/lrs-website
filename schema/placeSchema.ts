import { z } from 'zod'
export const placeSchema = z
	.object({
		place_id: z.string(),
		formatted_address: z.string(),
		name: z.string(),
		types: z.array(z.string()),
	})
	.strip()

export type Place = z.infer<typeof placeSchema>
