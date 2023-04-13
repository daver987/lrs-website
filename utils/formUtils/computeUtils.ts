import { Service } from '.prisma/client'

export function computeIsHourly(service: Service | null): boolean {
  return service?.is_hourly ?? false
}
