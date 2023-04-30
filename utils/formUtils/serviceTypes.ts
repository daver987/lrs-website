import { Service, Vehicle } from '@prisma/client'
import { Place } from '~/schema/placeSchema'
import { isAirport } from '~/utils/formUtils/isAirport'

export function getServiceTypeByNumber(
  serviceTypes: Service[] | null,
  serviceNumber: number
): Service | null {
  if (serviceTypes === null) {
    return null
  }

  return (
    serviceTypes.find(
      (serviceType) => serviceType.service_number === serviceNumber
    ) || null
  )
}

export function getVehicleTypeByNumber(
  vehicleTypes: Vehicle[] | null,
  vehicleNumber: number
): Vehicle | null {
  if (vehicleTypes === null) {
    return null
  }
  return (
    vehicleTypes.find(
      (vehicleType) => vehicleType.vehicle_number === vehicleNumber
    ) || null
  )
}

export function handleFormValueChange(
  serviceTypes: Service[],
  origin: Place | null,
  destination: Place | null
): Service | null {
  if (!origin || !destination) {
    return null
  }

  const isOriginAirport = isAirport(origin)
  const isDestinationAirport = isAirport(destination)

  if (isOriginAirport) {
    return getServiceTypeByNumber(serviceTypes, 3)
  } else if (isDestinationAirport) {
    return getServiceTypeByNumber(serviceTypes, 2)
  } else {
    return null
  }
}
