import { Service } from '.prisma/client'

// export function computePickupDateTime(
//   pickupDate: Date | null,
//   pickupTime: Date | null
// ): Date | null {
//   if (pickupDate && pickupTime) {
//     return new Date(pickupDate.getTime() + (pickupTime.getTime() % 86400000))
//   }
//   return null
// }

export function computeIsHourly(service: Service | null): boolean {
  return service?.is_hourly ?? false
}
