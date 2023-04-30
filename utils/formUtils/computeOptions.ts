import type { SelectOption } from 'naive-ui'
import { Vehicle, Service } from '@prisma/client'

export function computeVehicleOptions(
  array: Vehicle[] | null
): SelectOption[] | null {
  if (array === null) {
    return null
  }
  return array.map((item) => {
    return {
      label: item.label,
      value: item.vehicle_number,
      max_passengers: item.max_passengers,
    }
  })
}

export function computeServiceOptions(
  array: Service[] | null
): SelectOption[] | null {
  if (array === null) {
    return null
  }
  return array.map((item) => {
    return {
      label: item.label,
      value: item.service_number,
      isHourly: item.is_hourly,
    }
  })
}

export function computePassengerOptions(
  numPassengers: number | null
): SelectOption[] | null {
  const options: SelectOption[] = []
  if (numPassengers) {
    for (let i = 1; i <= numPassengers; i++) {
      options.push({
        label: `${i} Passenger${i > 1 ? 's' : ''}`,
        value: i,
        isDisabled: false,
      })
    }
  } else {
    return null
  }
  return options
}

export function computeHoursOptions(): SelectOption[] {
  const options: SelectOption[] = []
  for (let i = 2; i <= 12; i++) {
    options.push({
      label: `${i} hour${i > 1 ? 's' : ''}`,
      value: i,
    })
  }
  return options
}

export function computeLuggageOptions(numLuggage: number): SelectOption[] {
  const options: SelectOption[] = []
  for (let i = 1; i <= numLuggage; i++) {
    options.push({
      label: `${i} Luggage Bag${i > 1 ? 's' : ''}`,
      value: i,
      isDisabled: false,
    })
  }
  return options
}
