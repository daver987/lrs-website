import type { Place } from '~/shared/schemas'
import { placeSchema } from '~/shared/schemas'

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
