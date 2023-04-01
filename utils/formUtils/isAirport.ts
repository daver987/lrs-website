import type { Place } from '~/schema/placeSchema'
import { placeSchema } from '~/schema/placeSchema'

export function isAirport(place?: Place): boolean {
  if (!place) {
    return false
  }
  try {
    return placeSchema.parse(place).types.includes('airport')
  } catch (error) {
    return false
  }
}
